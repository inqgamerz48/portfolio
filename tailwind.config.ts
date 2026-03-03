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
        ink: "#12121a",
        steel: "#1e1e2a",
        ash: "#5a5570",
        mist: "#9490a8",
        parchment: "#e8e4f0",
        blood: "#c41230",
        flame: "#ff3d52",
        ember: "#ff6b3d",
        gold: "#d4a853",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Satoshi", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
