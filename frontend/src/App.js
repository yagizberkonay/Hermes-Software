import { useEffect, useState } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { LangProvider } from "@/lib/i18n";
import Nav from "@/components/hermes/Nav";
import Hero from "@/components/hermes/Hero";
import Ticker from "@/components/hermes/Ticker";
import About from "@/components/hermes/About";
import Services from "@/components/hermes/Services";
import Work from "@/components/hermes/Work";
import Testimonials from "@/components/hermes/Testimonials";
import Pricing from "@/components/hermes/Pricing";
import Faq from "@/components/hermes/Faq";
import Cta from "@/components/hermes/Cta";
import Footer from "@/components/hermes/Footer";
import ContactModal from "@/components/hermes/ContactModal";
import FeatureOverlays, { CommandTrigger, track } from "@/components/hermes/FeatureOverlays";

function setMeta(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let node = document.head.querySelector(selector);
  if (!node) { node = document.createElement("meta"); node.setAttribute(property ? "property" : "name", name); document.head.appendChild(node); }
  node.setAttribute("content", content);
}

function updateMetadata(lang) {
  const tr = lang === "tr";
  const title = tr ? "Hermes Software — Fikirden Yazılıma" : "Hermes Software — Ideas Into Software";
  const description = tr ? "İstanbul merkezli bağımsız yazılım stüdyosu. Dijital ürünleri tasarlar, geliştirir ve yayına alırız." : "Independent software studio in Istanbul. We design, engineer and ship digital products.";
  document.title = title;
  setMeta("description", description);
  setMeta("og:title", title, true); setMeta("og:description", description, true); setMeta("og:type", "website", true); setMeta("og:url", window.location.origin + window.location.pathname, true);
  setMeta("twitter:card", "summary_large_image"); setMeta("twitter:title", title); setMeta("twitter:description", description);
  let canonical = document.head.querySelector("link[rel=canonical]");
  if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
  canonical.href = window.location.origin + window.location.pathname;
  const schema = { "@context": "https://schema.org", "@type": ["Organization", "WebSite"], name: "Hermes Software Inc.", url: window.location.origin, description };
  let ld = document.head.querySelector("script[data-hermes-schema]");
  if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.dataset.hermesSchema = "true"; document.head.appendChild(ld); }
  ld.textContent = JSON.stringify(schema);
}

function NotFound() {
  return <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-6"><div className="w-full max-w-2xl border-[4px] border-[#111] shadow-hard-lg bg-[#FFE45C] p-8 sm:p-14"><div className="flex justify-between items-start"><span className="font-mono-label text-xs font-bold">HERMES / ERROR</span><span className="font-display text-5xl" aria-hidden="true">◌</span></div><h1 className="font-display text-[clamp(7rem,24vw,14rem)] leading-[.78] mt-12">404</h1><p className="font-display text-3xl sm:text-5xl mt-12">THIS PAGE SHIPPED WITHOUT US.</p><a href="/" className="btn-press inline-block mt-10 bg-[#FF5C5C] border-[3px] border-[#111] shadow-hard font-display text-2xl px-7 py-4">GO HOME →</a></div></main>;
}

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCommand, setOpenCommand] = useState(false);
  const openContact = (est = null) => { setEstimate(est); setModalOpen(true); track("contact_start"); };
  useEffect(() => {
    updateMetadata(document.documentElement.lang || "en");
    const onLanguage = () => updateMetadata(document.documentElement.lang || "en");
    const observer = new MutationObserver(onLanguage);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    const onAnalytics = (event) => { if (process.env.NODE_ENV !== "production") console.debug("[hermes:event]", event.detail); };
    window.addEventListener("hermes:analytics", onAnalytics);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => { observer.disconnect(); window.removeEventListener("hermes:analytics", onAnalytics); };
    const lenis = new Lenis({ lerp: 0.09 }); window.__lenis = lenis;
    let raf; const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; observer.disconnect(); window.removeEventListener("hermes:analytics", onAnalytics); };
  }, []);
  useEffect(() => { const onKey = (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpenCommand(true); track("command_palette_open"); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  return <div className="bg-[#F5F0E8] text-[#111]"><Nav onStartProject={() => openContact()} onSearch={() => { setOpenSearch(true); track("search_used"); }} commandTrigger={<CommandTrigger onClick={() => setOpenCommand(true)} />} /><main><Hero /><Ticker color="#FFE45C" duration="30s" /><About /><Ticker color="#45B7D1" reverse duration="38s" /><Services /><Work onStartProject={openContact} /><Testimonials /><Pricing onStartProject={openContact} /><Faq /><Cta onStartProject={() => openContact()} /></main><Footer /><ContactModal open={modalOpen} onClose={() => setModalOpen(false)} estimate={estimate} /><FeatureOverlays openSearch={openSearch} setOpenSearch={setOpenSearch} openCommand={openCommand} setOpenCommand={setOpenCommand} onStartProject={openContact} /></div>;
}

function App() { const knownPath = window.location.pathname === "/" || window.location.pathname === ""; return <LangProvider>{knownPath ? <HomePage /> : <NotFound />}<Toaster position="bottom-center" toastOptions={{ style: { background: "#111", color: "#F5F0E8", border: "3px solid #F5F0E8", borderRadius: 0, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, textTransform: "uppercase", fontSize: "11px" } }} /></LangProvider>; }
export default App;
