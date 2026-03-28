/* ========================================================
   student.js
   Khusus untuk index.html (tampilan publik siswa).
   Mencakup pencarian berdasarkan NIS, verifikasi password ringan,
   dan rendering radar chart kompetensi.
   ======================================================== */

let allSiswa = [];
let selectedStudentForDetail = null;
let radarChartCtx = null; // Menyimpan instance Chart

document.addEventListener("DOMContentLoaded", () => {
  // Pengecekan auth Guru: jika guru login di index.html, tampilkan tombol "Maju ke Dashboard"
  checkAuthOnStudentPage();
  listenToDataSiswa();
});

// ─── AMBIL DATA SISWA ─────────────────────────────────────
function listenToDataSiswa() {
  siswaRef.on("value", (snap) => {
    allSiswa = [];
    const data = snap.val();
    if (data) {
      Object.entries(data).forEach(([id, val]) => allSiswa.push({ id, ...val }));
      allSiswa.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    }
    // Jika sedang melihat hasil pencarian, biarkan UI menyesuaikan saja
    // (Bisa memicu render ulang jika mau real-time untuk search results)
  });
}

// ─── PENCARIAN SISWA ──────────────────────────────────────
function searchStudent() {
  const query = (document.getElementById("studentSearchInput")?.value || "").trim().toLowerCase();
  const placeholder = document.getElementById("searchPlaceholder");
  const results = document.getElementById("searchResults");
  const detail = document.getElementById("studentDetail");

  detail.classList.add("hidden");
  detail.innerHTML = "";

  if (!query) {
    results.classList.add("hidden");
    placeholder.classList.remove("hidden");
    return;
  }

  // Cari berdasarkan NIS atau Nama
  const found = allSiswa.filter((s) => 
    String(s.nis || "").toLowerCase().includes(query) ||
    String(s.nama).toLowerCase().includes(query)
  );

  placeholder.classList.add("hidden");
  results.classList.remove("hidden");

  if (found.length === 0) {
    results.innerHTML = `
      <div class="text-center text-muted py-3">
        <i class="fas fa-search" style="font-size:2rem"></i>
        <p class="mt-2 text-slate-500 font-mono-tech">
          Siswa dengan keyword "<strong>${escHtml(query)}</strong>" tidak ditemukan.
        </p>
      </div>`;
    return;
  }

  results.innerHTML = found.map((s) => {
    const initial = escHtml(s.nama).charAt(0).toUpperCase();
    return `
      <div class="search-result-item flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-indigo-300 transition-colors shadow-sm cursor-pointer mb-2" onclick="requestPasswordForStudent('${escHtml(s.id)}')">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold relative shrink-0">
          ${initial}
          <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border border-white rounded-full"></div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-bold text-slate-800 text-sm break-words">${escHtml(s.nama)}</p>
          <p class="text-xs text-slate-500 font-mono-tech flex flex-wrap gap-2 mt-0.5">
            <span class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100">${escHtml(s.nis || 'Belum ada NIS')}</span>
            <span class="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-100">${escHtml(s.kelas)}</span>
          </p>
        </div>
        <i class="fas fa-chevron-right text-slate-400"></i>
      </div>`;
  }).join("");
}

// ─── VERIFIKASI PASSWORD SISWA ────────────────────────────
function requestPasswordForStudent(id) {
  const student = allSiswa.find(s => s.id === id);
  if (!student) return;
  
  selectedStudentForDetail = student;
  document.getElementById("studentPasswordInput").value = "";
  document.getElementById("passwordError").style.display = "none";
  new bootstrap.Modal(document.getElementById("studentPasswordModal")).show();
}

function toggleStudentPassword(inputId = 'studentPasswordInput', iconId = 'studentEyeIcon') {
  const inp = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!inp || !icon) return;
  if (inp.type === "password") {
    inp.type = "text";
    icon.className = "fas fa-eye-slash";
  } else {
    inp.type = "password";
    icon.className = "fas fa-eye text-indigo-500";
  }
}

function toggleForgotPasswordView() {
  const mainForm = document.getElementById("studentPasswordFormBody");
  const forgotForm = document.getElementById("studentForgotFormBody");
  
  if (mainForm.style.display === "none") {
    mainForm.style.display = "block";
    forgotForm.style.display = "none";
  } else {
    mainForm.style.display = "none";
    forgotForm.style.display = "block";
  }
  
  // Clear inputs and errors when toggling
  document.getElementById("studentPasswordInput").value = "";
  document.getElementById("newPasswordRequest").value = "";
  document.getElementById("passwordError").style.display = "none";
}

function submitForgotPasswordRequest(event) {
  event.preventDefault();
  
  if (!selectedStudentForDetail) {
    showAlert("Data siswa tidak ditemukan", "danger");
    return;
  }
  
  const newPassword = document.getElementById("newPasswordRequest").value.trim();
  if (newPassword.length < 6) {
    document.getElementById("passwordErrorText").textContent = "Password baru minimal 6 karakter.";
    document.getElementById("passwordError").style.display = "flex";
    return;
  }
  
  // Disable button to prevent double submit
  const btn = event.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;

  // Save to Firebase as pendingPassword
  siswaRef.child(selectedStudentForDetail.id).update({
    pendingPassword: newPassword,
    pendingPasswordAt: Date.now()
  }).then(() => {
    // Sukses
    const modal = bootstrap.Modal.getInstance(document.getElementById("studentPasswordModal"));
    if (modal) modal.hide();
    showAlert("Pengajuan password baru berhasil dikirim. Silakan hubungi guru Informatika Anda untuk meminta persetujuan.", "success");
    
    // Reset view for next time
    setTimeout(() => {
        document.getElementById("studentPasswordFormBody").style.display = "block";
        document.getElementById("studentForgotFormBody").style.display = "none";
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 500);
  }).catch(err => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    showAlert("Gagal mengirim pengajuan: " + err.message, "danger");
  });
}

function verifyStudentPassword(event) {
  event.preventDefault();
  
  if (!selectedStudentForDetail) {
    showAlert("Data siswa tidak ditemukan", "danger");
    return;
  }
  
  const inputPassword = document.getElementById("studentPasswordInput").value.trim();
  const correctPassword = selectedStudentForDetail.password || "Sph12345!"; // Default guard
  
  if (inputPassword !== correctPassword) {
    document.getElementById("passwordErrorText").textContent = "Password salah. Coba lagi.";
    document.getElementById("passwordError").style.display = "flex";
    return;
  }
  
  // Sukses
  const modal = bootstrap.Modal.getInstance(document.getElementById("studentPasswordModal"));
  if (modal) modal.hide();
  
  renderStudentDetail(selectedStudentForDetail.id);
}

// ─── UBAH PASSWORD MANDIRI ────────────────────────────────
function openChangePasswordModal() {
  document.getElementById("newActivePasswordInput").value = "";
  document.getElementById("changePasswordError").style.display = "none";
  new bootstrap.Modal(document.getElementById("studentChangePasswordModal")).show();
}

function submitChangePassword(event) {
  event.preventDefault();
  
  if (!selectedStudentForDetail) return showAlert("Data siswa tidak tersedia.", "danger");
  
  const newPwd = document.getElementById("newActivePasswordInput").value.trim();
  if (newPwd.length < 6) {
    document.getElementById("changePasswordErrorText").textContent = "Password minimum 6 karakter.";
    document.getElementById("changePasswordError").style.display = "flex";
    return;
  }
  
  const btn = event.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
  btn.disabled = true;

  // Langsung ganti ke password aktif tanpa pending jika dilakukan dari dashboard siswa
  siswaRef.child(selectedStudentForDetail.id).update({
    password: newPwd,
    pendingPassword: null, // Bersihkan jika ada pending sebelumnya
    pendingPasswordAt: null
  }).then(() => {
    // Update local state so they don't get kicked out or fail later checks
    selectedStudentForDetail.password = newPwd;
    
    const modal = bootstrap.Modal.getInstance(document.getElementById("studentChangePasswordModal"));
    if (modal) modal.hide();
    
    showAlert("Password berhasil diubah. Silakan catat password baru Anda.", "success");
  }).catch(err => {
    showAlert("Gagal mengubah password: " + err.message, "danger");
  }).finally(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
  });
}

// ─── RENDER HASIL & RADAR CHART ───────────────────────────
function renderStudentDetail(id) {
  const s = allSiswa.find((x) => x.id === id);
  if (!s) return;

  const kkm = getKKM(s.kelas);
  
  const quartersData = {};
  let hasAnyData = false;
  let allTuntas = true;

  for(let q=1; q<=4; q++) {
      quartersData[q] = {
          fmt: {},
          sum: s[`q${q}_sumatif`] !== undefined ? s[`q${q}_sumatif`] : ""
      };
      
      let fKeys = Object.keys(s).filter(k => k.startsWith(`q${q}_f`));
      let maxF = Math.max(0, ...fKeys.map(k => parseInt(k.split("_f")[1])));
      quartersData[q].maxF = maxF;
      
      for(let i=1; i<=maxF; i++) {
          let val = s[`q${q}_f${i}`];
          quartersData[q].fmt[i] = val !== undefined ? val : "";
      }
      
      let fArr = Object.values(quartersData[q].fmt).filter(v => v !== "");
      let qHasFmt = fArr.length > 0;
      let qHasSum = quartersData[q].sum !== "";
      
      if (qHasFmt || qHasSum) {
          hasAnyData = true;
          let sumF = fArr.reduce((a,b)=>a+Number(b), 0);
          let avgF = qHasFmt ? sumF / fArr.length : 0;
          let sumVal = Number(quartersData[q].sum || 0);
          let qScore = (avgF * 0.4) + (sumVal * 0.6);
          
          if (qScore < kkm) allTuntas = false;
      }
  }

  let status = (!hasAnyData) ? "Susulan" : (allTuntas ? "Tuntas" : "Remedial");
  
  let allTilesHtml = "";
  for(let q=1; q<=4; q++) {
     let qData = quartersData[q];
     let hasData = (qData.sum !== "") || Object.values(qData.fmt).some(v => v !== "");
     if (!hasData) continue;
     
     let tiles = "";
     for(let i=1; i<=qData.maxF; i++) {
         let val = qData.fmt[i];
         if (val === "" || val === null) continue;
         
         const num = Number(val);
         const txtCls = num < kkm ? "text-rose-600" : "text-emerald-600";
         
         tiles += `
          <div class="bg-white border border-indigo-100 p-3 rounded-xl shadow-sm flex flex-col items-center justify-center">
            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Formatif Q${q}.${i}</span>
            <span class="text-2xl font-black ${txtCls}">${num}</span>
          </div>`;
     }
     
     if (qData.sum !== "") {
         const sNum = Number(qData.sum);
         const sTxtCls = sNum < kkm ? "text-rose-600" : "text-emerald-600";
         tiles += `
          <div class="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 p-3 rounded-xl shadow-sm flex flex-col items-center justify-center">
            <span class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Sumatif Q${q}</span>
            <span class="text-3xl font-black ${sTxtCls}">${sNum}</span>
          </div>`;
     }
     
     allTilesHtml += `
        <div class="mb-6">
            <h4 class="text-sm font-bold text-slate-500 mb-3 ml-1 uppercase tracking-wider font-mono-tech border-b border-slate-100 pb-2">Quarter ${q}</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
               ${tiles}
            </div>
        </div>
     `;
  }
  
  if (!allTilesHtml) {
      allTilesHtml = `
      <div class="text-center py-10 bg-slate-50 border border-slate-100 rounded-xl mb-6 flex flex-col items-center justify-center">
        <i class="fas fa-folder-open text-3xl text-slate-300 mb-2"></i>
        <p class="text-sm text-slate-500 font-mono-tech">Belum ada nilai yang diinput di Quarter manapun.</p>
      </div>`;
  }

  // Notification block
  let notifHtml = "";
  if (status !== "Tuntas" && hasAnyData) {
    notifHtml = `
      <div class="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
        <div class="text-rose-500 mt-0.5"><i class="fas fa-exclamation-triangle text-xl"></i></div>
        <div>
          <h4 class="text-rose-800 font-bold text-sm">Ada Quarter belum Tuntas / Kosong!</h4>
          <p class="text-rose-600 text-xs font-mono-tech mt-1">Status belum tuntas karena ada nilai di bawah KKM (${kkm}).</p>
        </div>
      </div>`;
  } else if (status === "Tuntas") {
    notifHtml = `
      <div class="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 justify-center items-center text-emerald-800 font-bold text-sm shadow-sm">
        <i class="fas fa-check-circle text-emerald-500 text-xl"></i> Semua Kriteria Telah Tuntas!
      </div>`;
  }

  const detail = document.getElementById("studentDetail");
  detail.innerHTML = `
    <div class="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 mb-6 w-full overflow-hidden">
      <div class="flex justify-between items-start mb-6 w-full">
        <div class="flex-1 min-w-0 pr-4">
          <h2 class="text-2xl font-black text-slate-800 leading-tight truncate">${escHtml(s.nama)}</h2>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold shadow-sm">
              NIS: ${escHtml(s.nis || '')}
            </span>
            <span class="bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold shadow-sm">
              Kelas ${escHtml(s.kelas)}
            </span>
            <span class="bg-amber-50 border border-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold shadow-sm">
              KKM = ${kkm}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="openChangePasswordModal()" class="text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
            <i class="fas fa-key"></i> <span class="hidden sm:inline">Password</span>
          </button>
          <button onclick="closeStudentDetail()" class="text-slate-400 hover:text-rose-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose-50">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>
      </div>
      
      ${allTilesHtml}

      <div class="w-full h-72 lg:h-80 bg-slate-50 border border-slate-100 rounded-xl p-2 relative overflow-hidden">
        <canvas id="studentRadarChart"></canvas>
      </div>

      ${notifHtml}
    </div>
  `;
  
  detail.classList.remove("hidden");
  document.getElementById("searchResults").classList.add("hidden");
  
  // Render ChartJS
  renderRadarChart(quartersData, kkm);
}

function closeStudentDetail() {
  document.getElementById("studentDetail").classList.add("hidden");
  document.getElementById("searchResults").classList.remove("hidden");
}

function renderRadarChart(quartersData, kkm) {
  const labels = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
  const sumatifData = [0, 0, 0, 0];
  
  // Find out maximum Formatif count
  let globalMaxF = 0;
  for(let q=1; q<=4; q++) {
      if (quartersData[q].maxF > globalMaxF) globalMaxF = quartersData[q].maxF;
      sumatifData[q-1] = quartersData[q].sum === "" ? null : Number(quartersData[q].sum);
  }
  
  const datasets = [];
  
  // Set Main Area (Sumatif) using dynamic solid line
  datasets.push({
      label: 'Sumatif',
      data: sumatifData,
      backgroundColor: 'rgba(99, 102, 241, 0.1)', // indigo-500 transparent
      borderColor: 'rgba(99, 102, 241, 1)',
      pointBackgroundColor: 'rgba(99, 102, 241, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      borderWidth: 2,
      fill: true,
      spanGaps: true
  });
  
  // Colors for Formatives
  const fColors = [
      'rgba(45, 212, 191, ', // Teal
      'rgba(251, 191, 36, ', // Amber
      'rgba(244, 63, 94, ',  // Rose
      'rgba(168, 85, 247, ', // Purple
      'rgba(14, 165, 233, ', // Cyan
      'rgba(132, 204, 22, ', // Lime
      'rgba(236, 72, 153, '  // Pink
  ];

  // Overlay Formative datasets
  for(let i=1; i<=globalMaxF; i++) {
      let fmData = [];
      let hasAnyVal = false;
      for(let q=1; q<=4; q++) {
          let val = quartersData[q].fmt[i];
          if (val !== undefined && val !== "") {
              fmData.push(Number(val));
              hasAnyVal = true;
          } else {
              fmData.push(null);
          }
      }
      if (!hasAnyVal) continue; // Skip if this Formatif # is empty in all quarters
      
      let colorPrefix = fColors[(i-1) % fColors.length];
      datasets.push({
          label: 'Fmt ' + i,
          data: fmData,
          backgroundColor: colorPrefix + '0.05)',
          borderColor: colorPrefix + '0.6)',
          pointBackgroundColor: colorPrefix + '0.8)',
          pointRadius: 3,
          borderWidth: 1.5,
          borderDash: [4, 4],
          fill: true, // Layered fill allows shadows
          spanGaps: true
      });
  }

  // Add KKM border
  const kkmData = [kkm, kkm, kkm, kkm];
  datasets.push({
      label: 'KKM (' + kkm + ')',
      data: kkmData,
      backgroundColor: 'transparent',
      borderColor: 'rgba(239, 68, 68, 0.3)', // red-500 light
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false
  });

  const ctx = document.getElementById('studentRadarChart')?.getContext('2d');
  if(!ctx) return;
  
  if(radarChartCtx) radarChartCtx.destroy();
  
  radarChartCtx = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(0,0,0,0.05)' },
          grid: { color: 'rgba(0,0,0,0.05)' },
          pointLabels: {
            font: { family: "'JetBrains Mono', monospace", size: 10, weight: 'bold' },
            color: '#475569' // slate-600
          },
          ticks: {
            min: 0, max: 100, stepSize: 20, display: false
          }
        }
      },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 10, family: "'Plus Jakarta Sans', sans-serif" }, usePointStyle: true, boxWidth: 8 } }
      }
    }
  });
}
