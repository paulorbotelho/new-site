/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
      extend: {
          fontFamily: {
              sans: ['Inter', 'sans-serif'],
          },
          colors: {
              brand: {
                  neon: '#d9f900',
                  dark: '#0A0A0A',
                  bg: '#0A0A0A',
              }
          }
      }
  },
  plugins: [],
}
