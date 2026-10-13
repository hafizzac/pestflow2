const setupContent = {
  en: {
    fresh: {
      steps: [
        [
          "Add company details",
          "Set business profile, language and operating basics.",
        ],
        [
          "Configure services",
          "Add the service types and visit frequency you sell.",
        ],
        ["Add office and field team", "Create roles and technician access."],
        ["Create the first route", "Add customers, sites and scheduled work."],
        [
          "Complete the first report",
          "Run one visit from check-in to customer record.",
        ],
      ],
      assurance: "Your progress is saved.",
      actionTitle: "Build the operating foundation.",
      actionCopy:
        "Add the company, services, team and first service route in a guided sequence.",
      cta: "Start guided setup",
    },
    migrate: {
      steps: [
        [
          "Choose what to bring",
          "Identify active customers, agreements and upcoming work.",
        ],
        ["Review field mapping", "Match source columns to PestFlow records."],
        [
          "Prepare the team",
          "Confirm users, roles, branches and technician access.",
        ],
        [
          "Preview imported work",
          "Review customers, routes and service commitments.",
        ],
        [
          "Approve the move",
          "Nothing imports until the reviewed scope is confirmed.",
        ],
      ],
      assurance: "Nothing imports until you confirm.",
      actionTitle: "Preview your move.",
      actionCopy:
        "Review how selected records map before anything changes in the operating system.",
      cta: "Plan migration",
    },
  },
  ms: {
    fresh: {
      steps: [
        [
          "Tambah butiran syarikat",
          "Tetapkan profil perniagaan, bahasa dan asas operasi.",
        ],
        [
          "Konfigurasi servis",
          "Tambah jenis servis dan kekerapan lawatan yang anda jual.",
        ],
        [
          "Tambah pasukan pejabat dan lapangan",
          "Cipta peranan dan akses juruteknik.",
        ],
        [
          "Cipta laluan pertama",
          "Tambah pelanggan, tapak dan kerja berjadual.",
        ],
        [
          "Lengkapkan laporan pertama",
          "Jalankan satu lawatan daripada daftar masuk hingga rekod pelanggan.",
        ],
      ],
      assurance: "Kemajuan anda disimpan.",
      actionTitle: "Bina asas operasi.",
      actionCopy:
        "Tambah syarikat, servis, pasukan dan laluan servis pertama dalam urutan berpandu.",
      cta: "Mulakan setup berpandu",
    },
    migrate: {
      steps: [
        [
          "Pilih data untuk dibawa",
          "Kenal pasti pelanggan aktif, perjanjian dan kerja akan datang.",
        ],
        ["Semak pemetaan data", "Padankan lajur sumber kepada rekod PestFlow."],
        [
          "Sediakan pasukan",
          "Sahkan pengguna, peranan, cawangan dan akses juruteknik.",
        ],
        [
          "Pratonton kerja yang diimport",
          "Semak pelanggan, laluan dan komitmen servis.",
        ],
        [
          "Luluskan pemindahan",
          "Tiada data diimport sehingga skop yang disemak disahkan.",
        ],
      ],
      assurance: "Tiada data diimport sehingga anda mengesahkan.",
      actionTitle: "Pratonton pemindahan anda.",
      actionCopy:
        "Semak bagaimana rekod dipetakan sebelum apa-apa berubah dalam sistem operasi.",
      cta: "Rancang migrasi",
    },
  },
};

const setupJourney = document.querySelector("[data-setup-journey]");
if (setupJourney instanceof HTMLElement) {
  const buttons = [
    ...setupJourney.querySelectorAll("[data-setup-path]"),
  ].filter((node) => node instanceof HTMLButtonElement);
  const steps = setupJourney.querySelector("[data-setup-steps]");
  const assurance = setupJourney.querySelector("[data-setup-assurance]");
  const preview = setupJourney.querySelector("[data-setup-preview]");
  const actionTitle = setupJourney.querySelector("[data-setup-action-title]");
  const actionCopy = setupJourney.querySelector("[data-setup-action-copy]");
  const cta = setupJourney.querySelector("[data-setup-cta]");
  let activePath = "fresh";

  const renderSetup = () => {
    const locale =
      document.documentElement.dataset.locale === "ms" ? "ms" : "en";
    const data = setupContent[locale][activePath];
    if (steps) {
      steps.innerHTML = data.steps
        .map(
          ([title, copy], index) => `
            <li>
              <span>${index + 1}</span>
              <div><strong>${title}</strong><small>${copy}</small></div>
            </li>`,
        )
        .join("");
    }
    if (assurance)
      assurance.innerHTML = `<span aria-hidden="true">✓</span>${data.assurance}`;
    if (preview) {
      preview.innerHTML = `<span>${activePath === "fresh" ? "STEP 01" : "MIGRATION PREVIEW"}</span><strong>${data.steps[0][0]}</strong><small>${data.steps[0][1]}</small>`;
    }
    if (actionTitle) actionTitle.textContent = data.actionTitle;
    if (actionCopy) actionCopy.textContent = data.actionCopy;
    if (cta) {
      cta.textContent = data.cta;
      cta.setAttribute(
        "href",
        activePath === "fresh"
          ? "https://app.pestflow.my/register"
          : "/contact/",
      );
    }
    buttons.forEach((button) => {
      const selected = button.dataset.setupPath === activePath;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      activePath = button.dataset.setupPath || "fresh";
      renderSetup();
    });
    button.addEventListener("keydown", (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? buttons.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) %
              buttons.length;
      activePath = buttons[next].dataset.setupPath || "fresh";
      renderSetup();
      buttons[next].focus();
    });
  });
  addEventListener("pestflow:locale", renderSetup);
  renderSetup();
}
