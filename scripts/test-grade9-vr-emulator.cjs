/* Grade 9 VR Studio submissions — Firebase emulator test (synthetic data only).
 *
 * Run from the repo root (Auth + Realtime Database emulators, project demo-nilai):
 *   NODE_PATH=<dir with firebase@10 node_modules> \
 *   npx firebase emulators:exec --only auth,database --project demo-nilai \
 *     "node scripts/test-grade9-vr-emulator.cjs"
 *
 * The real browser files (js/grade9-cloud-identity.js, grade9-vr/cloud.js,
 * js/grade9-vr-submissions.js, js/grade8-cloud-identity.js, js/grade11-cloud.js)
 * run inside a vm context against the emulators with database.rules.json. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {webcrypto}=require('node:crypto');

const PROJECT='demo-nilai',NS='demo-nilai-default-rtdb';
const DB_HOST=process.env.FIREBASE_DATABASE_EMULATOR_HOST,AUTH_HOST=process.env.FIREBASE_AUTH_EMULATOR_HOST;
// Safety: never touch production. Require emulator env and a demo- project.
if(!DB_HOST||!AUTH_HOST||!/^(127\.0\.0\.1|localhost):\d+$/.test(DB_HOST)||!/^(127\.0\.0\.1|localhost):\d+$/.test(AUTH_HOST)){console.error('Refusing to run: emulator hosts not set (use firebase emulators:exec).');process.exit(2);}
const DB_URL=`http://${DB_HOST}?ns=${NS}`;
assert.ok(!DB_URL.includes('firebasedatabase.app')&&PROJECT.startsWith('demo-'));

const firebase=require('firebase/compat/app').default;
require('firebase/compat/auth');require('firebase/compat/database');
const firebaseConfig={apiKey:'demo-key',authDomain:PROJECT+'.firebaseapp.com',databaseURL:DB_URL,projectId:PROJECT,appId:'demo-app'};
const rawInit=firebase.initializeApp.bind(firebase);
firebase.initializeApp=(cfg,name)=>{assert.equal(cfg.databaseURL,DB_URL,'all apps must use the emulator');const a=rawInit(cfg,name);a.auth().useEmulator('http://'+AUTH_HOST,{disableWarnings:true});return a;};
// Node has no browser persistence; keep in-memory sessions (NONE) for tests.
firebase.auth.Auth.prototype.setPersistence=async function(){};

const ROOT=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const main=firebase.initializeApp(firebaseConfig);
const store=()=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear()};};
const ADMIN_EMAILS=['andi.purba@sdh.or.id','pandapotanandi@gmail.com'];
const ctx=vm.createContext({firebase,firebaseConfig,db:main.database(),auth:main.auth(),console,setTimeout,clearTimeout,queueMicrotask,URL,TextEncoder,crypto:webcrypto,
  localStorage:store(),sessionStorage:store(),document:{getElementById:()=>null,activeElement:null},window:{confirm:()=>true},
  isAdminEmail:e=>ADMIN_EMAILS.includes(String(e||'').toLowerCase()),escHtml:s=>String(s),showAlert:()=>{},getKKM:()=>74,allSiswa:[],
  vrSession:null,Promise,Date,Math,JSON,Object,Array,Number,String,Error,Set,Map});
ctx.siswaRef=ctx.db.ref('siswa');ctx.window=ctx;
for(const f of ['js/assessment-config.js','js/grade8-cloud-identity.js','js/grade11-cloud.js','js/grade9-cloud-identity.js','grade9-vr/data.js','grade9-vr/cloud.js','js/grade9-vr-submissions.js'])vm.runInContext(read(f).replace(/^const (G8CloudIdentity|G11CloudIdentity|G9CloudIdentity|G9Sync|G9_VR_GRADING|G9VrGrades|G9VrMonitor|CONFIG|LESSONS)\b/gm,'var $1'),ctx,{filename:f});
const C=code=>vm.runInContext(code,ctx);

const results=[];let section='';
async function test(name,fn){try{await fn();results.push([section+name,true]);console.log('  PASS',name);}catch(e){results.push([section+name,false,e]);console.log('  FAIL',name,'\n    ',e&&e.stack?e.stack.split('\n').slice(0,3).join('\n     '):e);}}
async function denied(promise,label='write'){try{await promise;}catch(e){if(/permission|PERMISSION_DENIED/i.test(String(e.code||'')+String(e.message||'')))return;throw e;}throw Error(label+' unexpectedly succeeded');}
async function admin(method,p,body){const r=await fetch(`http://${DB_HOST}/${p}.json?ns=${NS}`,{method,headers:{Authorization:'Bearer owner','Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});if(!r.ok)throw Error(method+' '+p+' '+r.status+' '+await r.text());return r.json();}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let appCount=0;
async function rawUser(email,password,create=false){const a=rawInit(firebaseConfig,'raw-'+(++appCount));a.auth().useEmulator('http://'+AUTH_HOST,{disableWarnings:true});if(create)await a.auth().createUserWithEmailAndPassword(email,password);else await a.auth().signInWithEmailAndPassword(email,password);return a;}
const anon=()=>{const a=rawInit(firebaseConfig,'anon-'+(++appCount));return a;};

const PW={s9a:'Rahasia9A!',s9b:'Rahasia9B!',s8:'Rahasia8A!',s11:'Rahasia11A!',s7:'Rahasia7A!'};
const SEED={
  settings:{kkm:{7:72,8:73,9:74,10:75,11:76,12:77}},
  siswa:{
    s9a:{nama:'Siswa Uji 9A',kelas:'9A',nis:'T9001',password:PW.s9a,q1_f1:88,q2_f2:81,q2_f3:'',q2_sumatif:90},
    s9b:{nama:'Siswa Uji 9B',kelas:'9B',nis:'T9002',password:PW.s9b},
    s9c:{nama:'Siswa Uji 9C (default pw)',kelas:'9C',nis:'T9003'},
    s8:{nama:'Siswa Uji 8A',kelas:'8A',nis:'T8001',password:PW.s8},
    s11:{nama:'Siswa Uji 11A',kelas:'11A',nis:'T1101',password:PW.s11},
    s7:{nama:'Siswa Uji 7A',kelas:'7A',nis:'T7001',password:PW.s7},
  }};

(async()=>{
  console.log('Emulators:',DB_HOST,AUTH_HOST,'project',PROJECT);
  await admin('PUT','',SEED);
  // Teacher (admin e-mail exists only inside the Auth emulator).
  await main.auth().createUserWithEmailAndPassword('andi.purba@sdh.or.id','teacher-pass-123');
  const teacherUid=main.auth().currentUser.uid;
  const stranger=await rawUser('random.guru@example.test','stranger-pass-1',true);
  await admin('PUT','guru/'+stranger.auth().currentUser.uid,{email:'random.guru@example.test',isVerified:false,emailVerified:false});

  section='[unit] ';console.log('\nLate-penalty unit tests');
  const G=C('G9VrGrades'),F1=C('G9_VR_GRADING.q2_f1');
  await test('config: F1 due 2026-10-20, 5/day, base 100, lesson 1',()=>{assert.equal(F1.dueDate,'2026-10-20');assert.equal(F1.penaltyPerDay,5);assert.equal(F1.baseDefault,100);assert.equal(F1.lessonId,1);assert.equal(F1.field,'q2_f1');});
  await test('on time → 100',()=>{assert.equal(G.daysLate('2026-10-20','2026-10-20'),0);assert.equal(G.suggestedScore({base:100,daysLate:0,kkm:74}),100);assert.equal(G.compute(F1,{base:100,kkm:74,manualDate:'2026-10-14'}).suggested,100);});
  await test('1 day late → 95',()=>{const c=G.compute(F1,{base:100,kkm:74,manualDate:'2026-10-21'});assert.equal(c.daysLate,1);assert.equal(c.suggested,95);});
  await test('6 days late → 74 (KKM floor)',()=>{const c=G.compute(F1,{base:100,kkm:74,manualDate:'2026-10-26'});assert.equal(c.daysLate,6);assert.equal(c.suggested,74);});
  await test('7 days late → 74',()=>{assert.equal(G.compute(F1,{base:100,kkm:74,manualDate:'2026-10-27'}).suggested,74);});
  await test('5 days late → 75 (above floor)',()=>{assert.equal(G.compute(F1,{base:100,kkm:74,manualDate:'2026-10-25'}).suggested,75);});
  await test('teacher base 90, 2 days late → 80',()=>{assert.equal(G.compute(F1,{base:90,kkm:74,manualDate:'2026-10-22'}).suggested,80);});
  await test('KKM is always the floor, also for a low base',()=>{assert.equal(G.compute(F1,{base:60,kkm:74,manualDate:'2026-10-25'}).suggested,74);assert.equal(G.compute(F1,{base:60,kkm:74,manualDate:'2026-10-19'}).suggested,74);assert.equal(G.compute(F1,{base:80,kkm:74,manualDate:'2026-10-19'}).suggested,80);});
  await test('submission timestamp uses WIB calendar day',()=>{
    // 2026-10-20 23:30 WIB = 2026-10-20 16:30Z → on time; 2026-10-21 00:30 WIB = 2026-10-20 17:30Z → 1 day late
    assert.equal(G.compute(F1,{base:100,kkm:74,submittedAt:Date.UTC(2026,9,20,16,30)}).suggested,100);
    const late=G.compute(F1,{base:100,kkm:74,submittedAt:Date.UTC(2026,9,20,17,30)});assert.equal(late.completedOn,'2026-10-21');assert.equal(late.dateSource,'submission');assert.equal(late.suggested,95);});
  await test('manual completion date overrides submission timestamp',()=>{const c=G.compute(F1,{base:100,kkm:74,manualDate:'2026-10-18',submittedAt:Date.UTC(2026,9,25,3)});assert.equal(c.dateSource,'manual');assert.equal(c.daysLate,0);assert.equal(c.suggested,100);});
  await test('no date → no suggestion; invalid date ignored',()=>{assert.equal(G.compute(F1,{base:100,kkm:74}).suggested,null);assert.equal(G.compute(F1,{base:100,kkm:74,manualDate:'2026-02-31'}).suggested,null);});
  await test('F1 criteria distribution sums exactly and respects maxima',()=>{const crit=C(`dcGetCourseConfig(2,9).assessments.find(a=>a.id==='vrFundamentals').criteria`);assert.equal(crit.reduce((n,c)=>n+c.max,0),100);
    for(const score of [100,95,74,73.5,0,81]){const v=G.distribute(score,crit);const sum=Math.round(Object.values(v).reduce((n,x)=>n+x,0)*100)/100;assert.equal(sum,score,'sum '+score);for(const c of crit)assert.ok(v[c.id]>=0&&v[c.id]<=c.max,c.id+' within max');}});
  await test('grade 9 Q2 rubric writes only reviewed components',()=>{const r=JSON.parse(C(`(()=>{const c=dcGetCourseConfig(2,9);const mk=rev=>{const d=dcCreateEmptyDraft(2,9);for(const a of c.assessments)for(const k of a.criteria)d.rubricScores[a.id].criteria[k.id]=k.max;for(const id of rev)d.reviewed[id]=true;return dcBuildGradebookFields(dcBuildStoredRecord(d,2,'t',9),2,9);};return JSON.stringify({none:mk([]),f1:mk(['vrFundamentals']),f12:mk(['vrFundamentals','modelsAnimation']),sum1:mk(['vrDiorama']),all:mk(c.assessments.map(a=>a.id)),course:c.id});})()`));
    assert.equal(r.course,'codeYourOwnWorldVr');assert.deepEqual(r.none,{});assert.deepEqual(r.f1,{q2_f1:100});assert.deepEqual(r.f12,{q2_f1:100,q2_f2:100});assert.deepEqual(r.sum1,{});assert.equal(r.all.q2_f1,100);assert.equal(r.all.q2_f2,100);assert.equal(r.all.q2_f3,100);});
  await test('f1Late metadata kept only for a reviewed F1; other grades unaffected',()=>{const r=C(`(()=>{const d=dcCreateEmptyDraft(2,9);d.f1Late={score:74};const a=dcBuildStoredRecord(d,2,'t',9);d.reviewed.vrFundamentals=true;const b=dcBuildStoredRecord(d,2,'t',9);const back=dcDraftFromStored(b,2,9);return {a:'f1Late' in a,b:b.f1Late&&b.f1Late.score,back:back.f1Late&&back.f1Late.score,rev:back.reviewed.vrFundamentals,g8:(dcGetCourseConfig(2,8)||{}).id!=='codeYourOwnWorldVr',g8draft:'reviewed' in dcCreateEmptyDraft(1,9)};})()`);
    assert.equal(r.a,false);assert.equal(r.b,74);assert.equal(r.back,74);assert.equal(r.rev,true);assert.equal(r.g8,true);assert.equal(r.g8draft,false);});

  section='[form] ';console.log('\nLesson-specific submission form (ID + EN)');
  const lessonsOf=f=>new Function(read(f)+';return LESSONS;')();
  const L_ID=lessonsOf('grade9-vr/data.js'),L_EN=lessonsOf('grade9-vr/data-en.js');
  await test('all 9 lessons have submitEvidence, submitExample and reflection in both languages',()=>{for(const [L,prefix] of [[L_ID,'Contoh: '],[L_EN,'Example: ']]){assert.deepEqual(L.map(l=>l.id),[1,2,3,4,5,6,7,8,9]);for(const l of L){for(const k of ['submitEvidence','submitExample','reflection','evidence'])assert.ok(typeof l[k]==='string'&&l[k].trim().length>20,l.id+' '+k);assert.ok(l.submitExample.startsWith(prefix),l.id+' example prefix');assert.match(l.submitEvidence,/BSD/,l.id+' asks for the BSD link');assert.doesNotMatch(l.submitEvidence,/tangkapan layar|screenshot|unggah|upload/i,l.id+' no upload requested');assert.notEqual(l.submitEvidence,l.evidence,l.id+' student wording separate from evidence');}}
    assert.equal(new Set(L_ID.map(l=>l.submitExample)).size,9);assert.equal(new Set(L_EN.map(l=>l.submitExample)).size,9);assert.equal(L_ID[2].evidence,'Dua tangkapan layar + alasan memilih salah satu suasana.','original evidence unchanged');});
  function formFor(file,lessons,lang,id){const src=read(file),m=src.match(/^function submissionCardHTML\(l\)\{[^\n]*\}$/m);assert.ok(m,'submissionCardHTML in '+file);
    const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    return new Function('escapeHTML','tr','saved','l',m[0]+';return submissionCardHTML(l);')(esc,(a,b)=>lang==='en'?b:a,{projectUrls:{},evidence:{},notes:{}},lessons.find(l=>l.id===id));}
  await test('lesson 3 form (ID): Bukti yang diminta, lesson example and reflection question',()=>{const h=formFor('grade9-vr/app.js',L_ID,'id',3),l=L_ID[2];assert.ok(h.includes('Bukti yang diminta'));assert.ok(h.includes(l.submitEvidence.replace(/"/g,'&quot;')));assert.ok(h.includes('2. Jelaskan buktimu (sesuai tantangan) · wajib'));assert.ok(h.includes('placeholder="'+l.submitExample.replace(/"/g,'&quot;')+'"'));assert.ok(h.includes('3. '+l.reflection+' · wajib'));assert.ok(!h.includes('a-sphere merah di position 1 1 -3'),'old generic placeholder gone');assert.ok(!/type="file"/.test(h),'no upload field');});
  await test('every lesson renders its own example + reflection in both languages',()=>{for(const [file,L,lang] of [['grade9-vr/app.js',L_ID,'id'],['grade9-vr/app-en.js',L_EN,'en']])for(const l of L){const h=formFor(file,L,lang,l.id);const e=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');assert.ok(h.includes(e(l.submitExample)),file+' '+l.id+' example');assert.ok(h.includes('3. '+e(l.reflection)),file+' '+l.id+' reflection');assert.ok(h.includes(e(l.submitEvidence)),file+' '+l.id+' evidence');}
    const en=formFor('grade9-vr/app-en.js',L_EN,'en',3);assert.ok(en.includes('Evidence required'));assert.ok(en.includes('2. Explain your evidence (for this challenge) · required'));assert.ok(en.includes(' · required</label>'));});
  await test('teacher panel lists required evidence matching data.js, per meeting',()=>{const E=C('G9_VR_LESSON_EVIDENCE');for(const l of L_ID){assert.equal(E[l.id].evidence,l.submitEvidence,'lesson '+l.id);assert.equal(E[l.id].title,l.title);}
    const h3=C(`G9VrMonitor._evidenceHTML({projectUrl:'https://app.bsd.education/share/x',evidence:'A vs B',reflection:'r',exitTicket:''},3)`);assert.ok(h3.includes('Bukti yang diminta · pertemuan 3'));assert.ok(h3.includes(L_ID[2].submitEvidence));
    const h1=C(`G9VrMonitor._evidenceHTML(null)`);assert.ok(h1.includes('pertemuan 1')&&h1.includes('isi manual'));});

  section='[enroll] ';console.log('\nGrade 9 self-enrollment');
  await test('wrong password cannot enroll (no binding left)',async()=>{await assert.rejects(C(`G9CloudIdentity.login('s9a','salah-sekali')`));assert.equal(await admin('GET','grade9VrAccounts/s9a'),null);});
  let s9aUid;
  await test('correct CS.Report password enrolls + logs in',async()=>{const u=await C(`G9CloudIdentity.login('s9a',${JSON.stringify(PW.s9a)})`);s9aUid=u.uid;const b=await admin('GET','grade9VrAccounts/s9a');assert.equal(b.uid,u.uid);assert.equal(b.grade,9);assert.match(b.email,/^g9\.[a-f0-9]{32}\.\d+@students\.cs-report\.invalid$/);});
  await test('proof removed from enrollment ticket after enrollment',async()=>{const t=await admin('GET','grade9Enrollment/'+s9aUid);assert.equal(t.studentId,'s9a');assert.equal(t.proof,undefined);});
  await test('second login reuses binding (same uid)',async()=>{await C(`G9CloudIdentity.logout()`);const u=await C(`G9CloudIdentity.login('s9a',${JSON.stringify(PW.s9a)})`);assert.equal(u.uid,s9aUid);});
  await test('student without stored password enrolls with default password',async()=>{const a=await rawUser('g9.'+'c'.repeat(32)+'.1@students.cs-report.invalid','Sph12345!',true);const uid=a.auth().currentUser.uid;await a.database().ref('grade9Enrollment/'+uid).set({studentId:'s9c',proof:'Sph12345!',at:firebase.database.ServerValue.TIMESTAMP});await a.database().ref('grade9VrAccounts/s9c').set({uid,email:a.auth().currentUser.email,grade:9,createdAt:firebase.database.ServerValue.TIMESTAMP,createdBy:uid});await a.database().ref('grade9Enrollment/'+uid+'/proof').remove();});
  await test('non-grade-9 student (kelas 8A) cannot enroll as g9',async()=>{await assert.rejects(C(`G9CloudIdentity.login('s8',${JSON.stringify(PW.s8)})`));assert.equal(await admin('GET','grade9VrAccounts/s8'),null);assert.equal(C(`firebase.app('grade9-student').auth().currentUser`),null,'failed enrollment leaves no signed-in orphan');});
  await test('g9 account cannot claim another student binding without a ticket',async()=>{const a=await rawUser('g9.'+'d'.repeat(32)+'.2@students.cs-report.invalid','whatever-123',true);const uid=a.auth().currentUser.uid;await denied(a.database().ref('grade9VrAccounts/s9b').set({uid,email:a.auth().currentUser.email,grade:9,createdAt:firebase.database.ServerValue.TIMESTAMP,createdBy:uid}));await denied(a.database().ref('grade9Enrollment/'+uid).set({studentId:'s9b',proof:'tebakan-salah',at:firebase.database.ServerValue.TIMESTAMP}),'wrong proof');});
  await test('g8-style e-mail cannot enroll into grade 9',async()=>{const a=await rawUser('g8.'+'e'.repeat(32)+'.3@students.cs-report.invalid',PW.s9b,true);await denied(a.database().ref('grade9Enrollment/'+a.auth().currentUser.uid).set({studentId:'s9b',proof:PW.s9b,at:firebase.database.ServerValue.TIMESTAMP}));});

  section='[sync] ';console.log('\nDrafts and submissions (real grade9-vr/cloud.js)');
  ctx.vrSession={id:'s9a',name:'Siswa Uji 9A',className:'9A',verifiedAt:Date.now()};
  // Old browser-only notes migrate as a draft (not a submission).
  const local={lessons:{1:{projectUrl:'',evidence:'Catatan lama dari browser',reflection:'',exitTicket:'',done:true}}};
  let hydrated=null;ctx.onRemote=v=>{hydrated=v;};ctx.local=local;
  await test('student logs in again from the portal before opening VR Studio',async()=>{const u=await C(`G9CloudIdentity.login('s9a',${JSON.stringify(PW.s9a)})`);assert.equal(u.uid,s9aUid);});
  await test('init connects with restored student session',async()=>{await C('G9Sync.init(local,onRemote)');assert.equal(C('G9Sync.connected()'),true);});
  await test('old local note migrates into a Firebase draft',async()=>{await C('G9Sync.flush()');const row=await admin('GET','learningProgress/s9a/grade9Vr/student/lessons/1');assert.equal(row.evidence,'Catatan lama dari browser');assert.equal(row.submission,undefined);assert.equal(row.updatedBy,s9aUid);assert.ok(C('G9Sync.backup()'),'migration backup kept');});
  await test('student writes own draft',async()=>{C(`G9Sync.enqueue({lessons:{1:{projectUrl:'https://app.bsd.education/share/abc',evidence:'Dua objek: box merah (0 1 -3) dan sphere biru (1 1 -3).',reflection:'Atribut color mengubah warna.',exitTicket:'',done:false}}})`);await C('G9Sync.flush()');const row=await admin('GET','learningProgress/s9a/grade9Vr/student/lessons/1');assert.equal(row.projectUrl,'https://app.bsd.education/share/abc');assert.ok(row.revision>=2);});
  await test('submit rejects non-https link and empty fields client-side',async()=>{await assert.rejects(C(`G9Sync.submit(1,{projectUrl:'http://x.test',evidence:'a',reflection:'b'})`));await assert.rejects(C(`G9Sync.submit(1,{projectUrl:'https://x.test',evidence:'',reflection:'b'})`));});
  let sub1;
  await test('submission creates version 1 with server timestamp',async()=>{const before=Date.now();const r=await C(`G9Sync.submit(1,{projectUrl:'https://app.bsd.education/share/abc',evidence:'Dua objek: box merah (0 1 -3) dan sphere biru (1 1 -3).',reflection:'Atribut color mengubah warna.',exitTicket:''})`);assert.deepEqual({...r},{submitted:true});sub1=(await admin('GET','learningProgress/s9a/grade9Vr/student/lessons/1')).submission;assert.equal(sub1.version,1);assert.equal(typeof sub1.submittedAt,'number');assert.ok(Math.abs(sub1.submittedAt-before)<60000);assert.equal(sub1.submittedBy,s9aUid);assert.equal(C(`G9Sync.lessonState(1,{projectUrl:'https://app.bsd.education/share/abc',evidence:'Dua objek: box merah (0 1 -3) dan sphere biru (1 1 -3).',reflection:'Atribut color mengubah warna.',exitTicket:''})`),'submitted');});
  await test('later draft edit keeps submission v1 intact',async()=>{C(`G9Sync.enqueue({lessons:{1:{projectUrl:'https://app.bsd.education/share/abc',evidence:'Revisi: tambah cylinder hijau.',reflection:'Atribut color mengubah warna.',exitTicket:'',done:true}}})`);await C('G9Sync.flush()');const row=await admin('GET','learningProgress/s9a/grade9Vr/student/lessons/1');assert.equal(row.evidence,'Revisi: tambah cylinder hijau.');assert.deepEqual(row.submission,sub1);});
  await test('second submit → version 2',async()=>{await sleep(5);const r=await C(`G9Sync.submit(1,{projectUrl:'https://app.bsd.education/share/abc',evidence:'Revisi: tambah cylinder hijau.',reflection:'Atribut color mengubah warna.',exitTicket:''})`);assert.equal(r.submitted,true);const s=(await admin('GET','learningProgress/s9a/grade9Vr/student/lessons/1')).submission;assert.equal(s.version,2);assert.notEqual(s.requestId,sub1.requestId);});
  const studentDb=C(`firebase.app('grade9-student').database()`);
  await test('forged submission (version skip / fake timestamp) is rejected',async()=>{const cur=await admin('GET','learningProgress/s9a/grade9Vr/student/lessons/1');await denied(studentDb.ref('learningProgress/s9a/grade9Vr/student/lessons/1').set({...cur,revision:cur.revision+1,updatedAt:firebase.database.ServerValue.TIMESTAMP,submission:{...cur.submission,version:9,requestId:'forged-request-1',submittedAt:1}}),'forged submission');});
  await test('student cannot delete submission or write unknown fields',async()=>{const cur=await admin('GET','learningProgress/s9a/grade9Vr/student/lessons/1');const {submission,...rest}=cur;await denied(studentDb.ref('learningProgress/s9a/grade9Vr/student/lessons/1').set({...rest,revision:cur.revision+1,updatedAt:firebase.database.ServerValue.TIMESTAMP}),'drop submission');await denied(studentDb.ref('learningProgress/s9a/grade9Vr/student/lessons/1/score').set(100),'extra field');await denied(studentDb.ref('learningProgress/s9a/grade9Vr/student/lessons/10').set({x:1}),'lesson 10');});
  await test('student cannot write teacher review or grade fields',async()=>{await denied(studentDb.ref('learningProgress/s9a/grade9Vr/teacher/reviews/1').set({message:'ok',status:'accepted',sourceVersion:2,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:s9aUid}),'review');await denied(studentDb.ref('siswa/s9a/q2_f1').set(100),'q2_f1');await denied(studentDb.ref('siswa/s9a/grade9VrGrades/q2_f1').set({score:100,base:100,daysLate:0,reviewed:true,reviewedAt:firebase.database.ServerValue.TIMESTAMP,reviewedBy:s9aUid}),'grade meta');await denied(studentDb.ref('siswa/s9a/kelas').set('9B'),'kelas');});
  // second grade 9 student
  await C(`G9Sync.dispose()`);
  let s9bApp;
  await test('second student enrolls (separate app)',async()=>{const id='s9b';const a=rawInit(firebaseConfig,'g9b');a.auth().useEmulator('http://'+AUTH_HOST,{disableWarnings:true});const email='g9.'+'b'.repeat(32)+'.9@students.cs-report.invalid';await a.auth().createUserWithEmailAndPassword(email,PW.s9b);const uid=a.auth().currentUser.uid;await a.database().ref('grade9Enrollment/'+uid).set({studentId:id,proof:PW.s9b,at:firebase.database.ServerValue.TIMESTAMP});await a.database().ref('grade9VrAccounts/'+id).set({uid,email,grade:9,createdAt:firebase.database.ServerValue.TIMESTAMP,createdBy:uid});await a.database().ref('grade9Enrollment/'+uid+'/proof').remove();await a.database().ref('learningProgress/s9b/grade9Vr/student/lessons/1').set({projectUrl:'',evidence:'draft b',reflection:'',exitTicket:'',done:false,revision:1,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:uid});s9bApp=a;});
  await test('student cannot read/write another student grade9Vr',async()=>{await denied(studentDb.ref('learningProgress/s9b/grade9Vr').once('value'),'read other');await denied(studentDb.ref('learningProgress/s9b/grade9Vr/student/lessons/2').set({projectUrl:'',evidence:'x',reflection:'',exitTicket:'',done:false,revision:1,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:s9aUid}),'write other');await denied(s9bApp.database().ref('learningProgress/s9a/grade9Vr').once('value'),'b reads a');await denied(studentDb.ref('learningProgress').once('value'),'read all');});
  await test('grade 9 student cannot write grade8Games/grade11Ai',async()=>{await denied(studentDb.ref('learningProgress/s9a/grade8Games/student/lessons/1').set({projectUrl:'',evidence:'x',reflection:'',done:false,revision:1,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:s9aUid}));});

  section='[teacher] ';console.log('\nTeacher review and F1 grade');
  const tdb=main.database();
  await test('verified teacher reads grade 9 progress',async()=>{const v=(await tdb.ref('learningProgress').once('value')).val();assert.equal(v.s9a.grade9Vr.student.lessons[1].submission.version,2);});
  await test('teacher review must reference current submission version',async()=>{await denied(tdb.ref('learningProgress/s9a/grade9Vr/teacher/reviews/1').set({message:'lama',status:'seen',sourceVersion:1,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:teacherUid}),'stale review');await tdb.ref('learningProgress/s9a/grade9Vr/teacher/reviews/1').set({message:'Bagus! Jelaskan juga atribut position.',status:'accepted',sourceVersion:2,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:teacherUid});});
  await test('student sees teacher feedback via G9Sync.review (current)',async()=>{await C('G9Sync.init(local,onRemote)');for(let i=0;i<50&&!C('G9Sync.review(1)');i++)await sleep(50);const r=C('G9Sync.review(1)');assert.equal(r.status,'accepted');assert.equal(r.current,true);await C('G9Sync.dispose()');});
  await test('unverified teacher cannot review, grade or read progress',async()=>{const d=stranger.database();await denied(d.ref('learningProgress/s9a/grade9Vr/teacher/reviews/1').set({message:'x',status:'seen',sourceVersion:2,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:stranger.auth().currentUser.uid}));await denied(d.ref('siswa/s9a/q2_f1').set(10));await denied(d.ref('learningProgress/s9a').once('value'),'read');});
  const crit9=C(`dcGetCourseConfig(2,9).assessments.find(a=>a.id==='vrFundamentals').criteria`);
  async function rubricSave(id,plan){const d=C(`(()=>{const d=dcCreateEmptyDraft(2,9);d.rubricScores.vrFundamentals.criteria=${JSON.stringify(plan.criteria)};d.rubricScores.vrFundamentals.note=${JSON.stringify(plan.note)};d.reviewed.vrFundamentals=true;d.f1Late=${JSON.stringify(plan.meta)};const rec=dcBuildStoredRecord(d,2,'andi.purba@sdh.or.id',9);return {rec,fields:dcBuildGradebookFields(rec,2,9)};})()`);
    await tdb.ref('siswa/'+id).update({'digitalCitizenshipAssessment/q2':d.rec,...d.fields});return d;}
  await test('teacher applies F1 from submission to rubric and saves → q2_f1 only',async()=>{
    const s=(await tdb.ref('siswa/s9a').once('value')).val();ctx.allSiswa=[{id:'s9a',...s}];C(`G9VrMonitor.onProgress(${JSON.stringify((await tdb.ref('learningProgress').once('value')).val())})`);
    const plan=C(`G9VrMonitor.applyPlan(allSiswa[0],${JSON.stringify(crit9)})`);assert.equal(plan.meta.sourceVersion,2);assert.equal(plan.meta.dateSource,'submission');assert.match(plan.note,/^F1 VR: /);
    const sum=Math.round(Object.values(plan.criteria).reduce((n,x)=>n+x,0)*100)/100;assert.equal(sum,plan.meta.score);
    const d=await rubricSave('s9a',plan);assert.deepEqual(Object.keys(d.fields),['q2_f1']);
    const after=(await tdb.ref('siswa/s9a').once('value')).val();assert.equal(after.q2_f1,plan.meta.score);assert.equal(after.digitalCitizenshipAssessment.q2.reviewed.vrFundamentals,true);assert.equal(after.digitalCitizenshipAssessment.q2.f1Late.sourceVersion,2);
    for(const k of ['q1_f1','q2_f2','q2_f3','q2_sumatif','password','nama','kelas'])assert.deepEqual(after[k],s[k],'unchanged '+k);});
  await test('teacher manual F1 (no submission) for s9b: 6 days late → 74 via rubric',async()=>{
    const s=(await tdb.ref('siswa/s9b').once('value')).val();ctx.allSiswa=[{id:'s9b',...s}];C(`G9VrMonitor.onProgress({})`);
    C(`G9VrMonitor._setForm('s9b',{manualDate:'2026-10-26'})`);const plan=C(`G9VrMonitor.applyPlan(allSiswa[0],${JSON.stringify(crit9)})`);
    assert.equal(plan.meta.daysLate,6);assert.equal(plan.meta.score,74);assert.equal(plan.meta.dateSource,'manual');assert.equal(plan.meta.sourceVersion,0);assert.match(plan.note,/minimal KKM 74/);
    await rubricSave('s9b',plan);assert.equal((await tdb.ref('siswa/s9b/q2_f1').once('value')).val(),74);});
  await test('low quality base still floors at KKM; no date gives a clear error',async()=>{C(`G9VrMonitor._setForm('s9b',{base:'60',manualDate:'2026-10-19'})`);assert.equal(C(`G9VrMonitor.applyPlan(allSiswa[0],${JSON.stringify(crit9)})`).meta.score,74);
    C(`G9VrMonitor._setForm('s9b',{base:'100',manualDate:''})`);assert.throws(()=>C(`G9VrMonitor.applyPlan(allSiswa[0],${JSON.stringify(crit9)})`),/tanggal selesai/);});
  await test('grade metadata validation rejects bad records even for teacher',async()=>{await denied(tdb.ref('siswa/s9b/grade9VrGrades/q2_f1').set({score:120,base:100,daysLate:0,reviewed:true,reviewedAt:firebase.database.ServerValue.TIMESTAMP,reviewedBy:teacherUid}),'score>100');await denied(tdb.ref('siswa/s9b/grade9VrGrades/q2_f1').set({score:90,base:100,daysLate:0,reviewed:false,reviewedAt:firebase.database.ServerValue.TIMESTAMP,reviewedBy:teacherUid}),'unreviewed');});

  section='[password] ';console.log('\nPassword protections');
  const a1=anon().database();
  await test('anonymous user cannot change grade 9 password',async()=>{await denied(a1.ref('siswa/s9a/password').set('hacked-123'));await denied(a1.ref('siswa/s9c/password').set('hacked-123'),'unenrolled g9');});
  await test('anonymous user still cannot change grade 8 / 11 passwords',async()=>{await denied(a1.ref('siswa/s8/password').set('hacked-123'));await denied(a1.ref('siswa/s11/password').set('hacked-123'));});
  await test('[pre-existing behaviour] anonymous can still change grade 7 password',async()=>{await a1.ref('siswa/s7/password').set('Rahasia7B!');await admin('PUT','siswa/s7/password',PW.s7);});
  await test('bound grade 9 student cannot change another student password',async()=>{await C(`G9CloudIdentity.login('s9a',${JSON.stringify(PW.s9a)})`);await denied(C(`firebase.app('grade9-student').database()`).ref('siswa/s9b/password').set('hacked-123'));});
  await test('grade 9 student changes own password via G9CloudIdentity',async()=>{await C(`G9CloudIdentity.changeOwnPassword({id:'s9a'},${JSON.stringify(PW.s9a)},'Baru9A!!')`);assert.equal(await admin('GET','siswa/s9a/password'),'Baru9A!!');await C(`G9CloudIdentity.logout()`);const u=await C(`G9CloudIdentity.login('s9a','Baru9A!!')`);assert.equal(u.uid,s9aUid);});
  await test('teacher password reset rotates binding and revokes old session',async()=>{const row={id:'s9a',...(await admin('GET','siswa/s9a'))};await C(`G9CloudIdentity.updateTeacherStudent(${JSON.stringify(row)},{password:'Reset9A!!'})`);const b=await admin('GET','grade9VrAccounts/s9a');assert.notEqual(b.uid,s9aUid);assert.equal(b.createdBy,teacherUid);assert.equal(await admin('GET','siswa/s9a/password'),'Reset9A!!');
    await denied(C(`firebase.app('grade9-student').database()`).ref('learningProgress/s9a/grade9Vr').once('value'),'old session read');await C(`G9CloudIdentity.logout()`);const u=await C(`G9CloudIdentity.login('s9a','Reset9A!!')`);assert.equal(u.uid,b.uid);const v=(await C(`firebase.app('grade9-student').database()`).ref('learningProgress/s9a/grade9Vr/student/lessons/1/submission/version').once('value')).val();assert.equal(v,2,'submissions retained');await C(`G9CloudIdentity.logout()`);});

  section='[regression] ';console.log('\nGrade 8 and grade 11 flows');
  await test('grade 8: wrong password cannot enroll',async()=>{await assert.rejects(C(`G8CloudIdentity.login('s8','salah-sekali')`));assert.equal(await admin('GET','grade8GameAccounts/s8'),null);});
  let s8uid;
  await test('grade 8: enroll + proof removed + own draft/submission',async()=>{const u=await C(`G8CloudIdentity.login('s8',${JSON.stringify(PW.s8)})`);s8uid=u.uid;assert.equal((await admin('GET','grade8GameAccounts/s8')).uid,u.uid);assert.equal((await admin('GET','grade8Enrollment/'+u.uid)).proof,undefined);const d=C(`firebase.app('grade8-student').database()`);const TS=firebase.database.ServerValue.TIMESTAMP;await d.ref('learningProgress/s8/grade8Games/student/lessons/1').transaction(()=>({projectUrl:'https://example.test/game',evidence:'ubah kecepatan',reflection:'lebih cepat',done:true,revision:1,updatedAt:TS,updatedBy:u.uid,submission:{projectUrl:'https://example.test/game',evidence:'ubah kecepatan',reflection:'lebih cepat',done:true,version:1,requestId:'req-g8-0001',submittedAt:TS,submittedBy:u.uid}}));assert.equal((await admin('GET','learningProgress/s8/grade8Games/student/lessons/1/submission/version')),1);});
  await test('grade 8: student cannot write grade9Vr nor read others; teacher reviews',async()=>{const d=C(`firebase.app('grade8-student').database()`);await denied(d.ref('learningProgress/s8/grade9Vr/student/lessons/1').set({projectUrl:'',evidence:'x',reflection:'',exitTicket:'',done:false,revision:1,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:s8uid}));await denied(d.ref('learningProgress/s9a').once('value'));await tdb.ref('learningProgress/s8/grade8Games/teacher/reviews/1').set({message:'ok',status:'seen',sourceVersion:1,updatedAt:firebase.database.ServerValue.TIMESTAMP,updatedBy:teacherUid});await C(`G8CloudIdentity.logout()`);});
  await test('grade 8: g8 e-mail cannot enroll a grade 9 student',async()=>{const a=await rawUser('g8.'+'f'.repeat(32)+'.4@students.cs-report.invalid',PW.s9b,true);await denied(a.database().ref('grade8Enrollment/'+a.auth().currentUser.uid).set({studentId:'s9b',proof:PW.s9b,at:firebase.database.ServerValue.TIMESTAMP}));});
  await test('grade 11: teacher activates, student logs in and reads own data only',async()=>{await C(`G11CloudIdentity.activate({id:'s11',kelas:'11A',password:${JSON.stringify(PW.s11)}})`);const u=await C(`G11CloudIdentity.login('s11',${JSON.stringify(PW.s11)})`);const d=C(`firebase.app('grade11-student').database()`);await d.ref('learningProgress/s11/grade11Ai').once('value');await denied(d.ref('learningProgress/s9a/grade9Vr').once('value'));await denied(d.ref('siswa/s9a/password').set('hacked-123'));await d.ref('siswa/s11/password').set('Baru11A!!');});

  // Summary
  const failed=results.filter(r=>!r[1]);
  console.log(`\nSUMMARY: ${results.length-failed.length}/${results.length} passed, ${failed.length} failed`);
  for(const f of failed)console.log('  FAILED:',f[0]);
  await Promise.all(firebase.apps.map(a=>a.delete().catch(()=>{})));
  process.exit(failed.length?1:0);
})().catch(e=>{console.error('FATAL',e);process.exit(1);});
