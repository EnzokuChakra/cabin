/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tree-green': '#2E5D3A',
        'wood': '#8B5A2B',
        'gold': '#D4AF37',
      },
      fontFamily: {
        sans: ['Gilroy', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair-display)'],
        mono: ['var(--font-roboto-mono)'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
}
