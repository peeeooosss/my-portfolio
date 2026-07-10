import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  Zap,
  MessageSquare,
  Network,
  Flame,
  Database,
  Server,
  Atom,
  Triangle,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Terminal,
  Trophy,
  Shield,
  ShieldCheck,
  Eye,
  Layers,
  Sparkles,
  GraduationCap,
  Gauge,
  KeyRound,
  Lock,
  Search,
  Bug,
  Cloud,
  SlidersHorizontal,
  Swords,
} from "lucide-react";

/* --------------------------------- tokens ---------------------------------- */

const COLORS = {
  bg: "#0a0a0a",
  surface: "#111114",
  surfaceAlt: "#0d0d10",
  border: "#232328",
  textPrimary: "#f5f5f7",
  textSecondary: "#9a9aa2",
  textTertiary: "#5c5c64",
  blue: "#4f9eff",
  purple: "#a557ff",
  green: "#22c55e",
  gold: "#f5b942",
};

const RARITY_STYLES = {
  Rare: COLORS.blue,
  Epic: COLORS.purple,
  Legendary: COLORS.gold,
};

/* ---------------------------------- data ------------------------------------ */

const SKILL_CATEGORIES = [
  {
    id: "ai",
    title: "AI & LLM Orchestration",
    tier: "Mastered",
    skills: [
      { name: "Llama-3.3-70b", icon: Cpu },
      { name: "Groq API", icon: Zap },
      { name: "Prompt Engineering (RTCF)", icon: MessageSquare },
      { name: "Output Evaluation", icon: Gauge },
      { name: "Computer Vision", icon: Eye },
    ],
  },
  {
    id: "backend",
    title: "Backend & Architecture",
    tier: "Mastered",
    skills: [
      { name: "REST APIs", icon: Network },
      { name: "Hono API", icon: Flame },
      { name: "Drizzle ORM", icon: Database },
      { name: "Neon Serverless Postgres", icon: Cloud },
      { name: "Node.js", icon: Server },
      { name: "Zero Trust Frameworks", icon: ShieldCheck },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Tooling",
    tier: "Advanced",
    skills: [
      { name: "React SPA", icon: Atom },
      { name: "Next.js", icon: Triangle },
      { name: "pnpm Workspaces", icon: Layers },
      { name: "Dynamic Form Rendering", icon: SlidersHorizontal },
    ],
  },
  {
    id: "security",
    title: "Security & Cloud",
    tier: "Advanced",
    skills: [
      { name: "SSO API Gateways", icon: Shield },
      { name: "JWT Middleware", icon: KeyRound },
      { name: "SQL Injection Prevention", icon: Lock },
      { name: "OSINT", icon: Search },
      { name: "Threat Hunting", icon: Eye },
      { name: "Malware Analysis", icon: Bug },
    ],
  },
];

const STATS = [
  { label: "AI Tools Shipped", value: "19", icon: Sparkles, note: "Groq-powered teaching tools" },
  { label: "Codebase Optimized", value: "-44%", icon: Layers, note: "1.1GB → 621MB" },
  { label: "Critical Vulns Resolved", value: "5", icon: ShieldCheck, note: "Zero Trust security audit" },
  { label: "Curriculum Modules Designed", value: "90", icon: GraduationCap, note: "3-month AI Academy program" },
];

const EXPERIENCE = [
  {
    role: "Founding AI Engineer & Tech Lead",
    org: "NITAI GROUP",
    period: "Jul 2026 — Present",
    bullets: [
      "Engineered 19 specialized AI teaching tools powered by the Groq API (Llama-3.3-70b-versatile), with dynamic form rendering and multi-format extraction (PDF, TXT, PPTX).",
      "Migrated the platform from Convex to a scalable REST architecture using React SPA, Hono API, Drizzle ORM, and Neon Serverless Postgres.",
      "Led a root-level pnpm workspace consolidation, cutting project size ~44% (1.1GB → 621MB) and removing 360MB of duplicate dependency trees.",
      "Architected a unified SSO API Gateway with isolated backend micro-engines, resolving 5 critical vulnerabilities and enforcing 100% auth middleware coverage on protected routes.",
    ],
  },
  {
    role: "Cyber Security Analyst & IT Trainer",
    org: "Vault-Tec Security & Bhawani Marketing",
    period: "May 2025 — Jun 2026",
    bullets: [
      "Analyzed large volumes of log data and managed SIEM environments to detect anomalies and threats.",
      "Conducted live OSINT cyber investigations.",
      "Instructed technical teams and students on core computer science and security concepts, including Dark Web architecture.",
    ],
  },
];

const QUESTS = [
  {
    title: "AI Academy Master Curriculum",
    subtitle: '"Learn & Earn"',
    role: "Lead Developer & Technical Writer",
    rarity: "Epic",
    bullets: [
      'Designed a 3-month, 90-module "Zero-Capital AI Startup" curriculum for LLM training and evaluation.',
      "Structured a 4-week thematic breakdown covering RTCF prompting and AI automation.",
      "Architected the hosting LMS platform on a single pnpm-lock.yaml to secure the supply chain.",
    ],
  },
  {
    title: "Federated Ecosystem Architecture",
    subtitle: "Hybrid B2B2C Portal",
    role: "Systems Architect",
    rarity: "Legendary",
    bullets: [
      'Designed a "Split-Gateway" UI/UX strategy separating B2C and B2B audiences to reduce cognitive overload.',
      "Engineered a multi-department Zero Trust framework preventing lateral network movement across the ecosystem.",
    ],
  },
  {
    title: "AI Rehab & Strength Training",
    subtitle: "Pose Detection System",
    role: "Capstone Engineering Lead",
    rarity: "Epic",
    bullets: [
      "Directed a 5-member engineering team building a real-time AI pose detection model.",
      "Delivered corrective feedback across structured 15-day and 30-day rehabilitation courses.",
    ],
  },
];

const PROJECTS = [
  {
    title: "AI Student LMS",
    tag: "EdTech · AI Tooling",
    rarity: "Epic",
    description: "A comprehensive learning management platform integrated with advanced AI tooling.",
    link: "https://aistudentlms.netlify.app/",
  },
  {
    title: "Project Chakna",
    tag: "Food-tech · Delivery",
    rarity: "Rare",
    description: "A fast-food night delivery model and dedicated platform for seamless late-night ordering.",
    link: "https://project-chakna.netlify.app/",
  },
  {
    title: "Apex Drive",
    tag: "Client Project",
    rarity: "Legendary",
    description: "A high-performance digital presence and functional application designed for a private client.",
    link: "https://apexdriveghy.netlify.app/",
  },
];

const EDUCATION = {
  school: "Indian Institute of Technology (IIT), Patna",
  degree: "Bachelor's in Computer Science and Data Analytics",
  period: "Class of 2026",
};

const NAV_LINKS = [
  { label: "about", href: "about" },
  { label: "skills", href: "skills" },
  { label: "experience", href: "experience" },
  { label: "quests", href: "quests" },
  { label: "projects", href: "projects" },
  { label: "contact", href: "contact" },
];

const ACHIEVEMENTS = {
  terminal: "Hacked the Terminal",
  about: "Learned the Backstory",
  skills: "Studied the Skill Tree",
  experience: "Explored the Timeline",
  quests: "Completed a Side Quest",
  projects: "Raided the Project Vault",
  education: "Found the Origin Story",
  contact: "Reached the Final Boss",
};
const TOTAL_ACHIEVEMENTS = Object.keys(ACHIEVEMENTS).length + 1; // +1 for konami

const TERMINAL_HELP = [
  "available commands:",
  "  help            show this list",
  "  whoami          who is piyush?",
  "  about           read the profile summary",
  "  skills          list skill categories",
  "  experience      list work history",
  "  quests          list freelance highlights",
  "  projects        list live projects",
  "  education       show education",
  "  contact         get contact info",
  "  cd <section>    jump to a section",
  "  sudo hire-me    you know what to do",
  "  clear           clear the terminal",
];

/* ------------------------------- utilities ---------------------------------- */

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const handler = (e) => setFine(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);
  return fine;
}

/* ------------------------------ small pieces --------------------------------- */

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3" style={{ color: COLORS.blue, fontFamily: "'JetBrains Mono', monospace" }}>
      <Terminal size={14} />
      <span className="text-sm">{text}</span>
      <span style={{ flex: 1, height: 1, background: COLORS.border }} />
    </div>
  );
}

function RevealSection({ id, onEnter, className, children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: "-60px" }}
      onViewportEnter={() => onEnter && onEnter(id)}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}

function RarityTag({ rarity }) {
  const color = RARITY_STYLES[rarity] || COLORS.blue;
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color,
        border: `1px solid ${color}55`,
        background: `${color}14`,
      }}
    >
      <Sparkles size={11} /> {rarity}
    </span>
  );
}

/* ---------------------------------- cursor ------------------------------------ */

function CustomCursor({ isHovering }) {
  const glowX = useMotionValue(-400);
  const glowY = useMotionValue(-400);
  const springX = useSpring(glowX, { damping: 28, stiffness: 180, mass: 0.6 });
  const springY = useSpring(glowY, { damping: 28, stiffness: 180, mass: 0.6 });

  const dotX = useMotionValue(-400);
  const dotY = useMotionValue(-400);
  const dotSpringX = useSpring(dotX, { damping: 35, stiffness: 900, mass: 0.2 });
  const dotSpringY = useSpring(dotY, { damping: 35, stiffness: 900, mass: 0.2 });

  useEffect(() => {
    const move = (e) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [glowX, glowY, dotX, dotY]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 460,
          height: 460,
          marginLeft: -230,
          marginTop: -230,
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 60,
          x: springX,
          y: springY,
          background: `radial-gradient(circle, ${COLORS.blue}33 0%, ${COLORS.purple}22 38%, transparent 70%)`,
          filter: "blur(24px)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: isHovering ? 2.8 : 1, opacity: isHovering ? 0.55 : 0.9 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 61,
          x: dotSpringX,
          y: dotSpringY,
          border: `1.5px solid ${COLORS.blue}`,
          background: isHovering ? `${COLORS.purple}55` : "transparent",
        }}
      />
    </>
  );
}

/* ---------------------------------- avatar ------------------------------------ */

function Avatar({ level }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { damping: 18, stiffness: 120 });
  const sy = useSpring(py, { damping: 18, stiffness: 120 });

  useEffect(() => {
    const move = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 10;
      const ny = (e.clientY / window.innerHeight - 0.5) * 8;
      px.set(nx);
      py.set(ny);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [px, py]);

  return (
    <div style={{ position: "relative", width: 220, height: 220, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: -14,
          borderRadius: "9999px",
          border: `1.5px dashed ${COLORS.blue}66`,
          animation: "spin 18s linear infinite",
        }}
      />
      <svg viewBox="0 0 220 220" width="220" height="220">
        <defs>
          <linearGradient id="visorGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={COLORS.blue} />
            <stop offset="100%" stopColor={COLORS.purple} />
          </linearGradient>
          <radialGradient id="bgGrad" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#1b1b22" />
            <stop offset="100%" stopColor="#0d0d10" />
          </radialGradient>
        </defs>

        <circle cx="110" cy="110" r="104" fill="url(#bgGrad)" stroke={COLORS.border} strokeWidth="1.5" />

        {/* hoodie shoulders */}
        <path d="M 30 205 Q 40 130 110 128 Q 180 130 190 205 Z" fill="#17171c" stroke={COLORS.border} strokeWidth="1.5" />
        {/* hood */}
        <path d="M 55 138 Q 60 90 110 85 Q 160 90 165 138 Q 140 118 110 118 Q 80 118 55 138 Z" fill="#1c1c22" stroke={COLORS.border} strokeWidth="1.5" />

        <motion.g style={{ x: sx, y: sy }}>
          {/* head */}
          <circle cx="110" cy="112" r="46" fill="#1f1f26" stroke={COLORS.border} strokeWidth="1.5" />
          {/* visor glow behind */}
          <rect x="76" y="102" width="68" height="22" rx="11" fill="url(#visorGrad)" opacity="0.35" filter="blur(6px)" />
          {/* visor */}
          <rect x="76" y="102" width="68" height="22" rx="11" fill="url(#visorGrad)" opacity="0.9" />
          {/* scanline */}
          <motion.rect
            x="78"
            width="64"
            height="2"
            rx="1"
            fill="#ffffff"
            opacity="0.6"
            animate={{ y: [103, 121, 103] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* headphones */}
        <path d="M 62 108 A 48 48 0 0 1 158 108" fill="none" stroke={COLORS.border} strokeWidth="4" strokeLinecap="round" />
        <rect x="54" y="100" width="12" height="22" rx="5" fill="#26262e" stroke={COLORS.blue} strokeWidth="1" />
        <rect x="154" y="100" width="12" height="22" rx="5" fill="#26262e" stroke={COLORS.purple} strokeWidth="1" />
      </svg>

      {/* status dot */}
      <span
        style={{
          position: "absolute",
          bottom: 14,
          right: 10,
          width: 16,
          height: 16,
          borderRadius: "9999px",
          background: COLORS.green,
          border: `3px solid ${COLORS.bg}`,
          boxShadow: `0 0 10px ${COLORS.green}aa`,
        }}
      />

      {/* level badge */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          color: "#fff",
          padding: "4px 12px",
          borderRadius: 9999,
          background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
          boxShadow: `0 6px 20px -6px ${COLORS.purple}aa`,
          whiteSpace: "nowrap",
        }}
      >
        LVL {level}
      </div>
    </div>
  );
}

/* --------------------------------- navbar -------------------------------------- */

function Navbar({ scrollTo, menuOpen, setMenuOpen }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(10,10,10,0.72)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            data-cursor-hover
            onClick={() => scrollTo("top")}
            className="flex items-center gap-3"
            style={{ background: "transparent", border: "none" }}
          >
            <span className="flex items-center gap-1.5">
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#ff5f56", display: "inline-block" }} />
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#ffbd2e", display: "inline-block" }} />
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#27c93f", display: "inline-block" }} />
            </span>
            <span className="text-sm hidden sm:inline" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textSecondary }}>
              piyush@bhuyan:~$
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                data-cursor-hover
                onClick={() => scrollTo(link.href)}
                className="text-sm transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textSecondary, background: "transparent", border: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.textPrimary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textSecondary)}
              >
                ./{link.label}
              </button>
            ))}
            <button
              data-cursor-hover
              onClick={() => scrollTo("contact")}
              className="text-sm text-white px-4 py-2 rounded-full"
              style={{ fontFamily: "'JetBrains Mono', monospace", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, border: "none" }}
            >
              hire_me()
            </button>
          </nav>

          <button
            data-cursor-hover
            className="md:hidden"
            style={{ color: COLORS.textPrimary, background: "transparent", border: "none" }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              data-cursor-hover
              onClick={() => scrollTo(link.href)}
              className="text-left text-sm"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textSecondary, background: "transparent", border: "none" }}
            >
              ./{link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- hero --------------------------------------- */

function Hero({ scrollTo, level }) {
  return (
    <section id="top" className="relative max-w-6xl mx-auto px-6 sm:px-8 pt-20 pb-20 sm:pt-28 sm:pb-24">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
        <div className="flex-1 w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm mb-6 flex items-center gap-2"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.blue }}
          >
            <Terminal size={14} /> whoami
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.05, color: COLORS.textPrimary }}
          >
            Piyush Bhuyan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-lg sm:text-2xl font-medium max-w-2xl"
            style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
          >
            Freelance AI Systems Engineer &amp; LLM Evaluator
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 flex items-center gap-2 text-sm"
            style={{ color: COLORS.textSecondary }}
          >
            <MapPin size={15} /> Guwahati, Assam, India
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              data-cursor-hover
              onClick={() => scrollTo("projects")}
              className="text-white text-sm font-medium px-6 py-3 rounded-full inline-flex items-center gap-2"
              style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, border: "none" }}
            >
              View Projects <ArrowRight size={16} />
            </button>
            <button
              data-cursor-hover
              onClick={() => scrollTo("terminal")}
              className="text-sm font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              style={{ color: COLORS.textPrimary, border: `1px solid ${COLORS.border}`, background: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
            >
              <Terminal size={16} /> Open Terminal
            </button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Avatar level={level} />
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- terminal ------------------------------------- */

function TerminalConsole({ scrollTo }) {
  const [history, setHistory] = useState([
    { type: "output", text: "piyush@bhuyan:~$ welcome to the interactive shell." },
    { type: "output", text: "type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const print = (lines) => setHistory((h) => [...h, ...lines.map((text) => ({ type: "output", text }))]);

  const runCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [...h, { type: "input", text: cmd }]);
    const [base, ...rest] = cmd.split(" ");
    const arg = rest.join(" ").trim().toLowerCase();

    switch (base.toLowerCase()) {
      case "help":
        print(TERMINAL_HELP);
        break;
      case "whoami":
        print(["Piyush Bhuyan — Freelance AI Systems Engineer & LLM Evaluator,", "based in Guwahati, Assam, India."]);
        break;
      case "about":
        print([
          "Results-driven AI Engineer and Systems Architect specializing in LLM",
          "orchestration, scalable backend architectures, and advanced data analytics.",
          "Founding AI Engineer & Tech Lead at NITAI GROUP.",
        ]);
        break;
      case "skills":
        print(SKILL_CATEGORIES.map((c) => `  ${c.title} — ${c.tier}`));
        break;
      case "experience":
        print(EXPERIENCE.map((e) => `  ${e.role} @ ${e.org} (${e.period})`));
        break;
      case "quests":
        print(QUESTS.map((q) => `  ${q.title} — ${q.role}`));
        break;
      case "projects":
        print(PROJECTS.map((p) => `  ${p.title} → ${p.link}`));
        break;
      case "education":
        print([`  ${EDUCATION.school}`, `  ${EDUCATION.degree}, ${EDUCATION.period}`]);
        break;
      case "contact":
        print(["  email: piyushbhuyan001@gmail.com", "  location: Guwahati, Assam, India"]);
        break;
      case "sudo":
        if (arg === "hire-me") {
          print(["permission granted.", "opening mail client..."]);
          setTimeout(() => {
            window.location.href = "mailto:piyushbhuyan001@gmail.com?subject=Let's build something";
          }, 700);
        } else {
          print([`sudo: ${arg || "..."}: command not found`]);
        }
        break;
      case "cd": {
        const target = arg.replace(/^\.?\/?/, "").replace(/\/$/, "");
        const valid = ["about", "skills", "experience", "quests", "projects", "education", "contact", "top"];
        if (valid.includes(target)) {
          print([`navigating to ./${target}`]);
          scrollTo(target);
        } else {
          print([`cd: ${arg || "?"}: no such directory`]);
        }
        break;
      }
      case "ls":
        print(["about.md  skills/  experience/  quests/  projects/  education.md  contact.json"]);
        break;
      case "date":
        print([new Date().toDateString()]);
        break;
      case "echo":
        print([rest.join(" ")]);
        break;
      case "clear":
        setHistory([]);
        return;
      case "konami":
        print(["psst... try: ↑ ↑ ↓ ↓ ← → ← → b a"]);
        break;
      default:
        print([`command not found: ${base}. type 'help' for a list of commands.`]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <div
      data-cursor-hover
      style={{ background: "#000000", border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" }}
      onClick={() => document.getElementById("terminal-input")?.focus()}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#ff5f56" }} />
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#ffbd2e" }} />
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#27c93f" }} />
        <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.textTertiary }}>
          piyush@bhuyan: ~
        </span>
      </div>
      <div ref={scrollRef} style={{ height: 260, overflowY: "auto", padding: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.7 }}>
        {history.map((line, i) => (
          <div key={i} style={{ color: line.type === "input" ? COLORS.blue : COLORS.textSecondary, whiteSpace: "pre-wrap" }}>
            {line.type === "input" ? `$ ${line.text}` : line.text}
          </div>
        ))}
        <form onSubmit={onSubmit} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: COLORS.blue }}>$</span>
          <input
            id="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: COLORS.textPrimary, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
            placeholder="type a command... try 'help'"
          />
        </form>
      </div>
    </div>
  );
}

function TerminalSection({ scrollTo, onEnter }) {
  return (
    <RevealSection id="terminal" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-20 scroll-mt-20">
      <SectionLabel text="./run interactive-shell" />
      <p className="mt-4 mb-6 text-sm max-w-2xl" style={{ color: COLORS.textSecondary }}>
        This site has a working shell. Poke around — try <code style={{ color: COLORS.blue }}>whoami</code>,{" "}
        <code style={{ color: COLORS.blue }}>projects</code>, or <code style={{ color: COLORS.blue }}>sudo hire-me</code>.
      </p>
      <TerminalConsole scrollTo={scrollTo} />
    </RevealSection>
  );
}

/* ---------------------------------- about --------------------------------------- */

function About({ onEnter }) {
  return (
    <RevealSection id="about" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="cat about.md" />
      <div className="grid lg:grid-cols-5 gap-10 mt-8 items-start">
        <p className="lg:col-span-3 text-lg sm:text-xl leading-relaxed" style={{ color: COLORS.textSecondary }}>
          I am a results-driven AI Engineer and Systems Architect specializing in LLM
          orchestration, scalable backend architectures, and advanced data analytics.
          Currently, I am the Founding AI Engineer &amp; Tech Lead at NITAI GROUP, where I
          build high-performance architectures and engineer specialized AI teaching tools.
          Proven track record in code evaluation, prompt engineering, and technical writing —
          built for complex freelance AI development, RLHF evaluation, and system architecture work.
        </p>
        <div className="lg:col-span-2">
          <div className="rounded-2xl p-6" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <p className="text-xs mb-3 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary }}>
              currently
            </p>
            <p className="font-medium" style={{ color: COLORS.textPrimary }}>
              Founding AI Engineer &amp; Tech Lead
            </p>
            <p className="text-sm mt-1" style={{ color: COLORS.blue }}>
              NITAI GROUP
            </p>
          </div>
        </div>
      </div>

      {/* stat block */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl p-5" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
              <Icon size={16} style={{ color: COLORS.purple }} />
              <p className="text-2xl sm:text-3xl font-semibold mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
                {stat.value}
              </p>
              <p className="text-xs mt-1" style={{ color: COLORS.textSecondary }}>{stat.label}</p>
              <p className="text-xs mt-2" style={{ color: COLORS.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}>{stat.note}</p>
            </div>
          );
        })}
      </div>
    </RevealSection>
  );
}

/* ---------------------------------- skills --------------------------------------- */

function SkillChip({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg px-3 py-2.5 flex items-center gap-2"
      style={{
        background: COLORS.surfaceAlt,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: hovered ? COLORS.blue : COLORS.border,
        boxShadow: hovered ? `0 8px 22px -12px ${COLORS.blue}66` : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      <Icon size={14} style={{ color: hovered ? COLORS.purple : COLORS.blue, transition: "color 0.25s ease" }} />
      <span className="text-xs" style={{ color: COLORS.textSecondary }}>{skill.name}</span>
    </motion.div>
  );
}

function SkillCategory({ category }) {
  const tierColor = category.tier === "Mastered" ? COLORS.gold : COLORS.blue;
  return (
    <div className="rounded-2xl p-6" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
          {category.title}
        </h3>
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: tierColor, border: `1px solid ${tierColor}55`, background: `${tierColor}14` }}
        >
          {category.tier}
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
}

function Skills({ onEnter }) {
  return (
    <RevealSection id="skills" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="ls ./skills --tree" />
      <div className="grid sm:grid-cols-2 gap-5 mt-8">
        {SKILL_CATEGORIES.map((category) => (
          <SkillCategory key={category.id} category={category} />
        ))}
      </div>
    </RevealSection>
  );
}

/* -------------------------------- experience ---------------------------------- */

function Experience({ onEnter }) {
  return (
    <RevealSection id="experience" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="git log --experience" />
      <div className="mt-8 flex flex-col gap-10">
        {EXPERIENCE.map((job, i) => (
          <div key={job.role} className="flex gap-5">
            <div className="flex flex-col items-center">
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 9999,
                  background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
                  flexShrink: 0,
                  marginTop: 4,
                }}
              />
              {i < EXPERIENCE.length - 1 && <span style={{ width: 1, flex: 1, background: COLORS.border, marginTop: 6 }} />}
            </div>
            <div className="pb-2">
              <p className="text-xs mb-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary }}>
                {job.period}
              </p>
              <h3 className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
                {job.role}
              </h3>
              <p className="text-sm mb-3" style={{ color: COLORS.blue }}>{job.org}</p>
              <ul className="flex flex-col gap-2">
                {job.bullets.map((b, bi) => (
                  <li key={bi} className="text-sm leading-relaxed flex gap-2" style={{ color: COLORS.textSecondary }}>
                    <span style={{ color: COLORS.purple }}>›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

/* ---------------------------------- quests -------------------------------------- */

function QuestCard({ quest, index }) {
  const [hovered, setHovered] = useState(false);
  const color = RARITY_STYLES[quest.rarity];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{
        background: COLORS.surface,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: hovered ? color : COLORS.border,
        boxShadow: hovered ? `0 20px 44px -22px ${color}77` : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      <div className="flex items-center justify-between">
        <Swords size={16} style={{ color }} />
        <RarityTag rarity={quest.rarity} />
      </div>
      <div>
        <h3 className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
          {quest.title}
        </h3>
        <p className="text-xs" style={{ color: COLORS.textTertiary }}>{quest.subtitle}</p>
      </div>
      <p className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.purple }}>{quest.role}</p>
      <ul className="flex flex-col gap-1.5 mt-1">
        {quest.bullets.map((b, i) => (
          <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: COLORS.textSecondary }}>
            <span style={{ color }}>›</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Quests({ onEnter }) {
  return (
    <RevealSection id="quests" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="ls ./quests --side-missions" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {QUESTS.map((quest, i) => (
          <QuestCard key={quest.title} quest={quest} index={i} />
        ))}
      </div>
    </RevealSection>
  );
}

/* --------------------------------- projects -------------------------------------- */

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const color = RARITY_STYLES[project.rarity];
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl p-7 flex flex-col justify-between overflow-hidden"
      style={{
        background: COLORS.surface,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: hovered ? color : COLORS.border,
        boxShadow: hovered ? `0 24px 50px -24px ${color}77` : "none",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        minHeight: 230,
        textDecoration: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(circle at 30% 0%, ${color}22, transparent 60%)`,
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary }}>
            {project.tag}
          </p>
          <RarityTag rarity={project.rarity} />
        </div>
        <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>{project.description}</p>
      </div>
      <div className="relative mt-6 flex items-center gap-2 text-sm font-medium" style={{ color: hovered ? color : COLORS.textSecondary, transition: "color 0.25s ease" }}>
        Visit project
        <ArrowUpRight size={16} style={{ transform: hovered ? "translate(2px,-2px)" : "translate(0,0)", transition: "transform 0.25s ease" }} />
      </div>
    </motion.a>
  );
}

function Projects({ onEnter }) {
  return (
    <RevealSection id="projects" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="ls ./projects -la" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </RevealSection>
  );
}

/* -------------------------------- education --------------------------------------- */

function Education({ onEnter }) {
  return (
    <RevealSection id="education" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-20 scroll-mt-20">
      <SectionLabel text="cat education.md" />
      <div className="mt-8 rounded-2xl p-6 sm:p-8 flex items-center gap-5" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div className="p-3 rounded-xl" style={{ background: `${COLORS.blue}18` }}>
          <GraduationCap size={24} style={{ color: COLORS.blue }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
            {EDUCATION.school}
          </h3>
          <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>{EDUCATION.degree}</p>
          <p className="text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary }}>{EDUCATION.period}</p>
        </div>
      </div>
    </RevealSection>
  );
}

/* --------------------------------- contact ---------------------------------------- */

function Contact({ onEnter }) {
  const [hoveredMail, setHoveredMail] = useState(false);
  return (
    <RevealSection id="contact" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionLabel text="cat contact.json" />
      <div className="mt-8 rounded-2xl p-8 sm:p-12 relative overflow-hidden" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 15%, ${COLORS.purple}22, transparent 55%)` }} />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
            Let&apos;s build something.
          </h2>
          <p className="max-w-xl mb-8" style={{ color: COLORS.textSecondary }}>
            Open to freelance engagements in LLM orchestration, AI tooling, and full-stack systems architecture.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:piyushbhuyan001@gmail.com"
              data-cursor-hover
              onMouseEnter={() => setHoveredMail(true)}
              onMouseLeave={() => setHoveredMail(false)}
              className="text-white text-sm font-medium px-6 py-3 rounded-full inline-flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
                transform: hoveredMail ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hoveredMail ? `0 12px 30px -12px ${COLORS.blue}77` : "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                textDecoration: "none",
              }}
            >
              <Mail size={16} /> piyushbhuyan001@gmail.com
            </a>
            <span className="text-sm inline-flex items-center gap-2" style={{ color: COLORS.textSecondary }}>
              <MapPin size={15} /> Guwahati, Assam, India
            </span>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

function Footer() {
  return (
    <footer
      className="relative max-w-6xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
      style={{ borderTop: `1px solid ${COLORS.border}`, color: COLORS.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}
    >
      <span>© {new Date().getFullYear()} Piyush Bhuyan — all processes terminated gracefully.</span>
      <span>react · tailwind · framer-motion</span>
    </footer>
  );
}

/* ------------------------------- gamification HUD ----------------------------------- */

function XPHud({ level, xp, unlockedCount }) {
  return (
    <div
      className="hidden sm:flex items-center gap-3 rounded-full px-4 py-2.5"
      style={{ position: "fixed", bottom: 20, left: 20, zIndex: 35, background: "rgba(17,17,20,0.85)", border: `1px solid ${COLORS.border}`, backdropFilter: "blur(10px)" }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          color: "#fff",
          background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
        }}
      >
        {level}
      </div>
      <div>
        <div style={{ width: 120, height: 4, borderRadius: 2, background: COLORS.border, overflow: "hidden" }}>
          <div style={{ width: `${xp}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.purple})`, transition: "width 0.2s ease" }} />
        </div>
        <p className="text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary }}>
          LVL {level} · {unlockedCount}/{TOTAL_ACHIEVEMENTS} unlocked
        </p>
      </div>
    </div>
  );
}

function AchievementToast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            left: "auto",
            zIndex: 55,
            background: "rgba(17,17,20,0.92)",
            border: `1px solid ${COLORS.gold}55`,
            boxShadow: `0 10px 40px -12px ${COLORS.gold}55`,
            backdropFilter: "blur(10px)",
            maxWidth: 280,
          }}
        >
          <Trophy size={18} style={{ color: COLORS.gold, flexShrink: 0 }} />
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary }}>
              Achievement Unlocked
            </p>
            <p className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{toast.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function KonamiOverlay({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            background: "rgba(10,10,10,0.55)",
          }}
        >
          <motion.p
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="text-2xl sm:text-4xl font-semibold text-center px-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple}, ${COLORS.gold})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            🎮 Konami Master Unlocked
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------------- root ------------------------------------------- */

export default function Portfolio() {
  const isFinePointer = useFinePointer();
  const [isHovering, setIsHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollXP, setScrollXP] = useState(0);
  const [unlocked, setUnlocked] = useState(() => new Set());
  const [toast, setToast] = useState(null);
  const [konamiActive, setKonamiActive] = useState(false);

  const level = 1 + Math.floor(scrollXP / 15);

  const unlock = useCallback((id, message) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      setToast({ id, message });
      return next;
    });
  }, []);

  const handleSectionEnter = useCallback(
    (id) => {
      if (ACHIEVEMENTS[id]) unlock(id, ACHIEVEMENTS[id]);
    },
    [unlock]
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // scroll progress
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      setScrollXP(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // cursor hover delegation
  useEffect(() => {
    const handleOver = (e) => {
      if (e.target.closest && e.target.closest("[data-cursor-hover]")) setIsHovering(true);
    };
    const handleOut = (e) => {
      if (!e.target.closest) return;
      if (e.target.closest("[data-cursor-hover]")) {
        const related = e.relatedTarget;
        if (!related || !related.closest || !related.closest("[data-cursor-hover]")) setIsHovering(false);
      }
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  // konami code
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let idx = 0;
    const handler = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = seq[idx];
      const matches = expected.length === 1 ? key === expected : e.key === expected;
      if (matches) {
        idx++;
        if (idx === seq.length) {
          idx = 0;
          unlock("konami", "Found the Konami Code");
          setKonamiActive(true);
          setTimeout(() => setKonamiActive(false), 2200);
        }
      } else {
        idx = e.key === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [unlock]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        background: COLORS.bg,
        color: COLORS.textPrimary,
        fontFamily: "'Inter', system-ui, sans-serif",
        cursor: isFinePointer ? "none" : "auto",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        * { cursor: inherit; }
        a, button { cursor: inherit; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        ::selection { background: ${COLORS.blue}55; color: #fff; }
      `}</style>

      {isFinePointer && <CustomCursor isHovering={isHovering} />}

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 800px 600px at 15% -10%, ${COLORS.blue}14, transparent 60%), radial-gradient(ellipse 800px 600px at 90% 10%, ${COLORS.purple}12, transparent 60%)`,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.12,
          backgroundImage: `linear-gradient(${COLORS.border} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar scrollTo={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero scrollTo={scrollTo} level={level} />
          <TerminalSection scrollTo={scrollTo} onEnter={handleSectionEnter} />
          <About onEnter={handleSectionEnter} />
          <Skills onEnter={handleSectionEnter} />
          <Experience onEnter={handleSectionEnter} />
          <Quests onEnter={handleSectionEnter} />
          <Projects onEnter={handleSectionEnter} />
          <Education onEnter={handleSectionEnter} />
          <Contact onEnter={handleSectionEnter} />
        </main>
        <Footer />
      </div>

      <XPHud level={level} xp={scrollXP} unlockedCount={unlocked.size} />
      <AchievementToast toast={toast} />
      <KonamiOverlay active={konamiActive} />
    </div>
  );
}
