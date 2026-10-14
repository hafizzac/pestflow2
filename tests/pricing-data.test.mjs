import test from "node:test";
import assert from "node:assert/strict";

import {
  PRICING_ENDPOINT,
  normalizePricingPayload,
  resolvePlanPrice,
} from "../scripts/pricing-data.js";

test("uses the public Super Admin-backed production pricing endpoint", () => {
  assert.equal(
    PRICING_ENDPOINT,
    "https://api.pestflow.my/api/v1/subscription/tiers?currency=MYR",
  );
});

test("normalizes the Laravel API envelope without accepting stale snapshots", () => {
  const tiers = [
    {
      key: "starter",
      price: { monthly: 199, yearly: 1990 },
      promo: null,
      limits: { max_technicians: 3 },
      features: {},
    },
  ];

  assert.deepEqual(
    normalizePricingPayload({
      success: true,
      data: { currency: "MYR", currency_symbol: "RM", tiers },
    }),
    { currency: "MYR", currencySymbol: "RM", tiers },
  );

  assert.throws(
    () => normalizePricingPayload({ currency: "MYR", tiers }),
    /live pricing API envelope/i,
  );
});

test("uses an active Super Admin promo as the displayed price", () => {
  const tier = {
    price: { monthly: 199, yearly: 1990 },
    promo: {
      percent: 20,
      label: "Launch Offer",
      original_monthly: 199,
      original_yearly: 1990,
      monthly: 159.2,
      yearly: 1592,
    },
  };

  assert.deepEqual(resolvePlanPrice(tier, "monthly"), {
    amount: 159.2,
    originalAmount: 199,
    promoPercent: 20,
    promoLabel: "Launch Offer",
  });
});

test("uses the configured base price when no promo is active", () => {
  const tier = {
    price: { monthly: 499, yearly: 4990 },
    promo: null,
  };

  assert.deepEqual(resolvePlanPrice(tier, "yearly"), {
    amount: 4990,
    originalAmount: null,
    promoPercent: null,
    promoLabel: null,
  });
});
