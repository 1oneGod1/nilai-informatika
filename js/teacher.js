/* ========================================================
   teacher.js
   Hanya dijalankan di dashboard.html.
   Mengelola data siswa, tabel nilai, dan Panel Admin.
   ======================================================== */

let allSiswa = [];
let activeQuarter = 4; // Default ke Q4 untuk Sense, Decide, and Deliver with VEX IQ
let numFormatif = { 1: 2, 2: 2, 3: 2, 4: 2 }; // Default fields per quarter
let selectedLearningProgressStudent = null;

const GRADE10_UIUX_XP = {
  preTest: 80,
  section1: 120,
  section2: 100,
  postTest1: 100,
  figmaPreTest: 80,
  section3: 120,
  section4: 180,
  postTest2: 100,
};

const GRADE10_UIUX_TOTAL_XP = Object.values(GRADE10_UIUX_XP).reduce(
  (total, value) => total + value,
  0,
);

function isAdminEmailSafe(email) {
  if (typeof isAdminEmail === "function") return isAdminEmail(email);
  const normalized = String(email || "")
    .trim()
    .toLowerCase();
  return (
    normalized === "andi.purba@sdh.or.id" ||
    normalized === "pandapotanandi@gmail.com"
  );
}

function getTeacherStudentGrade(student) {
  const match = String(student?.kelas || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function teacherChecksComplete(saved, keys) {
  return Boolean(saved) && keys.every((key) => saved[key] === true);
}

function teacherSection1DiscoveryComplete(discovery) {
  if (!discovery || discovery.conceptDone !== true || discovery.exitCorrect !== true)
    return false;
  const foundZones = discovery.foundZones;
  if (Array.isArray(foundZones)) return new Set(foundZones).size >= 6;
  if (!foundZones || typeof foundZones !== "object") return false;
  return Object.values(foundZones).filter((value) => value === true).length >= 6;
}

function calculateGrade10UiUxProgress(progress = {}) {
  const section1 =
    teacherSection1DiscoveryComplete(progress.section1Discovery) &&
    Boolean(progress.websitePlan) &&
    teacherChecksComplete(progress.section1Checklist, [
      "reference",
      "structure",
      "fidelity",
      "journey",
    ]);
  const section2 =
    Boolean(progress.groupPlan) &&
    teacherChecksComplete(progress.section2Checklist, [
      "group",
      "file",
      "match",
      "responsive",
      "explain",
    ]);
  const section3State = progress.section3Progress || {};
  const section3Zones = section3State.zones || {};
  const section3 =
    section3State.environment === true &&
    section3State.route === true &&
    section3State.shortcut === true &&
    ["toolbar", "layers", "canvas", "inspector"].every(
      (key) => section3Zones[key] === true,
    );
  const section4State = progress.section4Workshop || {};
  const exploredTools = section4State.toolsExplored || {};
  const section4 =
    Boolean(section4State.framePreset) &&
    section4State.layerChallenge === true &&
    ["move", "frame", "shape", "pen", "text", "layers"].every(
      (key) => exploredTools[key] === true,
    ) &&
    Boolean(progress.figmaFoundationPlan) &&
    teacherChecksComplete(progress.section4Checklist, [
      "assignedGroup",
      "sharedFile",
      "frame",
      "objects",
      "layers",
      "explain",
    ]);

  const states = {
    preTest: Boolean(progress.preTest),
    section1,
    section2,
    postTest1: Boolean(progress.postTest),
    figmaPreTest: Boolean(progress.figmaPreTest),
    section3,
    section4,
    postTest2: Boolean(progress.postTest2),
  };
  const xp = Object.entries(GRADE10_UIUX_XP).reduce(
    (total, [key, points]) => total + (states[key] ? points : 0),
    0,
  );

  const section1Product = section1 ? 70 : 0;
  const section4Product = section4 ? 70 : 0;
  const post1Points = progress.postTest
    ? Number(progress.postTest.score || 0) * 0.3
    : 0;
  const post2Points = progress.postTest2
    ? Number(progress.postTest2.score || 0) * 0.3
    : 0;

  return {
    states,
    xp,
    percent: Math.round((xp / GRADE10_UIUX_TOTAL_XP) * 100),
    formative1:
      section1 && states.postTest1 ? section1Product + post1Points : null,
    formative2:
      section4 && states.postTest2 ? section4Product + post2Points : null,
    formative1Breakdown: { product: section1Product, postTest: post1Points },
    formative2Breakdown: { product: section4Product, postTest: post2Points },
  };
}

function formatTeacherProgressScore(value) {
  if (value === null || value === undefined) return "—";
  const rounded = Math.round(Number(value) * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function findLatestProgressTimestamp(value) {
  if (!value || typeof value !== "object") return 0;
  return Object.entries(value).reduce((latest, [key, child]) => {
    if (
      ["savedAt", "submittedAt", "updatedAt"].includes(key) &&
      Number.isFinite(Number(child))
    ) {
      return Math.max(latest, Number(child));
    }
    return Math.max(latest, findLatestProgressTimestamp(child));
  }, 0);
}

async function openStudentLearningProgress(studentId) {
  const student = allSiswa.find((item) => item.id === studentId);
  if (!student) {
    showAlert("Data siswa tidak ditemukan.", "danger");
    return;
  }

  selectedLearningProgressStudent = student;
  const modal = document.getElementById("learningProgressModal");
  const body = document.getElementById("learningProgressBody");
  const resetButton = document.getElementById("resetLearningProgressButton");
  document.getElementById("learningProgressTitle").textContent = student.nama;
  document.getElementById("learningProgressStudentMeta").textContent =
    `${student.nis || "NIS belum tersedia"} · ${student.kelas || "Kelas belum tersedia"}`;
  body.innerHTML = `
    <div class="py-14 text-center text-slate-500 font-mono-tech text-sm">
      <i class="fas fa-circle-notch fa-spin text-cyan-400 text-2xl mb-3 block"></i>
      Memuat progress siswa…
    </div>`;
  resetButton.disabled = true;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  if (getTeacherStudentGrade(student) !== 10) {
    body.innerHTML = `
      <div class="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-200">
        <strong class="block mb-2"><i class="fas fa-circle-info mr-2"></i>Materi belum tersedia</strong>
        <p class="text-sm text-amber-100/70">Progress UI/UX interaktif saat ini hanya digunakan oleh siswa Grade 10.</p>
      </div>`;
    return;
  }

  try {
    const snapshot = await db
      .ref("learningProgress")
      .child(student.id)
      .child("grade10UiUx")
      .once("value");
    renderStudentLearningProgress(snapshot.val() || {});
  } catch (error) {
    body.innerHTML = `
      <div class="rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-rose-200">
        <strong class="block mb-2"><i class="fas fa-triangle-exclamation mr-2"></i>Progress gagal dimuat</strong>
        <p class="text-sm text-rose-100/70">${escHtml(error.message || "Periksa koneksi lalu coba lagi.")}</p>
      </div>`;
  }
}

function renderStudentLearningProgress(progress) {
  const body = document.getElementById("learningProgressBody");
  const resetButton = document.getElementById("resetLearningProgressButton");
  const summary = calculateGrade10UiUxProgress(progress);
  const hasProgress = Object.keys(progress || {}).length > 0;
  const latestTimestamp = findLatestProgressTimestamp(progress);
  const latestLabel = latestTimestamp
    ? new Date(latestTimestamp).toLocaleString("id-ID")
    : "Belum ada aktivitas";
  const steps = [
    ["preTest", "Pre-test 1", progress.preTest?.score],
    ["section1", "Section 1 · Wireframe"],
    ["section2", "Section 2 · Figma Match"],
    ["postTest1", "Post-test 1", progress.postTest?.score],
    ["figmaPreTest", "Figma Pre-test", progress.figmaPreTest?.score],
    ["section3", "Section 3 · Figma Basics"],
    ["section4", "Section 4 · Toolbar Lab"],
    ["postTest2", "Post-test 2", progress.postTest2?.score],
  ];

  body.innerHTML = `
    <div class="grid md:grid-cols-[1.25fr_.75fr] gap-4 mb-5">
      <article class="rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-5">
        <div class="flex items-end justify-between gap-3 mb-3">
          <div><span class="text-[10px] font-mono-tech tracking-widest text-cyan-300">TOTAL EXPERIENCE</span><h3 class="text-3xl font-black text-white mt-1">${summary.xp} <small class="text-sm text-slate-500">/ ${GRADE10_UIUX_TOTAL_XP} XP</small></h3></div>
          <strong class="text-2xl text-lime-300">${summary.percent}%</strong>
        </div>
        <div class="h-2 rounded-full bg-slate-800 overflow-hidden"><span class="block h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-300" style="width:${summary.percent}%"></span></div>
        <p class="text-[11px] text-slate-500 font-mono-tech mt-3"><i class="fas fa-clock mr-1"></i> Aktivitas terakhir: ${escHtml(latestLabel)}</p>
      </article>
      <article class="grid grid-cols-2 gap-3">
        <div class="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4"><span class="text-[9px] text-emerald-300 font-mono-tech">RAPORT Q1 · FORMATIF 1</span><strong class="block text-2xl text-white mt-1">${formatTeacherProgressScore(summary.formative1)}</strong><small class="block text-slate-500 mt-1">Produk ${summary.formative1Breakdown.product}/70 + Post-test ${formatTeacherProgressScore(summary.formative1Breakdown.postTest)}/30</small></div>
        <div class="rounded-xl border border-violet-500/25 bg-violet-500/5 p-4"><span class="text-[9px] text-violet-300 font-mono-tech">RAPORT Q1 · FORMATIF 2</span><strong class="block text-2xl text-white mt-1">${formatTeacherProgressScore(summary.formative2)}</strong><small class="block text-slate-500 mt-1">Produk ${summary.formative2Breakdown.product}/70 + Post-test ${formatTeacherProgressScore(summary.formative2Breakdown.postTest)}/30</small></div>
      </article>
    </div>
    <div class="grid sm:grid-cols-2 gap-2.5">
      ${steps
        .map(([key, label, score]) => {
          const complete = summary.states[key] === true;
          const scoreLabel = Number.isFinite(Number(score)) ? `${Number(score)}%` : "";
          return `<article class="flex items-center gap-3 rounded-xl border ${complete ? "border-emerald-500/25 bg-emerald-500/5" : "border-slate-700 bg-slate-900/45"} p-3.5">
            <span class="grid w-9 h-9 shrink-0 place-items-center rounded-lg ${complete ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-600"}"><i class="fas ${complete ? "fa-check" : "fa-minus"}"></i></span>
            <div class="min-w-0 flex-1"><strong class="block text-sm ${complete ? "text-white" : "text-slate-400"}">${escHtml(label)}</strong><small class="text-[10px] font-mono-tech ${complete ? "text-emerald-400" : "text-slate-600"}">${complete ? "SELESAI" : "BELUM SELESAI"}</small></div>
            ${scoreLabel ? `<b class="text-sm text-cyan-300">${scoreLabel}</b>` : ""}
          </article>`;
        })
        .join("")}
    </div>
    ${
      hasProgress
        ? ""
        : `<div class="mt-5 rounded-xl border border-dashed border-slate-600 p-4 text-center text-sm text-slate-500">Siswa belum memulai kegiatan UI/UX.</div>`
    }`;
  resetButton.disabled = !hasProgress;
}

function closeStudentLearningProgress() {
  document.getElementById("learningProgressModal")?.classList.add("hidden");
  document.body.style.overflow = "";
  selectedLearningProgressStudent = null;
}

async function resetStudentLearningProgress() {
  const student = selectedLearningProgressStudent;
  if (!student || getTeacherStudentGrade(student) !== 10) return;
  const confirmed = confirm(
    `Reset seluruh progress UI/UX milik ${student.nama}?\n\nPre-test, post-test, checklist, file evidence, dan seluruh XP akan dihapus. Nilai serta akun siswa tidak ikut terhapus.`,
  );
  if (!confirmed) return;

  const button = document.getElementById("resetLearningProgressButton");
  const originalHtml = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Mereset…';
  try {
    await db
      .ref("learningProgress")
      .child(student.id)
      .child("grade10UiUx")
      .remove();
    renderStudentLearningProgress({});
    showAlert(
      `Progress UI/UX <strong>${escHtml(student.nama)}</strong> berhasil direset ke 0 XP.`,
      "success",
    );
  } catch (error) {
    button.disabled = false;
    showAlert("Gagal mereset progress: " + error.message, "danger");
  } finally {
    button.innerHTML = originalHtml;
  }
}

function setQuarter(q) {
  activeQuarter = q;
  // Update Tabs UI
  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById("btnQ" + i);
    if (btn)
      btn.className = `quarter-tab px-6 py-2.5 rounded-xl text-sm font-bold transition-all w-full sm:w-auto ${i === activeQuarter ? "active" : ""}`;
    if (btn)
      btn.innerHTML = `<i class="fas fa-cube mr-1 text-purple-400"></i> Q${i}`;
  }
  // Sync input value
  const inputNum = document.getElementById("numFormatif");
  if (inputNum) inputNum.value = numFormatif[activeQuarter];

  renderFormFormatifInputs();
  renderTableHead();
  renderTableBody(allSiswa);
  if (typeof syncAssessmentQuarter === "function") {
    syncAssessmentQuarter(activeQuarter);
  }
}

// G��G��G�� AUTHENTICATION CHECK G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
document.addEventListener("DOMContentLoaded", () => {
  const progressModal = document.getElementById("learningProgressModal");
  progressModal?.addEventListener("click", (event) => {
    if (event.target === progressModal) closeStudentLearningProgress();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !progressModal?.classList.contains("hidden")) {
      closeStudentLearningProgress();
    }
  });

  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html"; // Belum login G�� usir
      return;
    }

    // Cek status isVerified di Realtime Database
    guruRef
      .child(user.uid)
      .once("value")
      .then(async (snap) => {
        const data = snap.val() || {};
        const isAdminUtama =
          isAdminEmailSafe(user.email) || isAdminEmailSafe(data.email);

        if (isAdminUtama && (!data.isVerified || !data.emailVerified)) {
          await guruRef.child(user.uid).update({
            email: data.email || user.email || "",
            uid: user.uid,
            isVerified: true,
            emailVerified: true,
            verifiedAt: data.verifiedAt || Date.now(),
            verifiedBy: data.verifiedBy || "auto",
            emailVerifiedAt: data.emailVerifiedAt || Date.now(),
          });
          data.isVerified = true;
          data.emailVerified = true;
        }

        const hasAccess =
          (data.isVerified || isAdminUtama) &&
          (data.emailVerified || user.emailVerified || isAdminUtama);

        if (!hasAccess) {
          auth.signOut().then(() => {
            alert(
              "Akun belum memenuhi syarat verifikasi email/admin. Anda tidak bisa mengakses dashboard.",
            );
            window.location.href = "index.html";
          });
          return;
        }

        // Lulus verifikasi
        const displayEmail = data.email || user.email || "";

        // Update UI Header
        const userNameEl = document.getElementById("userNameDisplay");
        if (userNameEl) userNameEl.textContent = displayEmail;
        const roleBadge = document.getElementById("roleBadge");
        if (roleBadge) {
          if (isAdminUtama) {
            roleBadge.innerHTML = `<i class="fas fa-shield-alt mr-1"></i>Super Admin`;
            roleBadge.className =
              "bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase hidden sm:flex items-center gap-1.5";
          } else {
            roleBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>Guru`;
          }
        }

        // Tampilkan Admin Panel jika Admin Utama
        if (isAdminUtama) {
          try {
            loadAdminPanel(displayEmail);
          } catch (e) {
            console.warn(e);
          }
        }

        // Mulai fitur Dashboard
        renderFormFormatifInputs();
        renderTableHead();
        listenToSiswaData();
      });
  });
});

// G��G��G�� SETTINGS FORMATIF G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
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
  showAlert(
    `Pengaturan diterapkan: ${val} kolom Formatif untuk Quarter ${activeQuarter}.`,
    "success",
  );
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

// G��G��G�� REALTIME LISTENER SISWA G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
function listenToSiswaData() {
  siswaRef.on(
    "value",
    (snap) => {
      allSiswa = [];
      const data = snap.val();
      let madeChanges = false;
      let updates = {};

      if (data) {
        Object.entries(data).forEach(([id, val]) => {
          // Cek migrasi data lama ke Q3
          let needsMigration = false;
          for (let i = 1; i <= 10; i++) {
            if (val["formatif" + i] !== undefined) {
              updates[`${id}/q3_f${i}`] = val["formatif" + i];
              updates[`${id}/formatif${i}`] = null;
              needsMigration = true;
            }
          }
          if (val["sumatif"] !== undefined) {
            updates[`${id}/q3_sumatif`] = val["sumatif"];
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
      if (typeof refreshAssessmentStudentOptions === "function") {
        refreshAssessmentStudentOptions();
      }
    },
    (err) => {
      showAlert("Gagal memuat data Firebase: " + err.message, "danger");
    },
  );
}

// G��G��G�� ADD SISWA G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
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
    nis,
    nama,
    kelas,
    password: pwd,
    createdAt: Date.now(),
  };

  record[`q${activeQuarter}_sumatif`] = sumatif !== "" ? Number(sumatif) : "";

  for (let i = 1; i <= numFormatif[activeQuarter]; i++) {
    const el = document.getElementById("formatif" + i);
    const v = el ? el.value.trim() : "";
    record[`q${activeQuarter}_f${i}`] = v !== "" ? Number(v) : "";
  }

  siswaRef
    .push(record)
    .then(() => {
      showAlert(
        `Siswa <strong>${escHtml(nama)}</strong> berhasil ditambahkan.`,
        "success",
      );
      document.getElementById("addForm").reset();
    })
    .catch((err) => showAlert("Gagal menyimpan: " + err.message, "danger"));
}

// G��G��G�� EDIT & DELETE SISWA G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
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

  updated[`q${activeQuarter}_sumatif`] =
    sumatifEl && sumatifEl.value.trim() !== ""
      ? Number(sumatifEl.value.trim())
      : "";

  for (let i = 1; i <= numFormatif[activeQuarter]; i++) {
    const el = document.getElementById("r-f" + i + "-" + id);
    const v = el ? el.value.trim() : "";
    updated[`q${activeQuarter}_f${i}`] = v !== "" ? Number(v) : "";
  }

  siswaRef
    .child(id)
    .update(updated)
    .then(() =>
      showAlert(
        `Data <strong>${escHtml(siswa.nama)}</strong> berhasil diperbarui.`,
        "success",
      ),
    )
    .catch((err) => showAlert("Gagal menyimpan: " + err.message, "danger"));
}

function deleteSiswa(id, nama) {
  if (!confirm(`Hapus data siswa "${nama}"? Semua datanya akan hilang total.`))
    return;
  siswaRef
    .child(id)
    .remove()
    .then(() =>
      showAlert(`Siswa <strong>${escHtml(nama)}</strong> dihapus.`, "success"),
    )
    .catch((err) => showAlert("Gagal menghapus: " + err.message, "danger"));
}

// G��G��G�� RENDER TABLE BODY (CRUD) G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
const TH_CYAN =
  "px-4 py-4 text-center text-cyan-500/80 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap";
const TH_INDIGO =
  "px-4 py-4 text-center text-indigo-400/80 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap";
const TH =
  "px-4 py-4 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap";
const TH_LEFT =
  "px-4 py-4 text-left text-slate-400 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap";

function renderTableHead() {
  let fCols = "";
  for (let i = 1; i <= numFormatif[activeQuarter]; i++)
    fCols += `<th class="${TH_CYAN}">Q${activeQuarter} - F${i}</th>`;

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
  el.className =
    v !== "" && Number(v) < kkm ? "table-input input-remedial" : "table-input";
}

function filterTable() {
  renderTableBody(allSiswa);
}

function renderTableBody(data) {
  const tbody = document.getElementById("tableBody");
  if (!tbody) return;

  // Filter Kelas Dropdown
  const selFilter = document.getElementById("filterKelas");
  const currentKelas = selFilter?.value || "";
  if (selFilter) {
    const listKelas = [...new Set((data || []).map((s) => s.kelas))].sort(
      (a, b) => {
        const na = parseInt(a.match(/\d+/)?.[0] || 0);
        const nb = parseInt(b.match(/\d+/)?.[0] || 0);
        return na !== nb ? na - nb : a.localeCompare(b);
      },
    );
    selFilter.innerHTML =
      `<option value="">Semua Kelas</option>` +
      listKelas
        .map(
          (k) =>
            `<option value="${escHtml(k)}"${k === currentKelas ? " selected" : ""}>${escHtml(k)}</option>`,
        )
        .join("");
  }

  // Search Text
  const searchVal = (
    document.getElementById("teacherSearch")?.value || ""
  ).toLowerCase();

  const filtered = data.filter((s) => {
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

  tbody.innerHTML = filtered
    .map((s, idx) => {
      const kkm = getKKM(s.kelas);
      const fArr = [];
      for (let i = 1; i <= numFormatif[activeQuarter]; i++) {
        fArr.push(
          s[`q${activeQuarter}_f${i}`] !== undefined
            ? s[`q${activeQuarter}_f${i}`]
            : "",
        );
      }

      // Status Logic
      const avgF = fArr.some((v) => v !== "")
        ? fArr.reduce((a, b) => a + Number(b || 0), 0) /
          fArr.filter((v) => v !== "").length
        : 0;
      const sumatifValue = s[`q${activeQuarter}_sumatif`];
      const finalScore = avgF * 0.4 + Number(sumatifValue || 0) * 0.6;
      let status = finalScore >= kkm ? "Tuntas" : "Remedial";
      if (
        fArr.every((v) => v === "") &&
        (sumatifValue === "" || sumatifValue === undefined)
      )
        status = "Susulan";

      // Build Inputs
      let fInputs = "";
      for (let i = 0; i < numFormatif[activeQuarter]; i++) {
        const val = fArr[i];
        const num =
          val !== "" && val !== null && val !== undefined ? Number(val) : "";
        const cls =
          num !== "" && num < kkm
            ? "table-input input-remedial"
            : "table-input";
        fInputs += `
        <td class="px-2 py-3">
          <input type="number" min="0" max="100" class="${cls}" id="r-f${i + 1}-${s.id}" value="${num}" placeholder="-" oninput="highlightScore(this,${kkm})" />
        </td>`;
      }

      const sumatifVal =
        sumatifValue !== "" &&
        sumatifValue !== null &&
        sumatifValue !== undefined
          ? Number(sumatifValue)
          : "";
      const sCls =
        sumatifVal !== "" && sumatifVal < kkm
          ? "table-input input-remedial"
          : "table-input";

      // NIS Editable
      const nisEditable = `<input type="text" class="table-input" style="width:100%; text-align:left;" id="r-nis-${s.id}" value="${escHtml(s.nis || "")}" placeholder="NIS" />`;

      // Password Editable & Pending Password Request
      let passwordHTML = `<div class="flex items-center gap-2 w-full max-w-[150px]"><input type="text" class="table-input" style="text-align:left;" id="r-pwd-${s.id}" value="${escHtml(s.password || "Sph12345!")}" placeholder="Password" /></div>`;

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
        dotCls = "bg-emerald-500";
        chipLabel = "Tuntas";
        animateDot = "";
        chipCls =
          "inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider";
      } else if (status === "Remedial") {
        dotCls = "bg-rose-500";
        chipLabel = "Remedial";
        animateDot = "animate-pulse";
        chipCls =
          "inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider";
      } else {
        dotCls = "bg-amber-500";
        chipLabel = "Susulan";
        animateDot = "animate-pulse";
        chipCls =
          "inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider";
      }
      const statusChip = `<span class="${chipCls}"><span class="w-1.5 h-1.5 rounded-full ${dotCls} flex-shrink-0 ${animateDot}"></span>${chipLabel}</span>`;
      const studentNameCell =
        getTeacherStudentGrade(s) === 10
          ? `<button type="button" onclick="openStudentLearningProgress('${escHtml(s.id)}')" class="group/name text-left rounded-lg px-2 py-1.5 -mx-2 hover:bg-cyan-500/10 transition-colors" title="Lihat dan reset progress UI/UX">
              <strong class="block text-slate-200 group-hover/name:text-cyan-300 transition-colors">${escHtml(s.nama)}</strong>
              <small class="block text-[9px] text-cyan-500/70 font-mono-tech mt-0.5"><i class="fas fa-chart-line mr-1"></i>LIHAT PROGRESS</small>
            </button>`
          : `<span class="font-bold text-slate-200">${escHtml(s.nama)}</span>`;

      return `
      <tr id="row-${s.id}" class="hover:bg-slate-800/50 transition-colors group">
        <td class="px-3 py-3 text-center text-slate-500 font-mono-tech text-sm">${idx + 1}</td>
        <td class="px-3 py-3 font-mono-tech text-sm w-[120px]">${nisEditable}</td>
        <td class="px-3 py-3 whitespace-nowrap">${studentNameCell}</td>
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
    })
    .join("");
}

function approveStudentPassword(id) {
  const siswa = allSiswa.find((s) => s.id === id);
  if (!siswa || !siswa.pendingPassword) return;

  if (!confirm(`Setujui pengajuan password baru untuk ${siswa.nama}?`)) return;

  siswaRef
    .child(id)
    .update({
      password: siswa.pendingPassword,
      pendingPassword: null,
      pendingPasswordAt: null,
    })
    .then(() => {
      showAlert("Password baru berhasil disetujui", "success");
    })
    .catch((err) => {
      showAlert("Gagal menyetujui password: " + err.message, "danger");
    });
}

function rejectStudentPassword(id) {
  const siswa = allSiswa.find((s) => s.id === id);
  if (!siswa || !siswa.pendingPassword) return;

  if (!confirm(`Tolak pengajuan password dari ${siswa.nama}?`)) return;

  siswaRef
    .child(id)
    .update({
      pendingPassword: null,
      pendingPasswordAt: null,
    })
    .then(() => {
      showAlert("Pengajuan password ditolak", "info");
    })
    .catch((err) => {
      showAlert("Gagal menolak pengajuan: " + err.message, "danger");
    });
}

// G��G��G�� ADMIN PANEL (SUPER ADMIN ONLY) G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
let activeAdminEmail = "";

function loadAdminPanel(adminEmail) {
  activeAdminEmail = adminEmail;
  const adminPanelBtn = document.getElementById("adminPanelBtn");
  if (adminPanelBtn) adminPanelBtn.style.display = ""; // Munculkan accordion admin
  const deleteAllStudentsBtn = document.getElementById("deleteAllStudentsBtn");
  if (deleteAllStudentsBtn) deleteAllStudentsBtn.style.display = "inline-flex";

  guruRef.on(
    "value",
    (snap) => {
      const allGuru = snap.val() || {};
      const pendingGuru = Object.entries(allGuru)
        .filter(([uid, data]) => {
          if (!data || typeof data !== "object") return false;
          const email = String(data.email || "");
          const isVerifiedStrict = data.isVerified === true;
          return !isVerifiedStrict && !isAdminEmailSafe(email);
        })
        .map(([uid, data]) => ({ uid, ...data }))
        .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));

      renderAdminPanel(pendingGuru);
    },
    (err) => console.error("AdminPanel Listen Error:", err),
  );
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

  container.innerHTML = pendingGuru
    .map(
      (guru) => `
    <div class="flex items-center justify-between gap-3 p-4 bg-slate-900/60 border-b border-slate-700/50 hover:bg-slate-800/60 transition-colors">
      <div class="flex-1 min-w-0">
        <p class="font-bold text-sm text-slate-200">${escHtml(guru.email || "(email tidak tersedia)")}</p>
        <p class="text-xs text-slate-500 font-mono-tech mt-1">
          <i class="fas fa-clock mr-1"></i> Register: ${guru.createdAt ? new Date(guru.createdAt).toLocaleString("id-ID") : "-"}
        </p>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <button onclick="verifyGuruAccount('${escHtml(guru.uid)}')"\n          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20">\n          <i class="fas fa-check mr-1"></i>Approve\n        </button>
        <button onclick="rejectGuruAccount('${escHtml(guru.uid)}')"\n          class="px-4 py-2 bg-slate-800 hover:bg-rose-900/50 text-rose-400 border border-slate-700 hover:border-rose-500/50 text-xs font-bold rounded-lg transition-colors">\n          <i class="fas fa-times mr-1"></i>Reject\n        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

function verifyGuruAccount(uid) {
  if (!confirm("Approve akun guru ini?")) return;
  guruRef
    .child(uid)
    .update({
      isVerified: true,
      verifiedAt: Date.now(),
      verifiedBy: activeAdminEmail,
    })
    .then(() => showAlert("Akun guru berhasil di-approve!", "success"))
    .catch((err) => showAlert("Gagal: " + err.message, "danger"));
}

function rejectGuruAccount(uid) {
  if (!confirm("Tolak (Hapus) akun guru ini permanen?")) return;
  guruRef
    .child(uid)
    .remove()
    .then(() => showAlert("Akun guru ditolak dan dihapus permanen.", "info"))
    .catch((err) => showAlert("Gagal: " + err.message, "danger"));
}

// G��G��G�� LOGOUT GURU G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
async function deleteAllStudentData() {
  const button = document.getElementById("deleteAllStudentsBtn");
  const currentEmail = String(auth.currentUser?.email || activeAdminEmail || "")
    .trim()
    .toLowerCase();

  if (!auth.currentUser || !isAdminEmailSafe(currentEmail)) {
    showAlert("Hanya Super Admin yang dapat menghapus semua data siswa.", "danger");
    return;
  }

  const totalStudents = allSiswa.length;
  if (totalStudents === 0) {
    showAlert("Tidak ada data siswa yang perlu dihapus.", "info");
    return;
  }

  const firstConfirmation = window.confirm(
    `Anda akan menghapus ${totalStudents} siswa beserta seluruh nilai, password, dan rubriknya. Data ini tidak dapat dipulihkan. Lanjutkan?`,
  );
  if (!firstConfirmation) return;

  const verificationPhrase = `HAPUS ${totalStudents} SISWA`;
  const typedPhrase = window.prompt(
    `Untuk mengonfirmasi, ketik persis:\n${verificationPhrase}`,
    "",
  );

  if (typedPhrase !== verificationPhrase) {
    showAlert("Frasa verifikasi tidak sesuai. Penghapusan dibatalkan.", "warning");
    return;
  }

  const finalConfirmation = window.confirm(
    `Konfirmasi terakhir: hapus permanen seluruh ${totalStudents} data siswa sekarang?`,
  );
  if (!finalConfirmation) return;

  const originalHtml = button?.innerHTML || "";
  if (button) {
    button.disabled = true;
    button.innerHTML =
      '<i class="fas fa-circle-notch fa-spin"></i> Menghapus data…';
  }

  try {
    await siswaRef.remove();
    showAlert(
      `${totalStudents} data siswa berhasil dihapus. Daftar siswa sekarang kosong dan siap diisi dengan data terbaru.`,
      "success",
    );
  } catch (error) {
    showAlert("Gagal menghapus semua data siswa: " + error.message, "danger");
  } finally {
    if (button) {
      button.disabled = false;
      button.innerHTML = originalHtml;
    }
  }
}

window.deleteAllStudentData = deleteAllStudentData;

function logoutGuru() {
  auth
    .signOut()
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((err) => alert("Gagal logout: " + err.message));
}

// G��G��G�� EXCEL FEATURES (EXPORT, IMPORT, TEMPLATE) G��G��G��G��G��G��G��G��G��G��G��G��
function exportExcel() {
  const selFilter = document.getElementById("filterKelas");
  const currentKelas = selFilter?.value || "";
  const searchVal = (
    document.getElementById("teacherSearch")?.value || ""
  ).toLowerCase();

  const filteredSiswa = allSiswa.filter((s) => {
    const matchName = s.nama.toLowerCase().includes(searchVal);
    const matchKelas = currentKelas ? s.kelas === currentKelas : true;
    return matchName && matchKelas;
  });

  if (filteredSiswa.length === 0)
    return showAlert(
      "Tidak ada data untuk diekspor sesuai filter saat ini.",
      "warning",
    );

  const headers = ["No", "NIS", "Nama Siswa", "Kelas", "Password"];
  for (let i = 1; i <= numFormatif[activeQuarter]; i++)
    headers.push(`Formatif ${i}`);
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
      const finalScore = avgF * 0.4 + Number(sVal || 0) * 0.6;
      status = finalScore >= kkm ? "Tuntas" : "Remedial";
    }
    row.push(status);
    row.push(kkm);
    return row;
  });

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = [
    { wch: 5 },
    { wch: 12 },
    { wch: 28 },
    { wch: 12 },
    { wch: 15 },
    ...Array(numFormatif[activeQuarter]).fill({ wch: 10 }),
    { wch: 10 },
    { wch: 10 },
    { wch: 6 },
  ];
  const wb = XLSX.utils.book_new();
  const sheetName = currentKelas
    ? `Data Q${activeQuarter} ${currentKelas}`
    : `Data Nilai Q${activeQuarter}`;
  XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31)); // excel sheet names max 31 chars

  const fileNameClass = currentKelas ? `_${currentKelas}` : "";
  XLSX.writeFile(
    wb,
    `Database_Nilai_Q${activeQuarter}${fileNameClass}_` +
      new Date().toISOString().slice(0, 10) +
      ".xlsx",
  );
  showAlert(
    `Export Excel Quarter ${activeQuarter} berhasil diunduh.`,
    "success",
  );
}

function downloadTemplate() {
  const selFilter = document.getElementById("filterKelas");
  const currentKelas = selFilter?.value || "";
  const searchVal = (
    document.getElementById("teacherSearch")?.value || ""
  ).toLowerCase();

  const filteredSiswa = allSiswa.filter((s) => {
    const matchName = s.nama.toLowerCase().includes(searchVal);
    const matchKelas = currentKelas ? s.kelas === currentKelas : true;
    return matchName && matchKelas;
  });

  const headers = ["NIS", "Nama Siswa", "Kelas", "Password"];
  for (let i = 1; i <= numFormatif[activeQuarter]; i++)
    headers.push(`Formatif ${i}`);
  headers.push("Sumatif");

  let rows;
  if (filteredSiswa.length > 0) {
    // Pre-fill dengan daftar siswa yang sedang ditampilkan; kolom nilai dikosongkan untuk diisi
    rows = filteredSiswa.map((s) => {
      const row = [s.nis || "", s.nama, s.kelas, s.password || ""];
      for (let i = 0; i < numFormatif[activeQuarter]; i++) row.push("");
      row.push("");
      return row;
    });
  } else {
    // Fallback: tidak ada siswa terfilter, sediakan satu baris contoh
    const example = ["12345678", "Contoh Nama", "10 RPL 1", "SandiKuat123!"];
    for (let i = 0; i < numFormatif[activeQuarter]; i++) example.push(75);
    example.push(85);
    rows = [example];
  }

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = [
    { wch: 15 },
    { wch: 25 },
    { wch: 12 },
    { wch: 20 },
    ...Array(numFormatif[activeQuarter]).fill({ wch: 10 }),
    { wch: 10 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template Import");

  const fileNameClass = currentKelas ? `_${currentKelas.replace(/\s+/g, "")}` : "";
  XLSX.writeFile(
    wb,
    `Template_Import_Nilai_Q${activeQuarter}${fileNameClass}.xlsx`,
  );
  showAlert(
    filteredSiswa.length > 0
      ? `Template Q${activeQuarter} berisi ${filteredSiswa.length} siswa${currentKelas ? " kelas " + currentKelas : ""} berhasil diunduh.`
      : `Template Excel Quarter ${activeQuarter} berhasil diunduh.`,
    "success",
  );
}

function triggerImport() {
  document.getElementById("importFileExcel").click();
}

function importExcel(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

      if (rows.length < 2) return showAlert("File Excel kosong.", "warning");

      const head = rows[0].map((h) => String(h).trim().toLowerCase());
      const iNis = head.findIndex((h) => h.includes("nis"));
      const iNama = head.findIndex((h) => h.includes("nama"));
      const iKelas = head.findIndex((h) => h.includes("kelas"));
      const iPwd = head.findIndex((h) => h.includes("password"));
      const iSumat = head.findIndex((h) => h.includes("sumatif"));

      const qCols = [];
      for (let i = 1; i <= 10; i++) {
        qCols.push(
          head.findIndex(
            (h) => h.includes(`formatif ${i}`) || h.includes(`f${i}`),
          ),
        );
      }

      if (iNama === -1 || iKelas === -1) {
        return showAlert(
          "Format salah! Harus ada kolom Nama Siswa dan Kelas.",
          "danger",
        );
      }

      const batch = {};
      let updated = 0;
      let created = 0;

      rows.slice(1).forEach((r) => {
        if (!r.some((c) => c !== "")) return; // skip row kosong
        const nis = String(r[iNis] || "").trim();
        const nama = String(r[iNama] || "").trim();
        const kelas = String(r[iKelas] || "").trim();
        const pwd = iPwd >= 0 ? String(r[iPwd] || "").trim() : "";
        if (!nama || !kelas) return;

        // Cocokkan dengan siswa yang sudah ada: utamakan NIS, lalu nama+kelas
        const existing = allSiswa.find((s) => {
          if (nis && s.nis) return String(s.nis).trim() === nis;
          return (
            s.nama.trim().toLowerCase() === nama.toLowerCase() &&
            s.kelas.trim() === kelas
          );
        });

        // Kumpulkan nilai dari baris template
        const scores = {};
        if (iSumat >= 0 && r[iSumat] !== "" && r[iSumat] !== null)
          scores[`q${activeQuarter}_sumatif`] = Number(r[iSumat]);
        qCols.forEach((colIdx, arrIdx) => {
          if (colIdx >= 0 && r[colIdx] !== "" && r[colIdx] !== null)
            scores[`q${activeQuarter}_f${arrIdx + 1}`] = Number(r[colIdx]);
        });

        if (existing) {
          // UPDATE: hanya ubah nilai siswa yang ada, jangan timpa password/nama
          Object.keys(scores).forEach((field) => {
            batch[`${existing.id}/${field}`] = scores[field];
          });
          // Isi NIS bila sebelumnya kosong
          if (nis && !existing.nis) batch[`${existing.id}/nis`] = nis;
          updated++;
        } else {
          // CREATE: siswa baru butuh password valid (min 6 karakter)
          if (pwd.length < 6) return; // lewati: rule database menolak password pendek
          const key = siswaRef.push().key;
          batch[`${key}/nis`] = nis;
          batch[`${key}/nama`] = nama;
          batch[`${key}/kelas`] = kelas;
          batch[`${key}/password`] = pwd;
          batch[`${key}/createdAt`] = Date.now();
          Object.keys(scores).forEach((field) => {
            batch[`${key}/${field}`] = scores[field];
          });
          created++;
        }
      });

      const count = updated + created;
      if (count === 0)
        return showAlert(
          "Tidak ada baris valid untuk diimpor. Pastikan nama/kelas sesuai siswa terdaftar.",
          "warning",
        );

      db.ref("siswa")
        .update(batch)
        .then(() => {
          const parts = [];
          if (updated) parts.push(`${updated} nilai diperbarui`);
          if (created) parts.push(`${created} siswa baru`);
          showAlert(
            `Import sukses (Quarter ${activeQuarter}): ${parts.join(", ")}.`,
            "success",
          );
        });
    } catch (err) {
      showAlert("Gagal membaca Excel: " + err.message, "danger");
    } finally {
      event.target.value = ""; // Reset file input
    }
  };
  reader.readAsArrayBuffer(file);
}
