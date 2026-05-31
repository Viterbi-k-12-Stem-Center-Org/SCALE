import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cardinal: "#990000",
        gold: "#d6b25e",
        parchment: "#f7f4ef",
        ink: "#1f1a17"
      },
      boxShadow: {
        soft: "0 18px 45px -24px rgba(31, 26, 23, 0.28)"
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "\"Times New Roman\"", "serif"],
        body: ["\"Segoe UI\"", "Helvetica", "Arial", "sans-serif"]
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(153, 0, 0, 0.16), transparent 40%), radial-gradient(circle at bottom right, rgba(214, 178, 94, 0.18), transparent 36%)"
      }
    }
  },
  plugins: []
};

export default config;
