// Isolated pricing configuration — change values here without touching UI code.
export const PRICING_CONFIG = {
  baseUSD: {
    website: 900,
    webapp: 2200,
    mobile: 3000,
    custom: 3600,
    other: 1600,
  },
  complexityMultiplier: {
    simple: 1,
    medium: 1.4,
    complex: 1.9,
    heavy: 2.6,
  },
  addonsUSD: {
    brand: 450,
    backend: 550,
    auth: 300,
    payments: 400,
    admin: 500,
    ai: 900,
    database: 350,
    api: 400,
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
