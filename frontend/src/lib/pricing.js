// Isolated pricing configuration — change values here without touching UI code.
export const PRICING_CONFIG = {
  baseUSD: {
    website: 4000,
    webapp: 9000,
    mobile: 12000,
    custom: 15000,
    other: 8000,
  },
  complexityMultiplier: {
    simple: 1,
    medium: 1.6,
    complex: 2.4,
    heavy: 3.5,
  },
  addonsUSD: {
    brand: 2500,
    backend: 3500,
    auth: 1500,
    payments: 2000,
    admin: 3000,
    ai: 4000,
    database: 1800,
    api: 2200,
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
