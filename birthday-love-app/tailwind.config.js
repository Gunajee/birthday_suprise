/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pink:   { DEFAULT: '#FF4D8D', dark: '#C2185B', light: '#FFB3CC' },
        purple: { DEFAULT: '#A855F7', dark: '#6A1B9A', light: '#CE93D8' },
        gold:   { DEFAULT: '#FFD700', light: '#FFF176' },
        cream:  '#FFF9FB',
        darkbg: '#14011E',
      },
      fontFamily: {
        vibes: ["'Great Vibes'", "cursive"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        tamil: ["'Noto Sans Tamil'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
