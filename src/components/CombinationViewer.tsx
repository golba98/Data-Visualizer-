import { motion } from "framer-motion";
import DigitCube from "./DigitCube";
import type { OrderedPairMapping } from "../logic/generatePairs";
import { formatDate } from "../utils/formatDate";

interface CombinationViewerProps {
  day: number;
  mappings: OrderedPairMapping[];
}

export default function CombinationViewer({ day, mappings }: CombinationViewerProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="section-title">Combination Viewer</h2>
        <p className="section-subtitle mt-2">Inspect every valid assignment for a selected date, including set source and 6-to-9 rotation metadata.</p>
      </div>

      <div className="glass-medium elevated-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-slate-300">Selected Date</p>
            <h3 className="font-display text-4xl font-semibold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{formatDate(day)}</h3>
          </div>
          <div className="rounded-xl glass-light elevated-md px-4 py-2">
            <p className="text-xs text-slate-400">Valid mappings</p>
            <p className="font-display text-2xl font-semibold text-emerald-300">{mappings.length}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {mappings.length === 0 ? (
            <div className="col-span-2 rounded-2xl border border-amber-500/35 bg-amber-500/8 p-6 text-center elevated-md">
              <p className="text-amber-200">No mappings found for this date with the current filter.</p>
            </div>
          ) : (
            mappings.map((mapping, index) => (
              <motion.article
                key={`${mapping.pairFamily}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="group rounded-2xl border glass-light elevated-md p-4 transition-all duration-300 hover:border-blue-400/50 hover-lift-lg hover:glow-blue"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-slate-300">{mapping.pairFamily}</p>

                <div className="mt-3 flex items-center gap-4">
                  <DigitCube digit={mapping.left.digit} sourceSet={mapping.left.sourceSet} rotated={mapping.left.rotated} size="md" />
                  <span className="text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-300">+</span>
                  <DigitCube digit={mapping.right.digit} sourceSet={mapping.right.sourceSet} rotated={mapping.right.rotated} size="md" />
                </div>

                <p className="mt-3 text-sm text-muted">{mapping.explanation}</p>
                <p className="mt-1 text-xs text-slate-300">
                  Ordered pair: ({mapping.left.sourceSet}, {mapping.right.sourceSet})
                </p>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
