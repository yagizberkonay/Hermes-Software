import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { EASE, Star4, RegMark, BigArrow } from "./primitives";

export default function Hero() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yType = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const xBlock = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen pt-[64px] overflow-hidden" aria-label="Hero">
      {/* grid columns backdrop */}
      <div className="absolute inset-0 pointer-events-none hidden md:grid grid-cols-4" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-r-[2px] border-[#111]/10 last:border-r-0" />
        ))}
      </div>

      {/* corner reg marks */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0 }} transition={{ delay: 1.2, duration: 0.3 }}
        className="absolute top-[84px] right-6 hidden sm:block" aria-hidden="true"
      >
        <RegMark size={28} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0 }} transition={{ delay: 1.35, duration: 0.3 }}
        className="absolute bottom-24 left-6 hidden sm:block" aria-hidden="true"
      >
        <RegMark size={28} />
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-10 pt-10 sm:pt-16 pb-28">
        {/* kicker row */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="flex items-center gap-4 mb-8 sm:mb-12"
        >
          <span className="inline-block w-4 h-4 bg-[#FF5C5C] border-[3px] border-[#111]" aria-hidden="true" />
          <p className="font-mono-label text-[11px] sm:text-xs font-semibold">{t.hero.kicker}</p>
        </motion.div>

        {/* poster typography */}
        <motion.h1 style={{ y: yType }} className="font-display leading-[0.88] select-none" key={lang}>
          {t.hero.lines.map((line, i) => (
            <span key={i} className="reveal-mask">
              <span
                className={`reveal-inner is-in text-[clamp(4rem,14.5vw,12.5rem)] ${i === t.hero.outlineIndex ? "text-outline" : ""} ${i % 2 === 1 ? "sm:pl-[12vw]" : ""}`}
                style={{ animationDelay: `${0.25 + i * 0.11}s` }}
              >
                {line}
                {i === t.hero.lines.length - 1 && (
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.45, delay: 1.05, ease: EASE }}
                    className="inline-block align-baseline ml-4 sm:ml-8"
                  >
                    <Star4 size={56} fill="#FF5C5C" className="inline-block spin-slow w-[0.5em] h-[0.5em]" />
                  </motion.span>
                )}
              </span>
            </span>
          ))}
        </motion.h1>

        {/* yellow block + sub */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12">
          <motion.div
            style={{ x: xBlock }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
            className="bg-[#FFE45C] border-[3px] border-[#111] shadow-hard px-6 py-5 max-w-md"
          >
            <p className="font-bold text-base sm:text-lg leading-snug">{t.hero.sub}</p>
          </motion.div>
          <motion.div style={{ rotate: rot }} className="hidden sm:block" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
            >
              <BigArrow size={72} className="rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* bottom stamp strip */}
      <motion.div
        initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.55, delay: 1.25, ease: EASE }}
        className="absolute bottom-0 left-0 right-0 border-t-[3px] border-[#111] bg-[#F5F0E8]"
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-3 flex items-center justify-between">
          <span className="font-mono-label text-[10px] sm:text-xs font-semibold">{t.hero.stamp}</span>
          <span className="font-mono-label text-[10px] sm:text-xs font-semibold flex items-center gap-2">
            {t.hero.scroll}
            <span className="inline-block animate-bounce" aria-hidden="true">↓</span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}
