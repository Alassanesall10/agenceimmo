/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        vertfonce: {
          DEFAULT: "#0d2b1f",
          light: "#123826",
          dark: "#081d15",
        },
        or: {
          DEFAULT: "#c9a227",
          light: "#e0bd4a",
          dark: "#a4831c",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
