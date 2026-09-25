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

const SITE_URL = "https://hermessoftware.space";
const BRAND_NAME = "Hermes Software Inc.";
const OG_IMAGE = "https://static.prod-images.emergentagent.com/jobs/11657cd1-e0a5-4774-9699-79e768a133c1/images/d203f257ff219869bb7268918d8c5c8a27f94cd5fe2bb2d79eed12f2d111c47e.jpeg";

function setMeta(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function setLink(rel, href, attrs = {}) {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.rel = rel;
    document.head.appendChild(node);
  }
  node.href = href;
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
}

function updateMetadata(lang, isNotFound = false) {
  const tr = lang === "tr";
  const title = isNotFound
    ? `Page Not Found | ${BRAND_NAME}`
    : tr
      ? `${BRAND_NAME} — Fikirden Yazılıma`
      : `${BRAND_NAME} — Ideas Into Software`;
  const description = isNotFound
    ? "The page you are looking for does not exist. Return to Hermes Software Inc."
    : tr
      ? "Hermes Software Inc., İstanbul merkezli bağımsız yazılım stüdyosu. Dijital ürünleri tasarlar, geliştirir ve yayına alırız."
      : "Hermes Software Inc. is an independent software studio in Istanbul. We design, engineer and ship digital products.";
  const canonical = isNotFound ? `${SITE_URL}/404` : `${SITE_URL}/`;

  document.title = title;
  setMeta("description", description);
  setMeta("robots", isNotFound ? "noindex, nofollow" : "index, follow, max-image-preview:large");
  setMeta("author", BRAND_NAME);
  setMeta("theme-color", "#111111");
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:type", "website", true);
  setMeta("og:url", canonical, true);
  setMeta("og:site_name", BRAND_NAME, true);
  setMeta("og:locale", tr ? "tr_TR" : "en_US", true);
  setMeta("og:image", OG_IMAGE, true);
  setMeta("og:image:alt", `${BRAND_NAME} — Onyx project showcase`, true);
  setMeta("twitter:card", "summary", false);
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  setMeta("twitter:image", OG_IMAGE);
  setLink("canonical", canonical);

  let ld = document.head.querySelector("script[data-hermes-schema]");
  if (!ld) {
    ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.dataset.hermesSchema = "true";
    document.head.appendChild(ld);
  }
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND_NAME,
        alternateName: ["Hermes Software", "Hermes Software Inc"],
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        description: "Independent software studio in Istanbul designing, engineering and shipping digital products.",
        knowsAbout: ["software development", "web development", "digital product design", "product engineering"]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND_NAME,
        alternateName: "Hermes Software",
        description: "Ideas into software.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en", "tr"]
      }
    ]
  });
}

function NotFound() {
  useEffect(() => updateMetadata("en", true), []);
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
