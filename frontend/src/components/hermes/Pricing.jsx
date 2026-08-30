import { useState, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { PRICING_CONFIG, calcEstimateUSD, formatMoney } from "@/lib/pricing";
import { SectionTag, AnimatedNumber, Star4 } from "./primitives";

const Chip = ({ active, onClick, children, testId, color = "#FFE45C" }) => (
  <button
    data-testid={testId}
    onClick={onClick}
    aria-pressed={active}
    className="btn-press border-[3px] border-[#111] font-display text-lg sm:text-xl px-5 py-3 shadow-hard-sm"
    style={{ background: active ? color : "#F5F0E8" }}
  >
    {children}
  </button>
);

export default function Pricing({ onStartProject }) {
  const { t } = useLang();
  const [type, setType] = useState("webapp");
  const [complexity, setComplexity] = useState("medium");
  const [addons, setAddons] = useState(["backend"]);
  const [currency, setCurrency] = useState("USD");

  const toggleAddon = (key) =>
    setAddons((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const totalUSD = calcEstimateUSD(type, complexity, addons);
  const format = useCallback((v) => formatMoney(v, currency), [currency]);

  return (
    <section id="pricing" className="py-32 sm:py-48" aria-label="Pricing estimator">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionTag className="mb-12">{t.pricing.tag}</SectionTag>
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] mb-5">{t.pricing.title}</h2>
        <p className="font-semibold text-sm sm:text-base max-w-md mb-16 sm:mb-24">{t.pricing.sub}</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* controls */}
          <div className="lg:col-span-7 space-y-16">
            <fieldset>
              <legend className="font-mono-label text-xs font-bold mb-5 border-b-[3px] border-[#111] pb-2 w-full">{t.pricing.step1}</legend>
              <div className="flex flex-wrap gap-4">
                {Object.entries(t.pricing.types).map(([key, label]) => (
                  <Chip key={key} testId={`pricing-type-${key}`} active={type === key} onClick={() => setType(key)} color="#FFE45C">
                    {label}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-mono-label text-xs font-bold mb-5 border-b-[3px] border-[#111] pb-2 w-full">{t.pricing.step2}</legend>
              <div className="flex flex-wrap gap-4">
                {Object.entries(t.pricing.complexity).map(([key, label]) => (
                  <Chip key={key} testId={`pricing-complexity-${key}`} active={complexity === key} onClick={() => setComplexity(key)} color="#45B7D1">
                    {label}
                  </Chip>
                ))}
              </div>
              <p className="font-mono-label text-[10px] font-semibold mt-4 text-[#111]/60" data-testid="pricing-complexity-hint">
                → {t.pricing.complexityHint[complexity]}
              </p>
            </fieldset>

            <fieldset>
              <legend className="font-mono-label text-xs font-bold mb-5 border-b-[3px] border-[#111] pb-2 w-full">{t.pricing.step3}</legend>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(t.pricing.addons).map(([key, label]) => {
                  const active = addons.includes(key);
                  return (
                    <button
                      key={key}
                      data-testid={`pricing-addon-${key}`}
                      onClick={() => toggleAddon(key)}
                      aria-pressed={active}
                      className={`btn-press border-[3px] border-[#111] shadow-hard-sm px-3 py-4 text-left ${active ? "bg-[#FF5C5C]" : "bg-[#F5F0E8]"}`}
                    >
                      <span className="block font-mono-label text-[9px] font-bold mb-1">{active ? "■" : "□"}</span>
                      <span className="font-display text-sm sm:text-base leading-tight block">{label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* result panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[100px] bg-[#111] border-[3px] border-[#111] shadow-hard-lg p-8 sm:p-10">
              <div className="flex items-start justify-between mb-8">
                <p className="font-mono-label text-xs font-bold text-[#F5F0E8]">{t.pricing.resultLabel}</p>
                <Star4 size={24} fill="#FFE45C" className="spin-slow" />
              </div>

              <div className="font-display text-[clamp(2.6rem,6vw,4.5rem)] text-[#FFE45C] leading-none mb-8 tabular-nums" data-testid="pricing-estimate-value" aria-live="polite">
                <AnimatedNumber value={totalUSD} format={format} />
              </div>

              <div className="flex gap-0 mb-8" role="group" aria-label="Currency">
                {Object.keys(PRICING_CONFIG.currencies).map((cur, i) => (
                  <button
                    key={cur}
                    data-testid={`pricing-currency-${cur.toLowerCase()}`}
                    onClick={() => setCurrency(cur)}
                    aria-pressed={currency === cur}
                    className={`font-mono-label text-xs font-bold px-4 py-2 border-[3px] border-[#F5F0E8] ${i > 0 ? "border-l-0" : ""} ${currency === cur ? "bg-[#F5F0E8] text-[#111]" : "text-[#F5F0E8] hover:bg-[#F5F0E8]/10"} transition-colors`}
                  >
                    {cur === "TRY" ? "₺ TRY" : cur === "EUR" ? "€ EUR" : "$ USD"}
                  </button>
                ))}
              </div>

              <p className="font-mono-label text-[9px] font-semibold text-[#F5F0E8]/50 mb-8">{t.pricing.disclaimer}</p>

              <button
                data-testid="pricing-start-project"
                onClick={() => onStartProject(format(totalUSD))}
                className="btn-press w-full bg-[#FF5C5C] border-[3px] border-[#F5F0E8] font-display text-xl sm:text-2xl px-6 py-4 text-[#111]"
                style={{ boxShadow: "8px 8px 0 #F5F0E8" }}
              >
                {t.pricing.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
