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
import NotFound from "@/components/hermes/NotFound";
import FeatureOverlays, { CommandTrigger, track } from "@/components/hermes/FeatureOverlays";

const PROD_ORIGIN = "https://hermessoftware.space";

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
  const locale = tr ? "tr_TR" : "en_US";
  const canonical = PROD_ORIGIN + "/";

  document.title = title;

  // Basic meta
  setMeta("description", description);
  setMeta("robots", "index, follow");

  // Open Graph
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:type", "website", true);
  setMeta("og:url", canonical, true);
  setMeta("og:site_name", "Hermes Software Inc.", true);
  setMeta("og:locale", locale, true);

  // Twitter/X
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);

  // Canonical
  let link = document.head.querySelector("link[rel=canonical]");
  if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
  link.href = canonical;

  // Structured Data — Organization
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hermes Software Inc.",
    url: PROD_ORIGIN,
    description,
    email: "info@hermessoftware.space",
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    sameAs: [
      "https://instagram.com/hermes.software",
    ],
  };

  // Structured Data — WebSite
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hermes Software",
    url: PROD_ORIGIN,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: PROD_ORIGIN + "/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Insert / update JSON-LD
  let ldOrg = document.head.querySelector('script[data-hermes-schema="org"]');
  if (!ldOrg) { ldOrg = document.createElement("script"); ldOrg.type = "application/ld+json"; ldOrg.dataset.hermesSchema = "org"; document.head.appendChild(ldOrg); }
  ldOrg.textContent = JSON.stringify(orgSchema);

  let ldSite = document.head.querySelector('script[data-hermes-schema="site"]');
  if (!ldSite) { ldSite = document.createElement("script"); ldSite.type = "application/ld+json"; ldSite.dataset.hermesSchema = "site"; document.head.appendChild(ldSite); }
  ldSite.textContent = JSON.stringify(siteSchema);

  // Remove old combined schema if exists
  const oldLd = document.head.querySelector('script[data-hermes-schema="true"]');
  if (oldLd) oldLd.remove();
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
