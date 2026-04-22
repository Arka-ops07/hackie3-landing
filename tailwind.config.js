/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // 🔥 THIS LINE FIXES EVERYTHING
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};