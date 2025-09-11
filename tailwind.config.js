/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C6B4A',
        primary_light: '#A0BA9E',
        primary_dark : '#022B04',
        secondary_light: '#f8f4ee',
        secondary: '#CEAB5D',
        secondary_dark: '#9A7521',
        bg: '#F0FFEF'
      }
    },
  },
  plugins: [],
}