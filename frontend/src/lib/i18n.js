import { createContext, useContext, useState, useEffect } from "react";

export const STR = {
  en: {
    nav: { about: "ABOUT", work: "WORK", services: "SERVICES", pricing: "PRICING", faq: "FAQ", cta: "START A PROJECT" },
    hero: {
      lines: ["WE", "MAKE", "THINGS", "MOVE."],
      outlineIndex: 2,
      kicker: "SOFTWARE STUDIO — EST. ISTANBUL",
      sub: "Software should have a point of view. Ours does.",
      scroll: "SCROLL",
      stamp: "HERMES SOFTWARE INC.®",
    },
    ticker: ["SOFTWARE", "PRODUCT", "DESIGN", "ENGINEERING", "BRAND", "AUTOMATION", "DIGITAL PRODUCTS"],
    about: {
      tag: "01 — WHO WE ARE",
      statement: [["WE TURN"], ["IDEAS"], ["INTO"], ["SOFTWARE."]],
      title: "WE ARE HERMES.",
      body1: "A software studio for people who have an idea and need someone to actually build the damn thing.",
      body2: "We design, engineer and ship digital products — from the first sketch to production. No decks about synergy. No black box. Working software, every week.",
      facts: [["100%", "CUSTOM BUILT"], ["0", "TEMPLATES USED"], ["1", "POINT OF VIEW"]],
    },
    services: {
      tag: "02 — WHAT WE DO",
      title: "CAPABILITIES",
      items: [
        { name: "WEB APPLICATIONS", desc: "Dashboards, platforms, tools. The stuff your business actually runs on." },
        { name: "MOBILE APPS", desc: "iOS & Android. Native feel, one codebase." },
        { name: "CUSTOM SOFTWARE", desc: "The weird, specific thing nobody else will build. Our favorite." },
        { name: "DIGITAL PRODUCTS", desc: "From napkin sketch to app store. Full product, full stack." },
        { name: "AUTOMATION", desc: "Robots doing the boring parts, so humans don't have to." },
        { name: "BRAND IDENTITY", desc: "Logos, systems, voices. Software with a face." },
      ],
    },
    work: {
      tag: "03 — SELECTED WORK",
      title: "THINGS WE'VE SHIPPED",
      sub: "A few products we designed, built and put into the world.",
      cta: "START A PROJECT →",
      projects: [
        { title: "ONYX", category: "API CLIENT", year: "2025", desc: "A faster, cleaner alternative to Postman for developers who just want to hit an endpoint without the bloat.", result: "30% MORE USER-FRIENDLY", img: "https://static.prod-images.emergentagent.com/jobs/11657cd1-e0a5-4774-9699-79e768a133c1/images/d203f257ff219869bb7268918d8c5c8a27f94cd5fe2bb2d79eed12f2d111c47e.jpeg" },
        { title: "PROMPT SHRINK", category: "LLM GATEWAY", year: "2025", desc: "A gateway that sits between your app and any LLM, compressing prompts without losing meaning.", result: "-60% TOKEN USAGE", img: "https://static.prod-images.emergentagent.com/jobs/11657cd1-e0a5-4774-9699-79e768a133c1/images/c5ff605149c5c8ad44902b951f0b6afc50a7f9cdadb7e7add2d9ed7f74147ab6.jpeg" },
        { title: "MOMENT", category: "DESKTOP TOOL", year: "2025", desc: "Personal digital context for your computer — it quietly understands what you're doing and surfaces what you need, when you need it.", result: "SHARPER DESKTOP CONTEXT", img: "https://static.prod-images.emergentagent.com/jobs/11657cd1-e0a5-4774-9699-79e768a133c1/images/77bfd7ecbe2c8ed4590926df41c861f6ec33b0eda23e6d4f6cb28c03ef816039.jpeg" },
      ],
    },
    testimonials: {
      tag: "04 — WHAT CLIENTS SAY",
      title: "THE WALL",
      note: "WHAT IT'S LIKE TO BUILD WITH HERMES.",
      cards: [
        { type: "big", quote: "\u201CTHEY SHIP. EVERY WEEK.\u201D", who: "ELİF DEMİR — COO, KOVAN" },
        { type: "stars", quote: "We came in with a messy Figma and left with a live product in six weeks. Zero drama.", who: "MARCUS FELDT — FOUNDER, RUNDO" },
        { type: "quote", quote: "\u201CWe brought an idea. They brought it to life — then made it better.\u201D", who: "PRIYA NAIR — CEO, LUMEN HEALTH" },
        { type: "small", quote: "Fastest team we've hired. No hand-holding required.", who: "DENİZ YILMAZ — PM, TARLA" },
        { type: "big", quote: "\u201CFINALLY, DEVELOPERS WHO DESIGN.\u201D", who: "SOFIA RICCI — BRAND LEAD, ATLAS" },
        { type: "stars", quote: "Our conversion doubled after the rebuild. They actually cared about the numbers.", who: "JAMES O'BRIEN — GROWTH, NORTHWIND" },
        { type: "quote", quote: "\u201CNo jargon, no black box. Just working software and honest updates.\u201D", who: "AYLİN KAYA — OPS DIRECTOR, MERIDIAN" },
        { type: "small", quote: "They said no to half our ideas. They were right.", who: "TOM BECKER — FOUNDER, SLATE" },
        { type: "quote", quote: "\u201CThe estimate was accurate to the dollar. Rare in this industry.\u201D", who: "HANNAH LEE — CFO, BRIGHT LABS" },
      ],
    },
    pricing: {
      tag: "05 — PRICING",
      title: "WHAT ARE WE BUILDING?",
      sub: "Pick the pieces. Watch the number. No sales call required for a ballpark.",
      step1: "01 / PROJECT TYPE",
      step2: "02 / HOW COMPLEX?",
      step3: "03 / WHAT DO YOU NEED?",
      types: { website: "WEBSITE", webapp: "WEB APP", mobile: "MOBILE APP", custom: "CUSTOM SOFTWARE", other: "OTHER" },
      complexity: { simple: "SIMPLE", medium: "MEDIUM", complex: "COMPLEX", heavy: "HEAVY" },
      complexityHint: { simple: "A clean, focused build.", medium: "A few moving parts.", complex: "Many moving parts.", heavy: "Hold our coffee." },
      addons: { brand: "BRAND IDENTITY", backend: "BACKEND", auth: "AUTHENTICATION", payments: "PAYMENTS", admin: "ADMIN PANEL", ai: "AI / AUTOMATION", database: "DATABASE", api: "API INTEGRATIONS" },
      resultLabel: "ESTIMATED PROJECT VALUE",
      disclaimer: "BALLPARK ONLY. REAL QUOTE AFTER A SCOPING CALL.",
      cta: "START A PROJECT →",
    },
    faq: {
      tag: "06 — QUESTIONS",
      title: "FAQ",
      items: [
        { q: "HOW DOES HERMES WORK?", a: "You bring the idea. We scope it together, design it, and build it in weekly sprints. You see working software every week — no black box, no surprises." },
        { q: "HOW MUCH DOES A PROJECT COST?", a: "Depends on what we're building. Use the estimator above for a ballpark. Real quotes come after a scoping call — fixed price, no meter running." },
        { q: "HOW LONG DOES A PROJECT TAKE?", a: "A focused website: 2–4 weeks. A web or mobile app: 6–12 weeks. Heavy custom systems: we'll tell you honestly before we start, not after." },
        { q: "CAN YOU BUILD SOMETHING COMPLETELY CUSTOM?", a: "That's the whole point. If it can be specified, it can be built. We do our best work on the weird ones." },
        { q: "HOW DO WE START?", a: "Hit START A PROJECT, tell us what you're thinking in three sentences, and we'll reply within 48 hours with concrete next steps." },
      ],
    },
    cta: {
      line1: "HAVE AN",
      line2: "IDEA?",
      line3: "LET'S",
      line4: "BUILD IT.",
      button: "START A PROJECT →",
    },
    footer: {
      location: "ISTANBUL / TURKEY",
      links: ["EMAIL", "INSTAGRAM"],
      copyright: "© 2026 HERMES SOFTWARE INC.®",
      intent: "BUILT WITH INTENT.",
    },
    contact: {
      title: "START A PROJECT",
      sub: "Three sentences is enough. We reply within 48 hours.",
      name: "YOUR NAME",
      email: "YOUR EMAIL",
      type: "PROJECT TYPE",
      typeOptions: ["WEBSITE", "WEB APP", "MOBILE APP", "CUSTOM SOFTWARE", "OTHER"],
      message: "WHAT ARE WE BUILDING?",
      estimateNote: "ESTIMATE ATTACHED:",
      captchaLabel: "PROVE YOU'RE HUMAN",
      captchaPlaceholder: "ANSWER",
      captchaRefresh: "NEW QUESTION",
      captchaLoading: "LOADING...",
      captchaError: "WRONG ANSWER. TRY THE NEW ONE.",
      submit: "SEND IT →",
      sending: "SENDING...",
      success: "GOT IT. WE'LL BE IN TOUCH WITHIN 48 HOURS.",
      error: "SOMETHING BROKE. TRY AGAIN.",
    },
  },
  tr: {
    nav: { about: "HAKKINDA", work: "İŞLER", services: "HİZMETLER", pricing: "FİYAT", faq: "SSS", cta: "PROJE BAŞLAT" },
    hero: {
      lines: ["FİKİR", "SENDEN,", "YAZILIM", "BİZDEN."],
      outlineIndex: 2,
      kicker: "YAZILIM STÜDYOSU — İSTANBUL",
      sub: "Yazılımın bir duruşu olmalı. Bizimkinin var.",
      scroll: "KAYDIR",
      stamp: "HERMES SOFTWARE INC.®",
    },
    ticker: ["YAZILIM", "ÜRÜN", "TASARIM", "MÜHENDİSLİK", "MARKA", "OTOMASYON", "DİJİTAL ÜRÜNLER"],
    about: {
      tag: "01 — BİZ KİMİZ",
      statement: [["FİKİRLERİ"], ["YAZILIMA"], ["DÖNÜŞ-"], ["TÜRÜRÜZ."]],
      title: "BİZ HERMES'İZ.",
      body1: "Bir fikri olan ve onu gerçekten inşa edecek birine ihtiyaç duyanlar için bir yazılım stüdyosu.",
      body2: "Dijital ürünleri tasarlar, geliştirir ve yayına alırız — ilk eskizden üretime. Sinerji sunumları yok. Kara kutu yok. Her hafta çalışan yazılım.",
      facts: [["%100", "ÖZEL YAPIM"], ["0", "ŞABLON KULLANIMI"], ["1", "NET DURUŞ"]],
    },
    services: {
      tag: "02 — NE YAPIYORUZ",
      title: "YETKİNLİKLER",
      items: [
        { name: "WEB UYGULAMALARI", desc: "Paneller, platformlar, araçlar. İşinizin gerçekten üzerinde döndüğü şeyler." },
        { name: "MOBİL UYGULAMALAR", desc: "iOS & Android. Native his, tek kod tabanı." },
        { name: "ÖZEL YAZILIM", desc: "Kimsenin yapmayacağı o tuhaf, spesifik şey. Favorimiz." },
        { name: "DİJİTAL ÜRÜNLER", desc: "Peçete eskizinden app store'a. Komple ürün, komple stack." },
        { name: "OTOMASYON", desc: "Sıkıcı işleri robotlar yapsın, insanlar yapmasın." },
        { name: "MARKA KİMLİĞİ", desc: "Logolar, sistemler, sesler. Yüzü olan yazılım." },
      ],
    },
    work: {
      tag: "03 — SEÇME İŞLER",
      title: "YAYINA ALDIKLARIMIZ",
      sub: "Tasarlayıp geliştirdiğimiz ve dünyaya sunduğumuz birkaç ürün.",
      cta: "PROJE BAŞLAT →",
      projects: [
        { title: "ONYX", category: "API İSTEMCİSİ", year: "2025", desc: "Postman'e daha hızlı, daha sade bir alternatif — sadece bir endpoint'i test etmek isteyen geliştiriciler için, şişkinlik olmadan.", result: "%30 DAHA KULLANICI DOSTU", img: "https://static.prod-images.emergentagent.com/jobs/11657cd1-e0a5-4774-9699-79e768a133c1/images/d203f257ff219869bb7268918d8c5c8a27f94cd5fe2bb2d79eed12f2d111c47e.jpeg" },
        { title: "PROMPT SHRINK", category: "LLM GEÇİDİ", year: "2025", desc: "Uygulamanız ile herhangi bir LLM arasına giren, anlamı kaybetmeden prompt'ları sıkıştıran bir geçit.", result: "-%60 TOKEN KULLANIMI", img: "https://static.prod-images.emergentagent.com/jobs/11657cd1-e0a5-4774-9699-79e768a133c1/images/c5ff605149c5c8ad44902b951f0b6afc50a7f9cdadb7e7add2d9ed7f74147ab6.jpeg" },
        { title: "MOMENT", category: "MASAÜSTÜ ARACI", year: "2025", desc: "Bilgisayarınız için kişisel dijital bağlam — ne yaptığınızı sessizce anlar ve ihtiyacınız olanı, ihtiyacınız olduğunda gösterir.", result: "DAHA GÜÇLÜ MASAÜSTÜ BAĞLAMI", img: "https://static.prod-images.emergentagent.com/jobs/11657cd1-e0a5-4774-9699-79e768a133c1/images/77bfd7ecbe2c8ed4590926df41c861f6ec33b0eda23e6d4f6cb28c03ef816039.jpeg" },
      ],
    },
    testimonials: {
      tag: "04 — MÜŞTERİLER NE DİYOR",
      title: "DUVAR",
      note: "HERMES İLE İNŞA ETMEK BÖYLE BİR ŞEY.",
      cards: [
        { type: "big", quote: "\u201CHER HAFTA TESLİM EDİYORLAR.\u201D", who: "ELİF DEMİR — COO, KOVAN" },
        { type: "stars", quote: "Dağınık bir Figma ile geldik, altı haftada canlı bir ürünle ayrıldık. Sıfır drama.", who: "MARCUS FELDT — KURUCU, RUNDO" },
        { type: "quote", quote: "\u201CBiz bir fikir getirdik. Onlar hayata geçirdi — sonra daha da iyileştirdi.\u201D", who: "PRIYA NAIR — CEO, LUMEN HEALTH" },
        { type: "small", quote: "Çalıştığımız en hızlı ekip. El tutmaya gerek yok.", who: "DENİZ YILMAZ — PM, TARLA" },
        { type: "big", quote: "\u201CSONUNDA TASARLAYAN YAZILIMCILAR.\u201D", who: "SOFIA RICCI — MARKA LİDERİ, ATLAS" },
        { type: "stars", quote: "Yeniden yapımdan sonra dönüşümümüz ikiye katlandı. Rakamları gerçekten önemsediler.", who: "JAMES O'BRIEN — BÜYÜME, NORTHWIND" },
        { type: "quote", quote: "\u201CJargon yok, kara kutu yok. Sadece çalışan yazılım ve dürüst güncellemeler.\u201D", who: "AYLİN KAYA — OPERASYON DİREKTÖRÜ, MERIDIAN" },
        { type: "small", quote: "Fikirlerimizin yarısına hayır dediler. Haklıydılar.", who: "TOM BECKER — KURUCU, SLATE" },
        { type: "quote", quote: "\u201CTahmin kuruşu kuruşuna doğruydu. Bu sektörde nadir.\u201D", who: "HANNAH LEE — CFO, BRIGHT LABS" },
      ],
    },
    pricing: {
      tag: "05 — FİYATLANDIRMA",
      title: "NE İNŞA EDİYORUZ?",
      sub: "Parçaları seç. Rakamı izle. Kabaca bir fiyat için satış görüşmesi gerekmez.",
      step1: "01 / PROJE TÜRÜ",
      step2: "02 / NE KADAR KARMAŞIK?",
      step3: "03 / NEYE İHTİYACIN VAR?",
      types: { website: "WEBSİTE", webapp: "WEB UYGULAMASI", mobile: "MOBİL UYGULAMA", custom: "ÖZEL YAZILIM", other: "DİĞER" },
      complexity: { simple: "BASİT", medium: "ORTA", complex: "KARMAŞIK", heavy: "AĞIR" },
      complexityHint: { simple: "Temiz, odaklı bir yapı.", medium: "Birkaç hareketli parça.", complex: "Çok hareketli parça.", heavy: "Kahvemizi tutun." },
      addons: { brand: "MARKA KİMLİĞİ", backend: "BACKEND", auth: "KİMLİK DOĞRULAMA", payments: "ÖDEMELER", admin: "YÖNETİM PANELİ", ai: "AI / OTOMASYON", database: "VERİTABANI", api: "API ENTEGRASYONLARI" },
      resultLabel: "TAHMİNİ PROJE DEĞERİ",
      disclaimer: "SADECE TAHMİN. GERÇEK TEKLİF GÖRÜŞME SONRASI.",
      cta: "PROJE BAŞLAT →",
    },
    faq: {
      tag: "06 — SORULAR",
      title: "SSS",
      items: [
        { q: "HERMES NASIL ÇALIŞIR?", a: "Fikri sen getirirsin. Birlikte kapsamını çıkarır, tasarlar ve haftalık sprintlerle inşa ederiz. Her hafta çalışan yazılım görürsün — kara kutu yok, sürpriz yok." },
        { q: "BİR PROJE NE KADAR TUTAR?", a: "Ne inşa ettiğimize bağlı. Kabaca bir rakam için yukarıdaki hesaplayıcıyı kullan. Gerçek teklif kapsam görüşmesinden sonra gelir — sabit fiyat, çalışan taksimetre yok." },
        { q: "BİR PROJE NE KADAR SÜRER?", a: "Odaklı bir website: 2–4 hafta. Web veya mobil uygulama: 6–12 hafta. Ağır özel sistemler: başlamadan önce dürüstçe söyleriz, sonra değil." },
        { q: "TAMAMEN ÖZEL BİR ŞEY YAPABİLİR MİSİNİZ?", a: "Bütün mesele bu zaten. Tanımlanabiliyorsa, inşa edilebilir. En iyi işlerimizi tuhaf projelerde çıkarırız." },
        { q: "NASIL BAŞLARIZ?", a: "PROJE BAŞLAT'a bas, aklındakini üç cümleyle anlat, 48 saat içinde somut adımlarla döneriz." },
      ],
    },
    cta: {
      line1: "BİR FİKRİN",
      line2: "Mİ VAR?",
      line3: "HADİ",
      line4: "YAPALIM.",
      button: "PROJE BAŞLAT →",
    },
    footer: {
      location: "İSTANBUL / TÜRKİYE",
      links: ["E-POSTA", "INSTAGRAM"],
      copyright: "© 2026 HERMES SOFTWARE INC.®",
      intent: "NİYETLE İNŞA EDİLDİ.",
    },
    contact: {
      title: "PROJE BAŞLAT",
      sub: "Üç cümle yeter. 48 saat içinde dönüş yaparız.",
      name: "ADINIZ",
      email: "E-POSTANIZ",
      type: "PROJE TÜRÜ",
      typeOptions: ["WEBSİTE", "WEB UYGULAMASI", "MOBİL UYGULAMA", "ÖZEL YAZILIM", "DİĞER"],
      message: "NE İNŞA EDİYORUZ?",
      estimateNote: "TAHMİN EKLENDİ:",
      captchaLabel: "İNSAN OLDUĞUNU KANITLA",
      captchaPlaceholder: "CEVAP",
      captchaRefresh: "YENİ SORU",
      captchaLoading: "YÜKLENİYOR...",
      captchaError: "YANLIŞ CEVAP. YENİ SORUYU DENE.",
      submit: "GÖNDER →",
      sending: "GÖNDERİLİYOR...",
      success: "ALDIK. 48 SAAT İÇİNDE DÖNECEĞİZ.",
      error: "BİR ŞEYLER TERS GİTTİ. TEKRAR DENE.",
    },
  },
};

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t: STR[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
