/* ========================================================
   student.js
   Khusus untuk index.html (tampilan publik siswa).
   Mencakup pencarian berdasarkan NIS, verifikasi password ringan,
   dan rendering radar chart kompetensi.
   ======================================================== */

let allSiswa = [];
let selectedStudentForDetail = null;
let radarChartCtx = null;

function showStudentPasswordError(message) {
  const wrapEl = document.getElementById("passwordError");
  const textEl = document.getElementById("passwordErrorText");
  if (wrapEl) {
    if (textEl) {
      textEl.textContent = String(message || "Terjadi kesalahan. Coba lagi.");
    }
    wrapEl.style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthOnStudentPage();
  listenToDataSiswa();
});

// ─── AMBIL DATA SISWA ─────────────────────────────────────
function listenToDataSiswa() {
  siswaRef.on("value", (snap) => {
    allSiswa = [];
    const data = snap.val();
    if (data) {
      Object.entries(data).forEach(([id, val]) => {
        if (val && typeof val === "object") {
          allSiswa.push({ id, ...val });
        }
      });
      allSiswa.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    }
  });
}

// ─── PENCARIAN SISWA ──────────────────────────────────────
function searchStudent() {
  const query = (document.getElementById("studentSearchInput")?.value || "")
    .trim()
    .toLowerCase();
  const results = document.getElementById("searchResults");
  const detail = document.getElementById("studentDetail");
  const awaitingText = document.getElementById("awaitingText");

  detail.classList.add("hidden");
  detail.innerHTML = "";

  if (!query) {
    results.classList.add("hidden");
    if (awaitingText) awaitingText.classList.remove("hidden");
    return;
  }

  const found = allSiswa.filter((s) => {
    if (!s || typeof s !== "object") return false;
    const nis = String(s.nis || "").toLowerCase();
    const nama = String(s.nama || "").toLowerCase();
    return nis.includes(query) || nama.includes(query);
  });

  if (awaitingText) awaitingText.classList.add("hidden");
  results.classList.remove("hidden");

  if (found.length === 0) {
    results.innerHTML = `
      <div class="text-center py-8 font-mono-tech">
        <i class="fas fa-search text-3xl text-slate-600 mb-3 block"></i>
        <p class="text-slate-500 text-sm">
          Siswa dengan keyword "<span class="text-cyan-400">${escHtml(query)}</span>" tidak ditemukan.
        </p>
      </div>`;
    return;
  }

  results.innerHTML = found
    .map((s) => {
      const initial = escHtml(s.nama).charAt(0).toUpperCase();
      return `
      <div class="search-result-item flex items-center gap-3 p-4 rounded-xl cursor-pointer mb-2"
           onclick="requestPasswordForStudent('${escHtml(s.id)}')">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold relative shrink-0 text-sm">
          ${initial}
          <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#151e2e] rounded-full"></div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-bold text-white text-sm">${escHtml(s.nama)}</p>
          <p class="text-xs font-mono-tech flex flex-wrap gap-2 mt-1">
            <span class="bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">${escHtml(s.nis || "Belum ada NIS")}</span>
            <span class="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">${escHtml(s.kelas)}</span>
          </p>
        </div>
        <i class="fas fa-chevron-right text-slate-500"></i>
      </div>`;
    })
    .join("");
}

// ─── VERIFIKASI PASSWORD SISWA ────────────────────────────
function requestPasswordForStudent(id) {
  const student = allSiswa.find((s) => s.id === id);
  if (!student) return;

  selectedStudentForDetail = student;
  document.getElementById("studentPasswordInput").value = "";
  const errWrap = document.getElementById("passwordError");
  const errText = document.getElementById("passwordErrorText");
  if (errWrap) errWrap.style.display = "none";
  if (errText) errText.textContent = "";
  new bootstrap.Modal(document.getElementById("studentPasswordModal")).show();
}

function toggleStudentPassword(
  inputId = "studentPasswordInput",
  iconId = "studentEyeIcon",
) {
  const inp = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!inp || !icon) return;
  if (inp.type === "password") {
    inp.type = "text";
    icon.className = "fas fa-eye-slash text-cyan-400";
  } else {
    inp.type = "password";
    icon.className = "fas fa-eye text-cyan-400";
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

  document.getElementById("studentPasswordInput").value = "";
  document.getElementById("newPasswordRequest").value = "";
  const errWrap = document.getElementById("passwordError");
  const errText = document.getElementById("passwordErrorText");
  if (errWrap) errWrap.style.display = "none";
  if (errText) errText.textContent = "";
}

function submitForgotPasswordRequest(event) {
  event.preventDefault();

  if (!selectedStudentForDetail) {
    showAlert("Data siswa tidak ditemukan", "danger");
    return;
  }

  const newPassword = document
    .getElementById("newPasswordRequest")
    .value.trim();
  if (newPassword.length < 6) {
    showStudentPasswordError("Password baru minimal 6 karakter.");
    return;
  }

  const btn = event.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;

  siswaRef
    .child(selectedStudentForDetail.id)
    .update({
      pendingPassword: newPassword,
      pendingPasswordAt: Date.now(),
    })
    .then(() => {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("studentPasswordModal"),
      );
      if (modal) modal.hide();
      showAlert(
        "Pengajuan password baru berhasil dikirim. Silakan hubungi guru Informatika Anda untuk meminta persetujuan.",
        "success",
      );

      setTimeout(() => {
        document.getElementById("studentPasswordFormBody").style.display =
          "block";
        document.getElementById("studentForgotFormBody").style.display = "none";
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 500);
    })
    .catch((err) => {
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

  const inputPassword = document
    .getElementById("studentPasswordInput")
    .value.trim();
  const correctPassword = selectedStudentForDetail.password || "Sph12345!";

  if (inputPassword !== correctPassword) {
    showStudentPasswordError("Password salah. Coba lagi.");
    return;
  }

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("studentPasswordModal"),
  );
  if (modal) modal.hide();

  renderStudentDetail(selectedStudentForDetail.id);
}

// ─── UBAH PASSWORD MANDIRI ────────────────────────────────
function openChangePasswordModal() {
  document.getElementById("newActivePasswordInput").value = "";
  document.getElementById("changePasswordError").style.display = "none";
  new bootstrap.Modal(
    document.getElementById("studentChangePasswordModal"),
  ).show();
}

function submitChangePassword(event) {
  event.preventDefault();

  if (!selectedStudentForDetail)
    return showAlert("Data siswa tidak tersedia.", "danger");

  const newPwd = document.getElementById("newActivePasswordInput").value.trim();
  if (newPwd.length < 6) {
    document.getElementById("changePasswordErrorText").textContent =
      "Password minimum 6 karakter.";
    document.getElementById("changePasswordError").style.display = "flex";
    return;
  }

  const btn = event.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
  btn.disabled = true;

  siswaRef
    .child(selectedStudentForDetail.id)
    .update({
      password: newPwd,
      pendingPassword: null,
      pendingPasswordAt: null,
    })
    .then(() => {
      selectedStudentForDetail.password = newPwd;

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("studentChangePasswordModal"),
      );
      if (modal) modal.hide();

      showAlert(
        "Password berhasil diubah. Silakan catat password baru Anda.",
        "success",
      );
    })
    .catch((err) => {
      showAlert("Gagal mengubah password: " + err.message, "danger");
    })
    .finally(() => {
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

  for (let q = 1; q <= 4; q++) {
    quartersData[q] = {
      fmt: {},
      sum: s[`q${q}_sumatif`] !== undefined ? s[`q${q}_sumatif`] : "",
    };

    let fKeys = Object.keys(s).filter((k) => k.startsWith(`q${q}_f`));
    let maxF = Math.max(0, ...fKeys.map((k) => parseInt(k.split("_f")[1])));
    quartersData[q].maxF = maxF;

    for (let i = 1; i <= maxF; i++) {
      let val = s[`q${q}_f${i}`];
      quartersData[q].fmt[i] = val !== undefined ? val : "";
    }

    let fArr = Object.values(quartersData[q].fmt).filter((v) => v !== "");
    let qHasFmt = fArr.length > 0;
    let qHasSum = quartersData[q].sum !== "";

    if (qHasFmt || qHasSum) {
      hasAnyData = true;
      let sumF = fArr.reduce((a, b) => a + Number(b), 0);
      let avgF = qHasFmt ? sumF / fArr.length : 0;
      let sumVal = Number(quartersData[q].sum || 0);
      let qScore = avgF * 0.4 + sumVal * 0.6;
      if (qScore < kkm) allTuntas = false;
    }
  }

  let status = !hasAnyData ? "Susulan" : allTuntas ? "Tuntas" : "Remedial";

  // Build tiles (dark theme)
  let allTilesHtml = "";
  for (let q = 1; q <= 4; q++) {
    let qData = quartersData[q];
    let hasData =
      qData.sum !== "" || Object.values(qData.fmt).some((v) => v !== "");
    if (!hasData) continue;

    let tiles = "";
    for (let i = 1; i <= qData.maxF; i++) {
      let val = qData.fmt[i];
      if (val === "" || val === null) continue;

      const num = Number(val);
      const txtCls = num < kkm ? "text-rose-400" : "text-emerald-400";

      tiles += `
        <div class="bg-[#1e2d45] border border-white/5 p-3 rounded-xl flex flex-col items-center justify-center">
          <span class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 font-mono-tech">Fmt Q${q}.${i}</span>
          <span class="text-2xl font-black ${txtCls}">${num}</span>
        </div>`;
    }

    if (qData.sum !== "") {
      const sNum = Number(qData.sum);
      const sTxtCls = sNum < kkm ? "text-rose-400" : "text-emerald-400";
      tiles += `
        <div class="bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 border border-indigo-500/20 p-3 rounded-xl flex flex-col items-center justify-center">
          <span class="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-1 font-mono-tech">Sumatif Q${q}</span>
          <span class="text-3xl font-black ${sTxtCls}">${sNum}</span>
        </div>`;
    }

    allTilesHtml += `
      <div class="mb-5">
        <h4 class="text-xs font-bold text-slate-500 mb-3 ml-1 uppercase tracking-widest font-mono-tech border-b border-white/5 pb-2">Quarter ${q}</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          ${tiles}
        </div>
      </div>`;
  }

  if (!allTilesHtml) {
    allTilesHtml = `
      <div class="text-center py-10 bg-[#1e2d45] border border-white/5 rounded-xl mb-5 flex flex-col items-center justify-center">
        <i class="fas fa-folder-open text-3xl text-slate-600 mb-2"></i>
        <p class="text-sm text-slate-500 font-mono-tech">Belum ada nilai yang diinput di Quarter manapun.</p>
      </div>`;
  }

  // Notification block (dark)
  let notifHtml = "";
  if (status !== "Tuntas" && hasAnyData) {
    notifHtml = `
      <div class="mt-4 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex gap-3">
        <div class="text-rose-400 mt-0.5"><i class="fas fa-exclamation-triangle text-xl"></i></div>
        <div>
          <h4 class="text-rose-300 font-bold text-sm">Ada Quarter belum Tuntas / Kosong!</h4>
          <p class="text-rose-400/70 text-xs font-mono-tech mt-1">Status belum tuntas karena ada nilai di bawah KKM (${kkm}).</p>
        </div>
      </div>`;
  } else if (status === "Tuntas") {
    notifHtml = `
      <div class="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex gap-3 justify-center items-center text-emerald-300 font-bold text-sm">
        <i class="fas fa-check-circle text-emerald-400 text-xl"></i> Semua Kriteria Telah Tuntas!
      </div>`;
  }

  const detail = document.getElementById("studentDetail");
  const awaitingText = document.getElementById("awaitingText");

  detail.innerHTML = `
    <div class="cyber-card rounded-2xl p-5 mb-6 w-full overflow-hidden">
      <div class="flex justify-between items-start mb-6 w-full">
        <div class="flex-1 min-w-0 pr-4">
          <h2 class="text-2xl font-black text-white leading-tight truncate">${escHtml(s.nama)}</h2>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-xs font-bold font-mono-tech">
              NIS: ${escHtml(s.nis || "-")}
            </span>
            <span class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs font-bold font-mono-tech">
              Kelas ${escHtml(s.kelas)}
            </span>
            <span class="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-xs font-bold font-mono-tech">
              KKM = ${kkm}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="openChangePasswordModal()"
            class="text-sm font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
            <i class="fas fa-key"></i><span class="hidden sm:inline font-mono-tech text-xs">Password</span>
          </button>
          <button onclick="closeStudentDetail()"
            class="text-slate-500 hover:text-rose-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose-500/10">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>
      </div>

      ${allTilesHtml}

      <div class="w-full h-72 lg:h-80 bg-[#0b1121] border border-white/5 rounded-xl p-2 relative overflow-hidden">
        <canvas id="studentRadarChart"></canvas>
      </div>

      ${notifHtml}
    </div>
  `;

  detail.classList.remove("hidden");
  document.getElementById("searchResults").classList.add("hidden");
  if (awaitingText) awaitingText.classList.add("hidden");

  renderRadarChart(quartersData, kkm);
}

function closeStudentDetail() {
  const awaitingText = document.getElementById("awaitingText");
  document.getElementById("studentDetail").classList.add("hidden");
  document.getElementById("searchResults").classList.remove("hidden");
  if (awaitingText) awaitingText.classList.remove("hidden");
}

function renderRadarChart(quartersData, kkm) {
  const labels = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
  const sumatifData = [0, 0, 0, 0];

  let globalMaxF = 0;
  for (let q = 1; q <= 4; q++) {
    if (quartersData[q].maxF > globalMaxF) globalMaxF = quartersData[q].maxF;
    sumatifData[q - 1] =
      quartersData[q].sum === "" ? null : Number(quartersData[q].sum);
  }

  const datasets = [];

  datasets.push({
    label: "Sumatif",
    data: sumatifData,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    borderColor: "rgba(99, 102, 241, 1)",
    pointBackgroundColor: "rgba(99, 102, 241, 1)",
    pointBorderColor: "#fff",
    pointBorderWidth: 2,
    pointRadius: 5,
    borderWidth: 2,
    fill: true,
    spanGaps: true,
  });

  const fColors = [
    "rgba(45, 212, 191, ",
    "rgba(251, 191, 36, ",
    "rgba(244, 63, 94, ",
    "rgba(168, 85, 247, ",
    "rgba(14, 165, 233, ",
    "rgba(132, 204, 22, ",
    "rgba(236, 72, 153, ",
  ];

  for (let i = 1; i <= globalMaxF; i++) {
    let fmData = [];
    let hasAnyVal = false;
    for (let q = 1; q <= 4; q++) {
      let val = quartersData[q].fmt[i];
      if (val !== undefined && val !== "") {
        fmData.push(Number(val));
        hasAnyVal = true;
      } else {
        fmData.push(null);
      }
    }
    if (!hasAnyVal) continue;

    let colorPrefix = fColors[(i - 1) % fColors.length];
    datasets.push({
      label: "Fmt " + i,
      data: fmData,
      backgroundColor: colorPrefix + "0.05)",
      borderColor: colorPrefix + "0.7)",
      pointBackgroundColor: colorPrefix + "0.9)",
      pointRadius: 3,
      borderWidth: 1.5,
      borderDash: [4, 4],
      fill: true,
      spanGaps: true,
    });
  }

  const kkmData = [kkm, kkm, kkm, kkm];
  datasets.push({
    label: "KKM (" + kkm + ")",
    data: kkmData,
    backgroundColor: "transparent",
    borderColor: "rgba(239, 68, 68, 0.4)",
    borderWidth: 2,
    borderDash: [5, 5],
    pointRadius: 0,
    fill: false,
  });

  const ctx = document.getElementById("studentRadarChart")?.getContext("2d");
  if (!ctx) return;

  if (radarChartCtx) radarChartCtx.destroy();

  radarChartCtx = new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: "rgba(255,255,255,0.05)" },
          grid: { color: "rgba(255,255,255,0.05)" },
          pointLabels: {
            font: {
              family: "'JetBrains Mono', monospace",
              size: 10,
              weight: "bold",
            },
            color: "#94a3b8",
          },
          ticks: {
            min: 0,
            max: 100,
            stepSize: 20,
            display: false,
            backdropColor: "transparent",
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#94a3b8",
            font: { size: 10, family: "'JetBrains Mono', monospace" },
            usePointStyle: true,
            boxWidth: 8,
          },
        },
      },
    },
  });
}
