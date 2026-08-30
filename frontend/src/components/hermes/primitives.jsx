import { useEffect, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";

export const EASE = [0.87, 0, 0.13, 1];

export const BrutalButton = ({ children, className = "", ...props }) => (
  <button
    className={`btn-press shadow-hard border-[3px] border-[#111] font-mono-label font-bold text-sm px-6 py-3 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SectionTag = ({ children, className = "" }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <span className="w-3 h-3 bg-[#111]" aria-hidden="true" />
    <span className="font-mono-label text-xs font-semibold">{children}</span>
    <span className="flex-1 h-[3px] bg-[#111]" aria-hidden="true" />
  </div>
);

export const RevealLine = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <span ref={ref} className={`reveal-mask ${className}`}>
      <span className={`reveal-inner ${inView ? "is-in" : ""}`} style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
};

export const AnimatedNumber = ({ value, format }) => {
  const ref = useRef(null);
  const prev = useRef(value);
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.55,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, format]);
  return <span ref={ref}>{format(value)}</span>;
};

/* ---- Graphic language: 4-point star, registration mark, big arrow ---- */
export const Star4 = ({ size = 48, fill = "#111", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path d="M24 0 L29 19 L48 24 L29 29 L24 48 L19 29 L0 24 L19 19 Z" fill={fill} />
  </svg>
);

export const RegMark = ({ size = 32, stroke = "#111", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="10" fill="none" stroke={stroke} strokeWidth="2.5" />
    <line x1="16" y1="0" x2="16" y2="32" stroke={stroke} strokeWidth="2.5" />
    <line x1="0" y1="16" x2="32" y2="16" stroke={stroke} strokeWidth="2.5" />
  </svg>
);

export const BigArrow = ({ size = 64, fill = "#111", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M8 32 H46 M46 32 L30 16 M46 32 L30 48" stroke={fill} strokeWidth="7" fill="none" strokeLinecap="square" />
  </svg>
);

export const StarRating = ({ className = "" }) => (
  <div className={`flex gap-1 ${className}`} aria-label="5 stars">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 1 L12.4 7 L19 7.6 L14 12 L15.5 19 L10 15.3 L4.5 19 L6 12 L1 7.6 L7.6 7 Z" fill="#111" />
      </svg>
    ))}
  </div>
);
