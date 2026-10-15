const navActions = document.querySelector(".nav-actions");
const navLinks = document.querySelector(".nav-links");
/** @type {HTMLElement | null} */
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

const productItems = [
  {
    href: "/product/",
    label: { en: "Product overview", ms: "Gambaran produk" },
    description: {
      en: "Platform, modules and connected records",
      ms: "Platform, modul dan rekod yang bersambung",
    },
    code: "01",
  },
  {
    href: "/workflow/",
    label: { en: "Workflow", ms: "Aliran kerja" },
    description: {
      en: "Follow a job from enquiry to invoice",
      ms: "Ikuti kerja daripada pertanyaan hingga invois",
    },
    code: "02",
  },
  {
    href: "/compliance/",
    label: { en: "Compliance", ms: "Pematuhan" },
    description: {
      en: "MyInvois, SST, GPS and visit evidence",
      ms: "MyInvois, SST, GPS dan bukti lawatan",
    },
    code: "03",
  },
];

const companyItems = [
  {
    href: "/about/",
    label: { en: "About PestFlow", ms: "Tentang PestFlow" },
    description: {
      en: "Why the platform exists and who builds it",
      ms: "Tujuan platform dan pasukan yang membinanya",
    },
    code: "AB",
  },
  {
    href: "/contact/",
    label: { en: "Contact sales", ms: "Hubungi jualan" },
    description: {
      en: "Discuss your operation, demo or migration",
      ms: "Bincang operasi, demo atau migrasi anda",
    },
    code: "CT",
  },
  {
    href: "/brand/",
    label: { en: "Brand", ms: "Jenama" },
    description: {
      en: "PestFlow identity, design and voice",
      ms: "Identiti, reka bentuk dan suara PestFlow",
    },
    code: "BR",
  },
];

const getLocale = () =>
  document.documentElement.dataset.locale === "ms" ? "ms" : "en";

const createNavigationLinks = (items, locale, className) =>
  items
    .map(
      (item) => `
        <a href="${item.href}" class="${className}"${location.pathname === item.href ? ' aria-current="page"' : ""}>
          <span class="solution-code" aria-hidden="true">${item.code}</span>
          <span><strong>${item.label[locale]}</strong><small>${item.description[locale]}</small></span>
          <i aria-hidden="true">→</i>
        </a>`,
    )
    .join("");

const createSolutionLinks = (locale, mobile = false) =>
  createNavigationLinks(
    solutionItems,
    locale,
    mobile ? "mobile-solution-link" : "solution-menu-link",
  );

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

const createMobileNavigation = (locale) => `
  <div class="mobile-menu-viewport">
    <div class="mobile-menu-track" data-mobile-menu-track>
      <div class="mobile-menu-panel mobile-menu-main" data-mobile-menu-main aria-hidden="false">
        <div class="mobile-menu-heading">
          <small>${locale === "ms" ? "TEROKAI PESTFLOW" : "EXPLORE PESTFLOW"}</small>
          <strong>${locale === "ms" ? "Pilih tempat untuk bermula." : "Choose where to start."}</strong>
        </div>
        <button class="mobile-menu-row mobile-menu-parent" id="mobile-trigger-product" type="button" aria-expanded="false" aria-controls="mobile-panel-product" data-mobile-menu-open="product">
          <span><strong>${locale === "ms" ? "Produk" : "Product"}</strong><small>${locale === "ms" ? "Platform, aliran kerja dan pematuhan" : "Platform, workflow and compliance"}</small></span><i aria-hidden="true">→</i>
        </button>
        <button class="mobile-menu-row mobile-menu-parent" id="mobile-trigger-solutions" type="button" aria-expanded="false" aria-controls="mobile-panel-solutions" data-mobile-menu-open="solutions">
          <span><strong>${locale === "ms" ? "Solusi" : "Solutions"}</strong><small>${locale === "ms" ? "Pilih mengikut jenis operasi" : "Choose by operating model"}</small></span><i aria-hidden="true">→</i>
        </button>
        <a class="mobile-menu-row" href="/pricing/"><span><strong>${locale === "ms" ? "Harga" : "Pricing"}</strong><small>${locale === "ms" ? "Pelan dan harga MYR semasa" : "Plans and current MYR pricing"}</small></span></a>
        <a class="mobile-menu-row" href="/blog/"><span><strong>Blog</strong><small>${locale === "ms" ? "Panduan untuk operator pest control" : "Guides for pest control operators"}</small></span></a>
        <button class="mobile-menu-row mobile-menu-parent" id="mobile-trigger-company" type="button" aria-expanded="false" aria-controls="mobile-panel-company" data-mobile-menu-open="company">
          <span><strong>${locale === "ms" ? "Syarikat" : "Company"}</strong><small>${locale === "ms" ? "Tentang, hubungi dan jenama" : "About, contact and brand"}</small></span><i aria-hidden="true">→</i>
        </button>
        <a class="mobile-menu-row mobile-menu-login" href="https://app.pestflow.my/"><span><strong>${locale === "ms" ? "Log masuk" : "Log in"}</strong><small>app.pestflow.my</small></span><i aria-hidden="true">↗</i></a>
        <div data-mobile-preferences></div>
      </div>
      <div class="mobile-menu-submenu-stack">
        <section class="mobile-menu-panel mobile-menu-submenu" id="mobile-panel-product" data-mobile-submenu="product" aria-labelledby="mobile-trigger-product" aria-hidden="true" hidden inert>
          <button class="mobile-menu-back" type="button" aria-label="Back to main menu" data-mobile-menu-back><i aria-hidden="true">←</i><span>${locale === "ms" ? "Kembali" : "Back"}</span></button>
          <div class="mobile-menu-heading"><small>PESTFLOW</small><strong>${locale === "ms" ? "Produk" : "Product"}</strong></div>
          <div class="mobile-submenu-list" data-mobile-product-links>${createNavigationLinks(productItems, locale, "mobile-solution-link")}</div>
        </section>
        <section class="mobile-menu-panel mobile-menu-submenu" id="mobile-panel-solutions" data-mobile-submenu="solutions" aria-labelledby="mobile-trigger-solutions" aria-hidden="true" hidden inert>
          <button class="mobile-menu-back" type="button" aria-label="Back to main menu" data-mobile-menu-back><i aria-hidden="true">←</i><span>${locale === "ms" ? "Kembali" : "Back"}</span></button>
          <div class="mobile-menu-heading"><small>PESTFLOW</small><strong>${locale === "ms" ? "Solusi" : "Solutions"}</strong></div>
          <div class="mobile-submenu-list" data-mobile-solution-links>${createSolutionLinks(locale, true)}</div>
        </section>
        <section class="mobile-menu-panel mobile-menu-submenu" id="mobile-panel-company" data-mobile-submenu="company" aria-labelledby="mobile-trigger-company" aria-hidden="true" hidden inert>
          <button class="mobile-menu-back" type="button" aria-label="Back to main menu" data-mobile-menu-back><i aria-hidden="true">←</i><span>${locale === "ms" ? "Kembali" : "Back"}</span></button>
          <div class="mobile-menu-heading"><small>PESTFLOW</small><strong>${locale === "ms" ? "Syarikat" : "Company"}</strong></div>
          <div class="mobile-submenu-list" data-mobile-company-links>${createNavigationLinks(companyItems, locale, "mobile-solution-link")}</div>
        </section>
      </div>
    </div>
  </div>
`;

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

createDesktopSolutions();

if (mobileMenuControls) {
  mobileMenuControls.innerHTML = createMobileNavigation(getLocale());
  mobileMenuControls.dataset.activePanel = "main";
  const preferenceSlot = mobileMenuControls.querySelector(
    "[data-mobile-preferences]",
  );
  preferenceSlot?.append(createPreferenceControls(true));
}

if (navActions && !navActions.querySelector("[data-theme-toggle]")) {
  navActions.insertBefore(
    createPreferenceControls(),
    navActions.querySelector("[data-menu-button]"),
  );
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
  if (desktopLinks) desktopLinks.innerHTML = createSolutionLinks(locale);

  if (mobileMenuControls) {
    mobileMenuControls.innerHTML = createMobileNavigation(locale);
    mobileMenuControls.dataset.activePanel = "main";
    const preferenceSlot = mobileMenuControls.querySelector(
      "[data-mobile-preferences]",
    );
    preferenceSlot?.append(createPreferenceControls(true));
  }
};
addEventListener("pestflow:locale", updateSolutionLanguage);
updateSolutionLanguage();
