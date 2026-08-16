/**
 * THE BLUEPRINT — Motion plumbing
 * Lenis owns one smooth-scroll clock; no unused pointer loop or per-frame style writes.
 * This keeps the drafting surface responsive while preserving reduced-motion behavior.
 */
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

export function useSmoothDrafting() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const prefersNativeTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 720;
    if (!root || reduceMotion || prefersNativeTouch) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });

    return () => {
      lenis.destroy();
    };
  }, [reduceMotion]);

  return { rootRef, reduceMotion };
}
