import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";

interface QuickNavProps {
  onSelectDay: (day: number) => void;
}

const notableDates = [
  { day: 1, label: "First" },
  { day: 9, label: "Rotation" },
  { day: 19, label: "Rotation" },
  { day: 29, label: "Rotation" },
  { day: 31, label: "Last" }
];

export default function QuickNav({ onSelectDay }: QuickNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-medium elevated-lg p-4"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.14em] text-slate-300">Quick Jump</p>
      <div className="flex flex-wrap gap-2">
        {notableDates.map((date) => (
          <button
            key={date.day}
            onClick={() => {
              onSelectDay(date.day);
              document.getElementById("visualization")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative rounded-lg border glass-light elevated-sm px-3 py-2 text-sm transition-all duration-300 hover:border-blue-400/60 hover-lift hover:glow-blue"
          >
            <span className="font-display font-semibold text-text">{formatDate(date.day)}</span>
            <span className="ml-2 text-xs text-slate-400 group-hover:text-blue-300 transition-colors">{date.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
