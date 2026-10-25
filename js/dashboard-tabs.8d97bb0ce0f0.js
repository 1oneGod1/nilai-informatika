/* ========================================================
   dashboard-tabs.js
   Tab per tugas di dashboard guru: Buku nilai, Penilaian rubrik,
   Materi kelas, Pengaturan. Hanya mengatur tampilan; logika data
   tetap di teacher.js dan teacher-assessment.js.
   ======================================================== */
(() => {
  const TABS = ["nilai", "penilaian", "materi", "pengaturan"];
  const STORAGE_KEY = "csReportDashboardTab";
  const tabButtons = () => document.querySelectorAll("[data-dash-tab]");
  const panelFor = (id) => document.querySelector(`[data-dash-panel="${id}"]`);

  function showDashboardTab(id, { focus = false, updateHash = true } = {}) {
    if (!TABS.includes(id)) id = "nilai";
    TABS.forEach((name) => {
      const panel = panelFor(name);
      if (panel) panel.hidden = name !== id;
    });
    tabButtons().forEach((button) => {
      const active = button.dataset.dashTab === id;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
    if (updateHash && location.hash !== "#" + id) {
      history.replaceState(null, "", location.pathname + location.search + "#" + id);
    }
  }
  window.showDashboardTab = showDashboardTab;

  // Tombol lain (mis. "Nilai tugas BSD") menggulir ke panel di tab lain;
  // buka tab itu dahulu agar panelnya terlihat.
  const nativeScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (...args) {
    const panel = this.closest?.("[data-dash-panel]");
    if (panel?.hidden) showDashboardTab(panel.dataset.dashPanel);
    return nativeScrollIntoView.apply(this, args);
  };

  function bindTabs() {
    tabButtons().forEach((button) => {
      button.addEventListener("click", () => {
        showDashboardTab(button.dataset.dashTab);
        window.scrollTo({ top: 0 });
      });
      button.addEventListener("keydown", (event) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
        if (!step) return;
        event.preventDefault();
        const index = TABS.indexOf(button.dataset.dashTab);
        showDashboardTab(TABS[(index + step + TABS.length) % TABS.length], { focus: true });
      });
    });
    window.addEventListener("hashchange", () => {
      const id = location.hash.slice(1);
      if (TABS.includes(id)) showDashboardTab(id, { updateHash: false });
    });
  }

  function initialTab() {
    const fromHash = location.hash.slice(1);
    if (TABS.includes(fromHash)) return fromHash;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (TABS.includes(saved)) return saved;
    } catch {}
    return "nilai";
  }

  function bindAddStudent() {
    const toggle = document.getElementById("dashAddToggle");
    const panel = document.getElementById("dashAddPanel");
    if (!toggle || !panel) return;
    toggle.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      toggle.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) document.getElementById("nis")?.focus();
    });
  }

  // Ringkasan status dibaca dari tabel yang sudah dirender teacher.js.
  function updateStats() {
    const counts = { Tuntas: 0, Remedial: 0, Susulan: 0 };
    let pendingPasswords = 0;
    document.querySelectorAll("#tableBody tr").forEach((row) => {
      for (const chip of row.querySelectorAll("span")) {
        const label = chip.textContent.trim();
        if (label in counts && chip.children.length === 1) {
          counts[label]++;
          break;
        }
      }
      if (row.textContent.includes("Pengajuan Reset")) pendingPasswords++;
    });
    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    set("dashStatTotal", document.getElementById("shownCount")?.textContent || "0");
    set("dashStatTuntas", counts.Tuntas);
    set("dashStatRemedial", counts.Remedial);
    set("dashStatSusulan", counts.Susulan);
    set("dashStatPassword", pendingPasswords);
    const passwordWrap = document.getElementById("dashStatPasswordWrap");
    if (passwordWrap) passwordWrap.hidden = pendingPasswords === 0;
  }

  // Lencana tab Pengaturan mengikuti jumlah guru yang menunggu verifikasi.
  function updateSettingsBadge() {
    const source = document.getElementById("adminBadgeCount");
    const badge = document.getElementById("dashSettingsBadge");
    if (!source || !badge) return;
    const count = Number(source.textContent) || 0;
    badge.textContent = count;
    badge.hidden = source.style.display === "none" || count === 0;
  }

  function observe(id, callback, options) {
    const el = document.getElementById(id);
    if (el) new MutationObserver(callback).observe(el, options);
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindTabs();
    bindAddStudent();
    showDashboardTab(initialTab(), { updateHash: false });
    observe("tableBody", updateStats, { childList: true, subtree: true });
    observe("adminBadgeCount", updateSettingsBadge, { childList: true, characterData: true, subtree: true, attributes: true });
    updateStats();
    updateSettingsBadge();
  });
})();
