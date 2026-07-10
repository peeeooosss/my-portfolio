import { motion } from "framer-motion";
import { COLORS } from "../../data/constants";

export default function StatCard({ stat, index }) {
  const Icon = stat.iconComponent;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="rounded-xl p-5 relative overflow-hidden group"
      style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${COLORS.purple}15, transparent 70%)` }}
      />
      <div className="relative">
        <Icon size={16} style={{ color: COLORS.purple }} />
        <p className="text-2xl sm:text-3xl font-semibold mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: COLORS.textPrimary }}>
          {stat.value}
        </p>
        <p className="text-xs mt-1" style={{ color: COLORS.textSecondary }}>{stat.label}</p>
        <p className="text-xs mt-2" style={{ color: COLORS.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}>{stat.note}</p>
      </div>
    </motion.div>
  );
}
