# Dokumentasi Tugas: Fitur Webmailer dengan Verifikasi Email

## 📋 Informasi Tugas

| Informasi | Detail |
|-----------|--------|
| **Mata Kuliah** | Cloud Computing |
| **Topik** | Backend as a Service (BaaS) - Firebase Authentication |
| **Fitur Utama** | Webmailer dengan Email Verification |
| **Tech Stack** | Firebase Auth, Firebase Realtime Database, JavaScript, HTML |

---

## ✅ Fitur yang Diimplementasikan

### 1. Webmailer - Email Verification saat Register
- Sistem mengirimkan **link verifikasi** ke email yang didaftarkan
- Menggunakan Firebase Authentication `sendEmailVerification()`
- Email berisi link ke halaman `verify.html`

### 2. Redirect setelah Verifikasi
- Setelah user klik link verifikasi, sistem redirect otomatis ke **halaman login**
- URL redirect: `index.html?verified=1` dengan pesan sukses

### 3. Login dengan Validasi Email
- User **tidak bisa login** jika email belum diverifikasi
- Sistem mengecek `user.emailVerified` dari Firebase Auth
- Tampil pesan error dengan tombol "Kirim Ulang Verifikasi"

### 4. Error Handling
| Skenario | Pesan Error |
|----------|-------------|
| Akun tidak ditemukan | "Akun dengan email ini tidak ditemukan. Silakan register terlebih dahulu." |
| Password salah | "Password salah. Coba lagi." / "Email atau password salah." |
| Email belum diverifikasi | "Email Anda belum diverifikasi. Silakan cek inbox/spam..." |
| Email sudah terdaftar | "Email sudah terdaftar. Silakan login." |
| Password lemah | "Password terlalu lemah (minimal 6 karakter)." |

---

## 📁 Struktur File Implementasi

```
CloudComputing/
├── 📄 index.html              ← Halaman login & register guru
├── 📄 verify.html             ← Halaman verifikasi email (handler)
├── 📄 dashboard.html          ← Halaman dashboard (setelah login)
├── 📁 js/
│   ├── 📄 firebase-init.js    ← Inisialisasi Firebase
│   ├── 📄 auth.js             ← ⭐ LOGIKA UTAMA: Webmailer & Auth
│   ├── 📄 student.js          ← Fitur siswa (pencarian)
│   └── 📄 teacher.js          ← Fitur dashboard guru
└── 📄 DOKUMENTASI_TUGAS_WEBMAILER.md  ← File ini
```

---

## 🔧 Implementasi Detail

### A. Konfigurasi Firebase (`js/firebase-init.js`)

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCvzB1z9VCja-DEAzkSbE7m0d_lZMJ7KhE",
  authDomain: "nilai-informatika.firebaseapp.com",
  databaseURL: "https://nilai-informatika-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nilai-informatika",
  storageBucket: "nilai-informatika.firebasestorage.app",
  messagingSenderId: "4250294265",
  appId: "1:4250294265:web:37fc552fad026ca99e0f28",
  measurementId: "G-CZ507RS236"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
const guruRef = db.ref("guru");
```

---

### B. Register & Kirim Email Verifikasi (`js/auth.js` baris 148-229)

**Fungsi:** `submitRegister()`

```javascript
function submitRegister() {
  const email = getLoginEmailInputValue();
  const pwd = getLoginPasswordInputValue();

  auth.createUserWithEmailAndPassword(email, pwd)
    .then(async (result) => {
      const uid = result.user.uid;
      
      // 1. Simpan data guru ke Realtime DB
      const baseProfile = {
        email, uid,
        isVerified: false,
        emailVerified: false,
        createdAt: nowTs(),
      };
      await guruRef.child(uid).set(baseProfile);

      // 2. Kirim Email Verifikasi ⭐
      const verifyPageUrl = window.location.origin + 
        window.location.pathname.replace(/[^/]*$/, "") + "verify.html";
      
      await result.user.sendEmailVerification({
        url: verifyPageUrl,
        handleCodeInApp: true,
      });

      // 3. Logout user & tampil pesan
      await auth.signOut();
      
      showAlert(
        `<strong>Register berhasil!</strong> Link verifikasi telah dikirim ke <strong>${email}</strong>.<br>
         Silakan cek <strong>inbox</strong> atau folder <strong>spam</strong> Anda.`,
        "info"
      );
    })
    .catch((err) => showLoginError(err.message));
}
```

**Penjelasan:**
1. Buat akun dengan `createUserWithEmailAndPassword()`
2. Simpan profil guru ke Realtime Database dengan status `isVerified: false`
3. Kirim email verifikasi menggunakan `sendEmailVerification()`
4. Logout otomatis - user harus verifikasi email terlebih dahulu

---

### C. Halaman Verifikasi Email (`verify.html`)

**Fungsi:** Menerima dan memproses link verifikasi dari Firebase

```javascript
async function verifyEmailToken() {
  setStatus("loading", "Memverifikasi...", "Sedang memproses verifikasi email.");

  // Ambil parameter dari URL
  const { mode, oobCode } = resolveVerifyParams();

  if (mode !== "verifyEmail" || !oobCode) {
    setStatus("warn", "Link Verifikasi Tidak Lengkap", 
      "Halaman ini harus dibuka dari link verifikasi asli.");
    return;
  }

  try {
    // Verifikasi menggunakan kode dari Firebase
    await auth.applyActionCode(oobCode);
    
    setStatus("success", "Verifikasi Berhasil", 
      "Email Anda berhasil diverifikasi. Anda akan diarahkan ke halaman login.");
    
    // Redirect ke login dengan flag ?verified=1
    redirectToLogin();
  } catch (err) {
    setStatus("error", "Gagal Memverifikasi", err.message);
  }
}
```

**Alur:**
1. Halaman menerima parameter `mode=verifyEmail` dan `oobCode`
2. Panggil `auth.applyActionCode(oobCode)` untuk verifikasi
3. Setelah sukses, redirect ke `index.html?verified=1`

---

### D. Login dengan Validasi Email (`js/auth.js` baris 44-146)

**Fungsi:** `submitLogin()`

```javascript
function submitLogin(event) {
  event.preventDefault();
  const email = getLoginEmailInputValue();
  const pwd = getLoginPasswordInputValue();

  auth.signInWithEmailAndPassword(email, pwd)
    .then(async (result) => {
      const user = result.user;
      const uid = user.uid;

      // ⭐ CEK VERIFIKASI EMAIL
      if (!user.emailVerified && !isAdminLogin) {
        pendingEmailForResend = email;
        setResendVisibility(true);
        await auth.signOut();  // Logout paksa!
        showLoginError(
          "Email Anda belum diverifikasi. Silakan cek inbox/spam dan klik link verifikasi."
        );
        return;
      }

      // Cek approval admin (opsional - fitur tambahan)
      const snap = await guruRef.child(uid).once("value");
      const guruData = snap.val();

      if (!guruData.isVerified && !isAdminLogin) {
        await auth.signOut();
        showLoginError("Akun Anda belum diverifikasi oleh admin utama.");
        return;
      }

      // ✅ Login sukses → redirect dashboard
      window.location.href = "dashboard.html";
    })
    .catch((err) => showLoginError(err.message));
}
```

**Validasi:**
1. `user.emailVerified` → cek apakah email sudah dikonfirmasi
2. `isAdminLogin` → bypass untuk admin utama
3. `guruData.isVerified` → cek approval admin (fitur extra)

---

### E. Error Handling (`js/auth.js` baris 313-358)

**Mapping Error Firebase:**

```javascript
const AUTH_ERROR_MAP = {
  "auth/invalid-email":        "Format email tidak valid.",
  "auth/missing-password":     "Kata sandi wajib diisi.",
  "auth/invalid-credential":   "Email atau password salah. Periksa kembali.",
  "auth/wrong-password":       "Password salah. Coba lagi.",
  "auth/user-not-found":       "Akun dengan email ini tidak ditemukan. Silakan register terlebih dahulu.",
  "auth/email-already-in-use": "Email sudah terdaftar. Silakan login.",
  "auth/weak-password":        "Password terlalu lemah (minimal 6 karakter).",
  "auth/too-many-requests":    "Terlalu banyak percobaan login. Coba beberapa saat lagi.",
  "auth/network-request-failed": "Koneksi gagal. Periksa internet Anda.",
  "auth/user-disabled":        "Akun ini telah dinonaktifkan. Hubungi admin."
};

function showLoginError(message, isSuccess = false) {
  const code = String(message || "").match(/auth\/[a-z-]+/)?.[0];
  const text = AUTH_ERROR_MAP[code] || message || "Autentikasi gagal.";
  
  // Tampilkan error di UI
  const errWrap = document.getElementById("loginError");
  const errText = document.getElementById("loginErrorText");
  if (errText) errText.textContent = text;
  if (errWrap) errWrap.style.display = "flex";
}
```

---

### F. Kirim Ulang Verifikasi (`js/auth.js` baris 232-270)

**Fungsi:** `resendVerificationFromLogin()`

```javascript
async function resendVerificationFromLogin() {
  const email = pendingEmailForResend || getLoginEmailInputValue();
  const pwd = getLoginPasswordInputValue();

  // Login sementara untuk kirim ulang
  const result = await auth.signInWithEmailAndPassword(email, pwd);
  const user = result.user;

  if (user.emailVerified) {
    showLoginError("Email ini sudah terverifikasi. Silakan login.", true);
    return;
  }

  // Kirim ulang email verifikasi
  await user.sendEmailVerification({
    url: verifyPageUrl,
    handleCodeInApp: true,
  });
  
  await auth.signOut();
  showLoginError("Email verifikasi berhasil dikirim ulang. Cek inbox/spam.", true);
}
```

---

## 🔄 Alur Kerja Lengkap

### Alur 1: Register → Verifikasi → Login

```
┌─────────────────┐
│  User Register  │
│ (email+password)│
└────────┬────────┘
         ▼
┌─────────────────────────────┐
│ Firebase Auth:              │
│ createUserWithEmailAndPassword()
└────────┬────────────────────┘
         ▼
┌─────────────────────────────┐
│ Simpan ke Realtime DB:      │
│ guru/{uid} = {              │
│   email,                    │
│   isVerified: false,        │
│   emailVerified: false      │
│ }                           │
└────────┬────────────────────┘
         ▼
┌─────────────────────────────┐     ┌──────────────────┐
│ Kirim Email Verifikasi:     │────▶│ Email ke User    │
│ sendEmailVerification()     │     │ (dari Firebase)  │
└────────┬────────────────────┘     └──────────────────┘
         ▼
┌─────────────────────────────┐
│ Logout & Tampil Pesan       │
│ "Cek email untuk verifikasi"│
└─────────────────────────────┘
```

### Alur 2: User Klik Link Verifikasi

```
┌──────────────────┐
│ User buka email  │
│ Klik link verify │
└────────┬─────────┘
         ▼
┌─────────────────────────────┐
│ verify.html?mode=verifyEmail│
│ &oobCode=xxx                │
└────────┬────────────────────┘
         ▼
┌─────────────────────────────┐
│ applyActionCode(oobCode)    │
└────────┬────────────────────┘
         ▼
┌─────────────────────────────┐
│ Email Terverifikasi! ✅     │
└────────┬────────────────────┘
         ▼
┌─────────────────────────────┐
│ Redirect: index.html?verified=1
└─────────────────────────────┘
```

### Alur 3: Login

```
┌─────────────────────────────┐
│ User Login                  │
│ (email+password)            │
└────────┬────────────────────┘
         ▼
┌─────────────────────────────┐
│ signInWithEmailAndPassword()│
└────────┬────────────────────┘
         ▼
      ┌──────────────┐
      │emailVerified?│
      └──────┬───────┘
         Yes/No
        /      \
       ▼        ▼
   ┌──────┐   ┌──────────────────┐
   │ Lanjut│   │ Sign Out         │
   │ Cek   │   │ Tampil Error:    │
   │ Admin │   │ "Email belum     │
   │Approval│   │ diverifikasi"    │
   └───┬───┘   └──────────────────┘
       ▼
   ┌──────────────────┐
   │ approved?        │
   └──────┬───────────┘
      Yes/No
     /      \
    ▼        ▼
┌────────┐ ┌──────────────────┐
│Dashboard│ │ Sign Out         │
│  ✅    │ │ "Belum di-approve│
└────────┘ │ oleh admin"      │
           └──────────────────┘
```

---

## 🧪 Cara Testing

### 1. Test Register & Email Verifikasi
1. Buka `index.html`
2. Klik "Belum punya akun? Register di sini"
3. Isi email aktif dan password
4. Klik "Daftar Akun"
5. Cek email (inbox/spam) → cari email dari Firebase
6. Klik tombol verifikasi di email

### 2. Test Login Tanpa Verifikasi
1. Register dengan email baru
2. Langsung coba login (tanpa klik link email)
3. **Hasil:** Error "Email Anda belum diverifikasi"
4. Tombol "Kirim Ulang Verifikasi" muncul

### 3. Test Login dengan Verifikasi
1. Klik link verifikasi di email
2. Tunggu redirect ke halaman login
3. Login dengan email yang sama
4. **Hasil:** Berhasil masuk ke dashboard

### 4. Test Error Handling
| Test Case | Input Ekspektasi | Hasil |
|-----------|------------------|-------|
| Akun tidak ada | email: `test999@mail.com` | "Akun tidak ditemukan" |
| Password salah | password: `salah123` | "Password salah" |
| Email invalid | email: `bukan-email` | "Format email tidak valid" |
| Password lemah | password: `123` | "Password terlalu lemah" |

---

## 📸 Screenshot Kode Penting

### 1. Kirim Email Verifikasi saat Register
```javascript
// js/auth.js - baris 212-215
await result.user.sendEmailVerification({
  url: verifyPageUrl,
  handleCodeInApp: true,
});
```

### 2. Cek Email Verified saat Login
```javascript
// js/auth.js - baris 72-81
if (!user.emailVerified && !isAdminLogin) {
  pendingEmailForResend = email;
  setResendVisibility(true);
  await auth.signOut();
  showLoginError("Email Anda belum diverifikasi...");
  return;
}
```

### 3. Handler Verifikasi Email
```javascript
// verify.html - baris 109-111
await auth.applyActionCode(oobCode);
setStatus("success", "Verifikasi Berhasil", "Email terverifikasi!");
redirectToLogin();
```

### 4. Error Mapping
```javascript
// js/auth.js - baris 313-324
const AUTH_ERROR_MAP = {
  "auth/user-not-found": "Akun dengan email ini tidak ditemukan...",
  "auth/wrong-password": "Password salah. Coba lagi.",
  // ...
};
```

---

## 🎯 Kesimpulan

Implementasi fitur webmailer dengan verifikasi email ini menggunakan:
- **Firebase Authentication** untuk manajemen user dan email verification
- **Firebase Realtime Database** untuk menyimpan data profil guru
- **JavaScript vanilla** untuk logika client-side

Semua requirement tugas telah terpenuhi:
- ✅ Kirim link verifikasi saat register
- ✅ Redirect ke login setelah verifikasi
- ✅ Login hanya bisa jika email terverifikasi
- ✅ Error handling untuk akun tidak ditemukan & password salah

---

**Dokumentasi dibuat oleh:** [Nama Anda]  
**Tanggal:** 29 Maret 2026
