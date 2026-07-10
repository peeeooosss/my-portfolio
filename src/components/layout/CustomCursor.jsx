import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { COLORS } from "../../data/constants";

export default function CustomCursor({ isHovering }) {
  const glowX = useMotionValue(-400);
  const glowY = useMotionValue(-400);
  const springX = useSpring(glowX, { damping: 28, stiffness: 180, mass: 0.6 });
  const springY = useSpring(glowY, { damping: 28, stiffness: 180, mass: 0.6 });

  const dotX = useMotionValue(-400);
  const dotY = useMotionValue(-400);
  const dotSpringX = useSpring(dotX, { damping: 35, stiffness: 900, mass: 0.2 });
  const dotSpringY = useSpring(dotY, { damping: 35, stiffness: 900, mass: 0.2 });

  useEffect(() => {
    const move = (e) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [glowX, glowY, dotX, dotY]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 460,
          height: 460,
          marginLeft: -230,
          marginTop: -230,
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 60,
          x: springX,
          y: springY,
          background: `radial-gradient(circle, ${COLORS.blue}33 0%, ${COLORS.purple}22 38%, transparent 70%)`,
          filter: "blur(24px)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: isHovering ? 2.8 : 1, opacity: isHovering ? 0.55 : 0.9 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 61,
          x: dotSpringX,
          y: dotSpringY,
          border: `1.5px solid ${COLORS.blue}`,
          background: isHovering ? `${COLORS.purple}55` : "transparent",
        }}
      />
    </>
  );
}
