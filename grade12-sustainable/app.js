'use strict';
const LANGUAGE_KEY = 'cs-report-grade12-language';
const requestedLanguage = new URLSearchParams(location.search).get('lang');
let language = requestedLanguage === 'en' ? 'en' : 'id';
try { if (!requestedLanguage) language = localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'id'; } catch {}
const t = (id,en) => language === 'en' ? en : id;
const tx = pair => Array.isArray(pair) ? String(pair[language === 'en' ? 1 : 0] ?? pair[0] ?? '') : String(pair ?? '');
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let storageKey = '', practice = { lessons: {} }, tab = 'brief', stageFilter = -1, searchText = '';
const main = document.getElementById('main');
function localizeShell() {
  document.documentElement.lang = language;
  document.getElementById('language').value = language;
  const texts = {
    'gate-title':t('Buka materi dari halaman nilaimu.','Open your materials from your grade page.'),
    'gate-copy':t('Cari nama atau NIS di CS.Report, masukkan password siswa, lalu pilih Buka Sustainable Web Studio pada halaman kelas 12.','Search for your name or student ID in CS.Report, enter your student password, then choose Buka Sustainable Web Studio on your Grade 12 page.'),
    'gate-link':t('Cari nama di CS.Report →','Find your name in CS.Report →'),
    'book-link':t('Buku nilai ↗','Gradebook ↗'), 'skip-link':t('Langsung ke materi','Skip to content'),
    'footer-copy':t('Pendamping kelas untuk BSD Connect2Work Course 3 · Rancangan 26 × 90 menit.','Classroom companion for BSD Connect2Work Course 3 · Plan: 26 × 90 minutes.'),
    'footer-storage':t('Progres latihan tersimpan per siswa pada browser ini. Nilai resmi dicatat oleh guru di CS.Report.','Practice progress is saved per student on this browser. Official grades are recorded by the teacher in CS.Report.')
  };
  for (const [id,text] of Object.entries(texts)) document.getElementById(id).textContent = text;
  for (const [key,text] of Object.entries({home:t('Pertemuan','Lessons'),project:t('Tugas & sumatif','Tasks & summative'),teacher:t('Panduan guru','Teacher guide')})) document.querySelector('[data-nav="'+key+'"]').textContent = text;
}
function teacherMode() { return Boolean(g12Session?.isTeacherPreview || g12Session?.isLocalPreview); }
function lessonRecord(id) {
  if (!practice.lessons[id] || typeof practice.lessons[id] !== 'object' || Array.isArray(practice.lessons[id])) practice.lessons[id] = {};
  return practice.lessons[id];
}
function loadPractice() {
  storageKey = 'cs-report-grade12-course3-practice-v2:' + encodeURIComponent(g12Session.id);
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (value && value.lessons && typeof value.lessons === 'object' && !Array.isArray(value.lessons)) practice = value;
    else if (!value) {
      const previous = JSON.parse(localStorage.getItem('cs-report-grade12-course3-practice-v1:' + encodeURIComponent(g12Session.id)) || 'null');
      if (previous?.lessons && typeof previous.lessons === 'object' && !Array.isArray(previous.lessons)) {
        practice = previous;
        for (const record of Object.values(practice.lessons)) {
          if (!record || typeof record !== 'object' || Array.isArray(record)) continue;
          record.previousPractice = {pre:record.pre,post:record.post,complete:record.complete,bank:'v1'};
          for (const field of ['pre','post','draftpre','draftpost','complete']) delete record[field];
        }
        practice.migratedAt = Date.now();
        savePractice();
        toast(t('Kuis diperbarui. Catatan lama tetap ada; hasil kuis lama diarsipkan. Kerjakan bank baru sebelum menandai selesai.','Quizzes updated. Notes are retained; old quiz results are archived. Attempt the new bank before marking complete.'));
      }
    }
  } catch {}
}
function savePractice() {
  try { localStorage.setItem(storageKey,JSON.stringify(practice)); return true; }
  catch { toast(t('Penyimpanan browser tidak tersedia. Unduh catatan sebelum menutup halaman.','Browser storage is unavailable. Download your notes before closing.')); return false; }
}
function toast(message) {
  const element = document.getElementById('toast'); element.textContent = message; element.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => element.classList.remove('show'),4500);
}
function safeWorkLink(value) {
  try { const url = new URL(String(value || '').trim()); return ['https:','http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}
function list(items) { return '<ul>'+items.map(item=>'<li>'+esc(tx(item))+'</li>').join('')+'</ul>'; }
function agenda() {
  return '<div class="agenda">'+[[t('Pembuka','Opening'),10],[t('Penjelasan','Explanation'),10],[t('BSD & penerapan','BSD & application'),55],[t('Checkpoint','Checkpoint'),10],[t('Exit ticket','Exit ticket'),5]].map(([name,time])=>'<span>'+esc(name)+' · '+time+' '+t('mnt','min')+'</span>').join('')+'</div>';
}
function teacherScript(lesson) {
  return t('Tujuan kita hari ini: ','Our goal today: ')+tx(lesson.goal)+' '+t('Materi BSD: ','BSD activities: ')+lesson.bsd.slice(0,2).join(' / ')+'. '+t('Tugasmu: ','Your task: ')+tx(lesson.tasks[0])+' '+t('Kriteria keberhasilan: ','Success criterion: ')+tx(lesson.success[0])+' '+t('Penerapan WKA hari ini: ','Today’s Biblical Christian Worldview application: ')+tx(lesson.practice);
}
function homeCards() {
  const matches = LESSONS.filter(lesson => (stageFilter < 0 || lesson.stage === stageFilter) && (tx(lesson.title)+' '+lesson.bsd.join(' ')+' '+tx(lesson.goal)).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  return matches.length ? matches.map(lesson=>{
    const record=lessonRecord(lesson.id), done=record.complete===true;
    return '<a class="lesson-card" href="#lesson/'+lesson.id+'"><div class="card-top"><b>'+String(lesson.id).padStart(2,'0')+'</b><small>'+esc(tx(STAGES[lesson.stage]))+'</small></div><div class="card-body"><h3>'+esc(tx(lesson.title))+'</h3><p>'+esc(tx(lesson.goal))+'</p></div><div class="card-bottom"><span>'+t('90 menit','90 minutes')+' · '+(done?t('Selesai ✓','Complete ✓'):t('Buka brief','Open brief'))+'</span><span>→</span></div></a>';
  }).join('') : '<p class="empty">'+t('Tidak ada pertemuan yang cocok.','No matching lessons.')+'</p>';
}
function renderHome() {
  const done=LESSONS.filter(lesson=>lessonRecord(lesson.id).complete===true).length;
  main.innerHTML = '<section class="hero"><div><p class="eyebrow">BSD CONNECT2WORK · COURSE 3</p><h1>'+t('Bangun website.<br><em>Pikirkan dampaknya.</em>','Build a website.<br><em>Consider its impact.</em>')+'</h1><p class="lead">'+esc(tx(COURSE.overview))+'</p><div class="actions"><a class="btn" href="#lesson/'+(LESSONS.find(l=>!lessonRecord(l.id).complete)?.id||1)+'">'+t('Lanjut belajar →','Continue learning →')+'</a><a class="btn secondary" href="#project">'+t('Lihat tugas akhir','View final task')+'</a></div></div><div class="journey"><p class="eyebrow">EXPLORE · BUILD · TEST · EXPLAIN</p><h2>'+t('Dari kebutuhan ke karya','From a need to a product')+'</h2>'+[[t('Website organisasi','Organization website'),'01'],[t('Berita dari database','News from a database'),'02'],[t('Toko & pengelolaan pesanan','Store & order management'),'03']].map(([name,num])=>'<div class="journey-row"><span>'+name+'</span><b>ASSIGNMENT '+num+'</b></div>').join('')+'<p>'+t('26 pertemuan · ','26 lessons · ')+QUESTION_COUNT+t(' soal dengan pembahasan · ID / EN',' questions with explanations · ID / EN')+'</p></div></section><section class="progress-strip" aria-label="'+t('Progres belajar','Learning progress')+'"><b>'+done+' / 26 '+t('selesai','complete')+'</b><div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="26" aria-valuenow="'+done+'"><span style="width:'+done/26*100+'%"></span></div><small>'+t('Latihan pribadi · bukan nilai rapor','Personal practice · separate from report grades')+'</small></section><section class="panel overview"><p class="eyebrow">'+t('Tujuan utama','Main goal')+'</p><div class="goal"><p>'+esc(tx(COURSE.goal))+'</p></div><h3>'+t('Yang diharapkan dari kamu','What is expected of you')+'</h3>'+list(COURSE.outcomes)+'<p class="timing">'+esc(tx(COURSE.timing))+'</p></section><div class="section-top"><h2>'+t('Peta pertemuan','Lesson map')+'</h2><input id="lesson-search" class="search" type="search" aria-label="'+t('Cari materi','Search lessons')+'" placeholder="'+t('Cari materi atau proyek BSD…','Search lessons or BSD projects…')+'" value="'+esc(searchText)+'"></div><div class="filters"><button class="filter" data-stage="-1" aria-pressed="'+(stageFilter===-1)+'">'+t('Semua','All')+'</button>'+STAGES.map((stage,i)=>'<button class="filter" data-stage="'+i+'" aria-pressed="'+(stageFilter===i)+'">'+esc(tx(stage))+'</button>').join('')+'</div><div class="lesson-grid" id="lesson-grid">'+homeCards()+'</div>';
  document.getElementById('lesson-search').addEventListener('input',event=>{searchText=event.target.value;document.getElementById('lesson-grid').innerHTML=homeCards();});
  main.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>{stageFilter=Number(button.dataset.stage);renderHome();}));
}
function stepLabel(source) {
  const numbers=source.pages||source.steps||[], chunks=[];
  for(let i=0;i<numbers.length;i++){let end=numbers[i],start=end;while(numbers[i+1]===end+1)end=numbers[++i];chunks.push(start===end?String(start):start+'–'+end);}
  return (source.kind==='pdf'?t('halaman ','pages '):t('langkah ','steps '))+chunks.join(', ');
}
function sourceHTML(lesson) {
  return '<details class="source-focus"><summary>'+t('Fokus BSD yang diperiksa','Inspected BSD focuses')+'</summary><p class="muted">'+t('Ringkasan pendamping dari sumber BSD. Tugas pengayaan dan WKA disusun untuk kelas.','Companion summaries of BSD sources. Extension tasks and BCW are classroom design.')+'</p>'+lesson.sourceFocus.map(item=>'<div class="keys"><h3>'+esc(item.source.title)+'</h3><small>'+esc(stepLabel(item.source))+'</small><p>'+esc(tx(item.focus))+'</p></div>').join('')+'</details>';
}
function questionOriginHTML(question) {
  return '<p class="muted">'+(question.source?esc(t('Cek konsep sumber: ','Source concept check: ')+question.source.title+' · '+stepLabel(question.source)):t('Cek/penerapan yang disusun guru','Teacher-written check/application'))+'</p>';
}
function auditHTML() {
  return '<section class="panel"><p class="eyebrow">SOURCE REVIEW · '+BSD_AUDIT.date+'</p><h2>'+t('Materi dan kuis yang ditelusuri','Materials and quiz alignment reviewed')+'</h2><p>'+BSD_AUDIT.guidedProjects+t(' proyek/template BSD · ',' BSD projects/templates · ')+BSD_AUDIT.sourceSteps+t(' langkah sumber · PDF pengantar 10 halaman · ',' source steps · 10-page introduction PDF · ')+QUESTION_COUNT+t(' soal pendamping.',' companion questions.')+'</p>'+list(AUDIT_NOTES)+'<div class="table-wrap"><table><thead><tr><th>'+t('Sumber BSD','BSD source')+'</th><th>'+t('Langkah','Steps')+'</th><th>'+t('Pertemuan','Lessons')+'</th><th>'+t('Fokus','Focus')+'</th></tr></thead><tbody>'+BSD_SOURCES.map(source=>{const matches=LESSONS.filter(l=>l.sourceFocus.some(f=>f.source.title===source.title));const focus=matches[0]?.sourceFocus.find(f=>f.source.title===source.title);return '<tr><td>'+esc(source.title)+'</td><td>'+source.steps+'</td><td>'+matches.map(l=>'<a href="#lesson/'+l.id+'">'+l.id+'</a>').join(', ')+'</td><td>'+esc(tx(focus?.focus))+'</td></tr>';}).join('')+'</tbody></table></div></section>';
}
function briefHTML(lesson) {
  const wka=BCW[lesson.bcw];
  return '<section class="panel"><p class="eyebrow">'+t('Pengantar kelas','Classroom brief')+'</p><div class="goal"><span class="eyebrow">MAIN GOAL</span><p>'+esc(tx(lesson.goal))+'</p></div><h2>'+t('Materi yang akan dilalui','What we will learn')+'</h2><p>'+esc(tx(lesson.material))+'</p>'+sourceHTML(lesson)+'<div class="brief-grid"><section class="brief-card"><h3>'+t('Tugas hari ini','Today’s tasks')+'</h3>'+list(lesson.tasks)+'</section><section class="brief-card"><h3>'+t('Kriteria keberhasilan','Success criteria')+'</h3>'+list(lesson.success)+'<div class="evidence-box"><p>'+t('Bukti: tautan karya, catatan pengujian, dan penjelasan/refleksi sesuai tugas.','Evidence: a work link, test notes, and explanation/reflection appropriate to the task.')+'</p></div></section></div><section class="brief-card bcw"><p class="eyebrow">'+t('WKA · Wawasan Kristen Alkitabiah','BCW · Biblical Christian Worldview')+'</p><h3>'+esc(tx(wka.principle))+'</h3><p><a href="'+esc(tx(wka.url))+'" target="_blank" rel="noopener noreferrer">'+esc(tx(wka.reference))+' ↗</a></p><p>'+esc(tx(lesson.practice))+'</p><p><b>'+t('Refleksi: ','Reflection: ')+'</b>'+esc(tx(lesson.exit))+'</p></section><details><summary>'+t('Kalimat pengantar yang dapat dibacakan','Read-aloud classroom introduction')+'</summary><div class="script"><p>'+esc(teacherScript(lesson))+'</p></div></details><h3 style="margin-top:24px">'+t('Agenda 90 menit','90-minute agenda')+'</h3>'+agenda()+'<div class="actions"><button class="btn" data-tab="practice">'+t('Mulai pertanyaan awal →','Start the opening check →')+'</button><button class="btn secondary" id="download-brief">'+t('Unduh brief','Download brief')+'</button><button class="btn secondary" id="print-brief">'+t('Cetak','Print')+'</button></div></section>';
}
function quizHTML(lesson,kind) {
  const record=lessonRecord(lesson.id), questions=lesson[kind], saved=record[kind]?.last;
  const answers=saved?.answers || record['draft'+kind] || [];
  return '<form id="quiz-'+kind+'" data-kind="'+kind+'">'+questions.map((question,index)=>'<fieldset class="question"><legend>'+(index+1)+'. '+esc(tx(question.stem))+'</legend>'+questionOriginHTML(question)+question.options.map((option,choice)=>'<label class="option"><input type="radio" name="'+kind+'-'+index+'" value="'+choice+'" '+(answers[index]===choice?'checked ':'')+(saved?'disabled':'')+' required><span>'+esc(tx(option))+'</span></label>').join('')+(saved?'<div class="feedback '+(Number(saved.answers?.[index])===question.answer?'':'wrong')+'"><b>'+t('Jawaban: ','Answer: ')+esc(tx(question.options[question.answer]))+'</b><br>'+esc(tx(question.explanation))+'</div>':'')+'</fieldset>').join('')+(saved?'<p class="quiz-score" role="status">'+t('Hasil percobaan: ','Attempt result: ')+Number(saved.score)+' / '+questions.length+'</p><p class="saved-state">'+(kind==='pre'?t('Diagnostik pertama: ','First diagnostic: ')+Number(record.pre.first.score)+' / '+questions.length+t(' · Tetap tersimpan saat mencoba ulang.',' · Preserved when you retry.'):t('Skor latihan terbaik: ','Best practice score: ')+Number(record.post.best)+' / '+questions.length)+t(' · Tidak masuk nilai rapor.',' · Does not enter report grades.')+'</p><button type="button" class="btn secondary retry" data-kind="'+kind+'">'+t('Coba lagi','Try again')+'</button>':'<button class="btn" type="submit">'+t('Periksa jawaban','Check answers')+'</button>')+'</form>';
}
function practiceHTML(lesson) {
  return (lessonRecord(lesson.id).previousPractice?'<p class="notice">'+t('Bank kuis sudah diperbarui. Catatan dan hasil lama tetap tersimpan sebagai arsip; kuis dan tanda selesai memakai bank baru.','The quiz bank has been updated. Notes and old results remain archived; quizzes and completion now use the new bank.')+'</p>':'')+'<section class="panel"><p class="eyebrow">'+t('Sebelum belajar','Before learning')+'</p><h2>'+t('Pertanyaan pembuka','Opening questions')+'</h2><p class="opening">'+esc(tx(lesson.opening))+'</p><label class="field">'+t('Jawaban diskusi awalmu','Your opening discussion response')+'<textarea data-field="openingResponse" placeholder="'+t('Tulis ide awal sebelum praktik…','Write your initial idea before practice…')+'">'+esc(lessonRecord(lesson.id).openingResponse||'')+'</textarea></label>'+quizHTML(lesson,'pre')+'</section><section class="panel"><p class="eyebrow">'+t('Setelah BSD & penerapan','After BSD & application')+'</p><h2>'+t('Kuis latihan dengan pembahasan','Practice quiz with explanations')+'</h2><p class="muted">'+t('Kerjakan setelah praktik. Gunakan pembahasan untuk memperbaiki pemahaman, lalu coba ulang bila perlu.','Complete this after practice. Use explanations to improve understanding, then retry if needed.')+'</p>'+quizHTML(lesson,'post')+'</section>';
}
function evidenceHTML(lesson) {
  const record=lessonRecord(lesson.id), link=safeWorkLink(record.link);
  return '<section class="panel"><p class="eyebrow">'+t('Bukti & refleksi','Evidence & reflection')+'</p><h2>'+t('Tunjukkan proses belajarmu','Show your learning process')+'</h2>'+list(lesson.success)+'<p class="timing">'+t('Catatan di sini adalah latihan pribadi pada browser ini. Untuk pengumpulan resmi, ikuti arahan guru; tanggal dan instruksi lama di brief BSD bukan jadwal kelas saat ini.','These are personal practice notes on this browser. Follow teacher instructions for official submission; old dates and instructions in BSD briefs are not the current class schedule.')+'</p><label class="field">'+t('Tautan karya / sandbox (http atau https)','Work / sandbox link (http or https)')+'<input data-field="link" type="url" value="'+esc(record.link||'')+'" placeholder="https://app.bsd.education/…"></label>'+(link?'<a href="'+esc(link)+'" target="_blank" rel="noopener noreferrer">'+t('Buka karya ↗','Open work ↗')+'</a>':'')+'<label class="field">'+t('Catatan kode, sumber, dan kontribusi','Code, sources, and contribution notes')+'<textarea data-field="notes">'+esc(record.notes||'')+'</textarea></label><label class="field">'+t('Log uji: skenario → harapan → hasil aktual → perbaikan / uji ulang','Test log: scenario → expected → actual → fix / retest')+'<textarea data-field="tests" placeholder="'+t('Contoh: input kosong → ditolak → pesan muncul → berhasil.','Example: empty input → rejected → message appears → passed.')+'">'+esc(record.tests||'')+'</textarea></label><label class="field">Exit ticket: '+esc(tx(lesson.exit))+'<textarea data-field="exit">'+esc(record.exit||'')+'</textarea></label><p class="saved-state" id="save-status" role="status">'+t('Tersimpan otomatis saat mengetik. Unduh cadangan untuk berpindah perangkat.','Saved automatically as you type. Download a backup before switching devices.')+'</p><label class="complete"><input type="checkbox" id="complete-lesson" '+(record.complete?'checked':'')+'><span>'+t('Tandai selesai setelah mencoba kuis latihan, menambahkan tautan karya, dan menulis exit ticket. Guru tetap memeriksa kualitas bukti.','Mark complete after attempting the practice quiz, adding a work link, and writing an exit ticket. The teacher still checks evidence quality.')+'</span></label><div class="actions"><button class="btn secondary" id="export-notes">'+t('Unduh catatan saya','Download my notes')+'</button></div></section>';
}
function renderLesson(lesson) {
  const tabNames={brief:t('Pengantar','Brief'),practice:t('Pertanyaan & kuis','Questions & quiz'),evidence:t('Bukti & refleksi','Evidence & reflection')};
  main.innerHTML='<a href="#home">← '+t('Semua pertemuan','All lessons')+'</a><div class="lesson-heading"><div class="number">'+String(lesson.id).padStart(2,'0')+'</div><div><h1>'+esc(tx(lesson.title))+'</h1><p>'+esc(tx(STAGES[lesson.stage]))+' · 90 '+t('menit','minutes')+'</p></div></div><div class="lesson-layout"><div><div class="tabs" role="tablist" aria-label="'+t('Bagian pertemuan','Lesson sections')+'">'+Object.entries(tabNames).map(([name,label])=>'<button role="tab" id="tab-'+name+'" aria-controls="lesson-content" class="tab" data-tab="'+name+'" aria-selected="'+(name===tab)+'" tabindex="'+(name===tab?'0':'-1')+'">'+label+'</button>').join('')+'</div><div id="lesson-content" role="tabpanel" aria-labelledby="tab-'+tab+'">'+(tab==='brief'?briefHTML(lesson):tab==='practice'?practiceHTML(lesson):evidenceHTML(lesson))+'</div><div class="navigation">'+(lesson.id>1?'<a class="btn secondary" href="#lesson/'+(lesson.id-1)+'">← '+t('Sebelumnya','Previous')+'</a>':'<a class="btn secondary" href="#home">← '+t('Beranda','Home')+'</a>')+(lesson.id<26?'<a class="btn" href="#lesson/'+(lesson.id+1)+'">'+t('Berikutnya','Next')+' →</a>':'<a class="btn" href="#project">'+t('Rubrik akhir','Final rubric')+' →</a>')+'</div></div><aside class="sidebar panel"><h3>'+t('Buka di BSD','Open in BSD')+'</h3><ol>'+lesson.bsd.map(name=>'<li>'+esc(name)+'</li>').join('')+'</ol><a class="btn secondary" href="https://app.bsd.education/" target="_blank" rel="noopener noreferrer">BSD Online ↗</a><p>'+t('Masuk ke kelas 12, pilih Connect2Work Course 3, lalu cari judul di atas. Praktik coding dilakukan di BSD.','Open your Grade 12 classroom, select Connect2Work Course 3, and find the titles above. Complete coding practice in BSD.')+'</p><label class="field">'+t('Pindah pertemuan','Go to lesson')+'<select id="lesson-jump">'+LESSONS.map(item=>'<option value="'+item.id+'" '+(item.id===lesson.id?'selected':'')+'>'+item.id+'. '+esc(tx(item.title))+'</option>').join('')+'</select></label><p>'+t('Perlu bantuan? Tunjukkan bagian kode, input, hasil yang diharapkan, dan hasil aktual kepada guru.','Need help? Show your teacher the code section, input, expected result, and actual result.')+'</p></aside></div>';
  document.getElementById('lesson-jump').addEventListener('change',event=>location.hash='#lesson/'+event.target.value);
  main.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>{tab=button.dataset.tab;renderLesson(lesson);document.getElementById('tab-'+tab).focus();}));
  const tabs=main.querySelector('.tabs');
  tabs.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault(); const names=Object.keys(tabNames),at=names.indexOf(tab);
    tab=names[event.key==='Home'?0:event.key==='End'?2:(at+(event.key==='ArrowRight'?1:2))%3];renderLesson(lesson);document.getElementById('tab-'+tab).focus();
  });
  main.querySelectorAll('[data-field]').forEach(field=>field.addEventListener('input',()=>{
    const record=lessonRecord(lesson.id);record[field.dataset.field]=field.value;
    if(!safeWorkLink(record.link)||!String(record.exit||'').trim()){record.complete=false;const box=document.getElementById('complete-lesson');if(box)box.checked=false;}
    const saved=savePractice(),status=document.getElementById('save-status');if(status)status.textContent=saved?t('Tersimpan pada browser ini.','Saved on this browser.'):t('Belum tersimpan. Unduh cadangan.','Not saved. Download a backup.');
  }));
  main.querySelectorAll('form[data-kind]').forEach(form=>{
    const kind=form.dataset.kind;
    form.addEventListener('change',()=>{lessonRecord(lesson.id)['draft'+kind]=lesson[kind].map((_,i)=>{const selected=form.querySelector('[name="'+kind+'-'+i+'"]:checked');return selected?Number(selected.value):null;});savePractice();});
    form.addEventListener('submit',event=>{
      event.preventDefault();const answers=lesson[kind].map((_,i)=>{const selected=form.querySelector('[name="'+kind+'-'+i+'"]:checked');return selected?Number(selected.value):null;});
      if(answers.some(answer=>answer===null)){toast(t('Jawab semua pertanyaan dahulu.','Answer every question first.'));return;}
      recordAttempt(lesson.id,kind,answers);renderLesson(lesson);
    });
  });
  main.querySelectorAll('.retry').forEach(button=>button.addEventListener('click',()=>{const kind=button.dataset.kind,record=lessonRecord(lesson.id);delete record[kind].last;delete record['draft'+kind];savePractice();renderLesson(lesson);}));
  document.getElementById('complete-lesson')?.addEventListener('change',event=>{
    const record=lessonRecord(lesson.id);
    if(event.target.checked&&(!record.post?.attempts||!safeWorkLink(record.link)||!String(record.exit||'').trim())){event.target.checked=false;toast(t('Coba kuis latihan, tambahkan tautan valid, dan isi exit ticket dahulu.','Attempt the practice quiz, add a valid link, and complete the exit ticket first.'));return;}
    record.complete=event.target.checked;savePractice();toast(t('Progres diperbarui.','Progress updated.'));
  });
  document.getElementById('download-brief')?.addEventListener('click',()=>download('grade12-brief-'+lesson.id+'-'+language+'.md',briefMarkdown(lesson)));
  document.getElementById('print-brief')?.addEventListener('click',()=>window.print());
  document.getElementById('export-notes')?.addEventListener('click',exportNotes);
}
function recordAttempt(id,kind,answers) {
  const lesson=LESSONS.find(item=>item.id===id),questions=lesson?.[kind];
  if(!questions||answers.length!==questions.length||answers.some(answer=>!Number.isInteger(answer)||answer<0||answer>2))return false;
  const record=lessonRecord(id),score=answers.filter((answer,i)=>answer===questions[i].answer).length;
  const result={score,answers:answers.slice(),at:Date.now()};
  if(!record[kind]||typeof record[kind]!=='object')record[kind]={};
  if(kind==='pre'&&!record.pre.first)record.pre.first=result;
  if(kind==='post')record.post.best=Math.max(Number(record.post.best)||0,score);
  record[kind].last=result;record[kind].attempts=(Number(record[kind].attempts)||0)+1;
  record['draft'+kind]=answers.slice();savePractice();return true;
}
function assignmentCard(number,title,items,lessons) {
  return '<section class="panel"><p class="eyebrow">ASSIGNMENT '+number+' · '+t('Pertemuan ','Lessons ')+lessons+'</p><h2>'+title+'</h2>'+list(items.map(B))+'</section>';
}
function renderProject() {
  main.innerHTML='<section class="project-hero"><p class="eyebrow">BUILD · TEST · EXPLAIN</p><h1>'+t('Tiga tugas. Satu perjalanan belajar.','Three assignments. One learning journey.')+'</h1><p>'+esc(tx(COURSE.goal))+'</p><a class="btn light" href="#lesson/26">'+t('Brief presentasi akhir →','Final presentation brief →')+'</a></section>'+assignmentCard(1,t('Website organisasi','Organization website'),[
    'Header/navigasi, konten utama, dan footer.|Header/navigation, main content, and footer.',
    'Grid responsif, carousel, menu mobile yang dapat dilipat, gambar responsif, minimal tiga card.|Responsive grid, carousel, collapsible mobile menu, responsive images, and at least three cards.',
    'Konten sendiri tanpa placeholder; sumber aset diakui; uji desktop/mobile.|Original content without placeholders; asset sources acknowledged; desktop/mobile tests.',
    'Bukti: tautan sandbox, penjelasan kode, dan revisi berdasarkan masukan.|Evidence: sandbox link, code explanation, and a revision based on feedback.'
  ],'8–9')+assignmentCard(2,t('Website berita dengan BSD database','News website with the BSD database'),[
    'Gunakan template siswa dan tampilkan berita dari database melalui JavaScript.|Use the student template and display database news through JavaScript.',
    'Siapkan tanggal valid pada salinan seed (template belum memuat tanggal); urutkan terbaru, tampilkan recommended, dan uji responsivitas.|Provide valid dates in the seed copy (the template has no dates); order newest first, display recommended news, and test responsiveness.',
    'Bukti: tautan sandbox, hasil uji, dan penjelasan bersuara tentang alur kode.|Evidence: sandbox link, test results, and a narrated explanation of the code flow.'
  ],'16–17')+assignmentCard(3,t('Website e-commerce terintegrasi','Integrated e-commerce website'),[
    'Katalog dan detail dari database; cart dengan kuantitas, hapus, subtotal, dan total.|Database catalogue and details; cart with quantities, removal, subtotals, and total.',
    'Checkout simulasi dengan ongkir 0/30, order pada management view, dan reset setelah simpan.|Simulated checkout with shipping 0/30, orders in management view, and reset after saving.',
    'Tambah, tampilkan, edit, dan hapus produk menurut product.id; simpan koleksi pada allProducts.|Add, show, edit, and delete products by product.id; save the collection at allProducts.',
    'Identitas dan konten sendiri; alasan keberlanjutan; test log, revisi, sumber, dan kontribusi individual.|Original identity and content; sustainability rationale; test log, revisions, sources, and individual contribution.',
    'Checkpoint akhir ini adalah rancangan guru yang selaras dengan rubrik CS.Report.|This final checkpoint is a teacher-designed assessment aligned with the CS.Report rubric.'
  ],'18–26')+'<section class="panel"><p class="eyebrow">'+t('Rubrik sumatif','Summative rubric')+'</p><h2>'+t('Apa yang dinilai?','What is assessed?')+'</h2><p>'+t('Kriteria berikut berjumlah 100 poin. Konfigurasi rapor kelas 12 Q2 saat ini memakai formatif 40% dan sumatif 60%; kuis pendamping ini tidak otomatis masuk rapor.','The following criteria total 100 points. The current Grade 12 Q2 report configuration uses formative 40% and summative 60%; these companion quizzes do not automatically enter the report.')+'</p><div class="rubric">'+COURSE.rubric.map(([name,weight,description])=>'<div><strong>'+esc(tx(name))+'</strong><b>'+weight+'</b><p>'+esc(tx(description))+'</p></div>').join('')+'</div></section><section class="panel"><h2>'+t('Siapkan untuk demonstrasi','Prepare for the demonstration')+'</h2>'+list([B('Tunjukkan satu transaksi simulasi dari produk sampai order tercatat.|Show one simulated transaction from product to saved order.'),B('Jelaskan potongan kode yang dipilih guru dan kontribusimu.|Explain a code section selected by the teacher and your contribution.'),B('Tunjukkan satu bug, perbaikannya, dan uji ulang.|Show one bug, its fix, and the retest.'),B('Jelaskan manfaat, tradeoff, dan alasan keputusan sustainability.|Explain benefits, tradeoffs, and reasons for sustainability decisions.')])+'<button class="btn secondary" id="download-tests">'+t('Unduh template log uji','Download test-log template')+'</button></section>';
  document.getElementById('download-tests').addEventListener('click',()=>download('grade12-test-log-'+language+'.md','# '+t('Log pengujian e-commerce','E-commerce test log')+'\n\n| '+t('Skenario | Hasil diharapkan | Hasil aktual | Perbaikan | Uji ulang','Scenario | Expected | Actual | Fix | Retest')+' |\n|---|---|---|---|---|\n'+[t('Cart kosong','Empty cart'),t('Tambah produk sama, ubah kuantitas, dan hapus saat 0','Add the same product, change quantity, and remove at 0'),t('Checkout dengan input tidak lengkap','Checkout with incomplete input'),t('Order cocok dengan checkout','Order matches checkout'),t('Edit produk yang benar','Edit the correct product'),t('Tambah/hapus produk, baca ulang; uji pembatalan delete','Add/delete products, reread; test cancelling deletion'),t('Ongkir 0/30, total tersimpan, dan reset checkout','Shipping 0/30, saved total, and checkout reset'),t('Navigasi di layar kecil','Small-screen navigation')].map(name=>'| '+name+' | | | | |').join('\n')));
}
function briefMarkdown(lesson,includeKeys=false) {
  const wka=BCW[lesson.bcw];
  let text='# '+t('Pertemuan ','Lesson ')+lesson.id+': '+tx(lesson.title)+'\n\n'+t('Rencana: 90 menit.','Plan: 90 minutes.')+'\n\n## Main goal\n\n'+tx(lesson.goal)+'\n\n## '+t('Ringkasan materi','Material summary')+'\n\n'+tx(lesson.material)+'\n\n## BSD\n\n'+lesson.bsd.map(name=>'- '+name).join('\n')+'\n\n## '+t('Tugas','Tasks')+'\n\n'+lesson.tasks.map(item=>'- '+tx(item)).join('\n')+'\n\n## '+t('Kriteria keberhasilan','Success criteria')+'\n\n'+lesson.success.map(item=>'- '+tx(item)).join('\n')+'\n\n## '+t('WKA','Biblical Christian Worldview')+'\n\n'+tx(wka.principle)+' '+tx(wka.reference)+'\n'+tx(wka.url)+'\n\n'+tx(lesson.practice)+'\n\n## '+t('Pengantar guru','Teacher introduction')+'\n\n'+teacherScript(lesson)+'\n\n## '+t('Pertanyaan pembuka','Opening discussion')+'\n\n'+tx(lesson.opening)+'\n\n## Exit ticket\n\n'+tx(lesson.exit)+'\n';
  text+='\n## '+t('Fokus sumber BSD','BSD source focuses')+'\n\n'+lesson.sourceFocus.map(f=>'- '+f.source.title+' · '+stepLabel(f.source)+': '+tx(f.focus)).join('\n')+'\n';
  if(includeKeys)for(const kind of ['pre','post'])text+='\n## '+(kind==='pre'?t('Diagnostik','Diagnostic'):t('Latihan','Practice'))+'\n\n'+lesson[kind].map(question=>tx(question.stem)+'\n'+question.options.map((option,index)=>'- '+String.fromCharCode(65+index)+'. '+tx(option)).join('\n')+'\n'+(question.source?question.source.title+' · '+stepLabel(question.source):t('Cek/penerapan guru','Teacher check/application'))+'\n'+t('Jawaban: ','Answer: ')+String.fromCharCode(65+question.answer)+'. '+tx(question.explanation)).join('\n\n')+'\n';
  return text;
}
function renderTeacher() {
  if(!teacherMode()){main.innerHTML='<section class="panel"><h1>'+t('Panduan guru','Teacher guide')+'</h1><p>'+t('Buka mode review dari dashboard guru terverifikasi.','Open review from a verified teacher dashboard.')+'</p><a class="btn" href="#home">'+t('Kembali ke materi','Return to lessons')+'</a></section>';return;}
  main.innerHTML='<p class="eyebrow">CS.REPORT · '+t('REVIEW GURU','TEACHER REVIEW')+'</p><h1>'+t('Arahkan proses belajarnya.','Guide the learning process.')+'</h1>'+auditHTML()+'<section class="panel"><h2>'+t('Rencana dan peran guru','Schedule and teacher role')+'</h2><p>'+esc(tx(COURSE.timing))+'</p><p>'+t('Sembilan kategori BSD tidak sama dengan sembilan pertemuan. E-commerce memiliki 10 proyek dan 379 langkah. Alokasi lama CS.Report 38 JP / 19 pertemuan belum menyediakan slot tersendiri untuk Assignment 1 mandiri, Application Challenge, serta revisi dan demonstrasi sumatif.','Nine BSD categories do not equal nine lessons. E-commerce has 10 projects and 379 steps. The existing CS.Report allocation of 38 periods / 19 meetings does not provide separate slots for independent Assignment 1, the Application Challenge, and summative revision/demonstration.')+'</p>'+list([B('Mulai dengan diagnostik; jika siswa belum bisa memodifikasi kode review, tambah dukungan sebelum database.|Begin with diagnostics; if students cannot modify review code, add support before database work.'),B('Modelkan satu konsep sulit, tanyakan sebab-akibat kode, dan bantu siswa menelusuri error.|Model one difficult concept, ask about code cause and effect, and help students trace errors.'),B('Berikan masukan pada checkpoint; minta bukti revisi, bukan hanya tanda selesai BSD.|Give checkpoint feedback; request revision evidence rather than only BSD completion.'),B('Jika Application Challenge atau debugging cart membutuhkan waktu lebih, tambahkan workshop; jangan mengurangi demonstrasi pemahaman individual.|If the Application Challenge or cart debugging needs more time, add a workshop; retain individual understanding demonstrations.')])+'<p class="timing">'+t('Course 3 adalah nomor course BSD. Materi ini berada di Grade 12 Q2 dalam konfigurasi buku nilai saat ini; Q3 tetap materi robotika.','Course 3 is a BSD course number. This material is in Grade 12 Q2 in the current gradebook configuration; Q3 remains robotics.')+'</p>'+agenda()+'<div class="actions"><button class="btn" id="download-all">'+t('Unduh 26 brief & kunci kuis','Download 26 briefs & quiz keys')+'</button><button class="btn secondary" id="export-notes">'+t('Unduh catatan review','Download review notes')+'</button></div></section><section class="panel"><h2>'+t('Agenda dan bukti tiap pertemuan','Lesson agenda and evidence')+'</h2><div class="table-wrap"><table><thead><tr><th>#</th><th>'+t('Materi','Topic')+'</th><th>'+t('Bukti yang diperiksa','Evidence to check')+'</th><th>'+t('Brief','Brief')+'</th></tr></thead><tbody>'+LESSONS.map(lesson=>'<tr><td>'+lesson.id+'</td><td>'+esc(tx(lesson.title))+'</td><td>'+esc(tx(lesson.success[0]))+'</td><td><a href="#lesson/'+lesson.id+'">'+t('Buka','Open')+' →</a></td></tr>').join('')+'</tbody></table></div></section><section class="panel"><h2>'+t('Asesmen formatif hingga sumatif','Assessment from formative to summative')+'</h2><p>'+t('Gunakan diagnostik untuk menentukan bantuan. Nilai formatif menggunakan karya, modifikasi mandiri, penjelasan, dan uji. Sumatif menggunakan rubrik proyek akhir dan penjelasan individual. Nilai resmi tetap diinput melalui buku nilai yang sudah ada.','Use diagnostics to decide support. Formative assessment uses products, independent modifications, explanations, and tests. Summative assessment uses the final-project rubric and individual explanation. Record official grades through the existing gradebook.')+'</p><a class="btn secondary" href="#project">'+t('Lihat checklist & rubrik','View checklists & rubric')+'</a><details><summary>'+t('Lihat seluruh kunci dan pembahasan','View all answers and explanations')+'</summary>'+LESSONS.map(lesson=>'<div class="keys"><h3>'+lesson.id+'. '+esc(tx(lesson.title))+'</h3>'+[...lesson.pre,...lesson.post].map(question=>'<p><b>'+esc(tx(question.stem))+'</b><br>'+t('Jawaban: ','Answer: ')+esc(tx(question.options[question.answer]))+'<br>'+esc(tx(question.explanation))+'</p>').join('')+'</div>').join('')+'</details></section>';
  document.getElementById('download-all').addEventListener('click',()=>download('grade12-course3-briefs-'+language+'.md','# Grade 12 · '+COURSE.title+'\n\n'+tx(COURSE.timing)+'\n\n'+LESSONS.map(lesson=>briefMarkdown(lesson,true)).join('\n\n---\n\n')));
  document.getElementById('export-notes').addEventListener('click',exportNotes);
}
function download(filename,text) {
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})),anchor=document.createElement('a');
  anchor.href=url;anchor.download=filename;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function exportNotes() {
  const text='# '+t('Catatan latihan Grade 12','Grade 12 practice notes')+'\n\n'+t('Siswa: ','Student: ')+g12Session.name+'\n'+t('Kelas: ','Class: ')+g12Session.className+'\n\n'+LESSONS.map(lesson=>{const record=lessonRecord(lesson.id);return '## '+lesson.id+'. '+tx(lesson.title)+'\n\n'+t('Diskusi awal: ','Opening discussion: ')+(record.openingResponse||'')+'\n\n'+t('Tautan: ','Link: ')+(record.link||'')+'\n\n'+t('Catatan: ','Notes: ')+(record.notes||'')+'\n\n'+t('Pengujian: ','Testing: ')+(record.tests||'')+'\n\nExit ticket: '+(record.exit||'')+'\n\n'+t('Diagnostik pertama: ','First diagnostic: ')+(record.pre?.first?.score??'—')+'/1; '+t('Latihan terbaik: ','Best practice: ')+(record.post?.best??'—')+'/'+lesson.post.length+'; '+t('Selesai: ','Complete: ')+(record.complete?t('Ya','Yes'):t('Belum','Not yet'))+(record.previousPractice?'\n'+t('Arsip bank lama v1 (maksimum latihan 2): ','Archived v1 bank (practice maximum 2): ')+JSON.stringify(record.previousPractice):'');}).join('\n\n');
  download('grade12-course3-my-notes-'+language+'.md',text);
}
function route() {
  const hash=location.hash||'#home',match=/^#(?:lesson|brief)\/(\d+)$/.exec(hash),lesson=match?LESSONS.find(item=>item.id===Number(match[1])):null;
  const routeName=lesson?'home':hash==='#project'?'project':hash==='#teacher'?'teacher':'home';
  document.querySelectorAll('[data-nav]').forEach(link=>{link.classList.toggle('active',link.dataset.nav===routeName);if(link.dataset.nav===routeName)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  if(lesson)renderLesson(lesson);else if(routeName==='project')renderProject();else if(routeName==='teacher')renderTeacher();else renderHome();
  document.title=(lesson?tx(lesson.title):'Sustainable Web Studio')+' · Grade 12 · CS.Report';
}
document.getElementById('language').addEventListener('change',event=>{
  language=event.target.value==='en'?'en':'id';try{localStorage.setItem(LANGUAGE_KEY,language);}catch{}
  localizeShell();
  if(g12Session){document.getElementById('learner-class').textContent=g12Session.isTeacherPreview?t('Review guru · Kelas 12','Teacher review · Grade 12'):t('Kelas ','Class ')+g12Session.className;updatePreviewBanner();route();}
  // Keep the selected language in shareable links without reloading or losing drafts.
  const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url.href);
});
function updatePreviewBanner() {
  const banner=document.getElementById('review-banner');banner.hidden=!teacherMode();
  banner.textContent=g12Session?.isTeacherPreview?t('Review guru. Catatan ini terpisah dari siswa; nilai resmi tidak diubah.','Teacher review. These notes are separate from student notes; official grades are unchanged.'):t('Pratinjau lokal dengan siswa uji. Tidak menggunakan data siswa nyata.','Local preview with a test student. No real student data is used.');
}
localizeShell();
document.getElementById('skip-link').addEventListener('click',event=>{
  event.preventDefault();main.focus({preventScroll:true});main.scrollIntoView({block:'start'});
});
(async()=>{
  if(!(await initializeG12Access()))return;
  loadPractice();document.getElementById('teacher-nav').hidden=!teacherMode();updatePreviewBanner();route();
  window.addEventListener('hashchange',()=>{tab='brief';route();window.scrollTo(0,0);main.focus({preventScroll:true});});
})().catch(()=>{document.getElementById('learning-app').hidden=true;document.getElementById('access-gate').hidden=false;document.getElementById('gate-copy').textContent=t('Materi gagal dimuat. Muat ulang atau kembali ke CS.Report.','Materials could not load. Refresh or return to CS.Report.');});
