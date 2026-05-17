/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#080A0E',
          card: '#0F1117',
          hover: '#141720',
        },
        border: {
          DEFAULT: '#1E2330',
          strong: '#2A3045',
        },
        red: {
          DEFAULT: '#E8333A',
          glow: 'rgba(232,51,58,0.15)',
          dim: '#7A1A1E',
        },
        text: {
          DEFAULT: '#F0F2F8',
          muted: '#6B7280',
          dim: '#3D4555',
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'pulse-dot': 'pulse-dot 1s ease-in-out infinite',
        'blink': 'blink 1.5s infinite',
        'spin-slow': 'spin 0.7s linear infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '70%': { transform: 'scale(1.15)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
