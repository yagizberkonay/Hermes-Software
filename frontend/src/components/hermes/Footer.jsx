import { useLang } from "@/lib/i18n";
import { RegMark } from "./primitives";

export default function Footer() {
  const { t } = useLang();
  const hrefs = ["mailto:hello@hermessoftware.co", "https://instagram.com", "https://github.com", "https://linkedin.com"];
  return (
    <footer className="bg-[#111] text-[#F5F0E8] pt-16 pb-8" aria-label="Footer">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b-[3px] border-[#F5F0E8]/20">
          <div className="md:col-span-6">
            <p className="font-display text-3xl sm:text-4xl leading-tight">
              HERMES SOFTWARE INC.<span className="text-sm align-top">®</span>
            </p>
            <p className="font-mono-label text-xs font-semibold mt-3 text-[#F5F0E8]/60">{t.footer.location}</p>
          </div>
          <nav className="md:col-span-4 flex flex-col gap-3" aria-label="Social links">
            {t.footer.links.map((label, i) => (
              <a
                key={label}
                data-testid={`footer-link-${label.toLowerCase().replace(/[^a-z]/g, "")}`}
                href={hrefs[i]}
                target={i === 0 ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="link-underline w-fit font-mono-label text-sm font-bold"
              >
                {label} ↗
              </a>
            ))}
          </nav>
          <div className="md:col-span-2 flex md:justify-end items-start">
            <RegMark size={44} stroke="#F5F0E8" className="opacity-40" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6">
          <p className="font-mono-label text-[10px] font-semibold text-[#F5F0E8]/50">{t.footer.copyright}</p>
          <p className="font-mono-label text-[10px] font-bold text-[#FFE45C]">{t.footer.intent}</p>
        </div>
      </div>
    </footer>
  );
}
