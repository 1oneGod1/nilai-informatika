/* Grade 8 Q2: assess existing BSD games, one reviewed score per project.
 * No student score or final-grade weight is changed merely by loading this file. */
const G8_GAME_COURSE_ID = 'grade8MobileGameDeveloperQ2';
/* Rubric (same method as grade 9 VR, since Nov 2026): A. BSD steps 70 (one "sudah lengkap" box)
 * + B. project challenge 30 (9/6/6/6/3), taken from the Game Studio meeting challenge.
 * Lateness: gradebook score = max(KKM, rubric total - 5 x days late), see js/grade8-project-monitor.js. */
const G8_GAME_VERSION='g8-bsd-games-v2';
const G8_LATE_KEYS=['f1Late','f2Late','f3Late','f4Late','f5Late'];
const G8_STEPS=(id,label,max)=>({id,group:'steps',label:'Steps BSD “'+label+'” selesai',max});
const G8_CH=(id,label,max)=>({id,group:'challenge',label,max});
const G8_GROUPS=n=>[{id:'steps',label:'A. Ketuntasan steps course BSD',max:70,completeAll:true},{id:'challenge',label:'B. Challenge project '+n,max:30}];
const G8_GAME_PROJECTS=[
  ['platformer','Platformer Game','tn-platformer-game','BSD Explore Mobile Game Developer + Platformer Game · steps 70 + challenge 30',
    [G8_STEPS('explore','Explore Mobile Game Developer',10),G8_STEPS('platformer','Platformer Game',60)],
    [G8_CH('levelChange','Mengubah lantai/coin atau platformSpeed pada salinan; level tetap bisa diselesaikan',9),G8_CH('prediction','Memprediksi tampilan/hasil sebelum menekan Run',6),G8_CH('testing','Menguji coin dan finish setelah perubahan',6),G8_CH('explain','Menjelaskan floorData/coinsData atau platformSpeed dan hubungannya dengan game',6),G8_CH('reflection','Refleksi dijawab dengan kalimat sendiri',3)]],
  ['traffic','Traffic Looper','tn-traffic-looper-game','BSD Traffic Looper · steps 70 + challenge 30',
    [G8_STEPS('traffic','Traffic Looper',70)],
    [G8_CH('speedChange','Kecepatan normal diubah konsisten pada nilai awal dan onPointerUp',9),G8_CH('controls','Kontrol tetap bekerja: tahan, lepas, tabrakan, restart',6),G8_CH('compare','Membandingkan hasil dua percobaan kecepatan',6),G8_CH('explain','Menjelaskan angleSpeed dan mengapa nilainya harus konsisten',6),G8_CH('reflection','Refleksi dijawab dengan kalimat sendiri',3)]],
  ['nonogram','Nonogram','tn-nonogram-game','BSD Nonogram · steps 70 + challenge 30',
    [G8_STEPS('nonogram','Nonogram',70)],
    [G8_CH('pattern','Membuat pola baru yang valid',9),G8_CH('peerTest','Teman menyelesaikan pola tanpa diberi gambar jawaban',6),G8_CH('testing','Menguji solusi benar, satu sel salah, dan klik ulang untuk memperbaiki',6),G8_CH('explain','Menjelaskan data pola 5×5 serta baris dan kolom',6),G8_CH('reflection','Refleksi dijawab dengan kalimat sendiri',3)]],
  ['dungeon','Dungeon Battle','tn-dungeon-battle','BSD Dungeon Battle · steps 70 + challenge 30',
    [G8_STEPS('dungeon','Dungeon Battle',70)],
    [G8_CH('attackChange','Mengubah playerAttack dari 10 ke 8 pada salinan kerja',9),G8_CH('record','Mencatat HP sebelum/sesudah beberapa serangan dengan kondisi awal sama',6),G8_CH('compare','Membandingkan hasil dan menjelaskan dampaknya, termasuk unsur acak',6),G8_CH('explain','Menjelaskan kode giliran, HP, atau playerWaitTime',6),G8_CH('reflection','Refleksi dijawab dengan kalimat sendiri',3)]],
  ['wall','Wall Jumper','tn-wall-jumper','BSD Wall Jumper · steps 70 + challenge 30',
    [G8_STEPS('wall','Wall Jumper',70)],
    [G8_CH('gravityChange','Mengubah gravity sedikit pada salinan',9),G8_CH('compare','Membandingkan tinggi lompatan sebelum dan sesudah',6),G8_CH('playable','Memeriksa game tetap bisa dimainkan: double jump, reset di dinding, restart',6),G8_CH('explain','Menjelaskan jumpCount < 2, speedY, atau gravity pada kode',6),G8_CH('reflection','Refleksi dijawab dengan kalimat sendiri',3)]],
];

const G8_GAME_ASSESSMENTS = G8_GAME_PROJECTS.map(([key,title,slug,subtitle,steps,challenge],index)=>({
  id:'g8Game_'+key,number:'F'+(index+1),title:'Project '+(index+1)+' · '+title,subtitle,
  type:'Formatif',weight:20,color:'#34d399',sourceUrl:'https://app.bsd.education/project/'+slug,
  brief:'A. Centang “Semua steps sudah lengkap” bila semua step BSD selesai (70); bila belum, isi poin step. B. Nilai challenge dari bukti Game Studio (tautan, perubahan, hasil uji/refleksi) atau demo. Lalu tekan “Terapkan keterlambatan & tandai diperiksa” dan Simpan penilaian.',
  groups:G8_GROUPS(index+1),criteria:[...steps,...challenge],
}));

G8_COURSES[2]={id:G8_GAME_COURSE_ID,grade:8,quarter:2,title:'Game Studio · Penilaian BSD Kelas 8',
  shortTitle:'Mobile Game Developer',reviewedFormativeOnly:true,preferredForTeacher:true,
  description:'Q2 · F1 Platformer, F2 Traffic Looper, F3 Nonogram, F4 Dungeon Battle, F5 Wall Jumper. Tiap proyek: steps BSD 70 + challenge 30, −5/hari terlambat (minimal KKM). Hanya nilai yang sudah diperiksa disimpan ke buku nilai.',
  assessments:G8_GAME_ASSESSMENTS,finalQuiz:null};

function g8IsGameCourse(quarter,grade,override=null){return (override||dcGetCourseConfig(quarter,grade))?.id===G8_GAME_COURSE_ID;}
function g8EvidenceUrl(value){try{const url=new URL(String(value||'').trim());return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}}
const g8BaseCreate=dcCreateEmptyDraft,g8BaseRead=dcDraftFromStored,g8BaseRecord=dcBuildStoredRecord,
  g8BaseFields=dcBuildGradebookFields,g8BaseFormativeFields=dcBuildFormativeGradebookFields,
  g8BaseStudentHtml=dcBuildStudentAssessmentHtml;

dcCreateEmptyDraft=function(quarter=1,grade=9,override=null){const draft=g8BaseCreate(quarter,grade,override);if(g8IsGameCourse(quarter,grade,override))draft.reviewed=Object.fromEntries(G8_GAME_ASSESSMENTS.map(a=>[a.id,false]));return draft;};
dcDraftFromStored=function(stored,quarter=1,grade=9,override=null){
  if(!g8IsGameCourse(quarter,grade,override))return g8BaseRead(stored,quarter,grade,override);
  const current=stored?.courseId===G8_GAME_COURSE_ID&&stored?.assessmentVersion===G8_GAME_VERSION,draft=g8BaseRead(current?stored:null,quarter,grade,override);
  draft.reviewed=Object.fromEntries(G8_GAME_ASSESSMENTS.map(a=>[a.id,current&&stored.reviewed?.[a.id]===true]));
  for(const a of G8_GAME_ASSESSMENTS)draft.rubricScores[a.id].evidenceUrl=current?g8EvidenceUrl(stored.rubricScores?.[a.id]?.evidenceUrl):'';
  for(const key of ["evidenceVersions","evidenceSnapshots"])if(current&&stored[key])draft[key]=JSON.parse(JSON.stringify(stored[key]));
  if(current&&stored.previousGradebook)draft.previousGradebook={...stored.previousGradebook};
  for(const k of G8_LATE_KEYS)if(current&&stored[k])draft[k]=JSON.parse(JSON.stringify(stored[k]));
  const previous=current?stored.previousAssessment:stored;if(previous)draft.previousAssessment=JSON.parse(JSON.stringify(previous));
  return draft;
};
dcBuildStoredRecord=function(draft,quarter,updatedBy,grade=9){
  const record=g8BaseRecord(draft,quarter,updatedBy,grade);
  if(g8IsGameCourse(quarter,grade)){
    for(const key of ["evidenceVersions","evidenceSnapshots"])if(draft[key])record[key]=JSON.parse(JSON.stringify(draft[key]));
    record.assessmentVersion=G8_GAME_VERSION;record.reviewed={...draft.reviewed};
    G8_GAME_ASSESSMENTS.forEach((a,i)=>{const k=G8_LATE_KEYS[i];if(draft[k]&&record.reviewed[a.id]===true)record[k]=JSON.parse(JSON.stringify(draft[k]));else delete record[k];});
    record.rubricScores=Object.fromEntries(G8_GAME_ASSESSMENTS.map(a=>[a.id,{...draft.rubricScores[a.id],criteria:{...draft.rubricScores[a.id].criteria},evidenceUrl:g8EvidenceUrl(draft.rubricScores[a.id].evidenceUrl)}]));
    record.assessmentComplete=G8_GAME_ASSESSMENTS.every(a=>record.reviewed[a.id]===true);
    if(!record.assessmentComplete){delete record.overallScore;delete record.finalScore;}
    if(draft.previousGradebook)record.previousGradebook={...draft.previousGradebook};
    if(draft.previousAssessment)record.previousAssessment=JSON.parse(JSON.stringify(draft.previousAssessment));
  }
  return record;
};
/** Teacher rule (same as grade 9): max(KKM, base - penaltyPerDay x daysLate); KKM is always the floor. */
function g8LateScore(raw,meta){const b=Number(raw);if(!meta||!Number.isFinite(b))return raw;const d=Math.max(0,Number(meta.daysLate)||0),p=Math.max(0,Number(meta.penaltyPerDay)||0),k=Math.min(100,Math.max(0,Number(meta.kkm)||0));return Math.round(Math.max(k,b-p*d)*100)/100;}
function g8ReviewedFields(record,quarter,grade){
  if(record?.courseId!==G8_GAME_COURSE_ID||record?.assessmentVersion!==G8_GAME_VERSION)return {};
  /* Idempotent: always start from the stored rubric total of each reviewed project. */
  return Object.fromEntries(G8_GAME_ASSESSMENTS.flatMap((a,i)=>{if(record.reviewed?.[a.id]!==true)return [];const crit=record.rubricScores?.[a.id]?.criteria||{},raw=Math.round(a.criteria.reduce((n,c)=>n+Math.min(c.max,Math.max(0,Number(crit[c.id])||0)),0)*100)/100;return [['q2_f'+(i+1),g8LateScore(raw,record[G8_LATE_KEYS[i]])]];}));
}
dcBuildGradebookFields=function(record,quarter,grade=9){return g8IsGameCourse(quarter,grade)?g8ReviewedFields(record,quarter,grade):g8BaseFields(record,quarter,grade);};
dcBuildFormativeGradebookFields=function(record,quarter,grade=9){return g8IsGameCourse(quarter,grade)?g8ReviewedFields(record,quarter,grade):g8BaseFormativeFields(record,quarter,grade);};

dcBuildStudentAssessmentHtml=function(student,kkm){
  const record=student?.digitalCitizenshipAssessment?.q2;
  if(dcGetGradeLevel(student?.kelas)!==8||record?.courseId!==G8_GAME_COURSE_ID||record?.assessmentVersion!==G8_GAME_VERSION)return g8BaseStudentHtml(student,kkm);
  const earlier=g8BaseStudentHtml({...student,digitalCitizenshipAssessment:{...student.digitalCitizenshipAssessment,q2:null}},kkm),draft=dcDraftFromStored(record,2,8),summary=dcCalculateSummary(draft,2,8);
  return earlier+'<section class="dc-student-score-card"><h3>Game Studio · Nilai tugas BSD</h3><p>Nilai /100 untuk setiap proyek yang sudah diperiksa guru.</p>'+G8_GAME_ASSESSMENTS.map(a=>record.reviewed?.[a.id]===true?dcBuildStudentRubricCard(a,draft,summary):'<p>'+a.number+' · '+escHtml(a.title)+': belum dinilai</p>').join('')+'</section>';
};

function g8EvidenceFieldHTML(assessment,draft){const url=g8EvidenceUrl(draft.evidenceUrl);return '<div id="g8EvidencePanel"></div><div id="g8LatePanel"></div><label class="dc-teacher-note"><span>Tautan karya BSD (opsional jika demo langsung)</span><input type="url" maxlength="2000" style="width:100%;padding:10px;color:inherit;background:#0f172a;border:1px solid #334155;border-radius:8px" value="'+escHtml(draft.evidenceUrl||'')+'" placeholder="https://app.bsd.education/..." aria-label="Tautan karya BSD" oninput="dcSetGameEvidence(\''+assessment.id+'\',this.value)" /></label><p><a id="g8-evidence-open" href="'+escHtml(url||'#')+'" '+(url?'':'hidden')+' target="_blank" rel="noopener noreferrer">Buka karya siswa ↗</a></p><p class="small">Boleh nilai dari demo karya yang sudah selesai di BSD. Pilih poin penuh atau parsial sesuai bukti.</p>';}
function dcSetGameEvidence(id,value){if(dcTeacherState.saving)return;const row=dcTeacherState.draft.rubricScores[id];if(!row)return;row.evidenceUrl=String(value||'').slice(0,2000);dcTeacherState.draft.reviewed[id]=false;dcTeacherState.dirty=true;const reviewed=document.querySelector?.('input[data-assessment="'+id+'"]');if(reviewed)reviewed.checked=false;const link=document.getElementById('g8-evidence-open'),url=g8EvidenceUrl(row.evidenceUrl);if(link){link.href=url||'#';link.hidden=!url;}const summary=dcCalculateSummary(dcTeacherState.draft,dcTeacherState.quarter,dcTeacherState.grade);renderDcSummary(summary,allSiswa.find(s=>s.id===dcTeacherState.studentId));renderDcAssessmentNav(summary);updateDcSaveState();}
function openGrade8Assessment(){
  if(dcTeacherState.saving)return;
  if(dcTeacherState.dirty&&!window.confirm('Ada penilaian yang belum disimpan. Tetap buka rubrik BSD kelas 8?'))return;
  dcTeacherState.dirty=false;changeDcAssessmentGrade(8);setQuarter(2);
  document.getElementById('dcAssessmentGrade').value='8';dcTeacherState.selectedAssessmentId=G8_GAME_ASSESSMENTS[0].id;refreshAssessmentStudentOptions();
  document.getElementById('dcAssessmentPanel').scrollIntoView({behavior:'smooth',block:'start'});
}
Object.assign(window,{G8_GAME_ASSESSMENTS,G8_GAME_VERSION,G8_LATE_KEYS,g8LateScore,g8ReviewedFields,dcCreateEmptyDraft,dcDraftFromStored,dcBuildStoredRecord,dcBuildGradebookFields,dcBuildFormativeGradebookFields,dcBuildStudentAssessmentHtml,dcSetGameEvidence,openGrade8Assessment});
