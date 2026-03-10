#  Nilai Informatika – Firebase BaaS Project

Aplikasi web **Buku Nilai Informatika** yang dibangun menggunakan **Firebase Realtime Database** sebagai Backend as a Service (BaaS).  
Aplikasi ini memungkinkan guru mengelola nilai siswa dan siswa melihat nilai mereka secara real-time melalui website.

> Project ini dibuat sebagai implementasi Firebase Realtime Database dengan fitur CRUD sesuai tugas modul **Backend as a Service**.

---

##  Live Demo

Aplikasi dapat diakses di:

 **[https://nilai-informatika.web.app](https://nilai-informatika.web.app)**

---

##  Teknologi yang Digunakan

### Frontend
| Teknologi | Keterangan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling custom |
| Bootstrap 5 | Komponen UI (modal, alert) |
| Tailwind CSS | Utility-first styling |
| JavaScript | Logika aplikasi |

### Backend (Firebase)
| Layanan | Fungsi |
|---|---|
| Firebase Realtime Database | Penyimpanan & sinkronisasi data real-time |
| Firebase Hosting | Deploy & hosting aplikasi |

---

##  Arsitektur Sistem

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
-  Penyimpanan data siswa
-  Sinkronisasi data real-time
-  Hosting aplikasi

---

##  Struktur Data Database

Data disimpan pada Firebase Realtime Database dengan struktur berikut:

```json
{
  "siswa": {
    "student_id": {
      "nama"      : "ALEXANDER CHRISTIAN",
      "kelas"     : "9B",
      "formatif1" : 88,
      "formatif2" : 95,
      "sumatif"   : 90,
      "createdAt" : 1773105238331
    }
  }
}
```

Setiap siswa memiliki **6 field data**:

| Field | Tipe | Keterangan |
|---|---|---|
| `nama` | String | Nama lengkap siswa |
| `kelas` | String | Kelas siswa (contoh: 9B, 10A) |
| `formatif1` | Number | Nilai formatif pertama |
| `formatif2` | Number | Nilai formatif kedua |
| `sumatif` | Number | Nilai sumatif / ujian akhir |
| `createdAt` | Timestamp | Waktu data dibuat |

---

##  Fitur Aplikasi

###  Mode Siswa
Siswa **tidak perlu login** untuk melihat nilai. Cukup:
-  Cari nama mereka di kolom pencarian
-  Lihat nilai formatif dan sumatif
-  Lihat status kelulusan KKM (Tuntas / Remedial / Susulan)

###  Mode Guru
Guru dapat melakukan **CRUD** data nilai siswa setelah login:

| Fungsi | Keterangan |
|---|---|
|  **Create** | Tambah siswa baru via form input |
|  **Read** | Lihat seluruh data siswa real-time |
|  **Update** | Edit nilai langsung dari tabel |
|  **Delete** | Hapus data siswa dari database |

###  Fitur Tambahan
-  Pencarian nama siswa (live search)
-  Import data massal dari Excel
-  Export seluruh data ke Excel
-  Indikator otomatis: **Tuntas** / **Remedial** / **Susulan**
-  UI Responsif (mobile-friendly)
-  Dashboard guru dilindungi password

---

##  Screenshot Aplikasi

### Halaman Pencarian Nilai (Mode Siswa)
<img width="1906" height="1073" alt="Screenshot 2026-03-10 103527" src="https://github.com/user-attachments/assets/560948b2-cb3f-49d5-ac49-714959f9f680" />

### Tampilan Nilai Siswa

<img width="604" height="609" alt="Screenshot 2026-03-10 103707" src="https://github.com/user-attachments/assets/95c61678-6652-42a3-95ce-7e95e92a987e" />
<img width="587" height="668" alt="Screenshot 2026-03-10 103719" src="https://github.com/user-attachments/assets/6405ab0a-e5a7-4040-b2e2-3e778b51a156" />
<img width="780" height="667" alt="Screenshot 2026-03-10 103654" src="https://github.com/user-attachments/assets/e02c9100-9f23-474f-bac0-8026ace09a09" />



### Login Guru
<img width="881" height="556" alt="Screenshot 2026-03-10 103609" src="https://github.com/user-attachments/assets/334f9d12-88da-4c8c-9c69-352571fb7d55" />


### Dashboard Guru
<img width="1904" height="914" alt="Screenshot 2026-03-10 103622" src="https://github.com/user-attachments/assets/e3df4300-bd3f-4890-9fc0-cb72475ce65a" />
<img width="1788" height="770" alt="Screenshot 2026-03-10 103634" src="https://github.com/user-attachments/assets/08298901-23be-43ce-9801-e6c4dec232d6" />


### Firebase Realtime Database
<img width="1864" height="1254" alt="Screenshot 2026-03-10 104102" src="https://github.com/user-attachments/assets/50439333-fd6a-4b0d-9627-73cddf6ff59c" />

---

##  Instalasi Lokal

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

##  Deployment

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

##  Struktur File

```
nilai-informatika/
├── index.html          # Halaman utama (student view + teacher dashboard)
├── app.js              # Logic Firebase CRUD + UI rendering
├── style.css           # Custom CSS tambahan
├── firebase.json       # Konfigurasi Firebase Hosting & Cache
├── .firebaserc         # Firebase project alias
├── README.md           # Dokumentasi project

```

---

##  Tujuan Project

Project ini dibuat untuk:
-  Memahami konsep **Backend as a Service (BaaS)**
-  Mengimplementasikan **Firebase Realtime Database**
-  Membangun aplikasi **CRUD berbasis web**
-  Mengintegrasikan frontend dengan **cloud backend**

---

##  Referensi

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0)

---
