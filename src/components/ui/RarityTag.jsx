import { Sparkles } from "lucide-react";
import { COLORS, RARITY_STYLES } from "../../data/constants";

export default function RarityTag({ rarity }) {
  const color = RARITY_STYLES[rarity] || COLORS.blue;
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color,
        border: `1px solid ${color}55`,
        background: `${color}14`,
      }}
    >
      <Sparkles size={11} /> {rarity}
    </span>
  );
}
