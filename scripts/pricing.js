const PRICING_ENDPOINT = "/data/pricing.json";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatLimit = (value) => {
  if (value === "Unlimited") return value;
  return new Intl.NumberFormat("en-MY").format(value);
};

const pricingTranslations = {
  ms: {
    "PestFlow AI assistant": "Pembantu AI PestFlow",
    "Offline field sync": "Sinkronisasi lapangan offline",
    "Dispatch and route planner": "Perancang penghantaran dan laluan",
    "Live technician tracking": "Penjejakan juruteknik langsung",
    "LHDN e-invoicing": "e-Invois LHDN",
    "Multi-branch controls": "Kawalan berbilang cawangan",
    "WhatsApp alerts": "Makluman WhatsApp",
    "SMS alerts": "Makluman SMS",
    "Commission tracking": "Penjejakan komisen",
    "ROI and business analytics": "ROI dan analitik perniagaan",
    "White-label branding": "Penjenamaan white-label",
  },
};

const featureLabels = {
  pestflow_ai_chat: "PestFlow AI assistant",
  offline_sync: "Offline field sync",
  dispatch_planner: "Dispatch and route planner",
  live_tracking: "Live technician tracking",
  lhdn_einvoicing: "LHDN e-invoicing",
  multi_branch: "Multi-branch controls",
  whatsapp_alerts: "WhatsApp alerts",
  sms_alerts: "SMS alerts",
  commission_tracking: "Commission tracking",
  roi_analytics: "ROI and business analytics",
  white_label: "White-label branding",
};

const renderComparison = (root, tiers) => {
  const body = root.querySelector("[data-feature-comparison]");
  const locale = document.documentElement.dataset.locale || "en";
  const dictionary = pricingTranslations[locale] || {};
  if (!body || tiers.length !== 3) return;
  body.innerHTML = Object.entries(featureLabels)
    .map(
      ([key, label]) => `
        <tr>
          <th scope="row">${dictionary[label] || label}</th>
          ${tiers
            .map(
              (tier) =>
                `<td aria-label="${tier.features[key] ? "Included" : "Not included"}">${tier.features[key] ? '<span class="feature-yes">✓</span>' : '<span class="feature-no">—</span>'}</td>`,
            )
            .join("")}
        </tr>`,
    )
    .join("");
};

const renderPricing = (root, tiers, billing) => {
  const yearly = billing === "yearly";

  for (const tier of tiers) {
    const card = root.querySelector(`[data-plan="${tier.key}"]`);
    if (!card) continue;

    const price = card.querySelector("[data-plan-price]");
    const cadence = card.querySelector("[data-plan-cadence]");
    const savings = card.querySelector("[data-plan-savings]");
    const limits = card.querySelector("[data-plan-limits]");

    if (price) price.textContent = formatPrice(tier.price[billing]);
    if (cadence) cadence.textContent = yearly ? "/ year" : "/ month";
    if (savings) {
      savings.textContent = yearly
        ? `Save ${tier.yearly_savings_pct}% vs monthly`
        : "Billed monthly";
    }
    if (limits) {
      const branchCount = tier.limits.max_branches;
      const branchLabel = branchCount === 1 ? "branch" : "branches";
      limits.innerHTML = `
        <li>${formatLimit(tier.limits.max_technicians)} technicians</li>
        <li>${formatLimit(tier.limits.max_staff)} office staff</li>
        <li>${formatLimit(branchCount)} ${branchLabel}</li>
        <li>${formatLimit(tier.limits.max_orders_pm)} jobs / month</li>
      `;
    }
  }
};

const pricingRoot = document.querySelector("[data-live-pricing]");

if (pricingRoot instanceof HTMLElement) {
  /** @type {HTMLElement | null} */
  const status = pricingRoot.querySelector("[data-pricing-status]");
  const billingButtons = [
    ...pricingRoot.querySelectorAll("[data-billing]"),
  ].filter((node) => node instanceof HTMLButtonElement);
  let tiers = [];
  let billing = "monthly";

  const setBilling = (nextBilling) => {
    billing = nextBilling;
    billingButtons.forEach((button) => {
      const active = button.dataset.billing === billing;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("active", active);
    });
    renderPricing(pricingRoot, tiers, billing);
  };

  billingButtons.forEach((button) =>
    button.addEventListener("click", () => setBilling(button.dataset.billing)),
  );
  addEventListener("pestflow:locale", () => {
    renderComparison(document, tiers);
    if (status && tiers.length) {
      status.textContent =
        document.documentElement.dataset.locale === "ms"
          ? `Harga MYR daripada API pihak pertama PestFlow · direkodkan ${status.dataset.capturedAt}`
          : `MYR pricing from PestFlow’s first-party API · captured ${status.dataset.capturedAt}`;
    }
  });

  fetch(PRICING_ENDPOINT)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Pricing request failed: ${response.status}`);
      return response.json();
    })
    .then((payload) => {
      if (!Array.isArray(payload?.tiers)) {
        throw new Error("Pricing response has an unexpected shape");
      }
      tiers = payload.tiers;
      renderPricing(pricingRoot, tiers, billing);
      renderComparison(document, tiers);
      if (status) {
        status.dataset.capturedAt = payload.capturedAt;
        status.textContent =
          document.documentElement.dataset.locale === "ms"
            ? `Harga MYR daripada API pihak pertama PestFlow · direkodkan ${payload.capturedAt}`
            : `MYR pricing from PestFlow’s first-party API · captured ${payload.capturedAt}`;
      }
      pricingRoot.removeAttribute("aria-busy");
    })
    .catch(() => {
      if (status) {
        status.textContent =
          "Live pricing is temporarily unavailable. Contact sales for current plan details.";
      }
      pricingRoot.removeAttribute("aria-busy");
      pricingRoot.classList.add("pricing-unavailable");
    });
}
