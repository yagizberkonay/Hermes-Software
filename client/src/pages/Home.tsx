/**
 * THE BLUEPRINT — Home surface
 * Warm drafting-paper background, hard black geometry, Signal Yellow only for interaction,
 * and conspicuous negative space are non-negotiable in this page.
 */
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  TerminalSquare,
} from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "en" | "tr" | "it" | "de" | "fr" | "nl" | "ru";

const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  it: "Italiano",
  de: "Deutsch",
  fr: "Français",
  nl: "Nederlands",
  ru: "Русский",
};

type Copy = {
  language: string;
  navProjects: string;
  navOutput: string;
  eyebrow: string;
  tagline: string;
  heroStatement: string;
  openBlueprint: string;
  terminalKicker: string;
  terminalTitle: string;
  manifesto: string;
  terminalFootnote: string;
  scaleKicker: string;
  scaleLabel: string;
  scaleFootnote: string;
  projectsKicker: string;
  projectsTitle: string;
  projectIntro: string;
  outputKicker: string;
  outputTitle: string;
  outputIntro: string;
  instagram: string;
  whatsapp: string;
  github: string;
  email: string;
  systemReady: string;
  projectDescriptions: [string, string, string, string];
};

const copy: Record<Locale, Copy> = {
  en: {
    language: "LANGUAGE",
    navProjects: "Projects",
    navOutput: "Output",
    eyebrow: "INDEPENDENT SOFTWARE ARCHITECT · HERMES SOFTWARE",
    tagline: "Software Architect. Engineering Digital Ecosystems.",
    heroStatement: "A precise practice for local-first tools, AI systems and interfaces with structural intent.",
    openBlueprint: "Open the project blueprint",
    terminalKicker: "02 / SYSTEM MANIFESTO",
    terminalTitle: "The Terminal",
    manifesto: "Code is not just a tool; it is the architecture of thought.",
    terminalFootnote: "All signals nominal. Creative constraints enabled.",
    scaleKicker: "03 / SCALE REPORT",
    scaleLabel: "Hermes Software Active Ecosystems",
    scaleFootnote: "A counter used as a declaration of direction, not telemetry.",
    projectsKicker: "04 / SELECTED SYSTEMS",
    projectsTitle: "Blueprint archive",
    projectIntro: "Four systems, each shaped around a different operational question.",
    outputKicker: "05 / OUTPUT CHANNEL",
    outputTitle: "Build a signal.",
    outputIntro: "For architecture, experimentation, or the next difficult interface — send a line.",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    github: "GitHub",
    email: "Email",
    systemReady: "SYSTEM / READY",
    projectDescriptions: [
      "Desktop Client Architecture",
      "AI Data Compression",
      "Virtual Try-On Engine",
      "Algorithmic Experimentation",
    ],
  },
  tr: {
    language: "DİL",
    navProjects: "Projeler",
    navOutput: "İletişim",
    eyebrow: "BAĞIMSIZ YAZILIM MİMARI · HERMES SOFTWARE",
    tagline: "Yazılım Mimarı. Dijital Ekosistemleri Tasarlıyor.",
    heroStatement: "Yerel-öncelikli araçlar, yapay zekâ sistemleri ve yapısal amacı olan arayüzler için hassas bir pratik.",
    openBlueprint: "Proje planını aç",
    terminalKicker: "02 / SİSTEM MANİFESTOSU",
    terminalTitle: "Terminal",
    manifesto: "Kod yalnızca bir araç değildir; düşüncenin mimarisidir.",
    terminalFootnote: "Tüm sinyaller nominal. Yaratıcı kısıtlar etkin.",
    scaleKicker: "03 / ÖLÇEK RAPORU",
    scaleLabel: "Hermes Software Aktif Ekosistemleri",
    scaleFootnote: "Telemetri değil, yönü tanımlayan bir sayaç.",
    projectsKicker: "04 / SEÇİLMİŞ SİSTEMLER",
    projectsTitle: "Plan arşivi",
    projectIntro: "Her biri farklı bir operasyonel soruya göre şekillenen dört sistem.",
    outputKicker: "05 / ÇIKIŞ KANALI",
    outputTitle: "Bir sinyal kurun.",
    outputIntro: "Mimari, deney veya bir sonraki zor arayüz için bir satır bırakın.",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    github: "GitHub",
    email: "E-posta",
    systemReady: "SİSTEM / HAZIR",
    projectDescriptions: [
      "Masaüstü İstemci Mimarisi",
      "Yapay Zekâ Veri Sıkıştırma",
      "Sanal Deneme Motoru",
      "Algoritmik Deneyler",
    ],
  },
  it: {
    language: "LINGUA",
    navProjects: "Progetti",
    navOutput: "Contatto",
    eyebrow: "SOFTWARE ARCHITECT INDIPENDENTE · HERMES SOFTWARE",
    tagline: "Software Architect. Progetto ecosistemi digitali.",
    heroStatement: "Una pratica precisa per strumenti local-first, sistemi AI e interfacce con un intento strutturale.",
    openBlueprint: "Apri il blueprint del progetto",
    terminalKicker: "02 / MANIFESTO DEL SISTEMA",
    terminalTitle: "Il Terminale",
    manifesto: "Il codice non è solo uno strumento; è l'architettura del pensiero.",
    terminalFootnote: "Tutti i segnali nominali. Vincoli creativi abilitati.",
    scaleKicker: "03 / RAPPORTO DI SCALA",
    scaleLabel: "Ecosistemi attivi di Hermes Software",
    scaleFootnote: "Un contatore di direzione, non telemetria.",
    projectsKicker: "04 / SISTEMI SELEZIONATI",
    projectsTitle: "Archivio blueprint",
    projectIntro: "Quattro sistemi, ciascuno modellato attorno a una domanda operativa.",
    outputKicker: "05 / CANALE DI USCITA",
    outputTitle: "Costruiamo un segnale.",
    outputIntro: "Per architettura, sperimentazione o la prossima interfaccia difficile — scrivi una riga.",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    github: "GitHub",
    email: "E-mail",
    systemReady: "SISTEMA / PRONTO",
    projectDescriptions: [
      "Architettura client desktop",
      "Compressione dati AI",
      "Motore virtual try-on",
      "Sperimentazione algoritmica",
    ],
  },
  de: {
    language: "SPRACHE",
    navProjects: "Projekte",
    navOutput: "Kontakt",
    eyebrow: "UNABHÄNGIGER SOFTWARE ARCHITECT · HERMES SOFTWARE",
    tagline: "Software Architect. Digitale Ökosysteme entwickeln.",
    heroStatement: "Eine präzise Praxis für lokale Werkzeuge, KI-Systeme und Interfaces mit struktureller Absicht.",
    openBlueprint: "Projekt-Blueprint öffnen",
    terminalKicker: "02 / SYSTEMMANIFEST",
    terminalTitle: "Das Terminal",
    manifesto: "Code ist nicht nur ein Werkzeug; er ist die Architektur des Denkens.",
    terminalFootnote: "Alle Signale nominal. Kreative Einschränkungen aktiv.",
    scaleKicker: "03 / SKALENBERICHT",
    scaleLabel: "Aktive Hermes Software Ökosysteme",
    scaleFootnote: "Ein Zähler als Richtungsansage, nicht als Telemetrie.",
    projectsKicker: "04 / AUSGEWÄHLTE SYSTEME",
    projectsTitle: "Blueprint-Archiv",
    projectIntro: "Vier Systeme, geformt um jeweils eine andere operative Frage.",
    outputKicker: "05 / AUSGABE-KANAL",
    outputTitle: "Ein Signal bauen.",
    outputIntro: "Für Architektur, Experimente oder das nächste schwierige Interface — schreib eine Zeile.",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    github: "GitHub",
    email: "E-Mail",
    systemReady: "SYSTEM / BEREIT",
    projectDescriptions: [
      "Desktop-Client-Architektur",
      "KI-Datenkompression",
      "Virtuelle Anprobe-Engine",
      "Algorithmische Experimente",
    ],
  },
  fr: {
    language: "LANGUE",
    navProjects: "Projets",
    navOutput: "Contact",
    eyebrow: "SOFTWARE ARCHITECT INDÉPENDANT · HERMES SOFTWARE",
    tagline: "Software Architect. Ingénierie des écosystèmes numériques.",
    heroStatement: "Une pratique précise pour les outils local-first, les systèmes IA et les interfaces à intention structurelle.",
    openBlueprint: "Ouvrir le blueprint du projet",
    terminalKicker: "02 / MANIFESTE SYSTÈME",
    terminalTitle: "Le Terminal",
    manifesto: "Le code n'est pas seulement un outil ; c'est l'architecture de la pensée.",
    terminalFootnote: "Tous les signaux sont nominaux. Contraintes créatives activées.",
    scaleKicker: "03 / RAPPORT D'ÉCHELLE",
    scaleLabel: "Écosystèmes Hermes Software actifs",
    scaleFootnote: "Un compteur de direction, pas de télémétrie.",
    projectsKicker: "04 / SYSTÈMES SÉLECTIONNÉS",
    projectsTitle: "Archive blueprint",
    projectIntro: "Quatre systèmes, chacun façonné autour d'une question opérationnelle.",
    outputKicker: "05 / CANAL DE SORTIE",
    outputTitle: "Construisons un signal.",
    outputIntro: "Pour l'architecture, l'expérimentation ou la prochaine interface difficile — laissez un mot.",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    github: "GitHub",
    email: "E-mail",
    systemReady: "SYSTÈME / PRÊT",
    projectDescriptions: [
      "Architecture client desktop",
      "Compression de données IA",
      "Moteur d'essayage virtuel",
      "Expérimentation algorithmique",
    ],
  },
  nl: {
    language: "TAAL",
    navProjects: "Projecten",
    navOutput: "Contact",
    eyebrow: "ONAFHANKELIJK SOFTWARE ARCHITECT · HERMES SOFTWARE",
    tagline: "Software Architect. Digitale ecosystemen ontwikkelen.",
    heroStatement: "Een precieze praktijk voor local-first tools, AI-systemen en interfaces met structurele intentie.",
    openBlueprint: "Open de projectblueprint",
    terminalKicker: "02 / SYSTEEMMANIFEST",
    terminalTitle: "De Terminal",
    manifesto: "Code is niet alleen een hulpmiddel; het is de architectuur van het denken.",
    terminalFootnote: "Alle signalen nominaal. Creatieve beperkingen actief.",
    scaleKicker: "03 / SCHAALRAPPORT",
    scaleLabel: "Actieve Hermes Software-ecosystemen",
    scaleFootnote: "Een teller als richtingsverklaring, geen telemetrie.",
    projectsKicker: "04 / GESELECTEERDE SYSTEMEN",
    projectsTitle: "Blueprint-archief",
    projectIntro: "Vier systemen, elk gevormd rond een andere operationele vraag.",
    outputKicker: "05 / UITVOERKANAAL",
    outputTitle: "Bouw een signaal.",
    outputIntro: "Voor architectuur, experimentatie of de volgende lastige interface — stuur een regel.",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    github: "GitHub",
    email: "E-mail",
    systemReady: "SYSTEEM / KLAAR",
    projectDescriptions: [
      "Desktopclientarchitectuur",
      "AI-datacompressie",
      "Virtuele pas-engine",
      "Algoritmische experimenten",
    ],
  },
  ru: {
    language: "ЯЗЫК",
    navProjects: "Проекты",
    navOutput: "Контакты",
    eyebrow: "НЕЗАВИСИМЫЙ SOFTWARE ARCHITECT · HERMES SOFTWARE",
    tagline: "Software Architect. Создаю цифровые экосистемы.",
    heroStatement: "Точная практика для local-first инструментов, ИИ-систем и интерфейсов со структурным замыслом.",
    openBlueprint: "Открыть схему проекта",
    terminalKicker: "02 / МАНИФЕСТ СИСТЕМЫ",
    terminalTitle: "Терминал",
    manifesto: "Код — не просто инструмент; это архитектура мышления.",
    terminalFootnote: "Все сигналы номинальны. Творческие ограничения включены.",
    scaleKicker: "03 / ОТЧЁТ О МАСШТАБЕ",
    scaleLabel: "Активные экосистемы Hermes Software",
    scaleFootnote: "Счётчик направления, а не телеметрия.",
    projectsKicker: "04 / ИЗБРАННЫЕ СИСТЕМЫ",
    projectsTitle: "Архив схем",
    projectIntro: "Четыре системы, каждая построена вокруг своего операционного вопроса.",
    outputKicker: "05 / КАНАЛ ВЫВОДА",
    outputTitle: "Создадим сигнал.",
    outputIntro: "Для архитектуры, эксперимента или следующего сложного интерфейса — напишите строку.",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    github: "GitHub",
    email: "Эл. почта",
    systemReady: "СИСТЕМА / ГОТОВА",
    projectDescriptions: [
      "Архитектура desktop-клиента",
      "ИИ-сжатие данных",
      "Движок виртуальной примерки",
      "Алгоритмические эксперименты",
    ],
  },
};

const projects = [
  {
    number: "01",
    name: "ONYX",
    url: "https://github.com/yagizberkonay/ONYX",
    tags: ["Tauri v2", "Next.js", "TypeScript", "Rust"],
    tint: "yellow",
  },
  {
    number: "02",
    name: "Prompt Shrink",
    url: "https://github.com/yagizberkonay/Prompt-Shrink",
    tags: ["Fastify", "TypeScript", "LLM Gateway", "OpenAI / Anthropic"],
    tint: "blue",
  },
  {
    number: "03",
    name: "Hermes VTON",
    url: "https://github.com/yagizberkonay/VTON",
    tags: ["Next.js", "Supabase", "VTON Pipeline", "Tailwind CSS"],
    tint: "green",
  },
  {
    number: "04",
    name: "AIE Lab",
    url: "https://github.com/yagizberkonay/AIE-Lab",
    tags: ["Tauri 2", "React", "Rust", "SQLite"],
    tint: "pink",
  },
] as const;

const clientSignals = [
  "İlk başta tasarım tarafında ne istediğimi ben de tam bilmiyordum. Birkaç örnek üzerinden ilerleyince neyin eksik olduğunu hızlıca çıkardı.",
  "Teslimden sonra iki küçük değişiklik istedim, ikisini de mevcut yapıyı bozmadan halletti. Özellikle bu kısmı beğendim.",
  "Benim için önemli olan sitenin güzel görünmesinden çok sonradan bir şey değiştirebiliyor olmaktı. Yönetim tarafını buna göre kurmuş.",
  "Toplantılarda teknik detaylara fazla girmeden neyin neden yapıldığını anlatması işimizi kolaylaştırdı.",
  "Mobil versiyonda ilk gönderdiği tasarımda birkaç problem vardı. Söylediğimde savunmaya geçmek yerine direkt düzeltti.",
  "Projeyi sadece verilen brief’e göre yapmadı; bazı noktalarda bizim istediğimiz şeyin aslında gereksiz olduğunu söyledi. İyi ki söylemiş.",
  "Daha önce iki farklı yazılımcıyla çalıştığımız için beklentimiz çok yüksek değildi açıkçası. Burada süreç daha düzenli ilerledi.",
  "Kod tarafını görmedim ama son kullanıcı açısından önceki sisteme göre bariz şekilde daha hızlı ve anlaşılır.",
  "Başta küçük bir proje olarak başladık, sonradan birkaç özelliği daha ekledik. Yapının buna izin vermesi işimizi kolaylaştırdı.",
  "Her şeyi tek seferde doğru yapmadı ama önemli olan sorun çıktığında kaybolmamasıydı. İletişim tarafında problem yaşamadık.",
  "Tasarım konusunda birkaç farklı alternatif sundu. Hepsini yapıp geçmek yerine hangisinin neden daha mantıklı olduğunu anlattı.",
  "Bizim ekip teknik değil, o yüzden teknik kararları bize yıkmaması önemliydi. Gereken yerlerde seçenekleri kendisi daralttı.",
  "Teslim tarihine çok yakın bir değişiklik yaptık. Beklediğimden daha az sorun çıktı.",
  "Siteyi teslim aldıktan sonra içerik güncellemek için tekrar tekrar geliştiriciye ihtiyaç duymuyoruz. Asıl işimize yarayan tarafı bu oldu.",
  "İlk görüşmede anlattığımız şeyle ortaya çıkan ürün arasında bayağı fark var ama iyi anlamda. İhtiyacı daha doğru yorumladı.",
  "En sevdiğim tarafı her şeye ‘olur’ dememesi. Bazı istediğimiz şeylerin kullanıcı açısından kötü olacağını direkt söyledi.",
  "Proje boyunca iletişim kısa ve netti. Gereksiz toplantılar veya saatlerce süren mesajlaşmalar olmadı.",
  "Teslimden sonra fark ettiğimiz birkaç edge case vardı. Bunları da çözüp kapattı, sonrasında tekrar aynı sorunları yaşamadık.",
  "Daha önce hazır template üzerinden ilerlemiştik. Bu projede markaya özel bir şey yaptığımız hissi çok daha belirgin.",
  "Sonuç beklediğimizden iyi oldu demek biraz klişe kalıyor ama özellikle performans ve mobil kullanım tarafında farkı gerçekten hissediyoruz.",
] as const;

const signalColumns = [clientSignals.slice(0, 7), clientSignals.slice(7, 14), clientSignals.slice(14, 20)] as const;

function EcosystemCounter() {
  const [count, setCount] = useState(0);
  const countMotion = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setCount(2564);
      return;
    }

    const controls = animate(countMotion, 2564, {
      duration: 2.25,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    });

    return () => controls.stop();
  }, [countMotion, reduceMotion]);

  return <span aria-live="polite">{count.toString().padStart(4, "0")}</span>;
}

function ProjectCard({
  project,
  description,
  openBlueprint,
  position,
}: {
  project: (typeof projects)[number];
  description: string;
  openBlueprint: string;
  position: number;
}) {
  return (
    <motion.a
      className={`project-card project-card--${project.tint} project-card--${position + 1}`}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.32, delay: position * 0.05, ease: [0.23, 1, 0.32, 1] }}
      aria-label={`${project.name}: ${openBlueprint}`}
    >
      <span className="project-card__topline">
        <span>{project.number} / SYSTEM</span>
        <ArrowUpRight size={20} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="project-card__name">{project.name}</span>
      <span className="project-card__description">{description}</span>
      <span className="project-card__bottomline">
        <span className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
        <span className="project-card__arrow" aria-hidden="true">
          →
        </span>
      </span>
    </motion.a>
  );
}

function ClientSignalColumn({
  column,
  index,
}: {
  column: readonly string[];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const motionRange = index === 1 ? [0, 28, 0] : index === 2 ? [0, -22, 0] : [0, -34, 0];
  const duration = [15, 19, 17][index];

  return (
    <motion.div
      className={`signal-column signal-column--${index + 1}`}
      animate={reduceMotion ? { y: 0 } : { y: motionRange }}
      transition={reduceMotion ? { duration: 0 } : { duration, ease: "easeInOut", repeat: Infinity }}
    >
      {column.map((quote, quoteIndex) => (
        <motion.article
          className="signal-card"
          key={quote}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.28, delay: quoteIndex * 0.035, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="signal-card__index">SIGNAL / {index + 1}.{String(quoteIndex + 1).padStart(2, "0")}</span>
          <blockquote>“{quote}”</blockquote>
          <span className="signal-card__source">SOURCE / CLIENT NOTE</span>
        </motion.article>
      ))}
    </motion.div>
  );
}

function ClientSignals() {
  return (
    <section className="signals-section" aria-labelledby="client-signals-title">
      <div className="signals-register" aria-hidden="true"><span>05 / CLIENT SIGNALS</span><span>FIELD NOTES / SOURCE-PROVIDED</span><span>GRID 03</span></div>
      <div className="signals-heading">
        <div>
          <p className="eyebrow">05 / WORKING RECORD</p>
          <h2 id="client-signals-title">Client signals</h2>
        </div>
        <p>Observed notes from completed engagements. Each column moves on its own cadence.</p>
      </div>
      <div className="signals-grid">
        {signalColumns.map((column, index) => <ClientSignalColumn key={index} column={column} index={index} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const text = copy[locale];
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const gridShift = useTransform(scrollYProgress, [0, 1], [0, -88]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = "Yağız Berk Önay — Hermes Software";
  }, [locale]);

  return (
    <main className="blueprint-shell">
      <motion.div className="scroll-trace" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <motion.div className="drafting-grid" style={{ y: reduceMotion ? 0 : gridShift }} aria-hidden="true" />
      <header className="site-header" aria-label="Hermes Software">
        <a href="#top" className="brand-lockup" aria-label="Hermes Software, page top">
          <img src="/manus-storage/hermes-mark_56a06bf6.png" alt="" className="brand-mark" />
          <span className="brand-words">
            <strong>HERMES</strong>
            <small>SOFTWARE / 01</small>
          </span>
        </a>
        <nav className="header-nav" aria-label="Page sections">
          <a href="#projects">{text.navProjects}</a>
          <a href="#output">{text.navOutput}</a>
        </nav>
        <label className="language-cell">
          <span>{text.language}</span>
          <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
            {Object.entries(localeNames).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section id="top" className="blueprint-grid" aria-label="Portfolio overview">
        <motion.article
          className="blueprint-cell core-cell"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="cell-ruler" aria-hidden="true"><span>01</span><span>CORE</span></div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>YAĞIZ<br />BERK<br /><i>ÖNAY</i></h1>
          <p className="hero-tagline">{text.tagline}</p>
          <p className="hero-statement">{text.heroStatement}</p>
          <a href="#projects" className="outline-link">
            <span>{text.openBlueprint}</span>
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>
          <img
            src="/manus-storage/hermes-blueprint-hero_b73d7693.png"
            alt=""
            className="hero-blueprint-art"
          />
        </motion.article>

        <motion.article
          className="blueprint-cell terminal-cell"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.42, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="cell-ruler" aria-hidden="true"><span>02</span><span>TTY</span></div>
          <div className="terminal-heading">
            <span className="terminal-icon"><TerminalSquare size={20} aria-hidden="true" /></span>
            <div>
              <p>{text.terminalKicker}</p>
              <h2>{text.terminalTitle}</h2>
            </div>
          </div>
          <div className="terminal-logs" aria-label="System status">
            <p><span>&gt;</span> Tauri v2 initialized <b>OK</b></p>
            <p><span>&gt;</span> Next.js runtime active <b>OK</b></p>
            <p><span>&gt;</span> Gemini 2.5-flash API handshake <b>OK</b></p>
            <p><span>&gt;</span> hermes://workspace <em>READY_</em></p>
          </div>
          <blockquote>{text.manifesto}</blockquote>
          <p className="terminal-footnote">// {text.terminalFootnote}</p>
        </motion.article>

        <motion.article
          className="blueprint-cell scale-cell"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.42, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="cell-ruler" aria-hidden="true"><span>03</span><span>DATA</span></div>
          <p className="scale-kicker">{text.scaleKicker}</p>
          <p className="scale-count"><EcosystemCounter /></p>
          <div className="scale-meta">
            <span>{text.scaleLabel}</span>
            <strong>{text.systemReady}</strong>
          </div>
          <p className="scale-footnote">{text.scaleFootnote}</p>
          <div className="scale-bars" aria-hidden="true"><span /><span /><span /><span /></div>
        </motion.article>

        <article className="visual-cell blueprint-cell" aria-label="Hermes Software visual blueprint">
          <div className="cell-ruler" aria-hidden="true"><span>V</span><span>FIELD</span></div>
          <div className="visual-cell__plan" aria-hidden="true">
            <span>FIELD / 04</span>
            <strong>01. HUMAN INPUT</strong>
            <strong>02. SYSTEM LOGIC</strong>
            <strong>03. SHIPPED INTERFACE</strong>
            <i>COORD. X-207 / Y-048</i>
          </div>
          <div className="visual-cell__caption"><Braces size={16} aria-hidden="true" /> <span>SOFTWARE / HUMAN / SYSTEM</span></div>
        </article>
      </section>

      <section id="projects" className="projects-section">
        <div className="archive-register" aria-hidden="true"><span>04 / ARCHIVE</span><span>X:026 · Y:001</span><span>SCALE 1:1</span></div>
        <div className="section-title-row">
          <div>
            <p className="eyebrow">{text.projectsKicker}</p>
            <h2>{text.projectsTitle}</h2>
          </div>
          <p>{text.projectIntro}</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              description={text.projectDescriptions[index]}
              openBlueprint={text.openBlueprint}
              position={index}
            />
          ))}
          <div className="project-schematic" aria-hidden="true">
            <img src="/manus-storage/hermes-projects-schematic_9a8d3d6a.png" alt="" />
          </div>
        </div>
      </section>

      <ClientSignals />

      <motion.section
        id="output"
        className="output-section blueprint-cell"
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="cell-ruler" aria-hidden="true"><span>05</span><span>OUT</span></div>
        <div className="output-copy">
          <p className="eyebrow">{text.outputKicker}</p>
          <h2>{text.outputTitle}</h2>
          <p>{text.outputIntro}</p>
        </div>
        <div className="contact-links">
          <a href="https://instagram.com/yagizjs_" target="_blank" rel="noreferrer"><Instagram size={22} aria-hidden="true" /><span>{text.instagram}</span><ArrowUpRight size={22} aria-hidden="true" /></a>
          <a href="https://wa.me/905442577760" target="_blank" rel="noreferrer"><MessageCircle size={22} aria-hidden="true" /><span>{text.whatsapp}</span><ArrowUpRight size={22} aria-hidden="true" /></a>
          <a href="https://github.com/yagizberkonay" target="_blank" rel="noreferrer"><Github size={22} aria-hidden="true" /><span>{text.github}</span><ArrowUpRight size={22} aria-hidden="true" /></a>
          <a href="mailto:yagizberkonay0@gmail.com"><Mail size={22} aria-hidden="true" /><span>{text.email}</span><ArrowUpRight size={22} aria-hidden="true" /></a>
        </div>
        <div className="output-addresses">
          <a href="mailto:yagizberkonay0@gmail.com">yagizberkonay0@gmail.com</a>
          <a href="mailto:info@yagizberkonay.space">info@yagizberkonay.space</a>
          <span>+90 544 257 77 60</span>
        </div>
        <img src="/manus-storage/hermes-output-signal_d7a6e208.png" alt="" className="output-art" />
      </motion.section>

      <footer className="site-footer">
        <span>HERMES SOFTWARE © {new Date().getFullYear()}</span>
        <span>YAĞIZ BERK ÖNAY / SOFTWARE ARCHITECT</span>
        <span>BUILT AS A BLUEPRINT</span>
      </footer>
    </main>
  );
}
