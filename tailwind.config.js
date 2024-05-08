/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Components/*.{js,jsx,ts,tsx}",
    "./src/Pages/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: ["tailwindcss, autoprefixer"],
}

