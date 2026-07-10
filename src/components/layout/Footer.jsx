import { COLORS } from "../../data/constants";

export default function Footer() {
  return (
    <footer
      className="relative max-w-6xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
      style={{ borderTop: `1px solid ${COLORS.border}`, color: COLORS.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}
    >
      <span>&copy; {new Date().getFullYear()} Piyush Bhuyan — all processes terminated gracefully.</span>
      <span>react &middot; tailwind &middot; framer-motion</span>
    </footer>
  );
}
