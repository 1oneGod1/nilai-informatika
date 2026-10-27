'use strict';
// The publishing helper injects fingerprinted local files into this manifest.
const VR_LANGUAGE_ASSETS = {"id":{"data":"data.cfd25370358a.js","app":"app.3d0ffc6c0f27.js","access":"access.42231bc9a855.js"},"en":{"data":"data-en.0203333b5157.js","app":"app-en.e298bdbeaf25.js","access":"access-en.9c31a105c6bd.js"},"shared":{"identity":"../js/grade9-cloud-identity.5636913a8844.js","cloud":"cloud.d0f446fed15a.js"}};
const VR_LANGUAGE_KEY='cs-report-grade9-language',VR_LANGUAGE_DRAFT='cs-report-grade9-language-draft';
const languageParam=new URLSearchParams(location.search).get('lang');
let vrLanguage=languageParam==='en'||languageParam==='id'?languageParam:'id';
try{if(!languageParam)vrLanguage=localStorage.getItem(VR_LANGUAGE_KEY)==='en'?'en':'id';localStorage.setItem(VR_LANGUAGE_KEY,vrLanguage);}catch{}
document.documentElement.lang=vrLanguage;
document.getElementById('vr-language').value=vrLanguage;
if(vrLanguage==='en'){
 const texts={
  'gate-title':'Open your learning materials from your grade page.',
  'gate-copy':'Search for your name or student ID in CS.Report, enter your student password, then choose <b>Buka VR Studio</b> (Open VR Studio) on your Grade 9 page.',
  'gate-link':'Find your name in CS.Report →',
  'portal-back':'← Return to CS.Report',
  'book-link':'Gradebook <span aria-hidden="true">↗</span>',
  'review-banner':'Teacher review mode. Practice notes are separate from students; official grades are unchanged.',
  'footer-companion':'Classroom companion for BSD Construct a VR World.',
  'footer-schedule':'9 lessons · 2 periods per lesson · Explore, Learn & Create',
  'footer-storage':'Drafts save automatically; press Submit to teacher to hand in your task. Practice quiz scores stay on this browser. Official grades are recorded in the teacher’s gradebook.'
 };
 for(const [id,html] of Object.entries(texts))document.getElementById(id).innerHTML=html;
 document.querySelector('.brand small').textContent='GRADE 9 · CODING';
 document.querySelector('.vr-gate-card .eyebrow').textContent='CS.Report · Grade 9';
 document.querySelector('.brand').setAttribute('aria-label','VR Studio, home');
 document.querySelector('.skip').textContent='Skip to learning content';
 document.querySelector('nav').setAttribute('aria-label','Main navigation');
 for(const [key,text] of Object.entries({home:'Lessons',project:'Final project',teacher:'Teacher guide'}))document.querySelector('[data-nav="'+key+'"]').textContent=text;
 document.title='VR Studio — Grade 9 · CS.Report';
 document.querySelector('meta[name="description"]').content='Grade 9 VR Studio: goals, summaries, tasks, Biblical Christian Worldview, quizzes and classroom briefs for nine BSD lessons.';
}
document.getElementById('vr-language').addEventListener('change',event=>{
 const nextLanguage=event.target.value;if(nextLanguage!=='en'&&nextLanguage!=='id')return;
 try{
  localStorage.setItem(VR_LANGUAGE_KEY,nextLanguage);
  if(typeof vrSession!=='undefined'&&vrSession){
   const controls=[...document.querySelectorAll('#main input,#main select')].map(el=>({id:el.id,name:el.name,rubric:el.getAttribute('data-rubric'),value:el.value,checked:el.checked}));
   const submitted=[...document.querySelectorAll('#main form')].filter(f=>f.querySelector('button[type="submit"]')?.disabled).map(f=>f.id);
   sessionStorage.setItem(VR_LANGUAGE_DRAFT,JSON.stringify({studentId:vrSession.id,hash:location.hash,tab:typeof currentTab==='string'?currentTab:null,controls,submitted,at:Date.now()}));
  }
 }catch{}
 const url=new URL(location.href);url.searchParams.set('lang',nextLanguage);location.assign(url.href);
});
document.addEventListener('vr-ready',()=>{
 try{
  const raw=sessionStorage.getItem(VR_LANGUAGE_DRAFT);sessionStorage.removeItem(VR_LANGUAGE_DRAFT);if(!raw)return;
  const draft=JSON.parse(raw),age=Date.now()-draft.at;
  if(draft.studentId!==vrSession.id||draft.hash!==location.hash||!Number.isFinite(age)||age<0||age>120000)return;
  if(location.hash.startsWith('#lesson/')&&draft.tab)switchTab(draft.tab);
  for(const c of draft.controls||[]){
   const el=[...document.querySelectorAll('#main input,#main select')].find(el=>c.rubric!==null&&c.rubric!==undefined?el.getAttribute('data-rubric')===c.rubric:c.id?el.id===c.id:el.name===c.name&&el.value===c.value);
   if(!el)continue;if(el.type==='radio')el.checked=Boolean(c.checked);else{el.value=c.value;el.dispatchEvent(new Event('input',{bubbles:true}));}
  }
  for(const id of draft.submitted||[]){const form=document.getElementById(id);if(form?.tagName==='FORM'&&[...form.querySelectorAll('fieldset')].every(f=>f.querySelector('input:checked')))form.requestSubmit();}
 }catch{}
},{once:true});
function loadVrLanguageScript(filename){return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=filename;script.async=false;script.onload=resolve;script.onerror=reject;document.head.append(script);});}
async function loadVrLanguage(){const assets=VR_LANGUAGE_ASSETS[vrLanguage],shared=VR_LANGUAGE_ASSETS.shared||{};for(const file of [shared.identity,shared.cloud])if(file)await loadVrLanguageScript(file);await loadVrLanguageScript(assets.data);await loadVrLanguageScript(assets.access);await loadVrLanguageScript(assets.app);}
loadVrLanguage().catch(()=>{document.getElementById('learning-app').hidden=true;document.getElementById('access-gate').hidden=false;document.getElementById('gate-copy').textContent=vrLanguage==='en'?'The materials could not be loaded. Refresh the page or return to CS.Report.':'Materi belum berhasil dimuat. Muat ulang halaman atau kembali ke CS.Report.';});
