/* Grade 11 Q2 AI: 20% course completion, 30% formative, 50% summative.
 * Existing records keep their previous configuration. Only explicit teacher
 * grading creates the new version; no browser readiness mark supplies a score. */
const G11_AI_GRADING_VERSION = 'g11-ai-20-30-50-v1';
const G11_AI_LEGACY_COURSE = G11_COURSES[2];
const G11_AI_UNITS = [
  ['intro','Introduction to AI',['Webcam Image Classification','Card Sorting Activity']],
  ['train','How to Train Your AI',['Machine Learning - Image Classification','Image Upload Classifier']],
  ['live','Predicting with Live Data',['Webcam Live Classifier','Webcam Live Classifier Coding Project','Adjustable Accuracy Webcam Classifier']],
  ['music','Responsive Instrument',['Responsive Instrument','Music Generator']],
  ['chess','AI Chess Player',['AI Chess Player']],
  ['assistant','AI Digital Assistant',['AI Digital Assistant']],
  ['rescue','AI Animal Rescue',['AI Animal Rescue']],
  ['navigation','AI Navigation Algorithm',['AI Navigation Algorithm']],
  ['auto','AI Auto Navigation',['AI Auto Navigation']],
  ['finish','AI Find the Finish Line',['AI Find the Finish Line']],
];
const G11_AI_WEIGHTED_ASSESSMENTS = G11_AI_UNITS.map(([key,title,projects],index)=>({
  id:'g11AiCompletion_'+key,number:'C'+(index+1),title:'Course: '+title,
  subtitle:projects.join(' · '),type:'Penyelesaian course',weight:2,color:'#267765',
  brief:'Periksa seluruh aktivitas: '+projects.join(', ')+'. Gunakan bukti karya lama jika sudah selesai. Nilai kualitas penyelesaian, bukan kecepatan. Beri poin parsial sesuai bukti, lalu tandai komponen sudah diperiksa.',
  criteria:[
    {id:'steps',label:'Langkah wajib pada seluruh aktivitas course selesai; poin parsial sesuai bagian yang terbukti selesai',max:60},
    {id:'evidence',label:'Screenshot memperlihatkan proses atau perubahan serta hasil pengujian yang dapat diperiksa guru',max:20},
    {id:'explanation',label:'Siswa menjelaskan satu konsep atau alur input → proses → output dengan kata-kata sendiri',max:20},
  ],
})).concat([
  {id:'g11AiFormative1',number:'F1',title:'F1: Compare 3 and 6 Training Samples',subtitle:'3 lalu total 6 sampel per kelas · 1 foto uji yang sama',type:'Formatif',weight:10,color:'#3aa0ff',brief:'Tahap 1: 3 sampel latihan pada setiap kelas, Train, lalu uji 1 foto baru di luar data latihan. Tahap 2: tambah 3 sampel per kelas menjadi total 6, Train ulang, lalu uji foto yang persis sama. Periksa 2 screenshot (masing-masing tahap), prediksi sebelum tahap 2, label yang diharapkan dan hasil benar/salah kedua tahap, serta satu keterbatasan. Hasil tidak harus meningkat. Satu foto uji belum cukup untuk menyimpulkan akurasi keseluruhan.'},
  {id:'g11AiFormative2',number:'F2',title:'F2: KNN Experiment',subtitle:'K=1/3/5 pada input uji tetap',type:'Formatif',weight:10,color:'#3aa0ff',brief:'Setelah Adjustable Accuracy siap: pertahankan training data, uji K=1/3/5 pada 6 input yang konsisten, hitung label benar, dan jelaskan satu kegagalan. K bukan threshold; confidence tampilan BSD memiliki faktor acak.'},
  {id:'g11AiFormative3',number:'F3',title:'F3: Navigation Modification',subtitle:'Finish, jalan buntu, dan retry',type:'Formatif',weight:10,color:'#3aa0ff',brief:'Setelah Find the Finish Line siap: ubah satu aspek peta/reset/pencatatan gerak, prediksi akibatnya, lalu uji finish, jalan buntu, dan retry. Nama fastest tidak membuktikan jalur terpendek global.'},
].map(a=>({...a,criteria:[
  {id:'change',label:'Satu perubahan/eksperimen terarah dengan alasan dan prediksi yang jelas',max:30},
  {id:'testing',label:'Pengujian sesuai tugas, perbandingan adil, dan hasil benar/gagal dicatat',max:30},
  {id:'concept',label:'Penjelasan konsep dan akibat perubahan cocok dengan kode serta bukti',max:25},
  {id:'revision',label:'Feedback ditindaklanjuti dengan revisi atau alasan berbasis bukti; keterbatasan dilaporkan jujur',max:15},
]})),[{
  id:'g11AiSummative',number:'S1',title:'Summative: My Modified AI Project',
  subtitle:'Satu karya pilihan dan demo individual',type:'Sumatif',weight:50,color:'#ef6a54',
  brief:'Modifikasi fitur yang bermakna pada satu proyek BSD. Tunjukkan kode sebelum/sesudah, alasan perubahan, uji normal dan gagal/edge case, serta demo individual 2–3 menit. Siswa memprediksi, melakukan, dan menguji satu perubahan kecil dari guru. Jadwal demo/tenggat ditentukan bersama guru.',
  criteria:[
    {id:'planning',label:'Tujuan dan perubahan fitur jelas, dengan bukti kode sebelum/sesudah',max:20},
    {id:'concept',label:'Demo individual menjelaskan alur dan kode; prediksi perubahan kecil dapat diuji',max:20},
    {id:'prototype',label:'Karya dan modifikasi berfungsi serta dapat didemonstrasikan',max:25},
    {id:'testing',label:'Uji normal dan gagal/edge case dicatat; revisi dan keterbatasan dijelaskan',max:20},
    {id:'responsibility',label:'Kontribusi, sumber, dan refleksi etis/bertanggung jawab dinyatakan jujur',max:15},
  ],
}]);
G11_COURSES[2]={id:'codeFutureAiQ2Weighted',grade:11,quarter:2,title:'Assessment Code the Future with AI',shortTitle:'Code the Future with AI',
  description:'Kelas 11 · Q2 · tempo masing-masing · penyelesaian 10 course 20%, tiga formatif 30%, satu sumatif 50%. Nilai akhir disinkronkan setelah seluruh komponen diperiksa.',
  gradingVersion:G11_AI_GRADING_VERSION,assessments:G11_AI_WEIGHTED_ASSESSMENTS,finalQuiz:null};
function dcIsAiWeightedRecord(record,quarter=2,grade=11){return Number(grade)===11&&Number(quarter)===2&&record?.gradingVersion===G11_AI_GRADING_VERSION;}
function dcGetRecordCourse(record,quarter,grade){return Number(grade)===11&&Number(quarter)===2&&record&&!dcIsAiWeightedRecord(record,quarter,grade)?G11_AI_LEGACY_COURSE:dcGetCourseConfig(quarter,grade);}
function dcAiNewCourse(quarter,grade,override){return (override||dcGetCourseConfig(quarter,grade))?.gradingVersion===G11_AI_GRADING_VERSION;}
function dcAiFinalFields(summary){return {q2_f1:summary.rawScores.g11AiFormative1,q2_f2:summary.rawScores.g11AiFormative2,q2_f3:summary.rawScores.g11AiFormative3,q2_courseCompletion:Number((summary.completion/0.2).toFixed(2)),q2_aiSummative:summary.rawScores.g11AiSummative,q2_aiFinal:summary.finalScore,q2_sumatif:summary.finalScore};}
function dcAiHasPublishedGrades(record){const p=record?.publishedGradebook;return dcIsAiWeightedRecord(record)&&p&&['q2_f1','q2_f2','q2_f3','q2_courseCompletion','q2_aiSummative','q2_aiFinal','q2_sumatif'].every(k=>typeof p[k]==='number'&&Number.isFinite(p[k])&&p[k]>=0&&p[k]<=100)&&p.q2_sumatif===p.q2_aiFinal&&Math.abs(p.q2_aiFinal-(p.q2_courseCompletion*0.2+(p.q2_f1+p.q2_f2+p.q2_f3)*0.1+p.q2_aiSummative*0.5))<0.03;}
function dcAiArchiveHtml(draft){if(!draft.previousAssessment&&!Object.keys(draft.previousGradebook||{}).length)return '';const scores=draft.previousAssessment?.rawScores||{};return '<details class="ai-assessment-archive"><summary>Arsip nilai sebelumnya · tersimpan terpisah</summary><p>Nilai lama tidak dikonversi otomatis ke bobot 20–30–50.</p><ul>'+Object.entries(draft.previousGradebook||{}).map(([key,value])=>'<li>'+escHtml(key)+': '+escHtml(value)+'</li>').join('')+G11_AI_LEGACY_COURSE.assessments.filter(a=>scores[a.id]!==undefined).map(a=>'<li>'+escHtml(a.title)+': '+escHtml(scores[a.id])+'</li>').join('')+'</ul></details>';}
const aiBaseCreateDraft=dcCreateEmptyDraft,aiBaseReadDraft=dcDraftFromStored,aiBaseCalculate=dcCalculateSummary,aiBaseBuildRecord=dcBuildStoredRecord,aiBaseGradebook=dcBuildGradebookFields,aiBaseWeightTotals=dcGetCourseWeightTotals,aiBaseDescribeWeights=dcDescribeCourseWeights,aiBaseStudentHtml=dcBuildStudentAssessmentHtml,aiBaseStudentRubric=dcBuildStudentRubricCard;
dcCreateEmptyDraft=function(quarter=1,grade=9,override=null){const draft=aiBaseCreateDraft(quarter,grade,override);if(dcAiNewCourse(quarter,grade,override))draft.reviewed=Object.fromEntries(G11_AI_WEIGHTED_ASSESSMENTS.map(a=>[a.id,false]));return draft;};
dcDraftFromStored=function(stored,quarter=1,grade=9,override=null){
  if(!dcAiNewCourse(quarter,grade,override))return aiBaseReadDraft(stored,quarter,grade,override);
  const isCurrent=dcIsAiWeightedRecord(stored,quarter,grade),draft=aiBaseReadDraft(isCurrent?stored:null,quarter,grade,override);
  draft.evidenceVersions=isCurrent?{...stored.evidenceVersions}:{};
  draft.reviewed=Object.fromEntries(G11_AI_WEIGHTED_ASSESSMENTS.map(a=>[a.id,isCurrent&&stored.reviewed?.[a.id]===true]));
  const previous=isCurrent?stored.previousAssessment:stored;
  if(previous)draft.previousAssessment=JSON.parse(JSON.stringify(previous));
  if(isCurrent&&stored.previousGradebook)draft.previousGradebook=JSON.parse(JSON.stringify(stored.previousGradebook));
  if(isCurrent&&dcAiHasPublishedGrades(stored))draft.publishedGradebook={...stored.publishedGradebook};
  else if(isCurrent&&G11_AI_WEIGHTED_ASSESSMENTS.every(a=>draft.reviewed[a.id]===true))draft.publishedGradebook=dcAiFinalFields(dcCalculateSummary(draft,quarter,grade));
  return draft;
};
dcCalculateSummary=function(draft,quarter=1,grade=9,override=null){
  if(!dcAiNewCourse(quarter,grade,override))return aiBaseCalculate(draft,quarter,grade,override);
  const rawScores={},contributions={};let completion=0,formative=0,summative=0,reviewedCount=0;
  for(const a of G11_AI_WEIGHTED_ASSESSMENTS){const r=draft.rubricScores?.[a.id]||{},raw=a.criteria.reduce((n,c)=>n+dcClampScore(r.criteria?.[c.id],c.max),0),contribution=raw*a.weight/100;rawScores[a.id]=raw;contributions[a.id]=contribution;if(draft.reviewed?.[a.id]===true)reviewedCount++;if(a.type==='Penyelesaian course')completion+=contribution;else if(a.type==='Formatif')formative+=contribution;else summative+=contribution;}
  const round=v=>Number(v.toFixed(2));return {rawScores,contributions,completion:round(completion),formative:round(formative),summative:round(summative),finalScore:round(completion+formative+summative),reviewedCount,complete:reviewedCount===G11_AI_WEIGHTED_ASSESSMENTS.length,quizCorrect:0};
};
dcGetCourseWeightTotals=function(course){return course?.gradingVersion===G11_AI_GRADING_VERSION?{completion:20,formative:30,summative:50}:aiBaseWeightTotals(course);};
dcDescribeCourseWeights=function(course){return course?.gradingVersion===G11_AI_GRADING_VERSION?'Penyelesaian course 20% · Formatif 30% · Sumatif 50%':aiBaseDescribeWeights(course);};
dcBuildStoredRecord=function(draft,quarter,updatedBy,grade=9){const record=aiBaseBuildRecord(draft,quarter,updatedBy,grade);if(dcAiNewCourse(quarter,grade,null)){const summary=dcCalculateSummary(draft,quarter,grade);record.gradingVersion=G11_AI_GRADING_VERSION;record.reviewed={...draft.reviewed};record.evidenceVersions={...draft.evidenceVersions};record.assessmentComplete=summary.complete;record.completionScore=summary.completion;record.componentScores={courseCompletion:Number((summary.completion/0.2).toFixed(2)),formative:Number((summary.formative/0.3).toFixed(2)),summative:Number((summary.summative/0.5).toFixed(2))};if(draft.previousAssessment)record.previousAssessment=JSON.parse(JSON.stringify(draft.previousAssessment));if(draft.previousGradebook)record.previousGradebook=JSON.parse(JSON.stringify(draft.previousGradebook));if(summary.complete)record.publishedGradebook=dcAiFinalFields(summary);else if(draft.publishedGradebook)record.publishedGradebook={...draft.publishedGradebook};}return record;};
dcBuildGradebookFields=function(record,quarter,grade=9){
  if(!dcIsAiWeightedRecord(record,quarter,grade))return aiBaseGradebook(record,quarter,grade);
  const summary=dcCalculateSummary(dcDraftFromStored(record,quarter,grade),quarter,grade);
  if(record.formativeFocus===true)return Object.fromEntries([1,2,3].filter(i=>record.reviewed?.['g11AiFormative'+i]===true).map(i=>['q2_f'+i,summary.rawScores['g11AiFormative'+i]]));
  if(!summary.complete)return dcAiHasPublishedGrades(record)?{...record.publishedGradebook}:{};
  return dcAiFinalFields(summary);
};
dcBuildStudentRubricCard=function(a,draft,summary){let html=aiBaseStudentRubric(a,draft,summary);if(draft.reviewed&&draft.reviewed[a.id]!==true)html=html.replace('<span class="dc-score-number">'+(summary.rawScores[a.id]||0)+'</span>','<span class="dc-score-number">Belum dinilai</span>');return html;};
dcBuildStudentAssessmentHtml=function(student,kkm){if(dcGetGradeLevel(student?.kelas)===11&&student?.digitalCitizenshipAssessment?.q2?.formativeFocus===true){const draft=dcDraftFromStored(student.digitalCitizenshipAssessment.q2,2,11),summary=dcCalculateSummary(draft,2,11);return '<section class="dc-student-score-card"><h3>Formatif AI · F1–F3</h3>'+G11_AI_WEIGHTED_ASSESSMENTS.filter(a=>/^g11AiFormative[123]$/.test(a.id)).map(a=>dcBuildStudentRubricCard(a,draft,summary)).join('')+'</section>';}const html=aiBaseStudentHtml(student,kkm),record=student?.digitalCitizenshipAssessment?.q2;if(dcGetGradeLevel(student?.kelas)!==11||!dcIsAiWeightedRecord(record))return html;const archive=record.previousAssessment?'<details class="dc-student-score-card"><summary>Arsip penilaian AI sebelumnya</summary>'+aiBaseStudentHtml({...student,digitalCitizenshipAssessment:{q2:record.previousAssessment}},kkm)+'</details>':'';return html+archive;};
Object.assign(window,{G11_AI_GRADING_VERSION,G11_AI_WEIGHTED_ASSESSMENTS,dcIsAiWeightedRecord,dcGetRecordCourse,dcCreateEmptyDraft,dcDraftFromStored,dcCalculateSummary,dcGetCourseWeightTotals,dcDescribeCourseWeights,dcBuildStoredRecord,dcBuildGradebookFields,dcBuildStudentAssessmentHtml});
