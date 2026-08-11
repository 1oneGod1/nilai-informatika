/* ========================================================
   grade10-uiux.js
   Interactive Grade 10 UI/UX materials and quiz progress.
   ======================================================== */

const UIUX_COURSE_ID = "grade10UiUx";
const UIUX_SESSION_KEY = "csReportGrade10Session";
const UIUX_SESSION_MAX_AGE = 12 * 60 * 60 * 1000;

const PRE_TEST_QUESTIONS = [
  {
    question: "What is the main purpose of a wireframe?",
    options: [
      "To choose the final color palette",
      "To plan structure, hierarchy, and user flow",
      "To create a fully working product",
      "To export production-ready images",
    ],
    answer: 1,
  },
  {
    question: "Which detail normally does NOT belong in a low-fidelity wireframe?",
    options: [
      "Content blocks",
      "Navigation placement",
      "Final brand typography and polished images",
      "Calls to action",
    ],
    answer: 2,
  },
  {
    question: "Which sequence describes a common design process?",
    options: [
      "Prototype → wireframe → mockup",
      "Mockup → prototype → wireframe",
      "Wireframe → mockup → prototype",
      "Prototype → mockup → wireframe",
    ],
    answer: 2,
  },
  {
    question: "Which statement best describes UX?",
    options: [
      "Only the colors and icons on a screen",
      "How a person experiences and completes a task",
      "Only the code behind a website",
      "The file format used by Figma",
    ],
    answer: 1,
  },
  {
    question: "Can a valid wireframe be drawn by hand?",
    options: [
      "Yes, if it communicates structure and flow clearly",
      "No, all wireframes must be made in Figma",
      "Only when it includes final colors",
      "Only after a prototype is complete",
    ],
    answer: 0,
  },
];

const POST_TEST_QUESTIONS = [
  {
    question: "A team argues about button colors before agreeing on the page hierarchy. What should they do first?",
    options: [
      "Export the page",
      "Build a low-fidelity wireframe",
      "Add animations",
      "Choose stock photos",
    ],
    answer: 1,
  },
  {
    question: "Which item is the strongest evidence that a wireframe supports UX?",
    options: [
      "It uses the newest visual trend",
      "It shows how users move toward an important action",
      "It contains high-resolution images",
      "It uses the final brand font",
    ],
    answer: 1,
  },
  {
    question: "What is the main difference between a mockup and a prototype?",
    options: [
      "A mockup is static; a prototype demonstrates interaction",
      "A mockup is always hand-drawn",
      "A prototype never uses visual detail",
      "There is no difference",
    ],
    answer: 0,
  },
  {
    question: "Your group must recreate a website accurately in Figma. What should the QA lead check first?",
    options: [
      "Whether the team likes the brand",
      "Layout, spacing, type, and visual differences from the reference",
      "How many plugins are installed",
      "Whether every layer has a gradient",
    ],
    answer: 1,
  },
  {
    question: "Why is Auto Layout useful in the recreation task?",
    options: [
      "It automatically redesigns the website",
      "It controls alignment, padding, gaps, and resizing",
      "It replaces the need to measure",
      "It publishes the website as code",
    ],
    answer: 1,
  },
  {
    question: "Which action belongs in Section 1 rather than Section 2?",
    options: [
      "Matching the final font weight in Figma",
      "Recreating shadows and border radius",
      "Mapping content blocks and the main user journey",
      "Sharing one group Figma file",
    ],
    answer: 2,
  },
  {
    question: "A wireframe is simple mainly because simplicity helps people…",
    options: [
      "focus feedback on structure and flow",
      "avoid discussing user needs",
      "skip testing",
      "finalize branding immediately",
    ],
    answer: 0,
  },
  {
    question: "What should make the later summative redesign successful?",
    options: [
      "It looks different from the original at any cost",
      "It uses more visual effects",
      "It solves clear user problems with explainable design decisions",
      "It copies another redesign exactly",
    ],
    answer: 2,
  },
];

const SECTION_1_CHECKS = [
  ["reference", "I selected one real website and recorded its URL."],
  ["structure", "My wireframe shows the header, navigation, main sections, CTA, and footer."],
  ["fidelity", "I used simple boxes, lines, labels, and placeholders instead of polished visuals."],
  ["journey", "I labelled the main user journey and can explain what the user should notice first."],
];

const SECTION_2_CHECKS = [
  ["group", "I worked with the group assigned by my teacher."],
  ["file", "Our group uses one shared Figma file with clearly named sections or layers."],
  ["match", "Our layout, spacing, typography, colors, and visual details match the reference."],
  ["responsive", "We checked at least one desktop or mobile frame size against the reference."],
  ["explain", "Every member can explain the design structure and their contribution."],
];

let uiuxStudent = null;
let uiuxProgress = {};
let uiuxProgressRef = null;
let toastTimer = null;

document.addEventListener("DOMContentLoaded", initializeUiUxLab);

async function initializeUiUxLab() {
  uiuxStudent = readVerifiedStudentSession();
  if (!uiuxStudent) {
    document.getElementById("accessGate").hidden = false;
    return;
  }

  document.getElementById("learningApp").hidden = false;
  document.getElementById("studentName").textContent = uiuxStudent.name;
  document.getElementById("studentClass").textContent = uiuxStudent.className;
  document.getElementById("studentAvatar").textContent =
    uiuxStudent.name.trim().charAt(0).toUpperCase() || "G";

  if (!uiuxStudent.isLocalPreview) {
    uiuxProgressRef = db
      .ref("learningProgress")
      .child(uiuxStudent.id)
      .child(UIUX_COURSE_ID);
  }

  bindNavigation();
  bindForms();
  bindWireframeDetective();
  renderQuiz("pre", PRE_TEST_QUESTIONS);
  renderQuiz("post", POST_TEST_QUESTIONS);
  renderChecklist("section1Checklist", SECTION_1_CHECKS, "section1Checklist");
  renderChecklist("section2Checklist", SECTION_2_CHECKS, "section2Checklist");
  bindPostTestWarning();

  if (uiuxStudent.isLocalPreview) {
    uiuxProgress = {};
    hydrateSavedWork();
    renderProgressState();
    openPanelFromHash();
    return;
  }

  try {
    const snapshot = await uiuxProgressRef.once("value");
    uiuxProgress = snapshot.val() || {};
    hydrateSavedWork();
    renderProgressState();
  } catch (error) {
    showToast("Progress could not be loaded. Check your connection and try again.", true);
  }

  openPanelFromHash();
}

function readVerifiedStudentSession() {
  try {
    const raw = sessionStorage.getItem(UIUX_SESSION_KEY);
    const isLocalPreview =
      ["localhost", "127.0.0.1"].includes(window.location.hostname) &&
      new URLSearchParams(window.location.search).get("preview") === "1";
    if (!raw && isLocalPreview) {
      return {
        id: "local-preview",
        name: "Grade 10 Preview",
        className: "10A",
        groupName: "Assigned Group",
        verifiedAt: Date.now(),
        isLocalPreview: true,
      };
    }
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const gradeMatch = String(parsed.className || "").match(/\d+/);
    const grade = gradeMatch ? Number(gradeMatch[0]) : 0;
    const sessionAge = Date.now() - Number(parsed.verifiedAt || 0);

    if (!parsed.id || !parsed.name || grade !== 10 || sessionAge > UIUX_SESSION_MAX_AGE) {
      sessionStorage.removeItem(UIUX_SESSION_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    sessionStorage.removeItem(UIUX_SESSION_KEY);
    return null;
  }
}

function bindNavigation() {
  document.querySelectorAll("[data-panel-target]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.panelTarget));
  });

  document.querySelectorAll("[data-go-to]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.goTo));
  });

  window.addEventListener("hashchange", openPanelFromHash);
}

function openPanelFromHash() {
  const requested = window.location.hash.replace("#", "");
  const valid = ["overview", "pre-test", "section-1", "section-2", "post-test"];
  openPanel(valid.includes(requested) ? requested : "overview", false);
}

function openPanel(panelName, updateHash = true) {
  const target = document.querySelector(`[data-panel="${panelName}"]`);
  if (!target) return;

  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel === target);
  });
  document.querySelectorAll("[data-panel-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panelTarget === panelName);
  });

  if (updateHash && window.location.hash !== `#${panelName}`) {
    window.location.hash = panelName;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindForms() {
  document.getElementById("preTestForm").addEventListener("submit", submitPreTest);
  document.getElementById("postTestForm").addEventListener("submit", submitPostTest);
  document.getElementById("websitePlanForm").addEventListener("submit", saveWebsitePlan);
  document.getElementById("groupPlanForm").addEventListener("submit", saveGroupPlan);
}

function bindWireframeDetective() {
  const section = document.getElementById("wireframeDetectiveSection");
  if (!section) return;

  section.addEventListener("wireframe-progress", (event) => {
    saveSection1Discovery(event.detail);
  });

  section.addEventListener("wireframe-next", () => {
    openPanel("section-2");
  });
}

async function saveSection1Discovery(discovery) {
  const discoveredZones = discovery?.foundZones || {};
  const payload = {
    conceptDone: discovery?.conceptDone === true,
    foundZones: {
      header: discoveredZones.header === true,
      navigation: discoveredZones.navigation === true,
      hero: discoveredZones.hero === true,
      cta: discoveredZones.cta === true,
      content: discoveredZones.content === true,
      footer: discoveredZones.footer === true,
    },
    exitAnswer: typeof discovery?.exitAnswer === "string" ? discovery.exitAnswer : "",
    exitCorrect: discovery?.exitCorrect === true,
    savedAt: Date.now(),
  };

  if (uiuxStudent?.isLocalPreview) {
    uiuxProgress.section1Discovery = payload;
    renderProgressState();
    return;
  }

  try {
    await uiuxProgressRef.child("section1Discovery").set(payload);
    uiuxProgress.section1Discovery = payload;
    renderProgressState();
  } catch (error) {
    showToast("This investigation checkpoint could not be saved. Please try again.", true);
  }
}

function renderQuiz(prefix, questions) {
  const form = document.getElementById(`${prefix}TestForm`);
  form.innerHTML = questions
    .map(
      (item, questionIndex) => `
        <fieldset class="question-card">
          <div class="question-number">${String(questionIndex + 1).padStart(2, "0")}</div>
          <div>
            <h3>${item.question}</h3>
            <div class="answer-grid">
              ${item.options
                .map(
                  (option, optionIndex) => `
                    <label class="answer-option">
                      <input type="radio" name="${prefix}_q${questionIndex}" value="${optionIndex}" />
                      <span>${option}</span>
                    </label>`,
                )
                .join("")}
            </div>
          </div>
        </fieldset>`,
    )
    .join("");
}

function collectQuizAnswers(prefix, questions) {
  const answers = {};
  for (let index = 0; index < questions.length; index += 1) {
    const selected = document.querySelector(`input[name="${prefix}_q${index}"]:checked`);
    if (!selected) return null;
    answers[index] = Number(selected.value);
  }
  return answers;
}

function calculateQuizResult(answers, questions) {
  let correct = 0;
  questions.forEach((question, index) => {
    if (Number(answers[index]) === question.answer) correct += 1;
  });
  return {
    correct,
    total: questions.length,
    score: Math.round((correct / questions.length) * 100),
  };
}

async function submitPreTest(event) {
  event.preventDefault();
  const answers = collectQuizAnswers("pre", PRE_TEST_QUESTIONS);
  if (!answers) {
    showToast("Answer every pre-test question before submitting.", true);
    return;
  }

  const result = calculateQuizResult(answers, PRE_TEST_QUESTIONS);
  const button = event.submitter;
  setButtonBusy(button, true, "Saving...");

  try {
    const transaction = await uiuxProgressRef.child("preTest").transaction((current) => ({
      answers,
      correct: result.correct,
      total: result.total,
      score: result.score,
      attempts: Number(current?.attempts || 0) + 1,
      submittedAt: Date.now(),
    }));
    uiuxProgress.preTest = transaction.snapshot.val();
    renderProgressState();
    const banner = document.getElementById("preTestResult");
    banner.hidden = false;
    banner.innerHTML = `<strong>Baseline recorded: ${result.score}%.</strong> Review the concepts in Section 1, then compare this result with your final post-test.`;
    showToast("Pre-test saved to your learning record.");
  } catch (error) {
    showToast("The pre-test could not be saved. Please try again.", true);
  } finally {
    setButtonBusy(button, false);
  }
}

async function saveWebsitePlan(event) {
  event.preventDefault();
  const plan = {
    websiteName: document.getElementById("websiteName").value.trim(),
    websiteUrl: document.getElementById("websiteUrl").value.trim(),
    reason: document.getElementById("websiteReason").value.trim(),
    tool: document.getElementById("wireframeTool").value,
    savedAt: Date.now(),
  };

  if (!plan.websiteName || !plan.websiteUrl || !plan.reason || !plan.tool) {
    showToast("Complete every field in your case file.", true);
    return;
  }

  const button = event.submitter;
  setButtonBusy(button, true, "Saving...");
  try {
    await uiuxProgressRef.child("websitePlan").set(plan);
    uiuxProgress.websitePlan = plan;
    renderProgressState();
    showToast("Your website case file has been saved.");
  } catch (error) {
    showToast("Your case file could not be saved. Please try again.", true);
  } finally {
    setButtonBusy(button, false);
  }
}

async function saveGroupPlan(event) {
  event.preventDefault();
  const plan = {
    groupName: document.getElementById("groupName").value.trim(),
    studentRole: document.getElementById("studentRole").value,
    figmaUrl: document.getElementById("figmaUrl").value.trim(),
    savedAt: Date.now(),
  };

  if (!plan.groupName || !plan.studentRole || !plan.figmaUrl) {
    showToast("Complete every field in your group record.", true);
    return;
  }

  const button = event.submitter;
  setButtonBusy(button, true, "Saving...");
  try {
    await uiuxProgressRef.child("groupPlan").set(plan);
    uiuxProgress.groupPlan = plan;
    renderProgressState();
    showToast("Your assigned-group record has been saved.");
  } catch (error) {
    showToast("Your group record could not be saved. Please try again.", true);
  } finally {
    setButtonBusy(button, false);
  }
}

function renderChecklist(containerId, items, progressKey) {
  const container = document.getElementById(containerId);
  container.innerHTML = items
    .map(
      ([key, label]) => `
        <label class="check-item">
          <input type="checkbox" data-check-key="${key}" />
          <span>${label}</span>
        </label>`,
    )
    .join("");

  container.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => saveChecklist(containerId, progressKey));
  });
}

async function saveChecklist(containerId, progressKey) {
  const values = {};
  document.querySelectorAll(`#${containerId} [data-check-key]`).forEach((checkbox) => {
    values[checkbox.dataset.checkKey] = checkbox.checked;
  });

  try {
    await uiuxProgressRef.child(progressKey).set(values);
    uiuxProgress[progressKey] = values;
    renderProgressState();
    showToast("Checkpoint updated.");
  } catch (error) {
    showToast("The checkpoint could not be saved. Please try again.", true);
  }
}

function bindPostTestWarning() {
  const modal = document.getElementById("postWarningModal");
  const checkbox = document.getElementById("postAttemptConfirm");
  const confirmButton = document.getElementById("confirmPostStart");

  document.getElementById("openPostWarning").addEventListener("click", () => {
    if (uiuxProgress.postTest) {
      renderPostTestState();
      return;
    }
    checkbox.checked = false;
    confirmButton.disabled = true;
    modal.hidden = false;
  });

  document.getElementById("closePostWarning").addEventListener("click", () => {
    modal.hidden = true;
  });

  checkbox.addEventListener("change", () => {
    confirmButton.disabled = !checkbox.checked;
  });

  confirmButton.addEventListener("click", () => {
    if (!checkbox.checked) return;
    modal.hidden = true;
    document.getElementById("postTestLauncher").hidden = true;
    document.getElementById("postTestForm").hidden = false;
    document.getElementById("postTestActions").hidden = false;
    document.getElementById("postTestForm").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

async function submitPostTest(event) {
  event.preventDefault();
  if (uiuxProgress.postTest) {
    renderPostTestState();
    showToast("Your post-test has already been submitted.", true);
    return;
  }

  const answers = collectQuizAnswers("post", POST_TEST_QUESTIONS);
  if (!answers) {
    showToast("Answer every post-test question before your final submission.", true);
    return;
  }

  const result = calculateQuizResult(answers, POST_TEST_QUESTIONS);
  const payload = {
    answers,
    correct: result.correct,
    total: result.total,
    score: result.score,
    submittedAt: Date.now(),
  };
  const button = event.submitter;
  setButtonBusy(button, true, "Submitting once...");

  try {
    const transaction = await uiuxProgressRef.child("postTest").transaction((current) => {
      if (current !== null) return;
      return payload;
    });

    if (!transaction.committed) {
      const latest = await uiuxProgressRef.child("postTest").once("value");
      uiuxProgress.postTest = latest.val();
      renderProgressState();
      showToast("A final post-test result is already recorded for this student.", true);
      return;
    }

    uiuxProgress.postTest = transaction.snapshot.val();
    renderProgressState();
    showToast("Post-test submitted. Your final result is now locked.");
  } catch (error) {
    showToast("Submission failed and was not recorded. Check your connection and try again.", true);
  } finally {
    setButtonBusy(button, false);
  }
}

function hydrateSavedWork() {
  document.getElementById("wireframeDetectiveSection")?.setProgress(uiuxProgress.section1Discovery || {});

  const websitePlan = uiuxProgress.websitePlan || {};
  document.getElementById("websiteName").value = websitePlan.websiteName || "";
  document.getElementById("websiteUrl").value = websitePlan.websiteUrl || "";
  document.getElementById("websiteReason").value = websitePlan.reason || "";
  document.getElementById("wireframeTool").value = websitePlan.tool || "";

  const groupPlan = uiuxProgress.groupPlan || {};
  document.getElementById("groupName").value = groupPlan.groupName || uiuxStudent.groupName || "";
  document.getElementById("studentRole").value = groupPlan.studentRole || "";
  document.getElementById("figmaUrl").value = groupPlan.figmaUrl || "";

  hydrateChecklist("section1Checklist", uiuxProgress.section1Checklist || {});
  hydrateChecklist("section2Checklist", uiuxProgress.section2Checklist || {});
}

function hydrateChecklist(containerId, saved) {
  document.querySelectorAll(`#${containerId} [data-check-key]`).forEach((checkbox) => {
    checkbox.checked = saved[checkbox.dataset.checkKey] === true;
  });
}

function renderProgressState() {
  const preComplete = Boolean(uiuxProgress.preTest);
  const section1Complete =
    isSection1DiscoveryComplete(uiuxProgress.section1Discovery) &&
    Boolean(uiuxProgress.websitePlan) &&
    allChecksComplete(uiuxProgress.section1Checklist, SECTION_1_CHECKS);
  const section2Complete =
    Boolean(uiuxProgress.groupPlan) && allChecksComplete(uiuxProgress.section2Checklist, SECTION_2_CHECKS);
  const postComplete = Boolean(uiuxProgress.postTest);

  setStatus("preTestStatus", preComplete);
  setStatus("section1Status", section1Complete);
  setStatus("section2Status", section2Complete);
  setStatus("postTestStatus", postComplete);

  const xp = (preComplete ? 100 : 0) + (section1Complete ? 150 : 0) + (section2Complete ? 150 : 0) + (postComplete ? 100 : 0);
  const percent = Math.round((xp / 500) * 100);
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressBar").style.width = `${percent}%`;
  document.getElementById("xpLabel").textContent = `${xp} / 500 XP`;
  document.getElementById("mobileProgressLabel").textContent = `${percent}% complete`;
  document.getElementById("mobileProgressBar").style.width = `${percent}%`;

  if (preComplete) {
    document.getElementById("preScore").textContent = `${safeNumber(uiuxProgress.preTest.score)}%`;
    const attempts = safeNumber(uiuxProgress.preTest.attempts, 1);
    document.getElementById("preAttemptText").textContent = `${attempts} pre-test attempt${attempts === 1 ? "" : "s"} recorded`;
  }

  renderPostTestState();
}

function renderPostTestState() {
  const result = uiuxProgress.postTest;
  const locked = document.getElementById("postTestLocked");
  const launcher = document.getElementById("postTestLauncher");
  const form = document.getElementById("postTestForm");
  const actions = document.getElementById("postTestActions");

  if (!result) {
    locked.hidden = true;
    launcher.hidden = false;
    return;
  }

  const score = safeNumber(result.score);
  document.getElementById("postScore").textContent = `${score}%`;
  locked.hidden = false;
  launcher.hidden = true;
  form.hidden = true;
  actions.hidden = true;
  locked.innerHTML = `
    <i class="fas fa-circle-check"></i>
    <strong>${score}%</strong>
    <p>Your post-test is complete and locked. This is the one final result saved to your Grade 10 learning record.</p>`;
}

function setStatus(elementId, complete) {
  const status = document.getElementById(elementId);
  status.className = `status-dot${complete ? " is-complete" : ""}`;
  status.innerHTML = "";
}

function allChecksComplete(saved, definitions) {
  if (!saved) return false;
  return definitions.every(([key]) => saved[key] === true);
}

function isSection1DiscoveryComplete(discovery) {
  if (!discovery || discovery.conceptDone !== true || discovery.exitCorrect !== true) return false;
  const foundZones = discovery.foundZones;
  if (Array.isArray(foundZones)) return new Set(foundZones).size >= 6;
  if (!foundZones || typeof foundZones !== "object") return false;
  return Object.values(foundZones).filter((value) => value === true).length >= 6;
}

function safeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function setButtonBusy(button, busy, busyLabel = "Saving...") {
  if (!button) return;
  if (busy) {
    button.dataset.originalHtml = button.innerHTML;
    button.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> ${busyLabel}`;
    button.disabled = true;
  } else {
    button.innerHTML = button.dataset.originalHtml || button.innerHTML;
    button.disabled = false;
  }
}

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.toggle("is-error", isError);
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}
