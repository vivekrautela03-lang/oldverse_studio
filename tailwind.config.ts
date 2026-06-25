import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem"
      }
    },
    extend: {
      colors: {
        cream: "var(--cream)",
        beige: "var(--beige)",
        brown: "var(--brown)",
        coffee: "var(--coffee)",
        charcoal: "var(--charcoal)",
        brand: {
          black: "#0B0B0B",
          graphite: "#111111",
          slate: "#1A1A1A",
          ivory: "#FDFDFD",
          gold: "#F5A623",
          amber: "#FF6C32",
          crimson: "#C62828",
          blue: "#3A86FF"
        }
      },
      fontFamily: {
        display: ["var(--font-bebas-neue)", "sans-serif"],
        bebas: ["var(--font-bebas-neue)", "sans-serif"],
        space: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(11, 9, 8, 0.32)",
        panel: "0 14px 40px rgba(0, 0, 0, 0.18)"
      },
      keyframes: {
        "float-soft": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(120%)" }
        }
      },
      animation: {
        "float-soft": "float-soft 6s ease-in-out infinite",
        shimmer: "shimmer 1.4s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
