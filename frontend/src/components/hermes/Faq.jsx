import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { SectionTag, EASE } from "./primitives";

export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-32 sm:py-48" aria-label="Frequently asked questions">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <SectionTag className="mb-12">{t.faq.tag}</SectionTag>
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] mb-16 sm:mb-24">{t.faq.title}</h2>

        <div className="border-t-[3px] border-[#111]">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`border-b-[3px] border-[#111] transition-colors ${isOpen ? "bg-[#FFE45C]" : "bg-transparent"}`}>
                <button
                  data-testid={`faq-question-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-baseline gap-5 sm:gap-10 px-4 sm:px-8 py-6 sm:py-8 text-left group"
                >
                  <span
                    className={`font-display transition-all duration-300 shrink-0 ${isOpen ? "text-[clamp(3rem,7vw,6rem)] leading-[0.8]" : "text-2xl sm:text-3xl text-outline"}`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.87,0,0.13,1)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl sm:text-3xl flex-1 group-hover:translate-x-2 transition-transform duration-200">
                    {item.q}
                  </span>
                  <span className={`font-display text-3xl sm:text-4xl shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, clipPath: "inset(0 0 100% 0)" }}
                      animate={{ height: "auto", clipPath: "inset(0 0 0% 0)" }}
                      exit={{ height: 0, clipPath: "inset(0 0 100% 0)" }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-8 pb-8 sm:pl-[calc(2rem+clamp(3rem,7vw,6rem))] max-w-2xl font-semibold text-sm sm:text-base leading-relaxed" data-testid={`faq-answer-${i}`}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
