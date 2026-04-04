import { motion } from "framer-motion";
import clsx from "clsx";

interface AnimationControlsProps {
  isAnimated: boolean;
  onToggle: () => void;
}

export default function AnimationControls({ isAnimated, onToggle }: AnimationControlsProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={onToggle}
      className="glass-medium elevated-md flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:border-blue-400/50 hover-lift"
      aria-label={isAnimated ? "Disable animations" : "Enable animations"}
    >
      <div
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 elevated-sm",
          isAnimated ? "bg-emerald-500/25 text-emerald-200" : "bg-slate-700/60 text-slate-400"
        )}
      >
        {isAnimated ? (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7z" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="text-left">
        <p className="text-xs text-slate-400">Animations</p>
        <p className="text-sm font-medium text-text">{isAnimated ? "On" : "Off"}</p>
      </div>
    </motion.button>
  );
}
