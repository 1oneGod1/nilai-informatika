/* ========================================================
   firebase-init.js
   Inisialisasi Firebase — dimuat di semua halaman.
   Sediakan: db, auth, siswaRef, guruRef, dan helper global.
   ======================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyCvzB1z9VCja-DEAzkSbE7m0d_lZMJ7KhE",
  authDomain: "nilai-informatika.firebaseapp.com",
  databaseURL:
    "https://nilai-informatika-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nilai-informatika",
  storageBucket: "nilai-informatika.firebasestorage.app",
  messagingSenderId: "4250294265",
  appId: "1:4250294265:web:37fc552fad026ca99e0f28",
  measurementId: "G-CZ507RS236",
};

firebase.initializeApp(firebaseConfig);

const db      = firebase.database();
const auth    = firebase.auth();
const siswaRef = db.ref("siswa");
const guruRef  = db.ref("guru");

// EmailJS config (isi dengan data dari dashboard EmailJS)
const EMAILJS_CONFIG = {
  publicKey: "YJQoP43cSX51foN43",
  serviceId: "service_xwae3kj",
  templateId: "template_knsm16l",
};

const VERIFY_TOKEN_TTL_MS = 30 * 60 * 1000;
const RESEND_VERIFICATION_COOLDOWN_MS = 60 * 1000;

// Admin utama
const ADMIN_UTAMA_EMAIL = "andi.purba@sdh.or.id";

// KKM per angkatan
const KKM_MAP = { 7: 67, 8: 68, 9: 69, 10: 75, 11: 76, 12: 77 };

// Ekstrak angka kelas → KKM
function getKKM(kelasStr) {
  const match = String(kelasStr || "").match(/\d+/);
  if (!match) return 0;
  return KKM_MAP[parseInt(match[0], 10)] || 0;
}

// Escape HTML (XSS-safe)
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Alert Bootstrap (dipakai di kedua halaman)
function showAlert(message, type = "success") {
  const area = document.getElementById("alertArea");
  if (!area) return;
  const id = "alert_" + Date.now();
  const icons = {
    success: "fa-check-circle",
    danger:  "fa-times-circle",
    warning: "fa-exclamation-triangle",
    info:    "fa-info-circle",
  };
  area.innerHTML = `
    <div id="${id}" class="alert alert-${type} alert-dismissible d-flex align-items-center gap-2" role="alert">
      <i class="fas ${icons[type] || "fa-info-circle"}"></i>
      <div>${message}</div>
      <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
    </div>`;
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.remove();
  }, 5000);
}

function nowTs() {
  return Date.now();
}

function isEmailJsConfigured() {
  return Boolean(
    EMAILJS_CONFIG.publicKey &&
      EMAILJS_CONFIG.serviceId &&
      EMAILJS_CONFIG.templateId,
  );
}

function getEmailJsConfig() {
  return { ...EMAILJS_CONFIG };
}

function generateVerificationToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(text) {
  const encoded = new TextEncoder().encode(String(text));
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function buildVerifyUrl(uid, token) {
  const url = new URL("verify.html", window.location.href);
  url.searchParams.set("uid", uid);
  url.searchParams.set("token", token);
  return url.toString();
}
