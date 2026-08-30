import { useLang } from "@/lib/i18n";
import { Star4 } from "./primitives";

export default function Ticker({ color = "#FFE45C", reverse = false, duration = "28s" }) {
  const { t } = useLang();
  const items = [...t.ticker, ...t.ticker];
  return (
    <div
      className="border-y-[3px] border-[#111] overflow-hidden py-4 sm:py-5"
      style={{ background: color }}
      aria-hidden="true"
      data-testid="ticker-marquee"
    >
      <div
        className="marquee-track items-center gap-8 sm:gap-12 px-6"
        style={{ "--marquee-duration": duration, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-12 shrink-0">
            <span className="font-display text-3xl sm:text-5xl whitespace-nowrap">{word}</span>
            <Star4 size={26} />
          </span>
        ))}
      </div>
    </div>
  );
}
