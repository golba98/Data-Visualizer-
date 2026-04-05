import { motion } from "framer-motion";
import DigitCube from "./DigitCube";
import { SET_A, SET_B } from "../data/digitSets";

export default function PracticalitySection() {
  return (
    <section id="practicality" className="space-y-6">
      <div>
        <h2 className="section-title">Practical Interpretation</h2>
        <p className="section-subtitle mt-2">
          The proof directly matches physical date displays built from two cubes or tiles: choose
          one for tens and the other for units, then swap roles when needed.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl glass-light elevated-md p-5 lg:col-span-2 hover-lift"
        >
          <h3 className="font-display text-xl">Two blocks, full month coverage</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-cyan-300/35 bg-cyan-500/12 p-4 elevated-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Block A faces</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SET_A.map((digit) => (
                  <DigitCube key={`practical-A-${digit}`} digit={digit} sourceSet="A" size="sm" />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-violet-300/35 bg-violet-500/12 p-4 elevated-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-violet-200">Block B faces</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SET_B.map((digit) => (
                  <DigitCube key={`practical-B-${digit}`} digit={digit} sourceSet="B*" size="sm" />
                ))}
              </div>
              <p className="mt-2 text-xs text-violet-200/90">Rotate 6 to display 9.</p>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl glass-light elevated-md p-5 hover-lift"
        >
          <h3 className="font-display text-xl">Why it works physically</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Two-sided assignment covers both digit positions through swapping.</li>
            <li>Shared digits 0, 1, and 2 create overlap for flexibility.</li>
            <li>Including 3 on A guarantees the 30s.</li>
            <li>Rotating 6 as 9 avoids adding an extra face solely for 9.</li>
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
