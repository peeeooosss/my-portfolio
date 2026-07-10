import { COLORS, SOCIAL_LINKS } from "../../data/constants";

export default function Footer() {
  return (
    <footer
      className="relative max-w-6xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
      style={{ borderTop: `1px solid ${COLORS.border}`, color: COLORS.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}
    >
      <span>&copy; {new Date().getFullYear()} Piyush Bhuyan — all processes terminated gracefully.</span>
      <div className="flex items-center gap-4">
        <span>react &middot; tailwind &middot; framer-motion</span>
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="p-1.5 rounded-md transition-colors"
              style={{ color: COLORS.textTertiary }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.textPrimary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textTertiary)}
              aria-label={s.label}
              dangerouslySetInnerHTML={{ __html: s.svg }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
