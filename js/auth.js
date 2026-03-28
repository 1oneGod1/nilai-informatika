/* ========================================================
   auth.js
   Mengelola autentikasi guru: login, register, logout.
   Digunakan di index.html (modal login).
   Setelah login berhasil → redirect ke dashboard.html.
   ======================================================== */

let pendingEmailForResend = "";

// ─── HELPERS ──────────────────────────────────────────────
function getLoginEmailInputValue() {
  return (document.getElementById("emailInput")?.value || "").trim();
}

function normalizeAuthErrorMessage(message) {
  return String(message || "").trim();
}

function setResendVisibility(show) {
  const resendWrap = document.getElementById("resendVerificationWrap");
  if (resendWrap) resendWrap.style.display = show ? "block" : "none";
}

async function findGuruByEmail(email) {
  const snap = await guruRef
    .orderByChild("email")
    .equalTo(email)
    .limitToFirst(1)
    .once("value");

  if (!snap.exists()) return null;

  let foundUid = null;
  let foundData = null;
  snap.forEach((child) => {
    foundUid = child.key;
    foundData = child.val();
  });
  if (!foundUid || !foundData) return null;
  return { uid: foundUid, data: foundData };
}

async function sendCustomVerificationEmail({ email, uid, token }) {
  if (!window.emailjs) {
    throw new Error(
      "EmailJS SDK belum dimuat. Tambahkan script EmailJS di halaman index.",
    );
  }

  if (!isEmailJsConfigured()) {
    throw new Error(
      "EmailJS belum dikonfigurasi. Isi publicKey, serviceId, dan templateId di js/firebase-init.js.",
    );
  }

  const cfg = getEmailJsConfig();
  const verifyUrl = buildVerifyUrl(uid, token);
  const expiresMinutes = Math.floor(VERIFY_TOKEN_TTL_MS / 60000);

  await window.emailjs.send(
    cfg.serviceId,
    cfg.templateId,
    {
      to_email: email,
      user_email: email,
      verify_link: verifyUrl,
      verification_link: verifyUrl,
      app_name: "Nilai Informatika",
      support_email: ADMIN_UTAMA_EMAIL,
      expires_minutes: expiresMinutes,
    },
    { publicKey: cfg.publicKey },
  );
}

async function issueVerificationToken(uid, email) {
  const token = generateVerificationToken();
  const tokenHash = await sha256Hex(token);
  const now = nowTs();

  await guruRef.child(uid).update({
    email,
    verifyTokenHash: tokenHash,
    verifyTokenExpiresAt: now + VERIFY_TOKEN_TTL_MS,
    verifyRequestedAt: now,
  });

  return token;
}

// ─── MODAL OPEN ───────────────────────────────────────────
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
  const pwd   = document.getElementById("passwordInput").value;

  if (!email || !pwd) {
    showLoginError("Email dan password harus diisi.");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, pwd)
    .then(async (result) => {
      const user = result.user;
      const uid = user.uid;
      const snap = await guruRef.child(uid).once("value");
      let guruData = snap.val();

      // Akun lama tanpa profile node → bootstrap profile
      if (!guruData) {
        const isAdmin = email === ADMIN_UTAMA_EMAIL;
        guruData = {
          email,
          uid,
          isVerified: isAdmin,
          emailVerified: isAdmin,
          createdAt: nowTs(),
          verifiedAt: isAdmin ? nowTs() : null,
          verifiedBy: isAdmin ? "auto" : null,
          emailVerifiedAt: isAdmin ? nowTs() : null,
          verifyTokenHash: null,
          verifyTokenExpiresAt: null,
          verifyRequestedAt: null,
        };
        await guruRef.child(uid).set(guruData);
      }

      // Sinkronisasi dengan status Firebase Auth untuk kompatibilitas akun lama
      if (user.emailVerified && !guruData.emailVerified) {
        await guruRef.child(uid).update({
          emailVerified: true,
          emailVerifiedAt: nowTs(),
          verifyTokenHash: null,
          verifyTokenExpiresAt: null,
        });
        guruData.emailVerified = true;
      }

      if (!guruData.emailVerified) {
        pendingEmailForResend = email;
        setResendVisibility(true);
        await auth.signOut();
        throw new Error(
          "Email Anda belum diverifikasi. Gunakan tombol kirim ulang verifikasi.",
        );
      }

      if (!guruData.isVerified) {
        setResendVisibility(false);
        await auth.signOut();
        throw new Error(
          "Akun Anda belum diverifikasi oleh admin utama. Silakan hubungi admin.",
        );
      }

      setResendVisibility(false);
      const modalEl = document.getElementById("loginModal");
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
      setTimeout(() => { window.location.href = "dashboard.html"; }, 300);
    })
    .catch((err) => showLoginError(normalizeAuthErrorMessage(err.message)));
}

// ─── REGISTER ────────────────────────────────────────────
function submitRegister() {
  const email = getLoginEmailInputValue();
  const pwd   = document.getElementById("passwordInput").value;

  if (!email || !pwd) {
    showLoginError("Email dan password harus diisi.");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, pwd)
    .then(async (result) => {
      const uid     = result.user.uid;
      const isAdmin = email === ADMIN_UTAMA_EMAIL;

      const baseProfile = {
        email,
        uid,
        isVerified: isAdmin,
        emailVerified: isAdmin,
        createdAt: nowTs(),
        verifiedAt: isAdmin ? nowTs() : null,
        verifiedBy: isAdmin ? "auto" : null,
        emailVerifiedAt: isAdmin ? nowTs() : null,
        verifyTokenHash: null,
        verifyTokenExpiresAt: null,
        verifyRequestedAt: null,
      };

      await guruRef.child(uid).set(baseProfile);

      if (!isAdmin) {
        const token = await issueVerificationToken(uid, email);
        await sendCustomVerificationEmail({ email, uid, token });
      }

      hideLoginError();
      setResendVisibility(false);
      const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      if (modal) modal.hide();

      if (isAdmin) {
        showAlert(
          "Register berhasil! Anda adalah Admin Utama dan langsung bisa mengakses dashboard.",
          "success",
        );
        setTimeout(() => { window.location.href = "dashboard.html"; }, 1200);
        return;
      }

      showAlert(
        "Register berhasil. Link verifikasi custom telah dikirim via EmailJS. Silakan verifikasi email Anda sebelum login.",
        "info",
      );
      await auth.signOut();
    })
    .catch((err) => showLoginError(normalizeAuthErrorMessage(err.message)));
}

// ─── RESEND VERIFICATION ────────────────────────────────
async function resendVerificationFromLogin() {
  try {
    const email = pendingEmailForResend || getLoginEmailInputValue();
    if (!email) {
      showLoginError("Masukkan email terlebih dahulu sebelum kirim ulang verifikasi.");
      return;
    }

    const found = await findGuruByEmail(email);
    if (!found) {
      showLoginError("Email tidak ditemukan di daftar guru.");
      return;
    }

    const { uid, data } = found;
    if (data.emailVerified) {
      setResendVisibility(false);
      showLoginError("Email ini sudah terverifikasi. Silakan login.", true);
      return;
    }

    const now = nowTs();
    const lastRequest = Number(data.verifyRequestedAt || 0);
    if (lastRequest && now - lastRequest < RESEND_VERIFICATION_COOLDOWN_MS) {
      const waitSec = Math.ceil(
        (RESEND_VERIFICATION_COOLDOWN_MS - (now - lastRequest)) / 1000,
      );
      showLoginError(
        `Tunggu ${waitSec} detik sebelum kirim ulang verifikasi.`,
      );
      return;
    }

    const token = await issueVerificationToken(uid, email);
    await sendCustomVerificationEmail({ email, uid, token });
    showLoginError(
      "Email verifikasi berhasil dikirim ulang. Silakan cek inbox/spam.",
      true,
    );
  } catch (err) {
    showLoginError(normalizeAuthErrorMessage(err.message));
  }
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
    setResendVisibility(false);
  } else {
    // Ganti ke mode register
    loginForm.setAttribute("data-mode", "register");
    loginForm.onsubmit = (e) => { e.preventDefault(); submitRegister(); };
    document.querySelector("#loginForm button[type=submit]").textContent = "Daftar Akun";
    if (registerLabel) registerLabel.textContent = "Sudah punya akun? Login";
    setResendVisibility(false);
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
      if (data && data.isVerified && data.emailVerified) {
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
