import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const data=await fs.readFile(new URL('grade11-ai/data.js',root),'utf8');
const app=(await fs.readFile(new URL('grade11-ai/app.js',root),'utf8')).replace(/\nstart\(\)\.catch[\s\S]*$/,'');
const cloud=await fs.readFile(new URL('grade11-ai/cloud.js',root),'utf8');
const monitor=await fs.readFile(new URL('js/grade11-ai-monitor.js',root),'utf8');
const stored=new Map(),nodes=new Map();
function node(id){
  if(!nodes.has(id))nodes.set(id,{value:'',textContent:'',disabled:false,events:{},classList:{add(){},remove(){}},addEventListener(type,fn){this.events[type]=fn;},querySelector(){return null;}});
  return nodes.get(id);
}
const context=vm.createContext({URLSearchParams,URL,console,setTimeout,clearTimeout,crypto:globalThis.crypto,TextEncoder,
  location:{search:'?lang=id'},
  localStorage:{setItem:(k,v)=>stored.set(k,v),getItem:k=>stored.get(k)||null},
  document:{getElementById:node,querySelectorAll:()=>[]},
  g11TeacherVerified:false,g11Session:{id:'synthetic-grade11',className:'11A'}
});
vm.runInContext(data+'\n'+app,context);
const read=code=>vm.runInContext(code,context);
for(const lang of ['id','en'])for(const id of [1,4,13]){
  read(`language='${lang}'`);
  const html=read(`lessonHTML(LESSONS.find(l=>l.id===${id}))`);
  assert.match(html,/<label for="evidence">1\./);
  assert.match(html,/<label for="reflection">2\./);
  assert.match(html,/<section class="answer-guide"/);
  assert.match(html,/<p class="test-instructions">/);
  assert.ok(html.includes(lang==='id'?'Ganti dengan hasil uji milikmu sendiri.':'Replace them with your own test results.'));
}

// Exercise the real student input handlers, save queue and submit handler.
read("language='id'");
const written={
  evidence:'Saya mengubah K dari 1 ke 3.\nPrediksi: hasil lebih stabil. <b>teks siswa</b>',
  reflection:'K=1: 4/6 benar; K=3: 5/6 benar; K=5: 3/6 benar.\nKeterbatasan: cahaya berubah.'
};
read('bindLesson(LESSONS.find(l=>l.id===4))');
for(const key of ['evidence','reflection']){
  node(key).value=written[key];node(key).events.input();
}
read("lessonRecord(4).screenshots=[{name:'bukti-uji.jpg',data:'data:image/jpeg;base64,YWJjZA=='}]");
node('complete').events.click();
assert.equal(read('lessonRecord(4).done'),true);
assert.equal(read('lessonRecord(4).reflection'),written.reflection);

// Simulate the existing Firebase boundary; no real accounts or data are used.
let remote={},cloudListener,hydrated;const imageStore={};
function imageRef(id){return {
  async transaction(update){const next=update(imageStore[id]??null);if(next!==undefined)imageStore[id]=next;return {committed:next!==undefined,snapshot:{exists:()=>id in imageStore,val:()=>imageStore[id]??null}};},
  async once(){return {val:()=>imageStore[id]??null};}
};}
function firebaseRef(path){if(path.startsWith('learningEvidenceImages'))return {child:id=>id==='synthetic-grade11'?{child:imageRef}:imageRef(id)};return {
  child(key){return firebaseRef(path+'/'+key);},
  async transaction(update){const [kind,key]=path.split('/student/')[1].split('/');remote[kind]??={};remote[kind][key]=update(remote[kind][key]||null);return {committed:true};},
  async once(){return {val:()=>remote};},
  on(type,fn){if(path==='.info/connected')fn({val:()=>true});else if(path.endsWith('/teacher'))fn({val:()=>({reviews:{}})});else {cloudListener=fn;fn({val:()=>remote});}},off(){}
};}
const cloudDb={ref:firebaseRef};
context.db={};context.G11CloudIdentity={restore:async()=>({user:{uid:'test-uid'},db:cloudDb}),stamp:()=>123456,studentUid:'test-uid'};
vm.runInContext(cloud,context);
context.onRemote=value=>{hydrated=value;};
await read('G11Sync.init(practice,onRemote)');
await read('G11Sync.flush()');
for(let i=0;i<100&&read('G11Sync.statusText()')!=='✓ Tersimpan untuk guru';i++)await new Promise(r=>setTimeout(r,10));
assert.equal(remote.lessons[4].evidence,written.evidence);
assert.equal(remote.lessons[4].reflection,written.reflection);
assert.equal(remote.lessons[4].screenshots[0].name,'bukti-uji.jpg');
const shotId=remote.lessons[4].screenshots[0].imageId;
assert.match(shotId,/^[a-f0-9]{32}$/);
assert.equal(remote.lessons[4].screenshots[0].data,undefined,'lesson must not carry image bytes');
assert.equal(imageStore[shotId].data,'data:image/jpeg;base64,YWJjZA==');
assert.equal(imageStore[shotId].lesson,4);
assert.equal(remote.lessons[4].done,true);
assert.equal(remote.lessons[4].updatedBy,'test-uid');
await cloudListener({val:()=>remote});
assert.equal(hydrated.lessons[4].screenshots[0].data,'data:image/jpeg;base64,YWJjZA==','student view reloads the image');

const lazyImg={dataset:{g11Image:shotId},src:'',alt:'',removeAttribute(){}};
const panel={innerHTML:'',contains:()=>false,querySelectorAll:selector=>selector==='img[data-g11-image]'?[lazyImg]:[]};
const teacherContext=vm.createContext({
  document:{activeElement:null,getElementById:id=>id==='g11EvidencePanel'?panel:null},
  dcTeacherState:{grade:11,quarter:2,studentId:'synthetic-grade11',selectedAssessmentId:'g11AiFormative2',draft:{}},
  G11_AI_WEIGHTED_ASSESSMENTS:[],
  db:{ref:firebaseRef},
  escHtml:value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
});
vm.runInContext(monitor,teacherContext);
const teacher=code=>vm.runInContext(code,teacherContext);
teacherContext.progressFixture={'synthetic-grade11':{grade11Ai:{student:remote}}};
teacher('G11Monitor.onProgress(progressFixture)');
assert.ok(panel.innerHTML.includes('Saya mengubah K dari 1 ke 3.'));
assert.ok(panel.innerHTML.includes('Keterbatasan: cahaya berubah.'));
assert.ok(panel.innerHTML.includes('&lt;b&gt;teks siswa&lt;/b&gt;'));
assert.match(panel.innerHTML,/textarea readonly[^>]+id="g11-answer-l_4"/);
assert.match(panel.innerHTML,/textarea readonly[^>]+id="g11-result-l_4"/);
assert.ok(panel.innerHTML.includes('bukti-uji.jpg'));
assert.match(panel.innerHTML,/class="g11-proof-open"/);
assert.ok(panel.innerHTML.includes('data-g11-image="'+shotId+'"'),'teacher view loads the image lazily');
await new Promise(r=>setTimeout(r,0));
assert.equal(lazyImg.src,'data:image/jpeg;base64,YWJjZA==');
assert.equal(teacher("G11Monitor.version('synthetic-grade11','g11AiFormative2')"),'lessons/4:'+remote.lessons[4].revision);
for(const [index,key]of [[1,1],[2,4],[3,13]]){
  teacher(`dcTeacherState.selectedAssessmentId='g11AiFormative${index}';G11Monitor.renderEvidence()`);
  assert.ok(panel.innerHTML.includes(`id="g11-answer-l_${key}"`));
  assert.ok(panel.innerHTML.includes(`id="g11-result-l_${key}"`));
  assert.equal((panel.innerHTML.match(/class="g11-evidence-switch"/g)||[]).length,3);
  if(key!==4)assert.ok(panel.innerHTML.includes('Belum diisi siswa.'));
}
teacher("G11Monitor.onProgressError({message:'Permission denied'})");
assert.ok(panel.innerHTML.includes('Bukti Firebase belum dapat dimuat.'));
teacher('G11Monitor.onProgress(progressFixture)');
assert.ok(!panel.innerHTML.includes('Bukti Firebase belum dapat dimuat.'));
read('G11Sync.dispose()');
console.log('PASS: F1/F2/F3 bilingual guidance, student submit → Firebase boundary → teacher answers/screenshots, empty answers, and load error recovery.');
