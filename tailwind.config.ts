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
        bg: "#080808",
        fg: "#e8e4de",
        ember: "#d4412a",
        "ember-glow": "#ff6b47",
        ash: "#6b6660",
        bone: "#c4b8a8",
        smoke: "#1a1816",
        charcoal: "#2a2622",
      },
      fontFamily: {
        serif: ["Instrument Serif", "serif"],
        sans: ["Satoshi", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
