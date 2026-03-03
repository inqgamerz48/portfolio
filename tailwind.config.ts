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
        background: "#0a0a0a",
        primary: "#c1121f",
        accent: "#e85d04",
        text: "#f5f5f5",
        "text-muted": "#a0a0a0",
        card: "#141414",
        "card-border": "#2a2a2a",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "breathing": "breathing 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "smoke": "smoke 8s ease-out infinite",
      },
      keyframes: {
        breathing: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #c1121f, 0 0 10px #c1121f" },
          "100%": { boxShadow: "0 0 20px #c1121f, 0 0 30px #e85d04" },
        },
        smoke: {
          "0%": { transform: "translateY(100%) scale(1)", opacity: "0" },
          "50%": { opacity: "0.3" },
          "100%": { transform: "translateY(-100%) scale(2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
