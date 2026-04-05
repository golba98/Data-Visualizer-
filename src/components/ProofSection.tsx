import { motion } from "framer-motion";
import { PROOF_CASES } from "../logic/proofHelpers";

export default function ProofSection() {
  return (
    <section id="proof" className="space-y-6">
      <div>
        <h2 className="section-title">Proof by Cases</h2>
        <p className="section-subtitle mt-2">
          Let A = {"{"}0,1,2,3,4,5{"}"}, and let B* = {"{"}0,1,2,6,7,8,9{"}"} where 9 is a rotated
          6. Every date xy is valid if it appears in (A x B*) U (B* x A).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {PROOF_CASES.map((proofCase, index) => (
          <motion.article
            key={proofCase.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className="rounded-2xl glass-light elevated-md p-5 hover-lift"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl">{proofCase.rangeLabel}</h3>
              <span className="rounded-full border border-slate-400/35 bg-slate-700/40 px-2 py-0.5 text-xs text-slate-200 elevated-sm">
                Case {index + 1}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-200">{proofCase.summary}</p>
            <p className="mt-3 rounded-xl glass-light elevated-sm px-3 py-2 text-xs text-slate-300">
              {proofCase.notation}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">
              Examples: {proofCase.examples.join(", ")}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
