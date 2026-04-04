import clsx from "clsx";
import type { SourceSet } from "../logic/generatePairs";

interface DigitCubeProps {
  digit: number;
  sourceSet?: SourceSet;
  rotated?: boolean;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
}

const sizeClasses: Record<NonNullable<DigitCubeProps["size"]>, string> = {
  sm: "h-10 w-10 text-lg",
  md: "h-14 w-14 text-2xl",
  lg: "h-20 w-20 text-3xl"
};

const sourceSetClasses: Record<SourceSet, string> = {
  A: "ring-1 ring-cyan-400/50 hover:ring-cyan-300/70 hover:ring-2",
  "B*": "ring-1 ring-violet-400/50 hover:ring-violet-300/70 hover:ring-2"
};

const sourceSetGlow: Record<SourceSet, string> = {
  A: "hover:glow-cyan",
  "B*": "hover:glow-violet"
};

export default function DigitCube({
  digit,
  sourceSet,
  rotated = false,
  size = "md",
  highlight = false
}: DigitCubeProps) {
  return (
    <div
      className={clsx(
        "digit-cube font-display font-semibold group cursor-default",
        sizeClasses[size],
        sourceSet ? `${sourceSetClasses[sourceSet]} ${sourceSetGlow[sourceSet]}` : "",
        highlight ? "glow-blue scale-105" : ""
      )}
      aria-label={rotated ? `digit ${digit}, produced by rotating 6` : `digit ${digit}`}
      role="img"
    >
      <span className="leading-none transition-all duration-300 group-hover:scale-110">{digit}</span>
      {sourceSet ? (
        <span className="absolute -bottom-2 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide transition-all duration-300 elevated-sm group-hover:elevated-md"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            color: 'var(--muted)'
          }}
        >
          {sourceSet}
        </span>
      ) : null}
      {rotated ? (
        <span className="absolute -top-2 rounded-full border border-violet-400/40 bg-violet-500/15 px-2 py-0.5 text-[10px] text-violet-200 elevated-sm transition-all duration-300 group-hover:bg-violet-500/25 group-hover:border-violet-300/60">
          6 to 9
        </span>
      ) : null}
    </div>
  );
}
