/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Components/*.{js,jsx,ts,tsx}",
    "./src/Pages/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1c1e22',  // Custom color named 'dark-gray'
      },
      boxShadow: {
        'custom': '0 4px 8px rgba(0, 0, 0, 0.3)',  // Custom shadow named 'custom'
      },
    },
  },
  plugins: ["tailwindcss, autoprefixer"],
}

