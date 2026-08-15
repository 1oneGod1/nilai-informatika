/* ========================================================
   assessment-config.js
   Konfigurasi assessment per grade dan quarter.
   Dipakai bersama oleh dashboard guru dan detail siswa.
   ======================================================== */

const DC_Q1_ASSESSMENTS = [
  {
    id: "personalWebpage",
    number: "01",
    title: "Personal Webpage",
    subtitle: "Privasi & informasi pribadi",
    type: "Formatif",
    weight: 12,
    color: "#73d31d",
    criteria: [
      { id: "safe", label: "Tidak menampilkan informasi privat", max: 15 },
      { id: "core", label: "Memiliki judul, bio, dan tiga bagian lengkap", max: 15 },
      { id: "sections", label: "Setiap bagian memiliki heading, gambar, dan deskripsi", max: 10 },
      { id: "sentences", label: "Bio dan setiap deskripsi menggunakan 2-4 kalimat lengkap", max: 15 },
      { id: "original", label: "Judul, isi, gambar, dan tema dibuat dalam versi siswa sendiri", max: 15 },
      { id: "html", label: "Menggunakan heading, paragraph, image, dan id dengan tepat", max: 10 },
      { id: "css", label: "CSS warna, teks, dan ukuran huruf sudah dipersonalisasi", max: 10 },
      { id: "finish", label: "Semua bagian selesai, tanpa placeholder, dan website rapi", max: 10 },
    ],
  },
  {
    id: "onlineSafety",
    number: "02",
    title: "Online Safety Guide",
    subtitle: "Komunikasi aman & red flags",
    type: "Formatif",
    weight: 12,
    color: "#11bfb6",
    criteria: [
      { id: "benefits", label: "Menjelaskan minimal tiga manfaat komunikasi online", max: 10 },
      { id: "risks", label: "Menjelaskan minimal tiga risiko komunikasi online", max: 10 },
      { id: "responses", label: "Menjelaskan minimal tiga cara merespons red flags", max: 10 },
      { id: "sentences", label: "Setiap penjelasan menggunakan kalimat lengkap dan jelas", max: 15 },
      { id: "original", label: "Contoh dan penjelasan dibuat dalam versi siswa sendiri", max: 15 },
      { id: "html", label: "Menggunakan title, section, ul, li, span, atau class", max: 15 },
      { id: "css", label: "CSS telah dipersonalisasi dan bukan tampilan awal", max: 10 },
      { id: "accuracy", label: "Saran keamanan benar, realistis, dan dapat diterapkan", max: 5 },
      { id: "finish", label: "Semua bagian selesai, berfungsi, dan tidak memiliki placeholder", max: 10 },
    ],
  },
  {
    id: "digitalFootprint",
    number: "03",
    title: "Digital Footprint Trivia",
    subtitle: "Jejak digital & logika JavaScript",
    type: "Formatif",
    weight: 16,
    color: "#f0b81b",
    criteria: [
      { id: "questions", label: "Memiliki tiga pertanyaan tentang digital footprint", max: 10 },
      { id: "accuracy", label: "Pertanyaan dan jawaban benar sesuai materi", max: 10 },
      { id: "sentences", label: "Pertanyaan ditulis dalam kalimat lengkap dan jelas", max: 10 },
      { id: "original", label: "Judul, tagline, pertanyaan, dan tampilan merupakan versi siswa", max: 15 },
      { id: "interface", label: "Memiliki judul, tagline, dan tombol Play", max: 10 },
      { id: "events", label: "Menggunakan onclick, function, prompt(), dan alert()", max: 10 },
      { id: "logic", label: "Menggunakan variable, if/else, dan operator perbandingan", max: 10 },
      { id: "score", label: "Sistem penambahan skor dan skor akhir bekerja dengan benar", max: 10 },
      { id: "feedback", label: "Tiga pertanyaan berjalan dan memberi umpan balik yang tepat", max: 5 },
      { id: "finish", label: "Tidak ada placeholder, error, atau bagian kosong", max: 10 },
    ],
  },
  {
    id: "evaluatingNews",
    number: "04",
    title: "Evaluating News Quiz Maker",
    subtitle: "REAL Test & kuis interaktif",
    type: "Sumatif",
    weight: 40,
    color: "#8b6cf0",
    criteria: [
      { id: "concept", label: "Isi menunjukkan pemahaman fake information dan REAL Test", max: 20 },
      { id: "questions", label: "Memiliki tiga pertanyaan dan masing-masing empat pilihan", max: 10 },
      { id: "accuracy", label: "Jawaban benar ditentukan secara akurat", max: 10 },
      { id: "sentences", label: "Pertanyaan dan pilihan ditulis dalam kalimat lengkap", max: 10 },
      { id: "original", label: "Judul, pertanyaan, contoh, dan tampilan merupakan versi siswa", max: 10 },
      { id: "data", label: "Menggunakan const, string, object, dan array dengan benar", max: 10 },
      { id: "index", label: "Menggunakan index untuk menentukan jawaban benar", max: 5 },
      { id: "function", label: "Ketiga pertanyaan dapat ditampilkan dan dijawab", max: 10 },
      { id: "score", label: "Umpan balik dan perhitungan skor berfungsi", max: 5 },
      { id: "design", label: "Tampilan rapi, mudah digunakan, dan dipersonalisasi", max: 5 },
      { id: "finish", label: "Tidak ada placeholder, error, atau bagian kosong", max: 5 },
    ],
  },
];

const DC_Q1_FINAL_QUIZ = {
  id: "finalQuiz",
  number: "05",
  title: "Digital Citizenship Assessment",
  subtitle: "25 soal pilihan ganda",
  type: "Sumatif",
  weight: 20,
  color: "#ef6a54",
};

// Grade 8 uses the same Q1 assessment model as Grade 9, while the task briefs
// follow the Grade 8 activity list and the supplied Digital Footprint and
// Evaluating News workbooks.
const G8_Q1_BRIEFS = {
  personalWebpage:
    "Buat personal webpage yang hanya membagikan informasi pribadi yang aman. Sertakan judul, bio singkat, tiga bagian lengkap, gambar yang sesuai, serta HTML/CSS yang dipersonalisasi tanpa informasi privat atau placeholder.",
  onlineSafety:
    "Buat panduan online safety yang menjelaskan minimal tiga manfaat, tiga risiko, dan tiga respons praktis terhadap online red flags. Setiap saran harus akurat, realistis, dan ditulis dengan kata-kata siswa sendiri.",
  digitalFootprint:
    "Buat trivia game berisi tiga pertanyaan tentang digital footprint, persistence, invisible audience, dan pilihan online yang positif. Game harus memiliki judul, tagline, tombol Play, function, prompt(), alert(), variable, logika if/else, feedback, dan skor akhir yang berfungsi.",
  evaluatingNews:
    "Buat kuis pilihan ganda berisi tiga pertanyaan tentang alasan fake information dibuat dan REAL Test: Reliable, Evidence, Author, dan Logic. Setiap pertanyaan memiliki empat pilihan, index jawaban yang akurat, feedback, skor, dan struktur data JavaScript yang benar.",
};

const G8_Q1_ASSESSMENTS = DC_Q1_ASSESSMENTS.map((assessment) => ({
  ...assessment,
  brief: G8_Q1_BRIEFS[assessment.id] || "",
}));

const G8_Q1_FINAL_QUIZ = {
  ...DC_Q1_FINAL_QUIZ,
  subtitle: "25 soal: privacy, online safety, digital footprint, dan evaluating information",
};

const DC_Q2_ASSESSMENTS = [
  {
    id: "vrFundamentals",
    number: "01",
    title: "A-Frame Fundamentals",
    subtitle: "Scene, shapes, textures & lighting",
    type: "Formatif",
    weight: 12,
    color: "#73d31d",
    criteria: [
      { id: "scene", label: "Library A-Frame dan elemen <a-scene> dipasang dengan benar", max: 15 },
      { id: "shapes", label: "Menggunakan beberapa basic shapes", max: 15 },
      { id: "transform", label: "Position, rotation, dan scale digunakan dengan tepat", max: 15 },
      { id: "coordinates", label: "Koordinat X, Y, dan Z membentuk susunan ruang yang jelas", max: 15 },
      { id: "textureColor", label: "Menggunakan image texture dan hex color yang sesuai", max: 15 },
      { id: "lighting", label: "Lighting berfungsi dan mendukung tampilan scene", max: 10 },
      { id: "original", label: "Tema dan tampilan dibuat dalam versi siswa sendiri", max: 10 },
      { id: "sentences", label: "Proyek selesai dan dijelaskan dengan kalimat lengkap", max: 5 },
    ],
  },
  {
    id: "modelsAnimation",
    number: "02",
    title: "Models and Animation",
    subtitle: "Third-party assets & movement",
    type: "Formatif",
    weight: 12,
    color: "#11bfb6",
    criteria: [
      { id: "assets", label: "Menggunakan <a-assets> dengan struktur yang benar", max: 15 },
      { id: "preload", label: "Model berhasil dimuat menggunakan <a-asset-item>", max: 15 },
      { id: "display", label: "Model tampil melalui <a-gltf-model> atau <a-obj-model>", max: 15 },
      { id: "sourceMatch", label: "Nilai id dan src saling cocok", max: 10 },
      { id: "transform", label: "Position, scale, dan rotation model sudah disesuaikan", max: 10 },
      { id: "animation", label: "Animation atau keyframes berfungsi", max: 15 },
      { id: "path", label: "Path animation atau pergerakan tambahan berfungsi", max: 10 },
      { id: "original", label: "Model, gerakan, dan tema merupakan versi siswa sendiri", max: 5 },
      { id: "finish", label: "Proyek lengkap dan dijelaskan dengan kalimat lengkap", max: 5 },
    ],
  },
  {
    id: "interactiveVr",
    number: "03",
    title: "Interactive VR Features",
    subtitle: "Physics, interactions & sound",
    type: "Formatif",
    weight: 16,
    color: "#f0b81b",
    criteria: [
      { id: "physics", label: "Physics digunakan dan menunjukkan perilaku objek", max: 15 },
      { id: "collision", label: "Collision detection bekerja dengan benar", max: 15 },
      { id: "component", label: "Custom component dibuat dengan AFRAME.registerComponent()", max: 15 },
      { id: "gaze", label: "Gaze interaction dapat digunakan tanpa mouse", max: 10 },
      { id: "tour", label: "VR Tour atau teleportation bekerja", max: 10 },
      { id: "sound", label: "Audio berhasil di-preload dan dimainkan dengan <a-sound>", max: 10 },
      { id: "function", label: "Proyek berjalan tanpa error penting", max: 10 },
      { id: "original", label: "Fitur, tema, dan interaksi dibuat dalam versi siswa sendiri", max: 10 },
      { id: "sentences", label: "Penjelasan menggunakan kalimat lengkap dan tidak menyalin contoh", max: 5 },
    ],
  },
  {
    id: "vrDiorama",
    number: "04",
    title: "Final Project: VR Diorama",
    subtitle: "Dunia VR mandiri dari sandbox kosong",
    type: "Sumatif",
    weight: 50,
    color: "#8b6cf0",
    criteria: [
      { id: "original", label: "Ide, tema, dan susunan dunia merupakan versi siswa sendiri", max: 15 },
      { id: "structure", label: "Struktur library, <a-scene>, dan kode A-Frame benar", max: 10 },
      { id: "shapes", label: "Basic shapes dan komposisi ruang digunakan dengan baik", max: 10 },
      { id: "texture", label: "Texture dan color palette mendukung tema", max: 10 },
      { id: "lighting", label: "Lighting digunakan secara tepat", max: 10 },
      { id: "model", label: "Third-party model berhasil ditampilkan dan disesuaikan", max: 10 },
      { id: "animation", label: "Animation berfungsi dan sesuai dengan objek", max: 10 },
      { id: "function", label: "Seluruh fitur utama berjalan tanpa error", max: 10 },
      { id: "design", label: "Diorama rapi, menarik, dan mudah dijelajahi", max: 10 },
      { id: "finish", label: "Semua bagian selesai dan tidak memiliki placeholder", max: 5 },
    ],
  },
  {
    id: "vrWalkthrough",
    number: "05",
    title: "Individual Walkthrough and Reflection",
    subtitle: "Verifikasi pemahaman & kepemilikan karya",
    type: "Sumatif",
    weight: 10,
    color: "#ef6a54",
    criteria: [
      { id: "demo", label: "Mendemonstrasikan diorama dan fitur utamanya", max: 20 },
      { id: "structure", label: "Menjelaskan struktur A-Frame dan library yang digunakan", max: 20 },
      { id: "challenge", label: "Menjelaskan satu masalah dan cara memperbaikinya", max: 20 },
      { id: "design", label: "Menjelaskan alasan pemilihan tema, warna, dan aset", max: 15 },
      { id: "sentences", label: "Menggunakan kata-kata sendiri dan kalimat lengkap", max: 15 },
      { id: "independent", label: "Menjawab pertanyaan guru secara mandiri", max: 10 },
    ],
  },
];

const DC_Q3_ASSESSMENTS = [
  {
    id: "mechanicalDesign",
    number: "01",
    title: "Mechanical Design",
    subtitle: "VEX Teasers & Build a Wagon",
    type: "Formatif",
    weight: 12,
    color: "#73d31d",
    criteria: [
      { id: "teasers", label: "Menyelesaikan VEX Teasers dan menjelaskan perpindahan komponennya", max: 20 },
      { id: "wagon", label: "Struktur wagon kokoh, stabil, dan terpasang dengan benar", max: 20 },
      { id: "incline", label: "Robot berhasil membawa cube menaiki bidang miring", max: 15 },
      { id: "wheels", label: "Menguji beberapa kombinasi roda atau traksi", max: 15 },
      { id: "iteration", label: "Mencatat masalah, perubahan, dan hasil pengujian", max: 10 },
      { id: "original", label: "Desain dibuat sebagai versi atau solusi kelompok sendiri", max: 10 },
      { id: "sentences", label: "Semua bukti lengkap dan penjelasan menggunakan kalimat lengkap", max: 10 },
    ],
  },
  {
    id: "sensorProgramming",
    number: "02",
    title: "Sensor Programming",
    subtitle: "Cube Pusher & At a Distance",
    type: "Formatif",
    weight: 12,
    color: "#11bfb6",
    criteria: [
      { id: "setup", label: "Optical Sensor dan Distance Sensor dipasang serta dikonfigurasi dengan benar", max: 15 },
      { id: "logic", label: "Menggunakan urutan, perulangan, dan kondisi program dengan benar", max: 20 },
      { id: "cubePusher", label: "Cube Pusher dapat mendeteksi batas dan mendorong cube", max: 15 },
      { id: "distance", label: "At a Distance dapat berhenti atau menghindari objek pada jarak yang tepat", max: 15 },
      { id: "debugging", label: "Menguji parameter dan menunjukkan proses debugging", max: 15 },
      { id: "original", label: "Program dimodifikasi menjadi versi siswa sendiri", max: 10 },
      { id: "evidence", label: "Screenshot kode, hasil pengujian, dan penjelasan kalimat lengkap tersedia", max: 10 },
    ],
  },
  {
    id: "sensorTestbed",
    number: "03",
    title: "Sensor Testbed Investigation",
    subtitle: "Five sensors & Sense It Challenge",
    type: "Formatif",
    weight: 16,
    color: "#f0b81b",
    criteria: [
      { id: "build", label: "Testbed dibangun dan semua kabel terhubung ke port yang benar", max: 15 },
      { id: "fiveSensors", label: "Kelima sensor diprogram dan diuji", max: 20 },
      { id: "understanding", label: "Memahami nilai, fungsi, dan penggunaan setiap sensor", max: 15 },
      { id: "observations", label: "Mencatat hasil pengamatan sensor secara lengkap", max: 15 },
      { id: "senseIt", label: "Mengikuti Sense It Challenge dan mencatat skor dengan jujur", max: 10 },
      { id: "role", label: "Menjalankan tanggung jawab peran kelompok", max: 5 },
      { id: "original", label: "Membuat ide penggunaan sensor atau permainan versi sendiri", max: 10 },
      { id: "sentences", label: "Menjawab semua pertanyaan dengan kalimat lengkap dan jelas", max: 10 },
    ],
  },
  {
    id: "teamFreezeTag",
    number: "04",
    title: "Team Freeze Tag Challenge",
    subtitle: "Robot design, strategy & competition",
    type: "Sumatif",
    weight: 45,
    color: "#8b6cf0",
    criteria: [
      { id: "reliability", label: "Robot dan tambahan strukturnya aman, kuat, dan dapat digunakan", max: 10 },
      { id: "controller", label: "Konfigurasi Controller diuji dan pemilihannya dapat dijelaskan", max: 10 },
      { id: "wheels", label: "Kombinasi roda diuji dan dipilih berdasarkan hasil percobaan", max: 10 },
      { id: "sensors", label: "Bumper Switch dan Touch LED terpasang, dikonfigurasi, dan berfungsi", max: 15 },
      { id: "driving", label: "Robot dapat dikendalikan dengan baik dan konsisten", max: 10 },
      { id: "strategy", label: "Memiliki strategi permainan yang jelas", max: 10 },
      { id: "iteration", label: "Melakukan perbaikan berdasarkan hasil latihan atau pertandingan", max: 15 },
      { id: "original", label: "Modifikasi robot atau strategi merupakan versi kelompok sendiri", max: 10 },
      { id: "teamwork", label: "Pembagian peran dan kerja sama terlihat", max: 5 },
      { id: "sportsmanship", label: "Mengikuti peraturan, menjaga keselamatan, dan menunjukkan sportivitas", max: 5 },
    ],
  },
  {
    id: "engineeringReport",
    number: "05",
    title: "Individual Engineering Report",
    subtitle: "Engineering notebook & personal reflection",
    type: "Sumatif",
    weight: 15,
    color: "#ef6a54",
    criteria: [
      { id: "documentation", label: "Dokumentasi setiap tahap dilengkapi foto, sketsa, atau screenshot kode", max: 20 },
      { id: "iteration", label: "Menjelaskan setiap proses perubahan, pengujian, dan hasil", max: 20 },
      { id: "choices", label: "Menjelaskan alasan memilih Controller, roda, dan sensor", max: 15 },
      { id: "contribution", label: "Menunjukkan bukti kontribusi pribadi dalam pekerjaan kelompok", max: 15 },
      { id: "analysis", label: "Menganalisis hasil latihan dan kompetisi", max: 10 },
      { id: "reflection", label: "Menjelaskan masalah, solusi, dan rencana pengembangan berikutnya", max: 10 },
      { id: "ownership", label: "Ditulis dengan kata-kata sendiri, kalimat lengkap, dan semua bagian terisi", max: 10 },
    ],
  },
];

const DC_Q4_ASSESSMENTS = [
  {
    id: "sensorLogicActivities",
    number: "01",
    title: "Sensor Logic Activities",
    subtitle: "Magic Movement & 1..2..3.. Green Light",
    type: "Formatif",
    weight: 12,
    color: "#73d31d",
    criteria: [
      { id: "distanceSetup", label: "Distance Sensor pada Magic Movement dikonfigurasi dengan benar", max: 15 },
      { id: "conditionalLoop", label: "Conditional dan forever menghasilkan respons robot yang tepat", max: 15 },
      { id: "sensorIntegration", label: "Touch LED dan Optical Sensor bekerja bersama dengan benar", max: 20 },
      { id: "myBlock", label: "Menggunakan My Block untuk mengatur perilaku robot", max: 15 },
      { id: "debugging", label: "Menunjukkan beberapa hasil pengujian dan proses debugging", max: 15 },
      { id: "original", label: "Menambahkan gerakan, warna, atau perilaku versi siswa sendiri", max: 10 },
      { id: "evidence", label: "Screenshot kode dan penjelasan dengan kalimat lengkap tersedia", max: 10 },
    ],
  },
  {
    id: "castleCrasherAlgorithm",
    number: "02",
    title: "Castle Crasher Algorithm",
    subtitle: "Path planning, dual sensors & autonomous algorithm",
    type: "Formatif",
    weight: 12,
    color: "#11bfb6",
    criteria: [
      { id: "planning", label: "Membuat path planning dan pseudocode berisi jarak, sudut, dan kecepatan", max: 15 },
      { id: "noSensor", label: "Robot dapat mendorong cube menggunakan gerakan tanpa sensor", max: 10 },
      { id: "distance", label: "Distance Sensor dapat mendeteksi cube", max: 15 },
      { id: "optical", label: "Optical Sensor dapat mendeteksi tepi lapangan", max: 15 },
      { id: "algorithm", label: "Algoritma menggabungkan sequence, selection, dan loop dengan benar", max: 20 },
      { id: "iteration", label: "Mencatat perubahan, hasil pengujian, dan alasan perbaikan", max: 10 },
      { id: "original", label: "Kode atau strategi memiliki modifikasi versi kelompok sendiri", max: 5 },
      { id: "notebook", label: "Engineering notebook lengkap dan menggunakan kalimat lengkap", max: 10 },
    ],
  },
  {
    id: "treasureHuntAutomation",
    number: "03",
    title: "Treasure Hunt Automation",
    subtitle: "Simple Clawbot, color detection & collection",
    type: "Formatif",
    weight: 16,
    color: "#f0b81b",
    criteria: [
      { id: "build", label: "Simple Clawbot dibangun dengan benar dan claw dapat digunakan", max: 10 },
      { id: "sequence", label: "Gerakan autonomous dan pengoperasian claw tersusun dalam sequence yang tepat", max: 15 },
      { id: "optical", label: "Optical Sensor dapat mengenali cube merah", max: 20 },
      { id: "logic", label: "Conditional, Boolean condition, atau loop digunakan dengan benar", max: 15 },
      { id: "challenge", label: "Robot berhasil memilih dan memindahkan cube merah", max: 15 },
      { id: "iteration", label: "Melakukan pengukuran, pengujian, dan perbaikan berdasarkan hasil", max: 10 },
      { id: "original", label: "Kode atau strategi dikembangkan menjadi versi kelompok sendiri", max: 5 },
      { id: "evidence", label: "Bukti kerja dan penjelasan dengan kalimat lengkap tersedia", max: 10 },
    ],
  },
  {
    id: "smartWarehouseClawbot",
    number: "04",
    title: "Smart Warehouse Clawbot Challenge",
    subtitle: "Controller, user interface & autonomous delivery",
    type: "Sumatif",
    weight: 45,
    color: "#8b6cf0",
    criteria: [
      { id: "build", label: "Clawbot kuat, aman, dan range of motion arm serta claw sudah diuji", max: 10 },
      { id: "controller", label: "Controller terhubung dan manual control bekerja dengan baik", max: 10 },
      { id: "interface", label: "Tombol Check, Up, dan Down menjadi user interface yang berfungsi", max: 15 },
      { id: "autonomous", label: "Autonomous sequence dapat mengambil dan mengirim package", max: 20 },
      { id: "planning", label: "Pseudocode dan alur program tersusun dengan jelas", max: 10 },
      { id: "delivery", label: "Robot dapat menyelesaikan Package Dash secara konsisten", max: 10 },
      { id: "iteration", label: "Memiliki bukti testing, debugging, dan minimal dua iterasi", max: 10 },
      { id: "original", label: "Memiliki fitur versi sendiri seperti sound, Touch LED, atau tambahan package", max: 5 },
      { id: "teamwork", label: "Pembagian peran, keselamatan, dan kerja sama terlihat", max: 5 },
      { id: "rules", label: "Mengikuti aturan tantangan dan menunjukkan sportivitas", max: 5 },
    ],
  },
  {
    id: "individualEngineeringPortfolio",
    number: "05",
    title: "Individual Engineering Portfolio",
    subtitle: "Engineering notebook & technical explanation",
    type: "Sumatif",
    weight: 15,
    color: "#ef6a54",
    criteria: [
      { id: "documentation", label: "Dokumentasi Q4 dilengkapi foto, sketsa, screenshot kode, dan pseudocode", max: 20 },
      { id: "iteration", label: "Menunjukkan proses masalah, perubahan, pengujian, dan hasil", max: 20 },
      { id: "concepts", label: "Menjelaskan sensor, conditionals, loops, events, dan user interface", max: 20 },
      { id: "contribution", label: "Menjelaskan kontribusi pribadi dan bagian kode yang dikerjakan", max: 15 },
      { id: "analysis", label: "Menganalisis performa robot dalam final challenge", max: 10 },
      { id: "improvement", label: "Menjelaskan perbaikan yang akan dilakukan berikutnya", max: 5 },
      { id: "ownership", label: "Ditulis dengan kata-kata sendiri, kalimat lengkap, dan semua bagian terisi", max: 10 },
    ],
  },
];

const G12_Q1_ASSESSMENTS = [
  {
    id: "favoriteWebsite",
    number: "01",
    title: "My Favorite Website",
    subtitle: "HTML, CSS, dan tiga bagian favorit",
    type: "Formatif",
    weight: 3,
    jp: 2,
    color: "#73d31d",
    criteria: [
      { id: "sections", label: "Memiliki minimal tiga bagian tentang hal favorit", max: 20 },
      { id: "html", label: "Heading, paragraph, section, dan image HTML digunakan dengan benar", max: 20 },
      { id: "css", label: "CSS mengatur warna, font, ukuran, margin, dan latar belakang", max: 20 },
      { id: "function", label: "Gambar dan seluruh bagian halaman tampil dengan benar", max: 20 },
      { id: "ownership", label: "Isi merupakan versi siswa sendiri dan ditulis dalam kalimat lengkap", max: 20 },
    ],
  },
  {
    id: "triviaGameMaker",
    number: "02",
    title: "Trivia Game Maker",
    subtitle: "Pertanyaan interaktif dan logika skor JavaScript",
    type: "Formatif",
    weight: 4,
    jp: 2,
    color: "#11bfb6",
    criteria: [
      { id: "questions", label: "Memiliki minimal lima pertanyaan buatan siswa", max: 20 },
      { id: "events", label: "Tombol mulai dan event interaktif berfungsi", max: 20 },
      { id: "logic", label: "Jawaban benar dan salah diperiksa menggunakan kondisi JavaScript", max: 20 },
      { id: "score", label: "Skor dihitung dan hasil akhir ditampilkan dengan benar", max: 20 },
      { id: "ownership", label: "Tampilan, pertanyaan, dan penjelasan dibuat dalam versi siswa sendiri dengan kalimat lengkap", max: 20 },
    ],
  },
  {
    id: "web3EcosystemMap",
    number: "F1",
    title: "Formatif 1: Web3 Ecosystem Map",
    subtitle: "Infografik atau mind map hubungan Web3, blockchain, cryptocurrency, dan NFT",
    brief: "Produk akhir: satu infografik atau mind map digital. Wajib memuat definisi dalam kalimat lengkap, panah hubungan konsep, contoh nyata, risiko atau etika digital, refleksi pribadi, sumber, serta bukti proses berupa draft dan screenshot pengerjaan.",
    type: "Formatif",
    weight: 3,
    jp: 2,
    color: "#3e95e8",
    criteria: [
      { id: "concepts", label: "Web3, blockchain, cryptocurrency, dan NFT tersedia serta dijelaskan secara tepat dengan kalimat lengkap", max: 30 },
      { id: "connections", label: "Panah, label, dan penjelasan menunjukkan hubungan Web3–blockchain–cryptocurrency–NFT secara logis", max: 25 },
      { id: "responsibleUse", label: "Menyertakan contoh penggunaan nyata serta pembahasan keamanan, risiko, etika, atau penggunaan digital yang bertanggung jawab", max: 15 },
      { id: "studentVersion", label: "Isi dan refleksi merupakan versi siswa sendiri, memakai kalimat lengkap, disertai draft/screenshot proses, dan dapat dijelaskan saat ditanya guru", max: 20 },
      { id: "visualCommunication", label: "Judul, alur, tata letak, ukuran tulisan, dan sumber informasi/gambar tersusun rapi serta mudah dibaca", max: 10 },
    ],
  },
  {
    id: "roomDecorator",
    number: "03",
    title: "Room Decorator",
    subtitle: "Pembelian furnitur dengan cryptocurrency simulasi",
    type: "Formatif",
    weight: 2,
    jp: 2,
    color: "#f0b81b",
    criteria: [
      { id: "balance", label: "Saldo cryptocurrency simulasi ditampilkan dan diperbarui", max: 20 },
      { id: "items", label: "Terdapat minimal tiga barang yang dapat dibeli", max: 20 },
      { id: "purchase", label: "Harga dan saldo berubah dengan benar setelah pembelian", max: 20 },
      { id: "validation", label: "Sistem mencegah pembelian jika saldo tidak cukup", max: 20 },
      { id: "ownership", label: "Desain ruangan dan penjelasan merupakan versi siswa sendiri dengan kalimat lengkap", max: 20 },
    ],
  },
  {
    id: "newCryptocurrency",
    number: "04",
    title: "Start a New Cryptocurrency",
    subtitle: "Identitas, logo, dan tujuan cryptocurrency",
    type: "Formatif",
    weight: 2,
    jp: 1,
    color: "#ef6a54",
    criteria: [
      { id: "identity", label: "Memiliki nama cryptocurrency dan ticker yang orisinal", max: 20 },
      { id: "logo", label: "Memiliki logo buatan atau rancangan siswa", max: 20 },
      { id: "purpose", label: "Tujuan cryptocurrency dijelaskan dengan jelas", max: 20 },
      { id: "audience", label: "Pengguna dan manfaatnya dijelaskan dalam kalimat lengkap", max: 20 },
      { id: "ownership", label: "Produk dikembangkan menjadi versi siswa dan bukan sekadar mengganti nama contoh", max: 20 },
    ],
  },
  {
    id: "cryptocurrencyWebsite",
    number: "05",
    title: "My Cryptocurrency Website",
    subtitle: "Website promosi cryptocurrency fiktif",
    type: "Formatif",
    weight: 4,
    jp: 2,
    color: "#8b6cf0",
    criteria: [
      { id: "identity", label: "Website menampilkan nama, logo, dan tujuan cryptocurrency", max: 20 },
      { id: "content", label: "Memiliki minimal tiga bagian informasi dengan kalimat lengkap", max: 20 },
      { id: "code", label: "HTML dan CSS tersusun serta tampil dengan benar", max: 20 },
      { id: "interaction", label: "Interaksi atau navigasi website berfungsi", max: 20 },
      { id: "ownership", label: "Konten dan desain dikembangkan sebagai versi siswa sendiri", max: 20 },
    ],
  },
  {
    id: "web3BlockchainSimulator",
    number: "06",
    title: "Web3 Blockchain Simulator",
    subtitle: "Representasi visual transaksi dan rantai blok",
    type: "Formatif",
    weight: 4,
    jp: 2,
    color: "#2f9ee5",
    criteria: [
      { id: "blocks", label: "Menampilkan minimal tiga blok yang saling terhubung", max: 20 },
      { id: "hashes", label: "Setiap blok mempunyai data, hash, dan previous hash", max: 20 },
      { id: "change", label: "Penambahan atau perubahan data memengaruhi hash", max: 20 },
      { id: "validity", label: "Status valid atau tidak validnya rantai dapat terlihat", max: 20 },
      { id: "ownership", label: "Proses blockchain dijelaskan dengan kalimat siswa sendiri", max: 20 },
    ],
  },
  {
    id: "nftPixelArt",
    number: "07",
    title: "NFT Pixel Art Maker",
    subtitle: "Tiga karya pixel-art orisinal",
    type: "Formatif",
    weight: 2,
    jp: 1,
    color: "#e45da9",
    criteria: [
      { id: "artworks", label: "Membuat tiga karya pixel-art orisinal", max: 20 },
      { id: "identity", label: "Setiap karya memiliki judul dan tema", max: 20 },
      { id: "visual", label: "Warna dan komposisi digunakan secara konsisten", max: 20 },
      { id: "copyright", label: "Karya tidak menyalin aset milik orang lain", max: 20 },
      { id: "reflection", label: "Proses pembuatan dijelaskan dengan kalimat lengkap dan kata-kata sendiri", max: 20 },
    ],
  },
  {
    id: "blockchainTech",
    number: "08",
    title: "Introduction to Blockchain Tech",
    subtitle: "Transaction, block, node, hash, dan chain",
    type: "Formatif",
    weight: 2,
    jp: 1,
    color: "#70d6a9",
    criteria: [
      { id: "flow", label: "Menjelaskan alur transaction, block, dan blockchain", max: 20 },
      { id: "components", label: "Menjelaskan fungsi block, transaction, node, dan hash", max: 20 },
      { id: "properties", label: "Menjelaskan permanence, decentralization, dan openness", max: 20 },
      { id: "example", label: "Memberikan satu contoh penerapan nyata yang relevan", max: 20 },
      { id: "ownership", label: "Penjelasan menggunakan kata dan kalimat siswa sendiri", max: 20 },
    ],
  },
  {
    id: "sha256Experiment",
    number: "09",
    title: "Hashing Algorithms: SHA-256",
    subtitle: "Eksperimen input, hash, dan avalanche effect",
    type: "Formatif",
    weight: 2,
    jp: 1,
    color: "#f49d37",
    criteria: [
      { id: "hash", label: "Program menghasilkan hash SHA-256 dari sebuah input", max: 20 },
      { id: "consistency", label: "Input yang sama menghasilkan hash yang sama", max: 20 },
      { id: "avalanche", label: "Perubahan kecil pada input menghasilkan hash yang berbeda", max: 20 },
      { id: "output", label: "Input, output hash, dan hasil perbandingan ditampilkan dengan benar", max: 20 },
      { id: "ownership", label: "Fungsi dan hasil eksperimen dijelaskan dengan kalimat lengkap serta kode versi siswa", max: 20 },
    ],
  },
  {
    id: "jsClassesObjects",
    number: "10",
    title: "JavaScript: Classes and Objects",
    subtitle: "Class Block, constructor, method, dan object",
    type: "Formatif",
    weight: 4,
    jp: 2,
    color: "#ffd166",
    criteria: [
      { id: "class", label: "Membuat class yang relevan seperti Block atau Transaction", max: 20 },
      { id: "constructor", label: "Constructor dan properties digunakan dengan benar", max: 20 },
      { id: "method", label: "Terdapat method yang dapat dijalankan", max: 20 },
      { id: "objects", label: "Membuat dan menampilkan beberapa object", max: 20 },
      { id: "ownership", label: "Penamaan, komentar, refleksi, dan modifikasi kode menunjukkan pekerjaan versi siswa", max: 20 },
    ],
  },
  {
    id: "advancedBlockchainSimulator",
    number: "11",
    title: "Advanced Blockchain Simulator",
    subtitle: "Genesis block, validation, dan tampering detection",
    type: "Formatif",
    weight: 4,
    jp: 2,
    color: "#06d6a0",
    criteria: [
      { id: "chain", label: "Memiliki genesis block dan minimal tiga blok berikutnya", max: 20 },
      { id: "link", label: "Blok terhubung melalui previous hash", max: 20 },
      { id: "data", label: "Transaction, timestamp, index, dan hash dicatat", max: 20 },
      { id: "validation", label: "Perubahan data dapat terdeteksi sebagai rantai tidak valid", max: 20 },
      { id: "ownership", label: "Simulator berfungsi dan dijelaskan dengan kalimat lengkap sebagai versi siswa", max: 20 },
    ],
  },
  {
    id: "cryptocurrencyWallet",
    number: "12",
    title: "Cryptocurrency Wallet",
    subtitle: "Saldo, transaksi, dan riwayat wallet simulasi",
    type: "Formatif",
    weight: 4,
    jp: 2,
    color: "#4cc9f0",
    criteria: [
      { id: "identity", label: "Wallet memiliki address, owner, dan balance simulasi", max: 20 },
      { id: "transfer", label: "Fitur mengirim dan menerima aset simulasi berfungsi", max: 20 },
      { id: "validation", label: "Program memvalidasi jumlah dan saldo transaksi", max: 20 },
      { id: "history", label: "Riwayat transaksi dapat ditampilkan", max: 20 },
      { id: "ownership", label: "Kode merupakan versi siswa, dijelaskan dengan kalimat lengkap, dan tidak memakai kredensial nyata", max: 20 },
    ],
  },
  {
    id: "nftArtGallery",
    number: "13",
    title: "Summative: NFT Art Gallery",
    subtitle: "Galeri NFT, simulated minting, blockchain, dan wallet",
    type: "Sumatif",
    weight: 60,
    jp: 2,
    color: "#c77dff",
    criteria: [
      { id: "function", label: "Website galeri dan integrasi fitur utama berfungsi", max: 25 },
      { id: "concept", label: "Konsep Web3, blockchain, hash, wallet, dan NFT diterapkan dengan tepat", max: 20 },
      { id: "code", label: "Struktur dan kualitas kode mendukung produk yang stabil", max: 17 },
      { id: "design", label: "Desain visual rapi, konsisten, dan mudah digunakan", max: 13 },
      { id: "original", label: "Minimal tiga karya, isi, dan pengembangan produk merupakan versi siswa sendiri", max: 13 },
      { id: "documentation", label: "Metadata, sumber, refleksi, dan presentasi ditulis dengan kalimat lengkap", max: 12 },
    ],
  },
];

function g12Q2Project({ id, number, title, subtitle, weight, jp, color, target, technical }) {
  return {
    id,
    number,
    title,
    subtitle,
    type: "Formatif",
    weight,
    jp,
    color,
    criteria: [
      { id: "target", label: target, max: 35 },
      { id: "technical", label: technical, max: 25 },
      { id: "ownership", label: "Konten, tema, data, dan tampilan dikembangkan sebagai versi siswa sendiri, bukan salinan template", max: 20 },
      { id: "communication", label: "Judul, deskripsi, isi, komentar atau refleksi ditulis dengan kalimat lengkap dan kata-kata sendiri", max: 10 },
      { id: "evidence", label: "Tautan berfungsi serta bukti pengerjaan, pengujian, dan perbaikan tersedia", max: 10 },
    ],
  };
}

const G12_Q2_ASSESSMENTS = [
  g12Q2Project({
    id: "bootstrapIntroduction",
    number: "01",
    title: "Introduction to Bootstrap",
    subtitle: "Container, grid, dan komponen Bootstrap",
    type: "Formatif",
    weight: 1,
    jp: 1,
    color: "#73d31d",
    target: "Container, grid, dan komponen Bootstrap tampil dan berfungsi sesuai tujuan halaman",
    technical: "Class Bootstrap digunakan dengan benar tanpa merusak struktur HTML",
  }),
  g12Q2Project({
    id: "bootstrapRestaurantHome",
    number: "02",
    title: "Bootstrap - Restaurant Home Page",
    subtitle: "Website restoran responsif",
    weight: 2,
    jp: 2,
    color: "#11bfb6",
    target: "Navbar, hero, menu atau card, dan bagian informasi restoran tampil lengkap serta responsif",
    technical: "Bootstrap grid, spacing, typography, dan komponen digunakan secara konsisten",
  }),
  g12Q2Project({
    id: "reviewJavascriptChatbot",
    number: "03",
    title: "Review - JavaScript Chatbot",
    subtitle: "Input, event, respons, dan kondisi",
    weight: 1,
    jp: 0.5,
    color: "#f0b81b",
    target: "Chatbot menerima input dan menampilkan respons yang relevan melalui interaksi pengguna",
    technical: "Event dan conditional JavaScript berjalan tanpa error pada skenario utama",
  }),
  g12Q2Project({
    id: "reviewCarrotPicker",
    number: "04",
    title: "Review - Carrot Picker",
    subtitle: "Game klik, objek, dan sistem poin",
    weight: 1,
    jp: 0.5,
    color: "#ef6a54",
    target: "Game memiliki judul, deskripsi, minimal tiga objek yang dapat diklik, dan sistem poin yang bekerja",
    technical: "Event onclick, pembaruan skor, gambar foreground, dan perubahan tema diterapkan dengan benar",
  }),
  g12Q2Project({
    id: "paperArt",
    number: "05",
    title: "Paper Art",
    subtitle: "Review HTML, CSS, dan interaksi JavaScript",
    weight: 1,
    jp: 1,
    color: "#8b6cf0",
    target: "Komposisi paper art tampil lengkap dan memiliki interaksi yang dapat digunakan",
    technical: "Struktur HTML, styling CSS, dan JavaScript terhubung serta berjalan tanpa error",
  }),
  g12Q2Project({
    id: "cssImageCard",
    number: "06",
    title: "CSS - Image Card",
    subtitle: "Selector, spacing, gambar, dan typography",
    weight: 1,
    jp: 0.5,
    color: "#2f9ee5",
    target: "Image card memuat gambar, judul, deskripsi, dan tata letak yang terbaca",
    technical: "Selector, border, margin, padding, warna, dan typography CSS diterapkan tepat",
  }),
  g12Q2Project({
    id: "cssWebsiteLayout",
    number: "07",
    title: "CSS - Website Layout",
    subtitle: "Struktur dan tata letak halaman",
    weight: 1,
    jp: 0.5,
    color: "#e45da9",
    target: "Header, navigasi, konten utama, section, dan footer tersusun rapi",
    technical: "Display, width, spacing, alignment, dan selector CSS membentuk layout yang konsisten",
  }),
  g12Q2Project({
    id: "cssGalleryWebsite",
    number: "08",
    title: "CSS - Gallery Website",
    subtitle: "Galeri gambar dengan layout konsisten",
    weight: 1,
    jp: 0.5,
    color: "#70d6a9",
    target: "Galeri menampilkan koleksi gambar, caption, dan navigasi yang jelas",
    technical: "Ukuran gambar, grid atau layout, gap, dan visual state ditata konsisten dengan CSS",
  }),
  g12Q2Project({
    id: "cssFlexboxLayout",
    number: "09",
    title: "CSS - Flexbox Layout",
    subtitle: "Flex container dan alignment",
    weight: 1,
    jp: 0.5,
    color: "#f49d37",
    target: "Elemen halaman tersusun sesuai rancangan menggunakan Flexbox",
    technical: "Flex direction, justify-content, align-items, wrap, dan gap digunakan dengan tepat",
  }),
  g12Q2Project({
    id: "responsiveMediaQueries",
    number: "10",
    title: "CSS - Responsive Website using Media Queries",
    subtitle: "Tampilan desktop dan perangkat kecil",
    weight: 1,
    jp: 1,
    color: "#ffd166",
    target: "Website tetap terbaca dan dapat digunakan pada ukuran desktop, tablet, dan ponsel",
    technical: "Media query, breakpoint, ukuran elemen, dan perubahan layout bekerja sesuai viewport",
  }),
  g12Q2Project({
    id: "javascriptFundamentals",
    number: "11",
    title: "JavaScript - Fundamentals",
    subtitle: "Variabel, event, input, dan output",
    weight: 0.75,
    jp: 0.5,
    color: "#06d6a0",
    target: "Program menerima input atau event dan menghasilkan output yang benar",
    technical: "Variabel, tipe data, operator, dan statement JavaScript digunakan tepat",
  }),
  g12Q2Project({
    id: "javascriptConditionals",
    number: "12",
    title: "JavaScript - Conditional Statements",
    subtitle: "Keputusan dengan if, else if, dan else",
    weight: 0.75,
    jp: 0.5,
    color: "#4cc9f0",
    target: "Program menghasilkan keputusan yang benar untuk seluruh kondisi yang diuji",
    technical: "Struktur if, else if, dan else ditulis logis serta tidak memiliki kondisi yang bertabrakan",
  }),
  g12Q2Project({
    id: "javascriptLogicalOperators",
    number: "13",
    title: "JavaScript - Comparison and Logical Operators",
    subtitle: "Perbandingan dan kombinasi kondisi",
    weight: 0.75,
    jp: 0.5,
    color: "#c77dff",
    target: "Program membandingkan nilai dan memberi hasil benar pada beberapa skenario",
    technical: "Operator perbandingan serta AND, OR, atau NOT digunakan sesuai kebutuhan",
  }),
  g12Q2Project({
    id: "javascriptFunctions",
    number: "14",
    title: "JavaScript - Functions",
    subtitle: "Fungsi, parameter, return, dan reuse",
    weight: 0.75,
    jp: 0.5,
    color: "#73d31d",
    target: "Fungsi dapat dipanggil ulang dan memberikan hasil sesuai input",
    technical: "Function, parameter, argument, return value, dan scope digunakan dengan benar",
  }),
  g12Q2Project({
    id: "javascriptArraysMethods",
    number: "15",
    title: "JavaScript - Arrays and Methods",
    subtitle: "Penyimpanan dan pengolahan kumpulan data",
    weight: 0.75,
    jp: 0.5,
    color: "#11bfb6",
    target: "Data tersimpan dalam array dan dapat ditambah, diubah, dicari, atau ditampilkan",
    technical: "Index dan array methods yang relevan digunakan dengan hasil yang benar",
  }),
  g12Q2Project({
    id: "javascriptLoops",
    number: "16",
    title: "JavaScript - Loops",
    subtitle: "Iterasi data dan elemen",
    weight: 0.75,
    jp: 0.5,
    color: "#f0b81b",
    target: "Perulangan memproses seluruh data atau elemen dan menghasilkan output lengkap",
    technical: "Loop memiliki kondisi berhenti yang benar dan tidak menghasilkan duplikasi atau infinite loop",
  }),
  g12Q2Project({
    id: "javascriptDomManipulation",
    number: "17",
    title: "JavaScript - Manipulate HTML and CSS",
    subtitle: "DOM, konten, class, dan style",
    weight: 1.5,
    jp: 1,
    color: "#ef6a54",
    target: "Interaksi pengguna dapat mengubah konten, elemen, class, atau style pada halaman",
    technical: "DOM selection, event listener, property, dan method manipulasi digunakan aman dan tepat",
  }),
  g12Q2Project({
    id: "javascriptTodoList",
    number: "18",
    title: "JavaScript - To-Do List",
    subtitle: "Tambah, tampilkan, ubah status, dan hapus tugas",
    weight: 2,
    jp: 2,
    color: "#8b6cf0",
    target: "Pengguna dapat menambah, melihat, memperbarui status, dan menghapus tugas",
    technical: "Array atau object, function, event, DOM update, dan validasi input terintegrasi dengan benar",
  }),
  g12Q2Project({
    id: "bsdDatabaseIntroduction",
    number: "19",
    title: "Introduction to the BSD Database",
    subtitle: "Membuat, menyimpan, dan membaca data",
    weight: 1.5,
    jp: 1,
    color: "#2f9ee5",
    target: "Database dibuat dan contoh data dapat disimpan serta dibaca kembali",
    technical: "Key, value atau object dan operasi database dasar digunakan dengan struktur yang tepat",
  }),
  g12Q2Project({
    id: "expenseTrackingDatabase",
    number: "20",
    title: "Expense-Tracking Web App with BSD Database",
    subtitle: "Penyimpanan, daftar, total, dan penghapusan pengeluaran",
    weight: 2.5,
    jp: 3,
    color: "#e45da9",
    target: "Pengeluaran dapat disimpan, ditampilkan, dijumlahkan, dan dihapus melalui antarmuka",
    technical: "Alur saveExpense(), showAllExpenses(), singleExpense(), deleteExpense(), key-value, dan update total bekerja benar",
  }),
  g12Q2Project({
    id: "newsWebsiteDatabase",
    number: "21",
    title: "Assignment 2: News Website using the BSD DB",
    subtitle: "Konten berita dinamis dari database",
    weight: 4,
    jp: 4,
    color: "#70d6a9",
    target: "Website menampilkan beberapa berita lengkap dengan judul, isi, gambar, kategori, dan tanggal dari database",
    technical: "Data berita disimpan, diambil, diulang, dan dirender ke DOM dengan struktur yang konsisten",
  }),
  g12Q2Project({
    id: "ecommerceUserInterface",
    number: "22",
    title: "E-Commerce Website - User Interface",
    subtitle: "Navigasi, katalog, dan informasi produk",
    weight: 1.5,
    jp: 2,
    color: "#f49d37",
    target: "Antarmuka memiliki navigasi, katalog produk, informasi penting, dan call-to-action yang jelas",
    technical: "HTML, CSS, Bootstrap, responsive layout, dan komponen UI tersusun konsisten",
  }),
  g12Q2Project({
    id: "ecommerceDatabaseIntegration",
    number: "23",
    title: "E-Commerce Website - Database Integration",
    subtitle: "Produk dinamis dari database",
    weight: 1.5,
    jp: 2,
    color: "#ffd166",
    target: "Produk dari database tampil lengkap dan perubahan data tercermin pada halaman",
    technical: "Koneksi database, struktur object produk, pembacaan data, dan DOM rendering bekerja benar",
  }),
  g12Q2Project({
    id: "ecommerceProductModal",
    number: "24",
    title: "E-Commerce Website - Product Modal Window",
    subtitle: "Detail produk dalam modal",
    weight: 1,
    jp: 1,
    color: "#06d6a0",
    target: "Modal menampilkan produk yang dipilih dan dapat dibuka serta ditutup dengan benar",
    technical: "Event, id produk, pengambilan data, state modal, dan konten dinamis digunakan tepat",
  }),
  g12Q2Project({
    id: "ecommerceShoppingCart",
    number: "25",
    title: "E-Commerce Website - Shopping Cart",
    subtitle: "Keranjang, jumlah barang, dan total harga",
    weight: 1.5,
    jp: 2,
    color: "#4cc9f0",
    target: "Pengguna dapat menambah, mengubah jumlah, menghapus produk, dan melihat total harga",
    technical: "Array atau object cart, event, perhitungan kuantitas, subtotal, dan render ulang berjalan akurat",
  }),
  g12Q2Project({
    id: "ecommerceCheckout",
    number: "26",
    title: "E-Commerce Website - Checkout Process",
    subtitle: "Validasi data dan ringkasan pesanan",
    weight: 1.5,
    jp: 2,
    color: "#c77dff",
    target: "Checkout memuat data pelanggan, ringkasan pesanan, total, dan konfirmasi simulasi",
    technical: "Form validation, pengambilan cart, pembuatan order, dan feedback berhasil atau gagal bekerja benar",
  }),
  g12Q2Project({
    id: "ecommerceBackendInterface",
    number: "27",
    title: "E-Commerce Website - Backend User Interface",
    subtitle: "Dashboard pengelolaan toko",
    weight: 1,
    jp: 1,
    color: "#73d31d",
    target: "Dashboard menyediakan navigasi jelas menuju pengelolaan produk dan pesanan",
    technical: "Struktur halaman admin, state aktif, layout, dan pemisahan fitur tersusun konsisten",
  }),
  g12Q2Project({
    id: "ecommerceUserOrders",
    number: "28",
    title: "E-Commerce Website - Backend - User Orders",
    subtitle: "Penyimpanan dan tampilan pesanan",
    weight: 1.5,
    jp: 2,
    color: "#11bfb6",
    target: "Pesanan pelanggan tersimpan dan dapat ditampilkan lengkap pada dashboard",
    technical: "Struktur order, relasi item, total, identitas simulasi, timestamp, dan pembacaan database bekerja benar",
  }),
  g12Q2Project({
    id: "ecommerceShowProducts",
    number: "29",
    title: "E-Commerce Website - Backend - Show Products",
    subtitle: "Daftar produk pada halaman admin",
    weight: 1,
    jp: 1,
    color: "#f0b81b",
    target: "Seluruh produk database tampil pada halaman admin dengan informasi yang diperlukan",
    technical: "Loop data, key produk, DOM rendering, dan penanganan data kosong diterapkan tepat",
  }),
  g12Q2Project({
    id: "ecommerceEditProducts",
    number: "30",
    title: "E-Commerce Website - Backend - Edit Products",
    subtitle: "Memperbarui data produk",
    weight: 1.5,
    jp: 1.5,
    color: "#ef6a54",
    target: "Produk yang dipilih dapat diedit dan perubahan tampil pada katalog serta dashboard",
    technical: "Form terisi dari data lama, validasi berjalan, dan update database memakai key yang benar",
  }),
  g12Q2Project({
    id: "ecommerceNewProduct",
    number: "31",
    title: "E-Commerce Website - Backend - New Product",
    subtitle: "Menambahkan produk baru",
    weight: 1,
    jp: 1.5,
    color: "#8b6cf0",
    target: "Produk baru dengan data lengkap dapat ditambahkan dan langsung muncul pada website",
    technical: "Form validation, object produk, penyimpanan database, key unik, dan feedback pengguna bekerja benar",
  }),
  {
    id: "finalEcommerceWebsite",
    number: "32",
    title: "Summative: Final E-Commerce Website",
    subtitle: "Website e-commerce terintegrasi, responsif, dan berkelanjutan",
    type: "Sumatif",
    weight: 60,
    color: "#c77dff",
    criteria: [
      { id: "customerFlow", label: "Alur pengguna dari katalog, detail produk, shopping cart, hingga checkout berfungsi penuh", max: 25 },
      { id: "databaseBackend", label: "Database dan backend mendukung tambah, tampilkan, edit produk, serta penyimpanan pesanan", max: 20 },
      { id: "design", label: "UI, UX, navigasi, keterbacaan, dan responsive design konsisten pada berbagai ukuran layar", max: 15 },
      { id: "sustainability", label: "Konsep bisnis e-commerce dan keberlanjutan digital dijelaskan serta diterapkan secara relevan", max: 15 },
      { id: "ownership", label: "Identitas visual, produk, konten, data, dan pengembangan website merupakan versi siswa sendiri", max: 15 },
      { id: "documentation", label: "Presentasi, dokumentasi proses, pengujian, sumber, dan refleksi ditulis dengan kalimat lengkap", max: 10 },
    ],
  },
];

const G12_Q3_ASSESSMENTS = [
  g12Q2Project({
    id: "distanceDriveChallenge",
    number: "01",
    title: "Distance Drive Challenge",
    subtitle: "Jarak, putaran, pola gerak, dan perhitungan area",
    weight: 4,
    jp: 2,
    color: "#73d31d",
    target: "VR Robot menyelesaikan gerak tiga dan enam grid, kembali ke titik awal, serta membentuk lintasan persegi",
    technical: "Jarak, arah, putaran 180 derajat, ukuran grid, total perjalanan, dan perhitungan area digunakan dengan benar",
  }),
  g12Q2Project({
    id: "basketballDrills",
    number: "02",
    title: "Basketball Drills",
    subtitle: "Pola gerak maju-kembali dan loop",
    weight: 4,
    jp: 2,
    color: "#11bfb6",
    target: "VR Robot menjalankan pola maju, kembali, dan urutan satu sampai delapan grid secara konsisten",
    technical: "Drive, turn, repeat atau loop digunakan untuk menghasilkan algoritma yang tepat dan ringkas",
  }),
  g12Q2Project({
    id: "robotSoccer",
    number: "03",
    title: "Robot Soccer",
    subtitle: "Controller, Clawbot, passing, dan scoring",
    weight: 5,
    jp: 2,
    color: "#f0b81b",
    target: "Clawbot dapat mengambil, membawa, mengoper, dan mencetak objek dalam permainan Robot Soccer",
    technical: "Controller, drivetrain, mekanisme pengambil objek, dan strategi pergerakan digunakan dengan aman serta efektif",
  }),
  g12Q2Project({
    id: "buckyBasketball",
    number: "04",
    title: "Bucky Basketball",
    subtitle: "CatapultBot, pengambilan, dan akurasi tembakan",
    weight: 5,
    jp: 2,
    color: "#ef6a54",
    target: "CatapultBot dapat mengambil Buckyball dan menembakkannya ke target dengan hasil yang dapat diulang",
    technical: "Intake, catapult, controller, sudut, jarak, dan kekuatan tembakan diuji serta disesuaikan dengan tepat",
  }),
  g12Q2Project({
    id: "ringLeader",
    number: "05",
    title: "Ring Leader",
    subtitle: "Driver control dan autonomous scoring",
    weight: 6,
    jp: 2,
    color: "#8b6cf0",
    target: "Clawbot mencetak ring pada post yang berbeda menggunakan driver control dan autonomous control",
    technical: "Program autonomous, controller, sensor atau mekanisme, dan strategi skor bekerja sebagai satu sistem",
  }),
  g12Q2Project({
    id: "flowerGarden",
    number: "06",
    title: "VEXcode VR Activity: Flower Garden",
    subtitle: "Loop, variabel, My Block, dan VR Pen",
    weight: 4,
    jp: 2,
    color: "#2f9ee5",
    target: "VR Robot menggambar minimal tiga bunga dengan ukuran dan warna berbeda pada Art Canvas+",
    technical: "Loop, variabel, My Block, pen color, pen width, dan pola geometri digunakan secara efisien",
  }),
  g12Q2Project({
    id: "coralReefCleanup",
    number: "07",
    title: "VEXcode VR Activity: Coral Reef Cleanup",
    subtitle: "Eye Sensor, energi, kecepatan, dan pengumpulan sampah",
    weight: 6,
    jp: 2,
    color: "#e45da9",
    target: "VR Ocean Cleaning Robot mengumpulkan sampah sebanyak mungkin tanpa menabrak terumbu sebelum baterai habis",
    technical: "Eye Sensor, wait until, drive velocity, pergerakan, batas area, dan strategi penggunaan baterai diterapkan tepat",
  }),
  g12Q2Project({
    id: "crashTheCastleVr",
    number: "08",
    title: "VEXcode VR Activity: Crash the Castle",
    subtitle: "Algoritma adaptif, sensor, koordinat, dan timer",
    weight: 6,
    jp: 2,
    color: "#70d6a9",
    target: "VR Robot menjatuhkan seluruh bangunan pada beberapa layout kastel tanpa jatuh dari playground",
    technical: "Distance Sensor, Down Eye, koordinat, deteksi warna, timer, dan algoritma adaptif digunakan dengan benar",
  }),
  {
    id: "platformPlacerSummative",
    number: "09",
    title: "Summative Q3: Platform Placer Competition",
    subtitle: "Clawbot, manipulator, strategi skor, dan kerja tim",
    type: "Sumatif",
    weight: 60,
    jp: 2,
    color: "#c77dff",
    criteria: [
      { id: "robot", label: "Clawbot, drivetrain, dan manipulator berfungsi stabil serta aman selama challenge", max: 20 },
      { id: "control", label: "Strategi kontrol dan pergerakan memungkinkan robot mengambil serta membawa objek secara efektif", max: 20 },
      { id: "scoring", label: "Robot menempatkan ring atau Buckyball pada platform dengan akurat dan menghasilkan skor", max: 20 },
      { id: "iteration", label: "Tim menunjukkan pengujian, pencatatan masalah, perubahan desain, dan peningkatan performa", max: 15 },
      { id: "ownership", label: "Strategi, kontribusi, dan solusi teknis menunjukkan pekerjaan versi siswa dan tim sendiri", max: 15 },
      { id: "documentation", label: "Engineering log, pembagian peran, hasil, dan refleksi ditulis menggunakan kalimat lengkap", max: 10 },
    ],
  },
];

const G12_Q4_ASSESSMENTS = [
  g12Q2Project({
    id: "clearEnclosureWalls",
    number: "01",
    title: "VEXcode VR Activity: Clear the Enclosure Walls",
    subtitle: "Down Eye, Distance Sensor, dan autonomous clearing",
    weight: 5,
    jp: 2,
    color: "#73d31d",
    target: "VR Robot membersihkan sebanyak mungkin dinding enclosure tanpa menabrak kastel atau jatuh ke air",
    technical: "Front Distance Sensor, Down Eye, deteksi objek, batas merah, arah hexagon, dan batas waktu digunakan tepat",
  }),
  g12Q2Project({
    id: "upAndOverPart1",
    number: "02",
    title: "Up and Over - Part 1",
    subtitle: "Desain dasar Clawbot dan pemindahan Buckyball",
    weight: 3,
    jp: 2,
    color: "#11bfb6",
    target: "Clawbot dapat mengambil, mengangkat, membawa, dan melepaskan Buckyball ke sisi lain field",
    technical: "Drivetrain, claw atau manipulator, urutan kontrol, dan batas mekanis digunakan dengan aman",
  }),
  g12Q2Project({
    id: "upAndOverPart2",
    number: "03",
    title: "Up and Over - Part 2",
    subtitle: "Peningkatan mekanisme dan konsistensi kontrol",
    weight: 4,
    jp: 2,
    color: "#f0b81b",
    target: "Robot memindahkan beberapa Buckyball dengan waktu dan tingkat keberhasilan yang lebih baik",
    technical: "Desain manipulator, kecepatan, urutan gerak, driver control, dan hasil pengujian diperbaiki berdasarkan data",
  }),
  g12Q2Project({
    id: "upAndOverPart3",
    number: "04",
    title: "Up and Over - Part 3",
    subtitle: "Up and Over Competition Challenge",
    weight: 5,
    jp: 2,
    color: "#ef6a54",
    target: "Robot menyelesaikan competition challenge dengan strategi skor dan performa yang konsisten",
    technical: "Mekanisme, kontrol, waktu, penempatan objek, pembagian peran, dan strategi pertandingan terintegrasi baik",
  }),
  g12Q2Project({
    id: "diskColorMaze",
    number: "05",
    title: "VEXcode VR Activity: Disk Color Maze",
    subtitle: "Eye Sensor, warna, loop, timer, dan path tracing",
    weight: 5,
    jp: 2,
    color: "#8b6cf0",
    target: "VR Robot mencapai finish dan kembali ke start dengan membaca warna disk atau lantai",
    technical: "Front Eye, Down Eye, forever loop, kondisi warna, timer, turn, dan VR Pen digunakan tepat",
  }),
  g12Q2Project({
    id: "castleCrasherPart1",
    number: "06",
    title: "Castle Crasher - Part 1",
    subtitle: "Optical dan Distance Sensor dasar",
    weight: 3,
    jp: 2,
    color: "#2f9ee5",
    target: "BaseBot menemukan, mendekati, dan menjatuhkan target kastel menggunakan sensor",
    technical: "Optical Sensor, Distance Sensor, drivetrain, threshold, dan urutan pencarian digunakan dengan benar",
  }),
  g12Q2Project({
    id: "castleCrasherPart2",
    number: "07",
    title: "Castle Crasher - Part 2",
    subtitle: "Navigasi, sensor, dan efisiensi autonomous",
    weight: 4,
    jp: 2,
    color: "#e45da9",
    target: "Robot membersihkan lebih banyak target dengan navigasi dan akurasi sensor yang meningkat",
    technical: "Kondisi, loop, pembacaan sensor, koreksi arah, dan urutan autonomous disempurnakan dari hasil uji",
  }),
  g12Q2Project({
    id: "castleCrasherPart3",
    number: "08",
    title: "Castle Crasher - Part 3",
    subtitle: "Castle Crasher Competition Challenge",
    weight: 5,
    jp: 2,
    color: "#70d6a9",
    target: "Robot menyelesaikan competition challenge dengan skor, waktu, dan konsistensi terbaik",
    technical: "Sensor fusion, autonomous flow, optimasi jalur, recovery, dan strategi kompetisi terintegrasi baik",
  }),
  g12Q2Project({
    id: "encodedMessage",
    number: "09",
    title: "VEXcode VR Activity: Encoded Message",
    subtitle: "Sensor warna, list, binary, decimal, dan ASCII",
    weight: 6,
    jp: 2,
    color: "#f49d37",
    target: "VR Robot membaca seluruh kolom warna dan menampilkan binary, decimal, serta pesan ASCII yang benar",
    technical: "Down Eye Sensor, loop, list atau array, bit, byte, konversi binary-decimal, dan ASCII digunakan tepat",
  }),
  {
    id: "mazeSolverSummative",
    number: "10",
    title: "Summative Q4: Autonomous Maze Solver",
    subtitle: "Multi-sensor navigation dari berbagai titik awal",
    type: "Sumatif",
    weight: 60,
    jp: 2,
    color: "#4cc9f0",
    criteria: [
      { id: "navigation", label: "VR Robot mencapai red square tanpa menabrak dinding dari titik awal yang ditentukan", max: 30 },
      { id: "sensors", label: "Front, Left, Right Distance Sensor dan Down Eye digunakan sesuai kebutuhan navigasi", max: 20 },
      { id: "adaptability", label: "Algoritma dapat bekerja dari beberapa titik awal tanpa modifikasi program", max: 15 },
      { id: "logic", label: "Loop, kondisi, workflow, wall-following, dan keputusan arah tersusun efisien serta stabil", max: 15 },
      { id: "testing", label: "Bukti pengujian menunjukkan waktu, kegagalan, perbaikan, dan peningkatan performa", max: 10 },
      { id: "ownership", label: "Kode, strategi, penjelasan, dan engineering log merupakan versi siswa serta ditulis dengan kalimat lengkap", max: 10 },
    ],
  },
];

const DC_COURSES = {
  1: {
    id: "technologyAndMe",
    grade: 9,
    quarter: 1,
    title: "Assessment Technology and Me",
    shortTitle: "Technology and Me",
    description: "Digital Citizenship · Formatif 40% dan sumatif 60%.",
    assessments: DC_Q1_ASSESSMENTS,
    finalQuiz: DC_Q1_FINAL_QUIZ,
  },
  2: {
    id: "codeYourOwnWorldVr",
    grade: 9,
    quarter: 2,
    title: "Code Your Own World with VR",
    shortTitle: "Code Your Own World with VR",
    description: "Construct a VR World · Formatif 40% dan sumatif 60%.",
    assessments: DC_Q2_ASSESSMENTS,
    finalQuiz: null,
  },
  3: {
    id: "buildSenseCompeteVexIq",
    grade: 9,
    quarter: 3,
    title: "Build, Sense, and Compete with VEX IQ",
    shortTitle: "VEX IQ Team Freeze Tag",
    description: "VEX IQ Robotics · Formatif 40% dan sumatif 60%.",
    assessments: DC_Q3_ASSESSMENTS,
    finalQuiz: null,
  },
  4: {
    id: "senseDecideDeliverVexIq",
    grade: 9,
    quarter: 4,
    title: "Sense, Decide, and Deliver with VEX IQ",
    shortTitle: "Smart Warehouse Clawbot",
    description: "Advanced VEX IQ Robotics · Formatif 40% dan sumatif 60%.",
    assessments: DC_Q4_ASSESSMENTS,
    finalQuiz: null,
  },
};

const G8_COURSES = {
  1: {
    id: "digitalCitizenshipFoundations",
    grade: 8,
    quarter: 1,
    title: "Digital Citizenship Foundations",
    shortTitle: "Digital Citizenship",
    description:
      "Grade 8 | Q1 | Personal information, online safety, digital footprint, and evaluating information | Formatif 40% dan sumatif 60%.",
    assessments: G8_Q1_ASSESSMENTS,
    finalQuiz: G8_Q1_FINAL_QUIZ,
  },
};

const G12_COURSES = {
  1: {
    id: "web3BlockchainNft",
    grade: 12,
    quarter: 1,
    title: "Assessment Web3, Blockchain, and NFT",
    shortTitle: "Web3, Blockchain, and NFT",
    description: "Kelas 12 | 22 JP | 11 pertemuan | Formatif 40% dan sumatif 60%.",
    assessments: G12_Q1_ASSESSMENTS,
    finalQuiz: null,
  },
  2: {
    id: "buildEcommerceWebsite",
    grade: 12,
    quarter: 2,
    title: "Assessment Build an E-Commerce Website",
    shortTitle: "Build an E-Commerce Website",
    description: "Kelas 12 | 38 JP | 19 pertemuan | 31 proyek formatif 40% dan sumatif 60%.",
    assessments: G12_Q2_ASSESSMENTS,
    finalQuiz: null,
  },
  3: {
    id: "robotControlCompetition",
    grade: 12,
    quarter: 3,
    title: "Assessment Robot Control and Competition",
    shortTitle: "Robot Control and Competition",
    description: "Kelas 12 | 18 JP | 9 pertemuan | 8 proyek formatif 40% dan sumatif 60%.",
    assessments: G12_Q3_ASSESSMENTS,
    finalQuiz: null,
  },
  4: {
    id: "autonomousSensorsData",
    grade: 12,
    quarter: 4,
    title: "Assessment Autonomous Sensors and Data",
    shortTitle: "Autonomous Sensors and Data",
    description: "Kelas 12 | 20 JP | 10 pertemuan | 9 proyek formatif 40% dan sumatif 60%.",
    assessments: G12_Q4_ASSESSMENTS,
    finalQuiz: null,
  },
};

const DC_COURSES_BY_GRADE = {
  8: G8_COURSES,
  9: DC_COURSES,
  12: G12_COURSES,
};

// Alias lama dipertahankan agar data dan kode Q1 tetap kompatibel.
const DC_ASSESSMENTS = DC_Q1_ASSESSMENTS;
const DC_FINAL_QUIZ = DC_Q1_FINAL_QUIZ;

function dcGetCourseConfig(quarter, grade = 9) {
  return DC_COURSES_BY_GRADE[Number(grade)]?.[Number(quarter)] || null;
}

function dcGetAssessmentItems(quarter, grade = 9) {
  const course = dcGetCourseConfig(quarter, grade);
  if (!course) return [];
  return course.finalQuiz
    ? [...course.assessments, course.finalQuiz]
    : [...course.assessments];
}

function dcClampScore(value, maximum) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(maximum, Math.max(0, number));
}

function dcFormatOneDecimal(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "0.0";
  return (Math.round((number + Number.EPSILON) * 10) / 10).toFixed(1);
}

function dcCreateEmptyDraft(quarter = 1, grade = 9) {
  const course = dcGetCourseConfig(quarter, grade);
  const rubricScores = {};
  (course?.assessments || []).forEach((assessment) => {
    rubricScores[assessment.id] = {
      criteria: Object.fromEntries(
        assessment.criteria.map((criterion) => [criterion.id, 0]),
      ),
      note: "",
    };
  });
  return {
    rubricScores,
    quizAnswers: course?.finalQuiz ? Array(25).fill(false) : [],
    quizNote: "",
  };
}

function dcDraftFromStored(stored, quarter = 1, grade = 9) {
  const course = dcGetCourseConfig(quarter, grade);
  const draft = dcCreateEmptyDraft(quarter, grade);
  if (!course || !stored || typeof stored !== "object") return draft;

  course.assessments.forEach((assessment) => {
    const savedAssessment = stored.rubricScores?.[assessment.id] || {};
    assessment.criteria.forEach((criterion) => {
      draft.rubricScores[assessment.id].criteria[criterion.id] = dcClampScore(
        savedAssessment.criteria?.[criterion.id],
        criterion.max,
      );
    });
    draft.rubricScores[assessment.id].note = String(savedAssessment.note || "");
  });

  if (course.finalQuiz && Array.isArray(stored.quizAnswers)) {
    draft.quizAnswers = Array.from(
      { length: 25 },
      (_, index) => stored.quizAnswers[index] === true,
    );
  }
  draft.quizNote = String(stored.quizNote || "");
  return draft;
}

function dcCalculateSummary(draft, quarter = 1, grade = 9) {
  const course = dcGetCourseConfig(quarter, grade);
  const rawScores = {};
  const contributions = {};
  let formative = 0;
  let summative = 0;

  if (!course) {
    return { rawScores, contributions, quizCorrect: 0, formative: 0, summative: 0, finalScore: 0 };
  }

  course.assessments.forEach((assessment) => {
    const assessmentDraft = draft.rubricScores?.[assessment.id] || {};
    const raw = assessment.criteria.reduce(
      (total, criterion) =>
        total + dcClampScore(assessmentDraft.criteria?.[criterion.id], criterion.max),
      0,
    );
    const contribution = (raw * assessment.weight) / 100;
    rawScores[assessment.id] = raw;
    contributions[assessment.id] = contribution;
    if (assessment.type === "Formatif") formative += contribution;
    else summative += contribution;
  });

  let quizCorrect = 0;
  if (course.finalQuiz) {
    quizCorrect = Array.isArray(draft.quizAnswers)
      ? draft.quizAnswers.filter(Boolean).length
      : 0;
    const quizRaw = quizCorrect * 4;
    const quizContribution = (quizRaw * course.finalQuiz.weight) / 100;
    rawScores[course.finalQuiz.id] = quizRaw;
    contributions[course.finalQuiz.id] = quizContribution;
    summative += quizContribution;
  }

  return {
    rawScores,
    contributions,
    quizCorrect,
    formative: Number(formative.toFixed(2)),
    summative: Number(summative.toFixed(2)),
    finalScore: Number((formative + summative).toFixed(2)),
  };
}

function dcBuildStoredRecord(draft, quarter, updatedBy, grade = 9) {
  const course = dcGetCourseConfig(quarter, grade);
  const summary = dcCalculateSummary(draft, quarter, grade);
  const record = {
    period: `Q${quarter}`,
    grade: Number(grade),
    courseId: course?.id || "",
    courseTitle: course?.title || "",
    rubricScores: draft.rubricScores,
    rawScores: summary.rawScores,
    contributions: summary.contributions,
    formativeScore: summary.formative,
    summativeScore: summary.summative,
    finalScore: summary.finalScore,
    updatedAt: Date.now(),
    updatedBy: String(updatedBy || ""),
  };
  if (course?.finalQuiz) {
    record.quizAnswers = draft.quizAnswers;
    record.quizNote = draft.quizNote;
    record.quizCorrect = summary.quizCorrect;
  }
  return record;
}

function dcScoreStatus(score, kkm) {
  if (!Number.isFinite(Number(score))) return "Belum dinilai";
  return Number(score) >= Number(kkm || 0) ? "Tuntas" : "Perlu tindak lanjut";
}

function dcIsGradeNine(className) {
  return dcGetGradeLevel(className) === 9;
}

function dcGetGradeLevel(className) {
  const gradeMatch = String(className || "").match(/\d+/);
  return gradeMatch ? Number(gradeMatch[0]) : 0;
}

function dcIsAssessmentGrade(className, grade) {
  return dcGetGradeLevel(className) === Number(grade);
}

function dcBuildStudentRubricCard(assessment, draft, summary) {
  const raw = summary.rawScores[assessment.id] || 0;
  const contribution = summary.contributions[assessment.id] || 0;
  const savedAssessment = draft.rubricScores[assessment.id];
  const criteriaHtml = assessment.criteria
    .map((criterion) => {
      const value = dcClampScore(
        savedAssessment.criteria?.[criterion.id],
        criterion.max,
      );
      const isFull = value === criterion.max;
      return `
        <div class="dc-student-criterion ${isFull ? "is-full" : ""}">
          <span class="dc-readonly-check"><i class="fas ${isFull ? "fa-check" : "fa-minus"}"></i></span>
          <span>${escHtml(criterion.label)}</span>
          <strong>${value}/${criterion.max}</strong>
        </div>`;
    })
    .join("");
  const noteHtml = savedAssessment.note
    ? `<div class="dc-student-note"><i class="fas fa-comment-dots"></i><span>${escHtml(savedAssessment.note)}</span></div>`
    : "";
  return `
    <details class="dc-student-score-card">
      <summary>
        <span class="dc-score-dot" style="background:${assessment.color}"></span>
        <span class="dc-score-copy"><strong>${escHtml(assessment.title)}</strong><small>${assessment.type}${assessment.jp ? ` · ${assessment.jp} JP` : ""} · bobot ${assessment.weight}%</small></span>
        <span class="dc-score-number">${raw}</span>
        <span class="dc-score-contribution">+${dcFormatOneDecimal(contribution)}</span>
        <i class="fas fa-chevron-down"></i>
      </summary>
      <div class="dc-student-criteria">${criteriaHtml}${noteHtml}</div>
    </details>`;
}

function dcBuildStudentQuizCard(course, draft, summary) {
  if (!course.finalQuiz) return "";
  const quiz = course.finalQuiz;
  const quizRaw = summary.rawScores[quiz.id] || 0;
  const quizContribution = summary.contributions[quiz.id] || 0;
  return `
    <details class="dc-student-score-card">
      <summary>
        <span class="dc-score-dot" style="background:${quiz.color}"></span>
        <span class="dc-score-copy"><strong>${escHtml(quiz.title)}</strong><small>Sumatif · bobot ${quiz.weight}%</small></span>
        <span class="dc-score-number">${quizRaw}</span>
        <span class="dc-score-contribution">+${dcFormatOneDecimal(quizContribution)}</span>
        <i class="fas fa-chevron-down"></i>
      </summary>
      <div class="dc-student-quiz-detail">
        <span>${summary.quizCorrect} jawaban benar</span>
        <span>${25 - summary.quizCorrect} salah/kosong</span>
        ${draft.quizNote ? `<div class="dc-student-note"><i class="fas fa-comment-dots"></i><span>${escHtml(draft.quizNote)}</span></div>` : ""}
      </div>
    </details>`;
}

function dcBuildStudentAssessmentHtml(student, kkm) {
  const grade = dcGetGradeLevel(student?.kelas);
  if (!DC_COURSES_BY_GRADE[grade]) return "";
  const records = student?.digitalCitizenshipAssessment || {};
  const quarters = [1, 2, 3, 4].filter(
    (quarter) => records[`q${quarter}`] && dcGetCourseConfig(quarter, grade),
  );
  if (!quarters.length) return "";

  const quarterHtml = quarters
    .map((quarter) => {
      const course = dcGetCourseConfig(quarter, grade);
      const stored = records[`q${quarter}`];
      const draft = dcDraftFromStored(stored, quarter, grade);
      const summary = dcCalculateSummary(draft, quarter, grade);
      const status = dcScoreStatus(summary.finalScore, kkm);
      const assessmentCards = course.assessments
        .map((assessment) => dcBuildStudentRubricCard(assessment, draft, summary))
        .join("");
      const thirdSummary = course.finalQuiz
        ? `<div><span>Tes akhir</span><strong>${summary.quizCorrect}<small>/25 benar</small></strong></div>`
        : `<div><span>Rubrik</span><strong>${course.assessments.length}<small>komponen</small></strong></div>`;
      return `
        <section class="dc-student-quarter">
          <div class="dc-student-quarter-head">
            <div><span>PERIODE Q${quarter}</span><h4>${escHtml(course.title)}</h4></div>
            <div class="dc-student-final ${status === "Tuntas" ? "is-complete" : ""}"><small>Nilai akhir</small><strong>${dcFormatOneDecimal(summary.finalScore)}</strong><span>${status}</span></div>
          </div>
          <div class="dc-student-summary-grid">
            <div><span>Formatif</span><strong>${dcFormatOneDecimal(summary.formative)}<small>/40</small></strong></div>
            <div><span>Sumatif</span><strong>${dcFormatOneDecimal(summary.summative)}<small>/60</small></strong></div>
            ${thirdSummary}
          </div>
          <div class="dc-student-score-list">
            ${assessmentCards}
            ${dcBuildStudentQuizCard(course, draft, summary)}
          </div>
        </section>`;
    })
    .join("");

  const onlyCourse = quarters.length === 1 ? dcGetCourseConfig(quarters[0], grade) : null;
  return `
    <div class="dc-student-assessment">
      <div class="dc-student-assessment-title">
        <div><i class="fas fa-clipboard-check"></i></div>
        <div><span>DETAIL PENILAIAN KELAS ${grade}</span><h3>${escHtml(onlyCourse?.title || `Assessment Grade ${grade}`)}</h3><p>Formatif 40% · Sumatif 60%</p></div>
      </div>
      ${quarterHtml}
    </div>`;
}

window.DC_ASSESSMENTS = DC_ASSESSMENTS;
window.DC_FINAL_QUIZ = DC_FINAL_QUIZ;
window.DC_Q2_ASSESSMENTS = DC_Q2_ASSESSMENTS;
window.DC_Q3_ASSESSMENTS = DC_Q3_ASSESSMENTS;
window.DC_Q4_ASSESSMENTS = DC_Q4_ASSESSMENTS;
window.DC_COURSES = DC_COURSES;
window.G12_Q1_ASSESSMENTS = G12_Q1_ASSESSMENTS;
window.G12_Q2_ASSESSMENTS = G12_Q2_ASSESSMENTS;
window.G12_Q3_ASSESSMENTS = G12_Q3_ASSESSMENTS;
window.G12_Q4_ASSESSMENTS = G12_Q4_ASSESSMENTS;
window.G12_COURSES = G12_COURSES;
window.DC_COURSES_BY_GRADE = DC_COURSES_BY_GRADE;
window.dcGetCourseConfig = dcGetCourseConfig;
window.dcGetAssessmentItems = dcGetAssessmentItems;
window.dcCreateEmptyDraft = dcCreateEmptyDraft;
window.dcDraftFromStored = dcDraftFromStored;
window.dcCalculateSummary = dcCalculateSummary;
window.dcFormatOneDecimal = dcFormatOneDecimal;
window.dcBuildStoredRecord = dcBuildStoredRecord;
window.dcBuildStudentAssessmentHtml = dcBuildStudentAssessmentHtml;
window.dcIsGradeNine = dcIsGradeNine;
window.dcGetGradeLevel = dcGetGradeLevel;
window.dcIsAssessmentGrade = dcIsAssessmentGrade;
