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
        toast(t('Kuis diperbarui. Catatan lama tetap ada; hasil kuis lama diarsipkan. Gunakan panduan baru untuk mencatat hasil, refleksi, dan modifikasi.','Quizzes updated. Notes are retained; old quiz results are archived. Use the new guide to record outcomes, reflection, and modifications.'));
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
  return '<div class="agenda">'+[[t('Tujuan & prediksi','Goal & prediction'),8],[t('Demo konsep BSD','BSD concept demo'),12],[t('Praktik BSD','BSD practice'),40],[t('Modifikasi & uji','Modify & test'),20],[t('Hasil & refleksi','Outcome & reflection'),10]].map(([name,time])=>'<span>'+esc(name)+' · '+time+' '+t('mnt','min')+'</span>').join('')+'</div>';
}
function teacherScript(lesson) {
  const guide=lesson.guide;
  return t('Hari ini di BSD: ','Today in BSD: ')+tx(guide.learn)+' '+t('Di akhir kelas, tunjukkan: ','By the end, show: ')+tx(guide.results[0])+' '+t('Setelah praktik, modifikasikan: ','After practice, modify: ')+tx(guide.challenge.task)+' '+t('Untuk refleksi, jelaskan: ','For reflection, explain: ')+tx(guide.reflections[0]);
}
function homeCards() {
  const matches = LESSONS.filter(lesson => (stageFilter < 0 || lesson.stage === stageFilter) && (tx(lesson.title)+' '+lesson.bsd.join(' ')+' '+tx(lesson.goal)).toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  return matches.length ? matches.map(lesson=>{
    const record=lessonRecord(lesson.id), done=isLessonComplete(lesson.id);
    return '<a class="lesson-card" href="#lesson/'+lesson.id+'"><div class="card-top"><b>'+String(lesson.id).padStart(2,'0')+'</b><small>'+esc(tx(STAGES[lesson.stage]))+'</small></div><div class="card-body"><h3>'+esc(tx(lesson.title))+'</h3><p>'+esc(tx(lesson.guide.learn))+'</p></div><div class="card-bottom"><span>'+t('90 menit','90 minutes')+' · '+(done?t('Selesai ✓','Complete ✓'):t('Buka panduan','Open guide'))+'</span><span>→</span></div></a>';
  }).join('') : '<p class="empty">'+t('Tidak ada pertemuan yang cocok.','No matching lessons.')+'</p>';
}
function renderHome() {
  const done=LESSONS.filter(lesson=>isLessonComplete(lesson.id)).length;
  main.innerHTML = '<section class="hero"><div><p class="eyebrow">BSD CONNECT2WORK · COURSE 3</p><h1>'+t('Hari ini di BSD.<br><em>Belajar, ubah, jelaskan.</em>','Today in BSD.<br><em>Learn, modify, explain.</em>')+'</h1><p class="lead">'+esc(tx(COURSE.overview))+'</p><div class="actions"><a class="btn" href="#lesson/'+(LESSONS.find(l=>!isLessonComplete(l.id))?.id||1)+'">'+t('Lanjut belajar →','Continue learning →')+'</a><a class="btn secondary" href="#project">'+t('Lihat tugas akhir','View final task')+'</a></div></div><div class="journey"><p class="eyebrow">EXPLORE · BUILD · TEST · EXPLAIN</p><h2>'+t('Dari kebutuhan ke karya','From a need to a product')+'</h2>'+[[t('Website organisasi','Organization website'),'01'],[t('Berita dari database','News from a database'),'02'],[t('Toko & pengelolaan pesanan','Store & order management'),'03']].map(([name,num])=>'<div class="journey-row"><span>'+name+'</span><b>ASSIGNMENT '+num+'</b></div>').join('')+'<p>'+t('26 panduan · materi BSD, hasil, refleksi, modifikasi · ID / EN','26 guides · BSD learning, outcomes, reflection, modification · ID / EN')+'</p></div></section><section class="progress-strip" aria-label="'+t('Progres belajar','Learning progress')+'"><b>'+done+' / 26 '+t('selesai','complete')+'</b><div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="26" aria-valuenow="'+done+'"><span style="width:'+done/26*100+'%"></span></div><small>'+t('Latihan pribadi · bukan nilai rapor','Personal practice · separate from report grades')+'</small></section><section class="panel overview"><p class="eyebrow">'+t('Tujuan utama','Main goal')+'</p><div class="goal"><p>'+esc(tx(COURSE.goal))+'</p></div><h3>'+t('Yang diharapkan dari kamu','What is expected of you')+'</h3>'+list(COURSE.outcomes)+'<p class="timing">'+esc(tx(COURSE.timing))+'</p></section><div class="section-top"><h2>'+t('Peta pertemuan','Lesson map')+'</h2><input id="lesson-search" class="search" type="search" aria-label="'+t('Cari materi','Search lessons')+'" placeholder="'+t('Cari materi atau proyek BSD…','Search lessons or BSD projects…')+'" value="'+esc(searchText)+'"></div><div class="filters"><button class="filter" data-stage="-1" aria-pressed="'+(stageFilter===-1)+'">'+t('Semua','All')+'</button>'+STAGES.map((stage,i)=>'<button class="filter" data-stage="'+i+'" aria-pressed="'+(stageFilter===i)+'">'+esc(tx(stage))+'</button>').join('')+'</div><div class="lesson-grid" id="lesson-grid">'+homeCards()+'</div>';
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
  const guide=lesson.guide,wka=BCW[lesson.bcw];
  const activities=lesson.bsd.filter(name=>!/^Class Notes|Additional practice|Check your understanding|Review of HTML/.test(name));
  return '<section class="panel daily-guide"><p class="eyebrow">'+t('Panduan belajar hari ini','Today’s learning guide')+'</p><p class="daily-goal"><b>'+t('Tujuan: ','Goal: ')+'</b>'+esc(tx(lesson.goal))+'</p><section class="guide-block" aria-labelledby="guide-learn"><span class="step-number">01</span><div><h2 id="guide-learn">'+t('Hari ini belajar apa?','What are we learning today?')+'</h2><p>'+esc(tx(guide.learn))+'</p><div class="bsd-route"><b>'+t('Buka di course BSD:','Open in your BSD course:')+'</b><ol>'+activities.map(name=>'<li>'+esc(name)+'</li>').join('')+'</ol><a class="btn secondary" href="https://app.bsd.education/" target="_blank" rel="noopener noreferrer">'+t('Buka BSD ↗','Open BSD ↗')+'</a></div></div></section><section class="guide-block" aria-labelledby="guide-result"><span class="step-number">02</span><div><h2 id="guide-result">'+t('Hasil yang perlu ditunjukkan','What to show by the end')+'</h2>'+list(guide.results)+'<p class="guide-proof">'+t('Tunjukkan karya yang berjalan dan jelaskan bagian kode yang membuatnya bekerja. Simpan tautan serta hasil uji.','Show your working product and explain the code that makes it work. Save its link and test results.')+'</p></div></section><section class="guide-block" aria-labelledby="guide-reflect"><span class="step-number">03</span><div><h2 id="guide-reflect">'+t('Refleksi setelah praktik','Reflect after practice')+'</h2>'+list(guide.reflections)+'<p class="muted">'+t('Gunakan contoh dari kodemu: pemahaman awal → yang kamu temukan → bukti hasilnya.','Use an example from your code: initial understanding → what you discovered → evidence of the result.')+'</p></div></section><section class="guide-block challenge-block" aria-labelledby="guide-challenge"><span class="step-number">04</span><div><p class="eyebrow">'+t('Tantangan guru · setelah praktik BSD','Teacher challenge · after BSD practice')+'</p><h2 id="guide-challenge">'+t('Tantangan modifikasi','Modification challenge')+'</h2><p>'+esc(tx(guide.challenge.task))+'</p><div class="challenge-check"><b>'+t('Cara mengecek hasilnya','How to check the result')+'</b><p>'+esc(tx(guide.challenge.check))+'</p></div><p class="muted">'+t('Tantangan ini menerapkan konsep BSD hari ini. Catat bagian yang kamu ubah dan hasilnya.','This challenge applies today’s BSD concepts. Record what you changed and its result.')+'</p></div></section><div class="actions"><button class="btn" data-tab="evidence">'+t('Catat hasil, refleksi & modifikasi →','Record outcome, reflection & modification →')+'</button><button class="btn secondary" id="download-brief">'+t('Unduh panduan','Download guide')+'</button><button class="btn secondary" id="print-brief">'+t('Cetak','Print')+'</button></div></section><section class="panel"><h2>'+t('Alur kelas','Class flow')+'</h2>'+agenda()+'<details><summary>'+t('Pengantar singkat untuk guru','Short teacher introduction')+'</summary><div class="script"><p>'+esc(teacherScript(lesson))+'</p></div></details><details><summary>'+t('Ringkasan konsep & rujukan BSD','Concept summary & BSD references')+'</summary><p>'+esc(tx(lesson.material))+'</p>'+sourceHTML(lesson)+'</details><details><summary>'+t('WKA · hubungan dengan sikap dan tanggung jawab','BCW · attitude and responsibility')+'</summary><div class="bcw"><h3>'+esc(tx(wka.principle))+'</h3><p><a href="'+esc(tx(wka.url))+'" target="_blank" rel="noopener noreferrer">'+esc(tx(wka.reference))+' ↗</a></p><p>'+esc(tx(lesson.practice))+'</p></div></details><div class="actions"><button class="btn secondary" data-tab="practice">'+t('Pertanyaan awal & kuis pendamping','Opening questions & companion quiz')+'</button></div></section>';
}
function quizHTML(lesson,kind) {
  const record=lessonRecord(lesson.id), questions=lesson[kind], saved=record[kind]?.last;
  const answers=saved?.answers || record['draft'+kind] || [];
  return '<form id="quiz-'+kind+'" data-kind="'+kind+'">'+questions.map((question,index)=>'<fieldset class="question"><legend>'+(index+1)+'. '+esc(tx(question.stem))+'</legend>'+questionOriginHTML(question)+question.options.map((option,choice)=>'<label class="option"><input type="radio" name="'+kind+'-'+index+'" value="'+choice+'" '+(answers[index]===choice?'checked ':'')+(saved?'disabled':'')+' required><span>'+esc(tx(option))+'</span></label>').join('')+(saved?'<div class="feedback '+(Number(saved.answers?.[index])===question.answer?'':'wrong')+'"><b>'+t('Jawaban: ','Answer: ')+esc(tx(question.options[question.answer]))+'</b><br>'+esc(tx(question.explanation))+'</div>':'')+'</fieldset>').join('')+(saved?'<p class="quiz-score" role="status">'+t('Hasil percobaan: ','Attempt result: ')+Number(saved.score)+' / '+questions.length+'</p><p class="saved-state">'+(kind==='pre'?t('Diagnostik pertama: ','First diagnostic: ')+Number(record.pre.first.score)+' / '+questions.length+t(' · Tetap tersimpan saat mencoba ulang.',' · Preserved when you retry.'):t('Skor latihan terbaik: ','Best practice score: ')+Number(record.post.best)+' / '+questions.length)+t(' · Tidak masuk nilai rapor.',' · Does not enter report grades.')+'</p><button type="button" class="btn secondary retry" data-kind="'+kind+'">'+t('Coba lagi','Try again')+'</button>':'<button class="btn" type="submit">'+t('Periksa jawaban','Check answers')+'</button>')+'</form>';
}
function practiceHTML(lesson) {
  return (lessonRecord(lesson.id).previousPractice?'<p class="notice">'+t('Bank kuis sudah diperbarui. Catatan dan hasil lama tetap tersimpan sebagai arsip; kuis memakai bank baru; tanda selesai mengikuti bukti panduan harian.','The quiz bank has been updated. Notes and old results remain archived; quizzes use the new bank; completion follows daily-guide evidence.')+'</p>':'')+'<section class="panel"><p class="eyebrow">'+t('Sebelum belajar','Before learning')+'</p><h2>'+t('Pertanyaan pembuka','Opening questions')+'</h2><p class="opening">'+esc(tx(lesson.opening))+'</p><label class="field">'+t('Jawaban diskusi awalmu','Your opening discussion response')+'<textarea data-field="openingResponse" placeholder="'+t('Tulis ide awal sebelum praktik…','Write your initial idea before practice…')+'">'+esc(lessonRecord(lesson.id).openingResponse||'')+'</textarea></label>'+quizHTML(lesson,'pre')+'</section><section class="panel"><p class="eyebrow">'+t('Setelah BSD & penerapan','After BSD & application')+'</p><h2>'+t('Kuis latihan dengan pembahasan','Practice quiz with explanations')+'</h2><p class="muted">'+t('Kerjakan setelah praktik. Gunakan pembahasan untuk memperbaiki pemahaman, lalu coba ulang bila perlu.','Complete this after practice. Use explanations to improve understanding, then retry if needed.')+'</p>'+quizHTML(lesson,'post')+'</section>';
}
function evidenceHTML(lesson) {
  const record=lessonRecord(lesson.id),link=safeWorkLink(record.link),guide=lesson.guide;
  return '<section class="panel"><p class="eyebrow">'+t('Hasil · refleksi · modifikasi','Outcome · reflection · modification')+'</p><h2>'+t('Ceritakan apa yang kamu kerjakan','Explain what you worked on')+'</h2>'+list(guide.results)+'<p class="timing">'+t('Catatan tersimpan pada browser ini. Untuk pengumpulan resmi, ikuti arahan guru.','Notes are saved on this browser. Follow teacher instructions for official submission.')+'</p><label class="field">'+t('Tautan hasil / sandbox (http atau https)','Work / sandbox link (http or https)')+'<input data-field="link" type="url" value="'+esc(record.link||'')+'" placeholder="https://app.bsd.education/…"></label>'+(link?'<a href="'+esc(link)+'" target="_blank" rel="noopener noreferrer">'+t('Buka hasil ↗','Open work ↗')+'</a>':'')+'<label class="field">'+t('Hasil praktik: apa yang sudah bekerja?','Practice outcome: what works?')+'<textarea data-field="outcome" placeholder="'+t('Jelaskan hasil yang dapat kamu demonstrasikan.','Describe the result you can demonstrate.')+'">'+esc(record.outcome||'')+'</textarea></label><h3>'+t('Refleksi belajar','Learning reflection')+'</h3>'+list(guide.reflections)+'<label class="field">'+t('Refleksiku: pemahaman, bukti, dan bagian yang masih sulit','My reflection: understanding, evidence, and remaining difficulty')+'<textarea data-field="learningReflection">'+esc(record.learningReflection||'')+'</textarea></label><h3>'+t('Modifikasi yang dicoba','Modification attempted')+'</h3><p>'+esc(tx(guide.challenge.task))+'</p><label class="field">'+t('Bagian kode yang diubah, alasannya, dan hasilnya','Code changed, why, and the result')+'<textarea data-field="challengeNotes">'+esc(record.challengeNotes||'')+'</textarea></label><p class="guide-proof"><b>'+t('Uji dengan: ','Test using: ')+'</b>'+esc(tx(guide.challenge.check))+'</p><label class="field">'+t('Log uji: harapan → hasil aktual → perbaikan / uji ulang','Test log: expected → actual → fix / retest')+'<textarea data-field="tests">'+esc(record.tests||'')+'</textarea></label><details><summary>'+t('Catatan tambahan & refleksi sebelumnya','Extra notes & previous reflection')+'</summary><label class="field">'+t('Catatan kode, sumber, dan kontribusi','Code, sources, and contribution notes')+'<textarea data-field="notes">'+esc(record.notes||'')+'</textarea></label><label class="field">'+esc(tx(lesson.exit))+'<textarea data-field="exit">'+esc(record.exit||'')+'</textarea></label></details><p class="saved-state" id="save-status" role="status">'+t('Tersimpan otomatis saat mengetik.','Saved automatically as you type.')+'</p><label class="complete"><input type="checkbox" id="complete-lesson" '+(isLessonComplete(lesson.id)?'checked':'')+'><span>'+t('Tandai selesai setelah ada tautan hasil, hasil praktik, refleksi belajar, dan catatan modifikasi. Guru memeriksa bukti serta penjelasanmu.','Mark complete after adding a work link, practice outcome, learning reflection, and modification notes. Your teacher checks the evidence and explanation.')+'</span></label><div class="actions"><button class="btn secondary" id="export-notes">'+t('Unduh catatan saya','Download my notes')+'</button></div></section>';
}
function hasGuideEvidence(record) {
  return Boolean(safeWorkLink(record.link) && ['outcome','learningReflection','challengeNotes'].every(field=>String(record[field]||'').trim()));
}
function isLessonComplete(id) { const record=lessonRecord(id);return record.complete===true && hasGuideEvidence(record); }

function renderLesson(lesson) {
  const tabNames={brief:t('Panduan hari ini','Today’s guide'),practice:t('Pertanyaan & kuis','Questions & quiz'),evidence:t('Hasil & refleksi','Outcome & reflection')};
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
    if(!hasGuideEvidence(record)){record.complete=false;const box=document.getElementById('complete-lesson');if(box)box.checked=false;}
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
    if(event.target.checked&&!hasGuideEvidence(record)){event.target.checked=false;toast(t('Tambahkan tautan valid, hasil praktik, refleksi belajar, dan catatan modifikasi dahulu.','Add a valid work link, practice outcome, learning reflection, and modification notes first.'));return;}
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
  const guide=lesson.guide,wka=BCW[lesson.bcw];
  let text='# '+t('Pertemuan ','Lesson ')+lesson.id+': '+tx(lesson.title)+'\n\n'+t('Tujuan: ','Goal: ')+tx(lesson.goal)+'\n\n## '+t('1. Hari ini belajar apa?','1. What are we learning today?')+'\n\n'+tx(guide.learn)+'\n\n'+t('Aktivitas BSD:','BSD activities:')+'\n'+lesson.bsd.filter(name=>!/^Class Notes|Additional practice|Check your understanding|Review of HTML/.test(name)).map(name=>'- '+name).join('\n')+'\n\n## '+t('2. Hasil yang perlu ditunjukkan','2. What to show by the end')+'\n\n'+guide.results.map(item=>'- '+tx(item)).join('\n')+'\n\n## '+t('3. Refleksi setelah praktik','3. Reflect after practice')+'\n\n'+guide.reflections.map(item=>'- '+tx(item)).join('\n')+'\n\n## '+t('4. Tantangan modifikasi','4. Modification challenge')+'\n\n'+tx(guide.challenge.task)+'\n\n'+t('Cara mengecek: ','How to check: ')+tx(guide.challenge.check)+'\n\n'+t('Tantangan kelas disusun guru berdasarkan konsep BSD.','Classroom challenge written by the teacher using BSD concepts.')+'\n\n## '+t('Alur kelas (90 menit)','Class flow (90 minutes)')+'\n\n'+t('Tujuan/prediksi 8; demo konsep 12; praktik BSD 40; modifikasi/uji 20; hasil/refleksi 10 menit.','Goal/prediction 8; concept demo 12; BSD practice 40; modification/testing 20; outcome/reflection 10 minutes.')+'\n\n## '+t('Pengantar guru','Teacher introduction')+'\n\n'+teacherScript(lesson)+'\n\n## '+t('WKA','Biblical Christian Worldview')+'\n\n'+tx(wka.principle)+' '+tx(wka.reference)+'\n'+tx(lesson.practice)+'\n\n## '+t('Konsep dan sumber BSD','BSD concepts and sources')+'\n\n'+tx(lesson.material)+'\n\n'+lesson.sourceFocus.map(f=>'- '+f.source.title+' · '+stepLabel(f.source)+': '+tx(f.focus)).join('\n')+'\n';
  if(includeKeys)for(const kind of ['pre','post'])text+='\n## '+(kind==='pre'?t('Diagnostik pendamping','Companion diagnostic'):t('Kuis pendamping','Companion quiz'))+'\n\n'+lesson[kind].map(question=>tx(question.stem)+'\n'+question.options.map((option,index)=>'- '+String.fromCharCode(65+index)+'. '+tx(option)).join('\n')+'\n'+t('Jawaban: ','Answer: ')+String.fromCharCode(65+question.answer)+'. '+tx(question.explanation)).join('\n\n')+'\n';
  return text;
}
function teacherGuideHTML() {
  return '<section class="panel"><h2>'+t('Peta panduan setiap pertemuan','Daily classroom guide map')+'</h2><div class="table-wrap"><table><thead><tr><th>#</th><th>'+t('Hari ini belajar','Today’s learning')+'</th><th>'+t('Hasil','Outcome')+'</th><th>'+t('Refleksi','Reflection')+'</th><th>'+t('Modifikasi','Modification')+'</th></tr></thead><tbody>'+LESSONS.map(l=>'<tr><td><a href="#lesson/'+l.id+'">'+l.id+'</a></td><td>'+esc(tx(l.guide.learn))+'</td><td>'+esc(tx(l.guide.results[0]))+'</td><td>'+esc(tx(l.guide.reflections[0]))+'</td><td>'+esc(tx(l.guide.challenge.task))+'</td></tr>').join('')+'</tbody></table></div></section>';
}
function renderTeacher() {
  if(!teacherMode()){main.innerHTML='<section class="panel"><h1>'+t('Panduan guru','Teacher guide')+'</h1><p>'+t('Buka mode review dari dashboard guru terverifikasi.','Open review from a verified teacher dashboard.')+'</p><a class="btn" href="#home">'+t('Kembali ke materi','Return to lessons')+'</a></section>';return;}
  main.innerHTML='<p class="eyebrow">BSD COURSE 3 · '+t('PANDUAN KELAS','CLASSROOM GUIDE')+'</p><h1>'+t('Belajar, modifikasi, dan jelaskan.','Learn, modify, and explain.')+'</h1><section class="panel"><h2>'+t('Peran guru hari ini','Today’s teacher role')+'</h2>'+list([B('Sebelum praktik: sebutkan proyek BSD dan tujuan, tunjukkan contoh hasil, lalu minta prediksi siswa.|Before practice: name the BSD project and goal, show the expected result, and ask for predictions.'),B('Saat praktik: modelkan satu konsep penting. Minta siswa menelusuri input, baris kode, dan output ketika mereka membutuhkan bantuan.|During practice: model one key concept. When learners need help, ask them to trace input, code, and output.'),B('Setelah praktik: berikan tantangan modifikasi yang sesuai panduan. Minta bukti perubahan dan hasil uji, bukan hanya tanda selesai.|After practice: use the guide’s modification challenge. Request evidence of the change and its test result, beyond a completion tick.'),B('Penutup: minta refleksi dengan contoh dari kode. Periksa hasil, alasan perubahan, dan konsep yang masih sulit.|Closing: request reflection with a code example. Check outcomes, reasons for changes, and concepts still difficult.')])+'<p class="muted">'+t('Refleksi dan tantangan adalah rancangan guru dari konsep BSD. Bantu siswa yang belum siap dengan satu perubahan kecil yang bisa diuji dan dijelaskan.','Reflections and challenges are teacher-designed using BSD concepts. Scaffold a small, testable, explainable change for learners who need support.')+'</p>'+agenda()+'<div class="actions"><button class="btn" id="download-all">'+t('Unduh 26 panduan & kunci kuis','Download 26 guides & quiz keys')+'</button><button class="btn secondary" id="export-notes">'+t('Unduh catatan review','Download review notes')+'</button><a class="btn secondary" href="#project">'+t('Tugas & rubrik penilaian','Tasks & assessment rubric')+'</a></div></section>'+teacherGuideHTML()+'<details class="panel"><summary>'+t('Rencana waktu dan penilaian','Timing and assessment plan')+'</summary><p>'+esc(tx(COURSE.timing))+'</p><p>'+t('Gunakan hasil karya, modifikasi, penjelasan, dan uji untuk checkpoint formatif. Sumatif memakai karya terintegrasi serta penjelasan individual sesuai rubrik. Course 3 berada di kelas 12 Q2 pada konfigurasi buku nilai; nilai resmi dicatat melalui CS.Report.','Use products, modifications, explanations, and tests for formative checkpoints. Summative assessment uses integrated work and individual explanations against the rubric. Course 3 is in Grade 12 Q2 in the gradebook configuration; official grades are recorded through CS.Report.')+'</p></details><details class="panel"><summary>'+t('Rincian sumber dan cakupan kuis','Source details and quiz review scope')+'</summary>'+auditHTML()+'</details><details class="panel"><summary>'+t('Kunci kuis pendamping','Companion quiz keys')+'</summary>'+LESSONS.map(l=>'<div class="keys"><h3>'+l.id+'. '+esc(tx(l.title))+'</h3>'+[...l.pre,...l.post].map(q=>'<p><b>'+esc(tx(q.stem))+'</b><br>'+t('Jawaban: ','Answer: ')+esc(tx(q.options[q.answer]))+'<br>'+esc(tx(q.explanation))+'</p>').join('')+'</div>').join('')+'</details>';
  document.getElementById('download-all').addEventListener('click',()=>download('grade12-course3-guides-'+language+'.md','# Grade 12 · '+COURSE.title+'\n\n'+LESSONS.map(l=>briefMarkdown(l,true)).join('\n\n---\n\n')));
  document.getElementById('export-notes').addEventListener('click',exportNotes);
}
function download(filename,text) {
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})),anchor=document.createElement('a');
  anchor.href=url;anchor.download=filename;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function exportNotes() {
  const text='# '+t('Catatan latihan Grade 12','Grade 12 practice notes')+'\n\n'+t('Siswa: ','Student: ')+g12Session.name+'\n'+t('Kelas: ','Class: ')+g12Session.className+'\n\n'+LESSONS.map(lesson=>{const record=lessonRecord(lesson.id);return '## '+lesson.id+'. '+tx(lesson.title)+'\n\n'+t('Hasil praktik: ','Practice outcome: ')+(record.outcome||'')+'\n\n'+t('Refleksi belajar: ','Learning reflection: ')+(record.learningReflection||'')+'\n\n'+t('Modifikasi: ','Modification: ')+(record.challengeNotes||'')+'\n\n'+t('Diskusi awal: ','Opening discussion: ')+(record.openingResponse||'')+'\n\n'+t('Tautan: ','Link: ')+(record.link||'')+'\n\n'+t('Catatan: ','Notes: ')+(record.notes||'')+'\n\n'+t('Pengujian: ','Testing: ')+(record.tests||'')+'\n\nExit ticket: '+(record.exit||'')+'\n\n'+t('Diagnostik pertama: ','First diagnostic: ')+(record.pre?.first?.score??'—')+'/1; '+t('Latihan terbaik: ','Best practice: ')+(record.post?.best??'—')+'/'+lesson.post.length+'; '+t('Selesai: ','Complete: ')+(isLessonComplete(lesson.id)?t('Ya','Yes'):t('Belum','Not yet'))+(record.previousPractice?'\n'+t('Arsip bank lama v1 (maksimum latihan 2): ','Archived v1 bank (practice maximum 2): ')+JSON.stringify(record.previousPractice):'');}).join('\n\n');
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
