import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowUpRight, Command, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { EASE, Star4 } from "./primitives";
import ShareButton from "./ShareButton";

const OVERLAY_COLORS = {
  studio: "#FFE45C",
  care: "#45B7D1",
  journal: "#FF5C5C",
  playground: "#C084FC",
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return false;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -76 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};

export function HermesLoading({ label = "HERMES / LOADING" }) {
  return (
    <div className="hermes-loading" role="status" aria-live="polite">
      <span>{label}</span>
      <span className="loading-mark" aria-hidden="true">
        <i /><i /><i />
      </span>
    </div>
  );
}

function Overlay({ children, onClose, title, labelledBy }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-[#111]/75 p-4 sm:p-8 flex items-start justify-center overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <motion.div
        className="w-full max-w-2xl bg-[#F5F0E8] border-[4px] border-[#111] shadow-hard-lg mt-12"
        initial={{ y: 30, rotate: -1 }}
        animate={{ y: 0, rotate: 0 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        <div className="flex items-center justify-between gap-4 border-b-[4px] border-[#111] bg-[#FFE45C] px-5 py-4">
          <h2 id={labelledBy} className="font-display text-2xl">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="font-display text-3xl leading-none hover:rotate-90 transition-transform"
            aria-label="Close overlay"
            data-testid="overlay-close"
          >
            <X size={28} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function JournalArticle({ entry, onBack }) {
  return (
    <div className="p-6 sm:p-10">
      <button
        type="button"
        onClick={onBack}
        className="font-mono-label text-[10px] font-bold mb-6 hover:underline"
      >
        ← BACK TO JOURNAL
      </button>
      <div className="border-[3px] border-[#111] p-5 sm:p-8 bg-[#FF5C5C]">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <span className="font-mono-label text-[10px] font-bold">
            {entry.category} / {entry.date}
          </span>
          <ShareButton
            title={`Hermes Journal — ${entry.title}`}
            text={entry.desc}
            url={`${window.location.origin}/#journal-${entry.id}`}
          />
        </div>
        <h3 className="font-display text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] mb-5">
          {entry.title}
        </h3>
        <p className="font-semibold leading-relaxed">{entry.body}</p>
      </div>
    </div>
  );
}

export function ContentOverlay({ page, onClose, onStartProject, initialArticleId }) {
  const { t } = useLang();
  const item = t.overlays?.[page];
  const [journalFilter, setJournalFilter] = useState("ALL");
  const journalEntries = useMemo(() => t.journal?.entries || [], [t]);
  
  const [activeArticle, setActiveArticle] = useState(() => {
    if (page === "journal" && initialArticleId) {
      return journalEntries.find(e => e.id === initialArticleId) || null;
    }
    return null;
  });

  const journalCategories = useMemo(() => {
    const set = new Set(journalEntries.map((e) => e.category));
    return ["ALL", ...Array.from(set)];
  }, [journalEntries]);

  const filteredJournal = useMemo(() => {
    if (journalFilter === "ALL") return journalEntries;
    return journalEntries.filter((e) => e.category === journalFilter);
  }, [journalEntries, journalFilter]);

  useEffect(() => {
    if (page === "care") track("care_view");
  }, [page]);

  // Update URL hash when article changes
  useEffect(() => {
    if (page === "journal") {
      if (activeArticle) {
        window.history.replaceState(null, "", `#journal-${activeArticle.id}`);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [activeArticle, page]);

  if (!item) return null;

  if (page === "journal" && activeArticle) {
    return (
      <Overlay onClose={onClose} title={t.overlays.journal.title} labelledBy="content-journal-article">
        <JournalArticle entry={activeArticle} onBack={() => setActiveArticle(null)} />
      </Overlay>
    );
  }

  return (
    <Overlay onClose={onClose} title={item.title} labelledBy={`content-${page}`}>
      <div className="p-6 sm:p-10">
        <div
          className="border-[3px] border-[#111] p-5 sm:p-8 relative"
          style={{ background: OVERLAY_COLORS[page] }}
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="font-mono-label text-[10px] font-bold">{item.category} / 2026</span>
            <ShareButton title={`Hermes Software — ${item.title}`} text={item.description} />
          </div>
          <p className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[.9] mb-7">
            {item.description}
          </p>
          <p className="font-semibold max-w-lg leading-relaxed">{item.body}</p>
        </div>

        {page === "journal" && (
          <>
            {journalCategories.length > 2 && (
              <div
                className="mt-6 flex flex-wrap gap-2"
                role="group"
                aria-label="Journal category filter"
                data-testid="journal-category-filters"
              >
                {journalCategories.map((tag) => {
                  const active = journalFilter === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setJournalFilter(tag)}
                      aria-pressed={active}
                      data-testid={`journal-filter-${tag.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      className={`btn-press font-mono-label text-[10px] font-bold border-[3px] border-[#111] px-3 py-2 transition-colors ${
                        active ? "bg-[#FFE45C]" : "hover:bg-[#FFE45C]/50"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="mt-6 grid gap-3" data-testid="journal-entries-list">
              {filteredJournal.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => {
                    track("journal_open", { article: entry.id });
                    setActiveArticle(entry);
                  }}
                  className="card-press border-[3px] border-[#111] p-4 text-left hover:bg-[#FFE45C]/40 transition-colors"
                  data-testid={`journal-entry-${entry.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-xl sm:text-2xl">{entry.title}</span>
                    <ArrowUpRight size={18} className="shrink-0 mt-1" />
                  </div>
                  <span className="font-mono-label text-[10px] font-bold mt-2 block text-[#111]/60">
                    {entry.category} · {entry.date}
                  </span>
                  <p className="font-semibold text-sm mt-2">{entry.desc}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {page === "care" && (
          <button
            type="button"
            data-testid="care-cta-button"
            onClick={() => {
              track("care_cta_click");
              onClose();
              onStartProject();
            }}
            className="btn-press mt-7 bg-[#111] text-[#F5F0E8] border-[3px] border-[#111] shadow-hard font-display text-xl px-6 py-4"
          >
            TALK TO HERMES →
          </button>
        )}
      </div>
    </Overlay>
  );
}

export default function FeatureOverlays({
  openSearch,
  setOpenSearch,
  openCommand,
  setOpenCommand,
  onStartProject,
  initialSearchQuery = "",
}) {
  const { t } = useLang();
  const [query, setQuery] = useState(initialSearchQuery);
  const [page, setPage] = useState(null);
  const [initialArticleId, setInitialArticleId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const path = window.location.pathname.replace("/", "");
    const hash = window.location.hash;
    if (["studio", "care", "journal"].includes(path)) {
      setPage(path);
      if (path === "journal" && hash.startsWith("#journal-")) {
        setInitialArticleId(hash.replace("#journal-", ""));
      }
    } else if (hash.startsWith("#journal-")) {
      setPage("journal");
      setInitialArticleId(hash.replace("#journal-", ""));
    }
  }, []);

  const closeOverlay = useCallback(() => {
    setPage(null);
    setInitialArticleId(null);
    if (["/studio", "/care", "/journal"].includes(window.location.pathname)) {
      window.history.pushState(null, "", "/");
    }
  }, []);

  const openOverlayPage = useCallback((key) => {
    if (key === "playground") {
      track("playground_start");
      window.location.href = "/playground";
      return;
    }
    
    setPage(key);
    if (key === "journal") track("journal_open");
    
    if (["studio", "care", "journal"].includes(key)) {
      window.history.pushState(null, "", `/${key}`);
    }
  }, []);

  const records = useMemo(
    () => [
      ...t.work.projects.map((p) => ({
        title: p.title,
        category: "WORK / CASE STUDY",
        description: p.desc,
        destination: "#work",
        action: () => {
          track("case_study_open", { title: p.title });
          scrollTo("work");
        },
      })),
      ...t.services.items.map((s) => ({
        title: s.name,
        category: "SERVICES",
        description: s.desc,
        destination: "#services",
        action: () => scrollTo("services"),
      })),
      ...(t.journal?.entries || []).map((entry) => ({
        title: entry.title,
        category: `JOURNAL / ${entry.category}`,
        description: entry.desc,
        destination: `#journal-${entry.id}`,
        action: () => openOverlayPage("journal"),
      })),
      ...Object.entries(t.overlays || {}).map(([key, item]) => ({
        title: item.title,
        category: item.category,
        description: item.description,
        destination: `/${key}`,
        action: () => openOverlayPage(key),
      })),
    ],
    [t, openOverlayPage],
  );

  const commands = useMemo(
    () => [
      ["Search", () => { setOpenSearch(true); setOpenCommand(false); setQuery(""); track("search_used"); }],
      ["Work", () => { setOpenCommand(false); scrollTo("work"); }],
      ["Studio", () => { setOpenCommand(false); openOverlayPage("studio"); }],
      ["Services", () => { setOpenCommand(false); scrollTo("services"); }],
      ["Playground", () => { setOpenCommand(false); openOverlayPage("playground"); }],
      ["Hermes Care", () => { setOpenCommand(false); openOverlayPage("care"); }],
      ["Journal", () => { setOpenCommand(false); openOverlayPage("journal"); }],
      ["Contact", () => { setOpenCommand(false); track("contact_start"); onStartProject(); }],
      ["Home", () => { setOpenCommand(false); window.scrollTo({ top: 0, behavior: "smooth" }); }],
    ],
    [onStartProject, setOpenCommand, setOpenSearch, openOverlayPage],
  );

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return records
      .filter((r) => `${r.title} ${r.category} ${r.description}`.toLowerCase().includes(q))
      .slice(0, 8);
  }, [records, query]);

  const activeListLength = openCommand && !query ? commands.length : results.length;

  useEffect(() => {
    if (initialSearchQuery) setQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, openCommand, openSearch]);

  const executeSelected = useCallback(() => {
    if (openCommand && !query) {
      const item = commands[selectedIndex];
      if (item) item[1]();
    } else if (results.length > 0) {
      const item = results[selectedIndex];
      if (item) {
        item.action();
        track("search_used", { result: item.title });
        if (item.destination.startsWith("#")) {
          setOpenSearch(false);
          setOpenCommand(false);
        }
      }
    }
  }, [openCommand, query, commands, selectedIndex, results, setOpenSearch, setOpenCommand]);

  useEffect(() => {
    if (!(openSearch || openCommand)) return;
    inputRef.current?.focus();

    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpenCommand((v) => !v);
        setOpenSearch(false);
        track("command_palette_open");
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (activeListLength > 0 ? (prev + 1) % activeListLength : 0));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (activeListLength > 0 ? (prev - 1 + activeListLength) % activeListLength : 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        executeSelected();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openSearch, openCommand, setOpenCommand, setOpenSearch, activeListLength, executeSelected]);

  const close = useCallback(() => {
    setOpenSearch(false);
    setOpenCommand(false);
    setQuery("");
  }, [setOpenCommand, setOpenSearch]);

  return (
    <>
      <AnimatePresence>
        {(openSearch || openCommand) && (
          <Overlay
            onClose={close}
            title={openCommand ? "COMMAND / K" : "SEARCH HERMES"}
            labelledBy="feature-overlay-title"
          >
            <div className="p-4 sm:p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="input-brutal pl-12 text-lg"
                  placeholder={openCommand ? "TYPE A COMMAND..." : "SEARCH WORK, SERVICES, JOURNAL..."}
                  aria-label={openCommand ? "Search commands" : "Search site"}
                  aria-activedescendant={activeListLength > 0 ? `cmd-opt-${selectedIndex}` : undefined}
                  data-testid="overlay-search-input"
                />
              </div>

              {openCommand && !query && (
                <div className="mt-5 grid gap-2" role="listbox" aria-label="Commands" data-testid="command-list">
                  {commands.map(([label, action], index) => {
                    const isSelected = selectedIndex === index;
                    return (
                      <button
                        type="button"
                        id={`cmd-opt-${index}`}
                        key={label}
                        onClick={action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`card-press flex items-center justify-between border-[3px] border-[#111] px-4 py-3 text-left font-mono-label text-xs font-bold transition-colors ${
                          isSelected ? "bg-[#FFE45C] translate-x-1" : "bg-[#F5F0E8]"
                        }`}
                        role="option"
                        aria-selected={isSelected}
                        data-testid={`cmd-item-${index}`}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")} / {label}
                        </span>
                        <ArrowUpRight size={16} />
                      </button>
                    );
                  })}
                </div>
              )}

              {(!openCommand || query) && (
                <div className="mt-5 grid gap-2" role="listbox" aria-label="Search results" data-testid="search-results-list">
                  {results.length ? (
                    results.map((result, index) => {
                      const isSelected = selectedIndex === index;
                      return (
                        <button
                          type="button"
                          id={`cmd-opt-${index}`}
                          key={`${result.category}-${result.title}`}
                          onClick={() => {
                            result.action();
                            track("search_used", { result: result.title });
                            if (result.destination.startsWith("#")) close();
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`card-press border-[3px] border-[#111] p-4 text-left transition-colors ${
                            isSelected ? "bg-[#FFE45C]" : "bg-[#F5F0E8]"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                          data-testid={`search-result-item-${index}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-display text-2xl">{result.title}</span>
                            <ArrowUpRight size={18} />
                          </div>
                          <div className="font-mono-label text-[10px] font-bold mt-2 text-[#111]/60">
                            {result.category} · {result.destination}
                          </div>
                          <p className="font-semibold text-sm mt-2">{result.description}</p>
                        </button>
                      );
                    })
                  ) : (
                    query && (
                      <p className="font-mono-label text-xs font-bold py-8 text-center" data-testid="search-no-results">
                        NO RESULTS. TRY ANOTHER WORD.
                      </p>
                    )
                  )}
                </div>
              )}

              {openCommand && (
                <p className="mt-5 font-mono-label text-[10px] font-bold text-[#111]/60">
                  ESC TO CLOSE · ↑↓ TO BROWSE · ENTER TO OPEN
                </p>
              )}
            </div>
          </Overlay>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {page && <ContentOverlay page={page} onClose={closeOverlay} onStartProject={onStartProject} initialArticleId={initialArticleId} />}
      </AnimatePresence>
    </>
  );
}

export function CommandTrigger({ onClick }) {
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.userAgent);
  const shortcut = isMac ? "⌘K" : "Ctrl+K";

  return (
    <button
      type="button"
      onClick={() => {
        onClick();
        track("command_palette_open");
      }}
      className="font-mono-label text-[10px] font-bold px-3 py-2 border-[3px] border-[#111] hover:bg-[#FFE45C] transition-colors"
      aria-label="Open command palette"
      aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
      data-testid="command-palette-trigger"
    >
      <Command size={14} className="inline mr-1" />
      {shortcut}
    </button>
  );
}

export { track } from "@/lib/analytics";
