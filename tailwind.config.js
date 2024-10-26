/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'pulse-fast': 'pulse-fast 1s infinite',
        'fade-up': 'fade-up 0.5s ease-out',
        'shine': 'shine 2s infinite',
      },
    },
  },
  plugins: [],
};