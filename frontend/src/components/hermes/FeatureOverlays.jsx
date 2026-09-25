import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowUpRight, Command, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { EASE, Star4 } from "./primitives";

const track = (name, payload = {}) => {
  window.dispatchEvent(new CustomEvent("hermes:analytics", { detail: { name, ...payload } }));
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return false;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -76 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};

const CONTENT = {
  studio: { title: "STUDIO", category: "HERMES", description: "Independent software studio. Small team, sharp point of view, working software every week.", body: "We design, engineer and ship digital products from the first sketch to production.", color: "#FFE45C" },
  care: { title: "HERMES CARE", category: "SERVICE", description: "Post-launch support for products that still have places to go.", body: "Maintenance, iteration and honest technical partnership after launch.", color: "#45B7D1" },
  journal: { title: "JOURNAL", category: "THOUGHTS", description: "Ideas, technology, design and notes from the studio.", body: "A small archive of things worth thinking about. More soon.", color: "#FF5C5C" },
  playground: { title: "PLAYGROUND", category: "EXPERIMENTS", description: "Small experiments, prototypes and useful weirdness.", body: "Not everything needs to become a product. Some things just need to move.", color: "#C084FC" },
};

export function HermesLoading({ label = "HERMES / LOADING" }) {
  return <div className="hermes-loading" role="status" aria-live="polite"><span>{label}</span><span className="loading-mark" aria-hidden="true"><i /><i /><i /></span></div>;
}

function Overlay({ children, onClose, title, labelledBy }) {
  const closeRef = useRef(null);
  useEffect(() => { closeRef.current?.focus(); }, []);
  useEffect(() => {
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return <motion.div className="fixed inset-0 z-[90] bg-[#111]/75 p-4 sm:p-8 flex items-start justify-center overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
    <motion.div className="w-full max-w-2xl bg-[#F5F0E8] border-[4px] border-[#111] shadow-hard-lg mt-12" initial={{ y: 30, rotate: -1 }} animate={{ y: 0, rotate: 0 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: .32, ease: EASE }}>
      <div className="flex items-center justify-between gap-4 border-b-[4px] border-[#111] bg-[#FFE45C] px-5 py-4"><h2 id={labelledBy} className="font-display text-2xl">{title}</h2><button ref={closeRef} type="button" onClick={onClose} className="font-display text-3xl leading-none hover:rotate-90 transition-transform" aria-label="Close overlay"><X size={28} /></button></div>
      {children}
    </motion.div>
  </motion.div>;
}

export function ContentOverlay({ page, onClose, onStartProject }) {
  const item = CONTENT[page];
  if (!item) return null;
  return <Overlay onClose={onClose} title={item.title} labelledBy={`content-${page}`}><div className="p-6 sm:p-10"><div className="border-[3px] border-[#111] p-5 sm:p-8" style={{ background: item.color }}><div className="font-mono-label text-[10px] font-bold mb-8">{item.category} / 2026</div><p className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[.9] mb-7">{item.description}</p><p className="font-semibold max-w-lg leading-relaxed">{item.body}</p></div>{page === "journal" && <div className="mt-6 flex flex-wrap gap-2" aria-label="Journal categories">{["IDEAS", "TECHNOLOGY", "DESIGN", "HERMES NOTES"].map((tag) => <span key={tag} className="font-mono-label text-[10px] font-bold border-[3px] border-[#111] px-3 py-2">{tag}</span>)}</div>}{page === "care" && <button type="button" onClick={() => { track("care_cta_click"); onClose(); onStartProject(); }} className="btn-press mt-7 bg-[#111] text-[#F5F0E8] border-[3px] border-[#111] shadow-hard font-display text-xl px-6 py-4">TALK TO HERMES →</button>}</div></Overlay>;
}

export default function FeatureOverlays({ openSearch, setOpenSearch, openCommand, setOpenCommand, onStartProject }) {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(null);
  const inputRef = useRef(null);
  const records = useMemo(() => [
    ...t.work.projects.map((p) => ({ title: p.title, category: "WORK / CASE STUDY", description: p.desc, destination: "#work", action: () => scrollTo("work") })),
    ...t.services.items.map((s) => ({ title: s.name, category: "SERVICES", description: s.desc, destination: "#services", action: () => scrollTo("services") })),
    ...Object.entries(CONTENT).map(([key, item]) => ({ title: item.title, category: item.category, description: item.description, destination: `/${key}`, action: () => setPage(key) })),
  ], [t]);
  const commands = useMemo(() => [
    ["Search Work", () => { setOpenSearch(true); setOpenCommand(false); setQuery(""); track("search_used"); }],
    ["Open Services", () => { setOpenCommand(false); scrollTo("services"); }],
    ["Open Studio", () => { setOpenCommand(false); setPage("studio"); }],
    ["Open Hermes Care", () => { setOpenCommand(false); setPage("care"); }],
    ["Open Journal", () => { setOpenCommand(false); setPage("journal"); track("journal_open"); }],
    ["Open Playground", () => { setOpenCommand(false); setPage("playground"); }],
    ["Start a Project", () => { setOpenCommand(false); track("contact_start"); onStartProject(); }],
    ["Go Home", () => { setOpenCommand(false); window.scrollTo({ top: 0, behavior: "smooth" }); }],
  ], [onStartProject, setOpenCommand, setOpenSearch]);
  const results = records.filter((r) => `${r.title} ${r.category} ${r.description}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
  useEffect(() => {
    if (!(openSearch || openCommand)) return;
    inputRef.current?.focus();
    const onKey = (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpenCommand((v) => !v); setOpenSearch(false); track("command_palette_open"); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openSearch, openCommand, setOpenCommand, setOpenSearch]);
  const close = useCallback(() => { setOpenSearch(false); setOpenCommand(false); }, [setOpenCommand, setOpenSearch]);
  return <>
    <AnimatePresence>{(openSearch || openCommand) && <Overlay onClose={close} title={openCommand ? "COMMAND / K" : "SEARCH HERMES"} labelledBy="feature-overlay-title"><div className="p-4 sm:p-6"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} className="input-brutal pl-12 text-lg" placeholder={openCommand ? "TYPE A COMMAND..." : "SEARCH WORK, SERVICES, JOURNAL..."} aria-label={openCommand ? "Search commands" : "Search site"} /></div>{openCommand && !query && <div className="mt-5 grid gap-2" role="listbox" aria-label="Commands">{commands.map(([label, action], index) => <button type="button" key={label} onClick={action} className="card-press flex items-center justify-between border-[3px] border-[#111] px-4 py-3 text-left font-mono-label text-xs font-bold" role="option"><span>{String(index + 1).padStart(2, "0")} / {label}</span><ArrowUpRight size={16} /></button>)}</div>}{(!openCommand || query) && <div className="mt-5 grid gap-2" role="listbox" aria-label="Search results">{results.length ? results.map((result) => <button type="button" key={`${result.category}-${result.title}`} onClick={() => { result.action(); track("search_used", { result: result.title }); if (result.destination.startsWith("#")) close(); }} className="card-press border-[3px] border-[#111] p-4 text-left"><div className="flex items-start justify-between gap-3"><span className="font-display text-2xl">{result.title}</span><ArrowUpRight size={18} /></div><div className="font-mono-label text-[10px] font-bold mt-2 text-[#111]/60">{result.category} · {result.destination}</div><p className="font-semibold text-sm mt-2">{result.description}</p></button>) : <p className="font-mono-label text-xs font-bold py-8 text-center">NO RESULTS. TRY ANOTHER WORD.</p>}</div>}{openCommand && <p className="mt-5 font-mono-label text-[10px] font-bold text-[#111]/60">ESC TO CLOSE · ↑↓ TO BROWSE · ENTER TO OPEN</p>}</div></Overlay>}</AnimatePresence>
    <AnimatePresence>{page && <ContentOverlay page={page} onClose={() => setPage(null)} onStartProject={onStartProject} />}</AnimatePresence>
  </>;
}

export function CommandTrigger({ onClick }) { return <button type="button" onClick={onClick} className="font-mono-label text-[10px] font-bold px-3 py-2 border-[3px] border-[#111] hover:bg-[#FFE45C] transition-colors" aria-label="Open command palette"><Command size={14} className="inline mr-1" />⌘K</button>; }
export { track };
