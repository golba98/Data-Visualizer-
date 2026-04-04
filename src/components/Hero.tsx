import { motion } from "framer-motion";
import DigitCube from "./DigitCube";
import { SET_A, SET_B } from "../data/digitSets";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl glass-heavy elevated-2xl px-6 py-14 md:px-10">
      <div className="hero-glow h-56 w-56 bg-blue-500/45 -left-16 -top-16 animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="hero-glow h-64 w-64 bg-violet-500/45 -right-14 -bottom-14 animate-pulse" style={{ animationDuration: "5s", animationDelay: "1s" }} />

      <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="inline-flex rounded-full border border-blue-400/40 bg-blue-500/12 px-4 py-1 text-xs uppercase tracking-[0.18em] text-blue-200 elevated-sm">
            Mathematical Visualization
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl text-shadow-md">
            Two Sets, <span className="text-accent text-glow">All Dates</span>
          </h1>
          <p className="max-w-2xl text-base text-muted md:text-lg">
            A formal and visual proof that two digit sets, with one rotational trick, can display every day from 01 through 31.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#proof"
              className="group relative overflow-hidden rounded-xl border border-transparent bg-blue-500/20 px-5 py-3 text-sm font-medium text-blue-100 transition-all duration-300 hover:scale-105 gradient-border-blue hover:glow-blue"
            >
              Explore the proof
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#visualization"
              className="group rounded-xl border border-slate-400/35 glass-light px-5 py-3 text-sm font-medium text-slate-100 transition-all duration-300 hover-lift hover:border-slate-300/50"
            >
              Try the visualization
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">↓</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="glass-medium elevated-lg space-y-5 p-5"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Set A</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SET_A.map((digit) => (
                <DigitCube key={`hero-A-${digit}`} digit={digit} sourceSet="A" size="sm" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Set B</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SET_B.map((digit) => (
                <DigitCube key={`hero-B-${digit}`} digit={digit} sourceSet="B*" size="sm" />
              ))}
            </div>
          </div>
          <p className="rounded-xl border border-violet-400/35 bg-violet-500/12 px-3 py-2 text-sm text-violet-200 elevated-sm">
            Rotation rule: the digit <strong>6</strong> on set B may be turned upside down and used as <strong>9</strong>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
