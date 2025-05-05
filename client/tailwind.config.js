/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B6B",
          dark: "#FF5252",
          light: "#FF8787",
        },
        secondary: {
          DEFAULT: "#4ECDC4",
          dark: "#3DBEB6",
          light: "#5FDCD4",
        },
        background: {
          DEFAULT: "#F8F9FA",
          dark: "#E9ECEF",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}; 