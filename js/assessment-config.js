/* ========================================================
   assessment-config.js
   Konfigurasi assessment Grade 9 per quarter.
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

const DC_COURSES = {
  1: {
    id: "technologyAndMe",
    quarter: 1,
    title: "Assessment Technology and Me",
    shortTitle: "Technology and Me",
    description: "Digital Citizenship · Formatif 40% dan sumatif 60%.",
    assessments: DC_Q1_ASSESSMENTS,
    finalQuiz: DC_Q1_FINAL_QUIZ,
  },
  2: {
    id: "codeYourOwnWorldVr",
    quarter: 2,
    title: "Code Your Own World with VR",
    shortTitle: "Code Your Own World with VR",
    description: "Construct a VR World · Formatif 40% dan sumatif 60%.",
    assessments: DC_Q2_ASSESSMENTS,
    finalQuiz: null,
  },
  3: {
    id: "buildSenseCompeteVexIq",
    quarter: 3,
    title: "Build, Sense, and Compete with VEX IQ",
    shortTitle: "VEX IQ Team Freeze Tag",
    description: "VEX IQ Robotics · Formatif 40% dan sumatif 60%.",
    assessments: DC_Q3_ASSESSMENTS,
    finalQuiz: null,
  },
  4: {
    id: "senseDecideDeliverVexIq",
    quarter: 4,
    title: "Sense, Decide, and Deliver with VEX IQ",
    shortTitle: "Smart Warehouse Clawbot",
    description: "Advanced VEX IQ Robotics · Formatif 40% dan sumatif 60%.",
    assessments: DC_Q4_ASSESSMENTS,
    finalQuiz: null,
  },
};

// Alias lama dipertahankan agar data dan kode Q1 tetap kompatibel.
const DC_ASSESSMENTS = DC_Q1_ASSESSMENTS;
const DC_FINAL_QUIZ = DC_Q1_FINAL_QUIZ;

function dcGetCourseConfig(quarter) {
  return DC_COURSES[Number(quarter)] || null;
}

function dcGetAssessmentItems(quarter) {
  const course = dcGetCourseConfig(quarter);
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

function dcCreateEmptyDraft(quarter = 1) {
  const course = dcGetCourseConfig(quarter);
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

function dcDraftFromStored(stored, quarter = 1) {
  const course = dcGetCourseConfig(quarter);
  const draft = dcCreateEmptyDraft(quarter);
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

function dcCalculateSummary(draft, quarter = 1) {
  const course = dcGetCourseConfig(quarter);
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

function dcBuildStoredRecord(draft, quarter, updatedBy) {
  const course = dcGetCourseConfig(quarter);
  const summary = dcCalculateSummary(draft, quarter);
  const record = {
    period: `Q${quarter}`,
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
  const gradeMatch = String(className || "").match(/\d+/);
  return gradeMatch ? Number(gradeMatch[0]) === 9 : false;
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
        <span class="dc-score-copy"><strong>${escHtml(assessment.title)}</strong><small>${assessment.type} · bobot ${assessment.weight}%</small></span>
        <span class="dc-score-number">${raw}</span>
        <span class="dc-score-contribution">+${contribution.toFixed(1)}</span>
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
        <span class="dc-score-contribution">+${quizContribution.toFixed(1)}</span>
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
  if (!dcIsGradeNine(student?.kelas)) return "";
  const records = student?.digitalCitizenshipAssessment || {};
  const quarters = [1, 2, 3, 4].filter(
    (quarter) => records[`q${quarter}`] && dcGetCourseConfig(quarter),
  );
  if (!quarters.length) return "";

  const quarterHtml = quarters
    .map((quarter) => {
      const course = dcGetCourseConfig(quarter);
      const stored = records[`q${quarter}`];
      const draft = dcDraftFromStored(stored, quarter);
      const summary = dcCalculateSummary(draft, quarter);
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
            <div class="dc-student-final ${status === "Tuntas" ? "is-complete" : ""}"><small>Nilai akhir</small><strong>${summary.finalScore.toFixed(1)}</strong><span>${status}</span></div>
          </div>
          <div class="dc-student-summary-grid">
            <div><span>Formatif</span><strong>${summary.formative.toFixed(1)}<small>/40</small></strong></div>
            <div><span>Sumatif</span><strong>${summary.summative.toFixed(1)}<small>/60</small></strong></div>
            ${thirdSummary}
          </div>
          <div class="dc-student-score-list">
            ${assessmentCards}
            ${dcBuildStudentQuizCard(course, draft, summary)}
          </div>
        </section>`;
    })
    .join("");

  const onlyCourse = quarters.length === 1 ? dcGetCourseConfig(quarters[0]) : null;
  return `
    <div class="dc-student-assessment">
      <div class="dc-student-assessment-title">
        <div><i class="fas fa-clipboard-check"></i></div>
        <div><span>DETAIL PENILAIAN KELAS 9</span><h3>${escHtml(onlyCourse?.title || "Assessment Grade 9")}</h3><p>Formatif 40% · Sumatif 60%</p></div>
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
window.dcGetCourseConfig = dcGetCourseConfig;
window.dcGetAssessmentItems = dcGetAssessmentItems;
window.dcCreateEmptyDraft = dcCreateEmptyDraft;
window.dcDraftFromStored = dcDraftFromStored;
window.dcCalculateSummary = dcCalculateSummary;
window.dcBuildStoredRecord = dcBuildStoredRecord;
window.dcBuildStudentAssessmentHtml = dcBuildStudentAssessmentHtml;
window.dcIsGradeNine = dcIsGradeNine;
