import { motion } from "framer-motion";
import { COLORS } from "../../data/constants";
import { EXPERIENCE } from "../../data/experience";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";

export default function Experience({ onEnter }) {
  return (
    <RevealSection id="experience" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="git log --experience" />
      <div className="mt-8 flex flex-col gap-10">
        {EXPERIENCE.map((job, i) => (
          <motion.div
            key={job.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex gap-5"
          >
            <div className="flex flex-col items-center">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
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
                  <motion.li
                    key={bi}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: bi * 0.08 }}
                    className="text-sm leading-relaxed flex gap-2"
                    style={{ color: COLORS.textSecondary }}
                  >
                    <span style={{ color: COLORS.purple }}>&rsaquo;</span>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </RevealSection>
  );
}
