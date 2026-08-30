import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { SectionTag, RevealLine } from "./primitives";

export default function About() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <section ref={ref} id="about" className="relative py-32 sm:py-48 overflow-x-clip" aria-label="About Hermes">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionTag className="mb-16 sm:mb-24">{t.about.tag}</SectionTag>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* giant statement — 70% */}
          <motion.div style={{ x: wide ? xLeft : 0 }} className="lg:col-span-8" key={lang}>
            <h2 className="font-display leading-[0.9]">
              {t.about.statement.map(([line], i) => (
                <RevealLine key={i} delay={i * 0.08}>
                  <span
                    className={`text-[clamp(3rem,9vw,8rem)] ${i === 1 ? "text-outline" : ""} ${i === 2 ? "lg:pl-[8vw]" : ""} ${i === 3 ? "bg-[#45B7D1] px-3 inline-block border-[3px] border-[#111]" : ""}`}
                  >
                    {line}
                  </span>
                </RevealLine>
              ))}
            </h2>
          </motion.div>

          {/* tiny precise copy — 30% */}
          <div className="lg:col-span-4 lg:pt-24 flex flex-col justify-between gap-10">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
              className="border-l-[6px] border-[#111] pl-6"
            >
              <h3 className="font-display text-2xl mb-4">{t.about.title}</h3>
              <p className="font-semibold text-sm leading-relaxed mb-4">{t.about.body1}</p>
              <p className="text-sm leading-relaxed text-[#111]/70">{t.about.body2}</p>
            </motion.div>

            <div className="grid grid-cols-3 border-[3px] border-[#111] shadow-hard bg-[#F5F0E8]">
              {t.about.facts.map(([num, label], i) => (
                <div key={i} className={`px-3 py-4 text-center ${i < 2 ? "border-r-[3px] border-[#111]" : ""} ${i === 1 ? "bg-[#FFE45C]" : ""}`}>
                  <div className="font-display text-3xl sm:text-4xl">{num}</div>
                  <div className="font-mono-label text-[9px] font-semibold mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
