// Materi pendamping kelas, diselaraskan dengan bagian inti BSD; soal disusun guru.
const CONFIG = {
  "gradebookUrl": "../index.html",
  "bsdUrl": "https://app.bsd.education/",
  "teacher": "Andi Purba",
  "course": "Construct a VR World"
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
    "exitExpected": "Menyebut a-scene; menghubungkan atribut yang benar (mis. color/position) dengan perubahan yang diamati."
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
    "exitExpected": "Anak ikut bergeser bersama induk. Untuk contoh tanpa rotasi/skala tambahan, posisi dunia X bertambah dua."
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
    "exitExpected": "Mengusulkan penyesuaian cahaya yang menjaga tema; memeriksa apakah pengguna lebih mudah melihat/menemukan target."
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
    "scope": "Gunakan satu model contoh yang disiapkan guru. Hindari menghabiskan waktu mencari aset.",
    "goals": [
      "Memasukkan satu model pihak ketiga.",
      "Menyesuaikan ukuran dan posisi model.",
      "Mencatat pembuat, sumber, dan izin penggunaan aset."
    ],
    "concepts": [
      [
        "Model merupakan aset",
        "Model 3D perlu tersedia pada alamat yang bisa diakses. Ikuti format dan metode impor yang digunakan pada latihan BSD."
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
    "code": "<a-scene renderer=\"colorManagement: true;\">\n  <a-assets>\n    <a-asset-item id=\"room\"\n      src=\"/resources/projects/importing-models/scene.gltf\">\n    </a-asset-item>\n  </a-assets>\n  <a-gltf-model src=\"#room\"></a-gltf-model>\n</a-scene>",
    "challenge": "Masukkan satu model, sesuaikan agar proporsinya masuk akal, lalu tambahkan catatan sumbernya. Jelaskan satu masalah yang muncul dan pemeriksaan yang kamu lakukan.",
    "evidence": "Model tampil dengan ukuran sesuai + catatan sumber + penjelasan kendala.",
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
    "teacher": "Siapkan model yang bisa dimuat dan izin yang jelas. Jika akses aset bermasalah, gunakan aset guru. Jangan menilai siswa berdasarkan kerumitan model unduhan.",
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
    "preparation": "Uji model room BSD dan siapkan alternatif berizin jelas. Sediakan catatan sumber; kegiatan mencari model dibatasi di luar kelas.",
    "minimumTarget": "Satu model tampil, proporsinya sesuai scene, sumber dan ketentuannya dicatat.",
    "support": "Jika aset gagal, pakai model guru yang sudah diuji. Periksa src/id dahulu, kemudian posisi, skala, dan kamera.",
    "exitQuestion": "Aset room sudah dimuat tetapi tidak terlihat. Tuliskan elemen untuk menampilkannya dan dua pemeriksaan berikutnya.",
    "exitExpected": "Menggunakan a-gltf-model src=\"#room\"; memeriksa kecocokan id/alamat, posisi, skala atau kamera dengan alasan."
  },
  {
    "id": 5,
    "title": "Dunia yang merespons",
    "subtitle": "Bangun interaksi gaze dan uji bersama teman.",
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
      "Menguji apakah teman memahami cara menggunakannya."
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
        "Uji tanpa memberi jawaban",
        "Minta teman mencoba sendiri terlebih dahulu. Amati bagian yang membingungkan, lalu perbaiki target, petunjuk, atau respons."
      ],
      [
        "Cursor dan listener saling terhubung",
        "Camera memuat cursor fuse. Komponen pada target memasang click listener; fungsi yang dipanggil menentukan respons. Pelajari struktur dasar ini memakai kode awal guru."
      ],
      [
        "Cursor dan listener saling terhubung",
        "Camera memuat cursor fuse. Komponen pada target memasang click listener; fungsi yang dipanggil menentukan respons. Pelajari struktur dasar ini memakai kode awal guru."
      ]
    ],
    "code": "<!-- Contoh adaptasi sederhana; bukan seluruh proyek BSD. -->\n<!-- Muat library A-Frame, daftarkan komponen berikut sebelum scene. -->\n<script>\nAFRAME.registerComponent(\"ubah-warna\", {\n  init: function () {\n    const target = this.el;\n    target.addEventListener(\"click\", function () {\n      target.setAttribute(\"color\", \"green\");\n    });\n  }\n});\n</script>\n<a-scene>\n  <a-camera><a-cursor fuse=\"true\" fuse-timeout=\"1500\"></a-cursor></a-camera>\n  <a-box ubah-warna position=\"0 1.6 -3\" color=\"yellow\"></a-box>\n</a-scene>",
    "challenge": "Buat satu target interaktif. Minta teman mencoba tanpa penjelasan lisan, kemudian perbaiki satu bagian berdasarkan hasil pengujian.",
    "evidence": "Interaksi yang berjalan + satu temuan pengguna + satu perbaikan.",
    "summary": [
      "Interaksi memiliki pemicu dan respons.",
      "Target serta petunjuk harus mudah dipahami.",
      "Pengujian oleh orang lain membantu menemukan masalah."
    ],
    "reflection": "Apa yang dilakukan temanmu berbeda dari perkiraanmu saat menguji interaksi?",
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
    "exitQuestion": "Pada interaksimu, sebut pemicu, fungsi yang dipanggil, respons, dan cara teman membuktikan respons itu berjalan.",
    "exitExpected": "Menghubungkan gaze/fuse → click listener → fungsi respons → perubahan tampilan yang dapat diamati."
  },
  {
    "id": 6,
    "title": "Rancang diorama milikmu",
    "subtitle": "Pilih tema, batasi cakupan, lalu mulai membangun.",
    "tag": "Proyek",
    "label": "Rancangan diorama",
    "lab": "plan",
    "prompt": "Apa satu pengalaman yang ingin kamu berikan kepada pengunjung dioramamu?",
    "bsd": [
      "Final Project: Diorama",
      "Referencing previous projects"
    ],
    "scope": "Proyek kelas disederhanakan untuk 9 pertemuan. Sepakati tema dan fitur minimum bersama guru.",
    "goals": [
      "Menentukan tema dan pengalaman yang ingin dibuat.",
      "Menggambar tata letak dan memilih fitur yang realistis.",
      "Memulai scene mandiri di Sandbox."
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
      ]
    ],
    "code": "Rencana singkat:\nTema: ____________________\nPengunjung akan: ____________________\nObjek buatan sendiri: ____________________\nInteraksi utama: ____________________\nAset dan sumber: ____________________",
    "challenge": "Buat sketsa dan daftar fitur minimum. Periksa cakupannya bersama guru sebelum mulai membangun di Sandbox.",
    "evidence": "Sketsa + daftar fitur + scene awal di Sandbox.",
    "summary": [
      "Tema membantu memilih fitur.",
      "Cakupan kecil yang selesai lebih berguna daripada rancangan besar yang belum berfungsi.",
      "Rancangan dan revisi merupakan bagian dari bukti proses."
    ],
    "reflection": "Fitur apa yang akan kamu tunda agar pengalaman utamanya bisa selesai?",
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
    "teacher": "Periksa kelayakan cakupan sebelum siswa membangun. Bagikan rubrik dan contoh bukti proses. Proyek boleh memakai referensi BSD; siswa harus menjelaskan adaptasinya.",
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
      "Final Project: Diorama dan Referencing previous projects menjadi dasar; kelas memilih versi minimum yang realistis.",
      "Mulai di Sandbox dan pakai proyek sebelumnya sebagai referensi, lalu adaptasi terhadap tema sendiri."
    ],
    "preparation": "Bagikan brief/rubrik sejak awal dan contoh catatan sumber. Tentukan apakah karya individu/kelompok; bukti penguasaan tetap individu.",
    "minimumTarget": "Sketsa, tujuan pengunjung, daftar fitur minimum, dan scene awal tersimpan.",
    "support": "Kurangi fitur yang tidak mendukung tujuan. Jika bekerja berkelompok, catat kontribusi dan pemahaman tiap siswa.",
    "exitQuestion": "Sebut satu tindakan pengunjung, fitur minimum yang mendukungnya, dan fitur tambahan yang kamu tunda.",
    "exitExpected": "Tujuan dan fitur minimum saling terkait; tambahan ditunda dengan alasan waktu/kelayakan."
  },
  {
    "id": 7,
    "title": "Bangun, uji, pecahkan",
    "subtitle": "Kembangkan karya dan telusuri kendala satu per satu.",
    "tag": "Proyek",
    "label": "Pengembangan",
    "lab": "debug",
    "prompt": "Apa perbedaan antara mencoba angka secara acak dan menguji sebuah dugaan?",
    "bsd": [
      "Sandbox",
      "Proyek sebelumnya sebagai referensi"
    ],
    "scope": "Bangun fitur minimum. Gunakan tutorial sebagai referensi, lalu sesuaikan dengan rancanganmu.",
    "goals": [
      "Mengembangkan objek, tampilan, dan interaksi utama.",
      "Menelusuri kendala melalui pengujian satu perubahan.",
      "Menjelaskan kode dan mencatat perbaikan."
    ],
    "concepts": [
      [
        "Nyatakan masalahnya",
        "Bedakan hasil yang diharapkan dengan yang terjadi. Sebut bagian scene atau kode yang terkait."
      ],
      [
        "Uji satu dugaan",
        "Periksa perubahan terakhir dan coba satu perbaikan. Banyak perubahan sekaligus membuat penyebabnya sulit diketahui."
      ],
      [
        "Simpan jejak proses",
        "Catat masalah, tindakan, dan hasil. Tangkapan layar sebelum-sesudah dapat menjadi bukti revisi."
      ]
    ],
    "code": "Catatan debugging:\nHarapan: ____________________\nYang terjadi: ____________________\nDugaan penyebab: ____________________\nSatu perubahan yang diuji: ____________________\nHasil: ____________________",
    "challenge": "Pilih satu masalah dalam diorama. Catat dugaan, uji satu perubahan, dan jelaskan hasilnya kepada guru.",
    "evidence": "Prototipe diorama + satu catatan debugging + penjelasan kode.",
    "summary": [
      "Masalah perlu dijelaskan secara spesifik.",
      "Uji satu perubahan agar penyebab lebih mudah ditelusuri.",
      "Kemampuan menjelaskan kode merupakan bukti penguasaan individual."
    ],
    "reflection": "Dugaan apa yang berubah setelah kamu melihat hasil pengujian?",
    "times": [
      [
        "Kuis pembuka & target",
        5
      ],
      [
        "Pengembangan diorama",
        50
      ],
      [
        "Cek kode & demonstrasi individual",
        15
      ],
      [
        "Kuis formatif & log proses",
        10
      ]
    ],
    "teacher": "Mulai demonstrasi individual untuk penilaian sumatif. Tanyakan alasan kode, lalu minta satu modifikasi kecil. Catat bukti terpisah dari penilaian kelompok.",
    "questions": [
      [
        "Interaksi berhenti setelah kode respons diubah. Langkah debugging yang tepat?",
        [
          "Mengubah seluruh HTML dan JS bersamaan",
          "Memeriksa perubahan respons terakhir dan menguji satu dugaan",
          "Menyembunyikan tombol supaya tidak perlu diuji"
        ],
        1,
        "Perubahan terakhir memberi petunjuk yang perlu diuji secara terarah."
      ],
      [
        "Setelah mengganti satu nilai, fitur berjalan lagi. Agar kesimpulan lebih kuat, kamu…",
        [
          "Menguji ulang dan mencatat hubungan perubahan dengan hasil",
          "Menganggap semua bug lain ikut selesai",
          "Menghapus catatan dugaan"
        ],
        0,
        "Uji ulang dan catatan membantu memeriksa apakah perbaikan konsisten."
      ],
      [
        "Catatan mana yang paling berguna untuk dibahas dengan guru?",
        [
          "Proyek sulit",
          "Saya mengganti beberapa angka",
          "Kotak tak tampak; dugaan Z salah; Z diubah ke -3; kotak kini terlihat"
        ],
        2,
        "Catatan menyebut masalah, dugaan, tindakan spesifik, dan hasil."
      ]
    ],
    "openingQuestions": [
      [
        "Tujuan pengunjung dalam rancangan sebaiknya…",
        [
          "Memuat sebanyak mungkin efek",
          "Sama dengan nama file",
          "Menyebut apa yang akan dilihat atau dilakukan"
        ],
        2,
        "Tujuan yang jelas membantu memilih fitur yang mendukung pengalaman."
      ],
      [
        "Jika memakai model pihak ketiga, bukti apa yang disiapkan?",
        [
          "Sumber dan ketentuan penggunaan",
          "Hanya warna model",
          "Hanya jumlah objek"
        ],
        0,
        "Sumber dan izin dicatat bersama karya."
      ],
      [
        "Fitur minimum belum bekerja. Apa prioritas sesi membangun?",
        [
          "Menambah fitur lain",
          "Membuat dan menguji fitur minimum",
          "Mengganti tema setiap kali"
        ],
        1,
        "Utamakan bagian yang dibutuhkan untuk pengalaman utama."
      ]
    ],
    "bsdFocus": [
      "Diorama di Sandbox: bangun versi minimum dari rancangan yang disetujui, bukan mengikuti proyek baru.",
      "Gunakan bagian tutorial BSD yang relevan saat debugging; catat modifikasi sendiri."
    ],
    "preparation": "Siapkan daftar cek fitur dan jadwal siswa yang diperiksa individual. Periksa bukti sumber, kode dan hasil; bantu menelusuri satu kendala.",
    "minimumTarget": "Prototipe yang bisa diuji, satu log debugging, dan penjelasan satu bagian kode.",
    "support": "Tangani kendala yang menghalangi fungsi utama dahulu. Mulai pengambilan bukti demonstrasi agar tidak menumpuk pada pertemuan 9.",
    "exitQuestion": "Catat satu masalah: harapan, yang terjadi, dugaan, satu perubahan, dan hasil uji.",
    "exitExpected": "Log menyebut masalah spesifik, dugaan yang dapat diuji, perubahan dan hasil yang berkaitan."
  },
  {
    "id": 8,
    "title": "Lihat dari mata pengguna",
    "subtitle": "Dengarkan umpan balik. Revisi dengan tujuan.",
    "tag": "Proyek",
    "label": "Pengujian & revisi",
    "lab": "test",
    "prompt": "Apakah sebuah scene sudah berhasil jika pembuatnya bisa memakai, tetapi pengunjungnya bingung?",
    "bsd": [
      "Diorama di Sandbox"
    ],
    "scope": "Uji karya teman, perbaiki masalah utama, dan simpan versi final.",
    "goals": [
      "Mengumpulkan umpan balik yang spesifik.",
      "Memprioritaskan masalah fungsi dan keterlihatan.",
      "Menunjukkan revisi dan alasan perbaikannya."
    ],
    "concepts": [
      [
        "Berikan tugas yang jelas",
        "Contoh: temukan target, aktifkan interaksi, dan ceritakan tema scene. Amati pengguna tanpa langsung mengarahkan."
      ],
      [
        "Umpan balik harus spesifik",
        "Sebut apa yang terjadi, dampaknya, dan satu saran. Contoh: target gelap sehingga sulit ditemukan; coba tambah cahaya."
      ],
      [
        "Prioritaskan perbaikan",
        "Dahulukan fitur utama yang gagal atau membingungkan. Setelah itu, rapikan detail visual jika masih ada waktu."
      ]
    ],
    "code": "Catatan pengujian:\nTugas pengguna: ____________________\nYang diamati: ____________________\nDampaknya: ____________________\nRevisi yang dipilih: ____________________\nHasil setelah diuji ulang: ____________________",
    "challenge": "Minta teman menguji dioramamu. Catat satu masalah penting, perbaiki, lalu uji ulang bersama teman tersebut.",
    "evidence": "Versi final + satu bukti sebelum-sesudah + alasan revisi.",
    "summary": [
      "Pengujian memerlukan tugas dan pengamatan.",
      "Umpan balik spesifik lebih mudah ditindaklanjuti.",
      "Revisi perlu diuji ulang untuk mengetahui apakah masalahnya teratasi."
    ],
    "reflection": "Umpan balik mana yang kamu gunakan, dan mengapa kamu memilihnya?",
    "times": [
      [
        "Kuis pembuka",
        5
      ],
      [
        "Uji oleh teman",
        15
      ],
      [
        "Revisi fungsi & desain",
        35
      ],
      [
        "Demonstrasi individual",
        15
      ],
      [
        "Kuis formatif, exit & simpan",
        10
      ]
    ],
    "teacher": "Lanjutkan demonstrasi individual. Nilai kualitas tanggapan terhadap umpan balik, bukan banyaknya komentar yang diterima. Pastikan karya tersimpan sebelum akhir kelas.",
    "questions": [
      [
        "Komentar teman: target gelap, perlu 20 detik menemukannya. Revisi yang paling langsung?",
        [
          "Meningkatkan keterlihatan target dan menguji waktu menemukan lagi",
          "Mengganti nama file",
          "Menambahkan musik tanpa mengubah target"
        ],
        0,
        "Perbaikan diarahkan pada masalah yang benar-benar diamati."
      ],
      [
        "Dua masalah ditemukan: tombol gagal dan warna dekorasi kurang cocok. Mana didahulukan?",
        [
          "Warna dekorasi",
          "Tombol yang dibutuhkan pengalaman utama",
          "Menambah fitur ketiga"
        ],
        1,
        "Kegagalan fungsi inti lebih mengganggu tujuan daripada detail dekorasi."
      ],
      [
        "Bukti bahwa revisi berhasil adalah…",
        [
          "Pembuat merasa sudah bagus",
          "Jumlah kode bertambah",
          "Teman dapat menyelesaikan tugas setelah revisi, dengan catatan hasil uji ulang"
        ],
        2,
        "Dampak revisi diperiksa melalui tugas pengguna yang sama."
      ]
    ],
    "openingQuestions": [
      [
        "Saat debugging, mengapa mengubah satu hal dahulu?",
        [
          "Supaya kode selalu pendek",
          "Supaya dampak perubahan dapat ditelusuri",
          "Supaya tidak perlu menguji lagi"
        ],
        1,
        "Satu perubahan membantu menguji dugaan penyebab."
      ],
      [
        "Bukti proses yang membantu adalah…",
        [
          "Hanya hasil akhir",
          "Hanya judul",
          "Masalah, perubahan, dan hasil pengujian"
        ],
        2,
        "Bukti proses menunjukkan tindakan dan hasilnya."
      ],
      [
        "Teman akan menguji target interaksi. Apa yang disiapkan?",
        [
          "Tugas yang jelas dan catatan pengamatan",
          "Petunjuk lisan untuk setiap langkah",
          "Daftar semua warna"
        ],
        0,
        "Tugas yang jelas membuat hasil pengujian dapat diamati."
      ]
    ],
    "bsdFocus": [
      "Diorama di Sandbox: teman menjalankan tugas penggunaan, pembuat mengamati dan merevisi.",
      "Tidak menambah proyek tutorial baru. Simpan versi akhir dan bukti sebelum/sesudah."
    ],
    "preparation": "Siapkan pasangan penguji dan tugas: temukan target, aktifkan, ceritakan tema. Sediakan lembar catatan pengamatan dan siswa berikutnya untuk demonstrasi.",
    "minimumTarget": "Versi final, satu temuan pengguna, perubahan dan uji ulang yang terdokumentasi.",
    "support": "Batasi revisi pada masalah utama. Jika jadwal individual penuh, kumpulkan penjelasan kode singkat sebagai rekaman lalu verifikasi modifikasi langsung.",
    "exitQuestion": "Apa temuan penguji, perubahan yang kamu pilih, dan hasil tugas yang sama setelah diuji ulang?",
    "exitExpected": "Menghubungkan masalah yang diamati, revisi terarah, dan dampak uji ulang."
  },
  {
    "id": 9,
    "title": "Saatnya menunjukkan karyamu",
    "subtitle": "Demonstrasikan, jelaskan, dan refleksikan.",
    "tag": "Showcase",
    "label": "Demonstrasi akhir",
    "lab": "showcase",
    "prompt": "Bagian mana dari karyamu yang paling menunjukkan bahwa kamu sudah bisa membuat keputusan sendiri?",
    "bsd": [
      "Diorama final",
      "Tes konsep materi inti yang diberikan guru"
    ],
    "scope": "Penilaian hanya mencakup materi yang diajarkan. Kuis di website ini adalah latihan, bukan ujian yang otomatis tercatat.",
    "goals": [
      "Menunjukkan fitur utama yang bekerja.",
      "Menjelaskan kode dan keputusan desain secara individual.",
      "Merefleksikan perkembangan selama course."
    ],
    "concepts": [
      [
        "Tunjukkan hasil dan alasan",
        "Jelaskan tema, bagian kode penting, fitur utama, dan satu revisi. Demonstrasi singkat perlu fokus pada bukti."
      ],
      [
        "Penguasaan itu individual",
        "Walau karya berkelompok, setiap siswa perlu menjelaskan bagian yang dipahami dan melakukan modifikasi kecil."
      ],
      [
        "Nilai memakai kriteria",
        "Diorama dan proses berbobot 70%, demonstrasi individual 20%, tes konsep 10%. Detailnya ada pada halaman proyek akhir."
      ]
    ],
    "code": "Urutan demonstrasi:\n1. Tema dan pengalaman utama.\n2. Fitur yang berfungsi.\n3. Bagian kode yang kamu pahami.\n4. Satu revisi dan alasannya.\n5. Modifikasi kecil sesuai arahan guru.",
    "challenge": "Siapkan demonstrasi singkat dan bukti proses. Berlatih menjelaskan satu bagian kode tanpa membaca tutorial.",
    "evidence": "Diorama final + dokumentasi + demonstrasi individual + tes konsep yang diberikan guru.",
    "summary": [
      "Karya yang berfungsi perlu disertai pemahaman.",
      "Fitur tambahan tidak otomatis membuat nilai lebih tinggi.",
      "Progres latihan membantu persiapan; nilai resmi ditetapkan melalui rubrik guru."
    ],
    "reflection": "Apa yang kini bisa kamu lakukan secara mandiri, dan apa yang ingin kamu pelajari berikutnya?",
    "times": [
      [
        "Kuis pembuka & kesiapan",
        5
      ],
      [
        "Tes konsep resmi dari guru",
        15
      ],
      [
        "Demonstrasi tersisa & pengumpulan",
        50
      ],
      [
        "Exit ticket & refleksi akhir",
        10
      ]
    ],
    "teacher": "Gunakan bukti demonstrasi dari pertemuan 7–9. Sesuaikan jumlah soal dan waktu dengan jumlah siswa. Kuis latihan di sini terbuka untuk pembahasan; gunakan soal berbeda untuk tes resmi.",
    "questions": [
      [
        "Objek A-Frame perlu ditempatkan di dalam…",
        [
          "<a-scene>",
          "<a-assets> saja",
          "<script> saja"
        ],
        0,
        "Scene menampung elemen dunia 3D; assets memuat sumber dan script berisi program."
      ],
      [
        "position=\"-2 1 -4\" diubah menjadi \"2 1 -4\". Apa yang berubah?",
        [
          "Tinggi bertambah",
          "Posisi X bergeser ke kanan",
          "Ukuran bertambah"
        ],
        1,
        "Hanya X berubah dari -2 ke 2; Y dan Z tetap."
      ],
      [
        "Kotak harus berputar tanpa berpindah tempat. Atribut yang diubah?",
        [
          "position",
          "scale",
          "rotation"
        ],
        2,
        "rotation mengubah orientasi, bukan lokasi."
      ],
      [
        "Anak objek berada di dalam induk yang dipindahkan. Apa yang terjadi?",
        [
          "Anak ikut transformasi induk",
          "Anak selalu tetap di posisi dunia semula",
          "Anak otomatis menjadi lebih besar"
        ],
        0,
        "Transformasi induk memengaruhi kelompok anak."
      ],
      [
        "Model sudah termuat, tetapi terlalu kecil. Perbaikan yang paling langsung?",
        [
          "Mengubah position saja",
          "Meningkatkan scale lalu membandingkan proporsi",
          "Menghapus alamat aset"
        ],
        1,
        "scale mengatur ukuran; tetap uji proporsinya dalam scene."
      ],
      [
        "Tekstur gagal dimuat. Pemeriksaan pertama yang terkait masalahnya?",
        [
          "Alamat gambar pada src dan akses aset",
          "Nama pembuat proyek",
          "Jumlah pertemuan"
        ],
        0,
        "Sumber gambar yang salah/tidak dapat diakses menghambat pemuatan tekstur."
      ],
      [
        "Pada interaksi gaze, event listener menghubungkan…",
        [
          "Judul dengan tanggal",
          "Model dengan sumber unduhan",
          "Kejadian pada target dengan fungsi respons"
        ],
        2,
        "Listener memanggil fungsi saat event yang didaftarkan terjadi."
      ],
      [
        "Model pihak ketiga tidak mempunyai izin yang jelas. Kamu sebaiknya…",
        [
          "Memeriksa sumber atau memilih aset yang ketentuannya jelas",
          "Menghapus catatan sumber",
          "Menganggap semua unduhan bebas digunakan"
        ],
        0,
        "Periksa ketentuan penggunaan sebelum memasukkan aset ke karya."
      ],
      [
        "Scene rusak setelah beberapa perubahan. Cara menelusuri penyebabnya?",
        [
          "Menambah fitur sampai terlihat berbeda",
          "Menyatakan masalah, memeriksa perubahan, dan menguji satu dugaan",
          "Mengubah seluruh kode tanpa mencatat"
        ],
        1,
        "Pengujian satu dugaan membantu menghubungkan perubahan dan hasil."
      ],
      [
        "Dokumentasi revisi yang menunjukkan belajar adalah…",
        [
          "Hasil akhir saja",
          "Jumlah komentar yang diterima saja",
          "Temuan pengguna, perubahan yang dipilih, dan hasil uji ulang"
        ],
        2,
        "Bukti menjelaskan alasan serta dampak revisi."
      ]
    ],
    "openingQuestions": [
      [
        "Setelah memperbaiki target yang sulit ditemukan, kamu perlu…",
        [
          "Menguji ulang dengan pengguna",
          "Menganggap pasti berhasil",
          "Menghapus bukti sebelumnya"
        ],
        0,
        "Uji ulang memberi bukti apakah masalah telah teratasi."
      ],
      [
        "Dalam demonstrasi individual, bukti penguasaan adalah…",
        [
          "Hanya membuka hasil akhir",
          "Menjelaskan kode dan melakukan modifikasi kecil",
          "Hanya menyebut bahwa BSD Passed"
        ],
        1,
        "Penjelasan dan modifikasi menunjukkan pemahaman yang dapat diamati."
      ],
      [
        "Kuis latihan terbuka di website ini digunakan untuk…",
        [
          "Menetapkan otomatis seluruh nilai akhir",
          "Menggantikan semua bukti proyek",
          "Persiapan dan pemeriksaan pemahaman"
        ],
        2,
        "Nilai resmi ditetapkan guru melalui bukti proyek, demonstrasi, dan tes yang diberikan guru."
      ]
    ],
    "bsdFocus": [
      "Diorama final dan tes konsep yang dipilih/disusun guru hanya untuk materi inti yang benar-benar diajarkan.",
      "10 soal pada tab Kuis adalah latihan terbuka sebelum pertemuan 9; bukan soal tes resmi yang menghabiskan waktu agenda ini."
    ],
    "preparation": "Siapkan tes berbeda dari latihan terbuka, jadwal demonstrasi tersisa, rubrik dan lokasi pengumpulan. Ambil bukti individual sejak pertemuan 7–8.",
    "minimumTarget": "Karya dan proses dikumpulkan; setiap siswa memberi penjelasan/modifikasi; tes konsep diberikan guru.",
    "support": "Total slot demonstrasi pertemuan 7–9 adalah 80 menit: sekitar 26 siswa bila 3 menit/orang. Untuk kelas lebih besar, ambil rekaman penjelasan sebelumnya dan cek modifikasi langsung singkat; jangan memaksakan semua presentasi di pertemuan 9.",
    "exitQuestion": "Pilih satu keputusan desain dan tunjukkan konsep A-Frame yang kamu gunakan. Bukti apa yang menunjukkan keputusan itu berhasil?",
    "exitExpected": "Menghubungkan keputusan, bagian kode/konsep yang tepat, dan bukti pengujian/karya; bukan sekadar mengatakan selesai."
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
