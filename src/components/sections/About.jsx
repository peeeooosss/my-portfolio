import { motion } from "framer-motion";
import { Sparkles, Layers, ShieldCheck, GraduationCap } from "lucide-react";
import { COLORS } from "../../data/constants";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";
import StatCard from "../ui/StatCard";

const STAT_ICONS = { Sparkles, Layers, ShieldCheck, GraduationCap };

const stats = [
  { label: "AI Tools Shipped", value: "19", iconKey: "Sparkles", note: "Groq-powered teaching tools" },
  { label: "Codebase Optimized", value: "-44%", iconKey: "Layers", note: "1.1GB → 621MB" },
  { label: "Critical Vulns Resolved", value: "5", iconKey: "ShieldCheck", note: "Zero Trust security audit" },
  { label: "Curriculum Modules Designed", value: "90", iconKey: "GraduationCap", note: "3-month AI Academy program" },
];

export default function About({ onEnter }) {
  return (
    <RevealSection id="about" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24 scroll-mt-20">
      <SectionLabel text="cat about.md" />
      <div className="grid lg:grid-cols-5 gap-10 mt-8 items-start">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 text-lg sm:text-xl leading-relaxed"
          style={{ color: COLORS.textSecondary }}
        >
          I am a results-driven AI Engineer and Systems Architect specializing in LLM
          orchestration, scalable backend architectures, and advanced data analytics.
          Currently, I am the Founding AI Engineer &amp; Tech Lead at NITAI GROUP, where I
          build high-performance architectures and engineer specialized AI teaching tools.
          Proven track record in code evaluation, prompt engineering, and technical writing —
          built for complex freelance AI development, RLHF evaluation, and system architecture work.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
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
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={{ ...stat, iconComponent: STAT_ICONS[stat.iconKey] }} index={i} />
        ))}
      </div>
    </RevealSection>
  );
}
