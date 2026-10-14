export const PRICING_ENDPOINT =
  "https://api.pestflow.my/api/v1/subscription/tiers?currency=MYR";

export const normalizePricingPayload = (payload) => {
  if (
    payload?.success !== true ||
    !payload.data ||
    payload.data.currency !== "MYR" ||
    !Array.isArray(payload.data.tiers)
  ) {
    throw new Error("Pricing response is not the live pricing API envelope");
  }

  return {
    currency: payload.data.currency,
    currencySymbol: payload.data.currency_symbol || "RM",
    tiers: payload.data.tiers,
  };
};

export const resolvePlanPrice = (tier, billing) => {
  const promo = tier?.promo;
  const promoAmount = promo?.[billing];
  const baseAmount = tier?.price?.[billing];

  if (Number.isFinite(promoAmount)) {
    return {
      amount: promoAmount,
      originalAmount: Number.isFinite(promo[`original_${billing}`])
        ? promo[`original_${billing}`]
        : baseAmount,
      promoPercent: Number.isFinite(promo.percent) ? promo.percent : null,
      promoLabel: promo.label || null,
    };
  }

  if (!Number.isFinite(baseAmount)) {
    throw new Error(`Missing ${billing} price for ${tier?.key || "plan"}`);
  }

  return {
    amount: baseAmount,
    originalAmount: null,
    promoPercent: null,
    promoLabel: null,
  };
};
