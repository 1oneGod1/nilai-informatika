// Materi pendamping kelas; WKA berupa penerapan prinsip Alkitab dalam kegiatan belajar.
const CONFIG = {
  "gradebookUrl": "../index.html",
  "bsdUrl": "https://app.bsd.education/",
  "teacher": "Andi Purba",
  "course": "Construct a VR World",
  "courseBrief": {
    "mainGoal": "Merancang, membangun, dan menguji diorama virtual sederhana yang memiliki tema, interaksi, serta manfaat yang dapat dijelaskan kepada pengunjung.",
    "overview": "Kita mulai dari scene dan bentuk 3D, lalu memberi tekstur, cahaya, model, dan interaksi gaze. Setelah itu, kamu merancang diorama sendiri, menguji bersama teman, memperbaiki masalah, dan menjelaskan keputusanmu.",
    "outcomes": [
      "Menyusun objek 3D dan mengatur posisi, rotasi, serta ukurannya.",
      "Memilih tekstur dan cahaya yang sesuai tema dan tetap mudah dilihat.",
      "Membuat satu interaksi sederhana dan menguji pengalaman pengunjung.",
      "Menjelaskan kode, mencatat sumber aset, dan menunjukkan bukti revisi."
    ],
    "finalTask": "Satu diorama bertema jelas di Sandbox BSD yang memakai bentuk, tekstur, cahaya, model pihak ketiga, dan satu interaksi, dikumpulkan bersama tema, daftar fitur, dan catatan sumber aset.",
    "stages": [
      [
        "1–2",
        "Fondasi",
        "Scene, atribut, bentuk, koordinat, dan kelompok objek."
      ],
      [
        "3–5",
        "Tampilan & interaksi",
        "Tekstur, cahaya, model impor, dan respons gaze."
      ],
      [
        "6",
        "Project akhir",
        "Rancang, bangun, dan kumpulkan diorama VR."
      ]
    ],
    "wka": {
      "principle": "Kemampuan berkarya dipakai dengan tanggung jawab dan kepedulian kepada sesama.",
      "reference": "Kejadian 1:27; Filipi 2:4",
      "url": "https://www.bible.com/id/bible/306/GEN.1.27.TB",
      "practice": "Pilih pengalaman yang membantu pengunjung, gunakan aset secara jujur, dan dengarkan masukan.",
      "question": "Siapa yang akan terbantu oleh karya virtualmu?",
      "sources": [
        {
          "reference": "Kejadian 1:27",
          "url": "https://www.bible.com/id/bible/306/GEN.1.27.TB"
        },
        {
          "reference": "Filipi 2:4",
          "url": "https://www.bible.com/id/bible/306/PHP.2.4.TB"
        }
      ]
    }
  }
};
const LESSONS = [
  {
    "id": 1,
    "title": "Halo, dunia virtual!",
    "subtitle": "Kenali VR dan bangun scene pertamamu.",
    "tag": "Fondasi",
    "label": "Scene pertama",
    "lab": "position",
    "prompt": "Jika kamu bisa membawa temanmu ke suatu tempat tanpa berpindah kelas, tempat apa yang akan kamu buat?",
    "bsd": [
      "Explore “Code Your Own World with VR”",
      "Set up A-Frame"
    ],
    "scope": "Mulai dari pengenalan, memasukkan A-Frame, scene, dan objek sederhana.",
    "goals": [
      "Menjelaskan kegunaan sebuah dunia virtual.",
      "Mengenali scene, elemen, dan atribut.",
      "Membuat satu objek dalam scene A-Frame."
    ],
    "concepts": [
      [
        "Scene adalah ruang",
        "<a-scene> menjadi wadah dunia 3D. Objek, pencahayaan, dan kamera ditempatkan di dalamnya."
      ],
      [
        "Elemen adalah objek",
        "Elemen seperti <a-box> membuat bentuk. Atribut seperti color dan position mengatur tampilannya."
      ],
      [
        "Framework perlu dimuat",
        "A-Frame dimasukkan melalui elemen <script>. Di BSD, ikuti alamat library yang ditentukan pada instruksi proyek."
      ]
    ],
    "code": "<a-scene>\n  <a-box position=\"0 1 -3\"\n         color=\"#D8EF9B\"></a-box>\n</a-scene>",
    "challenge": "Tambahkan objek kedua dengan warna berbeda. Jelaskan bagian kode yang menentukan warna dan posisi masing-masing objek.",
    "evidence": "Scene berisi dua objek + penjelasan fungsi scene dan satu atribut.",
    "submitEvidence": "Tautan BSD scene berisi dua objek + penjelasan fungsi scene dan satu atribut.",
    "submitExample": "Contoh: Saya menambah a-sphere biru di position=\"1 1 -3\" di samping a-box merah. Atribut color mengatur warna, position mengatur letak, dan a-scene menjadi wadah seluruh dunia 3D.",
    "summary": [
      "Scene adalah wadah dunia 3D.",
      "Objek dibuat dari elemen; sifatnya diatur melalui atribut.",
      "Hasil yang tampil perlu diuji, bukan hanya diketik."
    ],
    "reflection": "Objek apa yang ingin kamu buat berikutnya, dan elemen apa yang mungkin kamu butuhkan?",
    "times": [
      [
        "Diagnostik HTML & JavaScript",
        15
      ],
      [
        "Eksplorasi contoh VR",
        10
      ],
      [
        "Scene pertama & modifikasi",
        40
      ],
      [
        "Kuis formatif & pembahasan",
        10
      ],
      [
        "Exit ticket",
        5
      ]
    ],
    "teacher": "Gunakan diagnostik untuk menentukan bantuan, bukan nilai akhir. Tinjau butir 1–3 untuk tag/atribut HTML dan butir 4–5 untuk variabel/event JavaScript; jangan hanya memakai skor total. Minta siswa mengubah satu atribut dan menjelaskan hasilnya sebagai cek praktik. Siswa yang belum siap memakai scene awal dan pengantar JavaScript sebelum gaze.",
    "questions": [
      [
        "Kotak ditulis setelah </a-scene>. Apa perbaikan struktur yang tepat?",
        [
          "Memindahkan kotak ke dalam <script>",
          "Memindahkan kotak ke dalam <a-scene>",
          "Mengubah color kotak"
        ],
        1,
        "Objek dunia A-Frame harus berada di dalam scene."
      ],
      [
        "Dalam <a-box position=\"0 1 -3\" color=\"red\">, bagian mana yang menentukan warna?",
        [
          "color=\"red\"",
          "position=\"0 1 -3\"",
          "Nama elemen a-box saja"
        ],
        0,
        "color menentukan warna; position menentukan lokasi."
      ],
      [
        "Objek belum tampak setelah satu perubahan kode. Langkah awal yang tepat?",
        [
          "Mengganti seluruh proyek dengan contoh lain",
          "Mengubah warna, posisi, dan library sekaligus",
          "Memeriksa perubahan terakhir, struktur, posisi, dan pesan kesalahan"
        ],
        2,
        "Mulai dari bukti yang dekat dengan masalah, lalu uji satu perubahan."
      ]
    ],
    "openingQuestions": [
      [
        "Pada <a-box color=\"red\"></a-box>, mana nama elemennya?",
        [
          "a-box",
          "color",
          "red"
        ],
        0,
        "a-box adalah nama elemen; color adalah atribut dan red adalah nilainya."
      ],
      [
        "Bagaimana menempatkan kotak di dalam scene?",
        [
          "<a-scene></a-scene><a-box></a-box>",
          "<a-scene><a-box></a-box></a-scene>",
          "<a-box><a-scene></a-scene></a-box>"
        ],
        1,
        "Elemen kotak harus berada di antara tag pembuka dan penutup scene."
      ],
      [
        "Jika hanya color diubah dari red menjadi blue, apa yang berubah?",
        [
          "Lokasi kotak",
          "Ukuran kotak",
          "Warna kotak"
        ],
        2,
        "Atribut yang diubah menentukan sifat objek yang berubah."
      ],
      [
        "Dalam JavaScript, apa fungsi let warna = \"red\";?",
        [
          "Menyimpan nilai red dalam variabel warna",
          "Langsung membuat kotak merah",
          "Memuat library A-Frame"
        ],
        0,
        "Variabel menyimpan nilai; untuk mengubah objek dibutuhkan instruksi lain."
      ],
      [
        "button.addEventListener(\"click\", ubahWarna) berarti…",
        [
          "ubahWarna berjalan saat file disimpan",
          "ubahWarna dipanggil ketika button menerima click",
          "button berubah warna tanpa fungsi lain"
        ],
        1,
        "Event listener menghubungkan kejadian dengan fungsi respons."
      ]
    ],
    "bsdFocus": [
      "Explore “Code Your Own World with VR” dan Set up A-Frame: muat library, buat scene, tambah bentuk, ubah satu atribut.",
      "Tidak harus menyelesaikan seluruh course atau seluruh kuis BSD pada pertemuan ini."
    ],
    "preparation": "Pastikan akun BSD dapat dibuka. Siapkan scene awal dan contoh tag/atribut. Uji library sebelum kelas.",
    "minimumTarget": "Dua objek tampil; siswa menunjuk scene, elemen, dan atribut warna.",
    "support": "Jika tag/atribut belum dikuasai, gunakan scene awal dan latihan mengganti satu atribut. Jika variabel/event belum siap, beri pengantar 5–10 menit pada sesi praktik dan scaffold pada pertemuan 5.",
    "exitQuestion": "Tuliskan elemen yang menjadi wadah dunia, lalu satu atribut yang kamu ubah dan dampaknya.",
    "exitExpected": "Menyebut a-scene; menghubungkan atribut yang benar (mis. color/position) dengan perubahan yang diamati.",
    "brief": {
      "mainGoal": "Membuat scene A-Frame sederhana dan menjelaskan hubungan antara scene, objek, dan atribut.",
      "material": [
        "VR menghadirkan ruang tiga dimensi yang bisa dijelajahi. Dalam A-Frame, scene adalah wadah ruangnya, elemen membentuk objek, dan atribut mengatur sifat objek seperti warna atau posisi.",
        "Hari ini kita memuat library sesuai instruksi BSD, membuat scene, lalu menambahkan dua objek. Fokusnya mengenali bagian kode dan melihat dampak satu perubahan."
      ],
      "why": "Scene pertama menjadi dasar yang akan kamu gunakan kembali saat membuat diorama akhir.",
      "tasks": [
        "Kerjakan diagnostik pembuka agar guru mengetahui bantuan yang kamu butuhkan.",
        "Ikuti latihan scene di BSD, lalu tambahkan objek kedua dengan warna berbeda.",
        "Ubah satu atribut, uji tampilannya, kemudian kerjakan kuis dan exit ticket."
      ],
      "success": [
        "Dua objek terlihat di dalam scene.",
        "Kamu dapat menunjuk elemen scene, objek, dan satu atribut pada kode.",
        "Kamu dapat menjelaskan perubahan tampilan akibat atribut yang diubah."
      ],
      "wka": {
        "principle": "Manusia diciptakan menurut gambar Allah; setiap pengguna perlu diperlakukan dengan hormat.",
        "reference": "Kejadian 1:27",
        "url": "https://www.bible.com/id/bible/306/GEN.1.27.TB",
        "practice": "Pilih ide dunia virtual yang bermanfaat dan menghargai orang yang akan mengunjunginya.",
        "question": "Pengalaman baik apa yang ingin kamu berikan kepada pengunjung?"
      },
      "teacherScript": "Hari ini kita mulai membuat dunia virtual dari dua objek sederhana. Kita akan mengenali scene, elemen, dan atribut, lalu melihat bagaimana perubahan kode mengubah tampilan. Tugas kalian adalah menambahkan objek kedua dan menjelaskan satu perubahan. Saya mengharapkan kalian bisa menunjukkan kode serta hasilnya. Sejak awal, pikirkan pengalaman yang baik bagi pengunjung karya kalian."
    }
  },
  {
    "id": 2,
    "title": "Bentuk jadi sebuah cerita",
    "subtitle": "Gabungkan bentuk. Atur posisi dan rotasi.",
    "tag": "Fondasi",
    "label": "Modeling",
    "lab": "position",
    "prompt": "Bagaimana sebuah meja bisa dibuat hanya dari kotak dan silinder?",
    "bsd": [
      "A-Frame Modeling"
    ],
    "scope": "Fokus pada bentuk sederhana, koordinat, rotasi, dan objek induk. Gunakan model DNA BSD sebagai contoh.",
    "goals": [
      "Menggabungkan bentuk menjadi satu objek.",
      "Memprediksi perubahan posisi pada sumbu X, Y, dan Z.",
      "Menggunakan objek induk untuk mengelompokkan bagian."
    ],
    "concepts": [
      [
        "Tiga arah, satu posisi",
        "position memakai urutan X Y Z. X mengubah posisi mendatar, Y mengubah tinggi, Z mengubah kedalaman."
      ],
      [
        "Posisi berbeda dari rotasi",
        "position memindahkan objek. rotation mengubah orientasinya, dalam derajat pada sumbu X Y Z."
      ],
      [
        "Bagian mengikuti induknya",
        "<a-entity> dapat mengelompokkan objek. Posisi anak dihitung relatif terhadap induknya; perubahan induk memengaruhi kelompok."
      ]
    ],
    "code": "<a-entity position=\"0 1 -3\">\n  <a-box width=\"2\" height=\"0.2\" depth=\"1\"></a-box>\n  <a-cylinder position=\"0 -0.6 0\"\n              radius=\"0.1\" height=\"1\"></a-cylinder>\n</a-entity>",
    "challenge": "Buat pohon, kursi, atau meja dari beberapa bentuk. Pindahkan seluruh model dengan mengubah objek induk, lalu jelaskan perubahan yang terjadi.",
    "evidence": "Objek gabungan + demonstrasi satu perubahan posisi atau rotasi.",
    "submitEvidence": "Tautan BSD objek gabungan + penjelasan satu perubahan posisi atau rotasi melalui objek induk.",
    "submitExample": "Contoh: Saya membuat pohon dari a-cylinder (batang) dan a-sphere (daun) di dalam satu a-entity. Saat position induk saya ubah dari 0 0 -3 ke 2 0 -3, seluruh pohon ikut berpindah.",
    "summary": [
      "Urutan koordinat adalah X Y Z.",
      "Rotasi mengubah orientasi; posisi mengubah lokasi.",
      "Objek induk membantu mengatur bagian sebagai satu kelompok."
    ],
    "reflection": "Mengapa menggunakan objek induk lebih membantu daripada memindahkan setiap bagian satu per satu?",
    "times": [
      [
        "Kuis pembuka & prediksi",
        10
      ],
      [
        "Modeling terpandu",
        30
      ],
      [
        "Modifikasi objek mandiri",
        25
      ],
      [
        "Kuis formatif & exit ticket",
        15
      ]
    ],
    "teacher": "Minta prediksi sebelum siswa mengubah angka. Saat objek tidak terlihat, cek posisi dan relasi induk-anak. Model baru menjadi bukti transfer dari tutorial.",
    "questions": [
      [
        "Y diubah dari 1 menjadi 2, sementara X dan Z tetap. Prediksi yang tepat?",
        [
          "Objek lebih tinggi satu satuan",
          "Objek lebih lebar satu satuan",
          "Objek lebih jauh satu satuan"
        ],
        0,
        "Y menentukan tinggi posisi; ukuran tidak berubah."
      ],
      [
        "Seluruh bagian pohon sudah berada dalam satu <a-entity>. Bagaimana memutarnya bersama?",
        [
          "Mengubah position setiap daun",
          "Mengubah rotation pada induk",
          "Mengubah scale scene"
        ],
        1,
        "Rotasi induk memutar seluruh kelompok anak."
      ],
      [
        "Induk berada pada position=\"2 0 -3\", anak pada \"1 0 0\", tanpa rotasi/skala lain. Posisi dunia anak adalah…",
        [
          "1 0 0",
          "2 0 -3",
          "3 0 -3"
        ],
        2,
        "Tanpa transformasi lain, posisi anak relatif ditambahkan pada posisi induk."
      ]
    ],
    "openingQuestions": [
      [
        "Objek A-Frame ditempatkan di dalam…",
        [
          "<a-assets>",
          "<a-scene>",
          "<script>"
        ],
        1,
        "Scene menampung objek dunia 3D."
      ],
      [
        "Dua kotak harus mempunyai warna berbeda. Apa yang diubah?",
        [
          "Nama scene",
          "Urutan file saja",
          "Nilai color masing-masing kotak"
        ],
        2,
        "Warna tiap objek dapat diatur melalui atribut color."
      ],
      [
        "Kotak tampak di tempat yang salah. Bagian pertama yang diperiksa adalah…",
        [
          "position kotak",
          "Judul proyek",
          "Nama pembuat"
        ],
        0,
        "position menentukan lokasi objek."
      ]
    ],
    "bsdFocus": [
      "A-Frame Modeling: gunakan model DNA BSD untuk menunjukkan bentuk, koordinat, rotasi, dan kelompok.",
      "Pilih beberapa bagian yang mewakili konsep; transfer ke pohon/kursi/meja sederhana. Tidak perlu menuntaskan seluruh DNA dalam satu sesi."
    ],
    "preparation": "Siapkan model kelompok yang sudah berjalan; guru menunjukkan induk dan anak sebelum siswa memodifikasi.",
    "minimumTarget": "Satu objek gabungan; siswa memindahkan atau memutar lewat induk dan memprediksi hasilnya.",
    "support": "Sediakan dua bentuk siap pakai; ubah X/Y dahulu, lalu rotation. Pengayaan: tambahkan bagian tanpa merusak kelompok.",
    "exitQuestion": "Jika induk dipindahkan dua satuan pada X, bagaimana bagian anak ikut berubah? Sebut asumsi yang kamu pakai.",
    "exitExpected": "Anak ikut bergeser bersama induk. Untuk contoh tanpa rotasi/skala tambahan, posisi dunia X bertambah dua.",
    "brief": {
      "mainGoal": "Menyusun satu model dari beberapa bentuk dan mengubah seluruh model melalui objek induknya.",
      "material": [
        "Sebuah meja, pohon, atau kursi dapat dibuat dari gabungan bentuk sederhana. Atribut position memakai urutan X, Y, Z; rotation mengatur orientasi objek.",
        "Bagian model dapat dikelompokkan dalam satu objek induk. Posisi anak relatif terhadap induknya, sehingga kelompok dapat dipindahkan atau diputar bersama."
      ],
      "why": "Model buatan sendiri menunjukkan bahwa kamu dapat menerapkan konsep di luar contoh tutorial.",
      "tasks": [
        "Prediksi perubahan koordinat sebelum mengubah angka pada latihan modeling BSD.",
        "Buat pohon, kursi, atau meja dari beberapa bentuk dalam satu induk.",
        "Pindahkan atau putar induknya, demonstrasikan hasilnya, lalu jawab kuis dan exit ticket."
      ],
      "success": [
        "Bentuk-bentuk tersusun menjadi satu objek yang dapat dikenali.",
        "Perubahan pada induk memengaruhi seluruh bagian model.",
        "Kamu dapat menjelaskan perbedaan position dan rotation serta urutan X, Y, Z."
      ],
      "wka": {
        "principle": "Bekerja dengan sepenuh hati menjadi sikap dalam menggunakan kemampuan yang dipercayakan kepada kita.",
        "reference": "Kolose 3:23",
        "url": "https://www.bible.com/id/bible/306/col.3.23-25.tb",
        "practice": "Susun bagian model dengan teliti dan periksa hasil setelah mengubah induknya.",
        "question": "Bagian mana yang perlu kamu rapikan agar modelmu dapat dipahami?"
      },
      "teacherScript": "Hari ini kita membuat sebuah objek dari beberapa bentuk. Kita akan memakai koordinat untuk menempatkan bagian, rotasi untuk mengubah orientasi, dan satu induk agar bagian-bagiannya bergerak bersama. Tugas kalian membuat model sederhana lalu mendemonstrasikan satu perubahan pada induk. Saya mengharapkan kalian memprediksi dan menjelaskan hasilnya. Ketelitian dalam menyusun serta menguji adalah bagian dari bekerja dengan sepenuh hati."
    }
  },
  {
    "id": 3,
    "title": "Ciptakan suasananya",
    "subtitle": "Tekstur dan cahaya memberi karakter pada dunia.",
    "tag": "Visual",
    "label": "Tekstur & cahaya",
    "lab": "light",
    "prompt": "Mengapa ruangan yang sama bisa terasa hangat, tenang, atau misterius hanya karena cahaya?",
    "bsd": [
      "A-Frame Image Textures",
      "A-Frame Lighting and Fog"
    ],
    "scope": "Ambil bagian tekstur dan pencahayaan dasar. Fog dan variasi lanjutan menjadi pengayaan.",
    "goals": [
      "Menerapkan satu tekstur pada objek.",
      "Membandingkan hasil perubahan pencahayaan.",
      "Menjelaskan hubungan suasana dengan pilihan visual."
    ],
    "concepts": [
      [
        "Tekstur menambah permukaan",
        "Gambar dapat dipakai sebagai tekstur melalui src. Gunakan aset yang sesuai dan pastikan alamatnya bisa dimuat."
      ],
      [
        "Cahaya membentuk suasana",
        "Ambient memberi pencahayaan umum. Directional memberi cahaya dari arah tertentu. Keseimbangan keduanya memengaruhi tampilan bentuk."
      ],
      [
        "Pilihan harus punya alasan",
        "Pilih tekstur dan intensitas cahaya berdasarkan tema. Periksa apakah detail dan objek penting tetap mudah dilihat."
      ]
    ],
    "code": "<a-sphere color=\"white\" roughness=\"0.25\"\n  wireframe=\"false\"\n  src=\"/resources/projects/materials-and-textures/ball.jpg\">\n</a-sphere>\n<a-light type=\"ambient\" intensity=\"0.5\"></a-light>",
    "challenge": "Buat dua suasana untuk scene yang sama. Ubah tekstur atau pencahayaan, lalu pilih versi yang paling sesuai dengan temamu.",
    "evidence": "Dua tangkapan layar + alasan memilih salah satu suasana.",
    "submitEvidence": "Tautan BSD yang menampilkan dua suasana (jelaskan perbedaan versi A dan B) + alasan memilih salah satu.",
    "submitExample": "Contoh: Versi A memakai tekstur rumput dan cahaya terang (intensity 1). Versi B memakai cahaya biru redup (intensity 0.4). Saya memilih versi B karena tema saya taman malam yang tenang.",
    "summary": [
      "Tekstur memengaruhi tampilan permukaan.",
      "Pencahayaan memengaruhi keterlihatan dan suasana.",
      "Pilihan visual perlu mendukung tema, bukan sekadar menambah efek."
    ],
    "reflection": "Apa perubahan visual yang paling membantu orang memahami suasana scene-mu?",
    "times": [
      [
        "Kuis pembuka & perbandingan",
        8
      ],
      [
        "Tekstur pada scene awal",
        25
      ],
      [
        "Demo & modifikasi cahaya dasar",
        25
      ],
      [
        "Bandingkan dua versi",
        12
      ],
      [
        "Kuis formatif & exit ticket",
        10
      ]
    ],
    "teacher": "Siapkan aset tekstur sebelum kelas. Bahas keterlihatan objek selain keindahan. Nilai alasan siswa, bukan preferensi warna guru.",
    "questions": [
      [
        "BSD memberi gambar melalui src, tetapi objek masih memakai wireframe=\"true\". Agar permukaan bertekstur terlihat, kamu perlu…",
        [
          "Mematikan wireframe dan memeriksa alamat gambar",
          "Mengubah posisi kamera saja",
          "Mengganti nama objek saja"
        ],
        0,
        "Wireframe menampilkan kerangka; BSD memakai wireframe false untuk permukaan bertekstur."
      ],
      [
        "Target utama gelap sementara tema scene memang malam. Perbaikan yang paling tepat?",
        [
          "Menaikkan fog tanpa uji",
          "Menyesuaikan cahaya pada target lalu menguji keterlihatannya",
          "Mengganti tema menjadi siang tanpa membandingkan"
        ],
        1,
        "Pertahankan tujuan desain sambil memperbaiki keterlihatan; bandingkan hasil."
      ],
      [
        "Bukti bahwa pilihan cahaya mendukung tema adalah…",
        [
          "Jumlah lampu paling banyak",
          "Semua intensitas dibuat sama",
          "Dua versi yang dibandingkan beserta alasan memilih salah satunya"
        ],
        2,
        "Perbandingan dan alasan menghubungkan pilihan visual dengan tujuan."
      ]
    ],
    "openingQuestions": [
      [
        "position=\"0 2 -3\" berarti objek berada pada tinggi…",
        [
          "0",
          "-3",
          "2"
        ],
        2,
        "Y merupakan koordinat kedua dan menyatakan tinggi."
      ],
      [
        "Untuk mengubah orientasi sebuah lampu/model, gunakan…",
        [
          "rotation",
          "color",
          "src"
        ],
        0,
        "rotation mengatur orientasi, berbeda dari posisi dan warna."
      ],
      [
        "Apa keuntungan mengelompokkan bagian dengan satu induk?",
        [
          "Semua bagian otomatis mendapat tekstur",
          "Seluruh kelompok dapat dipindahkan bersama",
          "Semua bagian berubah menjadi satu gambar"
        ],
        1,
        "Transformasi induk memengaruhi bagian anak."
      ]
    ],
    "bsdFocus": [
      "A-Frame Image Textures: fokus Apply a texture (langkah 8) pada scene yang sudah disiapkan; gambar src, color white, wireframe false.",
      "A-Frame Lighting and Fog: pilih pencahayaan dasar saja. Fog, pola ulang tekstur, dan variasi lanjutan menjadi pengayaan."
    ],
    "preparation": "Siapkan gambar BSD atau aset kelas yang bisa dimuat serta scene dengan lampu awal. Dua proyek penuh tidak ditargetkan selesai dalam 80 menit.",
    "minimumTarget": "Satu permukaan bertekstur dan dua versi cahaya yang dapat dibandingkan; siswa memberi alasan pilihan.",
    "support": "Berikan alamat aset, jangan meminta siswa mencari gambar saat kelas. Jika lambat, guru mendemonstrasikan cahaya dan siswa memodifikasi satu intensitas.",
    "exitQuestion": "Scene bertema malam tetapi target sulit dilihat. Perubahan cahaya apa yang kamu uji, dan apa bukti bahwa hasilnya membantu?",
    "exitExpected": "Mengusulkan penyesuaian cahaya yang menjaga tema; memeriksa apakah pengguna lebih mudah melihat/menemukan target.",
    "brief": {
      "mainGoal": "Menggunakan tekstur dan cahaya untuk membangun suasana yang sesuai tema dan tetap mudah dilihat.",
      "material": [
        "Tekstur adalah gambar yang memberi tampilan pada permukaan objek. Alamat gambar harus dapat dimuat; pada latihan BSD, permukaan bertekstur memakai wireframe false.",
        "Cahaya memengaruhi suasana dan keterlihatan. Kita memakai pencahayaan dasar untuk membandingkan dua versi scene; fog dan pengaturan lanjutan dapat dikerjakan sebagai pengayaan."
      ],
      "why": "Pengunjung perlu memahami suasana sekaligus menemukan objek penting di duniamu.",
      "tasks": [
        "Terapkan satu tekstur pada scene awal dengan aset yang disiapkan.",
        "Ubah pencahayaan untuk menghasilkan dua suasana dan simpan tangkapan layar keduanya.",
        "Pilih versi yang sesuai tema, jelaskan alasannya, lalu selesaikan kuis dan exit ticket."
      ],
      "success": [
        "Satu permukaan bertekstur berhasil terlihat.",
        "Dua versi pencahayaan dapat dibandingkan melalui tangkapan layar.",
        "Kamu dapat menjelaskan pilihan suasana dan menunjukkan bahwa objek penting masih terlihat."
      ],
      "wka": {
        "principle": "Memperhatikan kebutuhan orang lain membimbing keputusan kita, termasuk saat mendesain tampilan.",
        "reference": "Filipi 2:4",
        "url": "https://www.bible.com/id/bible/306/PHP.2.4.TB",
        "practice": "Uji apakah teman dapat melihat objek penting sebelum memilih versi visual akhir.",
        "question": "Apakah pilihan cahayamu membantu pengunjung memahami scene?"
      },
      "teacherScript": "Hari ini kita memberi suasana pada scene melalui tekstur dan cahaya. Kalian akan menerapkan satu gambar pada permukaan, lalu membandingkan dua pencahayaan. Tugasnya menyimpan dua versi dan menjelaskan pilihan yang sesuai tema. Saya mengharapkan objek penting tetap terlihat. Saat mendesain, kita memperhatikan kebutuhan pengunjung dan memeriksa apakah pilihan kita membantu mereka."
    }
  },
  {
    "id": 4,
    "title": "Bawa aset ke duniamu",
    "subtitle": "Impor model, sesuaikan skala, catat sumbernya.",
    "tag": "Aset",
    "label": "Model pihak ketiga",
    "lab": "scale",
    "prompt": "Jika model yang kamu impor lebih besar daripada seluruh taman, apa yang perlu diperiksa?",
    "bsd": [
      "Import Third-Party Models into A-Frame"
    ],
    "scope": "Pilih satu model dari Poly Pizza (poly.pizza). Tidak perlu login, tidak perlu mengunduh, dan tidak perlu upload; cukup salin link file .glb.",
    "goals": [
      "Memasukkan satu model pihak ketiga.",
      "Menyesuaikan ukuran dan posisi model.",
      "Mencatat pembuat, sumber, dan izin penggunaan aset."
    ],
    "concepts": [
      [
        "Model merupakan aset",
        "Model 3D perlu tersedia pada alamat yang bisa diakses. Di Poly Pizza, link file model ada di kode halaman: tekan Ctrl + U, cari .glb dengan Ctrl + F, lalu salin link https://static.poly.pizza/....glb (bukan yang berakhiran .glb.br). Link halaman Sketchfab atau Google Drive tidak bisa dipakai sebagai src."
      ],
      [
        "Ukuran dan posisi berbeda",
        "scale mengubah ukuran pada sumbu X Y Z. position menentukan lokasi. Model yang tidak tampak belum tentu gagal diimpor."
      ],
      [
        "Catat asal model",
        "Simpan judul, pembuat jika tersedia, tautan sumber, dan ketentuan izin. Menggunakan model pihak ketiga tetap membutuhkan keputusan desainmu sendiri."
      ]
    ],
    "code": "<a-scene>\n  <a-assets>\n    <!-- link .glb dari Poly Pizza -->\n    <a-asset-item id=\"model1\"\n      src=\"https://static.poly.pizza/412f5303-86bc-48b2-aaeb-99393c0a4004.glb\">\n    </a-asset-item>\n  </a-assets>\n  <a-gltf-model src=\"#model1\" position=\"0 0 -4\" scale=\"1 1 1\"></a-gltf-model>\n  <!-- kubus pembanding 1 meter -->\n  <a-box position=\"-2 0.5 -4\" color=\"orange\"></a-box>\n</a-scene>",
    "challenge": "Tampilkan satu model dari Poly Pizza dengan ukuran yang masuk akal dibanding kubus 1 meter. Tulis catatan sumbernya (judul, pembuat, link halaman, lisensi), lalu jelaskan satu kendala dan pemeriksaan yang kamu lakukan.",
    "evidence": "Model Poly Pizza tampil dengan ukuran sesuai + catatan sumber + penjelasan kendala.",
    "submitEvidence": "Tautan BSD model Poly Pizza dengan ukuran yang sesuai + catatan sumber + penjelasan kendala dan pemeriksaannya.",
    "submitExample": "Contoh: Saya memakai model Chair oleh Quaternius (poly.pizza/m/iMNqRzPwwe, lisensi CC0). Setelah Run kursinya tidak terlihat. Saya cek link berakhiran .glb dan id sama dengan src. Ternyata kursinya sangat kecil, jadi scale saya ubah ke 100 100 100 sampai tingginya mirip kubus 1 meter.",
    "summary": [
      "Alamat aset perlu bisa diakses.",
      "scale mengubah ukuran; position mengubah lokasi.",
      "Model pihak ketiga perlu dicatat sumber dan izinnya."
    ],
    "reflection": "Bagaimana kamu tahu bahwa modelmu gagal dimuat, atau sebenarnya berada di posisi/ukuran yang tidak sesuai?",
    "times": [
      [
        "Kuis pembuka",
        8
      ],
      [
        "Demo impor & sumber",
        10
      ],
      [
        "Impor model terpandu",
        32
      ],
      [
        "Skala, posisi & pengujian",
        20
      ],
      [
        "Kuis formatif & exit ticket",
        10
      ]
    ],
    "teacher": "Demokan cara mengambil link .glb dari Poly Pizza (Ctrl + U, cari .glb). Siapkan daftar link cadangan bila Ctrl + U diblokir. Jangan menilai siswa berdasarkan kerumitan model.",
    "questions": [
      [
        "Model terlalu besar tetapi sudah berada di tempat yang benar. Atribut yang diubah terlebih dahulu?",
        [
          "position",
          "scale",
          "rotation"
        ],
        1,
        "scale mengubah ukuran; position mengubah lokasi."
      ],
      [
        "Aset id=\"room\" sudah dimuat di <a-assets>. Elemen yang menampilkannya menurut contoh BSD adalah…",
        [
          "<a-gltf-model src=\"#room\"></a-gltf-model>",
          "<a-assets src=\"#room\"></a-assets>",
          "<a-light src=\"#room\"></a-light>"
        ],
        0,
        "a-asset-item memuat aset; a-gltf-model menampilkan model yang dirujuk."
      ],
      [
        "Kamu menemukan model gratis tanpa informasi izin yang jelas. Apa langkah yang tepat?",
        [
          "Menganggap semua aset gratis bebas digunakan",
          "Menuliskan namamu sebagai pembuat",
          "Memeriksa ketentuan sumber atau memakai aset guru yang izinnya jelas"
        ],
        2,
        "Harga gratis tidak menjelaskan izin penggunaan; periksa sumber atau pilih aset yang jelas."
      ]
    ],
    "openingQuestions": [
      [
        "Gambar tekstur perlu mempunyai…",
        [
          "Alamat src yang dapat dimuat",
          "Nama proyek yang panjang",
          "Rotasi yang selalu nol"
        ],
        0,
        "src menunjuk gambar; alamat salah membuat tekstur tidak termuat."
      ],
      [
        "Setelah intensitas cahaya dikurangi, apa yang perlu diuji?",
        [
          "Apakah judul berubah",
          "Apakah objek penting masih terlihat",
          "Apakah model punya nama baru"
        ],
        1,
        "Pilihan cahaya harus menjaga keterlihatan objek penting."
      ],
      [
        "Untuk memberi tekstur pada objek, bagian mana yang digunakan?",
        [
          "rotation",
          "position",
          "src"
        ],
        2,
        "src pada objek dapat menunjuk sumber gambar tekstur."
      ]
    ],
    "bsdFocus": [
      "Import Third-Party Models into A-Frame: a-assets, a-asset-item dan id (langkah 2–4), lalu a-gltf-model untuk menampilkan room (langkah 5).",
      "Lanjutkan satu modifikasi skala/posisi; tanaman, spotlight, dan seluruh pengaturan shadow adalah pengayaan."
    ],
    "preparation": "Uji beberapa link .glb Poly Pizza di sandbox BSD dan siapkan daftar cadangan berizin jelas (CC0/CC BY).",
    "minimumTarget": "Satu model Poly Pizza tampil, proporsinya sesuai dibanding kubus 1 meter, sumber dan lisensinya dicatat.",
    "support": "Jika model tidak tampil: cek link berakhiran .glb (bukan .glb.br), cek id sama dengan src, lalu coba scale 10 10 10 atau 0.1 0.1 0.1 dan periksa position. Bila Ctrl + U tidak bisa, pakai link dari daftar guru.",
    "exitQuestion": "Aset room sudah dimuat tetapi tidak terlihat. Tuliskan elemen untuk menampilkannya dan dua pemeriksaan berikutnya.",
    "exitExpected": "Menggunakan a-gltf-model src=\"#room\"; memeriksa kecocokan id/alamat, posisi, skala atau kamera dengan alasan.",
    "brief": {
      "mainGoal": "Menampilkan satu model pihak ketiga, menyesuaikan proporsinya, dan mencatat sumber serta ketentuan penggunaannya.",
      "material": [
        "Model 3D dapat dimuat lebih dahulu dalam a-assets melalui a-asset-item yang memiliki id. Elemen a-gltf-model kemudian menampilkan model dengan merujuk id tersebut.",
        "Model yang telah dimuat belum otomatis terlihat. Kita perlu memeriksa referensi aset, kamera, posisi, dan skala. scale mengubah ukuran, sedangkan position mengubah lokasi."
      ],
      "why": "Memakai aset yang sudah tersedia membantu pengembangan, tetapi pemilihan, penempatan, dan penggunaan sumber tetap menjadi tanggung jawabmu.",
      "tasks": [
        "Gunakan model contoh BSD atau aset guru yang telah diuji; muat dan tampilkan dalam scene.",
        "Sesuaikan skala dan posisi agar proporsinya masuk akal, kemudian uji tampilan.",
        "Catat judul aset, pembuat jika tersedia, tautan sumber, dan ketentuan penggunaan; jelaskan satu pemeriksaan yang kamu lakukan."
      ],
      "success": [
        "Model tampil dalam scene dengan proporsi yang sesuai.",
        "Kamu dapat membedakan cara memuat aset dan cara menampilkan model.",
        "Sumber dan ketentuan penggunaan dicatat tanpa mengklaim aset orang lain sebagai buatan sendiri."
      ],
      "wka": {
        "principle": "Kejujuran dalam perkataan juga membentuk cara kita menjelaskan asal sebuah karya.",
        "reference": "Efesus 4:25",
        "url": "https://www.bible.com/id/bible/306/EPH.4.25.TB",
        "practice": "Sebutkan pembuat dan sumber aset; jelaskan bagian yang kamu buat atau adaptasi sendiri.",
        "question": "Bagaimana catatan sumbermu menunjukkan kejujuran kepada pengunjung?"
      },
      "teacherScript": "Hari ini kita membawa model yang sudah tersedia ke scene kita. Kita akan membedakan memuat aset dan menampilkan model, lalu mengatur ukuran serta posisinya. Tugas kalian menampilkan satu model, menyesuaikan proporsi, dan mencatat sumbernya. Saya mengharapkan kalian dapat menjelaskan satu pemeriksaan ketika model bermasalah. Kita juga belajar jujur tentang bagian karya yang berasal dari orang lain."
    }
  },
  {
    "id": 5,
    "title": "Dunia yang merespons",
    "subtitle": "Bangun interaksi gaze dan jelaskan alurnya.",
    "tag": "Interaksi",
    "label": "Gaze interaction",
    "lab": "gaze",
    "prompt": "Bagaimana pengguna tahu bahwa suatu objek bisa diajak berinteraksi?",
    "bsd": [
      "A-Frame Gaze Interactions"
    ],
    "scope": "Satu respons gaze menggunakan komponen JavaScript awal dari guru. Dasar komponen/event termasuk materi inti; proyek custom components dan animasi lengkap menjadi pengayaan.",
    "goals": [
      "Menjelaskan pemicu dan respons interaksi.",
      "Membuat satu interaksi gaze sederhana mengikuti BSD.",
      "Menjelaskan alur pemicu → listener → fungsi → respons."
    ],
    "concepts": [
      [
        "Pemicu lalu respons",
        "Interaksi mempunyai kejadian pemicu, misalnya gaze pada target, dan respons yang dapat diamati pengguna."
      ],
      [
        "Pengguna butuh petunjuk",
        "Target sebaiknya mudah terlihat. Beri petunjuk dan respons yang membantu pengguna mengetahui bahwa tindakannya berhasil."
      ],
      [
        "Cursor dan listener saling terhubung",
        "Camera memuat cursor fuse. Komponen pada target memasang click listener; fungsi yang dipanggil menentukan respons. Pelajari struktur dasar ini memakai kode awal guru."
      ]
    ],
    "code": "<!-- Contoh adaptasi sederhana; bukan seluruh proyek BSD. -->\n<!-- Muat library A-Frame, daftarkan komponen berikut sebelum scene. -->\n<script>\nAFRAME.registerComponent(\"ubah-warna\", {\n  init: function () {\n    const target = this.el;\n    target.addEventListener(\"click\", function () {\n      target.setAttribute(\"color\", \"green\");\n    });\n  }\n});\n</script>\n<a-scene>\n  <a-camera><a-cursor fuse=\"true\" fuse-timeout=\"1500\"></a-cursor></a-camera>\n  <a-box ubah-warna position=\"0 1.6 -3\" color=\"yellow\"></a-box>\n</a-scene>",
    "challenge": "",
    "evidence": "Interaksi gaze yang berjalan + penjelasan pemicu dan respons.",
    "submitEvidence": "Tautan BSD interaksi gaze yang berjalan + penjelasan pemicu, listener, dan respons.",
    "submitExample": "Contoh: Kotak berubah warna setelah ditatap 1 detik. Pemicunya tatapan cursor fuse, listener click memanggil fungsi ubahWarna, dan responsnya kotak menjadi merah.",
    "summary": [
      "Interaksi memiliki pemicu dan respons.",
      "Event listener menghubungkan kejadian dengan fungsi respons.",
      "Target dan respons harus mudah terlihat oleh pengguna."
    ],
    "reflection": "Bagian mana dari alur pemicu → listener → respons yang paling sulit kamu pahami, dan bagaimana kamu mengujinya?",
    "times": [
      [
        "Kuis pembuka",
        8
      ],
      [
        "Demo pemicu & respons",
        10
      ],
      [
        "Gaze dengan kode awal",
        32
      ],
      [
        "Uji teman & perbaikan",
        20
      ],
      [
        "Kuis formatif & exit ticket",
        10
      ]
    ],
    "teacher": "Minta siswa menyebut pemicu, respons, dan bukti keberhasilan. Pengujian tanpa bantuan pembuat lebih berguna daripada pembuat mendemonstrasikan semuanya.",
    "questions": [
      [
        "Cursor dengan fuse diarahkan ke tombol, lalu tombol berubah warna. Pemicu dan responsnya adalah…",
        [
          "Warna adalah pemicu; tatapan adalah respons",
          "Tatapan selama durasi fuse adalah pemicu; perubahan warna adalah respons",
          "Nama file adalah pemicu; kamera adalah respons"
        ],
        1,
        "Interaksi menghubungkan kejadian pemicu dengan perubahan yang diamati."
      ],
      [
        "button.addEventListener(\"click\", startAnim) pada BSD berfungsi untuk…",
        [
          "Menghubungkan event click pada tombol ke fungsi startAnim",
          "Mengubah semua objek otomatis tanpa isi fungsi",
          "Membuat kamera baru"
        ],
        0,
        "Event listener memanggil fungsi ketika kejadian terjadi; isi fungsi menentukan respons."
      ],
      [
        "Tombol berfungsi, tetapi pengguna tidak menemukannya tanpa bantuan. Apa tindakan yang paling tepat?",
        [
          "Menambah model dekorasi sebelum menguji",
          "Hanya memberi penjelasan lisan saat demonstrasi",
          "Memperjelas target/petunjuk dan menguji lagi tanpa bantuan"
        ],
        2,
        "Target harus dapat ditemukan dan digunakan oleh pengunjung, bukan hanya pembuatnya."
      ]
    ],
    "openingQuestions": [
      [
        "scale=\"0.5 0.5 0.5\" pada model mengubah…",
        [
          "Lokasi model ke kiri",
          "Ukuran model menjadi separuh pada semua sumbu",
          "Warna model menjadi gelap"
        ],
        1,
        "scale mengatur ukuran, bukan lokasi atau warna."
      ],
      [
        "Aset sudah berada di <a-assets>, tetapi belum terlihat. Apa yang masih diperlukan?",
        [
          "Memberi judul halaman",
          "Menghapus semua lampu",
          "Elemen model dalam scene yang merujuk aset itu"
        ],
        2,
        "Preload aset tidak otomatis menampilkan objek di scene."
      ],
      [
        "Catatan sumber aset membantu…",
        [
          "Menelusuri pembuat dan ketentuan penggunaannya",
          "Mengganti fungsi kamera",
          "Mengatur koordinat model"
        ],
        0,
        "Catatan sumber diperlukan untuk penggunaan aset yang bertanggung jawab."
      ]
    ],
    "bsdFocus": [
      "A-Frame Gaze Interactions: kamera, cursor fuse, custom component dasar, dan click event (langkah 2–6) menjadi jembatan konsep.",
      "Guru menyediakan komponen awal; siswa mengubah satu respons warna dan menguji. Rangkaian press/release animation dan array warna lengkap BSD dapat dilanjutkan sebagai pengayaan."
    ],
    "preparation": "Siapkan HTML kamera/cursor/target dan JavaScript komponen yang sudah bekerja. Muat library A-Frame dahulu, komponen berikutnya, lalu scene. Uji pada perangkat siswa.",
    "minimumTarget": "Tatapan memicu satu perubahan yang terlihat; siswa menjelaskan listener dan mengubah respons sendiri.",
    "support": "Jangan meminta pemula menulis seluruh 14 langkah dari nol. Jika event/variabel belum siap, baca kode bersama dan siswa mengganti warna respons dengan penjelasan.",
    "exitQuestion": "Pada interaksimu, sebut pemicu, fungsi yang dipanggil, dan respons yang terlihat.",
    "exitExpected": "Menghubungkan gaze/fuse → click listener → fungsi respons → perubahan tampilan yang dapat diamati.",
    "brief": {
      "mainGoal": "Membuat satu interaksi gaze dengan respons yang terlihat dan menjelaskan alurnya.",
      "material": [
        "Interaksi mempunyai pemicu dan respons. Pada gaze, cursor di dalam kamera dapat mengaktifkan target setelah tatapan bertahan selama durasi fuse.",
        "Komponen JavaScript pada target memasang event listener. Listener menghubungkan kejadian dengan fungsi respons, misalnya perubahan warna. Guru menyediakan kode awal; kamu mempelajari alurnya lalu memodifikasi respons."
      ],
      "why": "Dunia virtual yang merespons memberi pengunjung sesuatu untuk dilakukan, sehingga target dan petunjuknya harus dapat dipahami.",
      "tasks": [
        "Jalankan kamera, cursor, target, dan komponen awal yang disiapkan guru.",
        "Modifikasi satu respons, lalu jelaskan hubungan pemicu, listener, dan fungsi responsnya.",
        "Minta teman mencoba tanpa petunjuk lisan; catat satu kesulitan dan lakukan satu perbaikan."
      ],
      "success": [
        "Tatapan pada target memicu perubahan tampilan yang terlihat.",
        "Kamu dapat menjelaskan alur pemicu → listener → fungsi → respons.",
        "Respons yang kamu ubah sendiri berjalan saat diuji."
      ],
      "wka": {
        "principle": "Kepedulian kepada sesama mengajak kita memperhatikan pengalaman orang yang memakai karya kita.",
        "reference": "Filipi 2:4",
        "url": "https://www.bible.com/id/bible/306/PHP.2.4.TB",
        "practice": "Perjelas target dan petunjuk berdasarkan kesulitan teman saat menguji.",
        "question": "Apa yang perlu kamu ubah agar interaksi lebih mudah digunakan orang lain?"
      },
      "teacherScript": "Hari ini scene kita mulai merespons pengguna. Kita akan mempelajari pemicu gaze, event listener, dan fungsi respons melalui kode awal. Tugas kalian mengubah satu respons, mengujinya, lalu menjelaskan alurnya kepada saya. Kepedulian kepada sesama terlihat dari target dan respons yang mudah dipahami orang lain."
    }
  },
  {
    "id": 6,
    "title": "Project akhir: diorama VR milikmu",
    "subtitle": "Rancang, bangun, dan kumpulkan diorama VR-mu di Sandbox BSD.",
    "tag": "Project akhir",
    "label": "Project akhir: Diorama",
    "lab": "plan",
    "prompt": "Apa satu pengalaman yang ingin kamu berikan kepada pengunjung dioramamu?",
    "bsd": [
      "Final Project: Diorama",
      "Sandbox"
    ],
    "scope": "Satu diorama mandiri yang memakai materi pertemuan 1–5. Dikerjakan sampai batas waktu dari guru.",
    "goals": [
      "Menentukan tema dan apa yang dilakukan pengunjung.",
      "Membangun diorama di Sandbox memakai bentuk, tekstur, cahaya, model, dan interaksi.",
      "Memeriksa semua fitur berjalan, lalu mengumpulkan versi final."
    ],
    "concepts": [
      [
        "Mulai dari tujuan",
        "Tulis siapa pengunjungnya dan apa yang mereka lihat atau lakukan. Pilih objek dan fitur yang mendukung pengalaman itu."
      ],
      [
        "Bangun versi minimum",
        "Utamakan objek gabungan, tekstur, pencahayaan, dan satu interaksi. Fitur tambahan dikerjakan setelah versi minimum berjalan."
      ],
      [
        "Rancangan boleh berkembang",
        "Sketsa tidak harus sempurna. Gunakan sebagai arah, lalu catat perubahan dan alasannya selama membuat karya."
      ],
      [
        "Simpan dan uji setiap langkah",
        "Tambahkan satu fitur, jalankan, lalu periksa hasilnya sebelum menambah fitur berikutnya. Masalah lebih mudah ditemukan bila perubahannya kecil."
      ]
    ],
    "code": "Rencana singkat:\nTema: ____________________\nPengunjung akan: ____________________\nObjek buatan sendiri: ____________________\nInteraksi utama: ____________________\nAset dan sumber: ____________________",
    "challenge": "",
    "evidence": "Diorama final di Sandbox + tema dan daftar fitur + catatan sumber aset.",
    "submitEvidence": "Tautan BSD diorama final + tema dan apa yang dilakukan pengunjung + daftar fitur + sumber aset pihak ketiga (jika ada).",
    "submitExample": "Contoh: Tema: kebun sekolah. Pengunjung menatap tanaman untuk melihat namanya. Fitur: tanaman dari kotak dan bola, jalan bertekstur, cahaya sore, model pohon Poly Pizza (Tree oleh Kenney, CC0), dan interaksi gaze.",
    "summary": [
      "Diorama dimulai dari tema dan tindakan pengunjung.",
      "Selesaikan fitur minimum dulu, tambahan belakangan.",
      "Uji setiap perubahan dan catat sumber aset."
    ],
    "reflection": "Bagian mana dari dioramamu yang paling kamu banggakan, dan apa yang ingin kamu perbaiki jika punya waktu lagi?",
    "times": [
      [
        "Kuis pembuka",
        8
      ],
      [
        "Brief & rubrik",
        7
      ],
      [
        "Tema, sketsa & fitur minimum",
        20
      ],
      [
        "Cek rancangan bersama guru",
        10
      ],
      [
        "Mulai diorama di Sandbox",
        25
      ],
      [
        "Kuis formatif & target berikutnya",
        10
      ]
    ],
    "teacher": "Periksa kelayakan tema dan fitur sebelum siswa membangun. Bagikan rubrik project akhir. Siswa boleh memakai referensi BSD, tetapi harus menjelaskan adaptasinya.",
    "questions": [
      [
        "Tujuan diorama: pengunjung menemukan tanaman dan mengaktifkan tombol informasi. Fitur mana yang diprioritaskan?",
        [
          "Efek suara pada seluruh objek",
          "Tanaman, target yang jelas, dan respons informasi",
          "Sebanyak mungkin model unduhan"
        ],
        1,
        "Prioritas mengikuti pengalaman pengunjung yang dipilih."
      ],
      [
        "Rancangan terlalu besar untuk waktu tersisa. Langkah yang tepat?",
        [
          "Mengurangi fitur tambahan dan menuntaskan versi minimum",
          "Tetap menambahkan fitur sambil menunda pengujian",
          "Mengganti tema setiap pertemuan"
        ],
        0,
        "Kurangi cakupan agar fungsi inti dapat selesai dan diuji."
      ],
      [
        "Setelah berdiskusi dengan guru, posisi target di sketsa diubah. Bukti proses yang disimpan?",
        [
          "Sketsa lama saja",
          "Hasil akhir tanpa catatan",
          "Sketsa awal, perubahan, dan alasan keputusan"
        ],
        2,
        "Bukti menunjukkan perkembangan dan alasan revisi, bukan hanya hasil akhirnya."
      ]
    ],
    "openingQuestions": [
      [
        "Dalam interaksi gaze, yang menjadi pemicu adalah…",
        [
          "Pengguna menatap target selama durasi yang ditetapkan",
          "Guru membuka buku nilai",
          "Pembuat mengganti judul"
        ],
        0,
        "Cursor fuse dapat mengaktifkan interaksi setelah tatapan bertahan pada target."
      ],
      [
        "Respons yang membantu pengguna adalah…",
        [
          "Kode lebih panjang tanpa perubahan tampak",
          "Target berubah tampilan setelah diaktifkan",
          "Nama file disembunyikan"
        ],
        1,
        "Respons yang dapat diamati memberi bukti bahwa tindakan berhasil."
      ],
      [
        "Saat waktu terbatas, fitur yang dibangun dahulu adalah…",
        [
          "Seluruh efek suara",
          "Model unduhan paling rumit",
          "Pengalaman utama yang dapat diuji"
        ],
        2,
        "Versi minimum dibuat sebelum fitur tambahan."
      ]
    ],
    "bsdFocus": [
      "Final Project: Diorama menjadi acuan; siswa membangun versi sendiri di Sandbox.",
      "Proyek pertemuan 1–5 boleh dipakai sebagai referensi, lalu diadaptasi ke tema sendiri."
    ],
    "preparation": "Bagikan rubrik project akhir sejak awal dan contoh catatan sumber aset. Tentukan apakah karya individu atau kelompok; pemahaman tetap diperiksa per siswa.",
    "minimumTarget": "Diorama bertema jelas dengan objek gabungan, tekstur, cahaya, satu model pihak ketiga, dan satu interaksi yang berjalan.",
    "support": "Kurangi fitur yang tidak mendukung tema. Jika bekerja berkelompok, catat kontribusi tiap siswa.",
    "exitQuestion": "Sebut satu tindakan pengunjung di dioramamu dan fitur yang mendukungnya.",
    "exitExpected": "Tema, tindakan pengunjung, dan fitur saling terkait; sumber aset tercatat.",
    "brief": {
      "mainGoal": "Membuat satu diorama VR bertema jelas di Sandbox BSD dengan materi pertemuan 1–5, lalu mengumpulkan versi final.",
      "material": [
        "Diorama adalah dunia kecil yang menyampaikan tema atau pengalaman tertentu. Mulailah dari pengunjung: apa yang akan mereka lihat atau lakukan?",
        "Versi minimum memuat objek gabungan buatan sendiri, tekstur, cahaya, satu model pihak ketiga dengan sumber yang dicatat, dan satu interaksi. Fitur tambahan dikerjakan setelah semuanya berjalan."
      ],
      "why": "Project akhir menunjukkan bahwa kamu bisa memakai seluruh materi untuk membuat karya sendiri.",
      "tasks": [
        "Tuliskan tema, pengunjung, dan satu pengalaman utama yang ingin diberikan.",
        "Buat sketsa, daftar fitur minimum, dan rencana sumber aset; periksa kelayakan dengan guru.",
        "Mulai scene di Sandbox dan tetapkan target pembangunan pertemuan berikutnya."
      ],
      "success": [
        "Tema dan tindakan pengunjung jelas.",
        "Fitur minimum berjalan tanpa error di Sandbox.",
        "Sumber aset pihak ketiga dicatat dan tautan final dikirim."
      ],
      "wka": {
        "principle": "Panggilan mengusahakan dan memelihara ciptaan memberi arah untuk menggunakan sumber daya dengan bertanggung jawab.",
        "reference": "Kejadian 2:15",
        "url": "https://www.bible.com/id/bible/306/GEN.2.15.TB",
        "practice": "Pilih tema yang menghargai ciptaan dan rencanakan penggunaan waktu serta aset secara bertanggung jawab.",
        "question": "Apa yang ingin kamu ajak pengunjung pahami atau pedulikan lewat tema diorama?"
      },
      "teacherScript": "Mulai hari ini kalian mengerjakan project akhir: diorama VR milik sendiri. Tentukan tema dan apa yang dilakukan pengunjung, lalu bangun dioramanya di Sandbox memakai bentuk, tekstur, cahaya, model, dan interaksi yang sudah kita pelajari. Kirim tautan versi final lewat form sebelum batas waktu. Prinsip memelihara ciptaan membantu kita menggunakan waktu dan aset secara bertanggung jawab."
    }
  }
];
const RUBRIC = [
  {
    "name": "Fungsi & keandalan",
    "max": 20,
    "descriptors": [
      "Fitur inti sebagian besar belum berjalan.",
      "Sebagian fitur inti berjalan; masalah mengganggu penggunaan.",
      "Sebagian besar fitur inti berjalan; ada kekurangan kecil.",
      "Seluruh fitur inti berjalan konsisten dan telah diuji."
    ]
  },
  {
    "name": "Penerapan A-Frame",
    "max": 20,
    "descriptors": [
      "Penerapan konsep masih terbatas atau banyak kekeliruan.",
      "Sebagian konsep digunakan tepat; struktur masih perlu diperbaiki.",
      "Konsep utama digunakan tepat dan kode cukup teratur.",
      "Konsep diterapkan tepat, teratur, dan sesuai kebutuhan karya."
    ]
  },
  {
    "name": "Desain & pengalaman pengguna",
    "max": 15,
    "descriptors": [
      "Tema, tata letak, atau interaksi sulit dipahami.",
      "Tema mulai terlihat; beberapa bagian membingungkan pengguna.",
      "Tema jelas; tata letak dan interaksi umumnya mudah dipahami.",
      "Tema, tata letak, tampilan, dan interaksi mendukung pengalaman yang jelas."
    ]
  },
  {
    "name": "Proses & revisi",
    "max": 15,
    "descriptors": [
      "Bukti rancangan, pengujian, atau revisi sangat terbatas.",
      "Ada sebagian bukti proses; alasan revisi belum jelas.",
      "Ada rancangan, pengujian, dan revisi yang dijelaskan.",
      "Bukti proses lengkap; revisi terarah dan diuji ulang."
    ]
  }
];

// Concise classroom tasks; original practice banks remain available as optional revision.
const CLASSROOM_TASKS = [
  {
    "steps": [
      "Buka Explore “Code Your Own World with VR”. Coba contoh dunianya.",
      "Buka Set up A-Frame. Jalankan scene dan satu objek.",
      "Ubah warna objek, lalu jalankan lagi."
    ],
    "challenge": "Tambahkan objek kedua dengan warna berbeda. Tunjukkan kode warna dan posisinya.",
    "result": "Scene dua objek + penjelasan satu atribut."
  },
  {
    "steps": [
      "Buka A-Frame Modeling. Coba posisi, rotasi, dan pengelompokan pada model DNA.",
      "Susun beberapa bentuk dalam satu objek induk.",
      "Jalankan scene dan ubah posisi induknya."
    ],
    "challenge": "Buat pohon, kursi, atau meja. Pindahkan atau putar lewat induknya.",
    "result": "Objek gabungan + demonstrasi perubahan posisi atau rotasi."
  },
  {
    "steps": [
      "Buka A-Frame Image Textures. Terapkan satu tekstur pada scene awal.",
      "Buka A-Frame Lighting and Fog. Coba cahaya dasar.",
      "Simpan gambar scene sebelum dan sesudah perubahan cahaya."
    ],
    "challenge": "Buat dua suasana. Pilih yang sesuai tema dan beri satu alasan.",
    "result": "Dua screenshot + alasan memilih suasana."
  },
  {
    "steps": [
      "Buka Import Third-Party Models into A-Frame di BSD. Pelajari a-assets, a-asset-item, dan a-gltf-model.",
      "Buka poly.pizza, cari satu model (misalnya bed, chair, tree), lalu klik modelnya. Catat judul, pembuat, lisensi, dan link halaman model.",
      "Ambil link file model: tekan Ctrl + U, tekan Ctrl + F dan ketik .glb, lalu salin link https://static.poly.pizza/....glb (jangan yang berakhiran .glb.br). Tidak perlu login atau klik Download.",
      "Di sandbox BSD, tempel link pada <a-asset-item id=\"model1\" src=\"...\">, tampilkan dengan <a-gltf-model src=\"#model1\">, dan tambahkan <a-box> 1 meter sebagai pembanding.",
      "Ubah scale dan position sampai ukuran model masuk akal dan berdiri di lantai."
    ],
    "challenge": "Tampilkan satu model Poly Pizza dengan ukuran yang masuk akal dibanding kubus 1 meter. Tulis sumbernya dan jelaskan satu kendala serta pemeriksaanmu.",
    "result": "Model Poly Pizza tampil + catatan sumber + penjelasan satu kendala."
  },
  {
    "steps": [
      "Buka A-Frame Gaze Interactions dengan kode awal dari guru.",
      "Jalankan kamera, cursor, dan target.",
      "Ubah respons warna. Uji dengan menatap target."
    ],
    "challenge": "",
    "result": "Interaksi gaze berjalan + penjelasan pemicu dan respons."
  },
  {
    "steps": [
      "Buka Final Project: Diorama di BSD. Pilih tema dan tentukan satu hal yang dilakukan pengunjung.",
      "Tulis daftar fitur minimum: bentuk gabungan, tekstur & cahaya, satu model pihak ketiga, dan satu interaksi.",
      "Bangun dioramanya di Sandbox BSD. Jalankan setiap kali menambah fitur.",
      "Pastikan semua fitur berjalan, catat sumber aset, lalu simpan versi final.",
      "Kirim tautan diorama final lewat form di bawah."
    ],
    "challenge": "",
    "result": "Diorama final + tema & daftar fitur + catatan sumber aset."
  }
];
const CLASSROOM_TIMES = [[["Demo singkat & tujuan",5],["Eksplorasi contoh VR",10],["Scene pertama & tantangan",55],["Tunjukkan hasil & refleksi",10]],[["Demo singkat & target",5],["Modeling terpandu",30],["Modifikasi objek",35],["Tunjukkan hasil & refleksi",10]],[["Demo singkat & target",5],["Tekstur pada scene awal",25],["Cahaya dasar",25],["Bandingkan dua versi",15],["Tunjukkan hasil & refleksi",10]],[["Demo impor & sumber",10],["Impor model terpandu",35],["Skala, posisi & pengujian",25],["Tunjukkan hasil & refleksi",10]],[["Demo pemicu & respons",10],["Gaze dengan kode awal",40],["Ubah respons & uji",20],["Tunjukkan hasil & refleksi",10]],[["Brief & rubrik",10],["Tema & daftar fitur",15],["Membangun di Sandbox",45],["Simpan & tunjukkan progres",10]]];
LESSONS.forEach((lesson,index)=>{lesson.classroom=CLASSROOM_TASKS[index];lesson.times=CLASSROOM_TIMES[index];lesson.brief.tasks=lesson.classroom.steps;});
LESSONS[0].brief.teacherScript="Hari ini kita membuat scene VR pertama. Buka dua bagian BSD yang tertulis, jalankan satu objek, lalu ubah warnanya. Tantangannya: tambah objek kedua dengan warna berbeda. Tunjukkan hasil dan kode satu atribut kepada saya.";
