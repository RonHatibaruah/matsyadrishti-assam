/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        assam: {
          dark: '#00264d',
          navy: '#003366',
          teal: '#008080',
          emerald: '#0d9488',
          gold: '#d97706',
          sand: '#f8fafc',
          river: '#0284c7'
        }
      }
    },
  },
  plugins: [],
}
