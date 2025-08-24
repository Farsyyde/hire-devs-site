/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'black': '#000000',
        'white': '#FFFFFF',
        'gray-light': '#F5F5F5',
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'lg': '12px',
      },
    },
  },
  plugins: [],
}