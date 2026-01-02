/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#FFF0F5",    // Soft Background
          rose: "#D63384",    // Primary Pink
          gold: "#C5A059",    // Accents
          cream: "#FCF9F1",   // Page Background
          dark: "#2D1B1E",    // Chocolate Text
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}