# Nilai Informatika – Firebase BaaS Project

Aplikasi web **Buku Nilai Informatika** yang dibangun menggunakan **Firebase Realtime Database** sebagai Backend as a Service (BaaS).  
Aplikasi ini memungkinkan guru mengelola nilai siswa dan siswa melihat nilai mereka secara real-time melalui website.

> Project ini dibuat sebagai implementasi Firebase Realtime Database dengan fitur CRUD sesuai tugas modul **Backend as a Service**.

---

## Live Demo

Aplikasi dapat diakses di:

**[https://nilai-informatika.web.app](https://nilai-informatika.web.app)**

---

## Teknologi yang Digunakan

### Frontend

| Teknologi    | Keterangan                 |
| ------------ | -------------------------- |
| HTML5        | Struktur halaman           |
| CSS3         | Styling custom             |
| Bootstrap 5  | Komponen UI (modal, alert) |
| Tailwind CSS | Utility-first styling      |
| JavaScript   | Logika aplikasi            |

### Backend (Firebase)

| Layanan                    | Fungsi                                      |
| -------------------------- | ------------------------------------------- |
| Firebase Realtime Database | Penyimpanan & sinkronisasi data real-time   |
| Firebase Authentication    | Register & login akun guru (Email/Password) |
| Firebase Hosting           | Deploy & hosting aplikasi                   |

---

## Arsitektur Sistem

```
User (Browser)
     │
     │ HTTP Request
     ▼
Frontend Web (HTML + CSS + JS)
     │
     │ Firebase SDK (Realtime Database)
     ▼
Firebase Realtime Database (Google Cloud)
```

Firebase digunakan sebagai **Backend as a Service** yang menangani:

- Penyimpanan data siswa
- Sinkronisasi data real-time
- Hosting aplikasi

---

## Struktur Data Database

Data disimpan pada Firebase Realtime Database dengan struktur berikut:

```json
{
  "siswa": {
    "student_id": {
      "nama": "ALEXANDER CHRISTIAN",
      "kelas": "9B",
      "formatif1": 88,
      "formatif2": 95,
      "sumatif": 90,
      "createdAt": 1773105238331
    }
  }
}
```

Setiap siswa memiliki **6 field data**:

| Field       | Tipe      | Keterangan                    |
| ----------- | --------- | ----------------------------- |
| `nama`      | String    | Nama lengkap siswa            |
| `kelas`     | String    | Kelas siswa (contoh: 9B, 10A) |
| `formatif1` | Number    | Nilai formatif pertama        |
| `formatif2` | Number    | Nilai formatif kedua          |
| `sumatif`   | Number    | Nilai sumatif / ujian akhir   |
| `createdAt` | Timestamp | Waktu data dibuat             |

---

## Fitur Aplikasi

### Mode Siswa

Siswa **tidak perlu login** untuk melihat nilai. Cukup:

- Cari nama mereka di kolom pencarian
- Lihat nilai formatif dan sumatif
- Lihat status kelulusan KKM (Tuntas / Remedial / Susulan)

### Mode Guru

Guru melakukan **register/login** menggunakan Firebase Authentication (Email/Password), lalu dapat melakukan CRUD data nilai siswa:

| Fungsi     | Keterangan                         |
| ---------- | ---------------------------------- |
| **Create** | Tambah siswa baru via form input   |
| **Read**   | Lihat seluruh data siswa real-time |
| **Update** | Edit nilai langsung dari tabel     |
| **Delete** | Hapus data siswa dari database     |

### Fitur Tambahan

- Pencarian nama siswa (live search)
- Import data massal dari Excel
- Export seluruh data ke Excel
- Indikator otomatis: **Tuntas** / **Remedial** / **Susulan**
- UI Responsif (mobile-friendly)
- Dashboard guru dilindungi password
- Register/Login guru via Firebase Authentication

---

## Screenshot Aplikasi

### Halaman Pencarian Nilai (Mode Siswa)

### Tampilan Nilai Siswa

<img width="1754" height="1053" alt="image" src="https://github.com/user-attachments/assets/adda0834-9136-4edf-9a61-9a811d4b6ebd" />

### Login Guru

<img width="922" height="816" alt="image" src="https://github.com/user-attachments/assets/15a60fb7-0697-40a8-975f-80348b99a9ba" />

### Dashboard Guru

<img width="2090" height="1309" alt="image" src="https://github.com/user-attachments/assets/aca36eb9-46ce-453f-b761-062ce762f06e" />

### Firebase Realtime Database

<img width="1952" height="1091" alt="image" src="https://github.com/user-attachments/assets/0ccd252d-1957-466f-8ae5-0934eaa05911" />

### Firebase Authentication

<img width="1727" height="648" alt="image" src="https://github.com/user-attachments/assets/4af02c1c-7e80-4aa1-a5fd-609797ee81a1" />

---

## Instalasi Lokal

1. Clone repository:

```bash
git clone https://github.com/1oneGod1/nilai-informatika.git
```

2. Masuk ke folder project:

```bash
cd nilai-informatika
```

3. Jalankan menggunakan web server lokal (contoh: VS Code Live Server) atau buka langsung `index.html`.

---

## Deployment

Project di-deploy menggunakan **Firebase Hosting**.

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login ke Firebase
firebase login

# Deploy ke hosting
firebase deploy --only hosting
```

**URL Hosting:** [https://nilai-informatika.web.app](https://nilai-informatika.web.app)

---

## Struktur File

```
nilai-informatika/
├── index.html          # Halaman utama (student view + teacher dashboard)
├── app.js              # Logic Firebase CRUD + UI rendering
├── style.css           # Custom CSS tambahan
├── firebase.json       # Konfigurasi Firebase Hosting & Cache
├── .firebaserc         # Firebase project alias
├── README.md           # Dokumentasi project
└── screenshots/        # Screenshot untuk README
    ├── search.png
    ├── nilai.png
    ├── login.png
    ├── dashboard.png
    └── firebase_database.png
```

---

## Tujuan Project

Project ini dibuat untuk:

- Memahami konsep **Backend as a Service (BaaS)**
- Mengimplementasikan **Firebase Realtime Database**
- Membangun aplikasi **CRUD berbasis web**
- Mengintegrasikan frontend dengan **cloud backend**

---

## Referensi

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0)

---
