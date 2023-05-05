import type { Config } from 'tailwindcss'

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
      heading: ['Raleway', 'sans-serif'],
    },
    screens: {
      sm: '400px',
      // => @media (min-width: 400px) { ... }
      md: '960px',
      // => @media (min-width: 960px) { ... }
      lg: '1440px',
    },
  },
  plugins: [],
} satisfies Config;
