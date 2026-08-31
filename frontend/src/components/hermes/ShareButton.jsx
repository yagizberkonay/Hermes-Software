import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { EASE } from "./primitives";
import { track } from "./FeatureOverlays";

/**
 * Compact share button with Web Share API + fallback dropdown.
 * Uses existing neo-brutalist styling.
 *
 * @param {{ title: string, text?: string, url?: string }} props
 */
export default function ShareButton({ title, text, url }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const shareUrl = url || window.location.href;

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const handleShare = async () => {
    track("share_click", { title });

    // Try native Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({ title, text: text || title, url: shareUrl });
        return;
      } catch {
        // User cancelled or API failed — fall through to dropdown
      }
    }

    setOpen((v) => !v);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("LINK COPIED");
    } catch {
      toast.error("COPY FAILED");
    }
    close();
  };

  const shareX = () => {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer,width=550,height=420"
    );
    close();
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer,width=550,height=420"
    );
    close();
  };

  const items = [
    ["COPY LINK", copyLink, "share-copy"],
    ["SHARE ON X", shareX, "share-x"],
    ["SHARE ON LINKEDIN", shareLinkedIn, "share-linkedin"],
  ];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={handleShare}
        className="font-mono-label text-[10px] font-bold border-[3px] border-[#111] px-3 py-2 hover:bg-[#45B7D1] transition-colors"
        aria-label={`Share ${title}`}
        aria-expanded={open}
        data-testid="share-trigger"
      >
        ↗ SHARE
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute right-0 top-full mt-2 z-50 bg-[#F5F0E8] border-[3px] border-[#111] shadow-hard-sm min-w-[180px]"
            role="menu"
            aria-label="Share options"
          >
            {items.map(([label, action, testId]) => (
              <button
                key={testId}
                type="button"
                onClick={action}
                className="block w-full text-left font-mono-label text-[10px] font-bold px-4 py-3 border-b-[2px] border-[#111]/10 last:border-b-0 hover:bg-[#FFE45C] transition-colors"
                role="menuitem"
                data-testid={testId}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
