import { useState } from "react";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { COLORS, RARITY_STYLES } from "../../data/constants";
import { QUESTS } from "../../data/quests";
import RarityTag from "../ui/RarityTag";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";

function QuestCard({ quest, index }) {
  const [hovered, setHovered] = useState(false);
  const color = RARITY_STYLES[quest.rarity];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: COLORS.surface,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: hovered ? color : COLORS.border,
        boxShadow: hovered ? `0 20px 44px -22px ${color}77` : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(circle at 20% 0%, ${color}18, transparent 60%)` }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <Swords size={16} style={{ color }} />
          <RarityTag rarity={quest.rarity} />
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
            {quest.title}
          </h3>
          <p className="text-xs" style={{ color: COLORS.textTertiary }}>{quest.subtitle}</p>
        </div>
        <p className="text-xs mt-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.purple }}>{quest.role}</p>
        <ul className="flex flex-col gap-1.5 mt-3">
          {quest.bullets.map((b, i) => (
            <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: COLORS.textSecondary }}>
              <span style={{ color }}>&rsaquo;</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Quests({ onEnter }) {
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
