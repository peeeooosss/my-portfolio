import { motion } from "framer-motion";
import { COLORS } from "../../data/constants";
import { TOTAL_ACHIEVEMENTS } from "../../data/achievements";

export default function XPHud({ level, xp, unlockedCount }) {
  return (
    <div
      className="hidden sm:flex items-center gap-3 rounded-full px-4 py-2.5"
      style={{ position: "fixed", bottom: 20, left: 20, zIndex: 35, background: "rgba(17,17,20,0.85)", border: `1px solid ${COLORS.border}`, backdropFilter: "blur(10px)" }}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          color: "#fff",
          background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
        }}
      >
        {level}
      </motion.div>
      <div>
        <div style={{ width: 120, height: 4, borderRadius: 2, background: COLORS.border, overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${xp}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ height: "100%", background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.purple})` }}
          />
        </div>
        <p className="text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textTertiary }}>
          LVL {level} &middot; {unlockedCount}/{TOTAL_ACHIEVEMENTS} unlocked
        </p>
      </div>
    </div>
  );
}
