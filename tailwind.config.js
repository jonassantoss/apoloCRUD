/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ejs}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'logo': 'Poetsen',
        'display': 'Poppins, Arial, Helvetica, sans-serif'
      }
    },
  },
  plugins: [],
}

