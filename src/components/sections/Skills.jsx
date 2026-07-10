import { useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../../data/constants";
import { SKILL_CATEGORIES } from "../../data/skills";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";

function SkillChip({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -3, scale: 1.03 }}
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
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <Icon size={14} style={{ color: hovered ? COLORS.purple : COLORS.blue, transition: "color 0.25s ease" }} />
      <span className="text-xs" style={{ color: COLORS.textSecondary }}>{skill.name}</span>
    </motion.div>
  );
}

function SkillCategory({ category, index }) {
  const tierColor = category.tier === "Mastered" ? COLORS.gold : COLORS.blue;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl p-6 relative overflow-hidden group"
      style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle at 80% 20%, ${tierColor}10, transparent 60%)` }}
      />
      <div className="relative">
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
    </motion.div>
  );
}

export default function Skills({ onEnter }) {
  return (
    <RevealSection id="skills" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="ls ./skills --tree" />
      <div className="grid sm:grid-cols-2 gap-5 mt-8">
        {SKILL_CATEGORIES.map((category, i) => (
          <SkillCategory key={category.id} category={category} index={i} />
        ))}
      </div>
    </RevealSection>
  );
}
