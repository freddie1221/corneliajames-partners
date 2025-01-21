/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primCol: '#1a1a1a',
        secCol: '#F5F3ED', // Your custom hex color
        navy: {
          DEFAULT: '#1504D3',  // Classic navy
          light: '#1B2B4D',    // Midnight blue
          dark: '#090985',     // Dark navy
        },
      },
      fontFamily: {
        'avenir': ['AvenirNextLTPro', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss/nesting')],
};