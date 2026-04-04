import { motion } from "framer-motion";
import clsx from "clsx";

export type FilterType = "all" | "rotation" | "A×B*" | "B*×A";

interface FilterControlsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string; description: string }[] = [
  { value: "all", label: "All Dates", description: "Show all 31 dates" },
  { value: "rotation", label: "Rotation Used", description: "Dates using 6→9" },
  { value: "A×B*", label: "A×B* Pattern", description: "Cyan-Violet order" },
  { value: "B*×A", label: "B*×A Pattern", description: "Violet-Cyan order" }
];

export default function FilterControls({ activeFilter, onFilterChange }: FilterControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-medium elevated-lg p-4"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.14em] text-slate-300">Filter Dates</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={clsx(
              "rounded-lg border px-3 py-2 text-left text-sm transition-all duration-300",
              activeFilter === filter.value
                ? "border-blue-400/70 gradient-border-blue glow-blue text-blue-100"
                : "border-slate-600/40 glass-light text-slate-300 hover:border-blue-400/50 hover-lift"
            )}
          >
            <div className="font-medium">{filter.label}</div>
            <div className="mt-0.5 text-xs text-slate-400">{filter.description}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
