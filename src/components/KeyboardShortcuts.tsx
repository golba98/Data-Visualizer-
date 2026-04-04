import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KeyboardShortcutsProps {
  onNavigate: (direction: "prev" | "next") => void;
  onToggleAnimation: () => void;
}

export default function KeyboardShortcuts({ onNavigate, onToggleAnimation }: KeyboardShortcutsProps) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
        case "h":
          e.preventDefault();
          onNavigate("prev");
          break;
        case "ArrowRight":
        case "l":
          e.preventDefault();
          onNavigate("next");
          break;
        case "a":
          e.preventDefault();
          onToggleAnimation();
          break;
        case "?":
          e.preventDefault();
          setShowHelp(!showHelp);
          break;
        case "Escape":
          if (showHelp) {
            e.preventDefault();
            setShowHelp(false);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate, onToggleAnimation, showHelp]);

  return (
    <>
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-slate-600/40 bg-slate-800/50 backdrop-blur-md transition hover:bg-slate-700/50 hover:border-slate-500/60"
        aria-label="Keyboard shortcuts"
      >
        <span className="text-slate-300 text-lg font-semibold">?</span>
      </button>

      <AnimatePresence>
        {showHelp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowHelp(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface/95 p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-text">Keyboard Shortcuts</h3>
                <button
                  onClick={() => setShowHelp(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-text transition"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <ShortcutRow keys={["←", "h"]} description="Previous date" />
                <ShortcutRow keys={["→", "l"]} description="Next date" />
                <ShortcutRow keys={["a"]} description="Toggle animations" />
                <ShortcutRow keys={["?"]} description="Show this help" />
                <ShortcutRow keys={["Esc"]} description="Close dialogs" />
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Navigate through dates using arrow keys or vim-style navigation
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ShortcutRow({ keys, description }: { keys: string[]; description: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2">
      <span className="text-sm text-slate-300">{description}</span>
      <div className="flex gap-1">
        {keys.map((key) => (
          <kbd
            key={key}
            className="rounded border border-slate-600/60 bg-slate-700/50 px-2 py-1 font-mono text-xs text-slate-200"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}
