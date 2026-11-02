/* Grade 9 VR Studio: teacher evidence + F1 grading, connected to the rubric.
 * Reads learningProgress/{id}/grade9Vr (written only by the bound student) and
 * writes feedback to grade9Vr/teacher/reviews. Grades are saved ONLY through the
 * main rubric workspace (saveDcAssessment): the late-penalty calculator fills the
 * rubric component "01 A-Frame Fundamentals" (vrFundamentals -> q2_f1) and marks
 * it reviewed. For the grade 9 Q2 VR course, only reviewed components write
 * their gradebook field (q2_f1/q2_f2/q2_f3), and q2_sumatif only when both
 * summative components are reviewed. */
/* Grade 9 Q2 VR projects P1–P3 → F1–F3. Teacher rule per project:
 * score = max(KKM, 0.7 × BSD course completion % + 0.3 × challenge score − 5 × days late). */
const G9_VR_GRADING=Object.freeze({
  q2_f1:Object.freeze({key:'q2_f1',label:'F1',number:'01',field:'q2_f1',metaKey:'f1Late',quarter:2,lessonId:1,assessmentId:'vrFundamentals',
    title:'VR Studio project 1 · BSD “Set up A-Frame” + tantangan',
    dueDate:'2026-10-26',          // inclusive, end of day Asia/Jakarta (UTC+7)
    courseWeight:70,challengeWeight:30,penaltyPerDay:5,baseDefault:100,utcOffsetHours:7}),
  q2_f2:Object.freeze({key:'q2_f2',label:'F2',number:'02',field:'q2_f2',metaKey:'f2Late',quarter:2,lessonId:2,assessmentId:'modelsAnimation',
    title:'VR Studio project 2 · course BSD + tantangan',
    dueDate:'2026-11-01',courseWeight:70,challengeWeight:30,penaltyPerDay:5,baseDefault:100,utcOffsetHours:7}),
  q2_f3:Object.freeze({key:'q2_f3',label:'F3',number:'03',field:'q2_f3',metaKey:'f3Late',quarter:2,lessonId:3,assessmentId:'interactiveVr',
    title:'VR Studio project 3 · course BSD + tantangan',
    dueDate:'2026-11-08',courseWeight:70,challengeWeight:30,penaltyPerDay:5,baseDefault:100,utcOffsetHours:7})
});
/* Challenge rubric per project (0–100, counts for 30% of the project grade). Based on each
 * meeting's challenge and "Bukti yang diminta" in grade9-vr/data.js. */
const G9_VR_CHALLENGE_RUBRIC=Object.freeze({
  1:Object.freeze([{id:'second',label:'Objek kedua dengan warna berbeda ada di scene (link BSD terbuka)',max:30},{id:'layout',label:'Kedua objek terlihat jelas, posisinya tidak bertumpuk',max:20},{id:'colorCode',label:'Menjelaskan kode yang menentukan warna (color/hex)',max:20},{id:'positionCode',label:'Menjelaskan kode yang menentukan posisi (position x y z)',max:20},{id:'reflection',label:'Refleksi dijawab dengan kalimat sendiri',max:10}]),
  2:Object.freeze([{id:'model',label:'Model gabungan (pohon/kursi/meja) tersusun dari beberapa bentuk',max:30},{id:'parent',label:'Bentuk-bentuk dikelompokkan dalam satu objek induk',max:20},{id:'transform',label:'Memindah atau memutar seluruh model lewat objek induk berhasil',max:20},{id:'explain',label:'Menjelaskan perubahan posisi/rotasi yang terjadi melalui induk',max:20},{id:'reflection',label:'Refleksi dijawab dengan kalimat sendiri',max:10}]),
  3:Object.freeze([{id:'twoMoods',label:'Dua versi suasana (A dan B) dibuat pada scene yang sama',max:30},{id:'difference',label:'Perbedaan tekstur atau pencahayaan terlihat jelas',max:20},{id:'compare',label:'Menjelaskan perbedaan versi A dan B',max:20},{id:'reason',label:'Memberi alasan memilih versi yang sesuai tema',max:20},{id:'reflection',label:'Refleksi dijawab dengan kalimat sendiri',max:10}])
});
/* Teacher due dates per VR Studio project (meeting); inclusive, end of day WIB.
 * Derived from G9_VR_GRADING; used for the "Terlambat" badge in the submission overview. */
const G9_VR_LESSON_DUE=Object.freeze(Object.fromEntries(Object.values(G9_VR_GRADING).map(c=>[c.lessonId,c.dueDate])));
const G9_VR_COURSE_ID='codeYourOwnWorldVr';
const G9_VR_FORMATIVE=Object.freeze([['vrFundamentals','q2_f1'],['modelsAnimation','q2_f2'],['interactiveVr','q2_f3']]);
const G9_VR_SUMMATIVE=Object.freeze(['vrDiorama','vrWalkthrough']);
/* "Bukti yang diminta" shown to students per meeting (grade9-vr/data.js submitEvidence;
 * the emulator test checks that both stay identical). */
const G9_VR_LESSON_EVIDENCE=Object.freeze({1:Object.freeze({title:"Halo, dunia virtual!",evidence:"Tautan BSD scene berisi dua objek + penjelasan fungsi scene dan satu atribut."}),
  2:Object.freeze({title:"Bentuk jadi sebuah cerita",evidence:"Tautan BSD objek gabungan + penjelasan satu perubahan posisi atau rotasi melalui objek induk."}),
  3:Object.freeze({title:"Ciptakan suasananya",evidence:"Tautan BSD yang menampilkan dua suasana (jelaskan perbedaan versi A dan B) + alasan memilih salah satu."}),
  4:Object.freeze({title:"Bawa aset ke duniamu",evidence:"Tautan BSD model dengan ukuran yang sesuai + catatan sumber + penjelasan kendala dan pemeriksaannya."}),
  5:Object.freeze({title:"Dunia yang merespons",evidence:"Tautan BSD interaksi yang berjalan + satu temuan dari teman + satu perbaikan."}),
  6:Object.freeze({title:"Rancang diorama milikmu",evidence:"Tautan BSD scene awal di Sandbox + uraian sketsamu (tema dan tata letak) + daftar fitur minimum."}),
  7:Object.freeze({title:"Bangun, uji, pecahkan",evidence:"Tautan BSD prototipe diorama + satu catatan debugging (dugaan → perubahan → hasil) + penjelasan kode."}),
  8:Object.freeze({title:"Lihat dari mata pengguna",evidence:"Tautan BSD versi final + uraian keadaan sebelum dan sesudah revisi + alasan revisi."}),
  9:Object.freeze({title:"Saatnya menunjukkan karyamu",evidence:"Tautan BSD diorama final + ringkasan dokumentasi proses + bagian kode yang kamu jelaskan. Demonstrasi dan tes konsep dilakukan di kelas."})});

const G9VrGrades=(()=>{
  const DAY=86400000;
  const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+'T00:00:00Z'))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;
  /** Calendar date (YYYY-MM-DD) of a timestamp in WIB (UTC+7, no DST). */
  function localDate(ms,offsetHours=7){const n=Number(ms);if(!Number.isFinite(n))return '';return new Date(n+offsetHours*3600000).toISOString().slice(0,10);}
  /** Calendar days after the due date (0 when on/before it). */
  function daysLate(completedOn,dueDate){if(!validDate(completedOn)||!validDate(dueDate))return null;return Math.max(0,Math.round((Date.parse(completedOn+'T00:00:00Z')-Date.parse(dueDate+'T00:00:00Z'))/DAY));}
  const clamp=n=>Math.min(100,Math.max(0,Number(n)));
  const round2=n=>Math.round(n*100)/100;
  /** Teacher rule: score = max(KKM, base − penaltyPerDay × daysLate). KKM is
   * always the floor, also when the teacher lowers the base for quality. */
  function suggestedScore({base=100,daysLate:late=0,kkm=0,penaltyPerDay=5}={}){const b=clamp(base),d=Math.max(0,Number(late)||0);if(!Number.isFinite(b))return null;const floor=clamp(kkm)||0;return round2(Math.max(floor,b-penaltyPerDay*d));}
  /** Completion date: manual teacher date wins; otherwise the submission timestamp in WIB. */
  function completion(config,{manualDate='',submittedAt=null}={}){if(validDate(manualDate))return {completedOn:manualDate,dateSource:'manual'};if(Number.isFinite(Number(submittedAt))&&submittedAt!==null)return {completedOn:localDate(submittedAt,config.utcOffsetHours),dateSource:'submission'};return {completedOn:'',dateSource:''};}
  /** 70/30 base: courseWeight% of BSD course completion (0–100) + challengeWeight% of the challenge score (0–100). */
  function weightedBase(course,challenge,cfg={courseWeight:70,challengeWeight:30}){const c=Number(course),h=Number(challenge);if(course===''||challenge===''||course==null||challenge==null||!Number.isFinite(c)||!Number.isFinite(h)||c<0||c>100||h<0||h>100)return null;return round2((cfg.courseWeight*c+cfg.challengeWeight*h)/100);}
  function compute(config,{base,course,challenge,kkm,manualDate,submittedAt}){if(course!==undefined||challenge!==undefined){const w=weightedBase(course,challenge,config);base=w===null?NaN:w;}const c=completion(config,{manualDate,submittedAt});const late=c.completedOn?daysLate(c.completedOn,config.dueDate):null;return {...c,base,daysLate:late,suggested:late===null||!Number.isFinite(Number(base))?null:suggestedScore({base,daysLate:late,kkm,penaltyPerDay:config.penaltyPerDay})};}
  /** Split a 0–100 score over rubric criteria proportionally to their maxima so the
   * criteria sum exactly to the score and none exceeds its maximum. */
  function distribute(score,criteria){const total=criteria.reduce((n,c)=>n+Number(c.max||0),0),target=Math.min(total,Math.max(0,round2(Number(score)*total/100)));
    const rows=criteria.map(c=>{const exact=Number(c.max)*target/total;return {id:c.id,max:Number(c.max),v:Math.floor(exact),frac:exact-Math.floor(exact)};});
    let left=round2(target-rows.reduce((n,r)=>n+r.v,0));
    for(const r of [...rows].sort((a,b)=>b.frac-a.frac||b.max-a.max)){if(left<=0)break;const add=Math.min(r.max-r.v,left>=1?1:left);r.v=round2(r.v+add);left=round2(left-add);}
    for(const r of [...rows].sort((a,b)=>b.max-a.max)){if(left<=0)break;const add=Math.min(r.max-r.v,left);r.v=round2(r.v+add);left=round2(left-add);}
    return Object.fromEntries(rows.map(r=>[r.id,r.v]));}
  function auditNote(meta){if(!meta)return '';const label=meta.label||'F1',raw=round2(meta.base-meta.penaltyPerDay*meta.daysLate),src=meta.dateSource==='manual'?'tanggal manual guru':'kiriman CS.Report v'+meta.sourceVersion;
    const parts=meta.course!=null&&meta.challenge!=null&&Number.isFinite(Number(meta.course))&&Number.isFinite(Number(meta.challenge))?(meta.allSteps?'semua step selesai, ':'')+'course '+meta.course+'% × '+(meta.courseWeight/100)+' + challenge '+meta.challenge+' × '+(meta.challengeWeight/100)+' = '+meta.base+'; ':'';
    return label+' VR: '+parts+'selesai '+meta.completedOn+' ('+src+'), batas '+meta.dueDate+', terlambat '+meta.daysLate+' hari: '+meta.base+' − '+meta.penaltyPerDay+'×'+meta.daysLate+' = '+raw+(meta.score>raw?' → minimal KKM '+meta.kkm:'')+' → nilai '+meta.score+'.';}
  return {localDate,daysLate,suggestedScore,weightedBase,completion,compute,distribute,auditNote,validDate};
})();

/* Rubric integration: reviewed-only gradebook sync for the grade 9 Q2 VR course. */
const G9VrRubric=(()=>{
  const ready=()=>typeof dcCreateEmptyDraft==='function'&&typeof dcGetCourseConfig==='function';
  const isVr=(quarter,grade,override=null)=>(override||(ready()?dcGetCourseConfig(quarter,grade):null))?.id===G9_VR_COURSE_ID;
  const ids=()=>(dcGetCourseConfig(2,9)?.assessments||[]).map(a=>a.id);
  function install(){
    if(!ready()||install.done)return;install.done=true;
    const baseCreate=dcCreateEmptyDraft,baseRead=dcDraftFromStored,baseRecord=dcBuildStoredRecord,baseFields=dcBuildGradebookFields,baseFormative=dcBuildFormativeGradebookFields;
    dcCreateEmptyDraft=function(quarter=1,grade=9,override=null){const d=baseCreate(quarter,grade,override);if(isVr(quarter,grade,override))d.reviewed=Object.fromEntries(ids().map(id=>[id,false]));return d;};
    dcDraftFromStored=function(stored,quarter=1,grade=9,override=null){const d=baseRead(stored,quarter,grade,override);if(isVr(quarter,grade,override)){d.reviewed=Object.fromEntries(ids().map(id=>[id,stored?.reviewed?.[id]===true]));for(const c of Object.values(G9_VR_GRADING))if(stored?.[c.metaKey])d[c.metaKey]=JSON.parse(JSON.stringify(stored[c.metaKey]));}return d;};
    dcBuildStoredRecord=function(draft,quarter,updatedBy,grade=9){const r=baseRecord(draft,quarter,updatedBy,grade);if(isVr(quarter,grade)){r.reviewed={...(draft.reviewed||{})};for(const c of Object.values(G9_VR_GRADING)){if(draft[c.metaKey]&&draft.reviewed?.[c.assessmentId]===true)r[c.metaKey]=JSON.parse(JSON.stringify(draft[c.metaKey]));else delete r[c.metaKey];}}return r;};
    const filter=(record,quarter,grade,fields)=>{if(!isVr(quarter,grade))return fields;const out={...fields},rev=record?.reviewed||{};
      for(const [id,field] of G9_VR_FORMATIVE)if(rev[id]!==true)delete out[field];
      if(!G9_VR_SUMMATIVE.every(id=>rev[id]===true))delete out['q'+Number(quarter)+'_sumatif'];return out;};
    dcBuildGradebookFields=function(record,quarter,grade=9){return filter(record,quarter,grade,baseFields(record,quarter,grade));};
    dcBuildFormativeGradebookFields=function(record,quarter,grade=9){return filter(record,quarter,grade,baseFormative(record,quarter,grade));};
    if(typeof window!=='undefined')Object.assign(window,{dcCreateEmptyDraft,dcDraftFromStored,dcBuildStoredRecord,dcBuildGradebookFields,dcBuildFormativeGradebookFields});
  }
  const isWorkspace=()=>typeof dcTeacherState!=='undefined'&&dcTeacherState.grade===9&&dcTeacherState.quarter===2&&isVr(2,9);
  return {install,isVr,isWorkspace};
})();
G9VrRubric.install();

const G9VrMonitor=(()=>{
  let progress={},started=false,filter='all',progressError='',forms={},viewed={},monitorLesson=1,sortBy='name';const expanded=new Set();
  let config=G9_VR_GRADING.q2_f1;
  const BY_LESSON=Object.fromEntries(Object.values(G9_VR_GRADING).map(c=>[c.lessonId,c])),BY_ASSESSMENT=Object.fromEntries(Object.values(G9_VR_GRADING).map(c=>[c.assessmentId,c]));
  const use=c=>{if(c)config=c;return config;};
  const workspaceConfig=()=>BY_ASSESSMENT[typeof dcTeacherState!=='undefined'?dcTeacherState.selectedAssessmentId:'']||G9_VR_GRADING.q2_f1;
  const esc=s=>(typeof escHtml==='function'?escHtml(String(s??'')):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
  const students=()=>(typeof allSiswa!=='undefined'?allSiswa:[]).filter(s=>/^9/.test(String(s.kelas||'').trim()));
  const lesson=id=>progress[id]?.student?.lessons?.[config.lessonId]||null;
  /* The evidence viewer can show any meeting; the calculator uses the selected project's lessonId. */
  const viewId=id=>viewed[id+':'+config.key]||config.lessonId;
  const lessonRow=(id,n)=>progress[id]?.student?.lessons?.[n]||null;
  function requiredHTML(n){const b=G9_VR_LESSON_EVIDENCE[n];return b?'<div class="g9vr-required"><b>Bukti yang diminta · pertemuan '+esc(n)+' ('+esc(b.title)+')</b><p>'+esc(b.evidence)+'</p></div>':'';}
  function lessonOptions(id,n){return Object.keys(G9_VR_LESSON_EVIDENCE).map(Number).map(k=>{const r=lessonRow(id,k),st=r?.submission?'terkirim v'+r.submission.version:r?'draft':'belum ada';return '<option value="'+k+'"'+(k===n?' selected':'')+'>Pertemuan '+k+' · '+esc(G9_VR_LESSON_EVIDENCE[k].title)+' · '+st+'</option>';}).join('');}
  const wib=ms=>Number.isFinite(Number(ms))?new Date(Number(ms)).toLocaleString('id-ID',{timeZone:'Asia/Jakarta',dateStyle:'medium',timeStyle:'short'})+' WIB':'—';
  /** Separate date and time (WIB) for the submission overview. */
  const wibParts=ms=>{const n=Number(ms);if(!Number.isFinite(n)||ms===null)return null;const d=new Date(n);return {date:d.toLocaleDateString('id-ID',{timeZone:'Asia/Jakarta',weekday:'short',day:'numeric',month:'short',year:'numeric'}),time:d.toLocaleTimeString('id-ID',{timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit'})+' WIB'};};
  /** Status of one meeting for one student: submitted snapshot, online draft, or nothing. */
  function lessonState(id,n){const row=lessonRow(id,n),sub=row?.submission||null;return {row,sub,kind:sub?'submitted':row?'draft':'none',review:progress[id]?.teacher?.reviews?.[n]||null};}
  const dueText=d=>G9VrGrades.validDate(d)?new Date(d+'T12:00:00+07:00').toLocaleDateString('id-ID',{timeZone:'Asia/Jakarta',weekday:'long',day:'numeric',month:'long',year:'numeric'}):'';
  const REVIEW_LABEL={seen:'Sudah dilihat',needs_revision:'Perlu revisi',accepted:'Diterima'};
  const safeUrl=v=>{try{const u=new URL(String(v||'').trim());return u.protocol==='https:'?u.href:'';}catch{return '';}};
  const kkmFor=s=>typeof getKKM==='function'?getKKM(s?.kelas):74;
  const stored=s=>s?.digitalCitizenshipAssessment?.q2||null;
  const reviewedF1=s=>stored(s)?.courseId===G9_VR_COURSE_ID&&stored(s)?.reviewed?.[config.assessmentId]===true;
  const metaOf=s=>stored(s)?.[config.metaKey]||null;
  function isPending(s){const sub=lesson(s.id)?.submission;if(!sub)return false;if(!reviewedF1(s))return true;return Number(metaOf(s)?.sourceVersion||0)<Number(sub.version);}
  function status(s){const row=lesson(s.id),sub=row?.submission,parts=[];parts.push(sub?'Terkirim v'+sub.version+' · '+wib(sub.submittedAt):row?'Draft online · belum diajukan':'Belum ada kiriman CS.Report');
    parts.push(reviewedF1(s)?config.label+' = '+(s[config.field]??'—')+(sub&&Number(metaOf(s)?.sourceVersion||0)<Number(sub.version)?' · ada kiriman baru':''):config.label+' belum dinilai');return parts.join(' · ');}
  function form(s){const k=config.key+':'+s.id,meta=metaOf(s);if(!forms[k])forms[k]={allSteps:meta?.allSteps===true,course:meta?.course!=null&&meta?.allSteps!==true?String(meta.course):'',rubric:{...(meta?.challengeScores||{})},challenge:meta?.challenge!=null&&!meta?.challengeScores?String(meta.challenge):'',base:meta&&meta.course==null?String(meta.base):'',manualDate:meta?.dateSource==='manual'?meta.completedOn:'',feedback:null};return forms[k];}
  /** 70/30 when both course % and challenge are filled; a legacy single base is used otherwise. */
  const courseOf=f=>f.allSteps?100:f.course;
  const rubricOf=()=>G9_VR_CHALLENGE_RUBRIC[config.lessonId]||[];
  /** Challenge 0–100 = sum of the project's challenge rubric (all criteria filled); a legacy single value otherwise. */
  function challengeOf(f){const r=rubricOf(),vals=r.map(c=>f.rubric?.[c.id]);if(r.length&&vals.every(v=>v!==''&&v!=null&&Number.isFinite(Number(v)))){if(r.some((c,i)=>Number(vals[i])<0||Number(vals[i])>c.max))return '';return Math.round(vals.reduce((n,v)=>n+Number(v),0)*100)/100;}return f.challenge;}
  function baseOf(f){const w=G9VrGrades.weightedBase(courseOf(f),challengeOf(f),config);if(w!==null)return w;return f.base!==''&&f.base!=null?Number(f.base):NaN;}
  function calc(s){const f=form(s),sub=lesson(s.id)?.submission;return G9VrGrades.compute(config,{base:baseOf(f),kkm:kkmFor(s),manualDate:f.manualDate,submittedAt:sub?.submittedAt??null});}
  /** Pure: what "Terapkan ke rubrik" writes into the draft. */
  function applyPlan(s,criteria,key){if(key)use(G9_VR_GRADING[key]);const f=form(s),c=calc(s),sub=lesson(s.id)?.submission,base=baseOf(f),w=G9VrGrades.weightedBase(courseOf(f),challengeOf(f),config);
    if(!(Number.isFinite(base)&&base>=0&&base<=100))throw Error('Centang “semua step selesai” atau isi persentase course BSD, lalu isi semua kriteria rubrik challenge.');
    if(c.suggested===null)throw Error('Isi tanggal selesai (atau tunggu kiriman siswa) terlebih dahulu.');
    const meta={label:config.label,field:config.field,allSteps:f.allSteps===true,course:w===null?null:Number(courseOf(f)),challenge:w===null?null:Number(challengeOf(f)),challengeScores:w!==null&&rubricOf().every(c=>f.rubric?.[c.id]!==''&&f.rubric?.[c.id]!=null)?Object.fromEntries(rubricOf().map(c=>[c.id,Number(f.rubric[c.id])])):null,courseWeight:config.courseWeight,challengeWeight:config.challengeWeight,score:c.suggested,base,daysLate:c.daysLate,penaltyPerDay:config.penaltyPerDay,kkm:Number(kkmFor(s))||0,dueDate:config.dueDate,completedOn:c.completedOn,dateSource:c.dateSource,sourceVersion:Number(sub?.version||0),lessonId:config.lessonId};
    return {criteria:G9VrGrades.distribute(c.suggested,criteria),meta,note:G9VrGrades.auditNote(meta)};}
  function formHTML(r){const url=safeUrl(r?.projectUrl);return (url?'<p><a class="dc-save-button" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Buka karya BSD ↗</a> <small>'+esc(url)+'</small></p>':'<p class="g11-evidence-missing">Tautan belum valid.</p>')+'<label>Penjelasan bukti · jawaban siswa<textarea readonly rows="4" class="g11-student-answer">'+esc(r?.evidence||'')+'</textarea></label><label>Refleksi · jawaban siswa<textarea readonly rows="3" class="g11-student-answer">'+esc(r?.reflection||'')+'</textarea></label>'+(r?.exitTicket?'<label>Exit ticket<textarea readonly rows="2" class="g11-student-answer">'+esc(r.exitTicket)+'</textarea></label>':'');}
  function evidenceHTML(row,n=config.lessonId){const required=requiredHTML(n);if(!row)return required+'<p class="g11-evidence-missing">Belum ada bukti di CS.Report'+(n===config.lessonId?'. Nilai '+config.label+' tetap bisa dihitung dari tanggal selesai BSD (isi manual).':' untuk pertemuan ini.')+'</p>';const show=formHTML;const sub=row.submission;return required+(sub?'<h5>Kiriman v'+esc(sub.version)+' · diterima '+esc(wib(sub.submittedAt))+'</h5>'+show(sub):'<h5>Draft online · belum diajukan</h5>'+show(row))+(sub&&['projectUrl','evidence','reflection','exitTicket'].some(k=>String(row[k]||'')!==String(sub[k]||''))?'<details><summary>Draft lebih baru · belum diajukan</summary>'+show(row)+'</details>':'');}
  const STYLE='<style>#g9EvidencePanel{margin:14px 0}#g9EvidencePanel input[type=number],#g9EvidencePanel input[type=date],#g9EvidencePanel select,#g9EvidencePanel textarea{width:100%;color:#e2e8f0;background:#111827;border:1px solid #475569;border-radius:8px;padding:10px;color-scheme:dark}#g9EvidencePanel .g9vr-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}#g9EvidencePanel .g9vr-calc{padding:10px;border-radius:8px;background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.3)}#g9EvidencePanel .g9vr-stale{color:#fbbf24}#g9EvidencePanel .g9vr-allsteps{display:flex;align-items:center;gap:8px;font-weight:700;grid-column:1/-1}#g9EvidencePanel .g9vr-allsteps input{width:18px;height:18px}#g9EvidencePanel .g9vr-part{margin:12px 0 6px;font-weight:800;color:#6ee7b7}#g9EvidencePanel .g9vr-rubric label{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:6px 0;border-bottom:1px solid #1f2937}#g9EvidencePanel .g9vr-rmax{white-space:nowrap}#g9EvidencePanel .g9vr-rubric input{width:72px!important;padding:6px!important}#g9EvidencePanel .g9vr-required{margin:10px 0;padding:10px 12px;border-left:4px solid #34d399;border-radius:8px;background:rgba(52,211,153,.08)}#g9EvidencePanel .g9vr-required p{margin:4px 0 0}</style>';
  function challengeText(f){const v=challengeOf(f);return v===''||v==null?'isi semua kriteria':'challenge '+v+'/100 → '+(Math.round(Number(v)*config.challengeWeight)/100)+' poin';}
  function calcText(c){if(!c.completedOn)return 'Isi tanggal selesai (atau tunggu kiriman siswa) untuk menghitung nilai.';if(c.suggested===null)return 'Tanggal dipakai: <b>'+esc(c.completedOn)+'</b> · terlambat <b>'+esc(c.daysLate)+'</b> hari. Isi persentase course dan nilai challenge.';return 'Nilai dasar <b>'+esc(c.base)+'</b> (70% course + 30% challenge) · tanggal dipakai: <b>'+esc(c.completedOn)+'</b> ('+(c.dateSource==='manual'?'manual guru':'stempel kiriman CS.Report, WIB')+') · terlambat <b>'+esc(c.daysLate)+'</b> hari · nilai '+esc(config.label)+' <b>'+esc(c.suggested)+'</b>';}
  function renderEvidence(force=false){const target=typeof document!=='undefined'?document.getElementById('g9EvidencePanel'):null;if(!target||!G9VrRubric.isWorkspace())return;if(!force&&target.contains(document.activeElement)&&document.activeElement.tagName!=='BUTTON')return;
    use(workspaceConfig());const s=students().find(x=>x.id===dcTeacherState.studentId);if(!s){target.innerHTML='';return;}
    const n=viewId(s.id),f1sub=lesson(s.id)?.submission,row=lessonRow(s.id,n),sub=row?.submission,review=progress[s.id]?.teacher?.reviews?.[n],f=form(s),c=calc(s),kkm=kkmFor(s),fb=(f.feedback&&f.feedback.lesson===n?f.feedback:null)||review||{},meta=dcTeacherState.draft?.[config.metaKey];
    const stale=f1sub&&meta&&dcTeacherState.draft?.reviewed?.[config.assessmentId]===true&&Number(meta.sourceVersion||0)<Number(f1sub.version);
    target.innerHTML=STYLE+'<div class="g11-evidence"><h4>Bukti & nilai '+esc(config.label)+' (project '+esc(config.lessonId)+') · '+esc(s.nama)+'</h4><p class="g11-evidence-caption">'+esc(config.title)+'. Batas '+esc(dueText(config.dueDate))+' (akhir hari WIB). Terlambat −'+config.penaltyPerDay+'/hari, nilai minimal KKM '+esc(kkm)+'.</p>'+
      (stale?'<p class="g9vr-stale" role="alert">Siswa mengirim versi '+esc(config.label)+' baru (v'+esc(f1sub.version)+') setelah dinilai dari v'+esc(meta.sourceVersion)+'. Periksa ulang lalu simpan.</p>':'')+'<label>Lihat bukti pertemuan<select class="g9vr-lesson">'+lessonOptions(s.id,n)+'</select></label>'+evidenceHTML(row,n)+
      (sub?'<label>Feedback guru<textarea maxlength="2000" class="g9vr-feedback">'+esc(fb.message||'')+'</textarea></label><label>Status feedback<select class="g9vr-feedback-status"><option value="seen">Sudah dilihat</option><option value="needs_revision" '+(fb.status==='needs_revision'?'selected':'')+'>Perlu revisi</option><option value="accepted" '+(fb.status==='accepted'?'selected':'')+'>Diterima</option></select></label>'+(review&&review.sourceVersion!==sub.version?'<small>Feedback tersimpan untuk kiriman versi '+esc(review.sourceVersion)+'.</small>':'')+'<button type="button" class="dc-save-button g9vr-feedback-save" data-version="'+esc(sub.version)+'" data-lesson="'+esc(n)+'">Kirim feedback pertemuan '+esc(n)+'</button>':'')+
      '<h5>Hitung nilai '+esc(config.label)+' · 70% course + 30% challenge</h5><p class="g9vr-part">A. Course BSD (70%)</p><div class="g9vr-grid"><label class="g9vr-allsteps"><input type="checkbox" class="g9vr-all"'+(f.allSteps?' checked':'')+'> Semua step course BSD selesai → otomatis 70%</label><label>Course BSD selesai (%) · isi manual bila belum semua step<input type="number" min="0" max="100" step="1" class="g9vr-course" placeholder="mis. 80"'+(f.allSteps?' value="100" disabled':' value="'+esc(f.course)+'"')+'></label><label>Tanggal selesai manual (dari BSD, opsional)<input type="date" class="g9vr-date" value="'+esc(f.manualDate)+'"></label></div>'+
      '<p class="g9vr-part">B. Rubrik challenge project '+esc(config.lessonId)+' (30%) · <span class="g9vr-ch-total">'+challengeText(f)+'</span></p><div class="g9vr-rubric">'+rubricOf().map(c=>'<label><span>'+esc(c.label)+'</span><span class="g9vr-rmax"><input type="number" min="0" max="'+c.max+'" step="1" class="g9vr-rc" data-id="'+esc(c.id)+'" value="'+esc(f.rubric?.[c.id]??'')+'"> / '+c.max+'</span></label>').join('')+'</div>'+
      '<p class="g9vr-calc" aria-live="polite">'+calcText(c)+'</p><button type="button" class="dc-save-button g9vr-apply" '+(c.suggested===null?'disabled':'')+'>Terapkan ke rubrik</button> <small>Mengisi kriteria komponen '+esc(config.number)+' sesuai nilai, menulis catatan, dan menandai “sudah diperiksa”. Lalu tekan <b>Simpan penilaian</b>.</small></div>';
    bind(target,s);}
  function bind(box,s){const f=form(s),q=sel=>box.querySelector(sel);
    const refresh=()=>{const c=calc(s);q('.g9vr-calc').innerHTML=calcText(c);q('.g9vr-apply').disabled=c.suggested===null;};
    q('.g9vr-course').addEventListener('input',e=>{f.course=e.target.value;refresh();});
    q('.g9vr-all').addEventListener('change',e=>{f.allSteps=e.target.checked;const c=q('.g9vr-course');c.disabled=f.allSteps;c.value=f.allSteps?'100':(f.course||'');refresh();});
    box.querySelectorAll('.g9vr-rc').forEach(i=>i.addEventListener('input',e=>{f.rubric={...(f.rubric||{}),[e.target.dataset.id]:e.target.value};q('.g9vr-ch-total').textContent=challengeText(f);refresh();}));
    q('.g9vr-date').addEventListener('input',e=>{f.manualDate=e.target.value;refresh();});
    q('.g9vr-apply').addEventListener('click',()=>apply(s));
    q('.g9vr-lesson').addEventListener('change',e=>{viewed[s.id+':'+config.key]=Number(e.target.value)||config.lessonId;renderEvidence(true);});
    const fb=q('.g9vr-feedback-save');if(fb){const remember=()=>{f.feedback={lesson:Number(fb.dataset.lesson),message:q('.g9vr-feedback').value,status:q('.g9vr-feedback-status').value};};q('.g9vr-feedback').addEventListener('input',remember);q('.g9vr-feedback-status').addEventListener('change',remember);fb.addEventListener('click',async()=>{fb.disabled=true;try{const teacher=await G9CloudIdentity.verifyTeacher();await db.ref('learningProgress').child(s.id).child('grade9Vr/teacher/reviews').child(String(fb.dataset.lesson)).set({message:q('.g9vr-feedback').value.slice(0,2000),status:q('.g9vr-feedback-status').value,sourceVersion:Number(fb.dataset.version),updatedAt:G9CloudIdentity.stamp(),updatedBy:teacher.uid});f.feedback=null;showAlert('Feedback VR Studio terkirim ke siswa. Nilai disimpan lewat rubrik.','success');}catch(e){showAlert('Feedback belum terkirim: '+esc(e.message),'danger');}finally{fb.disabled=false;}});}}
  function apply(s){try{if(dcTeacherState.saving)return;use(workspaceConfig());const A=config.assessmentId,assessment=dcGetCourseConfig(2,9).assessments.find(a=>a.id===A);
      const plan=applyPlan(s,assessment.criteria,config.key);
      for(const c of assessment.criteria)dcSetCriterionScore(A,c.id,c.max,plan.criteria[c.id],false);
      const prev=String(dcTeacherState.draft.rubricScores[A]?.note||'').split('\n').filter(l=>!l.startsWith(config.label+' VR: ')).join('\n').trim();
      dcSetAssessmentNote(A,(plan.note+(prev?'\n'+prev:'')).slice(0,4000));
      dcTeacherState.draft[config.metaKey]=plan.meta;dcSetAssessmentReviewed(A,true);dcTeacherState.dirty=true;
      dcTeacherState.selectedAssessmentId=A;renderDcAssessmentPanel();if(typeof updateDcSaveState==='function')updateDcSaveState();
      showAlert(esc(config.label)+' '+esc(s.nama)+' = '+plan.meta.score+' diterapkan ke rubrik. Tekan “Simpan penilaian” untuk menyimpan.','info');
    }catch(e){showAlert(esc(e.message),'warning');}}
  /** Open a student in the main rubric workspace (grade 9, Q2, project component 01–03). */
  function open(id,key){if(key)use(G9_VR_GRADING[key]);if(typeof dcTeacherState==='undefined'||dcTeacherState.saving)return;if(dcTeacherState.dirty&&!window.confirm('Ada rubrik yang belum disimpan. Tetap membuka siswa ini?'))return;dcTeacherState.dirty=false;
    changeDcAssessmentGrade(9);setQuarter(2);const g=document.getElementById('dcAssessmentGrade');if(g)g.value='9';if(typeof refreshAssessmentStudentOptions==='function')refreshAssessmentStudentOptions();
    dcTeacherState.studentId=id;const sel=document.getElementById('dcAssessmentStudent');if(sel)sel.value=id;dcTeacherState.selectedAssessmentId=config.assessmentId;loadDcAssessmentDraft();
    document.getElementById('dcAssessmentPanel')?.scrollIntoView({behavior:'smooth',block:'start'});}
  function stateHTML(st,s,n){
    if(st.kind==='submitted'){const t=wibParts(st.sub.submittedAt),due=G9_VR_LESSON_DUE[n],late=due&&t?G9VrGrades.daysLate(G9VrGrades.localDate(st.sub.submittedAt,config.utcOffsetHours),due):null;
      return '<span class="g9vr-badge g9vr-badge-ok">Terkirim v'+esc(st.sub.version)+'</span>'+(t?'<span class="g9vr-when"><i class="fas fa-calendar-day"></i> '+esc(t.date)+'</span><span class="g9vr-when"><i class="fas fa-clock"></i> '+esc(t.time)+'</span>':'')+(late>0?'<span class="g9vr-badge g9vr-badge-late">Terlambat '+esc(late)+' hari</span>':late===0?'<span class="g9vr-badge g9vr-badge-ok">Tepat waktu</span>':'')+(st.review?'<span class="g9vr-badge">Feedback: '+esc(REVIEW_LABEL[st.review.status]||st.review.status)+(Number(st.review.sourceVersion)!==Number(st.sub.version)?' (v'+esc(st.review.sourceVersion)+')':'')+'</span>':'');}
    if(st.kind==='draft'){const t=wibParts(st.row.updatedAt);return '<span class="g9vr-badge g9vr-badge-draft">Draft · belum diajukan</span>'+(t?'<span class="g9vr-when">diubah '+esc(t.date)+' · '+esc(t.time)+'</span>':'');}
    return '<span class="g9vr-badge g9vr-badge-none">Belum ada kiriman</span>';}
  function matches(s,st){switch(filter){case 'submitted':return st.kind==='submitted';case 'draft':return st.kind==='draft';case 'none':return st.kind!=='submitted';case 'pending':return !!BY_LESSON[monitorLesson]&&isPending(s);case 'ungraded':return !!BY_LESSON[monitorLesson]&&!reviewedF1(s);default:return true;}}
  function render(){const root=typeof document!=='undefined'?document.getElementById('g9VrMonitorList'):null;if(!root){renderEvidence();return;}if(root.contains(document.activeElement)&&document.activeElement!==document.body&&document.activeElement.tagName!=='BUTTON')return;
    const cls=document.getElementById('g9VrMonitorClass')?.value||'',query=(document.getElementById('g9VrMonitorSearch')?.value||'').toLowerCase(),all=students(),n=monitorLesson;
    const choice=document.getElementById('g9VrMonitorClass');const classes=[...new Set(all.map(s=>String(s.kelas)))].sort();if(choice&&choice.options.length-1!==classes.length){const keep=choice.value;choice.innerHTML='<option value="">Semua kelas 9</option>'+classes.map(c=>'<option>'+esc(c)+'</option>').join('');choice.value=classes.includes(keep)?keep:'';}
    const cfg=BY_LESSON[n]||null;if(cfg)use(cfg);const inClass=all.filter(s=>!cls||String(s.kelas)===cls),states=new Map(inClass.map(s=>[s.id,lessonState(s.id,n)]));
    const count=k=>inClass.filter(s=>states.get(s.id).kind===k).length,info=G9_VR_LESSON_EVIDENCE[n];
    const summary=document.getElementById('g9VrMonitorSummary');if(summary)summary.innerHTML='<b>Pertemuan '+esc(n)+' · '+esc(info?.title||'')+'</b>'+(G9_VR_LESSON_DUE[n]?'<span class="g9vr-badge">Batas: '+esc(dueText(G9_VR_LESSON_DUE[n]))+'</span>':'')+'<span class="g9vr-badge g9vr-badge-ok">Terkirim '+count('submitted')+'</span><span class="g9vr-badge g9vr-badge-draft">Draft '+count('draft')+'</span><span class="g9vr-badge g9vr-badge-none">Belum '+count('none')+'</span><small>dari '+inClass.length+' siswa'+(cls?' '+esc(cls):' kelas 9')+'</small>';
    const time=s=>{const st=states.get(s.id);return st.kind==='submitted'?Number(st.sub.submittedAt)||0:null;};
    let list=inClass.filter(s=>String(s.nama||'').toLowerCase().includes(query)&&matches(s,states.get(s.id)));
    if(sortBy!=='name')list=[...list].sort((a,b)=>{const ta=time(a),tb=time(b);if(ta===null&&tb===null)return String(a.nama).localeCompare(String(b.nama));if(ta===null)return 1;if(tb===null)return -1;return sortBy==='newest'?tb-ta:ta-tb;});
    root.innerHTML=(progressError?'<p class="g11-evidence-missing" role="alert">Bukti Firebase belum dapat dimuat. Muat ulang dashboard.</p>':'')+(list.map(s=>{const st=states.get(s.id),key=s.id+':'+n,open=expanded.has(key);
      return '<article class="g11-monitor-row g9vr-row"><div class="g9vr-row-main"><div><b>'+esc(s.nama)+'</b><small>'+esc(s.kelas)+(cfg?' · '+esc(reviewedF1(s)?cfg.label+' = '+(s[cfg.field]??'—'):cfg.label+' belum dinilai'):'')+'</small></div><div class="g9vr-state">'+stateHTML(st,s,n)+'</div><div class="g9vr-actions">'+(st.kind!=='none'?'<button type="button" class="dc-save-button g9vr-toggle" data-key="'+esc(key)+'" aria-expanded="'+open+'">'+(open?'Tutup form':'Lihat form')+'</button>':'')+'<button type="button" class="dc-save-button g9vr-open" data-student="'+esc(s.id)+'">Buka di rubrik</button></div></div>'+
        (open&&st.kind!=='none'?'<div class="g9vr-inline">'+(st.kind==='submitted'?'<h5>Form kiriman v'+esc(st.sub.version)+' · '+esc(wib(st.sub.submittedAt))+'</h5>'+formHTML(st.sub):'<h5>Draft online · belum diajukan</h5>'+formHTML(st.row))+'</div>':'')+'</article>';}).join('')||'<p class="g11-monitor-empty">Belum ada siswa kelas 9 yang sesuai filter.</p>');
    root.querySelectorAll('.g9vr-open').forEach(b=>b.addEventListener('click',()=>{const c=cfg||G9_VR_GRADING.q2_f1;viewed[b.dataset.student+':'+c.key]=n;open(b.dataset.student,c.key);}));
    root.querySelectorAll('.g9vr-toggle').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.key;if(expanded.has(k))expanded.delete(k);else expanded.add(k);render();}));
    renderEvidence();}
  function mount(){if(!document.getElementById('g9VrMonitorPanel'))return;document.getElementById('g9VrMonitorSearch').addEventListener('input',render);document.getElementById('g9VrMonitorClass').addEventListener('change',render);document.getElementById('g9VrMonitorFilter').addEventListener('change',e=>{filter=e.target.value;render();});
    const ls=document.getElementById('g9VrMonitorLesson');if(ls){ls.innerHTML=Object.keys(G9_VR_LESSON_EVIDENCE).map(k=>'<option value="'+k+'">Pertemuan '+k+' · '+esc(G9_VR_LESSON_EVIDENCE[k].title)+'</option>').join('');ls.value=String(monitorLesson);ls.addEventListener('change',e=>{monitorLesson=Number(e.target.value)||1;render();});}
    document.getElementById('g9VrMonitorSort')?.addEventListener('change',e=>{sortBy=e.target.value;render();});}
  function start(){if(started)return;started=true;mount();render();}
  return {start,render,renderEvidence,open,applyPlan,_evidenceHTML:evidenceHTML,_setView(id,n,key='q2_f1'){viewed[id+':'+key]=Number(n);},_use(key){use(G9_VR_GRADING[key]);},_setMonitorLesson(n){monitorLesson=Number(n)||1;},_lessonState:lessonState,_setForm(id,patch,key){if(key)use(G9_VR_GRADING[key]);const s=students().find(x=>x.id===id);if(s)Object.assign(form(s),patch);},onProgressError(e){progressError=String(e?.message||e||'error');render();},onProgress(value){progressError='';progress={};for(const [id,row]of Object.entries(value||{}))if(row?.grade9Vr)progress[id]=row.grade9Vr;render();},_state:()=>({progress,forms})};
})();
if(typeof window!=='undefined')Object.assign(window,{G9_VR_CHALLENGE_RUBRIC,G9_VR_LESSON_DUE,G9_VR_LESSON_EVIDENCE,G9_VR_GRADING,G9_VR_COURSE_ID,G9VrGrades,G9VrRubric,G9VrMonitor});
