import { useState } from "react";
import { useLang } from "@/lib/i18n";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export default function Nav({ onStartProject, onSearch, commandTrigger }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const links = [
    ["about", t.nav.about],
    ["work", t.nav.work],
    ["services", t.nav.services],
    ["pricing", t.nav.pricing],
    ["faq", t.nav.faq],
  ];
  const go = (id) => { setOpen(false); scrollTo(id); };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8] border-b-[3px] border-[#111]">
      <nav className="flex items-stretch justify-between h-[64px]" aria-label="Main">
        <button
          data-testid="nav-logo"
          onClick={() => { if (window.__lenis) window.__lenis.scrollTo(0); else window.scrollTo({ top: 0 }); }}
          className="font-display text-lg sm:text-xl px-4 sm:px-6 flex items-center border-r-[3px] border-[#111] hover:bg-[#FFE45C] transition-colors"
        >
          HERMES SOFTWARE INC.<span className="text-xs align-top">®</span>
        </button>

        <div className="hidden lg:flex items-stretch">
          {links.map(([id, label]) => (
            <button
              key={id}
              data-testid={`nav-link-${id}`}
              onClick={() => go(id)}
              className="font-mono-label text-xs font-semibold px-6 border-l-[3px] border-[#111] hover:bg-[#FFE45C] transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="flex items-center gap-0 border-l-[3px] border-[#111] px-4">
            {["en", "tr"].map((l) => (
              <button
                key={l}
                data-testid={`lang-toggle-${l}`}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`font-mono-label text-xs font-bold px-3 py-2 border-[3px] border-[#111] ${lang === l ? "bg-[#111] text-[#F5F0E8]" : "bg-transparent hover:bg-[#FFE45C]"} ${l === "tr" ? "border-l-0" : ""} transition-colors`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {onSearch && <button type="button" onClick={onSearch} className="font-mono-label text-[10px] font-bold px-3 border-l-[3px] border-[#111] hover:bg-[#45B7D1] transition-colors" aria-label="Search site">⌕ SEARCH</button>}
          {commandTrigger && <div className="flex items-center border-l-[3px] border-[#111] px-2">{commandTrigger}</div>}
          <button
            data-testid="nav-start-project"
            onClick={onStartProject}
            className="font-mono-label text-xs font-bold px-6 bg-[#FF5C5C] border-l-[3px] border-[#111] hover:bg-[#111] hover:text-[#F5F0E8] transition-colors"
          >
            {t.nav.cta}
          </button>
        </div>

        <div className="flex lg:hidden items-stretch">
          {["en", "tr"].map((l) => (
            <button
              key={l}
              data-testid={`lang-toggle-mobile-${l}`}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`font-mono-label text-xs font-bold px-3 border-l-[3px] border-[#111] ${lang === l ? "bg-[#111] text-[#F5F0E8]" : ""}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
          {onSearch && <button type="button" onClick={onSearch} className="font-mono-label text-[10px] font-bold px-3 border-l-[3px] border-[#111] hover:bg-[#45B7D1] transition-colors" aria-label="Search site">⌕</button>}
          <button
            data-testid="nav-mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
            className="px-5 border-l-[3px] border-[#111] bg-[#FFE45C]"
          >
            <div className="w-6 space-y-1.5">
              <span className={`block h-[3px] bg-[#111] transition-transform ${open ? "rotate-45 translate-y-[9px]" : ""}`} />
              <span className={`block h-[3px] bg-[#111] ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[3px] bg-[#111] transition-transform ${open ? "-rotate-45 -translate-y-[9px]" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t-[3px] border-[#111] bg-[#F5F0E8]" data-testid="nav-mobile-menu">
          {links.map(([id, label]) => (
            <button
              key={id}
              data-testid={`nav-mobile-link-${id}`}
              onClick={() => go(id)}
              className="block w-full text-left font-display text-3xl px-6 py-4 border-b-[3px] border-[#111] hover:bg-[#FFE45C]"
            >
              {label}
            </button>
          ))}
          <button
            data-testid="nav-mobile-start-project"
            onClick={() => { setOpen(false); onStartProject(); }}
            className="block w-full text-left font-display text-3xl px-6 py-4 bg-[#FF5C5C]"
          >
            {t.nav.cta}
          </button>
        </div>
      )}
    </header>
  );
}
