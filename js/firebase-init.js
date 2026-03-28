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

const ADMIN_EMAILS = [
  "andi.purba@sdh.or.id",
  "pandapotanandi@gmail.com",
];

const ADMIN_UTAMA_EMAIL = ADMIN_EMAILS[0];

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isAdminEmail(email) {
  const normalized = normalizeEmail(email);
  return ADMIN_EMAILS.some((adminEmail) => normalizeEmail(adminEmail) === normalized);
}

const KKM_MAP = { 7: 67, 8: 68, 9: 69, 10: 75, 11: 76, 12: 77 };

function getKKM(kelasStr) {
  const match = String(kelasStr || "").match(/\d+/);
  if (!match) return 0;
  return KKM_MAP[parseInt(match[0], 10)] || 0;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
