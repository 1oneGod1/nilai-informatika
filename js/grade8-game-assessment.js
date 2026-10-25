/* Grade 8 Q2: assess existing BSD games, one reviewed score per project.
 * No student score or final-grade weight is changed merely by loading this file. */
const G8_GAME_COURSE_ID = 'grade8MobileGameDeveloperQ2';
const G8_GAME_PROJECTS = [
  ['platformer', 'Platformer Game', 'tn-platformer-game',
    'Kontrol klik/spasi dan lompatan bekerja; player tetap dapat melewati level.',
    'Coin dapat dikumpulkan dan kondisi selesai muncul sesuai aturan game.',
    'Menjelaskan floorData/coinsData atau platformSpeed dan hubungannya dengan tampilan/game.',
    'Menunjukkan uji klik, spasi, coin, dan finish setelah perubahan level atau kecepatan.',
    'Mengubah susunan lantai/coin atau kecepatan pada salinan; menjelaskan alasan dan hasilnya.'],
  ['traffic', 'Traffic Looper', 'tn-traffic-looper-game',
    'Mobil berjalan dan merespons pointer ditahan/dilepas.',
    'Penghitung putaran, tabrakan, dan restart bekerja.',
    'Menjelaskan angleSpeed serta mengapa nilai awal dan onPointerUp harus konsisten.',
    'Menguji tahan → lepas → tabrakan → restart; membandingkan dua kecepatan.',
    'Mengubah kecepatan normal secara konsisten, lalu menunjukkan bahwa kontrol tetap bekerja.'],
  ['nonogram', 'Nonogram', 'tn-nonogram-game',
    'Grid tampil dan klik sel mengubah status aktif serta nilai answer[row][col].',
    'Pola dan pemeriksaan solusi bekerja; label answer sesuai hasil.',
    'Menjelaskan data pola 5×5, baris/kolom, dan perbedaan pola jawaban dengan label hasil.',
    'Menunjukkan solusi benar, satu sel salah, serta klik ulang untuk memperbaiki sel.',
    'Membuat pola valid baru dan mengujinya dengan teman tanpa membocorkan solusi.'],
  ['dungeon', 'Dungeon Battle', 'tn-dungeon-battle',
    'Aksi dan giliran pemain/enemy berjalan sesuai aturan game.',
    'Serangan mengubah HP dan kondisi menang/kalah dapat ditunjukkan.',
    'Menjelaskan playerAttack, HP atau playerWaitTime dan pengaruh unsur acak pada damage.',
    'Mencatat HP sebelum/sesudah beberapa serangan dengan kondisi awal yang sama.',
    'Mengubah damage, misalnya playerAttack 10 ke 8, lalu menjelaskan hasil beberapa percobaan.'],
  ['wall', 'Wall Jumper', 'tn-wall-jumper',
    'Lompatan dan gerak pemain bekerja; double jump dibatasi sebelum menyentuh dinding.',
    'Menyentuh dinding mereset lompatan; tabrakan rock dan restart bekerja.',
    'Menjelaskan jumpCount < 2, speedY atau gravity dengan menunjuk kode yang relevan.',
    'Menguji satu/dua/tiga tap, reset di dinding, tabrakan, dan restart.',
    'Mengubah gravity sedikit, membandingkan tinggi lompatan, dan memeriksa game tetap bisa dimainkan.'],
];

const G8_GAME_ASSESSMENTS = G8_GAME_PROJECTS.map(([key,title,slug,controls,rules,concept,tests,change],index)=>({
  id:'g8Game_'+key,number:'F'+(index+1),title,subtitle:'BSD Mobile Game Developer',
  type:'Formatif',weight:20,color:'#34d399',sourceUrl:'https://app.bsd.education/project/'+slug,
  brief:'Gunakan karya BSD yang sudah dikerjakan. Periksa lewat tautan atau demo langsung; siswa tidak perlu mengulang course atau mengerjakan kuis web. Beri poin sesuai bukti, lalu tandai sudah diperiksa.',
  criteria:[
    {id:'controls',label:controls,max:20},
    {id:'rules',label:rules,max:20},
    {id:'concept',label:concept,max:25},
    {id:'testing',label:tests,max:20},
    {id:'modification',label:change,max:10},
    {id:'process',label:'Menjelaskan bagian dari BSD/bantuan guru dan kontribusi sendiri; sumber aset serta kendala dilaporkan jujur.',max:5},
  ],
}));

G8_COURSES[2]={id:G8_GAME_COURSE_ID,grade:8,quarter:2,title:'Game Studio · Penilaian BSD Kelas 8',
  shortTitle:'Mobile Game Developer',reviewedFormativeOnly:true,preferredForTeacher:true,
  description:'Q2 · F1 Platformer, F2 Traffic Looper, F3 Nonogram, F4 Dungeon Battle, F5 Wall Jumper. Setiap proyek dinilai /100; hanya nilai yang sudah diperiksa disimpan ke buku nilai.',
  assessments:G8_GAME_ASSESSMENTS,finalQuiz:null};

function g8IsGameCourse(quarter,grade,override=null){return (override||dcGetCourseConfig(quarter,grade))?.id===G8_GAME_COURSE_ID;}
function g8EvidenceUrl(value){try{const url=new URL(String(value||'').trim());return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}}
const g8BaseCreate=dcCreateEmptyDraft,g8BaseRead=dcDraftFromStored,g8BaseRecord=dcBuildStoredRecord,
  g8BaseFields=dcBuildGradebookFields,g8BaseFormativeFields=dcBuildFormativeGradebookFields,
  g8BaseStudentHtml=dcBuildStudentAssessmentHtml;

dcCreateEmptyDraft=function(quarter=1,grade=9,override=null){const draft=g8BaseCreate(quarter,grade,override);if(g8IsGameCourse(quarter,grade,override))draft.reviewed=Object.fromEntries(G8_GAME_ASSESSMENTS.map(a=>[a.id,false]));return draft;};
dcDraftFromStored=function(stored,quarter=1,grade=9,override=null){
  if(!g8IsGameCourse(quarter,grade,override))return g8BaseRead(stored,quarter,grade,override);
  const current=stored?.courseId===G8_GAME_COURSE_ID,draft=g8BaseRead(current?stored:null,quarter,grade,override);
  draft.reviewed=Object.fromEntries(G8_GAME_ASSESSMENTS.map(a=>[a.id,current&&stored.reviewed?.[a.id]===true]));
  for(const a of G8_GAME_ASSESSMENTS)draft.rubricScores[a.id].evidenceUrl=current?g8EvidenceUrl(stored.rubricScores?.[a.id]?.evidenceUrl):'';
  for(const key of ["evidenceVersions","evidenceSnapshots"])if(current&&stored[key])draft[key]=JSON.parse(JSON.stringify(stored[key]));
  if(current&&stored.previousGradebook)draft.previousGradebook={...stored.previousGradebook};
  const previous=current?stored.previousAssessment:stored;if(previous)draft.previousAssessment=JSON.parse(JSON.stringify(previous));
  return draft;
};
dcBuildStoredRecord=function(draft,quarter,updatedBy,grade=9){
  const record=g8BaseRecord(draft,quarter,updatedBy,grade);
  if(g8IsGameCourse(quarter,grade)){
    for(const key of ["evidenceVersions","evidenceSnapshots"])if(draft[key])record[key]=JSON.parse(JSON.stringify(draft[key]));
    record.assessmentVersion='g8-bsd-games-v1';record.reviewed={...draft.reviewed};
    record.rubricScores=Object.fromEntries(G8_GAME_ASSESSMENTS.map(a=>[a.id,{...draft.rubricScores[a.id],criteria:{...draft.rubricScores[a.id].criteria},evidenceUrl:g8EvidenceUrl(draft.rubricScores[a.id].evidenceUrl)}]));
    record.assessmentComplete=G8_GAME_ASSESSMENTS.every(a=>record.reviewed[a.id]===true);
    if(!record.assessmentComplete){delete record.overallScore;delete record.finalScore;}
    if(draft.previousGradebook)record.previousGradebook={...draft.previousGradebook};
    if(draft.previousAssessment)record.previousAssessment=JSON.parse(JSON.stringify(draft.previousAssessment));
  }
  return record;
};
function g8ReviewedFields(record,quarter,grade){
  if(record?.courseId!==G8_GAME_COURSE_ID)return {};
  const summary=dcCalculateSummary(dcDraftFromStored(record,quarter,grade),quarter,grade);
  return Object.fromEntries(G8_GAME_ASSESSMENTS.flatMap((a,i)=>record.reviewed?.[a.id]===true?[['q2_f'+(i+1),summary.rawScores[a.id]]]:[]));
}
dcBuildGradebookFields=function(record,quarter,grade=9){return g8IsGameCourse(quarter,grade)?g8ReviewedFields(record,quarter,grade):g8BaseFields(record,quarter,grade);};
dcBuildFormativeGradebookFields=function(record,quarter,grade=9){return g8IsGameCourse(quarter,grade)?g8ReviewedFields(record,quarter,grade):g8BaseFormativeFields(record,quarter,grade);};

dcBuildStudentAssessmentHtml=function(student,kkm){
  const record=student?.digitalCitizenshipAssessment?.q2;
  if(dcGetGradeLevel(student?.kelas)!==8||record?.courseId!==G8_GAME_COURSE_ID)return g8BaseStudentHtml(student,kkm);
  const earlier=g8BaseStudentHtml({...student,digitalCitizenshipAssessment:{...student.digitalCitizenshipAssessment,q2:null}},kkm),draft=dcDraftFromStored(record,2,8),summary=dcCalculateSummary(draft,2,8);
  return earlier+'<section class="dc-student-score-card"><h3>Game Studio · Nilai tugas BSD</h3><p>Nilai /100 untuk setiap proyek yang sudah diperiksa guru.</p>'+G8_GAME_ASSESSMENTS.map(a=>record.reviewed?.[a.id]===true?dcBuildStudentRubricCard(a,draft,summary):'<p>'+a.number+' · '+escHtml(a.title)+': belum dinilai</p>').join('')+'</section>';
};

function g8EvidenceFieldHTML(assessment,draft){const url=g8EvidenceUrl(draft.evidenceUrl);return '<div id="g8EvidencePanel"></div><label class="dc-teacher-note"><span>Tautan karya BSD (opsional jika demo langsung)</span><input type="url" maxlength="2000" style="width:100%;padding:10px;color:inherit;background:#0f172a;border:1px solid #334155;border-radius:8px" value="'+escHtml(draft.evidenceUrl||'')+'" placeholder="https://app.bsd.education/..." aria-label="Tautan karya BSD" oninput="dcSetGameEvidence(\''+assessment.id+'\',this.value)" /></label><p><a id="g8-evidence-open" href="'+escHtml(url||'#')+'" '+(url?'':'hidden')+' target="_blank" rel="noopener noreferrer">Buka karya siswa ↗</a></p><p class="small">Boleh nilai dari demo karya yang sudah selesai di BSD. Pilih poin penuh atau parsial sesuai bukti.</p>';}
function dcSetGameEvidence(id,value){if(dcTeacherState.saving)return;const row=dcTeacherState.draft.rubricScores[id];if(!row)return;row.evidenceUrl=String(value||'').slice(0,2000);dcTeacherState.draft.reviewed[id]=false;dcTeacherState.dirty=true;const reviewed=document.querySelector?.('input[data-assessment="'+id+'"]');if(reviewed)reviewed.checked=false;const link=document.getElementById('g8-evidence-open'),url=g8EvidenceUrl(row.evidenceUrl);if(link){link.href=url||'#';link.hidden=!url;}const summary=dcCalculateSummary(dcTeacherState.draft,dcTeacherState.quarter,dcTeacherState.grade);renderDcSummary(summary,allSiswa.find(s=>s.id===dcTeacherState.studentId));renderDcAssessmentNav(summary);updateDcSaveState();}
function openGrade8Assessment(){
  if(dcTeacherState.saving)return;
  if(dcTeacherState.dirty&&!window.confirm('Ada penilaian yang belum disimpan. Tetap buka rubrik BSD kelas 8?'))return;
  dcTeacherState.dirty=false;changeDcAssessmentGrade(8);setQuarter(2);
  document.getElementById('dcAssessmentGrade').value='8';dcTeacherState.selectedAssessmentId=G8_GAME_ASSESSMENTS[0].id;refreshAssessmentStudentOptions();
  document.getElementById('dcAssessmentPanel').scrollIntoView({behavior:'smooth',block:'start'});
}
Object.assign(window,{G8_GAME_ASSESSMENTS,dcCreateEmptyDraft,dcDraftFromStored,dcBuildStoredRecord,dcBuildGradebookFields,dcBuildFormativeGradebookFields,dcBuildStudentAssessmentHtml,dcSetGameEvidence,openGrade8Assessment});
