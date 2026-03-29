# Nilai Informatika – Firebase BaaS Project

Aplikasi web **Buku Nilai Informatika** yang dibangun menggunakan **Firebase Realtime Database** sebagai Backend as a Service (BaaS).  
Aplikasi ini memungkinkan guru mengelola nilai siswa dan siswa melihat nilai mereka secara real-time melalui website.

> Project ini dibuat sebagai implementasi Firebase Realtime Database dengan fitur CRUD sesuai tugas modul **Backend as a Service**.
> 
> ** Update Terbaru:** Fitur Webmailer dengan Verifikasi Email - Register guru kini harus verifikasi email terlebih dahulu sebelum bisa login.

---

##  Fitur Baru: Webmailer & Email Verification

### Ringkasan
- **Email Verification:** Saat register, sistem mengirim link verifikasi ke email yang didaftarkan
- **Login Restriction:** User hanya bisa login jika email sudah diverifikasi
- **Auto Redirect:** Setelah klik link verifikasi, otomatis redirect ke halaman login
- **Error Handling:** Pesan error jelas untuk akun tidak ditemukan & password salah
- **Resend Verification:** Tombol kirim ulang email verifikasi jika email hilang

### Alur Verifikasi Email
```
Register → Kirim Email Verifikasi → User Cek Email → Klik Link → Verifikasi Sukses → Redirect Login
```

File terkait fitur ini:
- `js/auth.js` - Logika login, register, dan verifikasi
- `js/firebase-init.js` - Inisialisasi Firebase
- `verify.html` - Halaman handler verifikasi email
- `DOKUMENTASI_TUGAS_WEBMAILER.md` - Dokumentasi lengkap fitur

---

## Live Demo

Aplikasi dapat diakses di:

| Platform | URL |
|----------|-----|
| **Firebase Hosting** | **[https://nilai-informatika.web.app](https://nilai-informatika.web.app)** |
| **Render** | **[https://nilai-informatikasss.onrender.com](https://nilai-informatikasss.onrender.com)** |

**[https://nilai-informatikasss.onrender.com](https://nilai-informatikasss.onrender.com)**

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

| Layanan                    | Fungsi                                          |
| -------------------------- | ----------------------------------------------- |
| Firebase Realtime Database | Penyimpanan & sinkronisasi data real-time       |
| Firebase Authentication    | Register & login akun guru dengan verifikasi email |
| Firebase Hosting           | Deploy & hosting aplikasi (Primary)             |

### Hosting

| Platform | URL | Keterangan |
|----------|-----|------------|
| **Firebase Hosting** | [nilai-informatika.web.app](https://nilai-informatika.web.app) | Hosting utama via Firebase |
| **Render** | [nilai-informatikasss.onrender.com](https://nilai-informatikasss.onrender.com) | Hosting alternatif via Render |

---

## Arsitektur Sistem

```
User (Browser)
     │
     │ HTTP Request
     ▼
Frontend Web (HTML + CSS + JS)
     │
     │ Firebase SDK (Auth + Realtime Database)
     ▼
Firebase Services
     ├── Authentication (Email Verification)
     ├── Realtime Database (Data Storage)
     └── Hosting (Deployment)
```

Firebase digunakan sebagai **Backend as a Service** yang menangani:

-  Autentikasi dengan verifikasi email
-  Penyimpanan data siswa & guru
-  Sinkronisasi data real-time
-  Hosting aplikasi

---

## Struktur Data Database

### Data Siswa
```json
{
  "siswa": {
    "student_id": {
      "nis": "12345678",
      "nama": "ALEXANDER CHRISTIAN",
      "kelas": "9B",
      "password": "Sph12345!",
      "q3_f1": 88,
      "q3_f2": 95,
      "q3_sumatif": 90,
      "createdAt": 1773105238331
    }
  }
}
```

### Data Guru (dengan Verifikasi)
```json
{
  "guru": {
    "uid_guru": {
      "email": "guru@sekolah.id",
      "uid": "uid_guru",
      "isVerified": true,
      "emailVerified": true,
      "createdAt": 1773105238331,
      "verifiedAt": 1773105238331,
      "verifiedBy": "admin@sekolah.id"
    }
  }
}
```

---

## Fitur Aplikasi

### Mode Siswa

Siswa **tidak perlu login** untuk melihat nilai. Cukup:

-  Cari nama/NIS mereka di kolom pencarian
-  Verifikasi password siswa
-  Lihat nilai formatif dan sumatif per quarter
-  Lihat chart radar performa
-  Lihat status kelulusan KKM (Tuntas / Remedial / Susulan)

### Mode Guru

Guru melakukan **register/login** menggunakan Firebase Authentication dengan **verifikasi email wajib**:

| Fungsi     | Keterangan                                    |
| ---------- | --------------------------------------------- |
| **Register** | Buat akun dengan email → Verifikasi email    |
| **Login**  | Masuk dengan email terverifikasi              |
| **Create** | Tambah siswa baru via form input              |
| **Read**   | Lihat seluruh data siswa real-time            |
| **Update** | Edit nilai langsung dari tabel                |
| **Delete** | Hapus data siswa dari database                |

### Sistem Verifikasi Guru (Baru!)

| Tahap | Proses |
|-------|--------|
| 1. Register | Guru daftar dengan email & password |
| 2. Email Sent | Firebase kirim link verifikasi ke email |
| 3. Verifikasi | Guru klik link di email → `verify.html` |
| 4. Approval | Admin utama approve akun guru (jika bukan admin) |
| 5. Login | Guru bisa login dan akses dashboard |

### Fitur Tambahan

-  **Email Verification** - Verifikasi email otomatis via Firebase
-  **Password Protection** - Siswa perlu password untuk lihat nilai
-  **Multi Quarter** - Support 4 quarter (Q1, Q2, Q3, Q4)
-  **Import Excel** - Import data massal dari Excel
-  **Export Excel** - Export seluruh data ke Excel
-  **KKM Calculator** - Hitung status otomatis (Tuntas/Remedial/Susulan)
-  **UI Responsif** - Mobile-friendly design
-  **Admin Panel** - Super admin bisa approve/reject guru

---

## Screenshot Aplikasi

### Halaman Pencarian Nilai (Mode Siswa)
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

## Struktur File

```
nilai-informatika/
├── 📄 index.html              # Halaman utama (student search + login modal)
├── 📄 verify.html             #  Halaman verifikasi email
├── 📄 dashboard.html          # Dashboard guru (CRUD nilai)
├── 📁 js/
│   ├── 📄 firebase-init.js    # Inisialisasi Firebase & helper functions
│   ├── 📄 auth.js             #  Logika auth: login, register, verifikasi
│   ├── 📄 student.js          # Fitur pencarian siswa
│   └── 📄 teacher.js          # Fitur dashboard guru
├── 📄 app.js                  # File lama (legacy)
├── 📄 style.css               # Custom CSS
├── 📄 firebase.json           # Konfigurasi Firebase Hosting & Cache
├── 📄 database.rules.json     # Security rules database
├── 📄 .firebaserc             # Firebase project alias
├── 📄 README.md               # Dokumentasi project
├── 📄 DOKUMENTASI_TUGAS_WEBMAILER.md  #  Dokumentasi fitur webmailer
└── 📁 screenshots/            # Screenshot untuk README
```

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

Project di-deploy menggunakan dua platform hosting:

### Option 1: Firebase Hosting (Primary)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login ke Firebase
firebase login

# Deploy ke hosting
firebase deploy --only hosting
```

**URL:** [https://nilai-informatika.web.app](https://nilai-informatika.web.app)

### Option 2: Render Hosting (Alternatif)

Aplikasi juga di-deploy di **Render** sebagai hosting alternatif:

**URL:** [https://nilai-informatikasss.onrender.com](https://nilai-informatikasss.onrender.com)

Untuk deploy ke Render:
1. Connect GitHub repository ke Render
2. Pilih branch `main`
3. Set build command: *(static site - no build needed)*
4. Set publish directory: `/`
5. Klik "Deploy"

### Deploy Database Rules

```bash
firebase deploy --only database
```

### Deploy Semua (Hosting + Database)

```bash
firebase deploy --only hosting,database
```

---

## Tujuan Project

Project ini dibuat untuk:

- Memahami konsep **Backend as a Service (BaaS)**
- Mengimplementasikan **Firebase Realtime Database**
- Membangun aplikasi **CRUD berbasis web**
- Mengintegrasikan frontend dengan **cloud backend**
- Mengimplementasikan **Email Verification** dengan Firebase Auth

---

## Fitur Utama

### Core Features
-  CRUD nilai siswa (Create, Read, Update, Delete)
-  Register/login guru dengan **email verification**
-  Pencarian nama/NIS siswa (live search)
-  Import/export data Excel
-  Dashboard guru dengan proteksi login
-  Real-time update via Firebase Realtime Database

###  Email Verification Features
-  Kirim link verifikasi saat register
-  Login hanya untuk email terverifikasi
-  Redirect otomatis ke login setelah verifikasi
-  Kirim ulang email verifikasi
-  Admin approval system

---

## Alur Penggunaan (User Flow)

### Alur Siswa
1. Siswa membuka website
2. Cari nama/NIS di kolom pencarian
3. Masukkan password untuk verifikasi
4. Lihat detail nilai dan status

### Alur Guru (dengan Verifikasi Email)
1. Guru klik "Login Guru"
2. Pilih "Belum punya akun? Register"
3. Isi email & password → Klik "Daftar"
4. **Cek email** dan klik link verifikasi
5. Setelah verifikasi, kembali ke halaman login
6. Login dengan email & password
7. **Admin approve** (jika bukan admin utama)
8. Akses dashboard dan kelola nilai

---

## Error Handling

| Error | Penyebab | Solusi |
|-------|----------|--------|
| "Akun tidak ditemukan" | Email belum terdaftar | Register terlebih dahulu |
| "Password salah" | Password tidak cocok | Periksa caps lock, coba lagi |
| "Email belum diverifikasi" | Belum klik link verifikasi | Cek inbox/spam, klik link |
| "Email sudah terdaftar" | Email sudah ada di sistem | Gunakan email lain atau login |
| "Password terlalu lemah" | Password < 6 karakter | Gunakan password lebih kuat |

---

## Realtime Database Rules

File `database.rules.json` menyediakan security rules:

```json
{
  "rules": {
    "siswa": {
      ".read": true,
      ".write": "auth != null"
    },
    "guru": {
      ".read": "auth != null",
      "$uid": {
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

Deploy rules:

```bash
firebase deploy --only database
```

---

## Troubleshooting

### Masalah Login/Register
- **Login gagal:** Pastikan email sudah diverifikasi (cek inbox)
- **Tidak menerima email verifikasi:** Cek folder spam/promotions
- **Link verifikasi expired:** Klik "Kirim Ulang Verifikasi" di modal login

### Masalah Data
- **Data tidak muncul:** Refresh halaman, cek koneksi internet
- **Gagal import Excel:** Pastikan format sesuai template

### Masalah Deploy
- **Deploy gagal:** Pastikan sudah `firebase login`
- **Error permission:** Cek role Firebase project

---

## Kontribusi

Pull request dan issue dipersilakan untuk pengembangan fitur atau perbaikan bug.

---

## Changelog

### v2.0.0 - Webmailer & Email Verification (Terbaru)
-  Fitur webmailer dengan email verification
-  Login restriction untuk email belum terverifikasi
-  Halaman verifikasi email (`verify.html`)
-  Error handling untuk auth errors
-  Resend verification email
-  Admin approval system
-  Restructure folder (`js/`)

### v1.0.0 - Initial Release
-  Firebase Realtime Database integration
-  CRUD nilai siswa
-  Firebase Authentication (basic)
-  Import/Export Excel
-  Firebase Hosting deployment

---

## Referensi

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firebase Email Verification](https://firebase.google.com/docs/auth/web/email-verification)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0)

---

## Dokumentasi Tambahan

- **[DOKUMENTASI_TUGAS_WEBMAILER.md](DOKUMENTASI_TUGAS_WEBMAILER.md)** - Dokumentasi lengkap fitur webmailer & email verification

---

**Project by:** [1oneGod1](https://github.com/1oneGod1)  
**Last Updated:** 29 Maret 2026
