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
import Testimonials from "@/components/hermes/Testimonials";
import Pricing from "@/components/hermes/Pricing";
import Faq from "@/components/hermes/Faq";
import Cta from "@/components/hermes/Cta";
import Footer from "@/components/hermes/Footer";
import ContactModal from "@/components/hermes/ContactModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09 });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  const openContact = (est = null) => {
    setEstimate(est);
    setModalOpen(true);
  };

  return (
    <LangProvider>
      <div className="bg-[#F5F0E8] text-[#111]">
        <Nav onStartProject={() => openContact()} />
        <main>
          <Hero />
          <Ticker color="#FFE45C" duration="30s" />
          <About />
          <Ticker color="#45B7D1" reverse duration="38s" />
          <Services />
          <Testimonials />
          <Pricing onStartProject={openContact} />
          <Faq />
          <Cta onStartProject={() => openContact()} />
        </main>
        <Footer />
        <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} estimate={estimate} />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#111",
              color: "#F5F0E8",
              border: "3px solid #F5F0E8",
              borderRadius: 0,
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "11px",
            },
          }}
        />
      </div>
    </LangProvider>
  );
}

export default App;
