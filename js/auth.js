/* ========================================================
   auth.js
   Mengelola autentikasi guru: login, register, logout.
   Digunakan di index.html (modal login).
   Setelah login berhasil → redirect ke dashboard.html.
   ======================================================== */

let pendingEmailForResend = "";

function isAdminEmailSafe(email) {
  if (typeof isAdminEmail === "function") return isAdminEmail(email);
  const normalized = String(email || "").trim().toLowerCase();
  return (
    normalized === "andi.purba@sdh.or.id" ||
    normalized === "pandapotanandi@gmail.com"
  );
}

function getLoginEmailInputValue() {
  return (document.getElementById("emailInput")?.value || "").trim();
}

function getLoginPasswordInputValue() {
  return document.getElementById("passwordInput")?.value || "";
}

function normalizeAuthErrorMessage(message) {
  return String(message || "").trim();
}

function setResendVisibility(show) {
  const resendWrap = document.getElementById("resendVerificationWrap");
  if (resendWrap) resendWrap.style.display = show ? "block" : "none";
}

function openLoginModal() {
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  setResendVisibility(false);
  hideLoginError();
  new bootstrap.Modal(document.getElementById("loginModal")).show();
}

// ─── LOGIN ────────────────────────────────────────────────
function submitLogin(event) {
  event.preventDefault();
  const email = getLoginEmailInputValue();
  const normalizedEmail = normalizeEmail(email);
  const isAdminLogin = isAdminEmailSafe(normalizedEmail);
  const pwd   = getLoginPasswordInputValue();

  if (!email || !pwd) {
    showLoginError("Email dan password harus diisi.");
    return;
  }

  // Disable button sementara proses
  const btn = document.querySelector("#loginForm button[type=submit]");
  const originalBtnText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Memproses...';
  }

  auth
    .signInWithEmailAndPassword(email, pwd)
    .then(async (result) => {
      const user = result.user;
      const uid  = user.uid;

      // ── Cek verifikasi email Firebase ──────────────────
      if (!user.emailVerified && !isAdminLogin) {
        pendingEmailForResend = email;
        setResendVisibility(true);
        await auth.signOut();
        showLoginError(
          "Email Anda belum diverifikasi. Silakan cek inbox/spam dan klik link verifikasi yang dikirim saat register."
        );
        if (btn) { btn.disabled = false; btn.innerHTML = originalBtnText; }
        return;
      }

      // ── Ambil / buat profil guru di Realtime DB ─────────
      const snap = await guruRef.child(uid).once("value");
      let guruData = snap.val();

      if (!guruData) {
        const isAdmin = isAdminLogin;
        guruData = {
          email, uid,
          isVerified: isAdmin,
          emailVerified: user.emailVerified || isAdmin,
          createdAt: nowTs(),
          verifiedAt: isAdmin ? nowTs() : null,
          verifiedBy: isAdmin ? "auto" : null,
          emailVerifiedAt: isAdmin ? nowTs() : null,
        };
        await guruRef.child(uid).set(guruData);
      }

      // Admin harus selalu lolos meski data lama belum sinkron.
      if (isAdminLogin && (!guruData.isVerified || !guruData.emailVerified)) {
        await guruRef.child(uid).update({
          isVerified: true,
          emailVerified: true,
          verifiedAt: guruData.verifiedAt || nowTs(),
          verifiedBy: guruData.verifiedBy || "auto",
          emailVerifiedAt: guruData.emailVerifiedAt || nowTs(),
        });
        guruData.isVerified = true;
        guruData.emailVerified = true;
      }

      // ── Sync emailVerified jika baru saja diverifikasi ─
      if (user.emailVerified && !guruData.emailVerified) {
        await guruRef.child(uid).update({
          emailVerified: true,
          emailVerifiedAt: nowTs(),
        });
        guruData.emailVerified = true;
      }

      // ── Cek persetujuan Admin Utama ─────────────────────
      if (!guruData.isVerified && !isAdminLogin) {
        setResendVisibility(false);
        await auth.signOut();
        showLoginError(
          "Akun Anda belum diverifikasi oleh admin utama. Silakan hubungi admin."
        );
        if (btn) { btn.disabled = false; btn.innerHTML = originalBtnText; }
        return;
      }

      // ── Login sukses → redirect dashboard ──────────────
      setResendVisibility(false);
      hideLoginError();
      const modalEl = document.getElementById("loginModal");
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
      setTimeout(() => { window.location.href = "dashboard.html"; }, 300);
    })
    .catch((err) => {
      if (btn) { btn.disabled = false; btn.innerHTML = originalBtnText; }
      showLoginError(normalizeAuthErrorMessage(err.message));
    });
}

// ─── REGISTER ─────────────────────────────────────────────
function submitRegister() {
  const email = getLoginEmailInputValue();
  const normalizedEmail = normalizeEmail(email);
  const isAdminRegister = isAdminEmailSafe(normalizedEmail);
  const pwd   = getLoginPasswordInputValue();

  if (!email || !pwd) {
    showLoginError("Email dan password harus diisi.");
    return;
  }

  const btn = document.querySelector("#loginForm button[type=submit]");
  const originalBtnText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Mendaftarkan...';
  }

  auth
    .createUserWithEmailAndPassword(email, pwd)
    .then(async (result) => {
      const uid     = result.user.uid;
      const isAdmin = isAdminRegister;

      // ── Simpan profil guru ke Realtime DB ───────────────
      const baseProfile = {
        email, uid,
        isVerified: isAdmin,
        emailVerified: isAdmin,
        createdAt: nowTs(),
        verifiedAt: isAdmin ? nowTs() : null,
        verifiedBy: isAdmin ? "auto" : null,
        emailVerifiedAt: isAdmin ? nowTs() : null,
      };
      await guruRef.child(uid).set(baseProfile);

      // ── Sembunyikan modal ───────────────────────────────
      hideLoginError();
      setResendVisibility(false);
      const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      if (modal) modal.hide();

      if (btn) { btn.disabled = false; btn.innerHTML = originalBtnText; }

      // ── Admin Utama: langsung redirect ──────────────────
      if (isAdmin) {
        showAlert(
          "Register berhasil! Anda adalah Admin Utama dan langsung bisa mengakses dashboard.",
          "success"
        );
        setTimeout(() => { window.location.href = "dashboard.html"; }, 1200);
        return;
      }

      // ── Kirim email verifikasi Firebase ─────────────────
      // URL setelah klik link di email → verify.html (halaman khusus verifikasi)
      // Firebase akan redirect ke URL ini SETELAH kode OOB diproses otomatis
      // atau verify.html kita yang meng-handle applyActionCode.
      const verifyPageUrl =
        window.location.origin +
        window.location.pathname.replace(/[^/]*$/, "") +
        "verify.html";

      await result.user.sendEmailVerification({
        url: verifyPageUrl,
        handleCodeInApp: true,
      });

      await auth.signOut();

      showAlert(
        `<strong>Register berhasil!</strong> Link verifikasi telah dikirim ke <strong>${escHtml(email)}</strong>.<br>
         Silakan cek <strong>inbox</strong> atau folder <strong>spam</strong> Anda, lalu klik link verifikasi sebelum login.`,
        "info"
      );
    })
    .catch((err) => {
      if (btn) { btn.disabled = false; btn.innerHTML = originalBtnText; }
      showLoginError(normalizeAuthErrorMessage(err.message));
    });
}

// ─── KIRIM ULANG VERIFIKASI ───────────────────────────────
async function resendVerificationFromLogin() {
  try {
    const email = pendingEmailForResend || getLoginEmailInputValue();
    const pwd   = getLoginPasswordInputValue();

    if (!email || !pwd) {
      showLoginError("Masukkan email dan password terlebih dahulu sebelum kirim ulang verifikasi.");
      return;
    }

    const result = await auth.signInWithEmailAndPassword(email, pwd);
    const user   = result.user;

    if (user.emailVerified) {
      setResendVisibility(false);
      await auth.signOut();
      showLoginError("Email ini sudah terverifikasi. Silakan login.", true);
      return;
    }

    const verifyPageUrl =
      window.location.origin +
      window.location.pathname.replace(/[^/]*$/, "") +
      "verify.html";

    await user.sendEmailVerification({
      url: verifyPageUrl,
      handleCodeInApp: true,
    });
    await auth.signOut();

    showLoginError(
      "Email verifikasi berhasil dikirim ulang ke " + escHtml(email) + ". Silakan cek inbox/spam.",
      true
    );
  } catch (err) {
    showLoginError(normalizeAuthErrorMessage(err.message));
  }
}

// ─── TOGGLE FORM LOGIN ↔ REGISTER ────────────────────────
function showRegisterForm() {
  const loginForm     = document.getElementById("loginForm");
  const registerLabel = document.getElementById("registerToggleBtn");
  const submitBtn     = document.querySelector("#loginForm button[type=submit]");
  const modalTitle    = document.querySelector("#loginModal .modal-title");

  if (loginForm.getAttribute("data-mode") === "register") {
    // Kembali ke mode Login
    loginForm.setAttribute("data-mode", "login");
    loginForm.onsubmit = submitLogin;
    if (submitBtn) submitBtn.innerHTML = '<i class="bi bi-unlock-fill me-2"></i>Masuk';
    if (registerLabel) registerLabel.textContent = "Belum punya akun? Register di sini";
    if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i> LOGIN GURU';
    setResendVisibility(false);
  } else {
    // Beralih ke mode Register
    loginForm.setAttribute("data-mode", "register");
    loginForm.onsubmit = (e) => { e.preventDefault(); submitRegister(); };
    if (submitBtn) submitBtn.innerHTML = '<i class="bi bi-person-plus-fill me-2"></i>Daftar Akun';
    if (registerLabel) registerLabel.textContent = "Sudah punya akun? Login";
    if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-user-plus me-2"></i> REGISTER GURU';
    setResendVisibility(false);
  }
  hideLoginError();
}

// ─── TOGGLE SHOW/HIDE PASSWORD ────────────────────────────
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

// ─── ERROR MAP ────────────────────────────────────────────
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
  "auth/user-disabled":        "Akun ini telah dinonaktifkan. Hubungi admin.",
};

// ─── SHOW / HIDE LOGIN ERROR ──────────────────────────────
function showLoginError(message, isSuccess = false) {
  // Coba ekstrak kode error Firebase (auth/...)
  const code = String(message || "").match(/\(auth\/[a-z-]+\)/)?.[0]
    ?.replace(/[()]/g, "")
    || String(message || "").match(/auth\/[a-z-]+/)?.[0];

  const safeMessage = String(message || "").trim();
  const text = AUTH_ERROR_MAP[code] || safeMessage || "Autentikasi gagal. Coba lagi beberapa saat.";

  const errWrap = document.getElementById("loginError");
  const errText = document.getElementById("loginErrorText");
  const errIcon = errWrap ? errWrap.querySelector("i") : null;

  if (errWrap) {
    if (errText) errText.textContent = text;
    if (isSuccess) {
      if (errIcon) errIcon.className = "fas fa-check-circle";
      errWrap.style.borderColor = "rgba(16, 185, 129, 0.6)";
      errWrap.style.background = "linear-gradient(135deg, rgba(6, 95, 70, 0.45), rgba(16, 185, 129, 0.2))";
    } else {
      if (errIcon) errIcon.className = "fas fa-exclamation-circle";
      errWrap.style.borderColor = "rgba(251, 113, 133, 0.45)";
      errWrap.style.background = "linear-gradient(135deg, rgba(127, 29, 29, 0.3), rgba(190, 24, 93, 0.18))";
    }
    errWrap.style.display = "flex";
  }
}

function hideLoginError() {
  const el = document.getElementById("loginError");
  if (el) el.style.display = "none";
}

// ─── LOGOUT ───────────────────────────────────────────────
function logoutGuru() {
  auth
    .signOut()
    .then(() => {
      showAlert("Anda telah keluar dari mode guru.", "info");
    })
    .catch((err) => showAlert("Gagal logout: " + err.message, "danger"));
}

// ─── CEK AUTH DI HALAMAN SISWA (index.html) ───────────────
function checkAuthOnStudentPage() {
  // Cek apakah baru selesai verifikasi email (dari verify.html)
  const params = new URLSearchParams(window.location.search);
  if (params.get("verified") === "1") {
    // Bersihkan URL tanpa reload
    window.history.replaceState({}, document.title, window.location.pathname);
    // Tunggu DOM siap lalu buka modal login dengan pesan sukses
    setTimeout(() => {
      openLoginModal();
      showLoginError(
        "Email Anda berhasil diverifikasi! Silakan login untuk melanjutkan.",
        true
      );
    }, 400);
  }

  // Pantau status auth
  auth.onAuthStateChanged(async (user) => {
    if (!user) return;
    try {
      const snap = await guruRef.child(user.uid).once("value");
      const data = snap.val();
      const isAdmin = isAdminEmailSafe(user.email) || isAdminEmailSafe(data?.email);
      const canOpenDashboard = !!data && (data.isVerified || isAdmin) && (user.emailVerified || data.emailVerified || isAdmin);
      if (canOpenDashboard) {
        const dashBtn = document.getElementById("dashboardBtn");
        if (dashBtn) {
          dashBtn.style.display = "";
          dashBtn.onclick = () => { window.location.href = "dashboard.html"; };
        }
      }
    } catch (_) { /* abaikan */ }
  });
}
