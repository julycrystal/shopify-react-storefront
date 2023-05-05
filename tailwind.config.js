/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
      heading: ['Raleway', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
