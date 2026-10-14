import {
  PRICING_ENDPOINT,
  normalizePricingPayload,
  resolvePlanPrice,
} from "./pricing-data.js";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
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
    const resolved = resolvePlanPrice(tier, billing);

    if (price) price.textContent = formatPrice(resolved.amount);
    if (cadence) cadence.textContent = yearly ? "/ year" : "/ month";
    if (savings) {
      savings.textContent = resolved.promoPercent
        ? `${resolved.promoLabel || "Current offer"} · ${resolved.promoPercent}% off`
        : yearly
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

const renderPreview = (root, tiers) => {
  for (const tier of tiers) {
    const card = root.querySelector(`[data-preview-plan="${tier.key}"]`);
    if (!card) continue;
    const resolved = resolvePlanPrice(tier, "monthly");
    const price = card.querySelector("[data-preview-price]");
    const limits = card.querySelector("[data-preview-limits]");
    if (price) price.textContent = formatPrice(resolved.amount);
    if (limits) {
      const techs = formatLimit(tier.limits.max_technicians);
      const branches = formatLimit(tier.limits.max_branches);
      limits.textContent = `${techs} technicians · ${branches} ${tier.limits.max_branches === 1 ? "branch" : "branches"}`;
    }
  }
};

const pricingRoot = document.querySelector("[data-live-pricing]");
const previewRoot = document.querySelector("[data-pricing-preview]");
let tiers = [];
let billing = "monthly";

const statusText = () =>
  document.documentElement.dataset.locale === "ms"
    ? "Harga MYR semasa dimuatkan terus daripada tetapan pelan PestFlow."
    : "Current MYR pricing loaded live from PestFlow plan settings.";

if (pricingRoot instanceof HTMLElement || previewRoot instanceof HTMLElement) {
  const billingButtons = pricingRoot
    ? [...pricingRoot.querySelectorAll("[data-billing]")].filter(
        (node) => node instanceof HTMLButtonElement,
      )
    : [];

  const setBilling = (nextBilling) => {
    billing = nextBilling;
    billingButtons.forEach((button) => {
      const active = button.dataset.billing === billing;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("active", active);
    });
    if (pricingRoot) renderPricing(pricingRoot, tiers, billing);
  };

  billingButtons.forEach((button) =>
    button.addEventListener("click", () => setBilling(button.dataset.billing)),
  );

  addEventListener("pestflow:locale", () => {
    renderComparison(document, tiers);
    document
      .querySelectorAll("[data-pricing-status], [data-preview-status]")
      .forEach((status) => {
        status.textContent = statusText();
      });
  });

  fetch(PRICING_ENDPOINT, {
    headers: { Accept: "application/json" },
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Pricing request failed: ${response.status}`);
      return response.json();
    })
    .then(normalizePricingPayload)
    .then((pricing) => {
      tiers = pricing.tiers;
      if (tiers.length !== 3) throw new Error("Expected three current plans");
      if (pricingRoot) {
        renderPricing(pricingRoot, tiers, billing);
        renderComparison(document, tiers);
        pricingRoot.removeAttribute("aria-busy");
      }
      if (previewRoot) {
        renderPreview(previewRoot, tiers);
        previewRoot.removeAttribute("aria-busy");
      }
      document
        .querySelectorAll("[data-pricing-status], [data-preview-status]")
        .forEach((status) => {
          status.textContent = statusText();
        });
    })
    .catch(() => {
      document
        .querySelectorAll("[data-pricing-status], [data-preview-status]")
        .forEach((status) => {
          status.textContent =
            "Live pricing is temporarily unavailable. Contact sales for current plan details.";
        });
      for (const root of [pricingRoot, previewRoot]) {
        if (!root) continue;
        root.removeAttribute("aria-busy");
        root.classList.add("pricing-unavailable");
      }
    });
}
