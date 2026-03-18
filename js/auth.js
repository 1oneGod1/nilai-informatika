/* ========================================================
   auth.js
   Mengelola autentikasi guru: login, register, logout.
   Digunakan di index.html (modal login).
   Setelah login berhasil → redirect ke dashboard.html.
   ======================================================== */

// ─── MODAL OPEN ───────────────────────────────────────────
function openLoginModal() {
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  hideLoginError();
  new bootstrap.Modal(document.getElementById("loginModal")).show();
}

// ─── LOGIN ────────────────────────────────────────────────
function submitLogin(event) {
  event.preventDefault();
  const email = document.getElementById("emailInput").value.trim();
  const pwd   = document.getElementById("passwordInput").value;

  if (!email || !pwd) {
    showLoginError("Email dan password harus diisi.");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, pwd)
    .then((result) => {
      const user = result.user;
      
      // Syarat login: harus sudah diverifikasi emailnya (kecuali mungkin developer testing, tapi wajarnya semua)
      if (!user.emailVerified) {
        auth.signOut();
        throw new Error("Email belum diverifikasi. Silakan klik link verifikasi yang telah dikirim ke email Anda.");
      }

      const uid = user.uid;
      return guruRef.child(uid).once("value").then((snap) => {
        const guruData = snap.val();

        // Akun belum terdaftar di database → buat record
        if (!guruData) {
          const isAdmin = email === ADMIN_UTAMA_EMAIL;
          return guruRef.child(uid).set({
            email,
            uid,
            isVerified: isAdmin,
            createdAt: Date.now(),
            verifiedAt: isAdmin ? Date.now() : null,
            verifiedBy: isAdmin ? "auto" : null,
          }).then(() => {
            if (!isAdmin) {
              auth.signOut();
              throw new Error(
                "Akun Anda telah terdaftar. Silakan tunggu verifikasi admin utama, setelah itu Anda bisa login."
              );
            }
            // Admin langsung redirect
            window.location.href = "dashboard.html";
          });
        }

        // Belum diverifikasi
        if (!guruData.isVerified) {
          auth.signOut();
          throw new Error(
            "Akun Anda belum diverifikasi oleh admin utama. Silakan hubungi admin."
          );
        }

        // Login berhasil → redirect ke dashboard
        const modalEl = document.getElementById("loginModal");
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.hide();
        setTimeout(() => { window.location.href = "dashboard.html"; }, 300);
      });
    })
    .catch((err) => showLoginError(err.message));
}

// ─── REGISTER ────────────────────────────────────────────
function submitRegister() {
  const email = document.getElementById("emailInput").value.trim();
  const pwd   = document.getElementById("passwordInput").value;

  auth
    .createUserWithEmailAndPassword(email, pwd)
    .then((result) => {
      const uid     = result.user.uid;
      const isAdmin = email === ADMIN_UTAMA_EMAIL;

      // Setup URL kembalian setelah verifikasi email (halaman ini & buka modal)
      const actionCodeSettings = {
        url: window.location.origin + window.location.pathname + "?loginModal=true"
      };

      return result.user.sendEmailVerification(actionCodeSettings).then(() => {
        return guruRef.child(uid).set({
          email,
          uid,
          isVerified: isAdmin,
          createdAt: Date.now(),
          verifiedAt: isAdmin ? Date.now() : null,
          verifiedBy: isAdmin ? "auto" : null,
        });
      }).then(() => {
        hideLoginError();
        const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
        if (modal) modal.hide();

        if (isAdmin) {
          showAlert("Register berhasil! Anda adalah Admin Utama. Link verifikasi telah dikirim.", "success");
          setTimeout(() => { window.location.href = "dashboard.html"; }, 1500);
        } else {
          showAlert(
            "Register berhasil! Link verifikasi telah dikirim ke email Anda. Silakan verifikasi untuk dapat login.",
            "info"
          );
          auth.signOut();
        }
      });
    })
    .catch((err) => showLoginError(err.message));
}

// ─── TOGGLE REGISTER FORM ────────────────────────────────
function showRegisterForm() {
  const loginForm     = document.getElementById("loginForm");
  const registerLabel = document.getElementById("registerToggleBtn");

  if (loginForm.getAttribute("data-mode") === "register") {
    // Kembali ke mode login
    loginForm.setAttribute("data-mode", "login");
    loginForm.onsubmit = submitLogin;
    document.querySelector("#loginForm button[type=submit]").textContent = "Masuk";
    if (registerLabel) registerLabel.textContent = "Belum punya akun? Register";
  } else {
    // Ganti ke mode register
    loginForm.setAttribute("data-mode", "register");
    loginForm.onsubmit = (e) => { e.preventDefault(); submitRegister(); };
    document.querySelector("#loginForm button[type=submit]").textContent = "Daftar Akun";
    if (registerLabel) registerLabel.textContent = "Sudah punya akun? Login";
  }
}

// ─── TOGGLE PASSWORD VISIBILITY ──────────────────────────
function togglePassword() {
  const inp  = document.getElementById("passwordInput");
  const icon = document.getElementById("eyeIcon");
  if (inp.type === "password") {
    inp.type = "text";
    icon.className = "bi bi-eye-slash";
  } else {
    inp.type = "password";
    icon.className = "bi bi-eye";
  }
}

// ─── ERROR DISPLAY ────────────────────────────────────────
const AUTH_ERROR_MAP = {
  "auth/invalid-email":       "Format email tidak valid.",
  "auth/missing-password":    "Kata sandi wajib diisi.",
  "auth/invalid-credential":  "Akun tidak ditemukan atau Password salah.",
  "auth/wrong-password":      "Password salah.",
  "auth/user-not-found":      "Akun tidak ditemukan.",
  "auth/email-already-in-use":"Email sudah terdaftar. Silakan login.",
  "auth/weak-password":       "Password terlalu lemah (minimal 6 karakter).",
};

function showLoginError(message, isSuccess = false) {
  const code = String(message || "").match(/auth\/[a-z-]+/)?.[0];
  const text = AUTH_ERROR_MAP[code] || message || "Autentikasi gagal.";
  const errWrap = document.getElementById("loginError");
  const errText = document.getElementById("loginErrorText");
  if (errText) {
    errText.textContent = text;
    errText.className = isSuccess ? "text-emerald-700 ml-2" : "text-rose-700 ml-2";
  }
  if (errWrap) {
    errWrap.className = isSuccess 
      ? "alert alert-success p-2 text-sm items-start" 
      : "alert alert-danger p-2 text-sm items-start";
    errWrap.querySelector("i").className = isSuccess 
      ? "fas fa-check-circle text-emerald-500 mt-0.5" 
      : "fas fa-exclamation-circle text-rose-500 mt-0.5";
    errWrap.style.display = "block";
  }
}

function hideLoginError() {
  const el = document.getElementById("loginError");
  if (el) el.style.display = "none";
}

// ─── CHECK AUTH ON PAGE LOAD (index.html) ────────────────
// Jika guru sudah login dan terverifikasi, langsung redirect ke dashboard
function checkAuthOnStudentPage() {
  auth.onAuthStateChanged(async (user) => {
    if (!user) return; // Tidak login → tetap di student view
    try {
      const snap = await guruRef.child(user.uid).once("value");
      const data = snap.val();
      if (data && data.isVerified) {
        // Guru terverifikasi → tampilkan tombol "Masuk ke Dashboard"
        const dashBtn = document.getElementById("dashboardBtn");
        if (dashBtn) {
          dashBtn.style.display = "";
          dashBtn.onclick = () => { window.location.href = "dashboard.html"; };
        }
      }
    } catch (_) { /* ignore */ }
  });
}
