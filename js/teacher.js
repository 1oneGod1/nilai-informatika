/* ========================================================
   teacher.js
   Hanya dijalankan di dashboard.html.
   Mengelola data siswa, tabel nilai, dan Panel Admin.
   ======================================================== */

let allSiswa = [];
let activeQuarter = 3; // Default ke Q3 karena migrasi data kesana
let numFormatif = { 1: 2, 2: 2, 3: 2, 4: 2 }; // Default fields per quarter

function setQuarter(q) {
  activeQuarter = q;
  // Update Tabs UI
  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById("btnQ" + i);
    if (btn) btn.className = `quarter-tab px-6 py-2.5 rounded-xl text-sm font-bold transition-all w-full sm:w-auto ${i === activeQuarter ? 'active' : ''}`;
    if (btn) btn.innerHTML = `<i class="fas fa-cube mr-1 text-purple-400"></i> Quarter ${i}`;
  }
  // Sync input value
  const inputNum = document.getElementById("numFormatif");
  if (inputNum) inputNum.value = numFormatif[activeQuarter];

  renderFormFormatifInputs();
  renderTableHead();
  renderTableBody(allSiswa);
}

// ─── AUTHENTICATION CHECK ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html"; // Belum login → usir
      return;
    }

    // Cek status isVerified di Realtime Database
    guruRef.child(user.uid).once("value").then((snap) => {
      const data = snap.val();
      if (!data || !data.isVerified || !user.emailVerified) {
        auth.signOut().then(() => {
          alert("Akun belum memenuhi syarat verifikasi email/admin. Anda tidak bisa mengakses dashboard.");
          window.location.href = "index.html";
        });
        return;
      }

      // Lulus verifikasi
      const isAdminUtama = data.email === ADMIN_UTAMA_EMAIL;

      // Update UI Header
      const userNameEl = document.getElementById("userNameDisplay");
      if (userNameEl) userNameEl.textContent = data.email;
      const roleBadge = document.getElementById("roleBadge");
      if (roleBadge) {
        if (isAdminUtama) {
          roleBadge.innerHTML = `<i class="fas fa-shield-alt mr-1"></i>Super Admin`;
          roleBadge.className = "bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase hidden sm:flex items-center gap-1.5";
        } else {
          roleBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>Guru`;
        }
      }

      // Tampilkan Admin Panel jika Admin Utama
      if (isAdminUtama) {
        try { loadAdminPanel(data.email); } catch (e) { console.warn(e); }
      }

      // Mulai fitur Dashboard
      renderFormFormatifInputs();
      renderTableHead();
      listenToSiswaData();
    });
  });
});

// ─── SETTINGS FORMATIF ────────────────────────────────────
function applySettings() {
  const val = parseInt(document.getElementById("numFormatif").value, 10);
  if (isNaN(val) || val < 1 || val > 10) {
    showAlert("Jumlah formatif harus antara 1 dan 10.", "danger");
    return;
  }
  numFormatif[activeQuarter] = val;
  renderFormFormatifInputs();
  renderTableHead();
  renderTableBody(allSiswa);
  showAlert(`Pengaturan diterapkan: ${val} kolom Formatif untuk Quarter ${activeQuarter}.`, "success");
}

function renderFormFormatifInputs() {
  const grp = document.getElementById("formatifGroupAdd");
  if (!grp) return;
  grp.innerHTML = "";
  for (let i = 1; i <= numFormatif[activeQuarter]; i++) {
    grp.innerHTML += `
      <div class="col-span-1 border border-slate-700/50 rounded-lg bg-slate-800/20 p-2">
        <label class="block text-[10px] text-slate-400 font-mono-tech uppercase mb-1 text-center">Q${activeQuarter} - F${i}</label>
        <input type="number" id="formatif${i}" placeholder="0-100" min="0" max="100"
          class="w-full bg-slate-900/60 border border-slate-700 rounded-md px-2 py-1.5 text-xs text-center text-white font-mono-tech focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
      </div>`;
  }
}

// ─── REALTIME LISTENER SISWA ──────────────────────────────
function listenToSiswaData() {
  siswaRef.on("value", (snap) => {
    allSiswa = [];
    const data = snap.val();
    let madeChanges = false;
    let updates = {};

    if (data) {
      Object.entries(data).forEach(([id, val]) => {
        // Cek migrasi data lama ke Q3
        let needsMigration = false;
        for (let i = 1; i <= 10; i++) {
          if (val['formatif' + i] !== undefined) {
            updates[`${id}/q3_f${i}`] = val['formatif' + i];
            updates[`${id}/formatif${i}`] = null;
            needsMigration = true;
          }
        }
        if (val['sumatif'] !== undefined) {
          updates[`${id}/q3_sumatif`] = val['sumatif'];
          updates[`${id}/sumatif`] = null;
          needsMigration = true;
        }

        if (needsMigration) {
            madeChanges = true;
        } else {
            allSiswa.push({ id, ...val }); // Hanya simpan ke array local kalau gak sedang dimigrasi
        }
      });

      if (madeChanges) {
          siswaRef.update(updates).then(() => {
              console.log("Auto-migrasi data lama ke Quarter 3 berhasil.");
          });
      } else {
          allSiswa.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
      }
    }
    renderTableBody(allSiswa);
  }, (err) => {
    showAlert("Gagal memuat data Firebase: " + err.message, "danger");
  });
}

// ─── ADD SISWA ────────────────────────────────────────────
function addSiswa(event) {
  event.preventDefault();
  const nis = document.getElementById("nis").value.trim();
  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();
  const pwd = document.getElementById("siswaPassword").value.trim();
  const sumatif = document.getElementById("sumatif").value.trim();

  if (!nis || !nama || !kelas || !pwd) {
    showAlert("NIS, Nama Siswa, Kelas, dan Password wajib diisi.", "warning");
    return;
  }

  const record = {
    nis, nama, kelas, password: pwd,
    createdAt: Date.now(),
  };

  record[`q${activeQuarter}_sumatif`] = sumatif !== "" ? Number(sumatif) : "";

  for (let i = 1; i <= numFormatif[activeQuarter]; i++) {
    const el = document.getElementById("formatif" + i);
    const v = el ? el.value.trim() : "";
    record[`q${activeQuarter}_f${i}`] = v !== "" ? Number(v) : "";
  }

  siswaRef.push(record)
    .then(() => {
      showAlert(`Siswa <strong>${escHtml(nama)}</strong> berhasil ditambahkan.`, "success");
      document.getElementById("addForm").reset();
    })
    .catch((err) => showAlert("Gagal menyimpan: " + err.message, "danger"));
}

// ─── EDIT & DELETE SISWA ──────────────────────────────────
function saveSiswaRow(id) {
  const siswa = allSiswa.find((s) => s.id === id);
  if (!siswa) return;

  const rowNisEl = document.getElementById("r-nis-" + id);
  const rowPwdEl = document.getElementById("r-pwd-" + id);
  const sumatifEl = document.getElementById("r-s-" + id);

  const updated = {
    nama: siswa.nama,
    kelas: siswa.kelas,
    password: rowPwdEl ? rowPwdEl.value.trim() : siswa.password, // Updates from table
    nis: rowNisEl ? rowNisEl.value.trim() : siswa.nis,
    updatedAt: Date.now(),
  };

  updated[`q${activeQuarter}_sumatif`] = sumatifEl && sumatifEl.value.trim() !== "" ? Number(sumatifEl.value.trim()) : "";

  for (let i = 1; i <= numFormatif[activeQuarter]; i++) {
    const el = document.getElementById("r-f" + i + "-" + id);
    const v = el ? el.value.trim() : "";
    updated[`q${activeQuarter}_f${i}`] = v !== "" ? Number(v) : "";
  }

  siswaRef.child(id).update(updated)
    .then(() => showAlert(`Data <strong>${escHtml(siswa.nama)}</strong> berhasil diperbarui.`, "success"))
    .catch((err) => showAlert("Gagal menyimpan: " + err.message, "danger"));
}

function deleteSiswa(id, nama) {
  if (!confirm(`Hapus data siswa "${nama}"? Semua datanya akan hilang total.`)) return;
  siswaRef.child(id).remove()
    .then(() => showAlert(`Siswa <strong>${escHtml(nama)}</strong> dihapus.`, "success"))
    .catch((err) => showAlert("Gagal menghapus: " + err.message, "danger"));
}

// ─── RENDER TABLE BODY (CRUD) ─────────────────────────────
const TH_CYAN = "px-4 py-4 text-center text-cyan-500/80 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap";
const TH_INDIGO = "px-4 py-4 text-center text-indigo-400/80 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap";
const TH = "px-4 py-4 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap";
const TH_LEFT = "px-4 py-4 text-left text-slate-400 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap";

function renderTableHead() {
  let fCols = "";
  for (let i = 1; i <= numFormatif[activeQuarter]; i++) fCols += `<th class="${TH_CYAN}">Q${activeQuarter} - F${i}</th>`;

  const thead = document.getElementById("tableHead");
  if (!thead) return;
  thead.innerHTML = `
    <tr>
      <th class="${TH}" style="width:40px">No</th>
      <th class="${TH_LEFT}" style="width:120px">NIS</th>
      <th class="${TH_LEFT}">Nama Siswa</th>
      <th class="${TH}">Kelas</th>
      <th class="${TH}">Password / Akun</th>
      ${fCols}
      <th class="${TH_INDIGO}">Sumatif Q${activeQuarter}</th>
      <th class="${TH}">Status (Q${activeQuarter})</th>
      <th class="${TH}" style="width:100px">Aksi</th>
    </tr>`;
}

function highlightScore(el, kkm) {
  const v = el.value.trim();
  el.className = v !== "" && Number(v) < kkm ? "table-input input-remedial" : "table-input";
}

function filterTable() { renderTableBody(allSiswa); }

function renderTableBody(data) {
  const tbody = document.getElementById("tableBody");
  if (!tbody) return;

  // Filter Kelas Dropdown
  const selFilter = document.getElementById("filterKelas");
