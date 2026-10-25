/* ========================================================
   teacher-assessment.js
   Workspace assessment Grade 7, Grade 8, Grade 9, Grade 11, dan Grade 12 per quarter.
   ======================================================== */

const dcTeacherState = {
  studentId: "",
  grade: 9,
  quarter: 4,
  selectedAssessmentId: "",
  draft: dcCreateEmptyDraft(4, 9),
  dirty: false,
  saving:false,
};

document.addEventListener("DOMContentLoaded", () => {
  const studentSelect = document.getElementById("dcAssessmentStudent");
  const gradeSelect = document.getElementById("dcAssessmentGrade");
  const periodSelect = document.getElementById("dcAssessmentPeriod");
  if (!studentSelect || !gradeSelect || !periodSelect) return;

  dcTeacherState.grade = Number(gradeSelect.value || 9);
  dcTeacherState.quarter = Number(activeQuarter || 4);
  dcTeacherState.draft = dcCreateEmptyDraft(
    dcTeacherState.quarter,
    dcTeacherState.grade,
  );
  periodSelect.value = String(dcTeacherState.quarter);

  gradeSelect.addEventListener("change", () => {
    changeDcAssessmentGrade(Number(gradeSelect.value));
  });

  studentSelect.addEventListener("change", () => {
    if(dcTeacherState.saving){studentSelect.value=dcTeacherState.studentId;return;}
    const nextStudentId = studentSelect.value;
    if (
      dcTeacherState.dirty &&
      nextStudentId !== dcTeacherState.studentId &&
      !window.confirm("Perubahan penilaian belum disimpan. Tetap ganti siswa?")
    ) {
      studentSelect.value = dcTeacherState.studentId;
      return;
    }
    dcTeacherState.studentId = nextStudentId;
    loadDcAssessmentDraft();
  });

  periodSelect.addEventListener("change", () => {
    setQuarter(Number(periodSelect.value));
  });

  window.addEventListener("beforeunload", (event) => {
    if (!dcTeacherState.dirty) return;
    event.preventDefault();
    event.returnValue = "";
  });

  renderDcAssessmentPanel();
});

function getCurrentDcCourse() {
  return dcGetCourseConfig(dcTeacherState.quarter, dcTeacherState.grade);
}

function isAiFormativeWorkspace(){return dcTeacherState.grade===11&&dcTeacherState.quarter===2;}
function isReviewedProjectWorkspace(){return isAiFormativeWorkspace()||getCurrentDcCourse()?.reviewedFormativeOnly===true;}
function dcVisibleAssessmentItems(){const items=dcGetAssessmentItems(dcTeacherState.quarter,dcTeacherState.grade);return isAiFormativeWorkspace()?items.filter(a=>/^g11AiFormative[123]$/.test(a.id)):items;}

function ensureDcSelectedAssessment() {
  const items = dcVisibleAssessmentItems();
  if (!items.some((item) => item.id === dcTeacherState.selectedAssessmentId)) {
    dcTeacherState.selectedAssessmentId = items[0]?.id || "";
  }
}

function changeDcAssessmentGrade(grade) {
  if(dcTeacherState.saving)return;
  const nextGrade = Number(grade || 9);
  const gradeSelect = document.getElementById("dcAssessmentGrade");
  if (!DC_COURSES_BY_GRADE[nextGrade]) return;
  if (
    dcTeacherState.dirty &&
    nextGrade !== dcTeacherState.grade &&
    !window.confirm("Perubahan penilaian belum disimpan. Tetap ganti kelas?")
  ) {
    if (gradeSelect) gradeSelect.value = String(dcTeacherState.grade);
    return;
  }

  dcTeacherState.grade = nextGrade;
  dcTeacherState.studentId = "";
  dcTeacherState.selectedAssessmentId = "";
  dcTeacherState.dirty = false;

  if (!dcGetCourseConfig(dcTeacherState.quarter, nextGrade)) {
    const firstQuarter = [1, 2, 3, 4].find((quarter) => dcGetCourseConfig(quarter, nextGrade)?.preferredForTeacher === true) || [1, 2, 3, 4].find((quarter) =>
      dcGetCourseConfig(quarter, nextGrade),
    );
    if (firstQuarter) setQuarter(firstQuarter);
  }

  if (typeof ensureFormativeColumnCountForGrade === "function") {
    ensureFormativeColumnCountForGrade(
      dcTeacherState.grade,
      dcTeacherState.quarter,
    );
  }
  refreshAssessmentStudentOptions();
}

function syncAssessmentQuarter(quarter) {
  if(dcTeacherState.saving)return;
  const nextQuarter = Number(quarter || 1);
  if (
    dcTeacherState.dirty &&
    nextQuarter !== dcTeacherState.quarter &&
    !window.confirm("Perubahan penilaian belum disimpan. Tetap ganti periode?")
  ) {
    setQuarter(dcTeacherState.quarter);
    return;
  }
  if (nextQuarter !== dcTeacherState.quarter) {
    dcTeacherState.dirty = false;
  }
  dcTeacherState.quarter = nextQuarter;
  const select = document.getElementById("dcAssessmentPeriod");
  if (select) select.value = String(dcTeacherState.quarter);
  if (!dcTeacherState.dirty) loadDcAssessmentDraft();
  if (typeof ensureFormativeColumnCountForGrade === "function") {
    ensureFormativeColumnCountForGrade(
      dcTeacherState.grade,
      dcTeacherState.quarter,
    );
  }
}

function refreshAssessmentStudentOptions() {
  const select = document.getElementById("dcAssessmentStudent");
  if (!select) return;

  const previousValue = dcTeacherState.studentId || select.value;
  const grouped = {};
  const assessmentStudents = allSiswa.filter((student) =>
    dcIsAssessmentGrade(student.kelas, dcTeacherState.grade),
  );

  assessmentStudents.forEach((student) => {
    const className = String(student.kelas || "Tanpa kelas");
    if (!grouped[className]) grouped[className] = [];
    grouped[className].push(student);
  });

  let options = assessmentStudents.length
    ? `<option value="">Pilih siswa kelas ${dcTeacherState.grade}…</option>`
    : `<option value="">Belum ada siswa kelas ${dcTeacherState.grade}</option>`;
  Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b, "id"))
    .forEach((className) => {
      options += `<optgroup label="${escHtml(className)}">`;
      grouped[className].forEach((student) => {
        options += `<option value="${escHtml(student.id)}">${escHtml(student.nama)} · ${escHtml(student.nis || "NIS belum ada")}</option>`;
      });
      options += "</optgroup>";
    });

  select.innerHTML = options;
  if (
    previousValue &&
    assessmentStudents.some((student) => student.id === previousValue)
  ) {
    select.value = previousValue;
    dcTeacherState.studentId = previousValue;
  } else {
    dcTeacherState.studentId = "";
  }
  if (!dcTeacherState.dirty) loadDcAssessmentDraft();
}

function loadDcAssessmentDraft() {
  const student = allSiswa.find((item) => item.id === dcTeacherState.studentId);
  const stored =
    student?.digitalCitizenshipAssessment?.[`q${dcTeacherState.quarter}`];
  dcTeacherState.draft = dcDraftFromStored(
    stored,
    dcTeacherState.quarter,
    dcTeacherState.grade,
  );
  if (dcTeacherState.draft.reviewed && !dcTeacherState.draft.previousGradebook) {
    dcTeacherState.draft.previousGradebook = Object.fromEntries(Object.entries(student || {}).filter(([key]) => /^q2_(f\d+|sumatif)$/.test(key)));
  }
  dcTeacherState.dirty = false;
  ensureDcSelectedAssessment();
  renderDcAssessmentPanel();
}

function dcSelectAssessment(assessmentId) {
  if(dcTeacherState.saving)return;
  dcTeacherState.selectedAssessmentId = assessmentId;
  renderDcAssessmentPanel();
}

function dcSetCriterionScore(assessmentId, criterionId, maximum, value, render = true) {
  if(dcTeacherState.saving)return;
  const assessmentDraft = dcTeacherState.draft.rubricScores[assessmentId];
  if (!assessmentDraft) return;
  const numericValue = Math.min(maximum, Math.max(0, Number(value) || 0));
  assessmentDraft.criteria[criterionId] = numericValue;
  if (dcTeacherState.draft.reviewed) dcTeacherState.draft.reviewed[assessmentId] = false;
  dcTeacherState.dirty = true;
  if(render)renderDcAssessmentPanel();
  else {
    const reviewedInput=document.querySelector?.('input[data-assessment="'+assessmentId+'"]');
    if(reviewedInput)reviewedInput.checked=false;
    const pointsInput=document.querySelector?.('input[data-score="'+assessmentId+'/'+criterionId+'"]');
    const criterionRow=pointsInput?.closest('.dc-criterion-row');
    if(criterionRow){criterionRow.classList.toggle('is-complete',numericValue===maximum);criterionRow.querySelector('input[type="checkbox"]').checked=numericValue===maximum;}
    const summary=dcCalculateSummary(dcTeacherState.draft,dcTeacherState.quarter,dcTeacherState.grade);
    renderDcSummary(summary,allSiswa.find(s=>s.id===dcTeacherState.studentId));
    renderDcAssessmentNav(summary);
    updateDcSaveState();
  }
}

function dcToggleCriterion(assessmentId, criterionId, maximum, checked) {
  dcSetCriterionScore(assessmentId, criterionId, maximum, checked ? maximum : 0);
}

function dcSetAssessmentNote(assessmentId, value) {
  if(dcTeacherState.saving)return;
  const assessmentDraft = dcTeacherState.draft.rubricScores[assessmentId];
  if (!assessmentDraft) return;
  assessmentDraft.note = String(value || "");
  dcTeacherState.dirty = true;
  updateDcSaveState();
}

function dcToggleQuizAnswer(index, checked) {
  if(dcTeacherState.saving)return;
  if (!Array.isArray(dcTeacherState.draft.quizAnswers)) return;
  dcTeacherState.draft.quizAnswers[index] = Boolean(checked);
  dcTeacherState.dirty = true;
  renderDcAssessmentPanel();
}

function dcSetQuizNote(value) {
  if(dcTeacherState.saving)return;
  dcTeacherState.draft.quizNote = String(value || "");
  dcTeacherState.dirty = true;
  updateDcSaveState();
}

function renderDcWorkspaceMeta() {
  const course = getCurrentDcCourse();
  const eyebrow = document.getElementById("dcAssessmentEyebrow");
  const title = document.getElementById("dcAssessmentTitle");
  const description = document.getElementById("dcAssessmentDescription");

  if (eyebrow) {
    eyebrow.textContent = `GRADE ${dcTeacherState.grade} · Q${dcTeacherState.quarter} ASSESSMENT WORKSPACE`;
  }
  if (title) {
    title.textContent = isAiFormativeWorkspace() ? "Formatif AI · F1–F3" : course?.title || `Assessment Q${dcTeacherState.quarter}`;
  }
  if (description) {
    description.textContent = isAiFormativeWorkspace() ? "Buka bukti siswa, beri feedback, lalu simpan nilai F1, F2, atau F3." : course
      ? course.description
      : `Assessment kelas ${dcTeacherState.grade} untuk Q${dcTeacherState.quarter} belum disiapkan.`;
  }
  document.title = `Dashboard Guru - ${course?.title || `Assessment Q${dcTeacherState.quarter}`}`;
}

function updateDcSaveState() {
  const course = getCurrentDcCourse();
  const stateText = document.getElementById("dcSaveState");
  const button = document.getElementById("dcSaveButton");
  if (button) button.disabled = !course;
  if (!stateText) return;

  if (!course) {
    stateText.textContent = "Assessment belum tersedia";
    stateText.className = "dc-save-state is-dirty";
    return;
  }
  stateText.textContent = dcTeacherState.dirty
    ? "Perubahan belum disimpan"
    : "Data tersimpan";
  stateText.className = dcTeacherState.dirty
    ? "dc-save-state is-dirty"
    : "dc-save-state";
}

async function saveDcAssessment() {
  if(dcTeacherState.saving)return;
  const course = getCurrentDcCourse();
  if (!course) {
    showAlert(`Assessment untuk Q${dcTeacherState.quarter} belum tersedia.`, "warning");
    return;
  }

  const student = allSiswa.find((item) => item.id === dcTeacherState.studentId);
  if (!student || !dcIsAssessmentGrade(student.kelas, dcTeacherState.grade)) {
    showAlert(`Pilih siswa kelas ${dcTeacherState.grade} terlebih dahulu.`, "warning");
    return;
  }

  const button = document.getElementById("dcSaveButton");
  const originalHtml = button?.innerHTML || "";
  if (button) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Menyimpan…';
  }

  dcTeacherState.saving=true;
  const saveContext={studentId:student.id,grade:dcTeacherState.grade,quarter:dcTeacherState.quarter};
  try {
    if(typeof G11CloudIdentity!=="undefined")await G11CloudIdentity.verifyTeacher();
    if(typeof G11Monitor!=="undefined"&&course.gradingVersion)G11Monitor.invalidateStale();
    const record = dcBuildStoredRecord(
      dcTeacherState.draft,
      dcTeacherState.quarter,
      auth.currentUser?.email || "",
      dcTeacherState.grade,
    );
    if(isAiFormativeWorkspace()){record.formativeFocus=true;record.assessmentComplete=false;delete record.publishedGradebook;if(dcTeacherState.draft.publishedGradebook)record.publishedGradebook={...dcTeacherState.draft.publishedGradebook};}
    const gradebookFields = dcBuildGradebookFields(
      record,
      dcTeacherState.quarter,
      dcTeacherState.grade,
    );
    const formativeGradebookFields = Object.fromEntries(
      Object.entries(gradebookFields).filter(([field]) =>
        /^q\d+_f\d+$/.test(field),
      ),
    );
    const summativeField = `q${dcTeacherState.quarter}_sumatif`;
    const syncedSummativeScore = Object.prototype.hasOwnProperty.call(
      gradebookFields,
      summativeField,
    );
    const obsoleteFormativeFields =
      !course.gradingVersion && typeof getObsoleteFormativeFields === "function"
        ? getObsoleteFormativeFields(student, dcTeacherState.quarter)
        : [];
    const studentUpdate = {
      [`digitalCitizenshipAssessment/q${dcTeacherState.quarter}`]: record,
      ...gradebookFields,
    };
    obsoleteFormativeFields.forEach((field) => {
      studentUpdate[field] = null;
    });
    await siswaRef.child(student.id).update(studentUpdate);

    if (!student.digitalCitizenshipAssessment) {
      student.digitalCitizenshipAssessment = {};
    }
    obsoleteFormativeFields.forEach((field) => {
      delete student[field];
    });
    student.digitalCitizenshipAssessment[`q${dcTeacherState.quarter}`] = record;
    if (record.gradingVersion && record.publishedGradebook) dcTeacherState.draft.publishedGradebook = { ...record.publishedGradebook };
    Object.assign(student, gradebookFields);
    if(dcTeacherState.studentId===saveContext.studentId&&dcTeacherState.grade===saveContext.grade&&dcTeacherState.quarter===saveContext.quarter)dcTeacherState.dirty = Boolean(course.gradingVersion&&typeof G11Monitor!=="undefined"&&Object.entries(record.evidenceVersions||{}).some(([id,v])=>record.reviewed?.[id]&&v!==G11Monitor.version(student.id,id)));
    updateDcSaveState();
    renderTableBody(allSiswa);
    if (typeof ensureFormativeColumnCountForGrade === "function") {
      ensureFormativeColumnCountForGrade(
        dcTeacherState.grade,
        dcTeacherState.quarter,
      );
    }
    const syncedCount = Object.keys(formativeGradebookFields).length;
    showAlert(
      `<strong>${escHtml(course.title)}</strong> untuk ${escHtml(student.nama)} pada Q${dcTeacherState.quarter} berhasil disimpan.${syncedCount ? (isReviewedProjectWorkspace() ? " Nilai "+Object.keys(formativeGradebookFields).map(field=>field.replace(/^q\d+_f/,"F")).join(", ")+" masuk ke buku nilai." : ` Nilai F1–F${syncedCount} otomatis masuk ke buku nilai.`) : ""}${isAiFormativeWorkspace() ? " Nilai formatif yang sudah diperiksa masuk ke F1/F2/F3." : course.reviewedFormativeOnly ? " Rubrik dan bukti tersimpan; hanya proyek yang ditandai sudah diperiksa masuk ke buku nilai." : course.gradingVersion ? (record.assessmentComplete ? " Nilai akhir AI 20–30–50 otomatis masuk ke buku nilai; skor course dan sumatif tersedia terpisah." : " Penilaian sementara tersimpan. Nilai resmi sebelumnya tetap sampai seluruh 14 komponen diperiksa.") : (syncedSummativeScore ? " Nilai Sumatif otomatis masuk ke buku nilai." : "")}`,
      "success",
    );
  } catch (error) {
    showAlert("Gagal menyimpan penilaian: " + error.message, "danger");
  } finally {
    dcTeacherState.saving=false;
    if (button) {
      button.disabled = false;
      button.innerHTML = originalHtml;
    }
  }
}

function renderDcAssessmentPanel() {
  const content = document.getElementById("dcAssessmentContent");
  const nav = document.getElementById("dcAssessmentNav");
  const summaryArea = document.getElementById("dcAssessmentSummary");
  const student = allSiswa.find((item) => item.id === dcTeacherState.studentId);
  if (!content || !nav || !summaryArea) return;

  const course = getCurrentDcCourse();
  const summary = dcCalculateSummary(
    dcTeacherState.draft,
    dcTeacherState.quarter,
    dcTeacherState.grade,
  );
  renderDcWorkspaceMeta();
  renderDcSummary(summary, student);
  updateDcSaveState();

  if (!course) {
    const availableQuarters = [1, 2, 3, 4].filter((quarter) =>
      dcGetCourseConfig(quarter, dcTeacherState.grade),
    );
    const availability = availableQuarters.length
      ? `Assessment Grade ${dcTeacherState.grade} tersedia pada ${availableQuarters.map((quarter) => `Q${quarter}`).join(", ")}.`
      : `Assessment Grade ${dcTeacherState.grade} belum tersedia.`;
    nav.innerHTML = "";
    content.innerHTML = `
      <div class="dc-empty-state">
        <span><i class="fas fa-calendar-plus"></i></span>
        <h3>Assessment Q${dcTeacherState.quarter} belum tersedia</h3>
        <p>Pilih periode yang sudah memiliki assessment. ${availability}</p>
      </div>`;
    return;
  }

  ensureDcSelectedAssessment();
  renderDcAssessmentNav(summary);

  if (!student) {
    content.innerHTML = `
      <div class="dc-empty-state">
        <span><i class="fas fa-user-check"></i></span>
        <h3>Pilih siswa untuk mulai menilai</h3>
        <p>${escHtml(course.title)} hanya menampilkan siswa kelas ${dcTeacherState.grade} dari daftar Firebase. Pilih nama siswa, lalu isi checklist rubrik.</p>
      </div>`;
    return;
  }

  if (
    course.finalQuiz &&
    dcTeacherState.selectedAssessmentId === course.finalQuiz.id
  ) {
    renderDcQuizPanel(content, summary, course.finalQuiz);
    return;
  }

  const assessment = course.assessments.find(
    (item) => item.id === dcTeacherState.selectedAssessmentId,
  );
  if (!assessment) return;

  const assessmentDraft = dcTeacherState.draft.rubricScores[assessment.id];
  const raw = summary.rawScores[assessment.id] || 0;
  const completed = assessment.criteria.filter(
    (criterion) => assessmentDraft.criteria[criterion.id] === criterion.max,
  ).length;

  const criteriaHtml = assessment.criteria
    .map((criterion, index) => {
      const value = Number(assessmentDraft.criteria[criterion.id] || 0);
      const isComplete = value === criterion.max;
      return `
        <div class="dc-criterion-row ${isComplete ? "is-complete" : ""}">
          <label class="dc-criterion-check">
            <input type="checkbox" ${isComplete ? "checked" : ""}
              onchange="dcToggleCriterion('${assessment.id}','${criterion.id}',${criterion.max},this.checked)" />
            <span class="dc-custom-check"><i class="fas fa-check"></i></span>
            <span class="dc-criterion-index">${String(index + 1).padStart(2, "0")}</span>
            <span>${escHtml(criterion.label)}</span>
          </label>
          <label class="dc-points-input">
            <input type="number" min="0" max="${criterion.max}" value="${value}"
              data-score="${assessment.id}/${criterion.id}"
              aria-label="Poin ${escHtml(criterion.label)}"
              oninput="dcSetCriterionScore('${assessment.id}','${criterion.id}',${criterion.max},this.value,false)"
              onchange="dcSetCriterionScore('${assessment.id}','${criterion.id}',${criterion.max},this.value)" />
            <span>/ ${criterion.max}</span>
          </label>
        </div>`;
    })
    .join("");
  const briefHtml = assessment.brief
    ? `<div class="dc-assessment-brief"><span><i class="fas fa-clipboard-list"></i> Ketentuan tugas</span><p>${escHtml(assessment.brief)}</p></div>`
    : "";
  const starterCodeHtml = assessment.starterCode
    ? `<div class="dc-starter-code"><span><i class="fas fa-code"></i> Starter code siswa</span><pre><code>${escHtml(assessment.starterCode)}</code></pre></div>`
    : "";

  content.innerHTML = `
    <section class="dc-rubric-panel" style="--dc-accent:${assessment.color}">
      <div class="dc-rubric-head">
        <div class="dc-rubric-title">
          <span>${assessment.number}</span>
          <div><small>${isReviewedProjectWorkspace() ? "Formatif · /100" : assessment.type+(assessment.jp ? ` · ${assessment.jp} JP` : "")+` · bobot ${assessment.weight}%`}</small><h3>${escHtml(assessment.title)}</h3><p>${escHtml(assessment.subtitle)}</p></div>
        </div>
        <div class="dc-unit-score"><span>Nilai proyek</span><strong>${raw}</strong><small>${completed}/${assessment.criteria.length} ${course.reviewedFormativeOnly ? "kriteria poin penuh" : "kriteria tuntas"}</small></div>
      </div>
      ${course.gradingVersion && !isAiFormativeWorkspace() ? '<p class="dc-assessment-brief">Course 20% · F1–F3 30% · Sumatif 50%.</p>' : ''}
      ${course.gradingVersion ? dcAiArchiveHtml(dcTeacherState.draft) : ''}
      ${course.gradingVersion ? '<div id="g11EvidencePanel"></div>' : ''}
      ${briefHtml}
      ${course.reviewedFormativeOnly ? g8EvidenceFieldHTML(assessment,assessmentDraft) : ""}
      ${starterCodeHtml}
      <div class="dc-rubric-guide"><span><i class="fas fa-check-square"></i> Centang untuk poin penuh</span><span><i class="fas fa-keyboard"></i> Isi poin untuk nilai parsial</span><span><i class="fas fa-user-pen"></i> Versi siswa dan kalimat lengkap wajib</span></div>
      <div class="dc-criteria-list">${criteriaHtml}</div>
      ${course.gradingVersion || course.reviewedFormativeOnly ? '<label class="dc-criterion-check"><input type="checkbox" '+(dcTeacherState.draft.reviewed?.[assessment.id]===true?'checked':'')+' data-assessment="'+assessment.id+'" onchange="dcSetAssessmentReviewed(this.dataset.assessment,this.checked)" /><span>Komponen sudah diperiksa guru (nilai 0 juga harus ditandai)</span></label>' : ''}
      <label class="dc-teacher-note"><span>Catatan guru</span><textarea oninput="dcSetAssessmentNote('${assessment.id}',this.value)" placeholder="Kekuatan, hal yang perlu diperbaiki, atau tindak lanjut…">${escHtml(assessmentDraft.note || "")}</textarea></label>
    </section>`;
  if(course.gradingVersion&&typeof G11Monitor!=="undefined")G11Monitor.renderEvidence();
}

function renderDcAssessmentNav(summary) {
  const nav = document.getElementById("dcAssessmentNav");
  if (!nav) return;
  const items = dcVisibleAssessmentItems();
  nav.innerHTML = items
    .map((assessment) => {
      const selected = dcTeacherState.selectedAssessmentId === assessment.id;
      const raw = summary.rawScores[assessment.id] || 0;
      return `
        <button type="button" class="dc-nav-item ${selected ? "is-active" : ""}"
          style="--dc-item:${assessment.color}" onclick="dcSelectAssessment('${assessment.id}')">
          <span>${assessment.number}</span><div><strong>${escHtml(assessment.title)}</strong><small>${isReviewedProjectWorkspace() ? "Nilai /100" : assessment.type+(assessment.jp ? ` · ${assessment.jp} JP` : "")+` · ${assessment.weight}%`}</small></div><b>${dcTeacherState.draft.reviewed && dcTeacherState.draft.reviewed[assessment.id] !== true ? "Belum dinilai" : raw}</b>
        </button>`;
    })
    .join("");
}

function renderDcSummary(summary, student) {
  const area = document.getElementById("dcAssessmentSummary");
  if (!area) return;
  const course = getCurrentDcCourse();
  const weightTotals = dcGetCourseWeightTotals(course);
  if(course?.reviewedFormativeOnly){const graded=course.assessments.filter(a=>dcTeacherState.draft.reviewed?.[a.id]===true),mean=graded.length?graded.reduce((n,a)=>n+summary.rawScores[a.id],0)/graded.length:0;area.classList.remove('has-completion');area.innerHTML='<div class="dc-selected-student"><span>SISWA TERPILIH</span><strong>'+escHtml(student?.nama||'Pilih siswa')+'</strong><small>'+escHtml(student?.kelas||'')+' · Q2</small></div><div class="dc-summary-card"><span>Proyek diperiksa</span><strong>'+graded.length+'<small>/5</small></strong></div><div class="dc-summary-card"><span>Rata-rata proyek dinilai</span><strong>'+(graded.length?dcFormatOneDecimal(mean):'—')+'<small>/100</small></strong></div>';return;}
  if(isAiFormativeWorkspace()){area.classList.remove('has-completion');area.innerHTML='<div class="dc-selected-student"><span>SISWA TERPILIH</span><strong>'+escHtml(student?.nama||'Pilih siswa')+'</strong><small>'+escHtml(student?.kelas||'')+'</small></div>'+[1,2,3].map(i=>'<div class="dc-summary-card"><span>F'+i+'</span><strong>'+(dcTeacherState.draft.reviewed?.['g11AiFormative'+i]===true?dcFormatOneDecimal(summary.rawScores['g11AiFormative'+i]):'—')+'</strong><small>/100</small></div>').join('');return;}
  const studentLabel = student
    ? `${escHtml(student.nama)} · ${escHtml(student.kelas || "-")}`
    : "Belum ada siswa dipilih";
  const formativeCard = weightTotals.formative
    ? `<div class="dc-summary-card"><span>Formatif</span><strong>${dcFormatOneDecimal(summary.formative)}<small>/${dcFormatCourseWeight(weightTotals.formative)}</small></strong></div>`
    : "";
  const summativeCard = weightTotals.summative
    ? `<div class="dc-summary-card"><span>Sumatif</span><strong>${dcFormatOneDecimal(summary.summative)}<small>/${dcFormatCourseWeight(weightTotals.summative)}</small></strong></div>`
    : "";
  area.classList.toggle('has-completion',Boolean(weightTotals.completion));
  area.innerHTML = `
    <div class="dc-selected-student"><span>SISWA TERPILIH</span><strong>${studentLabel}</strong><small>Periode Q${dcTeacherState.quarter}</small></div>
    ${weightTotals.completion ? '<div class="dc-summary-card"><span>Penyelesaian course</span><strong>'+dcFormatOneDecimal(summary.completion)+'<small>/20</small></strong></div>' : ''}
    ${formativeCard}
    ${summativeCard}
    <div class="dc-summary-card dc-summary-final"><span>${course?.gradingVersion && !summary.complete ? "Nilai sementara" : "Nilai akhir"}</span><strong>${dcFormatOneDecimal(summary.finalScore)}</strong>${course?.gradingVersion ? `<small>${summary.reviewedCount}/14 komponen diperiksa</small>` : ""}</div>`;
}

function renderDcQuizPanel(content, summary, quiz) {
  const answers = dcTeacherState.draft.quizAnswers;
  const checks = answers
    .map(
      (answer, index) => `
        <label class="dc-question-check ${answer ? "is-correct" : ""}">
          <input type="checkbox" ${answer ? "checked" : ""} onchange="dcToggleQuizAnswer(${index},this.checked)" />
          <span>${String(index + 1).padStart(2, "0")}</span><small>${answer ? "+4" : "-"}</small>
        </label>`,
    )
    .join("");
  content.innerHTML = `
    <section class="dc-rubric-panel" style="--dc-accent:${quiz.color}">
      <div class="dc-rubric-head">
        <div class="dc-rubric-title"><span>${quiz.number}</span><div><small>Sumatif · bobot ${quiz.weight}%</small><h3>${escHtml(quiz.title)}</h3><p>Centang nomor soal yang dijawab benar. Setiap jawaban benar bernilai 4 poin.</p></div></div>
        <div class="dc-unit-score"><span>Nilai tes</span><strong>${summary.rawScores[quiz.id] || 0}</strong><small>${summary.quizCorrect}/25 jawaban benar</small></div>
      </div>
      <div class="dc-question-grid">${checks}</div>
      <div class="dc-quiz-strip"><div><span>Benar</span><strong>${summary.quizCorrect}</strong></div><div><span>Salah/kosong</span><strong>${25 - summary.quizCorrect}</strong></div><div><span>Nilai</span><strong>${summary.rawScores[quiz.id] || 0}</strong></div><div><span>Kontribusi</span><strong>${dcFormatOneDecimal(summary.contributions[quiz.id] || 0)}</strong></div></div>
      <label class="dc-teacher-note"><span>Catatan guru</span><textarea oninput="dcSetQuizNote(this.value)" placeholder="Catatan tentang penguasaan konsep siswa…">${escHtml(dcTeacherState.draft.quizNote || "")}</textarea></label>
    </section>`;
}

window.syncAssessmentQuarter = syncAssessmentQuarter;
window.refreshAssessmentStudentOptions = refreshAssessmentStudentOptions;
window.dcSelectAssessment = dcSelectAssessment;
window.dcToggleCriterion = dcToggleCriterion;
window.dcSetCriterionScore = dcSetCriterionScore;
window.dcSetAssessmentNote = dcSetAssessmentNote;
window.dcToggleQuizAnswer = dcToggleQuizAnswer;
window.dcSetQuizNote = dcSetQuizNote;
window.saveDcAssessment = saveDcAssessment;

function dcSetAssessmentReviewed(id,checked){if(dcTeacherState.saving)return;if(!dcTeacherState.draft.reviewed||!(id in dcTeacherState.draft.reviewed))return;dcTeacherState.draft.reviewed[id]=checked===true;if(checked===true&&isAiFormativeWorkspace()&&typeof G11Monitor!=="undefined"){dcTeacherState.draft.evidenceVersions??={};dcTeacherState.draft.evidenceVersions[id]=G11Monitor.version(dcTeacherState.studentId,id);}dcTeacherState.dirty=true;renderDcAssessmentPanel();}
window.dcSetAssessmentReviewed=dcSetAssessmentReviewed;
