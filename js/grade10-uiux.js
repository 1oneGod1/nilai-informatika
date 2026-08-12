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
    options: ["Export the page", "Build a low-fidelity wireframe", "Add animations", "Choose stock photos"],
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
    question: "When investigating a webpage before drawing, what should you record first?",
    options: [
      "Only the brand colours",
      "The order, grouping, hierarchy, navigation, and important actions",
      "The website's source code",
      "Every animation duration",
    ],
    answer: 1,
  },
  {
    question: "A webpage uses a large photograph in its hero section. How should a low-fidelity wireframe represent it?",
    options: [
      "Copy the photograph in full colour",
      "Use a labelled image placeholder in the observed position and approximate size",
      "Remove the entire hero section",
      "Replace it with decorative icons",
    ],
    answer: 1,
  },
  {
    question: "What is the strongest evidence that a student's wireframe corresponds to the selected webpage?",
    options: [
      "It uses the student's favourite colour",
      "It contains more sections than the webpage",
      "Its major sections, order, hierarchy, navigation, and CTA match the observations",
      "It includes realistic photographs",
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
    question: "A teacher asks why one block appears first in the wireframe. What is the best response?",
    options: [
      "It looked easier to draw there",
      "The reference webpage gives that content priority and it supports the page's main purpose",
      "Every wireframe must begin with the largest rectangle",
      "The colour would look better in that position",
    ],
    answer: 1,
  },
];

const FIGMA_PRE_TEST_QUESTIONS = [
  {
    question: "Which Figma product is mainly used to design website and app interfaces?",
    options: ["FigJam", "Figma Design", "Figma Slides", "Dev Mode only"],
    answer: 1,
  },
  {
    question: "What is a frame used for in Figma?",
    options: [
      "To represent a screen or design surface",
      "To delete unused colors",
      "To open the Community page",
      "To write JavaScript code",
    ],
    answer: 0,
  },
  {
    question: "Which region contains the objects and layer order in a design file?",
    options: ["Canvas", "Pages & Layers", "Dashboard", "Export window"],
    answer: 1,
  },
  {
    question: "Where would you normally change an object's size, fill, stroke, and position?",
    options: ["Design Inspector", "FigJam timer", "Community", "File browser"],
    answer: 0,
  },
  {
    question: "Which shortcut creates a frame?",
    options: ["T", "P", "F", "K"],
    answer: 2,
  },
  {
    question: "Why should a group rename and organise its layers?",
    options: [
      "To make the file easier to understand and edit together",
      "To automatically publish a website",
      "To change the account password",
      "To avoid using frames",
    ],
    answer: 0,
  },
];

const POST_TEST_2_QUESTIONS = [
  {
    question: "Your group needs to design interface screens and connect a clickable prototype. Which Figma product should you use?",
    options: ["FigJam", "Figma Design", "Figma Slides", "Dev Mode"],
    answer: 1,
  },
  {
    question: "Which editor region is the main space where frames and interface objects are created?",
    options: ["Pages and Layers", "Canvas", "Design Inspector", "Dashboard"],
    answer: 1,
  },
  {
    question: "How can you pan across the canvas without moving a selected layer?",
    options: ["Press F", "Hold Space and drag", "Press T", "Double-click the layer"],
    answer: 1,
  },
  {
    question: "Where do you normally edit X/Y position, width, height, fill, stroke, and effects?",
    options: ["Design Inspector", "Community", "Pages list", "File browser"],
    answer: 0,
  },
  {
    question: "What is the most accurate description of a frame in Figma?",
    options: [
      "A decorative rectangle only",
      "A design surface that represents a screen or device",
      "A folder for deleted layers",
      "A tool used only for exporting images",
    ],
    answer: 1,
  },
  {
    question: "Which shortcut activates the Scale tool for proportional scaling?",
    options: ["K", "V", "P", "O"],
    answer: 0,
  },
  {
    question: "Why does layer order matter?",
    options: [
      "It changes the Figma account password",
      "It determines which objects appear in front of or behind others",
      "It automatically creates a prototype",
      "It changes the device preset",
    ],
    answer: 1,
  },
  {
    question: "Which dashboard route correctly opens a blank design file?",
    options: [
      "Community → Import → FigJam",
      "Recents → Slides → Prototype",
      "Drafts → Create new → Design file",
      "Dev Mode → Assets → Export",
    ],
    answer: 2,
  },
];

const SECTION_1_CHECKS = [
  ["reference", "I selected one real website and recorded its URL."],
  ["structure", "My drawing follows the major sections and content order I observed on the selected webpage."],
  ["fidelity", "I translated the webpage into simple boxes, lines, labels, and placeholders without copying its visual styling."],
  ["journey", "I can explain how the hierarchy, navigation, CTA, and user journey in my wireframe correspond to the webpage."],
];

const SECTION_2_CHECKS = [
  ["group", "I worked with the group assigned by my teacher."],
  ["file", "Our group uses one shared Figma file with clearly named sections or layers."],
  ["match", "Our layout, spacing, typography, colors, and visual details match the reference."],
  ["responsive", "We checked at least one desktop or mobile frame size against the reference."],
  ["explain", "Every member can explain the design structure and their contribution."],
];

const SECTION_4_CHECKS = [
  ["assignedGroup", "We worked only with the group assigned by our teacher."],
  ["sharedFile", "We created one shared Figma Design file and saved its link."],
  ["frame", "We selected a frame preset that matches our target device."],
  ["objects", "We used shapes and text to create a simple interface composition."],
  ["layers", "We renamed and ordered layers so the visual stack is clear."],
  ["explain", "Every member can explain one tool and their contribution."],
];

const FIGMA_ZONES = {
  toolbar: {
    icon: "fa-screwdriver-wrench",
    title: "Toolbar",
    description: "Choose actions such as Move, Frame, Shape, Pen, and Text. The active tool changes what your pointer does on the canvas.",
  },
  layers: {
    icon: "fa-layer-group",
    title: "Pages & Layers",
    description: "Navigate pages, select objects, rename layers, group content, and control the visual stacking order.",
  },
  canvas: {
    icon: "fa-border-all",
    title: "Canvas",
    description: "Build and arrange frames and objects here. Pan and zoom to navigate a large design workspace.",
  },
  inspector: {
    icon: "fa-sliders",
    title: "Design Inspector",
    description: "Edit position, size, layout, fill, stroke, opacity, and effects for the selected object.",
  },
};

const FIGMA_TOOLS = {
  move: {
    icon: "fa-arrow-pointer",
    title: "Move & Scale",
    description: "Use V to select and move objects. Use K when an object must scale proportionally instead of only resizing its box.",
  },
  frame: {
    icon: "fa-crop-simple",
    title: "Frame",
    description: "Use F to create a screen-sized design surface. Choose a preset or define a custom frame before placing interface content.",
  },
  shape: {
    icon: "fa-shapes",
    title: "Shape",
    description: "Create rectangles, ellipses, polygons, and other primitives. Use inspector properties to control fill, stroke, radius, and size.",
  },
  pen: {
    icon: "fa-pen-nib",
    title: "Pen",
    description: "Use P to draw custom vector paths. Keep anchor points intentional so the shape remains easy to edit.",
  },
  text: {
    icon: "fa-font",
    title: "Text",
    description: "Use T for headings, labels, and body copy. Create hierarchy through size, weight, alignment, and spacing.",
  },
  layers: {
    icon: "fa-layer-group",
    title: "Layer organisation",
    description: "Rename objects and arrange their order. Layers higher in the panel appear in front of layers below them.",
  },
};

const FRAME_PRESETS = {
  desktop: { name: "Desktop", size: "1440 × 1024", phone: false },
  iphone: { name: "iPhone", size: "430 × 932", phone: true },
  android: { name: "Android", size: "360 × 800", phone: true },
};

const SECTION_3_ROUTE = ["drafts", "create", "design"];
const SECTION_4_TOOL_KEYS = Object.keys(FIGMA_TOOLS);
const CORRECT_LAYER_ORDER = ["cta", "image", "background"];
const LAYER_LABELS = { cta: "CTA button", image: "Hero image", background: "Background" };
const LAYER_ICONS = { cta: "fa-square", image: "fa-image", background: "fa-fill-drip" };

let uiuxStudent = null;
let uiuxProgress = {};
let uiuxProgressRef = null;
let toastTimer = null;
let section3RouteIndex = 0;
let section3SelectedZone = "";
let section4SelectedTool = "";
let section4LayerOrder = ["background", "cta", "image"];
let progressWriteQueue = Promise.resolve();

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
    uiuxProgressRef = db.ref("learningProgress").child(uiuxStudent.id).child(UIUX_COURSE_ID);
  }

  bindNavigation();
  bindForms();
  bindWireframeDetective();
  bindPostTestWarning();
  bindSection3Interactions();
  bindSection4Interactions();
  renderChecklist("section1Checklist", SECTION_1_CHECKS, "section1Checklist");
  renderChecklist("section2Checklist", SECTION_2_CHECKS, "section2Checklist");
  renderChecklist("section4Checklist", SECTION_4_CHECKS, "section4Checklist");
  renderLayerChallenge();

  if (uiuxStudent.isLocalPreview) {
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
  const valid = [
    "overview",
    "pre-test",
    "section-1",
    "post-test",
    "section-2",
    "pre-test-2",
    "section-3",
    "section-4",
    "post-test-2",
  ];
  openPanel(valid.includes(requested) ? requested : "overview", false);
}

function openPanel(panelName, updateHash = true) {
  const section1Complete = isSection1Complete();
  const requiresPostTest1 = [
    "section-2",
    "pre-test-2",
    "section-3",
    "section-4",
    "post-test-2",
  ].includes(panelName);
  if (
    (panelName === "post-test" || requiresPostTest1) &&
    !section1Complete
  ) {
    panelName = "section-1";
    updateHash = true;
    showToast("Complete the Section 1 investigation before opening Post-test 1.", true);
  } else if (requiresPostTest1 && !uiuxProgress.postTest) {
    panelName = "post-test";
    updateHash = true;
    showToast("Complete Post-test 1 before opening Section 2.", true);
  }
  const figmaPreTestRequired = ["section-3", "section-4", "post-test-2"].includes(panelName);
  if (figmaPreTestRequired && !uiuxProgress.figmaPreTest) {
    panelName = "pre-test-2";
    updateHash = true;
    showToast("Complete the one-attempt Figma Pre-test before opening Section 3.", true);
  }
  const target = document.querySelector(`[data-panel="${panelName}"]`);
  if (!target) return;
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel === target);
  });
  document.querySelectorAll("[data-panel-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panelTarget === panelName);
  });
  if (updateHash && window.location.hash !== `#${panelName}`) window.location.hash = panelName;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindForms() {
  document.getElementById("preTestForm").addEventListener("submit", submitPreTest);
  document.getElementById("figmaPreTestForm").addEventListener("submit", submitFigmaPreTest);
  document.getElementById("postTestForm").addEventListener("submit", submitPostTest);
  document.getElementById("post2TestForm").addEventListener("submit", submitPostTest2);
  document.getElementById("websitePlanForm").addEventListener("submit", saveWebsitePlan);
  document.getElementById("groupPlanForm").addEventListener("submit", saveGroupPlan);
  document.getElementById("figmaFoundationForm").addEventListener("submit", saveFigmaFoundationPlan);
}

function bindWireframeDetective() {
  const section = document.getElementById("wireframeDetectiveSection");
  if (!section) return;
  section.addEventListener("wireframe-progress", (event) => saveSection1Discovery(event.detail));
  section.addEventListener("wireframe-next", () => {
    document
      .getElementById("websitePlanForm")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  await saveProgressRecord("section1Discovery", payload, "This investigation checkpoint could not be saved.");
}

function renderQuiz(prefix, questions) {
  const form = document.getElementById(`${prefix}TestForm`);
  if (!form || form.childElementCount) return;
  form.innerHTML = questions
    .map(
      (item, questionIndex) => `
        <fieldset class="question-card" aria-labelledby="${prefix}Question${questionIndex}">
          <div class="question-number">${String(questionIndex + 1).padStart(2, "0")}</div>
          <div class="question-content">
            <h3 id="${prefix}Question${questionIndex}">${item.question}</h3>
            <div class="answer-grid">
              ${item.options
                .map(
                  (option, optionIndex) => `
                    <label class="answer-option">
                      <input type="radio" name="${prefix}_q${questionIndex}" value="${optionIndex}" />
                      <span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + optionIndex)}</span>
                      <span class="answer-text">${option}</span>
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
  return { correct, total: questions.length, score: Math.round((correct / questions.length) * 100) };
}

async function submitPreTest(event) {
  event.preventDefault();
  if (uiuxProgress.preTest) {
    renderPreTestState();
    showToast("Your pre-test attempt is already locked.", true);
    return;
  }
  const answers = collectQuizAnswers("pre", PRE_TEST_QUESTIONS);
  if (!answers) {
    showToast("Answer every pre-test question before submitting.", true);
    return;
  }
  const result = calculateQuizResult(answers, PRE_TEST_QUESTIONS);
  const payload = { ...result, attempts: 1, submittedAt: Date.now() };
  const button = event.submitter;
  setButtonBusy(button, true, "Locking score...");
  try {
    const saved = await commitOneAttempt("preTest", payload);
    if (!saved.committed) {
      uiuxProgress.preTest = saved.value;
      renderProgressState();
      showToast("A pre-test score is already recorded for this student.", true);
      return;
    }
    uiuxProgress.preTest = saved.value;
    renderProgressState();
    showToast("Pre-test submitted. Only your score remains visible.");
  } catch (error) {
    showToast("The pre-test could not be saved. Please try again.", true);
  } finally {
    setButtonBusy(button, false);
  }
}

async function submitFigmaPreTest(event) {
  event.preventDefault();
  if (uiuxProgress.figmaPreTest) {
    renderFigmaPreTestState();
    showToast("Your Figma Pre-test attempt is already locked.", true);
    return;
  }
  const answers = collectQuizAnswers("figmaPre", FIGMA_PRE_TEST_QUESTIONS);
  if (!answers) {
    showToast("Answer every Figma Pre-test question before submitting.", true);
    return;
  }
  const result = calculateQuizResult(answers, FIGMA_PRE_TEST_QUESTIONS);
  const payload = { ...result, attempts: 1, submittedAt: Date.now() };
  const button = event.submitter;
  setButtonBusy(button, true, "Locking score...");
  try {
    const saved = await commitOneAttempt("figmaPreTest", payload);
    uiuxProgress.figmaPreTest = saved.value;
    renderProgressState();
    showToast(
      saved.committed
        ? "Figma Pre-test submitted. Section 3 is now available."
        : "A Figma Pre-test score is already recorded for this student.",
      !saved.committed,
    );
  } catch (error) {
    showToast("The Figma Pre-test could not be saved. Please try again.", true);
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
  await saveFormRecord(event.submitter, "websitePlan", plan, "Your website case file has been saved.", "Your case file could not be saved.");
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
  await saveFormRecord(event.submitter, "groupPlan", plan, "Your assigned-group record has been saved.", "Your group record could not be saved.");
}

async function saveFigmaFoundationPlan(event) {
  event.preventDefault();
  const plan = {
    groupName: document.getElementById("foundationGroupName").value.trim(),
    role: document.getElementById("foundationRole").value,
    figmaUrl: document.getElementById("foundationFigmaUrl").value.trim(),
    savedAt: Date.now(),
  };
  if (!plan.groupName || !plan.role || !plan.figmaUrl) {
    showToast("Complete all Section 4 group evidence fields.", true);
    return;
  }
  await saveFormRecord(event.submitter, "figmaFoundationPlan", plan, "Section 4 group evidence saved.", "Section 4 evidence could not be saved.");
}

async function saveFormRecord(button, key, payload, successMessage, errorMessage) {
  setButtonBusy(button, true, "Saving...");
  try {
    await saveProgressRecord(key, payload, errorMessage, false);
    showToast(successMessage);
  } catch (error) {
    showToast(`${errorMessage} Please try again.`, true);
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
    await saveProgressRecord(progressKey, values, "The checkpoint could not be saved.", false);
    showToast("Checkpoint updated.");
  } catch (error) {
    showToast("The checkpoint could not be saved. Please try again.", true);
  }
}

function bindPostTestWarning() {
  bindOneAttemptWarning({
    key: "postTest",
    modalId: "postWarningModal",
    checkboxId: "postAttemptConfirm",
    confirmId: "confirmPostStart",
    openId: "openPostWarning",
    closeId: "closePostWarning",
    launcherId: "postTestLauncher",
    formId: "postTestForm",
    actionsId: "postTestActions",
    prefix: "post",
    questions: POST_TEST_QUESTIONS,
    renderLocked: renderPostTestState,
  });
  bindOneAttemptWarning({
    key: "postTest2",
    modalId: "post2WarningModal",
    checkboxId: "post2AttemptConfirm",
    confirmId: "confirmPost2Start",
    openId: "openPost2Warning",
    closeId: "closePost2Warning",
    launcherId: "postTest2Launcher",
    formId: "post2TestForm",
    actionsId: "postTest2Actions",
    prefix: "post2",
    questions: POST_TEST_2_QUESTIONS,
    renderLocked: renderPostTest2State,
  });
}

function bindOneAttemptWarning(config) {
  const modal = document.getElementById(config.modalId);
  const checkbox = document.getElementById(config.checkboxId);
  const confirmButton = document.getElementById(config.confirmId);
  document.getElementById(config.openId).addEventListener("click", () => {
    if (uiuxProgress[config.key]) {
      config.renderLocked();
      return;
    }
    checkbox.checked = false;
    confirmButton.disabled = true;
    modal.hidden = false;
  });
  document.getElementById(config.closeId).addEventListener("click", () => {
    modal.hidden = true;
  });
  checkbox.addEventListener("change", () => {
    confirmButton.disabled = !checkbox.checked;
  });
  confirmButton.addEventListener("click", () => {
    if (!checkbox.checked) return;
    renderQuiz(config.prefix, config.questions);
    modal.hidden = true;
    document.getElementById(config.launcherId).hidden = true;
    document.getElementById(config.formId).hidden = false;
    document.getElementById(config.actionsId).hidden = false;
    document.getElementById(config.formId).scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

async function submitPostTest(event) {
  await submitLockedQuiz(event, {
    key: "postTest",
    prefix: "post",
    questions: POST_TEST_QUESTIONS,
    lockedMessage: "Your Post-test 1 has already been submitted.",
    successMessage: "Post-test 1 submitted. Its Formative 1 contribution is now locked.",
  });
}

async function submitPostTest2(event) {
  await submitLockedQuiz(event, {
    key: "postTest2",
    prefix: "post2",
    questions: POST_TEST_2_QUESTIONS,
    lockedMessage: "Your Post-test 2 has already been submitted.",
    successMessage: "Post-test 2 submitted. Its Formative 2 contribution is now locked.",
  });
}

async function submitLockedQuiz(event, config) {
  event.preventDefault();
  if (uiuxProgress[config.key]) {
    renderProgressState();
    showToast(config.lockedMessage, true);
    return;
  }
  const answers = collectQuizAnswers(config.prefix, config.questions);
  if (!answers) {
    showToast("Answer every question before your final submission.", true);
    return;
  }
  const result = calculateQuizResult(answers, config.questions);
  const payload = { ...result, submittedAt: Date.now() };
  const button = event.submitter;
  setButtonBusy(button, true, "Submitting once...");
  try {
    const saved = await commitOneAttempt(config.key, payload);
    uiuxProgress[config.key] = saved.value;
    renderProgressState();
    showToast(saved.committed ? config.successMessage : "A locked result is already recorded for this student.", !saved.committed);
  } catch (error) {
    showToast("Submission failed and was not recorded. Check your connection and try again.", true);
  } finally {
    setButtonBusy(button, false);
  }
}

async function commitOneAttempt(key, payload) {
  if (uiuxStudent.isLocalPreview) {
    if (uiuxProgress[key]) return { committed: false, value: uiuxProgress[key] };
    return { committed: true, value: payload };
  }
  const transaction = await uiuxProgressRef.child(key).transaction((current) => {
    if (current !== null) return;
    return payload;
  });
  if (transaction.committed) return { committed: true, value: transaction.snapshot.val() };
  const latest = await uiuxProgressRef.child(key).once("value");
  return { committed: false, value: latest.val() };
}

function bindSection3Interactions() {
  document.querySelectorAll("[data-figma-product]").forEach((button) => {
    button.addEventListener("click", async () => {
      const correct = button.dataset.figmaProduct === "design";
      document.querySelectorAll("[data-figma-product]").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      const feedback = document.getElementById("figmaProductFeedback");
      feedback.hidden = false;
      feedback.classList.toggle("is-success", correct);
      feedback.textContent = correct
        ? "Correct. Figma Design is the workspace for interface design and interactive prototypes."
        : "Not this product. Match the team’s goal with the product’s main purpose, then try again.";
      if (!correct) return;
      const state = getSection3State();
      state.environment = true;
      state.savedAt = Date.now();
      await saveProgressRecord("section3Progress", state, "The product checkpoint could not be saved.");
    });
  });

  document.querySelectorAll("[data-route-step]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (getSection3State().route) return;
      const chosen = button.dataset.routeStep;
      if (chosen !== SECTION_3_ROUTE[section3RouteIndex]) {
        section3RouteIndex = 0;
        document.getElementById("routeStatus").textContent = "Route reset. Start with Drafts.";
        renderRouteState(false);
        return;
      }
      section3RouteIndex += 1;
      renderRouteState(false);
      if (section3RouteIndex < SECTION_3_ROUTE.length) return;
      const state = getSection3State();
      state.route = true;
      state.savedAt = Date.now();
      await saveProgressRecord("section3Progress", state, "The dashboard route could not be saved.");
    });
  });

  document.querySelectorAll("[data-figma-zone]").forEach((button) => {
    button.addEventListener("click", async () => {
      const zone = button.dataset.figmaZone;
      section3SelectedZone = zone;
      const state = getSection3State();
      state.zones[zone] = true;
      state.savedAt = Date.now();
      await saveProgressRecord("section3Progress", state, "The editor-region checkpoint could not be saved.");
    });
  });

  document.querySelectorAll("[data-shortcut]").forEach((button) => {
    button.addEventListener("click", async () => {
      const correct = button.dataset.shortcut === "pan";
      document.querySelectorAll("[data-shortcut]").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      const feedback = document.getElementById("shortcutFeedback");
      feedback.hidden = false;
      feedback.classList.toggle("is-success", correct);
      feedback.textContent = correct
        ? "Correct. Hold Space and drag to pan the canvas without moving a design object."
        : "That control changes an object or tool. Try the navigation gesture that moves your view of the canvas.";
      if (!correct) return;
      const state = getSection3State();
      state.shortcut = true;
      state.savedAt = Date.now();
      await saveProgressRecord("section3Progress", state, "The shortcut checkpoint could not be saved.");
    });
  });
}

function bindSection4Interactions() {
  document.querySelectorAll("[data-figma-tool]").forEach((button) => {
    button.addEventListener("click", async () => {
      const key = button.dataset.figmaTool;
      section4SelectedTool = key;
      const state = getSection4WorkshopState();
      state.toolsExplored[key] = true;
      state.savedAt = Date.now();
      await saveProgressRecord("section4Workshop", state, "The toolbar checkpoint could not be saved.");
    });
  });

  document.getElementById("framePreset").addEventListener("change", async (event) => {
    const state = getSection4WorkshopState();
    state.framePreset = event.target.value;
    state.savedAt = Date.now();
    await saveProgressRecord("section4Workshop", state, "The frame preset could not be saved.");
  });
}

function getSection3State() {
  const saved = uiuxProgress.section3Progress || {};
  const zones = saved.zones || {};
  return {
    environment: saved.environment === true,
    route: saved.route === true,
    zones: {
      toolbar: zones.toolbar === true,
      layers: zones.layers === true,
      canvas: zones.canvas === true,
      inspector: zones.inspector === true,
    },
    shortcut: saved.shortcut === true,
    savedAt: safeNumber(saved.savedAt, Date.now()),
  };
}

function getSection4WorkshopState() {
  const saved = uiuxProgress.section4Workshop || {};
  const tools = saved.toolsExplored || {};
  return {
    framePreset: typeof saved.framePreset === "string" ? saved.framePreset : "",
    toolsExplored: Object.fromEntries(SECTION_4_TOOL_KEYS.map((key) => [key, tools[key] === true])),
    layerChallenge: saved.layerChallenge === true,
    savedAt: safeNumber(saved.savedAt, Date.now()),
  };
}

function renderSection3State() {
  const state = getSection3State();
  if (state.environment) {
    const correct = document.querySelector('[data-figma-product="design"]');
    correct.classList.add("is-selected", "is-correct");
    const feedback = document.getElementById("figmaProductFeedback");
    feedback.hidden = false;
    feedback.classList.add("is-success");
    feedback.textContent = "Correct. Figma Design is the workspace for interface design and interactive prototypes.";
  }
  renderRouteState(state.route);

  const foundCount = Object.values(state.zones).filter(Boolean).length;
  document.getElementById("figmaZoneCount").textContent = `${foundCount} / 4`;
  document.querySelectorAll("[data-figma-zone]").forEach((button) => {
    button.classList.toggle("is-found", state.zones[button.dataset.figmaZone] === true);
  });
  document.getElementById("figmaZoneEvidence").innerHTML = Object.keys(FIGMA_ZONES)
    .map((key) => `<span class="${state.zones[key] ? "is-found" : ""}">${state.zones[key] ? "✓" : "○"} ${FIGMA_ZONES[key].title}</span>`)
    .join("");
  if (section3SelectedZone && FIGMA_ZONES[section3SelectedZone]) {
    const zone = FIGMA_ZONES[section3SelectedZone];
    document.getElementById("figmaZoneIcon").className = `fas ${zone.icon}`;
    document.getElementById("figmaZoneTitle").textContent = zone.title;
    document.getElementById("figmaZoneDescription").textContent = zone.description;
  }

  if (state.shortcut) {
    document.querySelector('[data-shortcut="pan"]').classList.add("is-selected");
    const feedback = document.getElementById("shortcutFeedback");
    feedback.hidden = false;
    feedback.classList.add("is-success");
    feedback.textContent = "Correct. Hold Space and drag to pan the canvas without moving a design object.";
  }
  const missions = Number(state.environment) + Number(state.route) + Number(foundCount === 4) + Number(state.shortcut);
  document.getElementById("section3TaskCount").textContent = `${missions} / 4 missions`;
}

function renderRouteState(completed) {
  const visualSteps = completed ? 3 : section3RouteIndex;
  [1, 2, 3].forEach((number) => {
    document.getElementById(`routeStep${number}`).classList.toggle("is-complete", number <= visualSteps);
  });
  document.querySelectorAll("[data-route-step]").forEach((button) => {
    const position = SECTION_3_ROUTE.indexOf(button.dataset.routeStep);
    button.classList.toggle("is-complete", completed || (position >= 0 && position < visualSteps));
  });
  const status = completed
    ? "Route complete: Drafts → Create new → Design file"
    : ["Start with Drafts", "Next: + Create new", "Next: Design file"][section3RouteIndex] || "Start with Drafts";
  document.getElementById("routeStatus").textContent = status;
}

function renderSection4State() {
  const state = getSection4WorkshopState();
  if (state.layerChallenge) section4LayerOrder = [...CORRECT_LAYER_ORDER];
  document.getElementById("framePreset").value = state.framePreset;
  renderFramePreview(state.framePreset);
  const exploredCount = Object.values(state.toolsExplored).filter(Boolean).length;
  document.getElementById("toolbarExploreCount").textContent = `${exploredCount} / 6`;
  document.querySelectorAll("[data-figma-tool]").forEach((button) => {
    button.classList.toggle("is-explored", state.toolsExplored[button.dataset.figmaTool] === true);
  });
  if (section4SelectedTool && FIGMA_TOOLS[section4SelectedTool]) {
    const tool = FIGMA_TOOLS[section4SelectedTool];
    document.getElementById("toolbarDetail").innerHTML = `<i class="fas ${tool.icon}"></i><div><span>SELECTED TOOL</span><h3>${tool.title}</h3><p>${tool.description}</p></div>`;
  }
  renderLayerChallenge();
}

function renderFramePreview(presetKey) {
  const preset = FRAME_PRESETS[presetKey];
  const preview = document.getElementById("framePreview");
  preview.classList.toggle("is-phone", Boolean(preset?.phone));
  document.getElementById("framePreviewName").textContent = preset?.name || "No frame selected";
  document.getElementById("framePreviewSize").textContent = preset?.size || "— × —";
}

function renderLayerChallenge() {
  const container = document.getElementById("layerChallenge");
  if (!container) return;
  container.innerHTML = section4LayerOrder
    .map(
      (key, index) => `
        <div class="layer-row-control">
          <span><i class="fas ${LAYER_ICONS[key]}"></i>${LAYER_LABELS[key]}</span>
          <div>
            <button type="button" data-layer-move="up" data-layer-index="${index}" ${index === 0 ? "disabled" : ""} aria-label="Move ${LAYER_LABELS[key]} up"><i class="fas fa-arrow-up"></i></button>
            <button type="button" data-layer-move="down" data-layer-index="${index}" ${index === section4LayerOrder.length - 1 ? "disabled" : ""} aria-label="Move ${LAYER_LABELS[key]} down"><i class="fas fa-arrow-down"></i></button>
          </div>
        </div>`,
    )
    .join("");
  container.querySelectorAll("[data-layer-move]").forEach((button) => {
    button.addEventListener("click", () => moveLayer(Number(button.dataset.layerIndex), button.dataset.layerMove));
  });

  section4LayerOrder.forEach((key, index) => {
    const visual = document.querySelector(`.${key}-layer`);
    if (visual) visual.style.zIndex = String(section4LayerOrder.length - index);
  });
  const correct = arraysEqual(section4LayerOrder, CORRECT_LAYER_ORDER);
  const feedback = document.getElementById("layerFeedback");
  feedback.hidden = !correct;
  feedback.classList.toggle("is-success", correct);
  if (correct) feedback.textContent = "Correct. The CTA is in front, the image is in the middle, and the background is at the bottom.";
}

async function moveLayer(index, direction) {
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= section4LayerOrder.length) return;
  [section4LayerOrder[index], section4LayerOrder[target]] = [section4LayerOrder[target], section4LayerOrder[index]];
  renderLayerChallenge();
  if (!arraysEqual(section4LayerOrder, CORRECT_LAYER_ORDER)) return;
  const state = getSection4WorkshopState();
  state.layerChallenge = true;
  state.savedAt = Date.now();
  await saveProgressRecord("section4Workshop", state, "The layer challenge could not be saved.");
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

  const foundationPlan = uiuxProgress.figmaFoundationPlan || {};
  document.getElementById("foundationGroupName").value = foundationPlan.groupName || uiuxStudent.groupName || "";
  document.getElementById("foundationRole").value = foundationPlan.role || "";
  document.getElementById("foundationFigmaUrl").value = foundationPlan.figmaUrl || "";

  hydrateChecklist("section1Checklist", uiuxProgress.section1Checklist || {});
  hydrateChecklist("section2Checklist", uiuxProgress.section2Checklist || {});
  hydrateChecklist("section4Checklist", uiuxProgress.section4Checklist || {});
  renderSection3State();
  renderSection4State();
}

function hydrateChecklist(containerId, saved) {
  document.querySelectorAll(`#${containerId} [data-check-key]`).forEach((checkbox) => {
    checkbox.checked = saved[checkbox.dataset.checkKey] === true;
  });
}

function renderProgressState() {
  const preComplete = Boolean(uiuxProgress.preTest);
  const figmaPreComplete = Boolean(uiuxProgress.figmaPreTest);
  const section1Complete = isSection1Complete();
  const section2Complete =
    Boolean(uiuxProgress.groupPlan) && allChecksComplete(uiuxProgress.section2Checklist, SECTION_2_CHECKS);
  const section3Complete = isSection3Complete();
  const section4Complete = isSection4Complete();
  const postComplete = Boolean(uiuxProgress.postTest);
  const post2Complete = Boolean(uiuxProgress.postTest2);

  setStatus("preTestStatus", preComplete);
  setStatus("section1Status", section1Complete);
  setStatus("section2Status", section2Complete);
  setStatus("postTestStatus", postComplete);
  setStatus("figmaPreTestStatus", figmaPreComplete);
  setStatus("section3Status", section3Complete);
  setStatus("section4Status", section4Complete);
  setStatus("postTest2Status", post2Complete);

  const xp =
    (preComplete ? 80 : 0) +
    (section1Complete ? 120 : 0) +
    (section2Complete ? 100 : 0) +
    (postComplete ? 100 : 0) +
    (figmaPreComplete ? 80 : 0) +
    (section3Complete ? 120 : 0) +
    (section4Complete ? 180 : 0) +
    (post2Complete ? 100 : 0);
  const percent = Math.round((xp / 880) * 100);
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressBar").style.width = `${percent}%`;
  document.getElementById("xpLabel").textContent = `${xp} / 880 XP`;
  document.getElementById("mobileProgressLabel").textContent = `${percent}% complete`;
  document.getElementById("mobileProgressBar").style.width = `${percent}%`;

  renderPreTestState();
  renderFigmaPreTestState();
  renderPostTestState();
  renderPostTest2State();
  renderSection3State();
  renderSection4State();
  renderFormativeLedger(section1Complete, section4Complete);
}

function renderPreTestState() {
  const result = uiuxProgress.preTest;
  const form = document.getElementById("preTestForm");
  const actions = document.getElementById("preTestActions");
  const banner = document.getElementById("preTestResult");
  if (!result) {
    renderQuiz("pre", PRE_TEST_QUESTIONS);
    form.hidden = false;
    actions.hidden = false;
    banner.hidden = true;
    return;
  }
  const score = safeNumber(result.score);
  document.getElementById("preScore").textContent = `${score}%`;
  document.getElementById("preAttemptText").textContent = "Attempt locked · score only";
  form.hidden = true;
  form.innerHTML = "";
  actions.hidden = true;
  banner.hidden = false;
  banner.innerHTML = `<strong>Baseline recorded: ${score}%.</strong> Your one attempt is locked. Questions and answers are no longer available for review.`;
}

function renderFigmaPreTestState() {
  const result = uiuxProgress.figmaPreTest;
  const form = document.getElementById("figmaPreTestForm");
  const actions = document.getElementById("figmaPreTestActions");
  const banner = document.getElementById("figmaPreTestResult");
  if (!result) {
    renderQuiz("figmaPre", FIGMA_PRE_TEST_QUESTIONS);
    form.hidden = false;
    actions.hidden = false;
    banner.hidden = true;
    return;
  }
  const score = safeNumber(result.score);
  document.getElementById("figmaPreScore").textContent = `${score}%`;
  document.getElementById("figmaPreAttemptText").textContent = "Attempt locked · score only";
  form.hidden = true;
  form.innerHTML = "";
  actions.hidden = true;
  banner.hidden = false;
  banner.innerHTML = `<strong>Figma baseline recorded: ${score}%.</strong> Questions and answers are no longer available. Continue to Section 3 to strengthen your understanding.`;
}

function renderPostTestState() {
  renderLockedQuizState({
    key: "postTest",
    scoreId: "postScore",
    lockedId: "postTestLocked",
    launcherId: "postTestLauncher",
    formId: "postTestForm",
    actionsId: "postTestActions",
    label: "Post-test 1",
    formative: "Formative 1",
  });
}

function renderPostTest2State() {
  renderLockedQuizState({
    key: "postTest2",
    scoreId: "post2Score",
    lockedId: "postTest2Locked",
    launcherId: "postTest2Launcher",
    formId: "post2TestForm",
    actionsId: "postTest2Actions",
    label: "Post-test 2",
    formative: "Formative 2",
  });
}

function renderLockedQuizState(config) {
  const result = uiuxProgress[config.key];
  const locked = document.getElementById(config.lockedId);
  const launcher = document.getElementById(config.launcherId);
  const form = document.getElementById(config.formId);
  const actions = document.getElementById(config.actionsId);
  if (!result) {
    locked.hidden = true;
    if (form.hidden) launcher.hidden = false;
    return;
  }
  const score = safeNumber(result.score);
  document.getElementById(config.scoreId).textContent = `${score}%`;
  locked.hidden = false;
  launcher.hidden = true;
  form.hidden = true;
  form.innerHTML = "";
  actions.hidden = true;
  locked.innerHTML = `<i class="fas fa-circle-check"></i><strong>${score}%</strong><p>${config.label} is complete and locked. It contributes ${formatScore(score * 0.3)} of 30 points to ${config.formative}.</p>`;
}

function renderFormativeLedger(section1Complete, section4Complete) {
  const wireframeAssessment = uiuxProgress.teacherAssessment?.wireframe || {};
  const wireframeCriteria = wireframeAssessment.criteria || {};
  const wireframeCriterionKeys = [
    "reference",
    "structure",
    "hierarchy",
    "navigation",
    "spacing",
    "fidelity",
    "completeness",
  ];
  const wireframeAssessed = wireframeAssessment.assessed === true;
  const product1 = wireframeAssessed
    ? wireframeCriterionKeys.filter((key) => wireframeCriteria[key] === true)
        .length * 10
    : 0;
  const product2 = section4Complete ? 70 : 0;
  const quiz1 = uiuxProgress.postTest ? safeNumber(uiuxProgress.postTest.score) * 0.3 : 0;
  const quiz2 = uiuxProgress.postTest2 ? safeNumber(uiuxProgress.postTest2.score) * 0.3 : 0;
  const total1 = wireframeAssessed && uiuxProgress.postTest
    ? product1 + quiz1
    : null;
  const total2 = product2 + quiz2;
  document.getElementById("formative1Score").textContent =
    total1 === null ? "—" : formatScore(total1);
  document.getElementById("formative1Product").textContent =
    wireframeAssessed ? `${product1} / 70` : "— / 70";
  document.getElementById("formative1Quiz").textContent = `${formatScore(quiz1)} / 30`;
  document.getElementById("formative1State").textContent =
    total1 !== null
      ? "Recorded from the teacher's wireframe accuracy rubric and Post-test 1."
      : !section1Complete
        ? "Complete the website investigation and your wireframe."
        : !wireframeAssessed
          ? "Investigation complete · waiting for the teacher's accuracy rubric."
          : "Teacher rubric recorded · complete Post-test 1.";
  document.getElementById("formative2Score").textContent = formatScore(total2);
  document.getElementById("formative2Product").textContent = `${product2} / 70`;
  document.getElementById("formative2Quiz").textContent = `${formatScore(quiz2)} / 30`;
  document.getElementById("formative2State").textContent =
    section4Complete && uiuxProgress.postTest2
      ? "Provisional total complete · awaiting teacher product review."
      : "Complete Section 4 and Post-test 2.";
}

function isSection3Complete() {
  const state = getSection3State();
  return state.environment && state.route && state.shortcut && Object.values(state.zones).every(Boolean);
}

function isSection4Complete() {
  const state = getSection4WorkshopState();
  return (
    Boolean(state.framePreset) &&
    state.layerChallenge &&
    Object.values(state.toolsExplored).every(Boolean) &&
    Boolean(uiuxProgress.figmaFoundationPlan) &&
    allChecksComplete(uiuxProgress.section4Checklist, SECTION_4_CHECKS)
  );
}

async function saveProgressRecord(key, payload, errorMessage, showError = true) {
  uiuxProgress[key] = payload;
  renderProgressState();
  if (uiuxStudent.isLocalPreview) return;
  const write = progressWriteQueue
    .catch(() => undefined)
    .then(() => uiuxProgressRef.child(key).set(payload));
  progressWriteQueue = write;
  try {
    await write;
  } catch (error) {
    if (showError) showToast(`${errorMessage} Please try again.`, true);
    throw error;
  }
}

function setStatus(elementId, complete) {
  const status = document.getElementById(elementId);
  if (!status) return;
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

function isSection1Complete() {
  return (
    isSection1DiscoveryComplete(uiuxProgress.section1Discovery) &&
    Boolean(uiuxProgress.websitePlan) &&
    allChecksComplete(uiuxProgress.section1Checklist, SECTION_1_CHECKS)
  );
}

function arraysEqual(first, second) {
  return first.length === second.length && first.every((value, index) => value === second[index]);
}

function formatScore(value) {
  const rounded = Math.round(safeNumber(value) * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
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
