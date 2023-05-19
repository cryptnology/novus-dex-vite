/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '2xl': { min: '1535px' },
        // => @media (min-width: 1535px) { ... }

        xl: { min: '1279px' },
        // => @media (min-width: 1279px) { ... }

        lg: { min: '1023px' },
        // => @media (min-width: 1023px) { ... }

        md: { min: '767px' },
        // => @media (min-width: 767px) { ... }

        sm: { min: '639px' },
        // => @media (min-width: 639px) { ... }

        xs: { min: '479px' },
        // => @media (min-width: 479px) { ... }
      },
      colors: {
        dark: '#0d121d',
        light: '#f1f2f9',
        primary: '#755BB4',
        primaryDark: '#58E6D9',
        secondary: 'rgb(117 91 180 / 0.2)',
        secondaryDark: 'rgb(5 118 110 / 0.3)',
      },
    },
  },
  plugins: [],
};
