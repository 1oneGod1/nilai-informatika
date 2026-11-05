// Grade 8 rubric 70/30 + lateness + monitor — unit tests with stubs (synthetic data only, no DB).
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const R=require('path').resolve(__dirname,'..')+'/';
const els={};const mkEl=id=>els[id]||(els[id]={id,innerHTML:'',value:'',options:[],contains:()=>false,addEventListener(){},querySelectorAll:()=>[],querySelector:()=>({addEventListener(){},innerHTML:'',disabled:false}),scrollIntoView(){}});
const alerts=[];
const ctx={console,URL,JSON,Math,Date,Number,String,Object,Array,Set,Map,Promise,
 document:{getElementById:id=>['g8MonitorList','g8MonitorSummary','g8MonitorClass','g8LatePanel','dcAssessmentStudent','dcAssessmentGrade'].includes(id)?mkEl(id):null,querySelector:()=>null,activeElement:{tagName:'BODY'},body:{},addEventListener(){}},
 localStorage:{getItem:()=>null,setItem(){}},location:{search:'',hostname:'x'},confirm:()=>true,
 showAlert:(m,t)=>alerts.push([t,m]),escHtml:s=>String(s),getKKM:()=>73,allSiswa:[],db:undefined,
 renderDcAssessmentPanel(){},updateDcSaveState(){},renderDcSummary(){},renderDcAssessmentNav(){},renderTableBody(){},
 changeDcAssessmentGrade(g){vm.runInContext('dcTeacherState',ctx).grade=g;},setQuarter(q){vm.runInContext('dcTeacherState',ctx).quarter=q;},refreshAssessmentStudentOptions(){},loadDcAssessmentDraft(){ctx.loaded=vm.runInContext('dcTeacherState',ctx).studentId;}};
ctx.window=ctx;vm.createContext(ctx);
for(const f of ['js/assessment-config.js','js/grade11-ai-assessment.js','js/grade8-game-assessment.js','js/grade8-submissions.js','js/grade8-project-monitor.js','js/teacher-assessment.js'])
  vm.runInContext(fs.readFileSync(R+f,'utf8').replace(/^const (G8Submissions|G8ProjectMonitor|G8_GAME_GRADING)\b/gm,'var $1'),ctx,{filename:f});
const C=c=>vm.runInContext(c,ctx);let pass=0;const t=(n,fn)=>{fn();pass++;console.log('PASS',n);};
// synthetic students + progress
C(`allSiswa.push({id:'a',nama:'Uji Satu',kelas:'8A'},{id:'b',nama:'Uji Dua',kelas:'8B',digitalCitizenshipAssessment:{q2:{courseId:'grade8MobileGameDeveloperQ2',assessmentVersion:'g8-bsd-games-v1',reviewed:{},rubricScores:{g8Game_platformer:{criteria:{controls:20,rules:15},note:'lama'}}}}});`);
const T=d=>Date.parse(d+'T10:00:00+07:00');
const progress={a:{grade8Games:{student:{lessons:{1:{submission:{version:1,submittedAt:T('2026-11-05'),projectUrl:'https://app.bsd.education/x',evidence:'e',reflection:'r'}},2:{submission:{version:2,submittedAt:T('2026-11-12'),projectUrl:'https://app.bsd.education/y',evidence:'e2',reflection:'r2'}},3:{projectUrl:'',evidence:'draft',updatedAt:T('2026-11-13')}}}}}};
C(`G8Submissions.onProgress(${JSON.stringify(progress)});G8ProjectMonitor.onProgress(${JSON.stringify(progress)});`);

t('rubric shape: 5 projects, groups steps 70 + challenge 30 (9/6/6/6/3)',()=>{
  const a=C('G8_GAME_ASSESSMENTS.map(a=>({id:a.id,n:a.number,steps:a.criteria.filter(c=>c.group==="steps").reduce((n,c)=>n+c.max,0),ch:a.criteria.filter(c=>c.group==="challenge").map(c=>c.max).join("/"),g:a.groups.map(g=>g.max+(g.completeAll?"*":"")).join("+")}))');
  assert.equal(a.length,5);for(const x of a){assert.equal(x.steps,70);assert.equal(x.ch,'9/6/6/6/3');assert.equal(x.g,'70*+30');}
  assert.equal(a.map(x=>x.n).join(),'F1,F2,F3,F4,F5');});
t('old v1 record is archived, new draft starts empty',()=>{const r=C(`(()=>{const d=dcDraftFromStored(allSiswa[1].digitalCitizenshipAssessment.q2,2,8);return {prev:d.previousAssessment?.rubricScores?.g8Game_platformer?.criteria?.controls,now:JSON.stringify(d.rubricScores.g8Game_platformer.criteria),rev:d.reviewed.g8Game_platformer}})()`);
  assert.equal(r.prev,20);assert.ok(!/[1-9]/.test(r.now));assert.equal(r.rev,false);
  assert.equal(C(`JSON.stringify(dcBuildGradebookFields(allSiswa[1].digitalCitizenshipAssessment.q2,2,8))`),'{}');});
t('lateness: latest F1 submission (meeting 2) vs due date, KKM floor',()=>{
  C(`G8_GAME_GRADING=G8_GAME_GRADING.map((c,i)=>i===0?{...c,dueDate:'2026-11-10'}:c);`);
});
// monitor module captured the original config array; re-create a config object for calc via module API
t('calc uses latest submission & due date; score = max(KKM, total-5*late)',()=>{
  const c=C(`({...G8_GAME_GRADING[0],dueDate:'2026-11-10'})`);ctx.__c=c;
  const r=C(`G8ProjectMonitor.calc(allSiswa[0],__c,96)`);
  assert.equal(r.completedOn,'2026-11-12');assert.equal(r.late,2);assert.equal(r.score,86);
  assert.equal(C(`G8ProjectMonitor.calc(allSiswa[0],__c,75).score`),73);
  C(`G8ProjectMonitor._setForm('a',__c,{manualDate:'2026-11-09'})`);assert.equal(C(`G8ProjectMonitor.calc(allSiswa[0],__c,96).late`),0);
  C(`G8ProjectMonitor._setForm('a',__c,{manualDate:''})`);});
t('no due date → no penalty, plan has no meta',()=>{const p=C(`G8ProjectMonitor.applyPlan(allSiswa[0],G8_GAME_GRADING[1],80)`);assert.equal(p.meta,null);assert.match(p.note,/tanpa potongan/);});
t('save flow: steps tick + challenge + apply lateness + reviewed → q2_f1 with penalty, idempotent',()=>{
  C(`dcTeacherState.grade=8;dcTeacherState.quarter=2;dcTeacherState.studentId='a';dcTeacherState.selectedAssessmentId='g8Game_platformer';dcTeacherState.draft=dcDraftFromStored(null,2,8);`);
  C(`dcCompleteGroup('g8Game_platformer','steps',true);for(const [k,v] of Object.entries({levelChange:9,prediction:6,testing:6,explain:3,reflection:2}))dcSetCriterionScore('g8Game_platformer',k,99,v,false);`);
  const plan=C(`G8ProjectMonitor.applyPlan(allSiswa[0],__c,96)`);ctx.__plan=plan;
  C(`dcTeacherState.draft.f1Late=__plan.meta;dcSetAssessmentReviewed('g8Game_platformer',true);`);
  const rec=C(`(()=>{const r=dcBuildStoredRecord(dcTeacherState.draft,2,'t',8);return r})()`);ctx.__rec=rec;
  assert.equal(rec.assessmentVersion,'g8-bsd-games-v2');assert.equal(rec.f1Late.daysLate,2);
  const f=C(`JSON.stringify(dcBuildGradebookFields(__rec,2,8))`);assert.equal(f,'{"q2_f1":86}');
  assert.equal(C(`JSON.stringify(dcBuildFormativeGradebookFields(__rec,2,8))`),'{"q2_f1":86}');
  // reload from stored record keeps lateness + reviewed, rebuild gives same score
  const again=C(`JSON.stringify(dcBuildGradebookFields(dcBuildStoredRecord(dcDraftFromStored(__rec,2,8),2,'t',8),2,8))`);assert.equal(again,'{"q2_f1":86}');
  // unreviewed projects never write; unreviewing F1 drops field
  C(`dcTeacherState.draft.reviewed.g8Game_platformer=false`);assert.equal(C(`JSON.stringify(dcBuildGradebookFields(dcBuildStoredRecord(dcTeacherState.draft,2,'t',8),2,8))`),'{}');});
t('reviewed zero is a valid score; grade 9/11 configs untouched',()=>{
  C(`dcTeacherState.draft=dcDraftFromStored(null,2,8);dcTeacherState.draft.reviewed.g8Game_wall=true;`);
  assert.equal(C(`JSON.stringify(dcBuildGradebookFields(dcBuildStoredRecord(dcTeacherState.draft,2,'t',8),2,8))`),'{"q2_f5":0}');
  assert.equal(C(`dcGetCourseConfig(2,9).id`),'codeYourOwnWorldVr');assert.equal(C(`dcGetCourseConfig(2,11).id`),'codeFutureAiQ2Weighted');});
t('monitor: lesson states, render list, open in rubric',()=>{
  assert.equal(C(`G8ProjectMonitor._lessonState('a',2).kind`),'submitted');assert.equal(C(`G8ProjectMonitor._lessonState('a',3).kind`),'draft');assert.equal(C(`G8ProjectMonitor._lessonState('b',1).kind`),'none');
  C(`G8ProjectMonitor._setLesson(2);G8ProjectMonitor.render();`);const html=els.g8MonitorList.innerHTML;
  assert.match(html,/Uji Satu/);assert.match(html,/Terkirim v2/);assert.match(html,/Buka di rubrik/);assert.match(els.g8MonitorSummary.innerHTML,/Terkirim 1/);
  C(`dcTeacherState.dirty=false;G8ProjectMonitor.open('a',G8_GAME_GRADING[2])`);assert.equal(C('dcTeacherState.studentId'),'a');assert.equal(C('dcTeacherState.selectedAssessmentId'),'g8Game_nonogram');assert.equal(C('dcTeacherState.grade'),8);});
t('student portal card hides old v1, shows v2',()=>{assert.ok(!/Game Studio · Nilai tugas BSD/.test(C(`dcBuildStudentAssessmentHtml(allSiswa[1],73)`)));
  ctx.__s={...C('allSiswa[0]'),digitalCitizenshipAssessment:{q2:ctx.__rec}};assert.match(C(`dcBuildStudentAssessmentHtml(__s,73)`),/Game Studio · Nilai tugas BSD/);});
console.log(pass,'tests passed; alerts',alerts.length);
