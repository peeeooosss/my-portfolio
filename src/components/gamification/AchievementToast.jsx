import { AnimatePresence, motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { COLORS } from "../../data/constants";

export default function AchievementToast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 30, scale: 0.92, x: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 55,
            background: "rgba(17,17,20,0.92)",
            border: `1px solid ${COLORS.gold}55`,
            boxShadow: `0 10px 40px -12px ${COLORS.gold}55`,
            backdropFilter: "blur(10px)",
            maxWidth: 280,
          }}
        >
          <motion.div
            animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Trophy size={18} style={{ color: COLORS.gold, flexShrink: 0 }} />
          </motion.div>
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary }}>
              Achievement Unlocked
            </p>
            <p className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{toast.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
