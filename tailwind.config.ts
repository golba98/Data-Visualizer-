import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        panel: "var(--panel)",
        border: "var(--border)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)",
        accentAlt: "var(--accent-alt)"
      },
      boxShadow: {
        glow: "0 10px 40px rgba(67, 97, 238, 0.2)",
        panel: "0 8px 24px rgba(0, 0, 0, 0.35)"
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px"
      },
      fontFamily: {
        display: ["Sora", "Space Grotesk", "sans-serif"],
        body: ["Space Grotesk", "Sora", "sans-serif"]
      },
      transitionDuration: {
        "400": "400ms"
      },
      scale: {
        "102": "1.02",
        "105": "1.05"
      }
    }
  },
  plugins: []
} satisfies Config;
