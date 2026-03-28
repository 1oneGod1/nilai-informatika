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
      if (!data || !data.isVerified || !data.emailVerified) {
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
  const currentKelas = selFilter?.value || "";
  if (selFilter) {
    const listKelas = [...new Set((data || []).map((s) => s.kelas))].sort((a,b) => {
      const na = parseInt(a.match(/\d+/)?.[0]||0);
      const nb = parseInt(b.match(/\d+/)?.[0]||0);
      return na !== nb ? na - nb : a.localeCompare(b);
    });
    selFilter.innerHTML = `<option value="">Semua Kelas</option>` + 
      listKelas.map(k => `<option value="${escHtml(k)}"${k===currentKelas?' selected':''}>${escHtml(k)}</option>`).join("");
  }

  // Search Text
  const searchVal = (document.getElementById("teacherSearch")?.value || "").toLowerCase();
  
  const filtered = data.filter(s => {
    const matchName = s.nama.toLowerCase().includes(searchVal);
    const matchKelas = currentKelas ? s.kelas === currentKelas : true;
    return matchName && matchKelas;
  });

  const shownEl = document.getElementById("shownCount");
  const totalEl = document.getElementById("totalCount");
  if (shownEl) shownEl.textContent = filtered.length;
  if (totalEl) totalEl.textContent = allSiswa.length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="20" class="text-center py-12">
      <div class="flex flex-col items-center gap-3 text-slate-500">
        <i class="fas fa-search text-3xl text-slate-600"></i>
        <span class="text-sm font-mono-tech">Tidak ada data yang sesuai filter.</span>
      </div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((s, idx) => {
    const kkm = getKKM(s.kelas);
    const fArr = [];
    for (let i = 1; i <= numFormatif[activeQuarter]; i++) {
        fArr.push(s[`q${activeQuarter}_f${i}`] !== undefined ? s[`q${activeQuarter}_f${i}`] : "");
    }
    
    // Status Logic
    const avgF = fArr.some(v => v!=="") ? fArr.reduce((a,b)=>a+Number(b||0),0) / fArr.filter(v=>v!=="").length : 0;
    const sumatifValue = s[`q${activeQuarter}_sumatif`];
    const finalScore = (avgF * 0.4) + (Number(sumatifValue||0) * 0.6);
    let status = finalScore >= kkm ? "Tuntas" : "Remedial";
    if (fArr.every(v => v==="") && (sumatifValue==="" || sumatifValue===undefined)) status = "Susulan";

    // Build Inputs
    let fInputs = "";
    for (let i = 0; i < numFormatif[activeQuarter]; i++) {
      const val = fArr[i];
      const num = val !== "" && val !== null && val !== undefined ? Number(val) : "";
      const cls = num !== "" && num < kkm ? "table-input input-remedial" : "table-input";
      fInputs += `
        <td class="px-2 py-3">
          <input type="number" min="0" max="100" class="${cls}" id="r-f${i+1}-${s.id}" value="${num}" placeholder="-" oninput="highlightScore(this,${kkm})" />
        </td>`;
    }

    const sumatifVal = sumatifValue !== "" && sumatifValue !== null && sumatifValue !== undefined ? Number(sumatifValue) : "";
    const sCls = sumatifVal !== "" && sumatifVal < kkm ? "table-input input-remedial" : "table-input";
    
    // NIS Editable
    const nisEditable = `<input type="text" class="table-input" style="width:100%; text-align:left;" id="r-nis-${s.id}" value="${escHtml(s.nis || '')}" placeholder="NIS" />`;

    // Password Editable & Pending Password Request
    let passwordHTML = `<div class="flex items-center gap-2 w-full max-w-[150px]"><input type="text" class="table-input" style="text-align:left;" id="r-pwd-${s.id}" value="${escHtml(s.password || 'Sph12345!')}" placeholder="Password" /></div>`;
    
    if (s.pendingPassword) {
      passwordHTML += `
        <div class="mt-2 bg-indigo-500/10 border border-indigo-500/30 rounded p-1.5 flex flex-col gap-1.5 text-[10px] w-full max-w-[150px]">
          <span class="text-indigo-300 font-bold whitespace-nowrap"><i class="fas fa-bell text-xs animate-pulse text-indigo-400 mr-1"></i> Pengajuan Reset: <br><span class="text-white font-mono-tech mt-1 inline-block">${escHtml(s.pendingPassword)}</span></span>
          <div class="flex items-center gap-1 mt-0.5">
            <button onclick="approveStudentPassword('${s.id}')" class="flex-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/50 rounded py-0.5 transition-colors font-bold text-[9px] uppercase"><i class="fas fa-check"></i></button>
            <button onclick="rejectStudentPassword('${s.id}')" class="flex-1 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/50 rounded py-0.5 transition-colors font-bold text-[9px] uppercase"><i class="fas fa-times"></i></button>
          </div>
        </div>
      `;
    }

    // Status Chip
    let dotCls, chipCls, chipLabel, animateDot;
    if (status === "Tuntas") {
      dotCls = "bg-emerald-500"; chipLabel = "Tuntas"; animateDot = "";
      chipCls = "inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider";
    } else if (status === "Remedial") {
      dotCls = "bg-rose-500"; chipLabel = "Remedial"; animateDot = "animate-pulse";
      chipCls = "inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider";
    } else {
      dotCls = "bg-amber-500"; chipLabel = "Susulan"; animateDot = "animate-pulse";
      chipCls = "inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider";
    }
    const statusChip = `<span class="${chipCls}"><span class="w-1.5 h-1.5 rounded-full ${dotCls} flex-shrink-0 ${animateDot}"></span>${chipLabel}</span>`;

    return `
      <tr id="row-${s.id}" class="hover:bg-slate-800/50 transition-colors group">
        <td class="px-3 py-3 text-center text-slate-500 font-mono-tech text-sm">${idx + 1}</td>
        <td class="px-3 py-3 font-mono-tech text-sm w-[120px]">${nisEditable}</td>
        <td class="px-3 py-3 font-bold text-slate-200 whitespace-nowrap">${escHtml(s.nama)}</td>
        <td class="px-3 py-3 text-center">
          <span class="bg-slate-800 border border-slate-700 px-2 py-1 rounded text-xs font-mono-tech text-slate-300">${escHtml(s.kelas)}</span>
        </td>
        <td class="px-3 py-3">${passwordHTML}</td>
        ${fInputs}
        <td class="px-2 py-3">
          <input type="number" min="0" max="100" class="${sCls}" id="r-s-${s.id}" value="${sumatifVal}" placeholder="-" oninput="highlightScore(this,${kkm})" />
        </td>
        <td class="px-3 py-3 text-center">${statusChip}</td>
        <td class="px-4 py-3">
          <div class="flex items-center justify-center gap-2">
            <button title="Simpan NIS, Password & Nilai" onclick="saveSiswaRow('${s.id}')"
              class="w-8 h-8 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-colors flex items-center justify-center">
              <i class="fas fa-check text-xs"></i>
            </button>
            <button title="Hapus Siswa" onclick="deleteSiswa('${s.id}','${escHtml(s.nama)}')"
              class="w-8 h-8 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/50 transition-colors flex items-center justify-center">
              <i class="fas fa-trash-alt text-xs"></i>
            </button>
          </div>
        </td>
      </tr>`;
  }).join("");
}

function approveStudentPassword(id) {
  const siswa = allSiswa.find(s => s.id === id);
  if (!siswa || !siswa.pendingPassword) return;
  
  if (!confirm(`Setujui pengajuan password baru untuk ${siswa.nama}?`)) return;
  
  siswaRef.child(id).update({
    password: siswa.pendingPassword,
    pendingPassword: null,
    pendingPasswordAt: null
  }).then(() => {
    showAlert("Password baru berhasil disetujui", "success");
  }).catch(err => {
    showAlert("Gagal menyetujui password: " + err.message, "danger");
  });
}

function rejectStudentPassword(id) {
  const siswa = allSiswa.find(s => s.id === id);
  if (!siswa || !siswa.pendingPassword) return;
  
  if (!confirm(`Tolak pengajuan password dari ${siswa.nama}?`)) return;
  
  siswaRef.child(id).update({
    pendingPassword: null,
    pendingPasswordAt: null
  }).then(() => {
    showAlert("Pengajuan password ditolak", "info");
  }).catch(err => {
    showAlert("Gagal menolak pengajuan: " + err.message, "danger");
  });
}

// ─── ADMIN PANEL (SUPER ADMIN ONLY) ───────────────────────
let activeAdminEmail = "";

function loadAdminPanel(adminEmail) {
  activeAdminEmail = adminEmail;
  const adminPanelBtn = document.getElementById("adminPanelBtn");
  if (adminPanelBtn) adminPanelBtn.style.display = ""; // Munculkan accordion admin
  
  guruRef.on("value", (snap) => {
    const allGuru = snap.val() || {};
    const pendingGuru = Object.entries(allGuru)
      .filter(([uid, data]) => !data.isVerified && data.email !== ADMIN_UTAMA_EMAIL)
      .map(([uid, data]) => ({ uid, ...data }));
    
    renderAdminPanel(pendingGuru);
  }, err => console.error("AdminPanel Listen Error:", err));
}

function renderAdminPanel(pendingGuru) {
  const container = document.getElementById("adminPanelContent");
  if (!container) return;

  if (pendingGuru.length === 0) {
    document.getElementById("adminBadgeCount").style.display = "none";
    container.innerHTML = `
      <div class="flex items-center gap-2 text-emerald-400 text-sm font-mono-tech p-4">
        <i class="fas fa-check-circle"></i> System Secure. Tidak ada antrean registrasi guru.
      </div>`;
    return;
  }

  // Tampilkan badge jumlah antrean
  const badge = document.getElementById("adminBadgeCount");
  if (badge) {
    badge.textContent = pendingGuru.length;
    badge.style.display = "inline-flex";
  }

  container.innerHTML = pendingGuru.map(guru => `
    <div class="flex items-center justify-between gap-3 p-4 bg-slate-900/60 border-b border-slate-700/50 hover:bg-slate-800/60 transition-colors">
      <div class="flex-1 min-w-0">
        <p class="font-bold text-sm text-slate-200">${escHtml(guru.email)}</p>
        <p class="text-xs text-slate-500 font-mono-tech mt-1">
          <i class="fas fa-clock mr-1"></i> Register: ${new Date(guru.createdAt).toLocaleString('id-ID')}
        </p>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <button onclick="verifyGuruAccount('${escHtml(guru.uid)}')"\n          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20">\n          <i class="fas fa-check mr-1"></i>Approve\n        </button>
        <button onclick="rejectGuruAccount('${escHtml(guru.uid)}')"\n          class="px-4 py-2 bg-slate-800 hover:bg-rose-900/50 text-rose-400 border border-slate-700 hover:border-rose-500/50 text-xs font-bold rounded-lg transition-colors">\n          <i class="fas fa-times mr-1"></i>Reject\n        </button>
      </div>
    </div>
  `).join('');
}

function verifyGuruAccount(uid) {
  if (!confirm("Approve akun guru ini?")) return;
  guruRef.child(uid).update({ 
    isVerified: true, verifiedAt: Date.now(), verifiedBy: activeAdminEmail 
  }).then(() => showAlert("Akun guru berhasil di-approve!", "success"))
    .catch(err => showAlert("Gagal: " + err.message, "danger"));
}

function rejectGuruAccount(uid) {
  if (!confirm("Tolak (Hapus) akun guru ini permanen?")) return;
  guruRef.child(uid).remove()
    .then(() => showAlert("Akun guru ditolak dan dihapus permanen.", "info"))
    .catch(err => showAlert("Gagal: " + err.message, "danger"));
}

// ─── LOGOUT GURU ──────────────────────────────────────────
function logoutGuru() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  }).catch((err) => alert("Gagal logout: " + err.message));
}

// ─── EXCEL FEATURES (EXPORT, IMPORT, TEMPLATE) ────────────
function exportExcel() {
  const selFilter = document.getElementById("filterKelas");
  const currentKelas = selFilter?.value || "";
  const searchVal = (document.getElementById("teacherSearch")?.value || "").toLowerCase();
  
  const filteredSiswa = allSiswa.filter(s => {
    const matchName = s.nama.toLowerCase().includes(searchVal);
    const matchKelas = currentKelas ? s.kelas === currentKelas : true;
    return matchName && matchKelas;
  });

  if (filteredSiswa.length === 0) return showAlert("Tidak ada data untuk diekspor sesuai filter saat ini.", "warning");
  
  const headers = ["No", "NIS", "Nama Siswa", "Kelas", "Password"];
  for (let i = 1; i <= numFormatif[activeQuarter]; i++) headers.push(`Formatif ${i}`);
  headers.push("Sumatif", "Status", "KKM");

  const rows = filteredSiswa.map((s, idx) => {
    const row = [idx + 1, s.nis || "", s.nama, s.kelas, s.password || ""];
    const kkm = getKKM(s.kelas);
    
    let fCount = 0;
    let fSum = 0;
    let allEmpty = true;
    for (let i = 1; i <= numFormatif[activeQuarter]; i++) {
        const v = s[`q${activeQuarter}_f${i}`];
        if (v !== "" && v !== null && v !== undefined) {
            row.push(Number(v));
            fSum += Number(v);
            fCount++;
            allEmpty = false;
        } else {
            row.push("");
        }
    }
    const sVal = s[`q${activeQuarter}_sumatif`];
    if (sVal !== "" && sVal !== null && sVal !== undefined) {
         row.push(Number(sVal));
         allEmpty = false;
    } else {
         row.push("");
    }
    
    let status = "Susulan";
    if (!allEmpty) {
        const avgF = fCount > 0 ? fSum / fCount : 0;
        const finalScore = (avgF * 0.4) + (Number(sVal||0) * 0.6);
        status = finalScore >= kkm ? "Tuntas" : "Remedial";
    }
    row.push(status);
    row.push(kkm);
    return row;
  });

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = [{wch:5}, {wch:12}, {wch:28}, {wch:12}, {wch:15}, ...Array(numFormatif[activeQuarter]).fill({wch:10}), {wch:10}, {wch:10}, {wch:6}];
  const wb = XLSX.utils.book_new();
  const sheetName = currentKelas ? `Data Q${activeQuarter} ${currentKelas}` : `Data Nilai Q${activeQuarter}`;
  XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31)); // excel sheet names max 31 chars
  
  const fileNameClass = currentKelas ? `_${currentKelas}` : "";
  XLSX.writeFile(wb, `Database_Nilai_Q${activeQuarter}${fileNameClass}_` + new Date().toISOString().slice(0, 10) + ".xlsx");
  showAlert(`Export Excel Quarter ${activeQuarter} berhasil diunduh.`, "success");
}

function downloadTemplate() {
  const headers = ["NIS", "Nama Siswa", "Kelas", "Password"];
  for (let i = 1; i <= numFormatif[activeQuarter]; i++) headers.push(`Formatif ${i}`);
  headers.push("Sumatif");

  const example = ["12345678", "Contoh Nama", "10 RPL 1", "SandiKuat123!"];
  for (let i = 0; i < numFormatif[activeQuarter]; i++) example.push(75);
  example.push(85);

  const ws = XLSX.utils.aoa_to_sheet([headers, example]);
  ws["!cols"] = [{wch:15}, {wch:25}, {wch:12}, {wch:20}, ...Array(numFormatif[activeQuarter]).fill({wch:10}), {wch:10}];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template Import");
  XLSX.writeFile(wb, `Template_Import_Nilai_Q${activeQuarter}.xlsx`);
  showAlert(`Template Excel Quarter ${activeQuarter} berhasil diunduh.`, "success");
}

function triggerImport() {
  document.getElementById("importFileExcel").click();
}

function importExcel(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, {type: "array"});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, {header: 1, defval: ""});

      if (rows.length < 2) return showAlert("File Excel kosong.", "warning");

      const head = rows[0].map(h => String(h).trim().toLowerCase());
      const iNis = head.findIndex(h => h.includes("nis"));
      const iNama = head.findIndex(h => h.includes("nama"));
      const iKelas = head.findIndex(h => h.includes("kelas"));
      const iPwd = head.findIndex(h => h.includes("password"));
      const iSumat = head.findIndex(h => h.includes("sumatif"));
      
      const qCols = [];
      for(let i=1; i<=10; i++) {
          qCols.push(head.findIndex(h => h.includes(`formatif ${i}`) || h.includes(`f${i}`)));
      }

      if (iNama === -1 || iKelas === -1 || iPwd === -1) {
        return showAlert("Format salah! Harus ada kolom Nama Siswa, Kelas, dan Password.", "danger");
      }

      const batch = {};
      let count = 0;

      rows.slice(1).forEach(r => {
        if (!r.some(c => c !== "")) return; // skip row kosong
        const nis = String(r[iNis]||"").trim();
        const nama = String(r[iNama]||"").trim();
        const kelas = String(r[iKelas]||"").trim();
        const pwd = String(r[iPwd]||"").trim();
        if (!nama || !kelas || !pwd) return;

        const record = {
          nis: nis, nama: nama, kelas: kelas, password: pwd,
          createdAt: Date.now()
        };
        
        if (iSumat >= 0 && r[iSumat] !== "") record[`q${activeQuarter}_sumatif`] = Number(r[iSumat]);
        
        qCols.forEach((colIdx, arrIdx) => {
            if (colIdx >= 0 && r[colIdx] !== "") record[`q${activeQuarter}_f${arrIdx+1}`] = Number(r[colIdx]);
        });

        // Insert new child (bisa update ke auto-upsert lain waktu)
        batch[siswaRef.push().key] = record;
        count++;
      });

      if (count === 0) return showAlert("Tidak baris valid untuk diimpor.", "warning");

      db.ref("siswa").update(batch).then(() => {
        showAlert(`Import sukses: ${count} data siswa dimasukkan ke Quarter ${activeQuarter}!`, "success");
      });
    } catch(err) {
      showAlert("Gagal membaca Excel: " + err.message, "danger");
    } finally {
      event.target.value = ""; // Reset file input
    }
  };
  reader.readAsArrayBuffer(file);
}
