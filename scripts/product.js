const descriptionTranslations = {
  ms: {
    "Operational answers and supported actions from information already inside PestFlow.":
      "Jawapan operasi dan tindakan disokong daripada maklumat yang sudah ada dalam PestFlow.",
    "Keep ownership, status and follow-ups visible from enquiry onward.":
      "Pastikan pemilikan, status dan susulan kelihatan sejak pertanyaan diterima.",
    "Capture site context and risk information before the proposal.":
      "Rekod konteks tapak dan maklumat risiko sebelum cadangan disediakan.",
    "Prepare the scope and collect electronic customer acceptance.":
      "Sediakan skop dan dapatkan penerimaan elektronik pelanggan.",
    "Structure contracted work and recurring service commitments.":
      "Susun kerja kontrak dan komitmen servis berulang.",
    "Coordinate assignments, route order and technician workload.":
      "Selaraskan tugasan, susunan laluan dan beban kerja juruteknik.",
    "Keep attendance and location-linked operational records.":
      "Simpan rekod kehadiran dan operasi yang berkaitan lokasi.",
    "Attach check-in and asset-inspection records to the visit.":
      "Lampirkan rekod daftar masuk dan pemeriksaan aset pada lawatan.",
    "Keep field imagery and its metadata with the service record.":
      "Simpan imej lapangan dan metadata bersama rekod servis.",
    "Track inspected devices against the customer site and history.":
      "Jejak peranti diperiksa mengikut tapak pelanggan dan sejarahnya.",
    "Generate the completed customer record from field data.":
      "Jana rekod pelanggan yang lengkap daripada data lapangan.",
    "Prepare invoices with configurable local tax treatment.":
      "Sediakan invois dengan konfigurasi cukai tempatan.",
    "Connect eligible invoices to PestFlow’s MyInvois workflow.":
      "Hubungkan invois yang layak kepada aliran MyInvois PestFlow.",
    "Synchronize supported contact and invoice records.":
      "Selaraskan rekod kontak dan invois yang disokong.",
    "Track operational stock as field teams use it.":
      "Jejak stok operasi semasa pasukan lapangan menggunakannya.",
    "Calculate team incentives from connected operational records.":
      "Kira insentif pasukan daripada rekod operasi bersambung.",
    "Give customers access to service history and records.":
      "Berikan pelanggan akses kepada sejarah dan rekod servis.",
    "Keep customer issues and follow-up ownership visible.":
      "Pastikan isu pelanggan dan pemilikan susulan kelihatan.",
    "Review work volume, revenue and branch-level patterns.":
      "Semak jumlah kerja, hasil dan corak mengikut cawangan.",
  },
};

const moduleTranslations = {
  ms: {
    sales: "Jualan & CRM",
    field: "Operasi lapangan",
    finance: "Kewangan",
    insight: "Pelanggan & BI",
    "PestFlow AI Assistant": "Pembantu AI PestFlow",
    "Lead CRM & Sales Pipeline": "CRM Lead & Pipeline Jualan",
    "Survey & Site Assessment": "Tinjauan & Penilaian Tapak",
    "Quotation & Proposal Portal": "Portal Sebut Harga & Cadangan",
    "Service Agreement Engine": "Enjin Perjanjian Servis",
    "Dispatch & Route Optimizer": "Penghantaran & Pengoptimum Laluan",
    "Staff Attendance & Geofencing": "Kehadiran Staf & Geofencing",
    "Field Verification (GPS & QR)": "Pengesahan Lapangan (GPS & QR)",
    "EXIF Camera Controls": "Kawalan Kamera EXIF",
    "Deployed Asset & Bait Station": "Aset Dipasang & Stesen Umpan",
    "Digital Service Reports": "Laporan Servis Digital",
    "SST Invoicing & Billing": "Invois & Bil SST",
    "LHDN e-Invoicing": "e-Invois LHDN",
    "Financio Cloud Accounting Sync": "Sinkronisasi Akaun Awan Financio",
    "Van Stock & Inventory": "Stok Van & Inventori",
    "Commission & Incentive Engine": "Enjin Komisen & Insentif",
    "Customer Self-Service Portal": "Portal Layan Diri Pelanggan",
    "Helpdesk & Support Tickets": "Helpdesk & Tiket Sokongan",
    "Business Intelligence & Analytics": "Risikan Perniagaan & Analitik",
  },
};

const moduleData = [
  [
    "sales",
    "PestFlow AI Assistant",
    "Operational answers and supported actions from information already inside PestFlow.",
    "AI",
  ],
  [
    "sales",
    "Lead CRM & Sales Pipeline",
    "Keep ownership, status and follow-ups visible from enquiry onward.",
    "CRM",
  ],
  [
    "sales",
    "Survey & Site Assessment",
    "Capture site context and risk information before the proposal.",
    "SITE",
  ],
  [
    "sales",
    "Quotation & Proposal Portal",
    "Prepare the scope and collect electronic customer acceptance.",
    "QUOTE",
  ],
  [
    "field",
    "Service Agreement Engine",
    "Structure contracted work and recurring service commitments.",
    "TERM",
  ],
  [
    "field",
    "Dispatch & Route Optimizer",
    "Coordinate assignments, route order and technician workload.",
    "ROUTE",
  ],
  [
    "field",
    "Staff Attendance & Geofencing",
    "Keep attendance and location-linked operational records.",
    "GPS",
  ],
  [
    "field",
    "Field Verification (GPS & QR)",
    "Attach check-in and asset-inspection records to the visit.",
    "VERIFY",
  ],
  [
    "field",
    "EXIF Camera Controls",
    "Keep field imagery and its metadata with the service record.",
    "PHOTO",
  ],
  [
    "field",
    "Deployed Asset & Bait Station",
    "Track inspected devices against the customer site and history.",
    "ASSET",
  ],
  [
    "field",
    "Digital Service Reports",
    "Generate the completed customer record from field data.",
    "PDF",
  ],
  [
    "finance",
    "SST Invoicing & Billing",
    "Prepare invoices with configurable local tax treatment.",
    "SST",
  ],
  [
    "finance",
    "LHDN e-Invoicing",
    "Connect eligible invoices to PestFlow’s MyInvois workflow.",
    "LHDN",
  ],
  [
    "finance",
    "Financio Cloud Accounting Sync",
    "Synchronize supported contact and invoice records.",
    "SYNC",
  ],
  [
    "finance",
    "Van Stock & Inventory",
    "Track operational stock as field teams use it.",
    "STOCK",
  ],
  [
    "finance",
    "Commission & Incentive Engine",
    "Calculate team incentives from connected operational records.",
    "COMM",
  ],
  [
    "insight",
    "Customer Self-Service Portal",
    "Give customers access to service history and records.",
    "PORTAL",
  ],
  [
    "insight",
    "Helpdesk & Support Tickets",
    "Keep customer issues and follow-up ownership visible.",
    "HELP",
  ],
  [
    "insight",
    "Business Intelligence & Analytics",
    "Review work volume, revenue and branch-level patterns.",
    "BI",
  ],
];

const explorer = document.querySelector("[data-tool-explorer]");

if (explorer instanceof HTMLElement) {
  const grid = explorer.querySelector("[data-tool-grid]");
  const count = explorer.querySelector("[data-tool-count]");
  const buttons = [...explorer.querySelectorAll("[data-tool-filter]")].filter(
    (node) => node instanceof HTMLButtonElement,
  );

  let activeFilter = "all";
  const render = (filter) => {
    activeFilter = filter;
    const locale = document.documentElement.dataset.locale || "en";
    const dictionary = moduleTranslations[locale] || {};
    const descriptionDictionary = descriptionTranslations[locale] || {};
    const visible =
      filter === "all"
        ? moduleData
        : moduleData.filter(([category]) => category === filter);
    if (count) {
      count.textContent =
        locale === "ms"
          ? `${visible.length} modul`
          : `${visible.length} modules`;
    }
    if (grid) {
      grid.innerHTML = visible
        .map(
          ([category, name, description, code], index) => `
          <article class="tool-card" data-category="${category}">
            <div class="tool-visual tool-visual-${category}">
              <span>${code}</span>
              <i>${String(index + 1).padStart(2, "0")}</i>
            </div>
            <div class="tool-copy">
              <small>${dictionary[category] || category}</small>
              <h3>${dictionary[name] || name}</h3>
              <p>${descriptionDictionary[description] || description}</p>
            </div>
          </article>`,
        )
        .join("");
    }
    buttons.forEach((button) => {
      const active = button.dataset.toolFilter === filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  buttons.forEach((button) =>
    button.addEventListener("click", () => render(button.dataset.toolFilter)),
  );
  addEventListener("pestflow:locale", () => render(activeFilter));
  render("all");
}
