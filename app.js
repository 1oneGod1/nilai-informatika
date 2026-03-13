/* =====================================================
   Nilai Informatika
   Firebase Realtime Database  CRUD Implementation
   ===================================================== */

// 
// 1. FIREBASE CONFIGURATION
//    Ganti dengan config Firebase Anda
// 
const firebaseConfig = {
  apiKey: "AIzaSyCvzB1z9VCja-DEAzkSbE7m0d_lZMJ7KhE",
  authDomain: "nilai-informatika.firebaseapp.com",
  databaseURL: "https://nilai-informatika-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nilai-informatika",
  storageBucket: "nilai-informatika.firebasestorage.app",
  messagingSenderId: "4250294265",
  appId: "1:4250294265:web:37fc552fad026ca99e0f28",
  measurementId: "G-CZ507RS236",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
const siswaRef = db.ref("siswa");

// 
// 2. GLOBAL STATE
// 
let numFormatif = 2;
let allSiswa    = [];
let isTeacherLoggedIn = false;

// KKM per kelas (numeric key)
const KKM_MAP = { 7:67, 8:68, 9:69, 10:75, 11:76, 12:77 };

// 
// Utility: extract numeric grade from kelas string
// "10 RPL 1"  10,  "7A"  7,  "12"  12
// 
function getKKM(kelasStr) {
  const match = String(kelasStr).match(/\d+/);
  if (!match) return 0;
  const grade = parseInt(match[0], 10);
  return KKM_MAP[grade] || 0;
}

// 
// 3. PAGE LOAD
// 
document.addEventListener("DOMContentLoaded", () => {
  renderFormFormatifInputs();
  renderTableHead();
  listenToData();
  bindAuthState();
});

// 
// VIEW SWITCHING
// 
function showStudentView() {
  document.getElementById("studentView").style.display   = "";
  document.getElementById("teacherView").style.display   = "none";
  document.getElementById("navbarStudent").style.display = "";
  document.getElementById("navbarTeacher").style.display = "none";
  setTimeout(() => lucide.createIcons(), 50);
}

function showTeacherView() {
  document.getElementById("studentView").style.display   = "none";
  document.getElementById("teacherView").style.display   = "";
  document.getElementById("navbarStudent").style.display = "none";
  document.getElementById("navbarTeacher").style.display = "";
  setTimeout(() => lucide.createIcons(), 50);
}

// 
// LOGIN GURU
// 
function openLoginModal() {
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  hideLoginError();
  new bootstrap.Modal(document.getElementById("loginModal")).show();
}

function submitLogin(event) {
  event.preventDefault();
  const email = document.getElementById("emailInput").value.trim();
  const pwd = document.getElementById("passwordInput").value;

  auth.signInWithEmailAndPassword(email, pwd)
    .then(() => {
      hideLoginError();
      const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      if (modal) modal.hide();
      showAlert("Login berhasil. Selamat datang di dashboard guru.", "success");
    })
    .catch(err => showLoginError(err.message));
}

function submitRegister() {
  const email = document.getElementById("emailInput").value.trim();
  const pwd = document.getElementById("passwordInput").value;

  auth.createUserWithEmailAndPassword(email, pwd)
    .then(() => {
      hideLoginError();
      const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      if (modal) modal.hide();
      showAlert("Register berhasil. Akun guru siap digunakan.", "success");
    })
    .catch(err => showLoginError(err.message));
}

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

function logoutGuru() {
  auth.signOut()
    .then(() => showAlert("Anda telah keluar dari mode guru.", "info"))
    .catch(err => showAlert("Gagal logout: " + err.message, "danger"));
}

function bindAuthState() {
  auth.onAuthStateChanged(user => {
    isTeacherLoggedIn = !!user;
    if (isTeacherLoggedIn) {
      showTeacherView();
    } else {
      showStudentView();
    }
  });
}

function showLoginError(message) {
  const map = {
    "auth/invalid-email": "Format email tidak valid.",
    "auth/missing-password": "Kata sandi wajib diisi.",
    "auth/invalid-credential": "Email atau kata sandi salah.",
    "auth/wrong-password": "Email atau kata sandi salah.",
    "auth/user-not-found": "Akun belum terdaftar. Silakan register dulu.",
    "auth/email-already-in-use": "Email sudah terdaftar. Silakan login.",
    "auth/weak-password": "Password terlalu lemah (minimal 6 karakter)."
  };
  const code = String(message || "").match(/auth\/[a-z-]+/)?.[0];
  const text = map[code] || "Autentikasi gagal. Periksa email dan kata sandi Anda.";
  const errWrap = document.getElementById("loginError");
  const errText = document.getElementById("loginErrorText");
  if (errText) errText.textContent = text;
  if (errWrap) errWrap.style.display = "block";
}

function hideLoginError() {
  const errWrap = document.getElementById("loginError");
  if (errWrap) errWrap.style.display = "none";
}

// 
// 4. SETTINGS  formatif columns
// 
function applySettings() {
  const val = parseInt(document.getElementById("numFormatif").value, 10);
  if (isNaN(val) || val < 1 || val > 10) {
    showAlert("Jumlah formatif harus antara 1 dan 10.", "danger");
    return;
  }
  numFormatif = val;
  renderFormFormatifInputs();
  renderTableHead();
  renderTableBody(allSiswa);
  showAlert("Pengaturan diterapkan: " + numFormatif + " kolom Formatif.", "success");
}

// 
// 5. RENDER ADD-FORM FORMATIF INPUTS
// 
function renderFormFormatifInputs() {
  const grp = document.getElementById("formatifGroupAdd");
  if (!grp) return;
  grp.innerHTML = "";
  for (let i = 1; i <= numFormatif; i++) {
    grp.innerHTML += `
      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-slate-600">Formatif ${i}</label>
        <input type="number" id="formatif${i}"
          placeholder="0-100" min="0" max="100"
          class="w-full sm:w-24 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" />
      </div>`;
  }
}

// 
// 6. RENDER TABLE HEAD
// 
const TH = 'px-4 py-3 font-semibold text-center text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap';
const TH_LEFT = 'px-4 py-3 font-semibold text-left text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap';
function renderTableHead() {
  let fCols = "";
  for (let i = 1; i <= numFormatif; i++) {
    fCols += `<th class="${TH}">Formatif ${i}</th>`;
  }
  const thead = document.getElementById("tableHead");
  if (!thead) return;
  thead.innerHTML = `
    <tr>
      <th class="${TH}" style="width:48px">No</th>
      <th class="${TH_LEFT}">Nama Siswa</th>
      <th class="${TH}">Kelas</th>
      ${fCols}
      <th class="${TH}">Sumatif</th>
      <th class="${TH}">Status</th>
      <th class="${TH}" style="width:100px">Aksi</th>
    </tr>`;
}

// 
// 7. STATUS CALC
// 
function calcStatus(kelasStr, formatifArr, sumatif) {
  const kkm = getKKM(kelasStr);
  const hasEmpty = formatifArr.some(v => v === "" || v === null || v === undefined);
  if (hasEmpty) return "Susulan";
  if (formatifArr.some(v => Number(v) < kkm)) return "Remedial";
  if (sumatif === "" || sumatif === null || sumatif === undefined) return "Susulan";
  if (Number(sumatif) < kkm) return "Remedial";
  return "Tuntas";
}

function buildFormatifArray(s) {
  const arr = [];
  for (let i = 1; i <= numFormatif; i++) {
    arr.push(s["formatif" + i] !== undefined ? s["formatif" + i] : "");
  }
  return arr;
}

// 
// 8. RENDER TABLE BODY (inline editing)
// 
function renderTableBody(data) {
  const tbody = document.getElementById("tableBody");
  if (!tbody) return;

  // Populate kelas filter
  populateFilterKelas(data);

  if (!data || data.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="20">
        <div class="flex flex-col items-center py-12 gap-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"/></svg>
          <p class="text-sm">Belum ada data. Silakan tambahkan siswa baru.</p>
        </div>
      </td></tr>`;
    const shownEl = document.getElementById("shownCount");
    const totalEl = document.getElementById("totalCount");
    if (shownEl) shownEl.textContent = 0;
    if (totalEl) totalEl.textContent = 0;
    return;
  }

  const searchVal   = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const filterKelas = document.getElementById("filterKelas")?.value || "";

  let filtered = data.filter(s => {
    const matchName  = s.nama.toLowerCase().includes(searchVal);
    const matchKelas = filterKelas ? s.kelas === filterKelas : true;
    return matchName && matchKelas;
  });

  const shownEl = document.getElementById("shownCount");
  const totalEl = document.getElementById("totalCount");
  if (shownEl) shownEl.textContent = filtered.length;
  if (totalEl) totalEl.textContent = allSiswa.length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="20" class="text-center py-10">
      <div class="flex flex-col items-center gap-2 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4.35-4.35m0 0A7 7 0 1 0 4.65 16.65 7 7 0 0 0 16.65 16.65z"/></svg>
        <span class="text-sm">Tidak ada data yang sesuai filter.</span>
      </div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((s, idx) => {
    const kkm = getKKM(s.kelas);
    const formatifArr = buildFormatifArray(s);
    const status = calcStatus(s.kelas, formatifArr, s.sumatif);

    let fInputs = "";
    for (let i = 0; i < numFormatif; i++) {
      const val = formatifArr[i];
      const num = (val !== "" && val !== null && val !== undefined) ? Number(val) : "";
      const cls = (num !== "" && num < kkm) ? SCORE_BAD : SCORE_OK;
      fInputs += `
        <td class="px-3 py-2 text-center">
          <input type="number" min="0" max="100"
            class="${cls}" id="r-f${i+1}-${s.id}"
            value="${num}" placeholder="-"
            oninput="highlightScore(this,${kkm})" />
        </td>`;
    }

    const sumatifVal = (s.sumatif !== "" && s.sumatif !== null && s.sumatif !== undefined) ? Number(s.sumatif) : "";
    const sCls = (sumatifVal !== "" && sumatifVal < kkm) ? SCORE_BAD : SCORE_OK;
    const sumatifInput = `
      <td class="px-3 py-2 text-center">
        <input type="number" min="0" max="100"
          class="${sCls}" id="r-s-${s.id}"
          value="${sumatifVal}" placeholder="-"
          oninput="highlightScore(this,${kkm})" />
      </td>`;

    let dotColor, chipCls, chipLabel;
    if (status === "Tuntas") {
      dotColor = 'bg-emerald-500'; chipLabel = 'Tuntas';
      chipCls = 'inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-medium';
    } else if (status === "Remedial") {
      dotColor = 'bg-rose-500'; chipLabel = 'Remedial';
      chipCls = 'inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-xs font-medium';
    } else {
      dotColor = 'bg-amber-500'; chipLabel = 'Susulan';
      chipCls = 'inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-medium';
    }
    const statusChip = `<span class="${chipCls}"><span class="w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0"></span>${chipLabel}</span>`;

    const saveSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    const delSvg  = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/></svg>`;

    return `
      <tr id="row-${s.id}" class="border-t border-slate-100 hover:bg-slate-50/80 transition-colors">
        <td class="px-4 py-3 text-center text-slate-400 text-sm font-medium">${idx + 1}</td>
        <td class="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">${escHtml(s.nama)}</td>
        <td class="px-4 py-3 text-center">
          <span class="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-semibold border border-slate-200">${escHtml(s.kelas)}</span>
        </td>
        ${fInputs}
        ${sumatifInput}
        <td class="px-4 py-3 text-center">${statusChip}</td>
        <td class="px-4 py-3">
          <div class="flex gap-1.5 justify-center">
            <button title="Simpan" onclick="saveSiswaRow('${s.id}')"
              class="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors">
              ${saveSvg}
            </button>
            <button title="Hapus" onclick="deleteSiswa('${s.id}','${escHtml(s.nama)}')"
              class="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors">
              ${delSvg}
            </button>
          </div>
        </td>
      </tr>`;
  }).join("");
}

// Score input Tailwind classes (shared by renderTableBody and highlightScore)
const SCORE_BASE = 'w-16 text-center text-sm py-1.5 border rounded-md focus:outline-none focus:ring-1 transition-colors';
const SCORE_OK   = SCORE_BASE + ' border-slate-200 focus:border-indigo-500 focus:ring-indigo-500';
const SCORE_BAD  = SCORE_BASE + ' border-rose-300 bg-rose-50 text-rose-700 font-semibold focus:border-rose-500 focus:ring-rose-500';
function highlightScore(el, kkm) {
  const v = el.value.trim();
  el.className = (v !== "" && Number(v) < kkm) ? SCORE_BAD : SCORE_OK;
}

// 
// 9. POPULATE KELAS FILTER
// 
function populateFilterKelas(data) {
  const sel = document.getElementById("filterKelas");
  if (!sel) return;
  const current = sel.value;
  const kelasList = [...new Set((data || []).map(s => s.kelas))].sort((a,b) => {
    const na = parseInt(a.match(/\d+/)?.[0] || 0);
    const nb = parseInt(b.match(/\d+/)?.[0] || 0);
    return na !== nb ? na - nb : a.localeCompare(b);
  });
  sel.innerHTML = `<option value=""> Semua Kelas</option>` +
    kelasList.map(k => `<option value="${escHtml(k)}"${k===current?" selected":""}>${escHtml(k)}</option>`).join("");
}

// 
// 10. FIREBASE: REAL-TIME LISTENER
// 
function listenToData() {
  siswaRef.on("value", snap => {
    allSiswa = [];
    const data = snap.val();
    if (data) {
      Object.entries(data).forEach(([id, val]) => allSiswa.push({ id, ...val }));
      allSiswa.sort((a,b) => a.nama.localeCompare(b.nama, "id"));
    }
    renderTableBody(allSiswa);
  }, err => {
    showAlert("Gagal memuat data Firebase. Periksa konfigurasi. Error: " + err.message, "danger");
    const tbody = document.getElementById("tableBody");
    if (tbody) tbody.innerHTML = `<tr><td colspan="20" class="text-center text-danger py-4">
      Gagal terhubung ke Firebase.</td></tr>`;
  });
}

// 
// 11. CREATE  Add student
// 
function addSiswa(event) {
  event.preventDefault();
  const nama  = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();
  const sumatif = document.getElementById("sumatif").value.trim();

  if (!nama || !kelas) {
    showAlert("Nama Siswa dan Kelas wajib diisi.", "warning");
    return;
  }

  const record = { nama, kelas, sumatif: sumatif !== "" ? Number(sumatif) : "", createdAt: Date.now() };
  for (let i = 1; i <= numFormatif; i++) {
    const el = document.getElementById("formatif" + i);
    const v = el ? el.value.trim() : "";
    record["formatif" + i] = v !== "" ? Number(v) : "";
  }

  siswaRef.push(record)
    .then(() => {
      showAlert("Siswa <strong>" + escHtml(nama) + "</strong> berhasil ditambahkan.", "success");
      document.getElementById("addForm").reset();
    })
    .catch(err => showAlert("Gagal menyimpan: " + err.message, "danger"));
}

// 
// 12. UPDATE  Save inline row
// 
function saveSiswaRow(id) {
  const siswa = allSiswa.find(s => s.id === id);
  if (!siswa) return;

  const updated = {
    nama:   siswa.nama,
    kelas:  siswa.kelas,
    sumatif: "",
    updatedAt: Date.now(),
    createdAt: siswa.createdAt || Date.now(),
  };

  const sumatifEl = document.getElementById("r-s-" + id);
  if (sumatifEl) {
    const v = sumatifEl.value.trim();
    updated.sumatif = v !== "" ? Number(v) : "";
  }

  for (let i = 1; i <= numFormatif; i++) {
    const el = document.getElementById("r-f" + i + "-" + id);
    const v = el ? el.value.trim() : "";
    updated["formatif" + i] = v !== "" ? Number(v) : "";
  }

  siswaRef.child(id).set(updated)
    .then(() => showAlert("Nilai <strong>" + escHtml(siswa.nama) + "</strong> berhasil disimpan.", "success"))
    .catch(err => showAlert("Gagal menyimpan: " + err.message, "danger"));
}

// 
// 13. DELETE  Remove student
// 
function deleteSiswa(id, nama) {
  if (!confirm("Hapus data siswa \"" + nama + "\"? Tindakan ini tidak dapat dibatalkan.")) return;
  siswaRef.child(id).remove()
    .then(() => showAlert("Data <strong>" + escHtml(nama) + "</strong> berhasil dihapus.", "success"))
    .catch(err => showAlert("Gagal menghapus: " + err.message, "danger"));
}

// 
// 14. FILTER TABLE
// 
function filterTable() {
  renderTableBody(allSiswa);
}

// 
// 15. STUDENT SEARCH (siswa view)
// 
function searchStudent() {
  const query = (document.getElementById("studentSearchInput")?.value || "").trim().toLowerCase();
  const placeholder = document.getElementById("searchPlaceholder");
  const results     = document.getElementById("searchResults");
  const detail      = document.getElementById("studentDetail");

  detail.style.display = "none";
  detail.innerHTML = "";

  if (!query) {
    results.style.display = "none";
    placeholder.style.display = "";
    return;
  }

  const found = allSiswa.filter(s => s.nama.toLowerCase().includes(query));
  placeholder.style.display = "none";
  results.style.display = "";

  if (found.length === 0) {
    results.innerHTML = `
      <div class="text-center text-muted py-3">
        <i class="bi bi-search" style="font-size:2rem"></i>
        <p class="mt-2 mb-0">Siswa \"<strong>${escHtml(query)}</strong>\" tidak ditemukan.</p>
        <p class="small">Coba periksa ejaan nama Anda.</p>
      </div>`;
    return;
  }

  results.innerHTML = found.map(s => {
    const initial = s.nama.charAt(0).toUpperCase();
    return `
      <div class="search-result-item" onclick="showStudentDetail('${s.id}')">
        <div class="result-avatar">${initial}</div>
        <div>
          <div class="fw-semibold">${escHtml(s.nama)}</div>
          <div class="text-muted small">Kelas ${escHtml(s.kelas)} &nbsp;&nbsp; KKM ${getKKM(s.kelas) || "-"}</div>
        </div>
        <i class="bi bi-chevron-right ms-auto text-muted"></i>
      </div>`;
  }).join("");
}

function showStudentDetail(id) {
  const s = allSiswa.find(x => x.id === id);
  if (!s) return;
  const kkm = getKKM(s.kelas);
  const formatifArr = buildFormatifArray(s);
  const status = calcStatus(s.kelas, formatifArr, s.sumatif);

  // Build grade tiles
  let tiles = "";
  const totalTiles = numFormatif + 1;
  // Always use grid-cols-3 for ≤3 tiles so they stay on one row; for more use 2+auto
  const gridCols = totalTiles <= 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4";
  for (let i = 0; i < numFormatif; i++) {
    const val = formatifArr[i];
    let colorClass, displayVal;
    if (val === "" || val === null || val === undefined) {
      colorClass = "tile-empty"; displayVal = "-";
    } else {
      const num = Number(val);
      colorClass = num < kkm ? "tile-bad" : "tile-ok";
      displayVal = num;
    }
    tiles += `<div class="bg-white py-3 px-2 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
      <span class="text-[9px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide text-center leading-tight">Formatif ${i+1}</span>
      <span class="text-2xl sm:text-3xl font-bold ${colorClass}">${displayVal}</span>
    </div>`;
  }
  // Sumatif tile
  let sColorClass, sDisplayVal;
  if (s.sumatif === "" || s.sumatif === null || s.sumatif === undefined) {
    sColorClass = "tile-empty"; sDisplayVal = "-";
  } else {
    const num = Number(s.sumatif);
    sColorClass = num < kkm ? "tile-bad" : "tile-ok";
    sDisplayVal = num;
  }
  tiles += `<div class="bg-white py-3 px-2 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
    <span class="text-[9px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide text-center leading-tight">Sumatif</span>
    <span class="text-2xl sm:text-3xl font-bold ${sColorClass}">${sDisplayVal}</span>
  </div>`;

  // Build notification block for non-tuntas
  let notifHtml = "";
  if (status !== "Tuntas") {
    const needItems = [];
    for (let i = 0; i < numFormatif; i++) {
      const val = formatifArr[i];
      if (val === "" || val === null || val === undefined) {
        needItems.push(`Formatif ${i+1} (belum dilakukan)`);
      } else if (Number(val) < kkm) {
        needItems.push(`Formatif ${i+1} (${Number(val)})`);
      }
    }
    if (s.sumatif === "" || s.sumatif === null || s.sumatif === undefined) {
      needItems.push("Sumatif (belum dilakukan)");
    } else if (Number(s.sumatif) < kkm) {
      needItems.push(`Sumatif (${Number(s.sumatif)})`);
    }

    const actions = [];
    const hasEmpty = needItems.some(x => x.includes("belum dilakukan"));
    const hasBelowKKM = needItems.some(x => !x.includes("belum dilakukan"));
    if (hasEmpty)     actions.push("Mengikuti evaluasi yang belum dilakukan");
    if (hasBelowKKM)  actions.push("Perbaikan nilai yang di bawah KKM");

    notifHtml = `
      <div class="mt-3 rounded-xl sm:rounded-2xl border border-red-200 bg-red-50 p-3 sm:p-4">
        <div class="flex items-start gap-2.5 mb-3">
          <span class="text-lg mt-0.5">⚠️</span>
          <div>
            <div class="font-bold text-red-800 text-sm sm:text-base">Pemberitahuan Perlu Tindakan</div>
            <div class="font-semibold text-red-700 text-xs sm:text-sm">KKM untuk kelas Anda: ${kkm}</div>
          </div>
        </div>
        <div class="bg-white rounded-lg sm:rounded-xl border border-red-100 p-2.5 sm:p-3 mb-2.5">
          <div class="font-semibold text-red-800 mb-1.5 text-xs sm:text-sm">Evaluasi yang perlu ditindaklanjuti:</div>
          <ul class="list-disc list-inside space-y-1">
            ${needItems.map(x => `<li class="text-xs sm:text-sm text-red-700">${x}</li>`).join("")}
          </ul>
        </div>
        <div class="bg-red-100 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
          <div class="font-semibold text-red-800 text-xs sm:text-sm mb-1">📢 Silakan temui guru mata pelajaran Informatika untuk:</div>
          ${actions.map(a => `<div class="text-xs sm:text-sm text-red-700">&bull; ${a}</div>`).join("")}
        </div>
      </div>`;
  } else {
    notifHtml = `
      <div class="mt-4 flex justify-center">
        <div class="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Semua Nilai Tuntas
        </div>
      </div>`;
  }

  const detail = document.getElementById("studentDetail");
  detail.innerHTML = `
    <div>
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1 min-w-0 pr-2">
          <h2 class="text-base sm:text-lg font-bold font-poppins text-slate-800 leading-snug mb-2 break-words">${escHtml(s.nama)}</h2>
          <div class="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500">
            <span class="flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              Kelas ${escHtml(s.kelas)}
            </span>
            <span class="flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              KKM: ${kkm}
            </span>
          </div>
        </div>
        <button onclick="closeStudentDetail()" class="flex-shrink-0 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="grid ${gridCols} gap-2 sm:gap-3 mb-4">${tiles}</div>
      ${notifHtml}
    </div>`;
  detail.style.display = "";
  document.getElementById("searchResults").style.display = "none";
}

function closeStudentDetail() {
  document.getElementById("studentDetail").style.display = "none";
  document.getElementById("searchResults").style.display = "";
}

// 
// 16. EXPORT TO EXCEL
// 
function exportExcel() {
  if (allSiswa.length === 0) {
    showAlert("Tidak ada data untuk diekspor.", "warning");
    return;
  }

  const headers = ["No", "Nama Siswa", "Kelas"];
  for (let i = 1; i <= numFormatif; i++) headers.push("Formatif " + i);
  headers.push("Sumatif", "Status", "KKM");

  const rows = allSiswa.map((s, idx) => {
    const formatifArr = buildFormatifArray(s);
    const status = calcStatus(s.kelas, formatifArr, s.sumatif);
    const row = [idx + 1, s.nama, s.kelas];
    for (let i = 0; i < numFormatif; i++) {
      const v = formatifArr[i];
      row.push((v !== "" && v !== null && v !== undefined) ? Number(v) : "");
    }
    row.push((s.sumatif !== "" && s.sumatif !== null) ? Number(s.sumatif) : "");
    row.push(status);
    row.push(getKKM(s.kelas));
    return row;
  });

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  // Column widths
  ws["!cols"] = [
    {wch:5},{wch:28},{wch:14},
    ...Array(numFormatif).fill({wch:12}),
    {wch:10},{wch:12},{wch:6}
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Nilai Siswa");
  XLSX.writeFile(wb, "NilaiSiswa_" + new Date().toISOString().slice(0,10) + ".xlsx");
  showAlert("Export Excel berhasil diunduh.", "success");
}

// 
// 17. DOWNLOAD TEMPLATE
// 
function downloadTemplate() {
  const headers = ["Nama Siswa", "Kelas"];
  for (let i = 1; i <= numFormatif; i++) headers.push("Formatif " + i);
  headers.push("Sumatif");

  const example = ["Contoh Nama Siswa", "10 RPL 1"];
  for (let i = 0; i < numFormatif; i++) example.push(85);
  example.push(90);

  const ws = XLSX.utils.aoa_to_sheet([headers, example]);
  ws["!cols"] = [
    {wch:28},{wch:14},
    ...Array(numFormatif).fill({wch:12}),
    {wch:10}
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, "Template_Import_Siswa.xlsx");
  showAlert("Template Excel berhasil diunduh.", "success");
}

// 
// 18. IMPORT FROM EXCEL
// 
function importExcel() {
  const fileInput = document.getElementById("importFile");
  const file = fileInput?.files?.[0];
  if (!file) {
    showAlert("Pilih file Excel terlebih dahulu.", "warning");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data  = new Uint8Array(e.target.result);
      const wb    = XLSX.read(data, { type: "array" });
      const ws    = wb.Sheets[wb.SheetNames[0]];
      const rows  = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

      if (rows.length < 2) {
        showAlert("File kosong atau tidak ada data.", "warning");
        return;
      }

      const header = rows[0].map(h => String(h).trim().toLowerCase());
      // Detect column indices
      const iNama  = header.findIndex(h => h.includes("nama"));
      const iKelas = header.findIndex(h => h.includes("kelas"));
      const iSumat = header.findIndex(h => h.includes("sumatif"));
      const iFmt   = [];
      for (let i = 1; i <= 10; i++) {
        const idx = header.findIndex(h => h.includes("formatif " + i) || h.includes("formatif" + i) || h === "f" + i);
        iFmt.push(idx);
      }

      if (iNama === -1 || iKelas === -1) {
        showAlert("Header file tidak sesuai. Pastikan ada kolom Nama Siswa dan Kelas.", "danger");
        return;
      }

      let count = 0;
      const dataRows = rows.slice(1).filter(r => r.some(c => c !== ""));
      const batch = {};

      dataRows.forEach(r => {
        const nama  = String(r[iNama] || "").trim();
        const kelas = String(r[iKelas] || "").trim();
        if (!nama || !kelas) return;

        const key = siswaRef.push().key;
        const record = {
          nama,
          kelas,
          sumatif: iSumat >= 0 && r[iSumat] !== "" ? Number(r[iSumat]) : "",
          createdAt: Date.now(),
        };
        iFmt.forEach((colIdx, arrIdx) => {
          const v = colIdx >= 0 ? r[colIdx] : "";
          record["formatif" + (arrIdx + 1)] = (v !== "" && v !== null && v !== undefined) ? Number(v) : "";
        });
        batch[key] = record;
        count++;
      });

      if (count === 0) {
        showAlert("Tidak ada baris data valid ditemukan.", "warning");
        return;
      }

      db.ref("siswa").update(batch)
        .then(() => {
          showAlert(`Import berhasil! ${count} data siswa ditambahkan.`, "success");
          fileInput.value = "";
        })
        .catch(err => showAlert("Gagal import: " + err.message, "danger"));

    } catch(err) {
      showAlert("Gagal membaca file: " + err.message, "danger");
    }
  };
  reader.readAsArrayBuffer(file);
}

// 
// 19. ALERT UTILITY
// 
function showAlert(message, type = "success") {
  const area = document.getElementById("alertArea");
  if (!area) return;
  const id = "alert_" + Date.now();
  const icons = { success:"bi-check-circle-fill", danger:"bi-x-octagon-fill", warning:"bi-exclamation-triangle-fill", info:"bi-info-circle-fill" };
  area.innerHTML = `
    <div id="${id}" class="alert alert-${type} alert-dismissible d-flex align-items-center gap-2" role="alert">
      <i class="bi ${icons[type]||"bi-info-circle-fill"}"></i>
      <div>${message}</div>
      <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
    </div>`;
  setTimeout(() => { const el = document.getElementById(id); if (el) el.remove(); }, 5000);
}

// 
// 20. HTML ESCAPE
// 
function escHtml(str) {
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}