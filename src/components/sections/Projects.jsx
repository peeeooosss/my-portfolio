import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COLORS, RARITY_STYLES } from "../../data/constants";
import { PROJECTS } from "../../data/projects";
import RarityTag from "../ui/RarityTag";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";

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
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative rounded-2xl p-7 flex flex-col justify-between overflow-hidden"
      style={{
        background: COLORS.surface,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: hovered ? color : COLORS.border,
        boxShadow: hovered ? `0 24px 50px -24px ${color}77` : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
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
        <p className="text-sm leading-relaxed mb-3" style={{ color: COLORS.textSecondary }}>{project.description}</p>
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary, background: `${COLORS.border}`, border: `1px solid ${COLORS.border}` }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="relative mt-6 flex items-center gap-2 text-sm font-medium" style={{ color: hovered ? color : COLORS.textSecondary, transition: "color 0.25s ease" }}>
        Visit project
        <motion.span animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }} transition={{ duration: 0.25 }}>
          <ArrowUpRight size={16} />
        </motion.span>
      </div>
    </motion.a>
  );
}

export default function Projects({ onEnter }) {
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
