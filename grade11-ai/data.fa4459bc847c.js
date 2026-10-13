'use strict';
const CONFIG={
  "gradebookUrl": "../index.html",
  "bsdUrl": "https://app.bsd.education/"
};
const BSD_SOURCES=[
  {
    "name": "tn-webcam-image-classification",
    "title": "Webcam Image Classification",
    "steps": 3,
    "url": "https://app.bsd.education/project/tn-webcam-image-classification",
    "definition": "https://app.bsd.education/missions/8ec67da9-7fb0-4f58-bcfb-de05933f4991/0.31/mission.json",
    "revision": "0.31"
  },
  {
    "name": "tn-card-sorting-activity",
    "title": "Card Sorting Activity",
    "steps": 7,
    "url": "https://app.bsd.education/project/tn-card-sorting-activity",
    "definition": "https://app.bsd.education/missions/6adac735-69ca-4f76-aefa-ffbec7016e5a/0.50/mission.json",
    "revision": "0.50"
  },
  {
    "name": "tn-machine-learning-image-classification",
    "title": "Machine Learning - Image Classification",
    "steps": 3,
    "url": "https://app.bsd.education/project/tn-machine-learning-image-classification",
    "definition": "https://app.bsd.education/missions/25e35039-0ad7-491d-8c92-c7b4e1a5af11/0.35/mission.json",
    "revision": "0.35"
  },
  {
    "name": "tn-image-upload-classifier",
    "title": "Image Upload Classifier - Coding Project",
    "steps": 18,
    "url": "https://app.bsd.education/project/tn-image-upload-classifier",
    "definition": "https://app.bsd.education/missions/fbd130bc-354d-4c04-af50-73039d97b377/0.153/mission.json",
    "revision": "0.153"
  },
  {
    "name": "tn-webcam-live-classifier",
    "title": "Webcam Live Classifier",
    "steps": 3,
    "url": "https://app.bsd.education/project/tn-webcam-live-classifier",
    "definition": "https://app.bsd.education/missions/43ed93de-81d9-4dc2-8d79-1793e6111193/0.19/mission.json",
    "revision": "0.19"
  },
  {
    "name": "tn-webcam-live-classifier-coding-project",
    "title": "Webcam Live Classifier - Coding Project",
    "steps": 15,
    "url": "https://app.bsd.education/project/tn-webcam-live-classifier-coding-project",
    "definition": "https://app.bsd.education/missions/8b9a945e-8630-425d-8f36-9ada443559ff/0.94/mission.json",
    "revision": "0.94"
  },
  {
    "name": "tn-adjustable-accuracy-webcam-classifier",
    "title": "Adjustable Accuracy Webcam Classifier",
    "steps": 3,
    "url": "https://app.bsd.education/project/tn-adjustable-accuracy-webcam-classifier",
    "definition": "https://app.bsd.education/missions/2dff9ac7-93e9-4000-9bf8-7a4bbf1e77b5/0.18/mission.json",
    "revision": "0.18"
  },
  {
    "name": "tn-responsive-instrument",
    "title": "Responsive Instrument",
    "steps": 3,
    "url": "https://app.bsd.education/project/tn-responsive-instrument",
    "definition": "https://app.bsd.education/missions/f86abb70-134d-4f64-99c7-c8fa09f5a737/0.26/mission.json",
    "revision": "0.26"
  },
  {
    "name": "tn-music-generator",
    "title": "Music Generator",
    "steps": 24,
    "url": "https://app.bsd.education/project/tn-music-generator",
    "definition": "https://app.bsd.education/missions/f366030f-27ec-45ca-9174-759f0525bd6a/0.145/mission.json",
    "revision": "0.145"
  },
  {
    "name": "tn-ai-digital-assistant",
    "title": "AI Digital Assistant",
    "steps": 12,
    "url": "https://app.bsd.education/project/tn-ai-digital-assistant",
    "definition": "https://app.bsd.education/missions/3a7e42b8-9163-4f0a-a3fa-209a9669b5ac/1.187/mission.json",
    "revision": "1.187"
  },
  {
    "name": "tn-ai-navigation-algorithm",
    "title": "AI - Navigation Algorithm",
    "steps": 12,
    "url": "https://app.bsd.education/project/tn-ai-navigation-algorithm",
    "definition": "https://app.bsd.education/missions/1751a798-df31-4003-a495-b9db6f887e63/13.112/mission.json",
    "revision": "13.112"
  },
  {
    "name": "tn-ai-auto-navigation",
    "title": "AI - Auto Navigation",
    "steps": 14,
    "url": "https://app.bsd.education/project/tn-ai-auto-navigation",
    "definition": "https://app.bsd.education/missions/bc145003-fbb4-46d9-a4ad-76afd345e157/7.110/mission.json",
    "revision": "7.110"
  },
  {
    "name": "tn-ai-find-the-finish-line",
    "title": "AI - Find the finish line",
    "steps": 17,
    "url": "https://app.bsd.education/project/tn-ai-find-the-finish-line",
    "definition": "https://app.bsd.education/missions/bec16310-b193-47da-add2-05d19973d21e/3.119/mission.json",
    "revision": "3.119"
  },
  {
    "name": "tn-ai-chess-player",
    "title": "AI Chess Player",
    "steps": 19,
    "url": "https://app.bsd.education/project/tn-ai-chess-player",
    "definition": "https://app.bsd.education/missions/a88231fe-7394-479d-9f94-b055ceb51d5d/3.120/mission.json",
    "revision": "3.120"
  },
  {
    "name": "tn-ai-animal-rescue",
    "title": "AI - Animal Rescue",
    "steps": 10,
    "url": "https://app.bsd.education/project/tn-ai-animal-rescue",
    "definition": "https://app.bsd.education/missions/1ad26623-96ff-4b63-9b32-0fa85c139720/2.77/mission.json",
    "revision": "2.77"
  }
];
const COURSE={
  "title": "Code the Future with AI",
  "minutes": 80,
  "startingPoint": [
    "Lanjutan setelah Webcam Live Classifier. Bagian awal menjadi referensi; tidak perlu diulang dari nol.",
    "Continue after Webcam Live Classifier. Earlier sections remain references; no restart is required."
  ],
  "checkpoints": [
    {
      "name": "F1",
      "guide": 1,
      "focus": [
        "Perbaiki data dan bandingkan 6 hasil uji.",
        "Improve data and compare 6 test results."
      ]
    },
    {
      "name": "F2",
      "guide": 4,
      "focus": [
        "Bandingkan K=1/3/5 pada input uji tetap.",
        "Compare K=1/3/5 on fixed test inputs."
      ]
    },
    {
      "name": "F3",
      "guide": 13,
      "focus": [
        "Modifikasi navigasi: finish, jalan buntu, retry.",
        "Modify navigation: finish, dead end, retry."
      ]
    }
  ],
  "rubric": [
    {
      "weight": 20,
      "label": [
        "Perencanaan",
        "Planning"
      ],
      "description": [
        "Tujuan, input, output, dan batas karya.",
        "Goal, input, output, and project limits."
      ]
    },
    {
      "weight": 20,
      "label": [
        "Konsep",
        "Concept"
      ],
      "description": [
        "Penjelasan data, confidence, aturan, atau pencarian yang tepat.",
        "Accurate explanation of data, confidence, rules, or search."
      ]
    },
    {
      "weight": 25,
      "label": [
        "Prototipe",
        "Prototype"
      ],
      "description": [
        "Karya berjalan dan dapat diuji.",
        "The project works and can be tested."
      ]
    },
    {
      "weight": 20,
      "label": [
        "Pengujian",
        "Testing"
      ],
      "description": [
        "Kasus normal, gagal, dan revisi dengan bukti.",
        "Normal cases, failures, and revisions with evidence."
      ]
    },
    {
      "weight": 15,
      "label": [
        "Tanggung jawab",
        "Responsibility"
      ],
      "description": [
        "Refleksi etis, sumber, dan keterbatasan.",
        "Ethical reflection, sources, and limitations."
      ]
    }
  ],
  "mode": "self-paced",
  "sessions": 14,
  "assessmentWeights": {
    "completion": 20,
    "formative": 30,
    "summative": 50
  },
  "gradingVersion": "g11-ai-20-30-50-v1"
};
const LESSONS=[
  {
    "id": 1,
    "title": [
      "F1 · Perbaiki classifier lamamu",
      "F1 · Improve your existing classifier"
    ],
    "goal": [
      "Ubah satu hal pada data, lalu buktikan dampaknya.",
      "Change one thing in the data, then show its effect."
    ],
    "learn": [
      "Data latih memberi contoh; data uji yang terpisah memeriksa prediksi baru. Lebih banyak gambar serupa belum tentu lebih baik.",
      "Training data supplies examples; separate test data checks new predictions. More near-identical images may not help."
    ],
    "sources": [
      "tn-image-upload-classifier"
    ],
    "range": "Image Upload Classifier · revisit steps 12–17 in your own copy",
    "tasks": [
      [
        "Salin karya sebelumnya. Siapkan 6 gambar uji baru: 3 untuk setiap kelas. Jangan masukkan ke data latih.",
        "Copy your previous project. Prepare 6 new test images: 3 per class. Keep them out of training data."
      ],
      [
        "Uji keenam gambar. Catat label benar, label prediksi, dan jumlah benar dari 6.",
        "Test all six images. Record the expected label, predicted label, and correct count out of 6."
      ],
      [
        "Perbaiki satu aspek: label, keseimbangan, atau variasi data. Latih ulang dan uji keenam gambar yang sama.",
        "Improve one aspect: labels, balance, or data variety. Retrain and test the same six images."
      ]
    ],
    "challenge": [
      "Tambahkan variasi latar atau sudut untuk satu kelas. Jelaskan mengapa perubahan itu dipilih.",
      "Add background or angle variety for one class. Explain why you chose that change."
    ],
    "check": [
      "Bandingkan sebelum/sesudah dengan input uji yang sama. Hasil tidak meningkat juga boleh: jelaskan bukti dan langkah berikutnya.",
      "Compare before/after using the same test inputs. No improvement is also a valid finding: explain the evidence and next step."
    ],
    "result": [
      "Tautan salinan, satu perubahan, dan 6 hasil uji sebelum/sesudah.",
      "A copy link, one change, and six before/after test results."
    ],
    "prep": [
      "Mulai setelah Webcam Live Classifier sesuai laporan guru. Gunakan benda aman, bukan foto identitas. Jika karya lama belum tersedia, siapkan checkpoint Upload Classifier.",
      "Start after Webcam Live Classifier as reported by the teacher. Use safe objects rather than identity photos. Prepare an Upload Classifier checkpoint if previous work is unavailable."
    ],
    "oral": [
      "Apa yang berubah? Apakah input uji tetap sama? Tunjukkan satu kesalahan prediksi.",
      "What changed? Did you keep test inputs fixed? Show one prediction error."
    ],
    "questions": [
      {
        "stem": [
          "Mengapa gambar uji harus terpisah?",
          "Why keep test images separate?"
        ],
        "options": [
          [
            "Untuk memeriksa prediksi pada contoh baru.",
            "To check predictions on new examples."
          ],
          [
            "Agar jumlah file training lebih sedikit saja.",
            "Only to reduce the training file count."
          ],
          [
            "Karena gambar uji akan dipakai memperbaiki label sebelum pengujian.",
            "Because test images will be used to fix labels before testing."
          ]
        ],
        "key": 0,
        "why": [
          "Gambar yang sudah dipakai melatih tidak menjadi bukti kuat kemampuan pada contoh baru.",
          "Previously trained images provide weak evidence of performance on new examples."
        ]
      },
      {
        "stem": [
          "Perbandingan mana lebih adil?",
          "Which comparison is fairer?"
        ],
        "options": [
          [
            "Ubah training dan seluruh input uji sekaligus.",
            "Change training and all test inputs together."
          ],
          [
            "Ubah satu aspek data; gunakan 6 input uji yang sama.",
            "Change one data aspect; reuse the same 6 test inputs."
          ],
          [
            "Bandingkan hanya prediksi yang berhasil.",
            "Compare only successful predictions."
          ]
        ],
        "key": 1,
        "why": [
          "Input uji tetap membantu mengaitkan hasil dengan perubahan data.",
          "Fixed test inputs help relate results to the data change."
        ]
      }
    ],
    "kind": "F1",
    "wka": [
      "Kejujuran: laporkan hasil benar dan gagal tanpa memilih bukti yang menguntungkan saja (Amsal 12:22).",
      "Honesty: report successes and failures without selecting only favorable evidence (Proverbs 12:22)."
    ]
  },
  {
    "id": 2,
    "title": [
      "Bangun live classifier · fondasi",
      "Build a live classifier · foundations"
    ],
    "goal": [
      "Hubungkan antarmuka, kamera, dan model.",
      "Connect the interface, camera, and model."
    ],
    "learn": [
      "MobileNet mengekstrak fitur gambar; KNN menyimpan contoh fitur dan label kelas. Ini tidak melatih ulang semua bobot MobileNet.",
      "MobileNet extracts image features; KNN stores feature examples and class labels. This does not retrain all MobileNet weights."
    ],
    "sources": [
      "tn-webcam-live-classifier-coding-project"
    ],
    "range": "Webcam Live Classifier Coding Project · steps 2–10",
    "tasks": [
      [
        "Buka proyek coding. Susun area kelas, tombol latih/prediksi, video, dan pesan loading.",
        "Open the coding project. Set up class areas, train/predict buttons, video, and loading feedback."
      ],
      [
        "Ikuti langkah kamera dan feature extractor sampai model siap.",
        "Follow the webcam and feature extractor steps until the model is ready."
      ],
      [
        "Siapkan KNN. Periksa tampilan kamera dan dua area kelas.",
        "Set up KNN. Check the camera view and two class areas."
      ]
    ],
    "challenge": [
      "Ubah label dan instruksi agar orang lain tahu contoh apa yang perlu ditambahkan.",
      "Improve labels and instructions so another person knows which examples to add."
    ],
    "check": [
      "Kamera tampil dan model siap. Jangan menganggap UI selesai berarti prediksi sudah bekerja.",
      "The camera displays and the model is ready. A finished UI does not yet prove predictions work."
    ],
    "result": [
      "Antarmuka berjalan dengan kamera dan label yang jelas.",
      "A working interface with a camera and clear labels."
    ],
    "prep": [
      "Jika proyek coding juga sudah selesai, gunakan salinannya untuk modifikasi. Uji izin kamera dan jaringan sebelum kelas; sediakan checkpoint langkah 10.",
      "If coding is already complete, modify its copy. Check camera permissions and connectivity before class; prepare a step-10 checkpoint."
    ],
    "oral": [
      "Bagian mana mengambil gambar, mengekstrak fitur, dan menyimpan contoh?",
      "Which part captures images, extracts features, and stores examples?"
    ],
    "questions": [
      {
        "stem": [
          "Apa peran feature extractor?",
          "What does the feature extractor do?"
        ],
        "options": [
          [
            "Memilih label dua kelas langsung tanpa contoh KNN.",
            "Directly choose the two-class label without KNN examples."
          ],
          [
            "Mengubah setiap gambar menjadi file audio.",
            "Convert every image into an audio file."
          ],
          [
            "Mengubah gambar menjadi fitur.",
            "Turn images into features."
          ]
        ],
        "key": 2,
        "why": [
          "MobileNet menyediakan fitur yang dipakai classifier.",
          "MobileNet supplies features used by the classifier."
        ]
      },
      {
        "stem": [
          "KNN dalam proyek ini belajar dari…",
          "KNN in this project learns from…"
        ],
        "options": [
          [
            "Contoh fitur dan label yang ditambahkan.",
            "Added feature examples and labels."
          ],
          [
            "Semua bobot MobileNet yang selalu dilatih ulang.",
            "All MobileNet weights being retrained each time."
          ],
          [
            "Nama kelas tanpa fitur gambar.",
            "Class names without image features."
          ]
        ],
        "key": 0,
        "why": [
          "Contoh berlabel ditambahkan ke KNN; feature extractor sudah tersedia.",
          "Labeled examples are added to KNN; the feature extractor is already provided."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Tanggung jawab: periksa bukti sebelum menyimpulkan dan jelaskan keterbatasan teknologi (Amsal 18:13).",
      "Responsibility: examine evidence before concluding and explain technological limitations (Proverbs 18:13)."
    ]
  },
  {
    "id": 3,
    "title": [
      "Latih dan uji input kamera",
      "Train and test webcam input"
    ],
    "goal": [
      "Jalankan alur contoh → latih → prediksi.",
      "Run the examples → train → predict flow."
    ],
    "learn": [
      "newExample membawa label dan fitur. Prediksi memerlukan contoh kedua kelas yang bervariasi.",
      "newExample carries a label and features. Prediction needs varied examples for both classes."
    ],
    "sources": [
      "tn-webcam-live-classifier-coding-project"
    ],
    "range": "Webcam Live Classifier Coding Project · steps 11–15",
    "tasks": [
      [
        "Ikuti event dan newExample untuk menyimpan label serta fitur.",
        "Follow the events and newExample steps to store labels and features."
      ],
      [
        "Hubungkan tombol training dan goClassify. Tambahkan contoh bervariasi untuk kedua kelas.",
        "Connect training and goClassify. Add varied examples for both classes."
      ],
      [
        "Uji benda pada sudut, cahaya, atau latar berbeda. Catat satu prediksi benar dan satu kegagalan.",
        "Test objects with different angles, lighting, or backgrounds. Record one correct prediction and one failure."
      ]
    ],
    "challenge": [
      "Perjelas tampilan hasil: tunjukkan nama kelas dan instruksi saat contoh belum tersedia.",
      "Improve result feedback: show the class name and instructions when examples are missing."
    ],
    "check": [
      "Telusuri gambar → fitur → contoh KNN → label. Banyak frame hampir sama bukan variasi.",
      "Trace image → features → KNN examples → label. Many nearly identical frames do not provide variety."
    ],
    "result": [
      "Live classifier berjalan dan dua hasil uji dijelaskan.",
      "A working live classifier and two explained test results."
    ],
    "prep": [
      "Sediakan checkpoint kode langkah 10. Gunakan benda tanpa merekam atau mengunggah wajah teman.",
      "Prepare a step-10 code checkpoint. Use objects without recording or uploading classmates’ faces."
    ],
    "oral": [
      "Mengapa model salah ketika latar berubah? Data mana perlu diperbaiki?",
      "Why might a background change cause an error? Which data needs improvement?"
    ],
    "questions": [
      {
        "stem": [
          "Apa yang dibawa newExample?",
          "What does newExample carry?"
        ],
        "options": [
          [
            "Label saja, tanpa informasi gambar.",
            "Only a label, without image information."
          ],
          [
            "Label dan fitur gambar.",
            "An image label and features."
          ],
          [
            "Confidence prediksi saja, tanpa label.",
            "Only prediction confidence, without a label."
          ]
        ],
        "key": 1,
        "why": [
          "Contoh berlabel memungkinkan KNN membandingkan fitur.",
          "Labeled examples let KNN compare features."
        ]
      },
      {
        "stem": [
          "Contoh training mana lebih bervariasi?",
          "Which training examples are more varied?"
        ],
        "options": [
          [
            "100 frame pada posisi persis sama.",
            "100 frames from exactly the same position."
          ],
          [
            "Gambar identik yang disalin berkali-kali.",
            "Identical images copied many times."
          ],
          [
            "Benda sama dari beberapa sudut dan latar.",
            "The same object from several angles and backgrounds."
          ]
        ],
        "key": 2,
        "why": [
          "Variasi relevan lebih berguna daripada duplikasi hampir sama.",
          "Relevant variation is more useful than near-duplicates."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Tanggung jawab: periksa bukti sebelum menyimpulkan dan jelaskan keterbatasan teknologi (Amsal 18:13).",
      "Responsibility: examine evidence before concluding and explain technological limitations (Proverbs 18:13)."
    ]
  },
  {
    "id": 4,
    "title": [
      "F2 · Eksperimen nilai K",
      "F2 · Experiment with K"
    ],
    "goal": [
      "Pilih K berdasarkan hasil uji, bukan angka confidence saja.",
      "Choose K using test results, beyond the displayed confidence."
    ],
    "learn": [
      "K ialah jumlah tetangga terdekat pada KNN. Confidence demo BSD diberi faktor tampilan dan angka acak; itu bukan ukuran akurasi uji.",
      "K is the number of nearest neighbors in KNN. BSD demo confidence includes a display factor and randomness; it is not measured test accuracy."
    ],
    "sources": [
      "tn-adjustable-accuracy-webcam-classifier"
    ],
    "range": "Adjustable Accuracy Webcam Classifier · steps 1–3",
    "tasks": [
      [
        "Siapkan dua kelas dan cukup contoh untuk K=5. Tetapkan 6 input uji; jangan gunakan untuk training.",
        "Prepare two classes with enough examples for K=5. Fix 6 test inputs; keep them out of training."
      ],
      [
        "Uji input yang sama pada K=1, K=3, dan K=5 tanpa mengganti data latih.",
        "Test the same inputs at K=1, K=3, and K=5 without changing training data."
      ],
      [
        "Catat jumlah label benar dari 6 untuk setiap K. Pilih K dan jelaskan satu kegagalan.",
        "Record correct labels out of 6 for each K. Choose K and explain one failure."
      ]
    ],
    "challenge": [
      "Di salinan Sandbox, temukan kNumber dan panggilan classify. Jelaskan akibat perubahan K sebelum mengujinya.",
      "In a Sandbox copy, locate kNumber and the classify call. Predict the effect of changing K before testing it."
    ],
    "check": [
      "K bukan threshold confidence. K lebih besar tidak selalu lebih baik; bandingkan label benar pada input tetap.",
      "K is not a confidence threshold. Larger K is not always better; compare correct labels on fixed inputs."
    ],
    "result": [
      "Tabel K=1/3/5, benar dari 6, dan alasan pilihan.",
      "A K=1/3/5 table, correct counts out of 6, and a reasoned choice."
    ],
    "prep": [
      "Kode adjustConfidence() menskalakan confidence dengan faktor K dan Math.random(). Gunakan label benar sebagai bukti. Input webcam tidak persis identik: samakan benda, posisi, cahaya, dan urutan; catat keterbatasannya.",
      "adjustConfidence() scales confidence using a K factor and Math.random(). Use correct labels as evidence. Webcam inputs are not perfectly identical: keep object, position, lighting, and order consistent; note this limitation."
    ],
    "oral": [
      "Apakah K=5 selalu menang? Apa yang sebenarnya dihitung dalam tabelmu?",
      "Does K=5 always win? What does your table actually measure?"
    ],
    "questions": [
      {
        "stem": [
          "Apa arti K?",
          "What does K mean?"
        ],
        "options": [
          [
            "Jumlah tetangga yang dipakai KNN.",
            "The number of neighbors used by KNN."
          ],
          [
            "Batas minimum confidence untuk menerima prediksi.",
            "A minimum confidence threshold for accepting predictions."
          ],
          [
            "Jumlah semua fitur yang dikeluarkan MobileNet.",
            "The total number of features produced by MobileNet."
          ]
        ],
        "key": 0,
        "why": [
          "Slider mengubah kNumber yang diberikan ke knnClassifier.classify.",
          "The slider changes kNumber passed to knnClassifier.classify."
        ]
      },
      {
        "stem": [
          "Bukti mana mendukung pilihan K?",
          "Which evidence supports choosing K?"
        ],
        "options": [
          [
            "Satu confidence tampilan tertinggi.",
            "One highest displayed confidence."
          ],
          [
            "Jumlah prediksi benar pada input uji tetap.",
            "Correct predictions on fixed test inputs."
          ],
          [
            "Mengubah K dan data latih bersamaan tanpa mencatatnya.",
            "Changing K and training data together without recording it."
          ]
        ],
        "key": 1,
        "why": [
          "Confidence demo memiliki faktor tampilan acak; hitung hasil benar untuk uji yang jelas.",
          "Demo confidence includes a random display factor; count correct results for an explicit test."
        ]
      }
    ],
    "kind": "F2",
    "wka": [
      "Kejujuran: laporkan hasil benar dan gagal tanpa memilih bukti yang menguntungkan saja (Amsal 12:22).",
      "Honesty: report successes and failures without selecting only favorable evidence (Proverbs 12:22)."
    ]
  },
  {
    "id": 5,
    "title": [
      "Rancang responsive instrument",
      "Design a responsive instrument"
    ],
    "goal": [
      "Petakan tiga label gambar ke tiga suara.",
      "Map three image labels to three sounds."
    ],
    "learn": [
      "Responsive instrument memakai klasifikasi gambar untuk memilih suara. Proyek Music Generator ini tidak menghasilkan komposisi musik baru dengan model generatif.",
      "The responsive instrument uses image classification to select a sound. This Music Generator project does not compose new music with a generative model."
    ],
    "sources": [
      "tn-responsive-instrument",
      "tn-music-generator"
    ],
    "range": "Responsive Instrument · steps 1–3; Music Generator · steps 2–12",
    "tasks": [
      [
        "Coba demo instrument. Amati input gambar, label prediksi, dan suara.",
        "Try the instrument demo. Observe the image input, predicted label, and sound."
      ],
      [
        "Rencanakan tiga kelas benda/gestur dan tiga suara yang cocok.",
        "Plan three object/gesture classes and three matching sounds."
      ],
      [
        "Bangun UI Music Generator: area kelas, record/play, video, train, dan pause.",
        "Build the Music Generator UI: class areas, record/play, video, train, and pause."
      ]
    ],
    "challenge": [
      "Perbaiki petunjuk UI agar teman dapat memahami hubungan kelas dengan suara.",
      "Improve UI instructions so a classmate understands the class-to-sound mapping."
    ],
    "check": [
      "Tunjukkan mapping kelas A/B/C → suara. Bedakan label prediksi dan aksi memutar suara.",
      "Show class A/B/C → sound mapping. Distinguish the predicted label from the sound playback action."
    ],
    "result": [
      "UI dan rencana tiga kelas → tiga suara.",
      "An interface and a three-class → three-sound plan."
    ],
    "prep": [
      "Siapkan checkpoint UI langkah 12 untuk langkah berikutnya. Periksa audio dan izin mikrofon.",
      "Prepare a step-12 UI checkpoint for the next stage. Check audio and microphone permissions."
    ],
    "oral": [
      "Apa inputnya? Bagian mana menentukan suara yang diputar?",
      "What is the input? Which part determines the sound played?"
    ],
    "questions": [
      {
        "stem": [
          "Apa input klasifikasinya?",
          "What is the classification input?"
        ],
        "options": [
          [
            "Rekaman audio sebagai input training gambar.",
            "Audio recordings as image-training inputs."
          ],
          [
            "Suara output yang diputar sebelumnya.",
            "The output sound played previously."
          ],
          [
            "Gambar dari kamera.",
            "Images from the webcam."
          ]
        ],
        "key": 2,
        "why": [
          "Fitur gambar diklasifikasikan sebelum suara dipilih.",
          "Image features are classified before sound selection."
        ]
      },
      {
        "stem": [
          "Apa hubungan label dan suara?",
          "How are labels related to sounds?"
        ],
        "options": [
          [
            "Label hasil klasifikasi memilih suara yang dipetakan.",
            "The classification label selects its mapped sound."
          ],
          [
            "Model selalu menulis komposisi baru.",
            "The model always writes a new composition."
          ],
          [
            "Suara ditentukan nama file HTML tanpa label.",
            "The sound is determined by the HTML filename without a label."
          ]
        ],
        "key": 0,
        "why": [
          "Proyek memutar rekaman sesuai label.",
          "The project plays recordings based on labels."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Melayani: gunakan kemampuan untuk membantu orang lain; periksa apakah fitur benar-benar berguna (1 Petrus 4:10).",
      "Service: use your abilities to help others; check whether a feature is useful (1 Peter 4:10)."
    ]
  },
  {
    "id": 6,
    "title": [
      "Selesaikan dan uji instrument",
      "Finish and test the instrument"
    ],
    "goal": [
      "Jalankan klasifikasi, pemutaran suara, dan pause.",
      "Run classification, sound playback, and pause."
    ],
    "learn": [
      "Audio direkam dan dimainkan; KNN menerima contoh kelas. playSound(label) menghubungkan hasil prediksi dengan suara.",
      "Audio is recorded and played; KNN receives class examples. playSound(label) connects predictions to sounds."
    ],
    "sources": [
      "tn-music-generator"
    ],
    "range": "Music Generator · steps 13–24",
    "tasks": [
      [
        "Hubungkan recorder, play, webcam, feature extractor, dan KNN.",
        "Connect the recorder, playback, webcam, feature extractor, and KNN."
      ],
      [
        "Tambahkan contoh tiga kelas, jalankan training dan classify → playSound.",
        "Add examples for three classes, then run training and classify → playSound."
      ],
      [
        "Uji ketiga kelas dan tombol pause. Catat label serta suara yang benar-benar keluar.",
        "Test all three classes and pause. Record the label and the sound actually played."
      ]
    ],
    "challenge": [
      "Ubah satu pasangan kelas–suara, lalu periksa apakah hasil mengikuti mapping baru.",
      "Change one class–sound pair, then check whether the result follows the new mapping."
    ],
    "check": [
      "Saat suara salah, periksa label prediksi dan mapping secara terpisah. Pause harus menghentikan aktivitas yang dijanjikan UI.",
      "When the sound is wrong, check the predicted label and mapping separately. Pause should stop the activity described in the UI."
    ],
    "result": [
      "Instrument berjalan, satu mapping berubah, dan empat hasil uji.",
      "A working instrument, one changed mapping, and four test results."
    ],
    "prep": [
      "Lanjut dari UI sebelumnya. Siapkan checkpoint langkah 21 bila pemasangan audio memakan waktu. Ikuti API pustaka pada kode BSD.",
      "Continue from the previous UI. Prepare a step-21 checkpoint if audio setup takes time. Use the library APIs in BSD code."
    ],
    "oral": [
      "Apakah suara salah karena classifier atau mapping? Tunjukkan buktinya.",
      "Is the wrong sound caused by classification or mapping? Show evidence."
    ],
    "questions": [
      {
        "stem": [
          "Label benar, tetapi suara salah. Periksa…",
          "The label is correct, but the sound is wrong. Check…"
        ],
        "options": [
          [
            "Menambah gambar walaupun prediksinya sudah benar.",
            "Adding images even though the prediction is already correct."
          ],
          [
            "Mapping label ke suara.",
            "The label-to-sound mapping."
          ],
          [
            "Mengganti semua nama kelas tanpa memeriksa playSound.",
            "Renaming all classes without checking playSound."
          ]
        ],
        "key": 1,
        "why": [
          "Label yang benar mengarahkan pemeriksaan ke pemilihan suara.",
          "A correct label points the investigation toward sound selection."
        ]
      },
      {
        "stem": [
          "Mengapa menguji pause?",
          "Why test pause?"
        ],
        "options": [
          [
            "Karena pause otomatis memperbaiki label yang salah.",
            "Because pause automatically corrects wrong labels."
          ],
          [
            "Karena pause selalu melatih ulang semua contoh.",
            "Because pause always retrains all examples."
          ],
          [
            "Untuk memeriksa kontrol pengguna bekerja.",
            "To check that a user control works."
          ]
        ],
        "key": 2,
        "why": [
          "Fungsi yang tersedia di UI perlu diuji, termasuk menghentikan proses.",
          "UI functions need testing, including stopping the process."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Melayani: gunakan kemampuan untuk membantu orang lain; periksa apakah fitur benar-benar berguna (1 Petrus 4:10).",
      "Service: use your abilities to help others; check whether a feature is useful (1 Peter 4:10)."
    ]
  },
  {
    "id": 7,
    "title": [
      "Chess · papan dan aturan",
      "Chess · board and rules"
    ],
    "goal": [
      "Bangun papan yang menerima langkah legal.",
      "Build a board that accepts legal moves."
    ],
    "learn": [
      "chessboard.js menampilkan papan; chess.js mengelola aturan dan keadaan permainan. Tampilan highlight berbeda dari pemeriksaan legalitas.",
      "chessboard.js displays the board; chess.js manages rules and game state. Highlighting differs from validating a move."
    ],
    "sources": [
      "tn-ai-chess-player"
    ],
    "range": "AI Chess Player · steps 2–12",
    "tasks": [
      [
        "Ikuti pemasangan papan, draggable, dan chess.js.",
        "Follow the board, draggable, and chess.js setup."
      ],
      [
        "Hubungkan hover, daftar langkah legal, highlight, dan validasi perpindahan.",
        "Connect hover, legal moves, highlighting, and move validation."
      ],
      [
        "Uji satu langkah legal dan satu ilegal. Catat apakah papan menerima atau menolaknya.",
        "Test one legal and one illegal move. Record whether the board accepts or rejects it."
      ]
    ],
    "challenge": [
      "Tambahkan petunjuk singkat atau perbaiki warna highlight supaya pemain tahu langkah yang tersedia.",
      "Add a short instruction or improve highlight colors so players can see available moves."
    ],
    "check": [
      "Langkah ilegal ditolak; highlight dibersihkan ketika tidak dibutuhkan.",
      "Illegal moves are rejected; highlights clear when no longer needed."
    ],
    "result": [
      "Papan berjalan dengan dua hasil uji legalitas.",
      "A working board and two legality test results."
    ],
    "prep": [
      "Siapkan checkpoint langkah 4 atau 12. Gunakan API pustaka BSD yang disediakan, bukan mengganti versinya di tengah proyek.",
      "Prepare a step-4 or step-12 checkpoint. Use supplied BSD library APIs rather than changing versions mid-project."
    ],
    "oral": [
      "Bagian mana hanya menggambar papan dan bagian mana memeriksa aturan?",
      "Which part draws the board and which checks the rules?"
    ],
    "questions": [
      {
        "stem": [
          "Pustaka mana memeriksa aturan chess?",
          "Which library checks chess rules?"
        ],
        "options": [
          [
            "chess.js.",
            "chess.js."
          ],
          [
            "chessboard.js saja.",
            "chessboard.js alone."
          ],
          [
            "Kode warna highlight saja.",
            "Highlight color code alone."
          ]
        ],
        "key": 0,
        "why": [
          "Papan menyediakan tampilan; chess.js menyimpan state dan memeriksa langkah.",
          "The board supplies the display; chess.js maintains state and validates moves."
        ]
      },
      {
        "stem": [
          "Pasangan uji yang berguna ialah…",
          "A useful test pair is…"
        ],
        "options": [
          [
            "Dua langkah legal saja.",
            "Only two legal moves."
          ],
          [
            "Satu langkah legal dan satu ilegal.",
            "One legal and one illegal move."
          ],
          [
            "Dua warna highlight tanpa mencoba langkah.",
            "Two highlight colors without trying moves."
          ]
        ],
        "key": 1,
        "why": [
          "Uji positif dan negatif memeriksa menerima serta menolak input.",
          "Positive and negative tests check both accepting and rejecting input."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Tanggung jawab: periksa bukti sebelum menyimpulkan dan jelaskan keterbatasan teknologi (Amsal 18:13).",
      "Responsibility: examine evidence before concluding and explain technological limitations (Proverbs 18:13)."
    ]
  },
  {
    "id": 8,
    "title": [
      "Chess · keputusan dan pencarian",
      "Chess · decisions and search"
    ],
    "goal": [
      "Bandingkan keputusan dan waktu pada dua kedalaman pencarian.",
      "Compare decisions and time at two search depths."
    ],
    "learn": [
      "Bot mencoba langkah, mengevaluasi papan, lalu membatalkannya untuk membandingkan alternatif. Minimax mencari kemungkinan langkah; ini bukan training KNN.",
      "The bot tries moves, evaluates the board, and undoes them to compare alternatives. Minimax searches possible moves; it is not KNN training."
    ],
    "sources": [
      "tn-ai-chess-player"
    ],
    "range": "AI Chess Player · steps 13–19",
    "tasks": [
      [
        "Ikuti langkah random move → evaluateBoard → bestMove → undo → minimaxRoot.",
        "Follow random move → evaluateBoard → bestMove → undo → minimaxRoot."
      ],
      [
        "Siapkan posisi papan yang sama untuk mencoba depth 1 dan depth 2.",
        "Prepare the same board position to try depth 1 and depth 2."
      ],
      [
        "Catat langkah terpilih dan waktu respons. Jelaskan manfaat serta biaya pencarian lebih dalam.",
        "Record the chosen move and response time. Explain a benefit and a cost of deeper search."
      ]
    ],
    "challenge": [
      "Ubah depth pada salinan. Prediksi dulu apakah respons akan lebih lama, lalu uji.",
      "Change depth in a copy. Predict whether the response will take longer, then test it."
    ],
    "check": [
      "Mulai dari posisi yang sama; jangan menyimpulkan depth lebih besar pasti menang dari satu percobaan.",
      "Start from the same position; one trial cannot prove greater depth always wins."
    ],
    "result": [
      "Perbandingan depth 1/2: langkah, waktu, dan satu keterbatasan.",
      "A depth-1/2 comparison: move, time, and one limitation."
    ],
    "prep": [
      "Sediakan papan legal berjalan dari panduan papan chess. Jika lambat, batasi depth 1 dan 2.",
      "Use the working legal board from the chess board guide. If slow, limit depth to 1 and 2."
    ],
    "oral": [
      "Mengapa undo diperlukan? Apa biaya menelusuri lebih banyak kemungkinan?",
      "Why is undo needed? What does exploring more possibilities cost?"
    ],
    "questions": [
      {
        "stem": [
          "Mengapa bot memanggil undo saat evaluasi?",
          "Why does the bot call undo during evaluation?"
        ],
        "options": [
          [
            "Untuk menghapus semua aturan chess.",
            "To remove every chess rule."
          ],
          [
            "Untuk menyimpan langkah uji sebagai langkah pertandingan.",
            "To keep the tested move as a played match move."
          ],
          [
            "Untuk mengembalikan posisi sebelum mencoba alternatif.",
            "To restore the position before trying an alternative."
          ]
        ],
        "key": 2,
        "why": [
          "Alternatif harus dibandingkan dari state papan yang sama.",
          "Alternatives must be compared from the same board state."
        ]
      },
      {
        "stem": [
          "Pencarian lebih dalam biasanya…",
          "Deeper search usually…"
        ],
        "options": [
          [
            "Memeriksa lebih banyak kemungkinan dengan biaya waktu.",
            "Examines more possibilities at a time cost."
          ],
          [
            "Selalu memenangkan semua game.",
            "Always wins every game."
          ],
          [
            "Memeriksa lebih sedikit langkah sehingga pasti lebih cepat.",
            "Examines fewer moves and therefore is always faster."
          ]
        ],
        "key": 0,
        "why": [
          "Kedalaman memengaruhi banyaknya pencarian; kualitas juga bergantung evaluasi dan posisi.",
          "Depth affects search amount; quality also depends on evaluation and position."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Tanggung jawab: periksa bukti sebelum menyimpulkan dan jelaskan keterbatasan teknologi (Amsal 18:13).",
      "Responsibility: examine evidence before concluding and explain technological limitations (Proverbs 18:13)."
    ]
  },
  {
    "id": 9,
    "title": [
      "Modifikasi digital assistant",
      "Modify the digital assistant"
    ],
    "goal": [
      "Tambahkan dua perintah kelas dan respons untuk input tak dikenal.",
      "Add two classroom commands and a response to unknown input."
    ],
    "learn": [
      "Assistant BSD ini memakai pemeriksaan string dan if/else. Ia tidak memakai LLM atau pengenal suara. Respons hanya mengikuti aturan yang ditulis.",
      "This BSD assistant uses string checks and if/else. It uses neither an LLM nor speech recognition. Responses follow written rules."
    ],
    "sources": [
      "tn-ai-digital-assistant"
    ],
    "range": "AI Digital Assistant · steps 2–12",
    "tasks": [
      [
        "Bangun UI dan ikuti contoh respons hello serta food. Telusuri input → kondisi → output.",
        "Build the UI and follow the hello and food response examples. Trace input → condition → output."
      ],
      [
        "Tambahkan dua perintah kelas, misalnya jadwal dan bantuan. Gunakan trim/toLowerCase untuk input.",
        "Add two classroom commands, such as schedule and help. Use trim/toLowerCase for input."
      ],
      [
        "Tambahkan fallback. Uji perintah dikenal, input tidak dikenal, dan variasi huruf besar/spasi.",
        "Add a fallback. Test a known command, unknown input, and uppercase/spacing variation."
      ]
    ],
    "challenge": [
      "Buat fallback yang menyarankan perintah tersedia, lalu coba input yang hampir cocok.",
      "Make the fallback suggest available commands, then try a near-match input."
    ],
    "check": [
      "Tiga uji menunjukkan aturan yang terpanggil. Pakai nama/data rekaan untuk contoh.",
      "Three tests show which rules run. Use invented names/data in examples."
    ],
    "result": [
      "Dua perintah baru, fallback, dan tiga hasil uji.",
      "Two new commands, a fallback, and three test results."
    ],
    "prep": [
      "Contoh drive BSD memiliki angka umur hardcoded: bahas sebagai aturan contoh, bukan aturan hukum universal. Siapkan checkpoint langkah 8.",
      "The BSD drive example hardcodes an age: discuss it as a sample rule, not a universal legal rule. Prepare a step-8 checkpoint."
    ],
    "oral": [
      "Jika saya tulis HELLO, kondisi mana cocok? Bagaimana saat tidak ada kondisi cocok?",
      "If I type HELLO, which condition matches? What happens if none matches?"
    ],
    "questions": [
      {
        "stem": [
          "Bagaimana assistant ini memilih respons?",
          "How does this assistant select a response?"
        ],
        "options": [
          [
            "Dengan memahami semua bahasa memakai LLM.",
            "By understanding every language using an LLM."
          ],
          [
            "Dengan pemeriksaan string dan if/else.",
            "With string checks and if/else."
          ],
          [
            "Dengan belajar otomatis dari setiap percakapan tanpa aturan.",
            "By automatically learning from every conversation without rules."
          ]
        ],
        "key": 1,
        "why": [
          "Kode proyek berisi kondisi untuk input tertentu.",
          "Project code contains conditions for specific inputs."
        ]
      },
      {
        "stem": [
          "Kapan fallback digunakan?",
          "When is the fallback used?"
        ],
        "options": [
          [
            "Saat perintah pertama sudah cocok.",
            "When the first command already matches."
          ],
          [
            "Setiap kali satu else if diperiksa, walaupun ada yang cocok.",
            "Every time an else if is checked, even if another matches."
          ],
          [
            "Saat tidak ada kondisi perintah yang cocok.",
            "When no command condition matches."
          ]
        ],
        "key": 2,
        "why": [
          "Cabang akhir menangani input yang belum dikenali aturan.",
          "The final branch handles input not recognized by the rules."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Melayani: gunakan kemampuan untuk membantu orang lain; periksa apakah fitur benar-benar berguna (1 Petrus 4:10).",
      "Service: use your abilities to help others; check whether a feature is useful (1 Peter 4:10)."
    ]
  },
  {
    "id": 10,
    "title": [
      "Animal rescue · temukan jalur",
      "Animal rescue · find a path"
    ],
    "goal": [
      "Ubah rintangan dan uji apakah target dapat dicapai.",
      "Change an obstacle and test whether the target is reachable."
    ],
    "learn": [
      "Peta diubah menjadi grid: 0 dapat dilalui, 1 rintangan. PF.AStarFinder mencari jalur pada grid tersebut.",
      "The map becomes a grid: 0 is walkable, 1 is blocked. PF.AStarFinder searches for a path on that grid."
    ],
    "sources": [
      "tn-ai-animal-rescue"
    ],
    "range": "AI Animal Rescue · steps 2–10",
    "tasks": [
      [
        "Ikuti map, gridMatrix, PF.Grid, dan PF.AStarFinder.",
        "Follow map, gridMatrix, PF.Grid, and PF.AStarFinder."
      ],
      [
        "Jalankan findPath dari posisi awal ke target; periksa jalur yang dikembalikan.",
        "Run findPath from the start to the target; inspect the returned path."
      ],
      [
        "Pindahkan satu rintangan. Uji target dapat dicapai dan target yang benar-benar terisolasi.",
        "Move one obstacle. Test a reachable target and a completely isolated target."
      ]
    ],
    "challenge": [
      "Jelaskan pesan yang dibutuhkan pemain saat tidak ada jalur. Tambahkan jika bagian kode memungkinkan.",
      "Explain the feedback a player needs when no path exists. Add it if the code section allows."
    ],
    "check": [
      "Catat jalur ditemukan/tidak ditemukan. Kecepatan animasi tidak membuktikan jalur terpendek.",
      "Record path found/not found. Animation speed does not prove a shortest path."
    ],
    "result": [
      "Satu peta berubah dan dua hasil uji keterjangkauan.",
      "One changed map and two reachability test results."
    ],
    "prep": [
      "Proyek resmi dialokasikan sekitar 2 jam. Siapkan checkpoint grid dan sisakan pengerjaan mandiri bila setup belum selesai dalam 80 menit.",
      "The official project allocation is about 2 hours. Prepare a grid checkpoint and allow independent continuation if setup exceeds 80 minutes."
    ],
    "oral": [
      "Mengapa target tidak tercapai? Mana rintangan yang memutus semua jalur?",
      "Why is the target unreachable? Which obstacle blocks all routes?"
    ],
    "questions": [
      {
        "stem": [
          "Apa arti 1 pada gridMatrix?",
          "What does 1 mean in gridMatrix?"
        ],
        "options": [
          [
            "Rintangan.",
            "An obstacle."
          ],
          [
            "Sel yang dapat dilalui.",
            "A walkable cell."
          ],
          [
            "Jumlah langkah yang dipilih ke target.",
            "The number of chosen steps to the target."
          ]
        ],
        "key": 0,
        "why": [
          "Proyek memetakan sel yang dapat dilalui ke 0 dan rintangan ke 1.",
          "The project maps walkable cells to 0 and obstacles to 1."
        ]
      },
      {
        "stem": [
          "Uji target terisolasi memeriksa…",
          "An isolated-target test checks…"
        ],
        "options": [
          [
            "Kecepatan animasi pada jalur berhasil saja.",
            "Only animation speed on a successful route."
          ],
          [
            "Penanganan saat tidak ada jalur.",
            "Handling when no path exists."
          ],
          [
            "Kemampuan menembus rintangan secara otomatis.",
            "The ability to pass automatically through obstacles."
          ]
        ],
        "key": 1,
        "why": [
          "Kasus gagal diperlukan untuk mengevaluasi pencarian dan feedback.",
          "Failure cases are needed to evaluate search and feedback."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Tanggung jawab: periksa bukti sebelum menyimpulkan dan jelaskan keterbatasan teknologi (Amsal 18:13).",
      "Responsibility: examine evidence before concluding and explain technological limitations (Proverbs 18:13)."
    ]
  },
  {
    "id": 11,
    "title": [
      "Navigasi · perintah dan sel",
      "Navigation · commands and cells"
    ],
    "goal": [
      "Susun perintah yang membawa mobil ke tujuan.",
      "Write commands that take the car to its destination."
    ],
    "learn": [
      "goRight(2) bergerak dua sel. Urutan dan jumlah perpindahan menentukan jalur; jumlah baris kode bukan jarak tempuh.",
      "goRight(2) moves two cells. Order and movement counts determine the route; code line count is not travel distance."
    ],
    "sources": [
      "tn-ai-navigation-algorithm"
    ],
    "range": "AI Navigation Algorithm · steps 2–12",
    "tasks": [
      [
        "Hubungkan tombol dan navigateRoad sesuai proyek.",
        "Connect the button and navigateRoad as shown in the project."
      ],
      [
        "Telusuri grid. Tuliskan urutan goRight/goUp dan jumlah sel sebelum menjalankan.",
        "Trace the grid. Write the goRight/goUp sequence and cell counts before running."
      ],
      [
        "Jalankan, periksa posisi akhir, lalu perbaiki urutan atau jumlah yang salah.",
        "Run, check the final position, then fix an incorrect order or count."
      ]
    ],
    "challenge": [
      "Coba rute kedua bila peta memungkinkan. Bandingkan jumlah sel, bukan jumlah baris.",
      "Try a second route if the map allows. Compare cells traveled rather than lines of code."
    ],
    "check": [
      "Periksa posisi awal, tiap belokan, dan tujuan. Ini perintah langsung sebelum keputusan otomatis.",
      "Check the start, each turn, and destination. These are direct commands before automatic decisions."
    ],
    "result": [
      "Urutan perintah, jejak sel, dan hasil posisi akhir.",
      "A command sequence, cell trace, and final-position result."
    ],
    "prep": [
      "Sediakan checkpoint tombol langkah 7. Pilih peta yang sesuai kemampuan kelas; proyek resmi sekitar 2 jam.",
      "Prepare a step-7 button checkpoint. Choose a suitable map; the official project allocation is about 2 hours."
    ],
    "oral": [
      "Berapa sel yang dilalui? Apa yang terjadi bila urutan dua perintah ditukar?",
      "How many cells are traveled? What happens if two commands swap order?"
    ],
    "questions": [
      {
        "stem": [
          "Apa arti goRight(2)?",
          "What does goRight(2) mean?"
        ],
        "options": [
          [
            "Bergerak ke kolom absolut nomor 2.",
            "Move to absolute column number 2."
          ],
          [
            "Bergerak ke kanan selama dua detik.",
            "Move right for two seconds."
          ],
          [
            "Bergerak dua sel ke kanan.",
            "Move two cells right."
          ]
        ],
        "key": 2,
        "why": [
          "Argumen menunjukkan jumlah sel perpindahan.",
          "The argument specifies the cell movement count."
        ]
      },
      {
        "stem": [
          "Bagaimana membandingkan jarak rute?",
          "How can route distances be compared?"
        ],
        "options": [
          [
            "Hitung sel perpindahannya.",
            "Count cells traveled."
          ],
          [
            "Hitung jumlah baris kode saja.",
            "Count code lines alone."
          ],
          [
            "Pilih animasi tercepat tanpa menghitung perpindahan.",
            "Choose the fastest animation without counting movement."
          ]
        ],
        "key": 0,
        "why": [
          "Satu perintah dapat memindahkan beberapa sel.",
          "One command can move several cells."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Tanggung jawab: periksa bukti sebelum menyimpulkan dan jelaskan keterbatasan teknologi (Amsal 18:13).",
      "Responsibility: examine evidence before concluding and explain technological limitations (Proverbs 18:13)."
    ]
  },
  {
    "id": 12,
    "title": [
      "Navigasi · keputusan otomatis",
      "Navigation · automatic decisions"
    ],
    "goal": [
      "Ubah satu aturan arah dan uji akibatnya.",
      "Change one direction rule and test its effect."
    ],
    "learn": [
      "checkMove memeriksa arah yang tersedia; decideNextMove memilih langkah dengan kondisi. checkFinishLine memeriksa tujuan.",
      "checkMove checks available directions; decideNextMove uses conditions to choose a move. checkFinishLine checks the destination."
    ],
    "sources": [
      "tn-ai-auto-navigation"
    ],
    "range": "AI Auto Navigation · steps 2–14, focus 4–13",
    "tasks": [
      [
        "Ikuti kondisi arah dan hubungkan checkMove serta decideNextMove.",
        "Follow direction conditions and connect checkMove and decideNextMove."
      ],
      [
        "Hubungkan checkFinishLine. Uji belokan pada peta yang disediakan.",
        "Connect checkFinishLine. Test a turn on the supplied map."
      ],
      [
        "Ubah prioritas satu arah pada salinan. Uji belokan dan jalan buntu; catat yang terjadi.",
        "Change one direction priority in a copy. Test a turn and a dead end; record what happens."
      ]
    ],
    "challenge": [
      "Prediksi jalur setelah prioritas arah diubah, lalu cocokkan dengan jejak aktual.",
      "Predict the route after changing direction priority, then compare it with the actual trace."
    ],
    "check": [
      "Jangan menganggap semua jalan buntu sudah ditangani. Reset dan pencatatan gerak dilanjutkan pada proyek berikutnya.",
      "Do not assume all dead ends are handled. Reset and move recording continue in the next project."
    ],
    "result": [
      "Satu aturan berubah, prediksi jalur, dan dua hasil uji.",
      "One changed rule, a route prediction, and two test results."
    ],
    "prep": [
      "Sediakan checkpoint fungsi langkah 9. Pertahankan peta sederhana sebelum modifikasi.",
      "Prepare a step-9 function checkpoint. Keep the map simple before modification."
    ],
    "oral": [
      "Kondisi mana dijalankan lebih dahulu? Mengapa mobil masuk jalan buntu?",
      "Which condition runs first? Why does the car enter a dead end?"
    ],
    "questions": [
      {
        "stem": [
          "Fungsi mana memilih langkah berikutnya?",
          "Which function chooses the next move?"
        ],
        "options": [
          [
            "checkFinishLine saja.",
            "checkFinishLine alone."
          ],
          [
            "decideNextMove.",
            "decideNextMove."
          ],
          [
            "Kode yang menampilkan tombol saja.",
            "Only the code that displays the button."
          ]
        ],
        "key": 1,
        "why": [
          "decideNextMove memakai hasil pemeriksaan arah dan kondisi.",
          "decideNextMove uses direction checks and conditions."
        ]
      },
      {
        "stem": [
          "Keputusan mobil pada proyek ini berasal dari…",
          "Car decisions in this project come from…"
        ],
        "options": [
          [
            "Model bahasa yang menerima gambar peta.",
            "A language model receiving a map image."
          ],
          [
            "Data latih kamera untuk mengenali belokan.",
            "Webcam training data for recognizing turns."
          ],
          [
            "Aturan arah dalam kode.",
            "Direction rules in code."
          ]
        ],
        "key": 2,
        "why": [
          "Peta dan kondisi menghasilkan keputusan; tidak ada training model bahasa.",
          "The map and conditions produce decisions; no language model is trained."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Tanggung jawab: periksa bukti sebelum menyimpulkan dan jelaskan keterbatasan teknologi (Amsal 18:13).",
      "Responsibility: examine evidence before concluding and explain technological limitations (Proverbs 18:13)."
    ]
  },
  {
    "id": 13,
    "title": [
      "F3 · Jalur, jalan buntu, dan retry",
      "F3 · Routes, dead ends, and retry"
    ],
    "goal": [
      "Modifikasi navigasi dan buktikan hasil pada tiga kasus.",
      "Modify navigation and demonstrate three test cases."
    ],
    "learn": [
      "moves menyimpan perpindahan; resetCar mengembalikan mobil ke awal. Variabel bernama fastest tidak membuktikan jalur terpendek global.",
      "moves stores movements; resetCar returns the car to the start. A variable named fastest does not prove a globally shortest route."
    ],
    "sources": [
      "tn-ai-find-the-finish-line"
    ],
    "range": "AI Find the Finish Line · steps 3–17, focus 3–16",
    "tasks": [
      [
        "Ikuti resetCar, tryAgain, moves.push, serta penyimpanan jalur berhasil.",
        "Follow resetCar, tryAgain, moves.push, and storing successful routes."
      ],
      [
        "Salin proyek; ubah satu aspek peta, reset, atau pencatatan gerak. Prediksi dampaknya.",
        "Copy the project; change one map, reset, or move-recording aspect. Predict its effect."
      ],
      [
        "Uji sampai finish, jalan buntu, dan retry. Catat jejak/jumlah gerak serta posisi setelah reset.",
        "Test reaching the finish, a dead end, and retry. Record the trace/move count and position after reset."
      ]
    ],
    "challenge": [
      "Bandingkan dua jalur berhasil pada peta yang sama jika tersedia. Jelaskan jalur lebih pendek dari hasil yang diuji.",
      "Compare two successful routes on the same map if available. Explain which tested route is shorter."
    ],
    "check": [
      "Jalur tercepat yang ditemukan belum tentu terbaik dari semua kemungkinan. Periksa retry tidak memakai state lama yang keliru.",
      "The fastest found route may not be best among all possibilities. Check that retry does not use incorrect old state."
    ],
    "result": [
      "Tautan sebelum/sesudah, satu perubahan, dan tiga kasus uji.",
      "Before/after links, one change, and three test cases."
    ],
    "prep": [
      "Sediakan checkpoint Auto Navigation. Mulai pemeriksaan individual di sini untuk meringankan demo terakhir.",
      "Prepare an Auto Navigation checkpoint. Start individual checks here to reduce final-demo time."
    ],
    "oral": [
      "Apa isi moves setelah retry? Bukti mana mendukung klaim jalur lebih pendek?",
      "What is in moves after retry? Which evidence supports a shorter-route claim?"
    ],
    "questions": [
      {
        "stem": [
          "Apa tujuan moves.push(lastMove)?",
          "What is moves.push(lastMove) for?"
        ],
        "options": [
          [
            "Mencatat perpindahan.",
            "Recording a movement."
          ],
          [
            "Menghapus jejak gerak sebelumnya.",
            "Deleting the previous movement trace."
          ],
          [
            "Memilih rute terpendek tanpa pencarian.",
            "Choosing the shortest route without a search."
          ]
        ],
        "key": 0,
        "why": [
          "Daftar moves menyimpan jejak gerak yang dapat diperiksa.",
          "The moves list stores a movement trace that can be inspected."
        ]
      },
      {
        "stem": [
          "Variabel fastest membuktikan…",
          "The variable fastest proves…"
        ],
        "options": [
          [
            "Jalur terpendek global hanya karena namanya fastest.",
            "A globally shortest route just because it is named fastest."
          ],
          [
            "Hanya hasil yang disimpan kode; klaim optimal perlu bukti tambahan.",
            "Only what the code stores; optimality requires further evidence."
          ],
          [
            "Semua jalan buntu pasti dapat dilewati.",
            "Every dead end can always be passed."
          ]
        ],
        "key": 1,
        "why": [
          "Nama variabel tidak membuktikan optimalitas global.",
          "A variable name does not prove global optimality."
        ]
      }
    ],
    "kind": "F3",
    "wka": [
      "Kejujuran: laporkan hasil benar dan gagal tanpa memilih bukti yang menguntungkan saja (Amsal 12:22).",
      "Honesty: report successes and failures without selecting only favorable evidence (Proverbs 12:22)."
    ]
  },
  {
    "id": 14,
    "title": [
      "Demo · jelaskan karya versimu",
      "Demo · explain your own version"
    ],
    "goal": [
      "Tunjukkan karya, bukti uji, dan pemahaman individual.",
      "Demonstrate your work, test evidence, and individual understanding."
    ],
    "learn": [
      "Classifier memakai data; assistant memakai aturan string; chess/navigasi memakai aturan atau pencarian. Jelaskan mekanisme karya pilihan secara tepat.",
      "Classifiers use data; the assistant uses string rules; chess/navigation use rules or search. Explain your chosen project’s mechanism accurately."
    ],
    "sources": [
      "tn-webcam-live-classifier-coding-project",
      "tn-music-generator",
      "tn-ai-chess-player",
      "tn-ai-digital-assistant",
      "tn-ai-animal-rescue",
      "tn-ai-navigation-algorithm",
      "tn-ai-auto-navigation",
      "tn-ai-find-the-finish-line"
    ],
    "range": "Your modified BSD project · individual summative demonstration",
    "tasks": [
      [
        "Pilih satu karya modifikasi. Siapkan tautan, perubahan, hasil uji, dan keterbatasan.",
        "Choose one modified project. Prepare its link, change, test results, and limitation."
      ],
      [
        "Demo 2–3 menit: jelaskan input → model/aturan → output dan tunjukkan kode perubahanmu.",
        "Give a 2–3 minute demo: explain input → model/rules → output and show your changed code."
      ],
      [
        "Prediksi akibat satu perubahan kecil dari guru. Ubah, jalankan, dan jelaskan hasil aktual.",
        "Predict the effect of one small teacher-requested change. Edit, run, and explain the actual result."
      ]
    ],
    "challenge": [
      "Jawab satu kasus baru tanpa hanya membaca instruksi BSD.",
      "Respond to one new case without only reading BSD instructions."
    ],
    "check": [
      "Tunjukkan proses dan kegagalan dengan jujur. Skor kuis latihan bukan bukti tunggal penguasaan.",
      "Show your process and failures honestly. A practice quiz score alone does not demonstrate mastery."
    ],
    "result": [
      "Portfolio ringkas dan demo individual yang dapat dijelaskan.",
      "A concise portfolio and an explainable individual demo."
    ],
    "prep": [
      "Umumkan jadwal demo pada sesi akhir dan tenggat bersama. Mulai verifikasi individual saat karya siap.",
      "Announce a final-session demo window and shared deadline. Start individual verification as work becomes ready."
    ],
    "oral": [
      "Apa kontribusimu? Tunjuk kode, prediksi perubahan, dan jelaskan satu keterbatasan.",
      "What is your contribution? Point to code, predict a change, and explain one limitation."
    ],
    "questions": [
      {
        "stem": [
          "Bukti pemahaman individual yang paling kuat ialah…",
          "The strongest evidence of individual understanding is…"
        ],
        "options": [
          [
            "Tanda selesai course tanpa menjelaskan karya.",
            "A completion mark without explaining the project."
          ],
          [
            "Screenshot tampilan tanpa uji atau perubahan.",
            "An interface screenshot without testing or changes."
          ],
          [
            "Menjelaskan kode lalu memprediksi, mengubah, dan menguji.",
            "Explaining code, then predicting, modifying, and testing."
          ]
        ],
        "key": 2,
        "why": [
          "Penjelasan serta transfer ke perubahan baru menunjukkan pemahaman.",
          "Explanation and transfer to a new change demonstrate understanding."
        ]
      },
      {
        "stem": [
          "Pernyataan mana tepat?",
          "Which statement is accurate?"
        ],
        "options": [
          [
            "Proyek berbeda dapat memakai data, aturan, atau pencarian.",
            "Different projects may use data, rules, or search."
          ],
          [
            "Semua proyek memakai mekanisme training gambar yang sama.",
            "All projects use the same image-training mechanism."
          ],
          [
            "Semua proyek AI harus memakai LLM.",
            "Every AI project must use an LLM."
          ]
        ],
        "key": 0,
        "why": [
          "Mekanisme perlu dikenali dari kode dan alur proyek.",
          "Identify the mechanism from project code and flow."
        ]
      }
    ],
    "kind": "",
    "wka": [
      "Kejujuran: laporkan hasil benar dan gagal tanpa memilih bukti yang menguntungkan saja (Amsal 12:22).",
      "Honesty: report successes and failures without selecting only favorable evidence (Proverbs 12:22)."
    ]
  }
];
const UNITS=[
  {
    "id": "intro",
    "title": "Introduction to AI",
    "prior": true,
    "projects": [
      "tn-webcam-image-classification",
      "tn-card-sorting-activity"
    ],
    "guides": [],
    "result": [
      "Jelaskan bagaimana gambar dikelompokkan dan satu keterbatasan prediksi.",
      "Explain how images are grouped and one prediction limitation."
    ],
    "weight": 2
  },
  {
    "id": "train",
    "title": "How to Train Your AI",
    "prior": true,
    "projects": [
      "tn-machine-learning-image-classification",
      "tn-image-upload-classifier"
    ],
    "guides": [
      1
    ],
    "result": [
      "Classifier gambar berjalan; contoh training dan pengujian terpisah.",
      "A working image classifier with separate training and test examples."
    ],
    "weight": 2
  },
  {
    "id": "live",
    "title": "Predicting with Live Data",
    "projects": [
      "tn-webcam-live-classifier",
      "tn-webcam-live-classifier-coding-project",
      "tn-adjustable-accuracy-webcam-classifier"
    ],
    "guides": [
      2,
      3,
      4
    ],
    "result": [
      "Live classifier berjalan dan perbandingan K memakai hasil uji.",
      "A working live classifier and a K comparison based on test results."
    ],
    "weight": 2
  },
  {
    "id": "music",
    "title": "Responsive Instrument",
    "projects": [
      "tn-responsive-instrument",
      "tn-music-generator"
    ],
    "guides": [
      5,
      6
    ],
    "result": [
      "Tiga kelas memilih suara yang sesuai dan kontrol pause bekerja.",
      "Three classes select their mapped sounds and pause works."
    ],
    "weight": 2
  },
  {
    "id": "chess",
    "title": "AI Chess Player",
    "projects": [
      "tn-ai-chess-player"
    ],
    "guides": [
      7,
      8
    ],
    "result": [
      "Langkah legal diperiksa; keputusan dan waktu pada dua depth dibandingkan.",
      "Legal moves are checked; decisions and time are compared at two depths."
    ],
    "weight": 2
  },
  {
    "id": "assistant",
    "title": "AI Digital Assistant",
    "projects": [
      "tn-ai-digital-assistant"
    ],
    "guides": [
      9
    ],
    "result": [
      "Dua perintah baru dan fallback diuji dengan tiga input.",
      "Two new commands and a fallback tested with three inputs."
    ],
    "weight": 2
  },
  {
    "id": "rescue",
    "title": "AI Animal Rescue",
    "projects": [
      "tn-ai-animal-rescue"
    ],
    "guides": [
      10
    ],
    "result": [
      "Pencarian jalur diuji pada target terjangkau dan terisolasi.",
      "Pathfinding tested with a reachable and an isolated target."
    ],
    "weight": 2
  },
  {
    "id": "navigation",
    "title": "AI Navigation Algorithm",
    "projects": [
      "tn-ai-navigation-algorithm"
    ],
    "guides": [
      11
    ],
    "result": [
      "Urutan perintah membawa mobil ke tujuan dan jejak sel dijelaskan.",
      "Commands take the car to the destination and the cell trace is explained."
    ],
    "weight": 2
  },
  {
    "id": "auto",
    "title": "AI Auto Navigation",
    "projects": [
      "tn-ai-auto-navigation"
    ],
    "guides": [
      12
    ],
    "result": [
      "Aturan arah diuji pada belokan dan jalan buntu.",
      "Direction rules tested on a turn and a dead end."
    ],
    "weight": 2
  },
  {
    "id": "finish",
    "title": "AI Find the Finish Line",
    "projects": [
      "tn-ai-find-the-finish-line"
    ],
    "guides": [
      13
    ],
    "result": [
      "Finish, jalan buntu, dan retry diuji; gerak/reset dicatat.",
      "Finish, dead end, and retry tested; movements/reset recorded."
    ],
    "weight": 2
  }
];
const CHECKPOINTS=[
  {
    "id": "F1",
    "guide": 1,
    "unit": "train",
    "trigger": [
      "Setelah Image Upload Classifier siap. Bisa dikerjakan sekarang memakai karya lama.",
      "After Image Upload Classifier is ready. You can use your existing work now."
    ],
    "weight": 10
  },
  {
    "id": "F2",
    "guide": 4,
    "unit": "live",
    "trigger": [
      "Setelah Adjustable Accuracy Webcam Classifier siap.",
      "After Adjustable Accuracy Webcam Classifier is ready."
    ],
    "weight": 10
  },
  {
    "id": "F3",
    "guide": 13,
    "unit": "finish",
    "trigger": [
      "Setelah Find the Finish Line siap.",
      "After Find the Finish Line is ready."
    ],
    "weight": 10
  }
];
