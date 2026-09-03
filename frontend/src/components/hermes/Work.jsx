import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { SectionTag, EASE, Star4, BigArrow } from "./primitives";
import ShareButton from "./ShareButton";
import { track } from "@/lib/analytics";

const ACCENTS = ["#FFE45C", "#45B7D1", "#FF5C5C", "#111"];
const CLIPS = [
  "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
  "polygon(0 4%, 100% 0, 100% 100%, 0 92%)",
  "polygon(0 0, 100% 6%, 100% 100%, 0 90%)",
  "polygon(0 8%, 100% 0, 100% 92%, 0 100%)",
];

const ProjectRow = ({ project, index }) => {
  const flip = index % 2 === 1;
  const accent = ACCENTS[index % ACCENTS.length];
  const dark = accent === "#111";

  return (
    <motion.article
      data-testid={`work-project-${index}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      onViewportEnter={() => {
        track("work_open", { title: project.title });
        track("case_study_open", { title: project.title });
      }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      {/* clipped editorial frame */}
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}>
        <div className="group relative border-[3px] border-[#111] shadow-hard bg-[#111] overflow-hidden">
          <div
            className="relative overflow-hidden"
            style={{ clipPath: CLIPS[index % CLIPS.length] }}
          >
            <img
              src={project.img}
              alt={project.title}
              loading="lazy"
              className="w-full h-[280px] sm:h-[420px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
            />
            <span
              className="absolute inset-0 mix-blend-multiply opacity-40 group-hover:opacity-0 transition-opacity duration-500"
              style={{ background: accent }}
              aria-hidden="true"
            />
          </div>
          {/* result stat pinned on the frame */}
          <div
            className="absolute bottom-4 left-4 border-[3px] border-[#111] px-4 py-2 font-display text-lg sm:text-2xl"
            style={{ background: accent, color: dark ? "#F5F0E8" : "#111" }}
            data-testid={`work-result-${index}`}
          >
            {project.result}
          </div>
        </div>
      </div>

      {/* text block */}
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-2"}`}>
        <div className="flex items-center gap-4 mb-5">
          <span className="font-display text-4xl sm:text-5xl text-outline">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-mono-label text-[10px] font-bold border-[3px] border-[#111] px-3 py-1.5">
            {project.category}
          </span>
          <span className="font-mono-label text-[10px] font-semibold text-[#111]/50 ml-auto">{project.year}</span>
        </div>
        <div className="flex items-start justify-between gap-4 mb-5">
          <h3 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9] flex items-center gap-3">
            {project.title}
            <Star4 size={26} fill="#111" className="hidden sm:inline-block group-hover:rotate-45 transition-transform" />
          </h3>
          <ShareButton title={`Hermes Work — ${project.title}`} text={project.desc} />
        </div>
        <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#111]/75 max-w-md">{project.desc}</p>
      </div>
    </motion.article>
  );
};

export default function Work({ onStartProject }) {
  const { t } = useLang();
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Extract unique categories from actual project content
  const categories = useMemo(() => {
    const set = new Set(t.work.projects.map((p) => p.filter).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [t]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return t.work.projects;
    return t.work.projects.filter((p) => p.filter === selectedCategory);
  }, [t, selectedCategory]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    track("work_filter", { category: cat });
  };

  return (
    <section id="work" className="py-32 sm:py-48" aria-label="Selected work">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionTag className="mb-12">{t.work.tag}</SectionTag>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20">
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.9]">{t.work.title}</h2>
          <p className="font-semibold text-sm sm:text-base max-w-xs">{t.work.sub}</p>
        </div>

        {/* Editorial Filter Chips — only show if more than 1 category exists */}
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-3 mb-16" role="group" aria-label="Work category filter" data-testid="work-category-filters">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  aria-pressed={active}
                  data-testid={`work-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  className={`btn-press font-mono-label text-xs font-bold px-4 py-2.5 border-[3px] border-[#111] shadow-hard-sm transition-colors ${
                    active ? "bg-[#FFE45C] text-[#111]" : "bg-[#F5F0E8] text-[#111] hover:bg-[#FFE45C]/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="space-y-28 sm:space-y-40"
          >
            {filteredProjects.map((project, i) => (
              <ProjectRow key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-28 sm:mt-40 flex justify-center">
          <button
            data-testid="work-start-project"
            onClick={() => onStartProject()}
            className="btn-press bg-[#111] text-[#F5F0E8] border-[3px] border-[#111] shadow-hard-lg font-display text-2xl sm:text-3xl px-10 sm:px-14 py-5 sm:py-6 flex items-center gap-4"
          >
            {t.work.cta}
            <BigArrow size={34} fill="#F5F0E8" />
          </button>
        </div>
      </div>
    </section>
  );
}
