import { useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../../data/constants";
import { HOBBIES } from "../../data/hobbies";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";

function HobbyCard({ hobby, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = hobby.icon;
  const [gradA, gradB] = hobby.gradient;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -8, scale: 1.03 }}
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group"
      style={{
        background: COLORS.surface,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: hovered ? gradA : COLORS.border,
        boxShadow: hovered ? `0 20px 50px -20px ${gradA}55` : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at 30% 20%, ${gradA}15, transparent 60%), radial-gradient(circle at 80% 80%, ${gradB}10, transparent 50%)`,
        }}
      />

      {/* Animated corner accent */}
      <motion.div
        animate={hovered ? { scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] } : { scale: 1, opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full"
        style={{ background: `radial-gradient(circle, ${gradA}40, transparent 70%)` }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <motion.div
            animate={hovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.5 }}
            className="p-3 rounded-xl"
            style={{ background: `linear-gradient(135deg, ${gradA}20, ${gradB}20)` }}
          >
            <Icon size={24} style={{ color: gradA }} />
          </motion.div>
          <motion.div
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="text-xs px-2 py-1 rounded-full"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: gradA, border: `1px solid ${gradA}44`, background: `${gradA}12` }}
          >
            Active
          </motion.div>
        </div>

        <h3 className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
          {hobby.title}
        </h3>

        <p className="text-sm leading-relaxed mt-2" style={{ color: COLORS.textSecondary }}>
          {hobby.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {hobby.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary, background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={hovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-xs mt-4 pt-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.gold, borderTop: `1px solid ${COLORS.border}` }}>
            Fun fact: {hobby.funFact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Hobbies({ onEnter }) {
  return (
    <RevealSection id="hobbies" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="ls ./hobbies --personal" />
      <p className="mt-4 mb-8 text-sm max-w-2xl" style={{ color: COLORS.textSecondary }}>
        Beyond the terminal, there is a whole world. Here is what keeps me alive outside of code.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOBBIES.map((hobby, i) => (
          <HobbyCard key={hobby.id} hobby={hobby} index={i} />
        ))}
      </div>
    </RevealSection>
  );
}
