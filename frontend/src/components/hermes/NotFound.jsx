import { useEffect } from "react";
import { motion } from "framer-motion";
import { EASE, Star4 } from "./primitives";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Hermes Software";
    let meta = document.head.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";
    return () => {
      meta.content = "index, follow";
    };
  }, []);

  return (
    <main
      className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-6"
      data-testid="not-found-page"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="w-full max-w-2xl border-[4px] border-[#111] shadow-hard-lg bg-[#FFE45C] p-8 sm:p-14"
      >
        <div className="flex justify-between items-start">
          <span className="font-mono-label text-xs font-bold">
            HERMES / ERROR
          </span>
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          >
            <Star4 size={36} fill="#111" className="spin-slow" />
          </motion.span>
        </div>

        <motion.h1
          className="font-display text-[clamp(7rem,24vw,14rem)] leading-[.78] mt-12"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          404
        </motion.h1>

        <motion.p
          className="font-display text-3xl sm:text-5xl mt-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
        >
          THIS PAGE SHIPPED WITHOUT US.
        </motion.p>

        <motion.a
          href="/"
          data-testid="not-found-go-home"
          className="btn-press inline-block mt-10 bg-[#FF5C5C] border-[3px] border-[#111] shadow-hard font-display text-2xl px-7 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
        >
          GO HOME →
        </motion.a>
      </motion.div>
    </main>
  );
}
