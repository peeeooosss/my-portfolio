import { AnimatePresence, motion } from "framer-motion";
import { COLORS } from "../../data/constants";

export default function KonamiOverlay({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            background: "rgba(10,10,10,0.55)",
          }}
        >
          <motion.p
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="text-2xl sm:text-4xl font-semibold text-center px-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple}, ${COLORS.gold})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Konami Master Unlocked
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
