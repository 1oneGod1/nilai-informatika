class WireframeDetectiveSection extends HTMLElement {
  constructor() {
    super();
    this.state = {
      conceptDone: false,
      viewMode: "visual",
      foundZones: [],
      selectedZone: "header",
      exitAnswer: "",
      exitCorrect: false,
    };
    this.anatomyZones = [
      {
        id: "header",
        label: "Header",
        icon: "▰",
        description: "The top area that carries the website identity and its main navigation.",
      },
      {
        id: "navigation",
        label: "Navigation",
        icon: "≡",
        description: "The routes that help users move to another page or section.",
      },
      {
        id: "hero",
        label: "Hero",
        icon: "◩",
        description: "The opening section that communicates the page's main message and purpose.",
      },
      {
        id: "cta",
        label: "Call to action",
        icon: "→",
        description: "The control that directs users toward the most important action.",
      },
      {
        id: "content",
        label: "Content",
        icon: "▦",
        description: "The sections containing the main information, features, products, or services.",
      },
      {
        id: "footer",
        label: "Footer",
        icon: "▬",
        description: "The closing area for secondary links, contact details, and legal information.",
      },
    ];
  }

  connectedCallback() {
    if (this.shadowRoot) return;
    this.attachShadow({ mode: "open" });
    this.render();
    this.bindInteractions();
    this.updateView();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="wireframe-detective-embed.css?v=20260811b" />
      <div class="wd-root">
        <div class="page-shell" id="wd-top">
          <section class="hero lesson-hero">
            <div class="hero-copy">
              <div class="eyebrow"><span>SECTION 01</span><i></i> LEARN · EXPLORE · DISCUSS</div>
              <h1>See the <em>structure</em>,<br />not the colour.</h1>
              <p>Today you will break a website into a simple, understandable structure. That structure is its wireframe.</p>
              <div class="hero-actions">
                <button class="primary-button" type="button" data-start-investigation>Start the investigation <span>↘</span></button>
                <div class="mission-stat"><strong>3</strong><span>checkpoints<br />in this section</span></div>
              </div>
            </div>
            <div class="hero-board" aria-label="Illustration showing a website becoming a wireframe">
              <div class="case-label">CASE #001</div>
              <div class="mini-site colored-site">
                <div class="mini-top"><b>nook.</b><span>Shop&nbsp;&nbsp; Journal&nbsp;&nbsp; About</span></div>
                <div class="mini-hero-color"><small>WORK BETTER</small><strong>Make room<br />for big ideas.</strong><i>Explore desks →</i></div>
                <div class="mini-cards-color"><i></i><i></i><i></i></div>
              </div>
              <div class="transform-arrow">→</div>
              <div class="mini-site sketch-site">
                <div class="sketch-top"><i></i><span></span><span></span><span></span></div>
                <div class="sketch-hero"><div><i></i><i></i><b></b></div><span></span></div>
                <div class="sketch-cards"><i></i><i></i><i></i></div>
              </div>
              <span class="board-note note-one">remove the detail!</span>
              <span class="board-note note-two">find the structure</span>
            </div>
          </section>

          <section class="learning-strip" aria-label="Learning targets">
            <span class="strip-label">TARGET</span>
            <div><b>01</b><p>Explain the purpose of a wireframe</p></div>
            <div><b>02</b><p>Recognise the main parts of a website</p></div>
            <div><b>03</b><p>Plan a low-fidelity layout</p></div>
          </section>

          <section class="case-section" id="wd-case-01">
            <div class="section-heading">
              <div><span class="step-number">01</span><small>CASE FILE</small><h2>What is a wireframe?</h2></div>
              <span class="status-tag" data-concept-status>+20 XP</span>
            </div>
            <div class="concept-grid">
              <div class="definition-card">
                <span class="quote-mark">“</span>
                <p>A <strong>wireframe</strong> is a simple visual framework showing a page's <mark>structure</mark>, <mark>hierarchy</mark>, and <mark>flow</mark> before colour and decoration.</p>
                <div class="not-this">
                  <span>Not the focus:</span>
                  <del>final colours</del><del>perfect images</del><del>decoration</del>
                </div>
                <button class="complete-button" type="button" data-concept-button>I understand the concept</button>
              </div>
              <div class="compare-card">
                <div class="toggle-labels"><span>Compare</span><small>Try both modes</small></div>
                <div class="segmented-control" role="group" aria-label="Choose an example view">
                  <button class="selected" type="button" data-view="visual">Visual UI</button>
                  <button type="button" data-view="wireframe">Wireframe</button>
                </div>
                <div class="comparison-window visual" data-comparison-window>
                  <div class="browser-bar"><span></span><span></span><span></span><div class="address-line"></div></div>
                  <div class="compare-header"><b>LOOMI</b><div><i></i><i></i><i></i></div></div>
                  <div class="compare-hero"><div><small>MAKE EVERY DAY BRIGHTER</small><strong>Light for<br />better living.</strong><span>Browse lamps</span></div><figure></figure></div>
                  <div class="compare-content"><i></i><i></i><i></i></div>
                </div>
                <p class="compare-caption">The content and position stay the same. Only the visual detail is simplified.</p>
              </div>
            </div>
          </section>

          <section class="case-section design-path-section">
            <div class="section-heading">
              <div><span class="step-number">02</span><small>DESIGN PATH</small><h2>Do not confuse these three stages</h2></div>
              <span class="status-tag">STRUCTURE → VISUAL → INTERACTION</span>
            </div>
            <p class="path-intro">A wireframe is not a mockup or a prototype. Each stage answers a different design question.</p>
            <div class="design-path-grid">
              <article class="path-card current-stage">
                <div class="path-card-top"><span>01</span><i>LOW-FIDELITY</i></div>
                <div class="path-visual path-wire"><b></b><b></b><b></b><b></b></div>
                <h3>Wireframe</h3>
                <strong>“What is here, and where does it go?”</strong>
                <ul><li>Structure and information flow</li><li>User journey and function</li><li>Static, simple, and easy to revise</li></ul>
              </article>
              <div class="path-arrow" aria-hidden="true">→</div>
              <article class="path-card">
                <div class="path-card-top"><span>02</span><i>MEDIUM / HIGH-FIDELITY</i></div>
                <div class="path-visual path-mock"><b></b><b></b><b></b><b></b></div>
                <h3>Mockup</h3>
                <strong>“What will it look like?”</strong>
                <ul><li>Colour and typography</li><li>Images, icons, and realistic content</li><li>Usually static or not yet functional</li></ul>
              </article>
              <div class="path-arrow" aria-hidden="true">→</div>
              <article class="path-card">
                <div class="path-card-top"><span>03</span><i>INTERACTIVE</i></div>
                <div class="path-visual path-proto"><b></b><b></b><b></b><b></b></div>
                <h3>Prototype</h3>
                <strong>“How will the user interact?”</strong>
                <ul><li>Clickable and testable</li><li>Demonstrates flow and function</li><li>Approaches the final product experience</li></ul>
              </article>
            </div>
            <div class="why-wireframe">
              <div><small>WHY FIRST?</small><h3>Why not begin with a beautiful final interface?</h3></div>
              <div class="why-points">
                <span><b>01</b> Usability problems become visible early</span>
                <span><b>02</b> Changes are faster and less costly</span>
                <span><b>03</b> Ideas are easier to communicate</span>
              </div>
              <details>
                <summary>Discuss before revealing the answer <b>＋</b></summary>
                <p>If we begin with colours, images, and typography, we may spend time polishing a structure that is still confusing. A wireframe helps a team test the page logic first.</p>
              </details>
            </div>
          </section>

          <section class="case-section dark-section">
            <div class="section-heading light-heading">
              <div><span class="step-number lime">03</span><small>ANATOMY HUNT</small><h2>Find six website parts</h2></div>
              <span class="status-tag dark-tag" data-found-count>0/6 found</span>
            </div>
            <p class="section-intro">Click each part of the sample page. Every discovery reveals one structural clue.</p>
            <div class="hunt-layout">
              <div class="hunt-browser">
                <div class="browser-bar dark-browser"><span></span><span></span><span></span><div class="address-line"></div></div>
                <button class="hunt-zone zone-header" type="button" data-zone="header"><span>Header</span><b>atlas.</b></button>
                <button class="hunt-zone zone-nav" type="button" data-zone="navigation"><span>Navigation</span><i>Trips</i><i>Guides</i><i>Stories</i></button>
                <button class="hunt-zone zone-hero" type="button" data-zone="hero"><span>Hero</span><small>PLAN LESS. DISCOVER MORE.</small><strong>Your next<br />story starts here.</strong></button>
                <button class="hunt-zone zone-cta" type="button" data-zone="cta"><span>CTA</span>Find a trip →</button>
                <button class="hunt-zone zone-content" type="button" data-zone="content"><span>Content</span><i></i><i></i><i></i></button>
                <button class="hunt-zone zone-footer" type="button" data-zone="footer"><span>Footer</span><b>atlas.</b><i></i><i></i></button>
              </div>
              <aside class="evidence-panel">
                <div class="evidence-top"><span>EVIDENCE</span><b data-evidence-count>00/06</b></div>
                <div class="evidence-icon" data-evidence-icon>▰</div>
                <small>SELECTED</small>
                <h3 data-evidence-label>Header</h3>
                <p data-evidence-description>The top area that carries the website identity and its main navigation.</p>
                <div class="evidence-list" data-evidence-list></div>
              </aside>
            </div>
          </section>

          <section class="case-section quiz-section">
            <div class="section-heading">
              <div><span class="step-number">04</span><small>EXIT CHECK</small><h2>What is the main focus of a wireframe?</h2></div>
              <span class="status-tag" data-exit-status>+30 XP</span>
            </div>
            <div class="quiz-options" role="radiogroup" aria-label="Choose one answer">
              <button type="button" data-exit-answer="visual" role="radio" aria-checked="false"><span>A</span><p>Make colours and images look perfect</p><i></i></button>
              <button type="button" data-exit-answer="structure" role="radio" aria-checked="false"><span>B</span><p>Plan the page structure, hierarchy, and flow</p><i></i></button>
              <button type="button" data-exit-answer="code" role="radio" aria-checked="false"><span>C</span><p>Write the HTML code for the website</p><i></i></button>
            </div>
            <div class="quiz-feedback" data-exit-feedback hidden role="status"></div>
            <div class="continue-row">
              <span>Finished the investigation? Apply the evidence to your selected website below.</span>
              <button class="primary-button" type="button" data-next-section>Continue to Section 2 <span>→</span></button>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  bindInteractions() {
    this.shadowRoot.querySelector("[data-start-investigation]").addEventListener("click", () => {
      this.shadowRoot.querySelector("#wd-case-01").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    this.shadowRoot.querySelector("[data-concept-button]").addEventListener("click", () => {
      this.state.conceptDone = true;
      this.updateView();
      this.notifyProgress();
    });

    this.shadowRoot.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => {
        this.state.viewMode = button.dataset.view;
        this.updateView();
      });
    });

    this.shadowRoot.querySelectorAll("[data-zone]").forEach((button) => {
      button.addEventListener("click", () => {
        const zone = button.dataset.zone;
        this.state.selectedZone = zone;
        if (!this.state.foundZones.includes(zone)) this.state.foundZones.push(zone);
        this.updateView();
        this.notifyProgress();
      });
    });

    this.shadowRoot.querySelectorAll("[data-exit-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        this.state.exitAnswer = button.dataset.exitAnswer;
        this.state.exitCorrect = this.state.exitAnswer === "structure";
        this.updateView();
        this.notifyProgress();
      });
    });

    this.shadowRoot.querySelector("[data-next-section]").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("wireframe-next", { bubbles: true, composed: true }));
    });
  }

  setProgress(progress) {
    if (!progress || typeof progress !== "object") return;
    this.state.conceptDone = progress.conceptDone === true;
    if (Array.isArray(progress.foundZones)) {
      this.state.foundZones = progress.foundZones.filter((zone) => this.anatomyZones.some((item) => item.id === zone));
    } else if (progress.foundZones && typeof progress.foundZones === "object") {
      this.state.foundZones = Object.keys(progress.foundZones).filter(
        (zone) => progress.foundZones[zone] === true && this.anatomyZones.some((item) => item.id === zone),
      );
    }
    this.state.exitAnswer = typeof progress.exitAnswer === "string" ? progress.exitAnswer : "";
    this.state.exitCorrect = progress.exitCorrect === true || this.state.exitAnswer === "structure";
    this.state.selectedZone = this.state.foundZones.at(-1) || "header";
    this.updateView();
  }

  updateView() {
    if (!this.shadowRoot) return;
    const conceptButton = this.shadowRoot.querySelector("[data-concept-button]");
    const conceptStatus = this.shadowRoot.querySelector("[data-concept-status]");
    conceptButton.disabled = this.state.conceptDone;
    conceptButton.textContent = this.state.conceptDone ? "Concept saved ✓" : "I understand the concept";
    conceptStatus.classList.toggle("done", this.state.conceptDone);
    conceptStatus.textContent = this.state.conceptDone ? "✓ Understood" : "+20 XP";

    this.shadowRoot.querySelectorAll("[data-view]").forEach((button) => {
      button.classList.toggle("selected", button.dataset.view === this.state.viewMode);
    });
    const comparison = this.shadowRoot.querySelector("[data-comparison-window]");
    comparison.classList.remove("visual", "wireframe");
    comparison.classList.add(this.state.viewMode);

    this.shadowRoot.querySelectorAll("[data-zone]").forEach((button) => {
      button.classList.toggle("found", this.state.foundZones.includes(button.dataset.zone));
    });
    const foundLabel = this.state.foundZones.length + "/6 found";
    this.shadowRoot.querySelector("[data-found-count]").textContent = foundLabel;
    this.shadowRoot.querySelector("[data-evidence-count]").textContent =
      String(this.state.foundZones.length).padStart(2, "0") + "/06";

    const selected = this.anatomyZones.find((zone) => zone.id === this.state.selectedZone) || this.anatomyZones[0];
    this.shadowRoot.querySelector("[data-evidence-icon]").textContent = selected.icon;
    this.shadowRoot.querySelector("[data-evidence-label]").textContent = selected.label;
    this.shadowRoot.querySelector("[data-evidence-description]").textContent = selected.description;
    this.shadowRoot.querySelector("[data-evidence-list]").innerHTML = this.anatomyZones
      .map((zone) => {
        const found = this.state.foundZones.includes(zone.id);
        return '<span class="' + (found ? "found" : "") + '">' + (found ? "✓" : "?") + " " + zone.label + "</span>";
      })
      .join("");

    this.shadowRoot.querySelectorAll("[data-exit-answer]").forEach((button) => {
      const selectedAnswer = button.dataset.exitAnswer === this.state.exitAnswer;
      button.classList.toggle("chosen", selectedAnswer);
      button.classList.toggle("correct", Boolean(this.state.exitAnswer) && button.dataset.exitAnswer === "structure");
      button.setAttribute("aria-checked", String(selectedAnswer));
      button.querySelector("i").textContent = selectedAnswer ? (this.state.exitCorrect ? "✓" : "×") : "";
    });

    const exitStatus = this.shadowRoot.querySelector("[data-exit-status]");
    exitStatus.classList.toggle("done", this.state.exitCorrect);
    exitStatus.textContent = this.state.exitCorrect ? "✓ Correct" : "+30 XP";
    const feedback = this.shadowRoot.querySelector("[data-exit-feedback]");
    feedback.hidden = !this.state.exitAnswer;
    feedback.className = "quiz-feedback " + (this.state.exitCorrect ? "success" : "retry");
    feedback.textContent = this.state.exitCorrect
      ? "Correct. A wireframe tests information structure before visual design is added."
      : "Not yet. Remember: examine the framework, not decoration or code.";
  }

  notifyProgress() {
    const foundZones = {};
    this.state.foundZones.forEach((zone) => {
      foundZones[zone] = true;
    });
    this.dispatchEvent(
      new CustomEvent("wireframe-progress", {
        bubbles: true,
        composed: true,
        detail: {
          conceptDone: this.state.conceptDone,
          foundZones,
          exitAnswer: this.state.exitAnswer,
          exitCorrect: this.state.exitCorrect,
        },
      }),
    );
  }
}

customElements.define("wireframe-detective-section", WireframeDetectiveSection);
