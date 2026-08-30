import { StarRating } from "./primitives";
import { useLang } from "@/lib/i18n";

const Card = ({ card }) => {
  const base = "border-[3px] border-[#111] p-6 sm:p-7 shadow-hard-sm";
  return (
    <figure className={`${base} ${card.type === "big" ? "bg-[#FFE45C]" : "bg-[#F5F0E8]"}`}>
      {card.type === "stars" && <StarRating className="mb-4" />}
      <blockquote
        className={
          card.type === "big"
            ? "font-display text-2xl sm:text-3xl leading-tight"
            : card.type === "quote"
            ? "font-display text-lg sm:text-xl leading-snug"
            : "text-sm font-semibold leading-relaxed"
        }
      >
        {card.quote}
      </blockquote>
      <figcaption className="font-mono-label text-[10px] font-semibold mt-5 text-[#111]/60">{card.who}</figcaption>
    </figure>
  );
};

export default function Testimonials() {
  const { t } = useLang();
  const cols = [
    { cards: [t.testimonials.cards[0], t.testimonials.cards[1], t.testimonials.cards[2]], cls: "testi-col-down", dur: "38s" },
    { cards: [t.testimonials.cards[3], t.testimonials.cards[4], t.testimonials.cards[5]], cls: "testi-col-up", dur: "30s" },
    { cards: [t.testimonials.cards[6], t.testimonials.cards[7], t.testimonials.cards[8]], cls: "testi-col-down", dur: "46s" },
  ];

  return (
    <section id="testimonials" className="py-32 sm:py-48 bg-[#111]" aria-label="Testimonials">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-3 h-3 bg-[#F5F0E8]" aria-hidden="true" />
          <span className="font-mono-label text-xs font-semibold text-[#F5F0E8]">{t.testimonials.tag}</span>
          <span className="flex-1 h-[3px] bg-[#F5F0E8]" aria-hidden="true" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 sm:mb-20">
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-outline-paper">{t.testimonials.title}</h2>
          <p className="font-mono-label text-[10px] font-semibold text-[#FFE45C] max-w-xs">{t.testimonials.note}</p>
        </div>

        <div
          className="testi-wall grid grid-cols-1 md:grid-cols-3 gap-7 overflow-hidden h-[520px] sm:h-[620px] border-[3px] border-[#F5F0E8] p-7 sm:p-8 bg-[#111]"
          data-testid="testimonial-wall"
        >
          {cols.map((col, ci) => (
            <div key={ci} className={`${col.cls} ${ci === 2 ? "hidden md:flex" : "flex"} flex-col gap-7`} style={{ "--col-duration": col.dur }}>
              {[...col.cards, ...col.cards].map((card, i) => (
                <Card key={i} card={card} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
