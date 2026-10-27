/* Grade 9 VR Studio: teacher evidence + F1 grading panel.
 * Reads learningProgress/{id}/grade9Vr (written only by the bound student) and
 * writes feedback to grade9Vr/teacher/reviews plus, only when the teacher marks
 * the task reviewed and saves, siswa/{id}/q2_f1 + siswa/{id}/grade9VrGrades/q2_f1.
 * No other gradebook field is touched. */
const G9_VR_GRADING=Object.freeze({
  q2_f1:Object.freeze({key:'q2_f1',label:'F1',field:'q2_f1',quarter:2,lessonId:1,
    title:'VR Studio pertemuan 1 · BSD “Set up A-Frame” + tantangan',
    dueDate:'2026-10-20',          // inclusive, end of day Asia/Jakarta (UTC+7)
    penaltyPerDay:5,baseDefault:100,utcOffsetHours:7}),
  // Add F2/F3 later, e.g. q2_f2:{key:'q2_f2',field:'q2_f2',quarter:2,lessonId:…,dueDate:'YYYY-MM-DD',penaltyPerDay:5,baseDefault:100,utcOffsetHours:7}
});

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
  function compute(config,{base,kkm,manualDate,submittedAt}){const c=completion(config,{manualDate,submittedAt});const late=c.completedOn?daysLate(c.completedOn,config.dueDate):null;return {...c,daysLate:late,suggested:late===null?null:suggestedScore({base,daysLate:late,kkm,penaltyPerDay:config.penaltyPerDay})};}
  /** Teacher-reviewed VR grades override rubric-derived values for the same field. */
  function applyReviewed(student,quarter,fields,grade){const g=Number(grade??String(student?.kelas||'').match(/\d+/)?.[0]);if(g!==9||!fields)return fields;for(const config of Object.values(G9_VR_GRADING)){if(config.quarter!==Number(quarter))continue;const rec=student?.grade9VrGrades?.[config.key];if(rec?.reviewed===true&&Number.isFinite(Number(rec.score)))fields[config.field]=Number(rec.score);}return fields;}
  return {localDate,daysLate,suggestedScore,completion,compute,applyReviewed,validDate};
})();

const G9VrMonitor=(()=>{
  let progress={},started=false,filter='all',openId='',progressError='',forms={};
  const config=G9_VR_GRADING.q2_f1;
  const esc=s=>(typeof escHtml==='function'?escHtml(String(s??'')):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
  const students=()=>(typeof allSiswa!=='undefined'?allSiswa:[]).filter(s=>/^9/.test(String(s.kelas||'').trim()));
  const lesson=id=>progress[id]?.student?.lessons?.[config.lessonId]||null;
  const wib=ms=>Number.isFinite(Number(ms))?new Date(Number(ms)).toLocaleString('id-ID',{timeZone:'Asia/Jakarta',dateStyle:'medium',timeStyle:'short'})+' WIB':'—';
  const safeUrl=v=>{try{const u=new URL(String(v||'').trim());return u.protocol==='https:'?u.href:'';}catch{return '';}};
  const kkmFor=s=>typeof getKKM==='function'?getKKM(s?.kelas):74;
  function gradeOf(s){return s?.grade9VrGrades?.[config.key]||null;}
  function isPending(s){const sub=lesson(s.id)?.submission,g=gradeOf(s);return !!sub&&(!g?.reviewed||Number(g.sourceVersion||0)<Number(sub.version));}
  function status(s){const row=lesson(s.id),sub=row?.submission,g=gradeOf(s);const parts=[];parts.push(sub?'Terkirim v'+sub.version+' · '+wib(sub.submittedAt):row?'Draft online · belum diajukan':'Belum ada kiriman CS.Report');parts.push(g?.reviewed?'F1 = '+g.score+(sub&&Number(g.sourceVersion||0)<Number(sub.version)?' · ada kiriman baru':''):'F1 belum dinilai di panel ini');return parts.join(' · ');}
  function form(s){const g=gradeOf(s),sub=lesson(s.id)?.submission;if(!forms[s.id])forms[s.id]={base:String(g?.base??config.baseDefault),manualDate:g?.dateSource==='manual'?g.completedOn:'',score:g?.reviewed?String(g.score):'',scoreTouched:!!g?.overridden,note:g?.note||'',reviewed:false,feedback:null};return forms[s.id];}
  function calc(s){const f=form(s),sub=lesson(s.id)?.submission;return G9VrGrades.compute(config,{base:Number(f.base),kkm:kkmFor(s),manualDate:f.manualDate,submittedAt:sub?.submittedAt??null});}
  function evidenceHTML(row){if(!row)return '<p class="g11-evidence-missing">Belum ada bukti di Firebase. Nilai tetap bisa diisi manual dari bukti BSD dengan tanggal selesai.</p>';const show=r=>{const url=safeUrl(r?.projectUrl);return (url?'<p><a class="dc-save-button" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Buka karya BSD ↗</a> <small>'+esc(url)+'</small></p>':'<p class="g11-evidence-missing">Tautan belum valid.</p>')+'<label>Yang dibuat/diubah · jawaban siswa<textarea readonly rows="4" class="g11-student-answer">'+esc(r?.evidence||'')+'</textarea></label><label>Refleksi · jawaban siswa<textarea readonly rows="3" class="g11-student-answer">'+esc(r?.reflection||'')+'</textarea></label>'+(r?.exitTicket?'<label>Exit ticket<textarea readonly rows="2" class="g11-student-answer">'+esc(r.exitTicket)+'</textarea></label>':'');};const sub=row.submission;return (sub?'<h5>Kiriman v'+esc(sub.version)+' · diterima Firebase '+esc(wib(sub.submittedAt))+'</h5>'+show(sub):'<h5>Draft online · belum diajukan</h5>'+show(row))+(sub&&['projectUrl','evidence','reflection','exitTicket'].some(k=>String(row[k]||'')!==String(sub[k]||''))?'<details><summary>Draft lebih baru · belum diajukan</summary>'+show(row)+'</details>':'');}
  function detailHTML(s){const row=lesson(s.id),sub=row?.submission,review=progress[s.id]?.teacher?.reviews?.[config.lessonId],f=form(s),c=calc(s),g=gradeOf(s),kkm=kkmFor(s),current=s[config.field];const fb=f.feedback||review||{};
    return '<div class="g11-evidence g9vr-detail" data-student="'+esc(s.id)+'"><h4>'+esc(s.nama)+' · '+esc(s.kelas)+' · '+config.label+'</h4><p class="g11-evidence-caption">'+esc(config.title)+'. Batas: Selasa, 20 Oktober 2026 (akhir hari WIB). Terlambat: −'+config.penaltyPerDay+'/hari, tidak di bawah KKM '+esc(kkm)+'.</p>'+evidenceHTML(row)+
    (sub?'<label>Feedback guru<textarea maxlength="2000" class="g9vr-feedback">'+esc(fb.message||'')+'</textarea></label><label>Status feedback<select class="g9vr-feedback-status"><option value="seen">Sudah dilihat</option><option value="needs_revision" '+(fb.status==='needs_revision'?'selected':'')+'>Perlu revisi</option><option value="accepted" '+(fb.status==='accepted'?'selected':'')+'>Diterima</option></select></label>'+(review&&review.sourceVersion!==sub.version?'<small>Feedback tersimpan untuk kiriman versi '+esc(review.sourceVersion)+'.</small>':'')+'<button type="button" class="dc-save-button g9vr-feedback-save" data-version="'+esc(sub.version)+'">Kirim feedback</button>':'')+
    '<h5>Nilai '+config.label+' (Q2)</h5><div class="g9vr-grid"><label>Nilai dasar (kualitas)<input type="number" min="0" max="100" step="0.5" class="g9vr-base" value="'+esc(f.base)+'"></label><label>Tanggal selesai manual (opsional)<input type="date" class="g9vr-date" value="'+esc(f.manualDate)+'"></label></div>'+
    '<p class="g9vr-calc" aria-live="polite">'+(c.completedOn?'Tanggal dipakai: <b>'+esc(c.completedOn)+'</b> ('+(c.dateSource==='manual'?'manual guru':'stempel kiriman Firebase, WIB')+') · terlambat <b>'+esc(c.daysLate)+'</b> hari · usulan nilai <b>'+esc(c.suggested)+'</b>':'Isi tanggal selesai (atau tunggu kiriman siswa) untuk menghitung usulan nilai.')+'</p>'+
    '<div class="g9vr-grid"><label>Nilai akhir '+config.label+' (boleh diubah guru)<input type="number" min="0" max="100" step="0.01" class="g9vr-score" value="'+esc(f.scoreTouched?f.score:(c.suggested??f.score))+'"></label><label>Catatan guru (opsional)<input type="text" maxlength="2000" class="g9vr-note" value="'+esc(f.note)+'"></label></div>'+
    '<label class="g9vr-check"><input type="checkbox" class="g9vr-reviewed" '+(f.reviewed?'checked':'')+'> Sudah diperiksa guru — simpan ke buku nilai Q2 '+config.label+'</label>'+
    '<small>Nilai '+config.label+' di buku nilai saat ini: '+esc(current===''||current===undefined||current===null?'kosong':current)+(g?.reviewed?' · terakhir dinilai di panel ini: '+esc(g.score)+' (bukti v'+esc(g.sourceVersion||0)+', '+esc(g.completedOn||'—')+')':'')+'. Kolom lain (F2, F3, sumatif, Q1) tidak diubah.</small>'+
    '<button type="button" class="dc-save-button g9vr-save" '+(f.reviewed?'':'disabled')+'>Simpan nilai '+config.label+'</button></div>';}
  function render(){const root=document.getElementById('g9VrMonitorList');if(!root)return;if(root.contains(document.activeElement)&&document.activeElement!==document.body&&document.activeElement.tagName!=='BUTTON')return;
    const cls=document.getElementById('g9VrMonitorClass')?.value||'',query=(document.getElementById('g9VrMonitorSearch')?.value||'').toLowerCase(),all=students();
    const choice=document.getElementById('g9VrMonitorClass');const classes=[...new Set(all.map(s=>String(s.kelas)))].sort();if(choice&&choice.options.length-1!==classes.length){const keep=choice.value;choice.innerHTML='<option value="">Semua kelas 9</option>'+classes.map(c=>'<option>'+esc(c)+'</option>').join('');choice.value=classes.includes(keep)?keep:'';}
    const list=all.filter(s=>(!cls||String(s.kelas)===cls)&&String(s.nama||'').toLowerCase().includes(query)&&(filter==='all'||(filter==='pending'&&isPending(s))||(filter==='ungraded'&&!gradeOf(s)?.reviewed)));
    root.innerHTML=(progressError?'<p class="g11-evidence-missing" role="alert">Bukti Firebase belum dapat dimuat. Muat ulang dashboard.</p>':'')+(list.map(s=>'<article class="g11-monitor-row"><div><b>'+esc(s.nama)+'</b><small>'+esc(s.kelas)+' · '+esc(status(s))+'</small></div><div><button type="button" class="dc-save-button g9vr-open" data-student="'+esc(s.id)+'" aria-expanded="'+(openId===s.id)+'">'+(openId===s.id?'Tutup':'Bukti & nilai '+config.label)+'</button></div></article>'+(openId===s.id?detailHTML(s):'')).join('')||'<p class="g11-monitor-empty">Belum ada siswa kelas 9 yang sesuai filter.</p>');
    root.querySelectorAll('.g9vr-open').forEach(b=>b.addEventListener('click',()=>{openId=openId===b.dataset.student?'':b.dataset.student;render();}));
    root.querySelectorAll('.g9vr-detail').forEach(bind);}
  function bind(box){const s=students().find(x=>x.id===box.dataset.student);if(!s)return;const f=form(s),q=sel=>box.querySelector(sel);
    const refresh=()=>{const c=calc(s);q('.g9vr-calc').innerHTML=c.completedOn?'Tanggal dipakai: <b>'+esc(c.completedOn)+'</b> ('+(c.dateSource==='manual'?'manual guru':'stempel kiriman Firebase, WIB')+') · terlambat <b>'+esc(c.daysLate)+'</b> hari · usulan nilai <b>'+esc(c.suggested)+'</b>':'Isi tanggal selesai (atau tunggu kiriman siswa) untuk menghitung usulan nilai.';if(!f.scoreTouched&&c.suggested!==null){q('.g9vr-score').value=c.suggested;f.score=String(c.suggested);}};
    const unreview=()=>{f.reviewed=false;q('.g9vr-reviewed').checked=false;q('.g9vr-save').disabled=true;};
    q('.g9vr-base').addEventListener('input',e=>{f.base=e.target.value;unreview();refresh();});
    q('.g9vr-date').addEventListener('input',e=>{f.manualDate=e.target.value;unreview();refresh();});
    q('.g9vr-score').addEventListener('input',e=>{f.score=e.target.value;f.scoreTouched=e.target.value!=='';unreview();});
    q('.g9vr-note').addEventListener('input',e=>{f.note=e.target.value;});
    q('.g9vr-reviewed').addEventListener('change',e=>{f.reviewed=e.target.checked;q('.g9vr-save').disabled=!f.reviewed;});
    q('.g9vr-save').addEventListener('click',()=>save(s,q('.g9vr-save')));
    const fb=q('.g9vr-feedback-save');if(fb){const remember=()=>{f.feedback={message:q('.g9vr-feedback').value,status:q('.g9vr-feedback-status').value};};q('.g9vr-feedback').addEventListener('input',remember);q('.g9vr-feedback-status').addEventListener('change',remember);fb.addEventListener('click',async()=>{fb.disabled=true;try{const teacher=await G9CloudIdentity.verifyTeacher();await db.ref('learningProgress').child(s.id).child('grade9Vr/teacher/reviews').child(String(config.lessonId)).set({message:q('.g9vr-feedback').value.slice(0,2000),status:q('.g9vr-feedback-status').value,sourceVersion:Number(fb.dataset.version),updatedAt:G9CloudIdentity.stamp(),updatedBy:teacher.uid});f.feedback=null;showAlert('Feedback VR Studio terkirim ke siswa. Nilai disimpan terpisah.','success');}catch(e){showAlert('Feedback belum terkirim: '+esc(e.message),'danger');}finally{fb.disabled=false;}});}}
  function buildRecord(s,uid){const f=form(s),c=calc(s),sub=lesson(s.id)?.submission,kkm=kkmFor(s);const raw=f.scoreTouched||c.suggested===null?f.score:String(c.suggested),score=Number(raw),base=Number(f.base);
    if(!f.reviewed)throw Error('Centang "Sudah diperiksa guru" terlebih dahulu.');
    if(!(raw!==''&&Number.isFinite(score)&&score>=0&&score<=100))throw Error('Nilai akhir harus 0–100.');
    if(!(Number.isFinite(base)&&base>=0&&base<=100))throw Error('Nilai dasar harus 0–100.');
    const record={score:Math.round(score*100)/100,base,daysLate:c.daysLate??0,penaltyPerDay:config.penaltyPerDay,kkm:Number(kkm)||0,dueDate:config.dueDate,lessonId:config.lessonId,sourceVersion:Number(sub?.version||0),overridden:c.suggested===null||Math.abs(score-c.suggested)>1e-9,reviewed:true,reviewedAt:G9CloudIdentity.stamp(),reviewedBy:uid};
    if(c.suggested!==null)record.suggested=c.suggested;if(c.completedOn){record.completedOn=c.completedOn;record.dateSource=c.dateSource;}if(f.note.trim())record.note=f.note.trim().slice(0,2000);return record;}
  async function save(s,button){button.disabled=true;try{const teacher=await G9CloudIdentity.verifyTeacher();const record=buildRecord(s,teacher.uid);const current=s[config.field],prev=gradeOf(s);
      if(current!==''&&current!==undefined&&current!==null&&!(prev?.reviewed&&Number(prev.score)===Number(current))&&Number(current)!==record.score&&!window.confirm('Buku nilai '+config.label+' '+s.nama+' saat ini '+current+'. Ganti dengan '+record.score+'?'))return;
      await siswaRef.child(s.id).update({[config.field]:record.score,['grade9VrGrades/'+config.key]:record});
      s[config.field]=record.score;s.grade9VrGrades={...(s.grade9VrGrades||{}),[config.key]:{...record,reviewedAt:Date.now()}};delete forms[s.id];
      showAlert('Nilai '+config.label+' '+esc(s.nama)+' tersimpan: '+record.score+'. Kolom lain tidak diubah.','success');render();if(typeof renderTableBody==='function'&&typeof allSiswa!=='undefined')renderTableBody(allSiswa);
    }catch(e){showAlert('Nilai belum tersimpan: '+esc(e.message),'danger');}finally{button.disabled=false;}}
  function mount(){if(!document.getElementById('g9VrMonitorPanel'))return;document.getElementById('g9VrMonitorSearch').addEventListener('input',render);document.getElementById('g9VrMonitorClass').addEventListener('change',render);document.getElementById('g9VrMonitorFilter').addEventListener('change',e=>{filter=e.target.value;render();});}
  function start(){if(started)return;started=true;mount();render();}
  return {start,render,buildRecord,_setForm(id,patch){const s=students().find(x=>x.id===id);if(s)Object.assign(form(s),patch);},onProgressError(e){progressError=String(e?.message||e||'error');render();},onProgress(value){progressError='';progress={};for(const [id,row]of Object.entries(value||{}))if(row?.grade9Vr)progress[id]=row.grade9Vr;render();},_state:()=>({progress,forms})};
})();
if(typeof window!=='undefined')Object.assign(window,{G9_VR_GRADING,G9VrGrades,G9VrMonitor});
