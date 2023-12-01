
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {
      colors: {
        golden: '#BEAF88', // Change this to your desired color code
      },
    },
  },
  plugins: [
  ],
}
