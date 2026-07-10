import { useState, useEffect, useCallback } from "react";
import { COLORS } from "./data/constants";
import { ACHIEVEMENTS } from "./data/achievements";
import useFinePointer from "./hooks/useFinePointer";

import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ParticleField from "./components/effects/ParticleField";

import Hero from "./components/sections/Hero";
import TerminalSection from "./components/sections/Terminal";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Quests from "./components/sections/Quests";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Hobbies from "./components/sections/Hobbies";
import Contact from "./components/sections/Contact";

import XPHud from "./components/gamification/XPHud";
import AchievementToast from "./components/gamification/AchievementToast";
import KonamiOverlay from "./components/gamification/KonamiOverlay";
import ChatBot from "./components/chatbot/ChatBot";

export default function App() {
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

  useEffect(() => {
    const handleOver = (e) => {
      if (e.target.closest && e.target.closest("[data-cursor-hover]")) setIsHovering(true);
    };
    const handleOut = (e) => {
      if (!e.target.closest) return;
      const related = e.relatedTarget;
      if (!related || !related.closest || !related.closest("[data-cursor-hover]")) setIsHovering(false);
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

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
      {isFinePointer && <CustomCursor isHovering={isHovering} />}
      <ParticleField />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.08,
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
          <Hobbies onEnter={handleSectionEnter} />
          <Contact onEnter={handleSectionEnter} />
        </main>
        <Footer />
      </div>

      <XPHud level={level} xp={scrollXP} unlockedCount={unlocked.size} />
      <AchievementToast toast={toast} />
      <KonamiOverlay active={konamiActive} />
      <ChatBot />
    </div>
  );
}
