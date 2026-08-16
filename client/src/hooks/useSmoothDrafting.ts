/**
 * THE BLUEPRINT — Motion plumbing
 * Lenis and low-amplitude damping add physical continuity without softening
 * the page's hard technical geometry or overriding reduced-motion preferences.
 */
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

export function useSmoothDrafting() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) {
      root?.style.setProperty("--pointer-x", "0");
      root?.style.setProperty("--pointer-y", "0");
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.92,
    });

    let scrollFrame = 0;
    const updateScroll = (time: number) => {
      lenis.raf(time);
      scrollFrame = window.requestAnimationFrame(updateScroll);
    };
    scrollFrame = window.requestAnimationFrame(updateScroll);

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let pointerFrame = 0;

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const dampPointer = () => {
      current.x += (target.x - current.x) * 0.075;
      current.y += (target.y - current.y) * 0.075;
      root.style.setProperty("--pointer-x", current.x.toFixed(4));
      root.style.setProperty("--pointer-y", current.y.toFixed(4));
      pointerFrame = window.requestAnimationFrame(dampPointer);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    pointerFrame = window.requestAnimationFrame(dampPointer);

    return () => {
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener("pointermove", onPointerMove);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return { rootRef, reduceMotion };
}
