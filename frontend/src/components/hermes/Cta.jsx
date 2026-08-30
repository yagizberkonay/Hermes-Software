import { useLang } from "@/lib/i18n";
import { RevealLine, Star4 } from "./primitives";

export default function Cta({ onStartProject }) {
  const { t } = useLang();
  return (
    <section id="cta" className="bg-[#FF5C5C] border-y-[3px] border-[#111] py-24 sm:py-40 relative overflow-hidden" aria-label="Call to action">
      <Star4 size={140} fill="#111" className="absolute -top-10 -right-10 spin-slow opacity-20 hidden sm:block" />
      <Star4 size={90} fill="#111" className="absolute bottom-10 left-[5%] spin-slow opacity-20 hidden sm:block" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <h2 className="font-display leading-[0.85]">
          <RevealLine><span className="text-[clamp(3.5rem,13vw,11rem)]">{t.cta.line1}</span></RevealLine>
          <RevealLine delay={0.08}><span className="text-[clamp(3.5rem,13vw,11rem)] text-outline">{t.cta.line2}</span></RevealLine>
          <RevealLine delay={0.16}><span className="text-[clamp(3.5rem,13vw,11rem)] sm:pl-[10vw]">{t.cta.line3}</span></RevealLine>
          <RevealLine delay={0.24}><span className="text-[clamp(3.5rem,13vw,11rem)] sm:pl-[10vw]">{t.cta.line4}</span></RevealLine>
        </h2>

        <div className="mt-14 sm:pl-[10vw]">
          <button
            data-testid="cta-start-project"
            onClick={() => onStartProject()}
            className="btn-press bg-[#FFE45C] border-[3px] border-[#111] shadow-hard-lg font-display text-2xl sm:text-4xl px-10 sm:px-14 py-5 sm:py-7"
          >
            {t.cta.button}
          </button>
        </div>
      </div>
    </section>
  );
}
