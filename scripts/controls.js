const navActions = document.querySelector(".nav-actions");
const navLinks = document.querySelector(".nav-links");
const mobileMenuControls = document.querySelector("[data-mobile-menu]");

const solutionItems = [
  {
    href: "/pest-control-software-malaysia/",
    label: { en: "Malaysia overview", ms: "Gambaran Malaysia" },
    description: {
      en: "MYR, EN/BM, SST and MyInvois workflows",
      ms: "MYR, EN/BM, SST dan aliran MyInvois",
    },
    code: "MY",
  },
  {
    href: "/pest-control-software-small-business/",
    label: { en: "Small business", ms: "Perniagaan kecil" },
    description: {
      en: "Customers, jobs, reports and billing for lean teams",
      ms: "Pelanggan, kerja, laporan dan bil untuk pasukan kecil",
    },
    code: "SM",
  },
  {
    href: "/commercial-pest-control-software/",
    label: { en: "Commercial service", ms: "Servis komersial" },
    description: {
      en: "Contracts, sites, assets and recurring evidence",
      ms: "Kontrak, tapak, aset dan bukti berulang",
    },
    code: "CO",
  },
  {
    href: "/pest-control-scheduling-software/",
    label: { en: "Scheduling", ms: "Penjadualan" },
    description: {
      en: "Recurring visits, assignment and route planning",
      ms: "Lawatan berulang, tugasan dan perancangan laluan",
    },
    code: "SC",
  },
  {
    href: "/pest-control-technician-app/",
    label: { en: "Technician app", ms: "Aplikasi juruteknik" },
    description: {
      en: "Offline jobs, check-in, evidence and reports",
      ms: "Kerja offline, daftar masuk, bukti dan laporan",
    },
    code: "FL",
  },
];

const getLocale = () =>
  document.documentElement.dataset.locale === "ms" ? "ms" : "en";

const createSolutionLinks = (locale, mobile = false) =>
  solutionItems
    .map(
      (item) => `
        <a href="${item.href}" class="${mobile ? "mobile-solution-link" : "solution-menu-link"}"${location.pathname === item.href ? ' aria-current="page"' : ""}>
          <span class="solution-code" aria-hidden="true">${item.code}</span>
          <span><strong>${item.label[locale]}</strong><small>${item.description[locale]}</small></span>
          <i aria-hidden="true">→</i>
        </a>`,
    )
    .join("");

const createDesktopSolutions = () => {
  if (!navLinks || navLinks.querySelector("[data-solutions-menu]")) return;
  const wrapper = document.createElement("div");
  wrapper.className = "solutions-nav";
  wrapper.dataset.solutionsMenu = "";
  wrapper.innerHTML = `
    <button type="button" class="solutions-trigger" aria-expanded="false" aria-controls="solutions-panel">
      <span data-solutions-label>Solutions</span><i aria-hidden="true">⌄</i>
    </button>
    <div class="solutions-panel" id="solutions-panel" hidden>
      <div class="solutions-panel-head">
        <div><small>PESTFLOW SOLUTIONS</small><strong>Start with the work you need to improve.</strong></div>
        <a href="/product/">All product modules →</a>
      </div>
      <div class="solutions-menu-grid" data-solutions-links>${createSolutionLinks(getLocale())}</div>
    </div>
  `;
  const workflowLink = navLinks.querySelector('a[href="/workflow/"]');
  navLinks.insertBefore(wrapper, workflowLink || null);
};

const createMobileSolutions = () => {
  if (
    !mobileMenuControls ||
    mobileMenuControls.querySelector("[data-mobile-solutions]")
  )
    return;
  const details = document.createElement("details");
  details.className = "mobile-solutions";
  details.dataset.mobileSolutions = "";
  details.innerHTML = `
    <summary><span data-solutions-label>Solutions</span><i aria-hidden="true">+</i></summary>
    <div class="mobile-solutions-list" data-mobile-solution-links>${createSolutionLinks(getLocale(), true)}</div>
  `;
  const workflowLink = mobileMenuControls.querySelector('a[href="/workflow/"]');
  mobileMenuControls.insertBefore(details, workflowLink || null);
};

createDesktopSolutions();
createMobileSolutions();

const createPreferenceControls = (compact = false) => {
  const group = document.createElement("div");
  group.className = compact
    ? "preference-controls preference-controls-mobile"
    : "preference-controls";
  group.setAttribute("aria-label", "Display and language preferences");
  group.innerHTML = `
    <button type="button" class="preference-button theme-pull" data-theme-toggle aria-pressed="false">
      <span class="theme-pull-line" aria-hidden="true"></span>
      <span class="theme-pull-knob" aria-hidden="true"></span>
      <span data-theme-label>Dark</span>
    </button>
    <button type="button" class="preference-button" data-language-toggle>BM</button>
  `;
  return group;
};

if (navActions && !navActions.querySelector("[data-theme-toggle]")) {
  navActions.insertBefore(
    createPreferenceControls(),
    navActions.querySelector("[data-menu-button]"),
  );
}

if (
  mobileMenuControls &&
  !mobileMenuControls.querySelector("[data-theme-toggle]")
) {
  mobileMenuControls.append(createPreferenceControls(true));
}

const currentTheme =
  localStorage.getItem("pestflow-theme") ||
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const currentLocale = localStorage.getItem("pestflow-locale") || "en";

document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  const label = button.querySelector("[data-theme-label]");
  if (label) label.textContent = currentTheme === "dark" ? "Light" : "Dark";
  button.setAttribute("aria-pressed", String(currentTheme === "dark"));
});
document.querySelectorAll("[data-language-toggle]").forEach((button) => {
  button.textContent = currentLocale === "ms" ? "EN" : "BM";
});

const solutionsWrapper = document.querySelector("[data-solutions-menu]");
const solutionsTrigger = solutionsWrapper?.querySelector(".solutions-trigger");
const solutionsPanel = solutionsWrapper?.querySelector(".solutions-panel");
if (solutionsPanel instanceof HTMLElement) document.body.append(solutionsPanel);
let closeTimer;

const setSolutionsOpen = (open) => {
  if (
    !(solutionsTrigger instanceof HTMLElement) ||
    !(solutionsPanel instanceof HTMLElement)
  )
    return;
  clearTimeout(closeTimer);
  solutionsTrigger.setAttribute("aria-expanded", String(open));
  solutionsPanel.hidden = !open;
  solutionsWrapper?.classList.toggle("is-open", open);
};

solutionsTrigger?.addEventListener("click", () =>
  setSolutionsOpen(solutionsTrigger.getAttribute("aria-expanded") !== "true"),
);
solutionsWrapper?.addEventListener("pointerenter", () =>
  setSolutionsOpen(true),
);
solutionsWrapper?.addEventListener("pointerleave", () => {
  closeTimer = setTimeout(() => setSolutionsOpen(false), 180);
});
solutionsPanel?.addEventListener("pointerenter", () => setSolutionsOpen(true));
solutionsPanel?.addEventListener("pointerleave", () => {
  closeTimer = setTimeout(() => setSolutionsOpen(false), 140);
});
solutionsPanel?.addEventListener("focusin", () => setSolutionsOpen(true));
solutionsWrapper?.addEventListener("focusout", (event) => {
  if (!(event instanceof FocusEvent)) return;
  if (
    !(event.relatedTarget instanceof Node) ||
    (!solutionsWrapper.contains(event.relatedTarget) &&
      !solutionsPanel?.contains(event.relatedTarget))
  ) {
    closeTimer = setTimeout(() => setSolutionsOpen(false), 80);
  }
});
solutionsTrigger?.addEventListener("keydown", (event) => {
  if (!(event instanceof KeyboardEvent) || event.key !== "ArrowDown") return;
  event.preventDefault();
  setSolutionsOpen(true);
  const firstLink = solutionsPanel?.querySelector("[data-solutions-links] a");
  if (firstLink instanceof HTMLElement) firstLink.focus();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key !== "Escape" ||
    solutionsTrigger?.getAttribute("aria-expanded") !== "true"
  )
    return;
  setSolutionsOpen(false);
  if (solutionsTrigger instanceof HTMLElement) solutionsTrigger.focus();
});
document.addEventListener("pointerdown", (event) => {
  if (
    !(event.target instanceof Node) ||
    solutionsWrapper?.contains(event.target) ||
    solutionsPanel?.contains(event.target)
  )
    return;
  setSolutionsOpen(false);
});

const updateSolutionLanguage = () => {
  const locale = getLocale();
  document.querySelectorAll("[data-solutions-label]").forEach((node) => {
    node.textContent = locale === "ms" ? "Solusi" : "Solutions";
  });
  const desktopLinks = document.querySelector("[data-solutions-links]");
  const mobileLinks = document.querySelector("[data-mobile-solution-links]");
  if (desktopLinks) desktopLinks.innerHTML = createSolutionLinks(locale);
  if (mobileLinks) mobileLinks.innerHTML = createSolutionLinks(locale, true);
};
addEventListener("pestflow:locale", updateSolutionLanguage);
updateSolutionLanguage();
