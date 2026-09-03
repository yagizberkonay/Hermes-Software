import { useLang } from "@/lib/i18n";
import Nav from "@/components/hermes/Nav";
import Footer from "@/components/hermes/Footer";

export default function LegalLayout({ title, lastUpdated, children }) {
  const { t } = useLang();
  
  return (
    <div className="bg-[#F5F0E8] text-[#111] min-h-screen flex flex-col">
      <Nav onStartProject={() => window.location.href = "/"} onSearch={() => {}} />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <h1 className="font-anton text-5xl md:text-7xl uppercase mb-4 tracking-wide">{title}</h1>
        <p className="font-mono text-xs text-[#888] mb-16 uppercase">
          {t.documents?.lastUpdated || "LAST UPDATED"}: {lastUpdated}
        </p>
        <div className="font-sans text-base md:text-lg leading-relaxed text-[#111] space-y-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
