'use strict';
// Active class timetable: 18 meetings. Earlier guide IDs remain source units for migration.
const SOURCE_UNITS=LESSONS.slice();
const MEETING_GROUPS=[[1],[2,3],[4,5],[6,7],[8,9],[10,11],[12,13],[14,15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25,26]];
const LEGACY_UNIT_TO_MEETING=Object.fromEntries(MEETING_GROUPS.flatMap((ids,index)=>ids.map(id=>[id,index+1])));
function mergeMeeting(ids,index){
  const units=ids.map(id=>SOURCE_UNITS.find(l=>l.id===id)),base=units[0];
  const sources=[...new Map(units.flatMap(l=>l.sourceFocus).map(f=>[JSON.stringify(f.source),f])).values()];
  return {...base,id:index+1,unitIds:ids.slice(),bsd:[...new Set(units.flatMap(l=>l.bsd))],sourceFocus:sources,
    pre:units.flatMap(l=>l.pre),post:units.flatMap(l=>l.post),guide:{...base.guide},type:'coding',
    material:units.length===1?base.material:[0,1].map(lang=>units.map(l=>l.material[lang]).join(' '))};
}
LESSONS.splice(0,LESSONS.length,...MEETING_GROUPS.map(mergeMeeting));
function P(id,title,learn,result1,result2,reflect1,reflect2,challenge,check){
  const l=lessonById(id);l.title=B(title);l.guide={learn:B(learn),results:[B(result1),B(result2)],reflections:[B(reflect1),B(reflect2)],challenge:{task:B(challenge),check:B(check)}};
}
P(1,'E-commerce and sustainability|E-commerce and sustainability',
'Baca pengantar e-commerce BSD: B2C, B2B, C2C; manfaat dan kendala bagi pembeli/penjual; pengalaman pelanggan; serta riset sustainability. Kegiatan hari ini berupa membaca, berdiskusi, dan menelaah bukti.|Read the BSD e-commerce introduction: B2C, B2B, C2C; buyer/vendor benefits and drawbacks; customer experience; and sustainability research. Today’s activities are reading, discussion, and examining evidence.',
'Tabel singkat manfaat dan kendala e-commerce dari sudut pembeli serta penjual.|A brief table of e-commerce benefits and drawbacks for buyers and vendors.',
'Kesimpulan: satu praktik sustainability, bukti efektivitasnya, dan satu usulan perbaikan.|A conclusion: one sustainability practice, evidence of effectiveness, and one improvement.',
'Apakah manfaat bagi pembeli selalu sama dengan manfaat bagi lingkungan? Jelaskan satu tradeoff.|Do buyer benefits always match environmental benefits? Explain one tradeoff.',
'Bukti apa yang membuatmu percaya atau meragukan klaim sustainability perusahaan?|What evidence makes you trust or question a company’s sustainability claim?',
'Bandingkan dua pilihan, misalnya pengiriman terpisah versus digabung atau dua jenis kemasan. Pilih perbaikan untuk satu usaha dan jelaskan alasan serta bukti yang perlu dicari.|Compare two choices, such as separate versus combined deliveries or two packaging types. Choose an improvement for a business and explain your reasoning and the evidence needed.',
'Teman dapat mengenali manfaat, kendala, dan keterbatasan usulanmu. Cantumkan sumber; bedakan data yang ditemukan dari dugaan.|A peer can identify your proposal’s benefit, drawback, and limitations. Cite sources and distinguish evidence from assumptions.');
Object.assign(lessonById(1),{type:'discussion',bsd:['E-commerce and sustainability'],goal:B('Memahami cara kerja e-commerce dan menilai dampaknya bagi pengguna serta keberlanjutan dengan bukti.|Understand e-commerce and use evidence to assess its effects on users and sustainability.'),tasks:[...lessonById(1).guide.results,lessonById(1).guide.challenge.task],success:[...lessonById(1).guide.results,B('Alasan, sumber, dan tradeoff dapat dijelaskan dalam diskusi.|Reasons, sources, and tradeoffs can be explained in discussion.') ]});
P(2,'Review HTML/CSS/JS & fondasi CSS|HTML/CSS/JS review & CSS foundations',
'Tinjau bagian Chatbot, Carrot Picker, dan Paper Art yang belum dikuasai. Fokus praktik kelas pada Image Card dan Website Layout: selector, box model, float/clear, dan inline-block. Review memakai karya yang sudah ada.|Review gaps in Chatbot, Carrot Picker, and Paper Art. Class practice focuses on Image Card and Website Layout: selectors, box model, float/clear, and inline-block. Review uses existing work.',
'Kartu dengan konten sendiri dan layout yang memiliki footer di bawah float.|A personalized card and a layout with its footer below floats.',
'Penjelasan satu event/output dari karya review dan perbedaan margin/padding pada kartu.|An event/output explanation from review work and margin/padding differences on the card.',
'Bagaimana HTML, CSS, dan JavaScript berperan pada contoh reviewmu?|How do HTML, CSS, and JavaScript contribute to your review example?',
'Mengapa perubahan padding dan margin menghasilkan ruang yang berbeda?|Why do padding and margin changes create different spacing?',
'Modifikasi Image Card dengan konten produk sendiri; ubah padding/border dan gunakan box-sizing agar lebarnya sesuai rencana.|Personalize Image Card; change padding/border and use box-sizing to maintain the planned width.',
'Tunjukkan sebelum/sesudah dan jelaskan ukuran kartu. Footer layout tetap berada di bawah float.|Show before/after and explain card sizing. The layout footer stays below floats.');
P(3,'Gallery, Flexbox & media queries|Gallery, Flexbox & media queries',
'Gunakan Gallery Website untuk float/clear, lalu Flexbox untuk direction/wrap/alignment. Terapkan media queries pada proyek responsive BSD dengan breakpoint 768px dan 992px. Jelaskan perubahan layout dari contoh yang sudah dikerjakan.|Use Gallery Website for float/clear, then Flexbox for direction/wrap/alignment. Apply media queries in the BSD responsive project at 768px and 992px. Explain layout changes using completed examples.',
'Gallery dengan sidebar/main/footer dan contoh Flexbox yang dapat dijelaskan.|A gallery with sidebar/main/footer and an explainable Flexbox example.',
'Halaman responsive dengan bukti uji di sekitar breakpoint.|A responsive page with test evidence around a breakpoint.',
'Apa perbedaan layout float dan Flexbox pada karyamu?|How do floats and Flexbox differ in your work?',
'Aturan mana berubah ketika lebar mencapai breakpoint?|Which rules change when the width reaches a breakpoint?',
'Tambah item atau ubah panjang judul pada layout responsive; sesuaikan wrap dan media query agar konten tetap terbaca.|Add an item or lengthen a title in the responsive layout; adjust wrapping and media queries to retain readability.',
'Uji 767/768/769px dan desktop. Jelaskan query yang aktif; konten tidak meluber.|Test 767/768/769px and desktop. Explain active queries; content does not overflow.');
P(4,'Bootstrap & Restaurant Home Page|Bootstrap & Restaurant Home Page',
'Gunakan Introduction to Bootstrap sebagai rujukan grid 12 kolom. Bangun atau lanjutkan Restaurant Home Page: navbar collapse, carousel, About, empat cards, dan footer; uji tiap komponen.|Use Introduction to Bootstrap as a 12-column grid reference. Build or continue Restaurant Home Page: collapsible navbar, carousel, About, four cards, and footer; test each component.',
'Halaman restoran dengan navbar mobile dan carousel yang bekerja.|A restaurant page with a working mobile navbar and carousel.',
'Grid, empat cards, gambar, dan footer dapat dibuka serta dijelaskan.|The grid, four cards, images, and footer can be shown and explained.',
'Bagaimana grid menentukan susunan cards di ukuran layar berbeda?|How does the grid determine card arrangements across screen sizes?',
'Bagaimana target tombol navbar/carousel terhubung dengan komponennya?|How are navbar/carousel button targets connected to their components?',
'Personalisasikan restoran dan tambah satu slide carousel dengan struktur/target kontrol tetap sesuai.|Personalize the restaurant and add a carousel slide while keeping structure/control targets consistent.',
'Semua slide dan menu mobile bekerja; uji susunan grid di dua ukuran layar.|All slides and the mobile menu work; test the grid at two sizes.');
P(5,'Assignment 1: bangun, uji & revisi|Assignment 1: build, test & revise',
'Ikuti Brief for assignment 1: terapkan Bootstrap pada organisasi pilihanmu dengan navigasi, carousel, grid, gambar, minimal tiga cards, dan footer. Gunakan checkpoint untuk penjelasan dan revisi.|Follow Brief for assignment 1: apply Bootstrap to your chosen organization with navigation, carousel, grid, images, at least three cards, and footer. Use the checkpoint for explanation and revision.',
'Website organisasi dengan konten sendiri dan komponen sesuai brief.|An organization website with original content and brief-required components.',
'Satu masukan teman/guru ditindaklanjuti dengan perubahan dan uji ulang.|One peer/teacher suggestion addressed through a change and retest.',
'Bagian mana merupakan keputusan desainmu sendiri?|Which part reflects your own design decision?',
'Apa bukti perbaikan membuat pengguna lebih mudah memahami website?|What evidence shows the improvement makes the site easier to understand?',
'Perbaiki satu masalah nyata pada menu, grid, atau gambar berdasarkan hasil uji teman.|Fix an actual menu, grid, or image issue identified through peer testing.',
'Tunjukkan masalah awal, perubahan kode, dan uji ulang desktop/mobile; minimal tiga cards tetap terpenuhi.|Show the original issue, code change, and desktop/mobile retest; retain at least three cards.');
P(6,'Review logika JavaScript, fungsi, array & loop|JavaScript logic, functions, arrays & loops review',
'Gunakan proyek Fundamentals, Conditional Statements, Operators, Functions, Arrays, dan Loops sebagai review terarah. Fokus kelas pada trace kondisi, parameter/return, indeks/length, dan loop; bukan mengulang semua langkah dari awal.|Use Fundamentals, Conditional Statements, Operators, Functions, Arrays, and Loops for targeted review. Focus on tracing conditions, parameters/return, indices/length, and loops rather than restarting every step.',
'Tabel input/kondisi/output yang benar pada batas aturan.|A correct input/condition/output table at a rule boundary.',
'Fungsi yang memproses array dengan loop dan hasil return yang dapat dijelaskan.|A function processing an array with a loop and an explainable return value.',
'Bagaimana kondisi dan batas loop menentukan hasil?|How do conditions and loop boundaries determine the result?',
'Apa perbedaan parameter, argumen, dan return pada fungsimu?|How do parameters, arguments, and return differ in your function?',
'Ubah fungsi total array menjadi rata-rata; tentukan hasil untuk array kosong.|Modify an array-total function into an average function; define the empty-array result.',
'Uji [10,20,30], satu angka, dan array kosong. Jelaskan cabang/kondisi yang digunakan.|Test [10,20,30], one number, and an empty array. Explain the branch/condition used.');
P(7,'DOM, event & To-Do List|DOM, events & To-Do List',
'Lanjutkan Manipulate HTML and CSS serta To-Do List. Hubungkan selector, create/append, event input/change/click, penambahan item, dan remove pada item yang dipilih.|Continue Manipulate HTML and CSS and To-Do List. Connect selectors, create/append, input/change/click events, item addition, and removal of the selected item.',
'To-Do List menambah beberapa item dan menghapus hanya item yang dipilih.|A To-Do List adds multiple items and removes only the selected item.',
'Selector dan event yang mengubah DOM dapat ditelusuri.|The selector and event changing the DOM can be traced.',
'Mengapa input dan change memberi waktu pembaruan yang berbeda?|Why do input and change update at different times?',
'Bagaimana tombol delete terhubung ke item yang tepat?|How does a delete button connect to the correct item?',
'Tambahkan validasi input kosong/spasi sebagai modifikasi Application Challenge kelas.|Add empty/whitespace input validation as a classroom Application Challenge modification.',
'Uji kosong, spasi, teks biasa, dan dua item sama; hapus satu tanpa menghapus yang lain.|Test empty, whitespace, normal text, and two identical items; remove one without removing the other.');
P(8,'BSD Database & Expense Tracker|BSD Database & Expense Tracker',
'Gunakan Introduction to the BSD Database untuk open/set/get/delete/listKeys dan .then. Terapkan alur tersebut pada Expense Tracker: input, key/object, save/read, total, dan delete.|Use Introduction to the BSD Database for open/set/get/delete/listKeys and .then. Apply the flow to Expense Tracker: input, key/object, saving/reading, total, and deletion.',
'Expense tracker menyimpan dan membaca data melalui database.|An expense tracker saves and reads data through the database.',
'Daftar dan total cocok setelah tambah/delete dan baca ulang.|The list and total match after addition/deletion and rereading.',
'Apa beda listKeys dan get ketika menampilkan pengeluaran?|How do listKeys and get differ when displaying expenses?',
'Mengapa biaya harus berupa angka dan total dihitung ulang setelah delete?|Why must costs be numbers and totals recalculated after deletion?',
'Tambahkan validasi biaya kosong, bukan angka, dan negatif sebelum menyimpan.|Validate empty, non-numeric, and negative costs before saving.',
'10+5 menghasilkan 15; hapus 10 menjadi 5. Input invalid tidak menambah record.|10+5 totals 15; deleting 10 leaves 5. Invalid input adds no record.');
P(18,'Uji akhir, demonstrasi & refleksi|Final testing, demonstration & reflection',
'Gunakan log uji yang dikumpulkan sejak pertemuan e-commerce. Periksa alur terakhir, demonstrasikan transaksi hingga order management, lalu jelaskan kode dan kontribusi individual.|Use test logs collected throughout the e-commerce meetings. Run final checks, demonstrate a transaction through order management, then explain code and individual contribution.',
'Transaksi uji lengkap dan dokumentasi hasil/revisi dapat ditunjukkan.|A complete test transaction and outcome/revision documentation can be shown.',
'Penjelasan individual tentang satu bagian kode, manfaat desain, serta keterbatasannya.|An individual explanation of code, design benefits, and limitations.',
'Konsep BSD apa yang kini dapat kamu terapkan sendiri?|Which BSD concept can you now apply independently?',
'Apa satu bukti kemajuan dan keterbatasan yang masih perlu ditangani?|What is one piece of progress evidence and a remaining limitation?',
'Tunjukkan satu modifikasi yang sudah diuji selama proyek. Setelah demo, usulkan satu perbaikan berikutnya berdasarkan masukan.|Show a modification already tested during the project. After the demo, propose a next improvement based on feedback.',
'Jelaskan perubahan, alasan, dan hasil uji sebelum/sesudah; usulan berikutnya memiliki target yang jelas.|Explain the change, reason, and before/after test results; give the next proposal a clear target.');
for(const id of [2,3,4,5,6,7,8,18])lessonById(id).goal=[0,1].map(lang=>lessonById(id).guide.results.map(r=>r[lang]).join(' '));
const MEETING_COUNT=LESSONS.length;
COURSE.timing=B('Jadwal kelas: 18 pertemuan × 2 JP. Review dilakukan selektif dari karya yang sudah ada; beberapa langkah proyek diteruskan mandiri sesuai arahan guru. Ini pembagian jadwal kelas, bukan klaim bahwa semua 833 langkah dapat diajarkan dari nol dalam 18 pertemuan. Uji dicatat sejak praktik, sehingga pertemuan 18 dipakai untuk demonstrasi dan refleksi.|Class timetable: 18 meetings × 2 periods. Review selectively uses existing work; some project steps continue independently under teacher guidance. This is a class allocation, not a claim that all 833 steps can be taught from scratch in 18 meetings. Record tests throughout practice so meeting 18 can focus on demonstration and reflection.');
