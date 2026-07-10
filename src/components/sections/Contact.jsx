import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { COLORS } from "../../data/constants";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";

export default function Contact({ onEnter }) {
  const [hoveredMail, setHoveredMail] = useState(false);
  return (
    <RevealSection id="contact" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28 scroll-mt-20">
      <SectionLabel text="cat contact.json" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 rounded-2xl p-8 sm:p-12 relative overflow-hidden"
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 15%, ${COLORS.purple}22, transparent 55%)` }} />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
            Let&apos;s build something.
          </h2>
          <p className="max-w-xl mb-8" style={{ color: COLORS.textSecondary }}>
            Open to freelance engagements in LLM orchestration, AI tooling, and full-stack systems architecture.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="mailto:piyushbhuyan001@gmail.com"
              data-cursor-hover
              onMouseEnter={() => setHoveredMail(true)}
              onMouseLeave={() => setHoveredMail(false)}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-white text-sm font-medium px-6 py-3 rounded-full inline-flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
                boxShadow: hoveredMail ? `0 12px 30px -12px ${COLORS.blue}77` : "none",
                transition: "box-shadow 0.25s ease",
                textDecoration: "none",
              }}
            >
              <Mail size={16} /> piyushbhuyan001@gmail.com
            </motion.a>
            <span className="text-sm inline-flex items-center gap-2" style={{ color: COLORS.textSecondary }}>
              <MapPin size={15} /> Guwahati, Assam, India
            </span>
          </div>
        </div>
      </motion.div>
    </RevealSection>
  );
}
