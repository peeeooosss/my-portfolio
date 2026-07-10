import { Terminal } from "lucide-react";
import { COLORS } from "../../data/constants";

export default function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3" style={{ color: COLORS.blue, fontFamily: "'JetBrains Mono', monospace" }}>
      <Terminal size={14} />
      <span className="text-sm">{text}</span>
      <span style={{ flex: 1, height: 1, background: COLORS.border }} />
    </div>
  );
}
