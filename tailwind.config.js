/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        dark: "#111518",
        primary: {
          50: "#effcfc",
          100: "#d6f3f7",
          200: "#b2e8ef",
          300: "#7cd6e4",
          400: "#40bad0",
          500: "#249eb6",
          600: "#207c95",
          700: "#21677d",
          800: "#235667",
          900: "#214858",
          950: "#112e3b",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
