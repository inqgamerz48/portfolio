import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050507",
        obsidian: "#0a0a0e",
        ink: "#111118",
        steel: "#1c1c28",
        ash: "#555568",
        mist: "#8e8ea0",
        parchment: "#e8e4f0",
        blood: "#c41230",
        flame: "#ff3d52",
        ember: "#ff6b3d",
        gold: "#d4a853",
        green: "#22c55e",
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
