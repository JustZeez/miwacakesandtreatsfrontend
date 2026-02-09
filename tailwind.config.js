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
          pink: "#FFF0F5",    
          rose: "#D63384",    
          gold: "#C5A059",    
          cream: "#FCF9F1",   
          dark: "#2D1B1E",    
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