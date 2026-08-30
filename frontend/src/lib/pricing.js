// Isolated pricing configuration — change values here without touching UI code.
export const PRICING_CONFIG = {
  baseUSD: {
    website: 1800,
    webapp: 4500,
    mobile: 6000,
    custom: 7500,
    other: 3500,
  },
  complexityMultiplier: {
    simple: 1,
    medium: 1.5,
    complex: 2.1,
    heavy: 3,
  },
  addonsUSD: {
    brand: 1200,
    backend: 1800,
    auth: 800,
    payments: 1000,
    admin: 1500,
    ai: 2200,
    database: 900,
    api: 1100,
  },
  currencies: {
    USD: { rate: 1, locale: "en-US" },
    EUR: { rate: 0.92, locale: "de-DE" },
    TRY: { rate: 41, locale: "tr-TR" },
  },
};

export const calcEstimateUSD = (type, complexity, addons) => {
  const base = PRICING_CONFIG.baseUSD[type] || 0;
  const mult = PRICING_CONFIG.complexityMultiplier[complexity] || 1;
  const extras = addons.reduce((sum, key) => sum + (PRICING_CONFIG.addonsUSD[key] || 0), 0);
  return Math.round(base * mult + extras);
};

export const formatMoney = (usd, currency) => {
  const { rate, locale } = PRICING_CONFIG.currencies[currency];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(usd * rate));
};
