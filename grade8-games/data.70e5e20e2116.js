'use strict';
const CONFIG={gradebookUrl:'../index.html',bsdUrl:'https://app.bsd.education/'};
const BSD_SOURCES=[
  {
    "name": "explore-mobile-game-development",
    "title": "Explore \"Mobile Game Developer\"",
    "steps": 7,
    "url": "https://app.bsd.education/project/explore-mobile-game-development",
    "definition": "https://app.bsd.education/missions/f0374bbe-3922-4fc0-add8-ef7bd460801c/0.20/mission.json",
    "revision": "0.20"
  },
  {
    "name": "tn-platformer-game",
    "title": "Platformer Game",
    "steps": 22,
    "url": "https://app.bsd.education/project/tn-platformer-game",
    "definition": "https://app.bsd.education/missions/58431e38-36fa-4aea-a929-3a2b38158d09/0.340/mission.json",
    "revision": "0.340"
  },
  {
    "name": "tn-traffic-looper-game",
    "title": "Traffic Looper",
    "steps": 19,
    "url": "https://app.bsd.education/project/tn-traffic-looper-game",
    "definition": "https://app.bsd.education/missions/c7faa019-049c-44fc-9392-80b8229f2fc6/0.259/mission.json",
    "revision": "0.259"
  },
  {
    "name": "tn-nonogram-game",
    "title": "Nonogram",
    "steps": 20,
    "url": "https://app.bsd.education/project/tn-nonogram-game",
    "definition": "https://app.bsd.education/missions/4af447a0-91b1-488d-a65b-5f2e05eefcdf/0.196/mission.json",
    "revision": "0.196"
  },
  {
    "name": "tn-dungeon-battle",
    "title": "Dungeon Battle",
    "steps": 25,
    "url": "https://app.bsd.education/project/tn-dungeon-battle",
    "definition": "https://app.bsd.education/missions/a9c1e70b-b688-4ecd-94a5-a553eeaa1167/0.331/mission.json",
    "revision": "0.331"
  },
  {
    "name": "tn-wall-jumper",
    "title": "Wall Jumper",
    "steps": 27,
    "url": "https://app.bsd.education/project/tn-wall-jumper",
    "definition": "https://app.bsd.education/missions/10831669-f79c-4976-acf1-15b6053df32d/0.224/mission.json",
    "revision": "0.224"
  }
];
const LESSONS=[
  {
    "title": [
      "Mulai dunia game",
      "Start your game world"
    ],
    "goal": [
      "Membuat area game, sprite, dan susunan tile dengan HTML, CSS, dan array.",
      "Build a game area, sprites, and a tile layout using HTML, CSS, and arrays."
    ],
    "learn": [
      "HTML menempatkan objek; CSS mengatur tampilan; floorData dan coinsData menentukan susunan level.",
      "HTML places objects; CSS controls appearance; floorData and coinsData define the level layout."
    ],
    "sources": [
      "explore-mobile-game-development",
      "tn-platformer-game"
    ],
    "range": "Explore 1–7 · Platformer 2–12",
    "tasks": [
      [
        "Coba lima demo pada Explore “Mobile Game Developer” selama 10 menit.",
        "Try the five demos in Explore “Mobile Game Developer” for 10 minutes."
      ],
      [
        "Buka Platformer Game. Kerjakan area game, background, tile, coin, dan player sampai langkah 12.",
        "Open Platformer Game. Build the game area, background, tiles, coins, and player through step 12."
      ],
      [
        "Ubah satu nilai floorData. Jalankan kode dan lihat perubahan tile.",
        "Change one floorData value. Run the code and observe the tiles."
      ]
    ],
    "challenge": [
      "Ubah satu bagian lantai dan jumlah coin di tempat yang sama. Prediksi tampilannya sebelum Run.",
      "Change one section of floor tiles and its coin count. Predict the layout before Run."
    ],
    "result": [
      "Area game dengan player, tile, dan coin + penjelasan satu perubahan array.",
      "A game area with a player, tiles, and coins + explain one array change."
    ],
    "check": [
      "Bandingkan tampilan sebelum/sesudah. Kontrol lompat akan diselesaikan pada pertemuan 2.",
      "Compare before and after. Jump controls will be completed in lesson 2."
    ],
    "prep": [
      "Siapkan akun, aset BSD, dan contoh Platformer. Bila langkah 2–12 belum selesai, lanjutkan bersama kode checkpoint sebelum pertemuan 2; jangan menuntut game sudah dapat dimainkan hari ini.",
      "Prepare accounts, BSD assets, and a Platformer example. If steps 2–12 are unfinished, continue with a checkpoint before lesson 2; do not require playable controls today."
    ],
    "oral": [
      "Jika satu angka floorData berubah, apa yang berubah di layar? Tunjuk angka dan tile yang cocok.",
      "If one floorData number changes, what changes on screen? Point to the number and matching tiles."
    ],
    "wka": [
      "Kerjakan dengan tekun dan akui bagian yang masih perlu bantuan (Kolose 3:23).",
      "Work diligently and acknowledge where you need help (Colossians 3:23)."
    ],
    "questions": [
      {
        "stem": [
          "floorData dipakai untuk apa?",
          "What does floorData control?"
        ],
        "options": [
          [
            "Susunan tile lantai",
            "The ground tile layout"
          ],
          [
            "Nama akun",
            "The account name"
          ],
          [
            "Volume musik",
            "Music volume"
          ]
        ],
        "key": 0,
        "why": [
          "Langkah 8 memakai array ini untuk menyusun tile.",
          "Step 8 uses this array to arrange ground tiles."
        ]
      },
      {
        "stem": [
          "Properti CSS untuk gambar background adalah…",
          "Which CSS property sets a background image?"
        ],
        "options": [
          [
            "innerText",
            "innerText"
          ],
          [
            "background-image",
            "background-image"
          ],
          [
            "onclick",
            "onclick"
          ]
        ],
        "key": 1,
        "why": [
          "background-image mengatur gambar pada area game dan sprite.",
          "background-image supplies images for the game area and sprites."
        ]
      },
      {
        "stem": [
          "Sebelum mengubah coinsData, kamu sebaiknya…",
          "Before changing coinsData, you should…"
        ],
        "options": [
          [
            "Menghapus semua file",
            "Delete every file"
          ],
          [
            "Mengganti password",
            "Change your password"
          ],
          [
            "Prediksi jumlah coin, lalu uji tampilan",
            "Predict the coin count, then test the display"
          ]
        ],
        "key": 2,
        "why": [
          "Prediksi dan uji membantu menghubungkan data dengan hasil.",
          "Prediction and testing connect data to the visible result."
        ]
      }
    ],
    "id": 1,
    "starter": null,
    "times": [
      [
        "Demo & tujuan|Demo & goal",
        5
      ],
      [
        "Explore lima game|Explore five games",
        10
      ],
      [
        "Praktik & tantangan|Practice & challenge",
        55
      ],
      [
        "Tunjukkan hasil & refleksi|Show results & reflect",
        10
      ]
    ]
  },
  {
    "title": [
      "Lompat, ambil coin, selesai",
      "Jump, collect, finish"
    ],
    "goal": [
      "Menghubungkan input pemain, fungsi lompat, dan skor yang terlihat.",
      "Connect player input, jump functions, and visible scores."
    ],
    "learn": [
      "Event klik dan tombol spasi memicu lompatan. Variable coinCount dan heading menampilkan coin yang terkumpul.",
      "Click and space-bar events trigger jumping. The coinCount variable and heading show collected coins."
    ],
    "sources": [
      "tn-platformer-game"
    ],
    "range": "Platformer 13–22",
    "tasks": [
      [
        "Lanjutkan Platformer dari pertemuan 1. Tambahkan sprite lompat/crash dan finish sign.",
        "Continue your Platformer. Add jump/crash sprites and the finish sign."
      ],
      [
        "Tambahkan kontrol klik dan spasi, lalu tampilkan jumlah coin.",
        "Add click and space-bar controls, then display the coin count."
      ],
      [
        "Uji lompatan, pengambilan coin, dan pesan selesai. Simpan karya.",
        "Test jumping, coin collection, and the finish message. Save your work."
      ]
    ],
    "challenge": [
      "Pada salinan Sandbox, ubah platformSpeed atau susunan coin. Buat satu level yang tetap bisa diselesaikan.",
      "In a Sandbox copy, change platformSpeed or the coin layout. Make a level that remains finishable."
    ],
    "result": [
      "Platformer dapat dimainkan + satu perubahan level atau kecepatan.",
      "A playable Platformer + one level or speed change."
    ],
    "check": [
      "Coba klik dan spasi. Ambil coin dan selesaikan level setelah modifikasi.",
      "Try click and space controls. Collect coins and finish the modified level."
    ],
    "prep": [
      "Siapkan checkpoint akhir pertemuan 1. Modifikasi penuh dilakukan setelah export karya selesai ke Sandbox; bila tempo lambat, selesaikan kontrol/skor dahulu dan gunakan contoh berjalan untuk membandingkan.",
      "Prepare the lesson-1 checkpoint. Full customization follows exporting completed work to Sandbox; if progress is slow, prioritize controls/scores and compare with a working example."
    ],
    "oral": [
      "Apa urutan input → fungsi → perubahan layar ketika pemain mengklik?",
      "What is the input → function → screen-change sequence when a player clicks?"
    ],
    "wka": [
      "Buat tantangan yang adil dan bisa diikuti pemain lain (Matius 7:12).",
      "Create a fair challenge that other players can follow (Matthew 7:12)."
    ],
    "questions": [
      {
        "stem": [
          "addEventListener menghubungkan…",
          "addEventListener connects…"
        ],
        "options": [
          [
            "Warna dengan lisensi",
            "Colour with a licence"
          ],
          [
            "Input pemain dengan respons kode",
            "Player input with a code response"
          ],
          [
            "Nama file dengan akun",
            "A filename with an account"
          ]
        ],
        "key": 1,
        "why": [
          "Platformer memakai event klik dan keyboard untuk kontrol.",
          "Platformer uses click and keyboard events for controls."
        ]
      },
      {
        "stem": [
          "Apa bukti skor bekerja?",
          "What shows the score works?"
        ],
        "options": [
          [
            "Jumlah coin berubah ketika coin diambil",
            "The count changes when a coin is collected"
          ],
          [
            "Background berubah warna",
            "The background changes colour"
          ],
          [
            "Judul game panjang",
            "The title is long"
          ]
        ],
        "key": 0,
        "why": [
          "Nilai variable dan teks heading harus mengikuti pengambilan coin.",
          "The variable and heading text should follow coin collection."
        ]
      },
      {
        "stem": [
          "Setelah menaikkan platformSpeed, uji…",
          "After increasing platformSpeed, test…"
        ],
        "options": [
          [
            "Hanya nama game",
            "Only the name"
          ],
          [
            "Jumlah password",
            "The password count"
          ],
          [
            "Apakah level tetap bisa diselesaikan",
            "Whether the level remains finishable"
          ]
        ],
        "key": 2,
        "why": [
          "Kecepatan mengubah kesulitan, jadi kontrol dan keterjangkauan perlu diuji.",
          "Speed changes difficulty, so controls and reachability need testing."
        ]
      }
    ],
    "id": 2,
    "starter": null,
    "times": [
      [
        "Demo & tujuan|Demo & goal",
        5
      ],
      [
        "Praktik BSD/checkpoint|BSD/checkpoint practice",
        45
      ],
      [
        "Tantangan & uji|Challenge & test",
        20
      ],
      [
        "Tunjukkan hasil & refleksi|Show results & reflect",
        10
      ]
    ]
  },
  {
    "title": [
      "Atur kecepatan Traffic Looper",
      "Control Traffic Looper speed"
    ],
    "goal": [
      "Menjelaskan hubungan pointerdown/pointerup, kecepatan, dan collision.",
      "Explain pointerdown/pointerup, speed, and collision."
    ],
    "learn": [
      "Menahan pointer memperlambat mobil; melepasnya mengembalikan kecepatan. Jarak antar kendaraan dipakai untuk memeriksa tabrakan.",
      "Holding the pointer slows the car; releasing it restores speed. Vehicle distance is used to check collisions."
    ],
    "sources": [
      "tn-traffic-looper-game"
    ],
    "range": "Traffic 8–12, 16–18",
    "starter": [
      "Gunakan Sandbox checkpoint Traffic Looper dari guru; area, sprite, dan pergerakan dasar sudah tersedia.",
      "Use the teacher’s Traffic Looper Sandbox checkpoint; the area, sprites, and basic motion are ready."
    ],
    "tasks": [
      [
        "Buka checkpoint Traffic Looper. Temukan angleSpeed dan dua handler pointer.",
        "Open the Traffic Looper checkpoint. Find angleSpeed and the two pointer handlers."
      ],
      [
        "Lengkapi atau telusuri kontrol tahan/lepas, penghitung putaran, dan pemeriksaan tabrakan.",
        "Complete or trace hold/release controls, the loop counter, and collision checks."
      ],
      [
        "Uji tahan → lepas → tabrakan → restart. Catat satu hasil.",
        "Test hold → release → collision → restart. Record one result."
      ]
    ],
    "challenge": [
      "Ubah kecepatan normal. Samakan nilainya pada nilai awal dan onPointerUp, lalu bandingkan dua percobaan.",
      "Change normal speed. Match the initial value and onPointerUp value, then compare two runs."
    ],
    "result": [
      "Kontrol melambat dan kembali normal + hasil uji dua kecepatan.",
      "Working slowdown and speed restoration + two-speed test results."
    ],
    "check": [
      "Lepaskan pointer: mobil harus kembali ke kecepatan normal yang baru, bukan nilai lama.",
      "Release the pointer: the car should return to the new normal speed, not the old value."
    ],
    "prep": [
      "Sediakan Sandbox berjalan dari proyek BSD; siswa tidak membangun semua 19 langkah dari nol. Kosongkan atau tandai dua handler pointer untuk praktik. Demonstrasikan distance/checkCollision dan restart; lanjutkan bagian lain secara mandiri bila course penuh harus selesai.",
      "Provide a working BSD Sandbox; students do not rebuild all 19 steps. Blank or mark the two pointer handlers for practice. Demonstrate distance/checkCollision and restart; continue other sections independently if full completion is required."
    ],
    "oral": [
      "Mengapa mengganti angleSpeed awal saja belum cukup setelah tombol dilepas?",
      "Why is changing the initial angleSpeed alone insufficient after release?"
    ],
    "wka": [
      "Pertimbangkan kemampuan pemain saat mengatur kesulitan (Matius 7:12).",
      "Consider the player’s abilities when setting difficulty (Matthew 7:12)."
    ],
    "questions": [
      {
        "stem": [
          "pointerdown pada Traffic Looper berfungsi…",
          "In Traffic Looper, pointerdown…"
        ],
        "options": [
          [
            "Menambah enemy baru",
            "Adds a new enemy"
          ],
          [
            "Menghapus lintasan",
            "Deletes the track"
          ],
          [
            "Memperlambat mobil",
            "Slows the car"
          ]
        ],
        "key": 2,
        "why": [
          "Handler menurunkan angleSpeed ketika pointer ditahan.",
          "The handler lowers angleSpeed while the pointer is held."
        ]
      },
      {
        "stem": [
          "Kecepatan normal diubah ke 2. Bagian lain yang perlu disesuaikan?",
          "Normal speed is changed to 2. What else needs updating?"
        ],
        "options": [
          [
            "Nilai di onPointerUp",
            "The value in onPointerUp"
          ],
          [
            "Nama account",
            "The account name"
          ],
          [
            "Warna semua teks",
            "Every text colour"
          ]
        ],
        "key": 0,
        "why": [
          "onPointerUp mengembalikan kecepatan setelah pointer dilepas.",
          "onPointerUp restores speed after release."
        ]
      },
      {
        "stem": [
          "Apa yang dicek oleh collision dalam proyek ini?",
          "What does collision checking examine here?"
        ],
        "options": [
          [
            "Panjang judul",
            "Title length"
          ],
          [
            "Jarak mobil dan motor",
            "Distance between car and motorcycle"
          ],
          [
            "Jumlah tab browser",
            "Browser tab count"
          ]
        ],
        "key": 1,
        "why": [
          "Langkah 16–17 menghitung dx/dy dan jarak antar kendaraan.",
          "Steps 16–17 calculate dx/dy and vehicle distance."
        ]
      }
    ],
    "id": 3,
    "times": [
      [
        "Demo & tujuan|Demo & goal",
        5
      ],
      [
        "Praktik BSD/checkpoint|BSD/checkpoint practice",
        45
      ],
      [
        "Tantangan & uji|Challenge & test",
        20
      ],
      [
        "Tunjukkan hasil & refleksi|Show results & reflect",
        10
      ]
    ]
  },
  {
    "title": [
      "Buat pola Nonogram",
      "Create a Nonogram pattern"
    ],
    "goal": [
      "Menghubungkan array 0/1, sel yang dipilih, dan pemeriksaan jawaban.",
      "Connect 0/1 arrays, selected cells, and answer checking."
    ],
    "learn": [
      "Data level menyimpan pola 0/1. Klik mengubah class active serta answer[row][col]; checkAnswer memeriksa hasil pemain.",
      "Level data stores a 0/1 pattern. Clicking changes the active class and answer[row][col]; checkAnswer checks the player’s result."
    ],
    "sources": [
      "tn-nonogram-game"
    ],
    "range": "Nonogram 7–8, 13, 15–19",
    "starter": [
      "Gunakan checkpoint Nonogram dari guru; grid, petunjuk, dan fungsi pemeriksaan sudah disiapkan.",
      "Use the teacher’s Nonogram checkpoint; the grid, clues, and checker are prepared."
    ],
    "tasks": [
      [
        "Buka checkpoint Nonogram. Lihat satu pola 5 × 5 dalam data level.",
        "Open the Nonogram checkpoint. Inspect one 5 × 5 level pattern."
      ],
      [
        "Telusuri klik sel: active berubah dan answer[row][col] menjadi 1 atau 0.",
        "Trace a cell click: active changes and answer[row][col] becomes 1 or 0."
      ],
      [
        "Buat pola huruf baru pada salinan level. Perbarui nama answer dan uji solusi.",
        "Create a new letter pattern in a level copy. Update its answer label and test the solution."
      ]
    ],
    "challenge": [
      "Buat satu pola baru. Teman menyelesaikannya tanpa diberi gambar jawaban.",
      "Create a new pattern. Let a classmate solve it without showing the answer image."
    ],
    "result": [
      "Level baru yang valid + bukti solusi benar dan satu sel salah.",
      "A valid new level + evidence of the correct solution and one wrong cell."
    ],
    "check": [
      "Nama answer adalah label hasil; pola benar tetap berasal dari data. Uji benar, salah, lalu klik sel lagi.",
      "The answer name is a result label; the correct pattern comes from data. Test correct, incorrect, then click a cell again."
    ],
    "prep": [
      "Siapkan grid 5 × 5 dan checker berjalan. Perubahan pola harus konsisten dengan data/petunjuk. Jangan mengajarkan bahwa string answer saja menentukan kecocokan grid; pembanding memakai pola data. Pertahankan data dan status tampilan sel agar sinkron.",
      "Prepare a working 5 × 5 grid and checker. Keep pattern data and clues consistent. Do not teach that the answer string alone checks the grid; comparison uses pattern data. Keep data and cell display in sync."
    ],
    "oral": [
      "Mengapa warna sel berubah saja belum membuktikan array jawaban ikut berubah?",
      "Why does a colour change alone not prove the answer array has changed?"
    ],
    "wka": [
      "Bangun pola yang teratur dan beri petunjuk yang jujur (1 Korintus 14:40).",
      "Build an orderly pattern and provide honest clues (1 Corinthians 14:40)."
    ],
    "questions": [
      {
        "stem": [
          "Pada data Nonogram, 1 berarti…",
          "In Nonogram data, 1 means…"
        ],
        "options": [
          [
            "Sel terisi",
            "A filled cell"
          ],
          [
            "Password benar",
            "A correct password"
          ],
          [
            "Game selesai otomatis",
            "The game ends automatically"
          ]
        ],
        "key": 0,
        "why": [
          "Langkah 7 memakai 1 untuk sel terisi dan 0 untuk sel kosong.",
          "Step 7 uses 1 for a filled cell and 0 for an empty cell."
        ]
      },
      {
        "stem": [
          "classList.toggle(\"active\") mengubah…",
          "classList.toggle(\"active\") changes…"
        ],
        "options": [
          [
            "Jumlah level",
            "The level count"
          ],
          [
            "Status tampilan sel",
            "The cell’s display state"
          ],
          [
            "Nama siswa",
            "The student name"
          ]
        ],
        "key": 1,
        "why": [
          "Class active mengatur keadaan visual sel ketika diklik.",
          "The active class controls a clicked cell’s visual state."
        ]
      },
      {
        "stem": [
          "Ketika sel menjadi aktif, data pemain juga harus…",
          "When a cell becomes active, player data should also…"
        ],
        "options": [
          [
            "Menghapus grid",
            "Delete the grid"
          ],
          [
            "Mengganti background",
            "Replace the background"
          ],
          [
            "Menyimpan 1 di answer[row][col]",
            "Store 1 in answer[row][col]"
          ]
        ],
        "key": 2,
        "why": [
          "Langkah 17 menyinkronkan class sel dengan array jawaban.",
          "Step 17 synchronizes the cell class with the answer array."
        ]
      }
    ],
    "id": 4,
    "times": [
      [
        "Demo & tujuan|Demo & goal",
        5
      ],
      [
        "Praktik BSD/checkpoint|BSD/checkpoint practice",
        45
      ],
      [
        "Tantangan & uji|Challenge & test",
        20
      ],
      [
        "Tunjukkan hasil & refleksi|Show results & reflect",
        10
      ]
    ]
  },
  {
    "title": [
      "Aturan dan HP Dungeon Battle",
      "Dungeon Battle rules and HP"
    ],
    "goal": [
      "Menjelaskan state HP, kondisi giliran, dan dampak nilai damage.",
      "Explain HP state, turn conditions, and damage values."
    ],
    "learn": [
      "Time bar menentukan kapan aksi tersedia. Serangan mengubah HP; kondisi menang/kalah membaca state game.",
      "The time bar determines when actions are available. Attacks change HP; win/loss conditions read the game state."
    ],
    "sources": [
      "tn-dungeon-battle"
    ],
    "range": "Dungeon 11–15, 19–24",
    "starter": [
      "Gunakan checkpoint Dungeon Battle dari guru; sprite dan animasi dasar sudah tersedia.",
      "Use the teacher’s Dungeon Battle checkpoint; sprites and basic animations are ready."
    ],
    "tasks": [
      [
        "Buka checkpoint Dungeon Battle. Temukan HP dan playerWaitTime.",
        "Open the Dungeon Battle checkpoint. Find HP and playerWaitTime."
      ],
      [
        "Telusuri kapan aksi muncul dan bagaimana serangan mengurangi HP.",
        "Trace when actions appear and how an attack reduces HP."
      ],
      [
        "Uji serangan normal, pergantian enemy, dan kondisi menang/kalah.",
        "Test normal attacks, the next enemy, and win/loss conditions."
      ]
    ],
    "challenge": [
      "Ubah playerAttack dari 10 ke 8 pada salinan kerja. Bandingkan hasil beberapa serangan dan jelaskan dampaknya.",
      "Change playerAttack from 10 to 8 in a work copy. Compare several attacks and explain the effect."
    ],
    "result": [
      "Catatan HP sebelum/sesudah + penjelasan satu perubahan damage.",
      "Before/after HP notes + explain one damage change."
    ],
    "check": [
      "Karena ada random tambahan, satu percobaan tidak cukup. Uji beberapa serangan dengan kondisi awal yang sama.",
      "Because extra damage is randomized, one run is insufficient. Test several attacks from the same starting state."
    ],
    "prep": [
      "Siapkan sprite/animasi dan alur game berjalan. Fokus state serta kondisi, bukan membuat semua sprite dalam 80 menit. Koreksi rentang pada penjelasan BSD: floor(random*5) adalah 0–4, sehingga base 10 menghasilkan 10–14, bukan 10–15. Special attack juga memakai kondisi random < 0.3.",
      "Prepare sprites/animations and a working game flow. Focus on states and conditions, beyond building every sprite in 80 minutes. Correct the BSD explanation: floor(random*5) is 0–4, so base 10 gives 10–14, not 10–15. Special attacks also use random < 0.3."
    ],
    "oral": [
      "Apa yang menentukan aksi tersedia: gambar tombol saja atau kondisi playerWaitTime?",
      "What makes an action available: its picture alone or the playerWaitTime condition?"
    ],
    "wka": [
      "Uji aturan dengan jujur; jangan hanya memilih hasil yang mendukung dugaanmu (Amsal 12:22).",
      "Test rules honestly; do not select only results that support your prediction (Proverbs 12:22)."
    ],
    "questions": [
      {
        "stem": [
          "Aksi pemain muncul ketika…",
          "Player actions appear when…"
        ],
        "options": [
          [
            "Judul diklik",
            "The title is clicked"
          ],
          [
            "playerWaitTime >= 100",
            "playerWaitTime >= 100"
          ],
          [
            "Warna background berubah",
            "The background colour changes"
          ]
        ],
        "key": 1,
        "why": [
          "Langkah 14 memeriksa kondisi time bar penuh.",
          "Step 14 checks the full-time-bar condition."
        ]
      },
      {
        "stem": [
          "Math.floor(Math.random()*5)+10 menghasilkan bilangan bulat…",
          "Math.floor(Math.random()*5)+10 produces integers…"
        ],
        "options": [
          [
            "10 sampai 14",
            "10 through 14"
          ],
          [
            "10 sampai 15",
            "10 through 15"
          ],
          [
            "Selalu 15",
            "Always 15"
          ]
        ],
        "key": 0,
        "why": [
          "Math.random kurang dari 1; setelah floor, tambahan adalah 0–4.",
          "Math.random is below 1; flooring gives an extra 0–4."
        ]
      },
      {
        "stem": [
          "Untuk membandingkan dua nilai damage, kamu perlu…",
          "To compare two damage values, you should…"
        ],
        "options": [
          [
            "Mengubah semua variable sekaligus",
            "Change every variable at once"
          ],
          [
            "Menilai dari satu screenshot",
            "Judge one screenshot"
          ],
          [
            "Uji berulang dari kondisi awal yang sama",
            "Repeat tests from the same starting state"
          ]
        ],
        "key": 2,
        "why": [
          "Random dapat mengubah hasil; kontrol kondisi awal dan ulangi uji.",
          "Randomness affects results; control the starting state and repeat tests."
        ]
      }
    ],
    "id": 5,
    "times": [
      [
        "Demo & tujuan|Demo & goal",
        5
      ],
      [
        "Praktik BSD/checkpoint|BSD/checkpoint practice",
        45
      ],
      [
        "Tantangan & uji|Challenge & test",
        20
      ],
      [
        "Tunjukkan hasil & refleksi|Show results & reflect",
        10
      ]
    ]
  },
  {
    "title": [
      "Lompatan Wall Jumper",
      "Wall Jumper movement"
    ],
    "goal": [
      "Menghubungkan input, batas lompatan, gravity, dan collision.",
      "Connect input, jump limits, gravity, and collision."
    ],
    "learn": [
      "pointerdown memicu lompatan jika jumpCount belum mencapai batas. Gravity mengubah speedY; tabrakan dinding mereset jumpCount dan membalik arah.",
      "pointerdown triggers a jump below the jumpCount limit. Gravity changes speedY; wall collisions reset jumpCount and reverse direction."
    ],
    "sources": [
      "tn-wall-jumper"
    ],
    "range": "Wall 9–14, 22–26",
    "starter": [
      "Gunakan checkpoint Wall Jumper dari guru; background, player, dan rock sudah tersedia.",
      "Use the teacher’s Wall Jumper checkpoint; backgrounds, the player, and rocks are ready."
    ],
    "tasks": [
      [
        "Buka checkpoint Wall Jumper. Coba tap sekali dan dua kali.",
        "Open the Wall Jumper checkpoint. Try single and double taps."
      ],
      [
        "Telusuri jumpCount < 2, speedY, gravity, serta reset saat menyentuh dinding.",
        "Trace jumpCount < 2, speedY, gravity, and the wall-collision reset."
      ],
      [
        "Uji sentuh dinding, tertabrak rock, dan restart game.",
        "Test wall contact, a rock collision, and restarting."
      ]
    ],
    "challenge": [
      "Ubah gravity sedikit pada salinan. Bandingkan tinggi lompatan dan apakah game masih bisa dimainkan.",
      "Change gravity slightly in a copy. Compare jump height and whether the game remains playable."
    ],
    "result": [
      "Perbandingan dua lompatan + penjelasan batas double jump.",
      "Two-jump comparison + explain the double-jump limit."
    ],
    "check": [
      "Coba tiga tap sebelum menyentuh dinding. Batas tetap bekerja; sesudah dinding, lompatan tersedia lagi.",
      "Try three taps before wall contact. The limit should hold; after touching a wall, jumping becomes available again."
    ],
    "prep": [
      "Siapkan visual, rock, dan loop utama sebelum kelas. Siswa menelusuri lalu memodifikasi kontrol/physics pada checkpoint. Prioritaskan jumpCount, gravity, dan reset dinding; background berlapis dan animasi lengkap menjadi pengayaan.",
      "Prepare visuals, rocks, and the main loop before class. Students trace and modify controls/physics at a checkpoint. Prioritize jumpCount, gravity, and wall resets; layered backgrounds and full animations are extensions."
    ],
    "oral": [
      "Mengapa jumpCount perlu kembali 0 ketika pemain menyentuh dinding?",
      "Why must jumpCount return to 0 when the player touches a wall?"
    ],
    "wka": [
      "Gunakan batas yang membantu pemain, lalu perbaiki berdasarkan masukan (1 Petrus 4:10).",
      "Use limits that help the player, then improve using feedback (1 Peter 4:10)."
    ],
    "questions": [
      {
        "stem": [
          "jumpCount < 2 berarti…",
          "jumpCount < 2 means…"
        ],
        "options": [
          [
            "Jump tanpa batas",
            "Unlimited jumps"
          ],
          [
            "Tidak bisa melompat",
            "Jumping is impossible"
          ],
          [
            "Jump hanya jika hitungan masih di bawah dua",
            "Jump only while the count is below two"
          ]
        ],
        "key": 2,
        "why": [
          "Kondisi ini membatasi lompatan sebelum hitungan direset.",
          "This condition limits jumps before the count resets."
        ]
      },
      {
        "stem": [
          "Gravity dalam proyek ini mengubah…",
          "Gravity changes…"
        ],
        "options": [
          [
            "Warna player",
            "The player colour"
          ],
          [
            "speedY setiap frame",
            "speedY each frame"
          ],
          [
            "Nama file",
            "The filename"
          ]
        ],
        "key": 1,
        "why": [
          "Penambahan gravity pada speedY membuat player kembali turun.",
          "Adding gravity to speedY brings the player downward again."
        ]
      },
      {
        "stem": [
          "Setelah menyentuh dinding, jumpCount…",
          "After wall contact, jumpCount…"
        ],
        "options": [
          [
            "Kembali ke 0",
            "Returns to 0"
          ],
          [
            "Selalu 100",
            "Is always 100"
          ],
          [
            "Dihapus dari kode",
            "Is deleted"
          ]
        ],
        "key": 0,
        "why": [
          "Langkah 13–14 mereset hitungan dan mengubah arah.",
          "Steps 13–14 reset the count and change direction."
        ]
      }
    ],
    "id": 6,
    "times": [
      [
        "Demo & tujuan|Demo & goal",
        5
      ],
      [
        "Praktik BSD/checkpoint|BSD/checkpoint practice",
        45
      ],
      [
        "Tantangan & uji|Challenge & test",
        20
      ],
      [
        "Tunjukkan hasil & refleksi|Show results & reflect",
        10
      ]
    ]
  },
  {
    "title": [
      "Jadikan game milikmu",
      "Make the game your own"
    ],
    "goal": [
      "Memodifikasi satu game dan memperbaikinya melalui uji pengguna.",
      "Customize one game and improve it through user testing."
    ],
    "learn": [
      "Tema mengubah tampilan; aturan mengubah pengalaman. Modifikasi yang baik punya alasan dan bukti pengujian.",
      "Themes change appearance; rules change the experience. Good modifications have reasons and test evidence."
    ],
    "sources": [
      "tn-platformer-game",
      "tn-traffic-looper-game",
      "tn-nonogram-game",
      "tn-dungeon-battle",
      "tn-wall-jumper"
    ],
    "range": "Customization · Sandbox",
    "tasks": [
      [
        "Pilih satu game yang sudah berjalan. Buka salinan Sandbox, bukan menimpa karya awal.",
        "Choose a working game. Open a Sandbox copy, keeping the original."
      ],
      [
        "Ubah satu bagian visual dan satu aturan yang sesuai proyek.",
        "Change one visual feature and one rule appropriate to the project."
      ],
      [
        "Minta teman mencoba, perbaiki satu masalah, lalu simpan versi final.",
        "Ask a classmate to test it, fix one problem, then save the final version."
      ]
    ],
    "challenge": [
      "Teman mencoba tanpa petunjuk lisan. Perbaiki satu hal yang membuatnya bingung atau kesulitan.",
      "Let a classmate try without spoken instructions. Improve one confusing or difficult part."
    ],
    "result": [
      "Game pilihan + satu temuan teman + bukti sebelum/sesudah revisi.",
      "Your chosen game + one user finding + before/after revision evidence."
    ],
    "check": [
      "Uji ulang tugas yang sama. Jelaskan mengapa revisimu membantu pemain.",
      "Retest the same task. Explain how your revision helps the player."
    ],
    "prep": [
      "Gunakan PDF customization sesuai game. Perubahan sprite Dungeon membutuhkan ukuran frame/totalFrames serta empat animasi enemy; sediakan aset yang cocok atau pilih background/damage. Untuk Traffic, ubah nilai normal dan onPointerUp bersama. Untuk Nonogram, uji konsistensi pola/petunjuk.",
      "Use the matching customization PDF. Dungeon sprites require frame sizes/counts and four enemy animations; provide compatible assets or choose background/damage. For Traffic, change normal speed and onPointerUp together. For Nonogram, test pattern/clue consistency."
    ],
    "oral": [
      "Apa yang kamu ubah, untuk siapa, dan apa bukti perbaikannya?",
      "What did you change, for whom, and what proves the improvement?"
    ],
    "wka": [
      "Hormati pembuat aset, catat sumber, dan gunakan karya untuk melayani pemain (1 Petrus 4:10).",
      "Respect asset creators, record sources, and use your work to serve players (1 Peter 4:10)."
    ],
    "questions": [
      {
        "stem": [
          "Setelah mengganti gambar sprite, cek…",
          "After replacing a sprite image, check…"
        ],
        "options": [
          [
            "Password teman",
            "Your classmate’s password"
          ],
          [
            "Ukuran, frame, dan tampilan saat dimainkan",
            "Size, frames, and in-game appearance"
          ],
          [
            "Hanya nama folder",
            "Only the folder name"
          ]
        ],
        "key": 1,
        "why": [
          "Gambar berbeda dapat mengubah ukuran dan frame animasi.",
          "A different image can affect size and animation frames."
        ]
      },
      {
        "stem": [
          "Uji pengguna yang berguna adalah…",
          "Useful user testing means…"
        ],
        "options": [
          [
            "Teman mencoba satu tugas, kamu mengamati",
            "A classmate tries one task while you observe"
          ],
          [
            "Kamu selalu menggerakkan kontrol untuk teman",
            "You always control it for the classmate"
          ],
          [
            "Hanya bertanya apakah warnanya bagus",
            "Only asking if colours look nice"
          ]
        ],
        "key": 0,
        "why": [
          "Mengamati tugas nyata menunjukkan masalah penggunaan.",
          "Observing an actual task reveals usability problems."
        ]
      },
      {
        "stem": [
          "Bukti revisi yang kuat adalah…",
          "Strong revision evidence is…"
        ],
        "options": [
          [
            "Screenshot judul saja",
            "Only a title screenshot"
          ],
          [
            "Jumlah file terbanyak",
            "The largest file count"
          ],
          [
            "Masalah, perubahan, dan hasil uji ulang",
            "The problem, change, and retest result"
          ]
        ],
        "key": 2,
        "why": [
          "Bukti itu menghubungkan perubahan dengan dampaknya.",
          "This evidence connects a change to its effect."
        ]
      }
    ],
    "id": 7,
    "starter": null,
    "times": [
      [
        "Demo & tujuan|Demo & goal",
        5
      ],
      [
        "Praktik BSD/checkpoint|BSD/checkpoint practice",
        45
      ],
      [
        "Tantangan & uji|Challenge & test",
        20
      ],
      [
        "Tunjukkan hasil & refleksi|Show results & reflect",
        10
      ]
    ]
  },
  {
    "title": [
      "Demo dan jelaskan karyamu",
      "Demonstrate and explain"
    ],
    "goal": [
      "Menunjukkan game, menjelaskan kode, dan membuktikan modifikasi sendiri.",
      "Show your game, explain its code, and demonstrate your own modification."
    ],
    "learn": [
      "Demo menunjukkan fungsi. Penjelasan dan modifikasi langsung menunjukkan pemahaman individual.",
      "A demo shows function. Explanation and a live change show individual understanding."
    ],
    "sources": [
      "tn-platformer-game",
      "tn-traffic-looper-game",
      "tn-nonogram-game",
      "tn-dungeon-battle",
      "tn-wall-jumper"
    ],
    "range": "Showcase · Check for Understanding",
    "tasks": [
      [
        "Kumpulkan tautan game pilihan, sumber aset, dan bukti revisi.",
        "Submit your chosen game link, asset sources, and revision evidence."
      ],
      [
        "Demo singkat: mainkan game dan jelaskan satu alur input → kode → hasil.",
        "Give a short demo: play the game and explain one input → code → result flow."
      ],
      [
        "Lakukan modifikasi kecil yang diminta guru. Kerjakan cek konsep yang diberikan guru.",
        "Make a small teacher-requested change. Complete the teacher-assigned concept check."
      ]
    ],
    "challenge": [
      "Sebelum mengubah satu nilai, prediksi hasilnya. Jalankan game dan cocokkan dengan prediksimu.",
      "Before changing one value, predict the result. Run the game and compare it with your prediction."
    ],
    "result": [
      "Game final + demo individual + penjelasan/modifikasi + refleksi singkat.",
      "Final game + individual demo + explanation/modification + short reflection."
    ],
    "check": [
      "Jelaskan bagian bantuan guru dan bagian yang kamu buat sendiri.",
      "Explain which parts were supported by your teacher and which you made yourself."
    ],
    "prep": [
      "Gunakan demo 2–3 menit per siswa; mulai sebagian verifikasi pada pertemuan 7 atau gunakan rekaman untuk kelas besar. Assessment BSD 25 soal tersedia di classroom, tetapi pilih/hanya gunakan soal untuk konsep yang sudah diajarkan. Bank web 24 soal adalah latihan pendamping asli, bukan salinan kunci BSD.",
      "Use 2–3-minute individual demos; begin some verification in lesson 7 or use recordings for larger classes. The BSD classroom has a 25-question assessment; select/use only questions for taught concepts. The website’s 24 questions are original companion practice, not BSD answer keys."
    ],
    "oral": [
      "Jika nilai ini diubah, apa prediksimu? Buktikan dengan Run.",
      "If this value changes, what do you predict? Prove it with Run."
    ],
    "wka": [
      "Jelaskan kontribusi dan bantuan secara jujur, lalu hargai karya teman (Amsal 12:22).",
      "Explain your contribution and support honestly, then respect classmates’ work (Proverbs 12:22)."
    ],
    "questions": [
      {
        "stem": [
          "Penjelasan alur yang lengkap adalah…",
          "A complete flow explanation is…"
        ],
        "options": [
          [
            "Input → fungsi/kondisi → perubahan game",
            "Input → function/condition → game change"
          ],
          [
            "Judul → warna → nama siswa",
            "Title → colour → student name"
          ],
          [
            "Ukuran file saja",
            "File size only"
          ]
        ],
        "key": 0,
        "why": [
          "Alur ini menunjukkan hubungan sebab dan hasil.",
          "This flow demonstrates cause and effect."
        ]
      },
      {
        "stem": [
          "Jika prediksi berbeda dari hasil Run, kamu perlu…",
          "If the prediction differs from Run, you should…"
        ],
        "options": [
          [
            "Sembunyikan hasilnya",
            "Hide the result"
          ],
          [
            "Periksa state/kode lalu revisi dugaan",
            "Inspect state/code and revise the prediction"
          ],
          [
            "Hapus semua karya",
            "Delete all work"
          ]
        ],
        "key": 1,
        "why": [
          "Perbedaan adalah bukti untuk menelusuri dan memperbaiki pemahaman.",
          "A mismatch is evidence for tracing and improving understanding."
        ]
      },
      {
        "stem": [
          "Mengakui bantuan guru berarti…",
          "Acknowledging teacher support means…"
        ],
        "options": [
          [
            "Game pasti gagal",
            "The game must fail"
          ],
          [
            "Tidak perlu memahami kode",
            "No need to understand the code"
          ],
          [
            "Menjelaskan proses dengan jujur",
            "Reporting the process honestly"
          ]
        ],
        "key": 2,
        "why": [
          "Kontribusi dan pemahaman tetap diperiksa secara individual.",
          "Contribution and understanding are still checked individually."
        ]
      }
    ],
    "id": 8,
    "starter": null,
    "times": [
      [
        "Siapkan & cek konsep|Prepare & concept check",
        15
      ],
      [
        "Demo individual & modifikasi|Individual demos & modifications",
        55
      ],
      [
        "Refleksi & pengumpulan|Reflection & submission",
        10
      ]
    ]
  }
];
