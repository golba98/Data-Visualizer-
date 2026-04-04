import { motion } from "framer-motion";
import type { OrderedPairMapping } from "../logic/generatePairs";

interface StatsPanelProps {
  mappingsByDay: Record<number, OrderedPairMapping[]>;
}

const statStyles = [
  { color: "emerald", className: "border-emerald-300/35 bg-emerald-500/12", textClassName: "text-emerald-200" },
  { color: "violet", className: "border-violet-300/35 bg-violet-500/12", textClassName: "text-violet-200" },
  { color: "blue", className: "border-blue-300/35 bg-blue-500/12", textClassName: "text-blue-200" },
  { color: "cyan", className: "border-cyan-300/35 bg-cyan-500/12", textClassName: "text-cyan-200" }
];

export default function StatsPanel({ mappingsByDay }: StatsPanelProps) {
  const totalDates = Object.keys(mappingsByDay).length;
  const rotationDates = Object.values(mappingsByDay).filter((mappings) =>
    mappings.some((m) => m.usesRotation)
  ).length;
  
  const totalMappings = Object.values(mappingsByDay).reduce(
    (sum, mappings) => sum + mappings.length,
    0
  );

  const stats = [
    { label: "Total Dates", value: totalDates },
    { label: "Rotation Dates", value: rotationDates },
    { label: "Total Mappings", value: totalMappings },
    { label: "Coverage", value: "100%" }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          className={`rounded-xl border ${statStyles[index].className} p-4 elevated-md hover-lift transition-all duration-300`}
        >
          <p className="text-xs uppercase tracking-[0.14em] text-slate-300">{stat.label}</p>
          <p className={`mt-1 font-display text-3xl font-semibold ${statStyles[index].textClassName}`}>
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
