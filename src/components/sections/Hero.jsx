import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Terminal, MapPin, ArrowRight } from "lucide-react";
import { COLORS } from "../../data/constants";

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
        <path d="M 30 205 Q 40 130 110 128 Q 180 130 190 205 Z" fill="#17171c" stroke={COLORS.border} strokeWidth="1.5" />
        <path d="M 55 138 Q 60 90 110 85 Q 160 90 165 138 Q 140 118 110 118 Q 80 118 55 138 Z" fill="#1c1c22" stroke={COLORS.border} strokeWidth="1.5" />
        <motion.g style={{ x: sx, y: sy }}>
          <circle cx="110" cy="112" r="46" fill="#1f1f26" stroke={COLORS.border} strokeWidth="1.5" />
          <rect x="76" y="102" width="68" height="22" rx="11" fill="url(#visorGrad)" opacity="0.35" filter="blur(6px)" />
          <rect x="76" y="102" width="68" height="22" rx="11" fill="url(#visorGrad)" opacity="0.9" />
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
        <path d="M 62 108 A 48 48 0 0 1 158 108" fill="none" stroke={COLORS.border} strokeWidth="4" strokeLinecap="round" />
        <rect x="54" y="100" width="12" height="22" rx="5" fill="#26262e" stroke={COLORS.blue} strokeWidth="1" />
        <rect x="154" y="100" width="12" height="22" rx="5" fill="#26262e" stroke={COLORS.purple} strokeWidth="1" />
      </svg>
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

export default function Hero({ scrollTo, level }) {
  const roles = [
    "Freelance AI Systems Engineer",
    "LLM Evaluator",
    "Systems Architect",
    "Choreographer",
    "Music Producer",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, roleIndex]);

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

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-lg sm:text-2xl font-medium max-w-2xl h-10"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {displayText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              style={{ color: COLORS.blue, marginLeft: 2 }}
            >
              |
            </motion.span>
          </motion.div>

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
            <motion.button
              data-cursor-hover
              onClick={() => scrollTo("projects")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="text-white text-sm font-medium px-6 py-3 rounded-full inline-flex items-center gap-2"
              style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, border: "none" }}
            >
              View Projects <ArrowRight size={16} />
            </motion.button>
            <motion.button
              data-cursor-hover
              onClick={() => scrollTo("terminal")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm font-medium px-6 py-3 rounded-full inline-flex items-center gap-2"
              style={{ color: COLORS.textPrimary, border: `1px solid ${COLORS.border}`, background: "transparent" }}
            >
              <Terminal size={16} /> Open Terminal
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Avatar level={level} />
        </motion.div>
      </div>
    </section>
  );
}
