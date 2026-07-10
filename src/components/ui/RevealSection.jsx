import { motion } from "framer-motion";

export default function RevealSection({ id, onEnter, className, children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: "-60px" }}
      onViewportEnter={() => onEnter && onEnter(id)}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
