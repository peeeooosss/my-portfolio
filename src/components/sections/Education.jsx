import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { COLORS, EDUCATION } from "../../data/constants";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";

export default function Education({ onEnter }) {
  return (
    <RevealSection id="education" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-20 scroll-mt-20">
      <SectionLabel text="cat education.md" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -3 }}
        className="mt-8 rounded-2xl p-6 sm:p-8 flex items-center gap-5"
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
      >
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
      </motion.div>
    </RevealSection>
  );
}
