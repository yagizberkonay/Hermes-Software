import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { SectionTag, EASE, Star4, BigArrow } from "./primitives";

const CARD_STYLES = [
  { span: "md:col-span-7", bg: "bg-[#FFE45C]", text: "", rotate: "hover:-rotate-1" },
  { span: "md:col-span-5", bg: "bg-[#F5F0E8]", text: "text-outline", rotate: "hover:rotate-1" },
  { span: "md:col-span-4", bg: "bg-[#111]", text: "text-[#F5F0E8]", rotate: "hover:rotate-1", dark: true },
  { span: "md:col-span-8", bg: "bg-[#45B7D1]", text: "", rotate: "hover:-rotate-1" },
  { span: "md:col-span-5", bg: "bg-[#FF5C5C]", text: "", rotate: "hover:rotate-1" },
  { span: "md:col-span-7", bg: "bg-[#F5F0E8]", text: "", rotate: "hover:-rotate-1", reg: true },
];

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="py-32 sm:py-48" aria-label="Services">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionTag className="mb-12">{t.services.tag}</SectionTag>
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] mb-16 sm:mb-24">{t.services.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
          {t.services.items.map((item, i) => {
            const s = CARD_STYLES[i];
            return (
              <motion.article
                key={i}
                data-testid={`service-card-${i}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: EASE }}
                className={`group ${s.span} ${s.bg} border-[3px] border-[#111] shadow-hard card-press ${s.rotate} p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] transition-transform`}
              >
                <div className="flex items-start justify-between">
                  <span className={`font-mono-label text-xs font-bold ${s.dark ? "text-[#F5F0E8]" : ""}`}>
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  {s.reg ? (
                    <span className={`font-display text-4xl ${s.dark ? "text-[#F5F0E8]" : ""}`} aria-hidden="true">®</span>
                  ) : (
                    <Star4 size={22} fill={s.dark ? "#F5F0E8" : "#111"} className="group-hover:rotate-45 transition-transform duration-300" />
                  )}
                </div>
                <div>
                  <h3 className={`font-display leading-[0.95] text-[clamp(1.8rem,4vw,3.2rem)] ${s.dark ? "text-outline-paper group-hover:text-[#F5F0E8]" : s.text} transition-colors`}>
                    {item.name}
                  </h3>
                  <div className="flex items-end justify-between gap-4 mt-4">
                    <p className={`text-sm font-semibold max-w-sm ${s.dark ? "text-[#F5F0E8]/80" : "text-[#111]/75"}`}>{item.desc}</p>
                    <BigArrow size={34} fill={s.dark ? "#F5F0E8" : "#111"} className="shrink-0 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
