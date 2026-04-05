import { useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import type { OrderedPairMapping } from "../logic/generatePairs";
import { formatDate } from "../utils/formatDate";
import { memo } from "react";

interface DateGridProps {
  dates: number[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  mappingsByDay: Record<number, OrderedPairMapping[]>;
  isAnimated?: boolean;
}

const familyTone: Record<OrderedPairMapping["pairFamily"], string> = {
  "A×B*": "bg-cyan-500/15 text-cyan-200 border-cyan-300/40 elevated-sm",
  "B*×A": "bg-violet-500/15 text-violet-200 border-violet-300/40 elevated-sm",
};

function DateGrid({
  dates,
  selectedDay,
  onSelectDay,
  mappingsByDay,
  isAnimated = true,
}: DateGridProps) {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const activeDay = hoveredDay ?? selectedDay;

  const activePreview = useMemo(() => {
    const mappings = mappingsByDay[activeDay] ?? [];
    return mappings[0];
  }, [activeDay, mappingsByDay]);

  return (
    <section className="space-y-5" aria-label="Interactive date grid">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="section-title">Interactive Date Grid</h2>
          <p className="section-subtitle mt-2">
            Every day from 01 to 31 is constructible. Hover or click any tile to inspect its
            ordered-pair source.
          </p>
        </div>
        <div
          className="rounded-xl glass-light elevated-md px-3 py-2 text-right text-xs text-slate-300"
          role="status"
          aria-live="polite"
        >
          <p>Active date</p>
          <p className="font-display text-lg text-text">{formatDate(activeDay)}</p>
        </div>
      </div>

      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
        role="group"
        aria-label="Calendar dates 01 to 31"
      >
        {dates.map((day, index) => {
          const mappings = mappingsByDay[day] ?? [];
          const primary = mappings[0];
          const families = [...new Set(mappings.map((entry) => entry.pairFamily))];
          const usesRotation = mappings.some((entry) => entry.usesRotation);
          const isActive = day === activeDay;

          return (
            <motion.button
              key={day}
              type="button"
              initial={isAnimated ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isAnimated ? { delay: index * 0.012 } : { duration: 0 }}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              onFocus={() => setHoveredDay(day)}
              onBlur={() => setHoveredDay(null)}
              onClick={() => onSelectDay(day)}
              aria-label={`Date ${formatDate(day)}, ${families.join(" and ")}, ${usesRotation ? "uses rotation" : "no rotation"}`}
              aria-pressed={isActive}
              className={clsx(
                "rounded-xl border px-3 py-3 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-bg",
                isActive
                  ? "border-accent/70 gradient-border-blue glow-blue scale-105"
                  : "border-border glass-light elevated-md hover:border-blue-300/50 hover-lift-lg hover:glow-blue"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">{formatDate(day)}</span>
                <span className="rounded-full border border-emerald-300/40 bg-emerald-500/12 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-200 elevated-sm">
                  valid
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {families.map((family) => (
                  <span
                    key={`${day}-${family}`}
                    className={clsx(
                      "rounded-full border px-2 py-0.5 text-[10px]",
                      familyTone[family]
                    )}
                  >
                    {family}
                  </span>
                ))}
                {usesRotation ? (
                  <span className="rounded-full border border-violet-300/35 bg-violet-500/12 px-2 py-0.5 text-[10px] text-violet-200 elevated-sm">
                    6 to 9
                  </span>
                ) : null}
              </div>

              {isActive && primary ? (
                <p className="mt-2 text-xs text-slate-300">
                  {primary.left.sourceSet}[{primary.left.digit}] then {primary.right.sourceSet}[
                  {primary.right.digit}]
                </p>
              ) : null}
            </motion.button>
          );
        })}
      </div>

      {activePreview ? (
        <p
          className="rounded-xl glass-medium elevated-md px-4 py-3 text-sm text-muted"
          role="status"
          aria-live="polite"
        >
          <span className="text-text">{formatDate(activeDay)}</span> in {activePreview.pairFamily}:
          left digit comes from {activePreview.left.sourceSet}, right digit from{" "}
          {activePreview.right.sourceSet}
          {activePreview.usesRotation ? ", with rotated 6 representing 9." : "."}
        </p>
      ) : null}
    </section>
  );
}

export default memo(DateGrid);
