/* Grade 8 Game Studio: teacher submission overview + lateness, same method as grade 9 VR.
 * Reads learningProgress/{id}/grade8Games (written only by the bound student; data arrives via
 * teacher.js -> G8ProjectMonitor.onProgress). Grades are saved ONLY through the main rubric
 * workspace (saveDcAssessment). Project rubric = A. BSD steps 70 + B. challenge 30
 * (js/grade8-game-assessment.js). Gradebook score = max(KKM, rubric total − 5 × days late);
 * the lateness metadata is stored per project (f1Late..f5Late) by "Terapkan keterlambatan". */
const G8_GAME_GRADING=Object.freeze([
  /* dueDate: inclusive, end of day WIB (YYYY-MM-DD). null = not set yet → no lateness penalty. */
  Object.freeze({key:'q2_f1',label:'F1',field:'q2_f1',metaKey:'f1Late',assessmentId:'g8Game_platformer',lessons:[1,2],title:'Project 1 · Platformer Game',dueDate:null,penaltyPerDay:5}),
  Object.freeze({key:'q2_f2',label:'F2',field:'q2_f2',metaKey:'f2Late',assessmentId:'g8Game_traffic',lessons:[3],title:'Project 2 · Traffic Looper',dueDate:null,penaltyPerDay:5}),
  Object.freeze({key:'q2_f3',label:'F3',field:'q2_f3',metaKey:'f3Late',assessmentId:'g8Game_nonogram',lessons:[4],title:'Project 3 · Nonogram',dueDate:null,penaltyPerDay:5}),
  Object.freeze({key:'q2_f4',label:'F4',field:'q2_f4',metaKey:'f4Late',assessmentId:'g8Game_dungeon',lessons:[5],title:'Project 4 · Dungeon Battle',dueDate:null,penaltyPerDay:5}),
  Object.freeze({key:'q2_f5',label:'F5',field:'q2_f5',metaKey:'f5Late',assessmentId:'g8Game_wall',lessons:[6],title:'Project 5 · Wall Jumper',dueDate:null,penaltyPerDay:5}),
]);
/* Game Studio meetings (grade8-games/data.js) and the challenge students submit evidence for. */
const G8_GAME_LESSONS=Object.freeze({
  1:Object.freeze({title:'Mulai dunia game',challenge:'Ubah satu bagian lantai dan jumlah coin di tempat yang sama. Prediksi tampilannya sebelum Run.'}),
  2:Object.freeze({title:'Lompat, ambil coin, selesai',challenge:'Pada salinan Sandbox, ubah platformSpeed atau susunan coin. Buat satu level yang tetap bisa diselesaikan.'}),
  3:Object.freeze({title:'Atur kecepatan Traffic Looper',challenge:'Ubah kecepatan normal. Samakan nilainya pada nilai awal dan onPointerUp, lalu bandingkan dua percobaan.'}),
  4:Object.freeze({title:'Buat pola Nonogram',challenge:'Buat satu pola baru. Teman menyelesaikannya tanpa diberi gambar jawaban.'}),
  5:Object.freeze({title:'Aturan dan HP Dungeon Battle',challenge:'Ubah playerAttack dari 10 ke 8 pada salinan kerja. Bandingkan hasil beberapa serangan dan jelaskan dampaknya.'}),
  6:Object.freeze({title:'Lompatan Wall Jumper',challenge:'Ubah gravity sedikit pada salinan. Bandingkan tinggi lompatan dan apakah game masih bisa dimainkan.'}),
  7:Object.freeze({title:'Jadikan game milikmu',challenge:'Teman mencoba tanpa petunjuk lisan. Perbaiki satu hal yang membuatnya bingung atau kesulitan.'}),
  8:Object.freeze({title:'Demo dan jelaskan karyamu',challenge:'Sebelum mengubah satu nilai, prediksi hasilnya. Jalankan game dan cocokkan dengan prediksimu.'}),
});

const G8Late=(()=>{
  const DAY=86400000;
  const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+'T00:00:00Z'))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;
  /** Calendar date (YYYY-MM-DD) of a timestamp in WIB (UTC+7). */
  const localDate=ms=>{const n=Number(ms);return Number.isFinite(n)&&ms!==null?new Date(n+7*3600000).toISOString().slice(0,10):'';};
  const daysLate=(done,due)=>validDate(done)&&validDate(due)?Math.max(0,Math.round((Date.parse(done+'T00:00:00Z')-Date.parse(due+'T00:00:00Z'))/DAY)):null;
  return {validDate,localDate,daysLate};
})();

const G8ProjectMonitor=(()=>{
  let progress={},started=false,filter='all',sortBy='name',monitorLesson=1,progressError='';const expanded=new Set(),forms={};
  const BY_ASSESSMENT=Object.fromEntries(G8_GAME_GRADING.map(c=>[c.assessmentId,c]));
  const BY_LESSON=Object.fromEntries(G8_GAME_GRADING.flatMap(c=>c.lessons.map(n=>[n,c])));
  const esc=s=>(typeof escHtml==='function'?escHtml(String(s??'')):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
  const students=()=>(typeof allSiswa!=='undefined'?allSiswa:[]).filter(s=>/^8/.test(String(s.kelas||'').trim()));
  const kkmFor=s=>typeof getKKM==='function'?getKKM(s?.kelas):73;
  const stored=s=>s?.digitalCitizenshipAssessment?.q2||null;
  const isV2=s=>stored(s)?.courseId===G8_GAME_COURSE_ID&&stored(s)?.assessmentVersion===G8_GAME_VERSION;
  const reviewed=(s,c)=>isV2(s)&&stored(s)?.reviewed?.[c.assessmentId]===true;
  const lessonRow=(id,n)=>progress[id]?.student?.lessons?.[n]||null;
  const safeUrl=v=>{try{const u=new URL(String(v||'').trim());return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  const wib=ms=>Number.isFinite(Number(ms))&&ms!==null?new Date(Number(ms)).toLocaleString('id-ID',{timeZone:'Asia/Jakarta',dateStyle:'medium',timeStyle:'short'})+' WIB':'—';
  const wibParts=ms=>{const n=Number(ms);if(!Number.isFinite(n)||ms===null)return null;const d=new Date(n);return {date:d.toLocaleDateString('id-ID',{timeZone:'Asia/Jakarta',weekday:'short',day:'numeric',month:'short',year:'numeric'}),time:d.toLocaleTimeString('id-ID',{timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit'})+' WIB'};};
  const dueText=d=>G8Late.validDate(d)?new Date(d+'T12:00:00+07:00').toLocaleDateString('id-ID',{timeZone:'Asia/Jakarta',weekday:'long',day:'numeric',month:'long',year:'numeric'}):'belum diatur';
  const REVIEW_LABEL={seen:'Sudah dilihat',needs_revision:'Perlu revisi',accepted:'Diterima'};
  function lessonState(id,n){const row=lessonRow(id,n),sub=row?.submission||null;return {row,sub,kind:sub?'submitted':row?'draft':'none',review:progress[id]?.teacher?.reviews?.[n]||null};}
  /** Latest submitted snapshot among the project's meetings (F1 = meetings 1–2). */
  function projectSubmission(id,c){let best=null;for(const n of c.lessons){const sub=lessonRow(id,n)?.submission;if(sub&&(!best||Number(sub.submittedAt)>Number(best.sub.submittedAt)))best={n,sub};}return best;}
  const versionOf=(id,c)=>typeof G8Submissions!=='undefined'?G8Submissions.version(id,c.assessmentId):'';
  function isPending(s,c){const p=projectSubmission(s.id,c);if(!p)return false;if(!reviewed(s,c))return true;const v=stored(s)?.evidenceVersions?.[c.assessmentId];return v!==undefined&&v!==versionOf(s.id,c);}
  function form(s,c){const k=c.key+':'+s.id;if(!forms[k]){const m=stored(s)?.[c.metaKey];forms[k]={manualDate:m?.dateSource==='manual'?m.completedOn:''};}return forms[k];}
  function rubricParts(c){const a=G8_GAME_ASSESSMENTS.find(x=>x.id===c.assessmentId),sc=(typeof dcTeacherState!=='undefined'&&dcTeacherState.draft?.rubricScores?.[c.assessmentId]?.criteria)||{};
    const sum=g=>Math.round(a.criteria.filter(x=>!g||x.group===g).reduce((n,x)=>n+Math.min(x.max,Math.max(0,Number(sc[x.id])||0)),0)*100)/100;return {steps:sum('steps'),challenge:sum('challenge'),total:sum('')};}
  /** Completion date: manual teacher date wins; otherwise the latest submission timestamp (WIB). */
  function calc(s,c,base){const f=form(s,c),p=projectSubmission(s.id,c);let completedOn='',dateSource='';
    if(G8Late.validDate(f.manualDate)){completedOn=f.manualDate;dateSource='manual';}else if(p){completedOn=G8Late.localDate(p.sub.submittedAt);dateSource='submission';}
    const due=c.dueDate&&G8Late.validDate(c.dueDate)?c.dueDate:null,late=due&&completedOn?G8Late.daysLate(completedOn,due):null,kkm=Number(kkmFor(s))||0;
    const meta=late===null?null:{label:c.label,field:c.field,daysLate:late,penaltyPerDay:c.penaltyPerDay,kkm,dueDate:due,completedOn,dateSource,sourceVersion:p?String(p.n)+':v'+p.sub.version:'',lessons:c.lessons.slice()};
    return {completedOn,dateSource,due,late,meta,score:meta?g8LateScore(base,meta):base};}
  /** Pure plan for "Terapkan keterlambatan": lateness metadata + audit note. */
  function applyPlan(s,c,base=100){const r=calc(s,c,base);if(r.due&&!r.completedOn)throw Error('Isi tanggal selesai (atau tunggu kiriman siswa) terlebih dahulu.');
    const note=r.meta?c.label+' Game Studio: selesai '+r.meta.completedOn+' ('+(r.meta.dateSource==='manual'?'tanggal manual guru':'kiriman Game Studio '+r.meta.sourceVersion)+'), batas '+r.meta.dueDate+', terlambat '+r.meta.daysLate+' hari → nilai = max(KKM '+r.meta.kkm+', total rubrik − '+r.meta.penaltyPerDay+'×'+r.meta.daysLate+').':c.label+' Game Studio: batas waktu belum diatur, nilai = total rubrik tanpa potongan.';
    return {meta:r.meta,note};}

  function formHTML(r){const url=safeUrl(r?.projectUrl);return (url?'<p><a class="dc-save-button" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Buka karya BSD ↗</a> <small>'+esc(url)+'</small></p>':'<p class="g11-evidence-missing">Tautan belum valid.</p>')+'<label>Perubahan / bukti · jawaban siswa<textarea readonly rows="4" class="g11-student-answer">'+esc(r?.evidence||'')+'</textarea></label><label>Hasil uji / refleksi · jawaban siswa<textarea readonly rows="3" class="g11-student-answer">'+esc(r?.reflection||'')+'</textarea></label>';}
  function stateHTML(st,n){const c=BY_LESSON[n];
    if(st.kind==='submitted'){const t=wibParts(st.sub.submittedAt),late=c&&c.dueDate?G8Late.daysLate(G8Late.localDate(st.sub.submittedAt),c.dueDate):null;
      return '<span class="g9vr-badge g9vr-badge-ok">Terkirim v'+esc(st.sub.version)+'</span>'+(t?'<span class="g9vr-when"><i class="fas fa-calendar-day"></i> '+esc(t.date)+'</span><span class="g9vr-when"><i class="fas fa-clock"></i> '+esc(t.time)+'</span>':'')+(late>0?'<span class="g9vr-badge g9vr-badge-late">Terlambat '+esc(late)+' hari</span>':late===0?'<span class="g9vr-badge g9vr-badge-ok">Tepat waktu</span>':'')+(st.review?'<span class="g9vr-badge">Feedback: '+esc(REVIEW_LABEL[st.review.status]||st.review.status)+(Number(st.review.sourceVersion)!==Number(st.sub.version)?' (v'+esc(st.review.sourceVersion)+')':'')+'</span>':'');}
    if(st.kind==='draft'){const t=wibParts(st.row.updatedAt);return '<span class="g9vr-badge g9vr-badge-draft">Draft · belum diajukan</span>'+(t?'<span class="g9vr-when">diubah '+esc(t.date)+' · '+esc(t.time)+'</span>':'');}
    return '<span class="g9vr-badge g9vr-badge-none">Belum ada kiriman</span>';}
  function matches(s,st){const c=BY_LESSON[monitorLesson];switch(filter){case 'submitted':return st.kind==='submitted';case 'draft':return st.kind==='draft';case 'none':return st.kind!=='submitted';case 'pending':return !!c&&isPending(s,c);case 'ungraded':return !!c&&!reviewed(s,c);default:return true;}}
  /** Open a student in the main rubric workspace (grade 8, Q2, project F1–F5). */
  function open(id,c){if(typeof dcTeacherState==='undefined'||dcTeacherState.saving)return;if(dcTeacherState.dirty&&!window.confirm('Ada rubrik yang belum disimpan. Tetap membuka siswa ini?'))return;dcTeacherState.dirty=false;
    changeDcAssessmentGrade(8);setQuarter(2);const g=document.getElementById('dcAssessmentGrade');if(g)g.value='8';if(typeof refreshAssessmentStudentOptions==='function')refreshAssessmentStudentOptions();
    dcTeacherState.studentId=id;const sel=document.getElementById('dcAssessmentStudent');if(sel)sel.value=id;dcTeacherState.selectedAssessmentId=(c||G8_GAME_GRADING[0]).assessmentId;loadDcAssessmentDraft();
    document.getElementById('dcAssessmentPanel')?.scrollIntoView({behavior:'smooth',block:'start'});}
  function render(){const root=typeof document!=='undefined'?document.getElementById('g8MonitorList'):null;if(!root){renderCalc();return;}if(root.contains(document.activeElement)&&document.activeElement!==document.body&&document.activeElement.tagName!=='BUTTON')return;
    const cls=document.getElementById('g8MonitorClass')?.value||'',query=(document.getElementById('g8MonitorSearch')?.value||'').toLowerCase(),all=students(),n=monitorLesson,c=BY_LESSON[n]||null;
    const choice=document.getElementById('g8MonitorClass');const classes=[...new Set(all.map(s=>String(s.kelas)))].sort();if(choice&&choice.options.length-1!==classes.length){const keep=choice.value;choice.innerHTML='<option value="">Semua kelas 8</option>'+classes.map(k=>'<option>'+esc(k)+'</option>').join('');choice.value=classes.includes(keep)?keep:'';}
    const inClass=all.filter(s=>!cls||String(s.kelas)===cls),states=new Map(inClass.map(s=>[s.id,lessonState(s.id,n)])),count=k=>inClass.filter(s=>states.get(s.id).kind===k).length,info=G8_GAME_LESSONS[n];
    const summary=document.getElementById('g8MonitorSummary');if(summary)summary.innerHTML='<b>Pertemuan '+esc(n)+' · '+esc(info?.title||'')+(c?' → '+esc(c.label):'')+'</b>'+(c?'<span class="g9vr-badge">Batas '+esc(c.label)+': '+esc(dueText(c.dueDate))+'</span>':'')+'<span class="g9vr-badge g9vr-badge-ok">Terkirim '+count('submitted')+'</span><span class="g9vr-badge g9vr-badge-draft">Draft '+count('draft')+'</span><span class="g9vr-badge g9vr-badge-none">Belum '+count('none')+'</span><small>dari '+inClass.length+' siswa'+(cls?' '+esc(cls):' kelas 8')+'</small>'+(info?'<div class="g9vr-hint" style="flex-basis:100%">Challenge: '+esc(info.challenge)+'</div>':'');
    const time=s=>{const st=states.get(s.id);return st.kind==='submitted'?Number(st.sub.submittedAt)||0:null;};
    let list=inClass.filter(s=>String(s.nama||'').toLowerCase().includes(query)&&matches(s,states.get(s.id)));
    if(sortBy!=='name')list=[...list].sort((a,b)=>{const ta=time(a),tb=time(b);if(ta===null&&tb===null)return String(a.nama).localeCompare(String(b.nama));if(ta===null)return 1;if(tb===null)return -1;return sortBy==='newest'?tb-ta:ta-tb;});
    else list=[...list].sort((a,b)=>String(a.kelas).localeCompare(String(b.kelas))||String(a.nama).localeCompare(String(b.nama)));
    root.innerHTML=(progressError?'<p class="g11-evidence-missing" role="alert">Bukti Firebase belum dapat dimuat. Muat ulang dashboard.</p>':'')+(list.map(s=>{const st=states.get(s.id),key=s.id+':'+n,isOpen=expanded.has(key);
      return '<article class="g11-monitor-row g9vr-row"><div class="g9vr-row-main"><div><b>'+esc(s.nama)+'</b><small>'+esc(s.kelas)+(c?' · '+esc(reviewed(s,c)?c.label+' = '+(s[c.field]??'—'):c.label+' belum dinilai'):'')+'</small></div><div class="g9vr-state">'+stateHTML(st,n)+'</div><div class="g9vr-actions">'+(st.kind!=='none'?'<button type="button" class="dc-save-button g8m-toggle" data-key="'+esc(key)+'" aria-expanded="'+isOpen+'">'+(isOpen?'Tutup form':'Lihat form')+'</button>':'')+'<button type="button" class="dc-save-button g8m-open" data-student="'+esc(s.id)+'">Buka di rubrik</button></div></div>'+
        (isOpen&&st.kind!=='none'?'<div class="g9vr-inline">'+(st.kind==='submitted'?'<h5>Form kiriman v'+esc(st.sub.version)+' · '+esc(wib(st.sub.submittedAt))+'</h5>'+formHTML(st.sub):'<h5>Draft online · belum diajukan</h5>'+formHTML(st.row))+'</div>':'')+'</article>';}).join('')||'<p class="g11-monitor-empty">Belum ada siswa kelas 8 yang sesuai filter.</p>');
    root.querySelectorAll('.g8m-open').forEach(b=>b.addEventListener('click',()=>open(b.dataset.student,c||G8_GAME_GRADING[0])));
    root.querySelectorAll('.g8m-toggle').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.key;if(expanded.has(k))expanded.delete(k);else expanded.add(k);render();}));
    renderCalc();}
  const isWorkspace=()=>typeof dcTeacherState!=='undefined'&&dcTeacherState.grade===8&&dcTeacherState.quarter===2&&typeof g8IsGameCourse==='function'&&g8IsGameCourse(2,8);
  function calcText(s,c){const r=rubricParts(c),x=calc(s,c,r.total);
    const head='Total rubrik <b>'+esc(r.total)+'</b> (steps '+esc(r.steps)+'/70 + challenge '+esc(r.challenge)+'/30)';
    if(!x.due)return head+' · batas '+esc(c.label)+' belum diatur → nilai '+esc(c.label)+' <b>'+esc(r.total)+'</b> (tanpa potongan)';
    if(!x.completedOn)return head+' · isi tanggal selesai (atau tunggu kiriman siswa) untuk menghitung keterlambatan.';
    return head+' · tanggal dipakai <b>'+esc(x.completedOn)+'</b> ('+(x.dateSource==='manual'?'manual guru':'stempel kiriman Game Studio, WIB')+') · terlambat <b>'+esc(x.late)+'</b> hari · nilai '+esc(c.label)+' <b>'+esc(x.score)+'</b>';}
  /** Lateness calculator under the rubric evidence (grade 8, Q2, selected project). */
  function renderCalc(force=false){const target=typeof document!=='undefined'?document.getElementById('g8LatePanel'):null;if(!target||!isWorkspace())return;if(!force&&target.contains(document.activeElement)&&document.activeElement.tagName!=='BUTTON')return;
    const c=BY_ASSESSMENT[dcTeacherState.selectedAssessmentId],s=students().find(x=>x.id===dcTeacherState.studentId);if(!c||!s){target.innerHTML='';return;}
    const f=form(s,c),kkm=kkmFor(s),meta=dcTeacherState.draft?.[c.metaKey],p=projectSubmission(s.id,c),x=calc(s,c,rubricParts(c).total);
    target.innerHTML='<div class="g11-evidence" style="margin:12px 0"><h4>Nilai '+esc(c.label)+' · '+esc(c.title)+' · '+esc(s.nama)+'</h4><p class="g11-evidence-caption">Batas '+esc(dueText(c.dueDate))+(c.dueDate?' (akhir hari WIB)':'')+'. Terlambat −'+c.penaltyPerDay+'/hari, nilai minimal KKM '+esc(kkm)+'. Kiriman terakhir: '+(p?'pertemuan '+esc(p.n)+' v'+esc(p.sub.version)+' · '+esc(wib(p.sub.submittedAt)):'belum ada')+'.</p>'+
      '<p class="g9vr-hint">Centang <b>“Semua steps sudah lengkap”</b> di rubrik bila semua step BSD selesai (otomatis 70); bila belum, isi poin step manual. Lalu nilai kriteria challenge.</p>'+
      '<label>Tanggal selesai manual (dari BSD, opsional)<input type="date" class="g8l-date" value="'+esc(f.manualDate)+'" style="width:100%;padding:10px;color:inherit;background:#0f172a;border:1px solid #334155;border-radius:8px;color-scheme:dark"></label>'+
      '<p class="g8l-calc" aria-live="polite" style="padding:10px;border-radius:8px;background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.3)">'+calcText(s,c)+'</p>'+
      '<button type="button" class="dc-save-button g8l-apply" '+(x.due&&!x.completedOn?'disabled':'')+'>'+(x.due?'Terapkan keterlambatan & tandai diperiksa':'Tandai diperiksa (tanpa potongan)')+'</button> <small>Menyimpan data keterlambatan, menulis catatan, dan menandai '+esc(c.label)+' “sudah diperiksa”. Lalu tekan <b>Simpan penilaian</b>.</small>'+
      (dcTeacherState.draft?.reviewed?.[c.assessmentId]===true&&!meta&&x.due?'<p style="color:#fbbf24">Sudah ditandai diperiksa tanpa data keterlambatan: nilai = total rubrik tanpa potongan.</p>':'')+'</div>';
    const q=sel=>target.querySelector(sel),refresh=()=>{const y=calc(s,c,rubricParts(c).total);q('.g8l-calc').innerHTML=calcText(s,c);q('.g8l-apply').disabled=!!(y.due&&!y.completedOn);};
    q('.g8l-date').addEventListener('input',e=>{f.manualDate=e.target.value;refresh();});
    q('.g8l-apply').addEventListener('click',()=>apply(s,c));}
  function apply(s,c){try{if(dcTeacherState.saving)return;const A=c.assessmentId,plan=applyPlan(s,c,rubricParts(c).total);
      const prev=String(dcTeacherState.draft.rubricScores[A]?.note||'').split('\n').filter(l=>!l.startsWith(c.label+' Game Studio: ')).join('\n').trim();
      dcSetAssessmentNote(A,(plan.note+(prev?'\n'+prev:'')).slice(0,4000));
      if(plan.meta)dcTeacherState.draft[c.metaKey]=plan.meta;else delete dcTeacherState.draft[c.metaKey];
      dcSetAssessmentReviewed(A,true);dcTeacherState.dirty=true;dcTeacherState.selectedAssessmentId=A;renderDcAssessmentPanel();if(typeof updateDcSaveState==='function')updateDcSaveState();
      const total=rubricParts(c).total;showAlert(esc(c.label)+' '+esc(s.nama)+': '+(plan.meta?'terlambat '+plan.meta.daysLate+' hari, nilai '+g8LateScore(total,plan.meta):'nilai '+total)+'. Tekan “Simpan penilaian” untuk menyimpan.','info');
    }catch(e){showAlert(esc(e.message),'warning');}}
  function mount(){if(!document.getElementById('g8MonitorPanel'))return;document.getElementById('g8MonitorSearch').addEventListener('input',render);document.getElementById('g8MonitorClass').addEventListener('change',render);document.getElementById('g8MonitorFilter').addEventListener('change',e=>{filter=e.target.value;render();});
    const ls=document.getElementById('g8MonitorLesson');if(ls){ls.innerHTML=Object.keys(G8_GAME_LESSONS).map(k=>'<option value="'+k+'">Pertemuan '+k+' · '+esc(G8_GAME_LESSONS[k].title)+(BY_LESSON[k]?' ('+BY_LESSON[k].label+')':'')+'</option>').join('');ls.value=String(monitorLesson);ls.addEventListener('change',e=>{monitorLesson=Number(e.target.value)||1;render();});}
    document.getElementById('g8MonitorSort')?.addEventListener('change',e=>{sortBy=e.target.value;render();});}
  function start(){if(started)return;started=true;mount();render();}
  return {start,render,renderCalc,open,applyPlan,calc,projectSubmission,_lessonState:lessonState,_setLesson(n){monitorLesson=Number(n)||1;},_setForm(id,c,patch){const s=students().find(x=>x.id===id);if(s)Object.assign(form(s,c),patch);},
    onProgressError(e){progressError=String(e?.message||e||'error');render();},
    onProgress(value){progressError='';progress={};for(const [id,row]of Object.entries(value||{}))if(row?.grade8Games)progress[id]=row.grade8Games;render();}};
})();
if(typeof window!=='undefined')Object.assign(window,{G8_GAME_GRADING,G8_GAME_LESSONS,G8Late,G8ProjectMonitor});
