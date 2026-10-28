/**
 * THE BLUEPRINT — Home surface
 * Warm drafting-paper background, hard black geometry, Signal Yellow only for interaction,
 * and conspicuous negative space are non-negotiable in this page.
 */
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { clientSignalsByLocale, signalLabels } from "@/lib/clientSignals";
import { useSmoothDrafting } from "@/hooks/useSmoothDrafting";

gsap.registerPlugin(ScrollTrigger);

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
  ecosystemLine?: string;
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
  projectDescriptions: [string, string, string, string, string, string];
};

const copy: Record<Locale, Copy> = {
  en: {
    language: "LANGUAGE",
    navProjects: "Projects",
    navOutput: "Output",
    eyebrow: "INDEPENDENT SOFTWARE ARCHITECT · HERMES SOFTWARE",
    tagline: "Software engineer, founder, and product builder.",
    heroStatement: "I design products, make architectural decisions, and turn complex operational ideas into working software across the Hermes ecosystem.",
    ecosystemLine: "HERMES SOFTWARE · CONSTRUCTION · LEGAL · THEMIS AI · MERIDIAN CORP.",
    openBlueprint: "Open the project blueprint",
    terminalKicker: "02 / SYSTEM MANIFESTO",
    terminalTitle: "The Terminal",
    manifesto: "The product is the system: its decisions, constraints, interfaces, and operating rhythm.",
    terminalFootnote: "All signals nominal. Creative constraints enabled.",
    scaleKicker: "03 / SCALE REPORT",
    scaleLabel: "Hermes Software / connected product work",
    scaleFootnote: "A directional marker for a growing product practice, not a claim about revenue or usage.",
    projectsKicker: "04 / SELECTED SYSTEMS",
    projectsTitle: "Blueprint archive",
    projectIntro: "A working archive of interfaces, AI experiments, desktop systems, and product infrastructure.",
    outputKicker: "05 / OUTPUT CHANNEL",
    outputTitle: "Build a signal.",
    outputIntro: "For a product system, an architectural question, or the next difficult interface — send a line.",
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
      "Developer Boilerplate",
      "Personal AI Agent",
    ],
  },
  tr: {
    language: "DİL",
    navProjects: "Projeler",
    navOutput: "İletişim",
    eyebrow: "BAĞIMSIZ YAZILIM MİMARI · HERMES SOFTWARE",
    tagline: "Yazılım mühendisi, kurucu ve ürün geliştirici.",
    heroStatement: "Ürün tasarlıyor, mimari kararlar alıyor ve karmaşık operasyonel fikirleri Hermes ekosisteminde çalışan yazılımlara dönüştürüyorum.",
    ecosystemLine: "HERMES SOFTWARE · CONSTRUCTION · LEGAL · THEMIS AI · MERIDIAN CORP.",
    openBlueprint: "Proje planını aç",
    terminalKicker: "02 / SİSTEM MANİFESTOSU",
    terminalTitle: "Terminal",
    manifesto: "Ürün; kararları, kısıtları, arayüzleri ve çalışma ritmiyle birlikte bir sistemdir.",
    terminalFootnote: "Tüm sinyaller nominal. Yaratıcı kısıtlar etkin.",
    scaleKicker: "03 / ÖLÇEK RAPORU",
    scaleLabel: "Hermes Software / bağlı ürün çalışmaları",
    scaleFootnote: "Gelir veya kullanım iddiası değil, büyüyen ürün pratiğinin yön işareti.",
    projectsKicker: "04 / SEÇİLMİŞ SİSTEMLER",
    projectsTitle: "Plan arşivi",
    projectIntro: "Arayüzleri, yapay zekâ deneylerini, masaüstü sistemlerini ve ürün altyapısını bir araya getiren çalışma arşivi.",
    outputKicker: "05 / ÇIKIŞ KANALI",
    outputTitle: "Bir sinyal kurun.",
    outputIntro: "Bir ürün sistemi, mimari soru veya bir sonraki zor arayüz için bir satır bırakın.",
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
      "Geliştirici Başlangıç Mimarisi",
      "Kişisel Yapay Zekâ Asistanı",
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
    projectIntro: "Sei sistemi, ciascuno modellato attorno a una domanda operativa.",
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
      "Boilerplate per sviluppatori",
      "Agente AI personale",
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
    projectIntro: "Sechs Systeme, geformt um jeweils eine andere operative Frage.",
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
      "Boilerplate für Entwickler",
      "Persönlicher KI-Agent",
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
    projectIntro: "Six systèmes, chacun façonné autour d'une question opérationnelle.",
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
      "Boilerplate développeur",
      "Agent IA personnel",
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
    projectIntro: "Zes systemen, elk gevormd rond een andere operationele vraag.",
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
      "Boilerplate voor ontwikkelaars",
      "Persoonlijke AI-agent",
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
    projectIntro: "Шесть систем, каждая построена вокруг своего операционного вопроса.",
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
      "Шаблон для разработчиков",
      "Персональный ИИ-агент",
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
  {
    number: "05",
    name: "NEXO",
    url: "https://github.com/yagizberkonay/NEXO",
    tags: ["Next.js", "TypeScript", "Supabase", "Developer Boilerplate"],
    tint: "yellow",
  },
  {
    number: "06",
    name: "NYX",
    url: "https://github.com/yagizberkonay/NYX",
    tags: ["Personal AI Agent"],
    tint: "blue",
  },
] as const;

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
      data-route={`ROUTE / ${project.number}A`}
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
      <span className="project-card__coordinates" aria-hidden="true">ORIGIN / HERMES&nbsp;&nbsp;→&nbsp;&nbsp;NODE / {project.number}A</span>
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
  sourceLabel,
}: {
  column: readonly string[];
  index: number;
  sourceLabel: string;
}) {
  const reduceMotion = useReducedMotion();
  const repeatedColumn = [...column, ...column, ...column];
  const motionRange = index === 1 ? ["-33.333333%", "0%"] : ["0%", "-33.333333%"];
  const duration = [7.2, 8.6, 7.8][index];

  return (
    <div className={`signal-column signal-column--${index + 1}`}>
      <motion.div
        className="signal-loop"
        animate={reduceMotion ? { y: 0 } : { y: motionRange }}
        transition={reduceMotion ? { duration: 0 } : { duration, ease: "linear", repeat: Infinity }}
      >
        {repeatedColumn.map((quote, quoteIndex) => {
          const copyIndex = Math.floor(quoteIndex / column.length);
          const itemIndex = quoteIndex % column.length;
          return (
            <article
              className={`signal-card ${itemIndex === 0 ? "signal-card--lead" : ""} ${itemIndex === column.length - 1 ? "signal-card--edge" : ""}`}
              key={`${quote}-${quoteIndex}`}
              aria-hidden={copyIndex > 0}
            >
              <span className="signal-card__index">SIGNAL / {index + 1}.{String(itemIndex + 1).padStart(2, "0")}</span>
              <span className="signal-card__route" aria-hidden="true">FIELD / {String(index + 1).padStart(2, "0")}-{String(itemIndex + 1).padStart(2, "0")} · VERIFIED</span>
              <blockquote>“{quote}”</blockquote>
              <span className="signal-card__source">{sourceLabel}</span>
            </article>
          );
        })}
      </motion.div>
    </div>
  );
}

function ClientSignals({ locale }: { locale: Locale }) {
  const labels = signalLabels[locale];
  const clientSignals = clientSignalsByLocale[locale];
  const signalColumns = [clientSignals.slice(0, 7), clientSignals.slice(7, 14), clientSignals.slice(14, 20)] as const;

  return (
    <section className="signals-section" aria-labelledby="client-signals-title">
      <div className="signals-register" aria-hidden="true"><span>{labels.register}</span><span>{labels.provenance}</span><span>{labels.grid}</span></div>
      <div className="signals-heading">
        <div>
          <p className="eyebrow">{labels.kicker}</p>
          <h2 id="client-signals-title">{labels.title}</h2>
        </div>
        <p>{labels.intro}</p>
      </div>
      <div className="signals-route" aria-hidden="true">
        <span>ORIGIN / CLIENT FIELD</span>
        <span>ROUTE / 05 · RECORDS / 20</span>
        <span>DEST / BLUEPRINT ARCHIVE</span>
      </div>
      <div className="signals-grid">
        {signalColumns.map((column, index) => <ClientSignalColumn key={index} column={column} index={index} sourceLabel={labels.source} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const text = copy[locale];
  const { rootRef, reduceMotion } = useSmoothDrafting();

  useGSAP(
    () => {
      if (reduceMotion) return;

      gsap.fromTo(
        ".scroll-trace",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom bottom", scrub: true },
        },
      );

      const sectionRegistries = gsap.utils.toArray<HTMLElement>(
        ".archive-register, .signals-register, .output-addresses",
      );
      sectionRegistries.forEach((registry) => {
        gsap.fromTo(
          registry,
          { autoAlpha: 0, scaleX: 0.72, transformOrigin: "left center" },
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.64,
            ease: "power3.out",
            scrollTrigger: { trigger: registry, start: "top 88%", once: true },
          },
        );
      });

      gsap.fromTo(
        ".terminal-logs p",
        { autoAlpha: 0, x: -16 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.34,
          stagger: { each: 0.055, from: "start" },
          ease: "power3.out",
          scrollTrigger: { trigger: ".terminal-cell", start: "top 78%", once: true },
        },
      );

      gsap.fromTo(
        ".scale-bars span",
        { scaleY: 0, transformOrigin: "center bottom" },
        {
          scaleY: 1,
          duration: 0.56,
          stagger: 0.07,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".scale-cell", start: "top 82%", once: true },
        },
      );

      gsap.fromTo(
        ".visual-cell__plan strong",
        { autoAlpha: 0, x: -22 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.42,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".visual-cell", start: "top 84%", once: true },
        },
      );

      const desktopMotion = gsap.matchMedia();
      desktopMotion.add("(min-width: 721px)", () => {
        gsap.to(".output-art", {
          xPercent: 8,
          rotate: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".output-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      return () => desktopMotion.revert();
    },
    { scope: rootRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = "Yağız Berk Önay — Hermes Software";
  }, [locale]);

  return (
    <main className="blueprint-shell" ref={rootRef}>
      <div className="scroll-trace" aria-hidden="true" />
      <div className="drafting-grid" aria-hidden="true" />
      <header className="site-header" aria-label="Hermes Software">
        <a href="#top" className="brand-lockup" aria-label="Hermes Software, page top">
          <span className="brand-mark brand-mark--vector" aria-hidden="true" />
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
          {text.ecosystemLine && <p className="hero-ecosystem">{text.ecosystemLine}</p>}
          <p className="hero-statement">{text.heroStatement}</p>
          <a href="#projects" className="outline-link">
            <span>{text.openBlueprint}</span>
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>
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
          <div className="terminal-logs" aria-label="Senior technology stack status">
            <p className="terminal-log__command"><span>$</span> stack --probe --senior <em>RUNNING</em></p>
            <p><span>&gt;</span> TypeScript / type-surface <b>OK</b></p>
            <p><span>&gt;</span> Rust / systems-core <b>OK</b></p>
            <p><span>&gt;</span> JavaScript / runtime-layer <b>OK</b></p>
            <p><span>&gt;</span> Python / automation-layer <b>OK</b></p>
            <p><span>&gt;</span> Next.js / application-runtime <b>OK</b></p>
            <p><span>&gt;</span> Tailwind CSS / interface-system <b>OK</b></p>
            <p><span>&gt;</span> Tauri / desktop-shell <b>OK</b></p>
            <p><span>&gt;</span> Node.js / service-runtime <b>OK</b></p>
            <p><span>&gt;</span> React / component-runtime <b>OK</b></p>
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
        </div>
      </section>

      <ClientSignals locale={locale} />

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
        <div className="output-art" aria-hidden="true"><span /><span /><span /><span /></div>
      </motion.section>

      <footer className="site-footer">
        <span>HERMES SOFTWARE © {new Date().getFullYear()}</span>
        <span>YAĞIZ BERK ÖNAY / SOFTWARE ARCHITECT</span>
        <span>BUILT AS A BLUEPRINT</span>
      </footer>
    </main>
  );
}
