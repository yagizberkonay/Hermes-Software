import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

export default function Playground() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const data = t.overlays.playground;

  useEffect(() => {
    setMounted(true);
    track("playground_onboarding_view");
    document.title = "Hermes Playground";
  }, []);

  const handleEnter = () => {
    track("playground_enter_click");
    toast("SYSTEM INITIALIZATION PENDING", {
      description: "The Playground environment is being prepared. Check back soon."
    });
  };

  return (
    <div className="min-h-[100dvh] bg-[#C084FC] text-[#111] selection:bg-[#111] selection:text-[#C084FC] flex flex-col font-sans">
      <nav className="flex items-center justify-between h-[64px] border-b-[3px] border-[#111] bg-[#F5F0E8]">
        <button
          onClick={() => { window.location.href = "/"; }}
          className="font-display text-lg sm:text-xl px-4 sm:px-6 h-full flex items-center border-r-[3px] border-[#111] hover:bg-[#FFE45C] transition-colors uppercase"
        >
          ← {t.nav.about || "STUDIO"}
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Decorative background grid/elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
        
        {mounted && (
          <motion.div 
            className="relative z-10 max-w-4xl w-full bg-[#F5F0E8] border-[4px] border-[#111] shadow-hard-xl p-8 sm:p-16 text-center"
            initial={{ y: 40, opacity: 0, rotate: 1 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-label text-xs sm:text-sm font-bold bg-[#111] text-[#F5F0E8] px-3 py-1 uppercase inline-block mb-6">
              {data.category} // V.01
            </span>
            
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] mb-8 uppercase">
              {data.title}
            </h1>
            
            <p className="font-semibold text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed mb-6">
              {data.description}
            </p>
            
            <p className="font-medium text-lg max-w-xl mx-auto mb-12 opacity-80">
              {data.body} Welcome to the testing ground. We are currently preparing the environment.
            </p>

            <button
              onClick={handleEnter}
              className="btn-press bg-[#111] text-[#F5F0E8] border-[4px] border-[#111] shadow-hard font-display text-2xl sm:text-3xl px-8 py-5 hover:bg-[#FFE45C] hover:text-[#111] transition-colors uppercase inline-block"
            >
              ENTER PLAYGROUND →
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
