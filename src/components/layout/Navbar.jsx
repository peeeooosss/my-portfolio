import { Menu, X } from "lucide-react";
import { COLORS, NAV_LINKS, SOCIAL_LINKS } from "../../data/constants";

export default function Navbar({ scrollTo, menuOpen, setMenuOpen }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(10,10,10,0.72)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            data-cursor-hover
            onClick={() => scrollTo("top")}
            className="flex items-center gap-3"
            style={{ background: "transparent", border: "none" }}
          >
            <span className="flex items-center gap-1.5">
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#ff5f56", display: "inline-block" }} />
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#ffbd2e", display: "inline-block" }} />
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#27c93f", display: "inline-block" }} />
            </span>
            <span className="text-sm hidden sm:inline" style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textSecondary }}>
              piyush@bhuyan:~$
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                data-cursor-hover
                onClick={() => scrollTo(link.href)}
                className="text-sm transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textSecondary, background: "transparent", border: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.textPrimary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textSecondary)}
              >
                ./{link.label}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: COLORS.textTertiary, background: "transparent", border: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.textPrimary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textTertiary)}
                  aria-label={s.label}
                  dangerouslySetInnerHTML={{ __html: s.svg }}
                />
              ))}
            </div>
            <button
              data-cursor-hover
              onClick={() => scrollTo("contact")}
              className="text-sm text-white px-4 py-2 rounded-full"
              style={{ fontFamily: "'JetBrains Mono', monospace", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, border: "none" }}
            >
              hire_me()
            </button>
          </nav>

          <button
            data-cursor-hover
            className="md:hidden"
            style={{ color: COLORS.textPrimary, background: "transparent", border: "none" }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              data-cursor-hover
              onClick={() => scrollTo(link.href)}
              className="text-left text-sm"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textSecondary, background: "transparent", border: "none" }}
            >
              ./{link.label}
            </button>
          ))}
          <div className="flex items-center gap-3 pt-2" style={{ borderTop: `1px solid ${COLORS.border}` }}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="p-2 rounded-lg"
                style={{ color: COLORS.textSecondary, background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}` }}
                aria-label={s.label}
                dangerouslySetInnerHTML={{ __html: s.svg }}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
