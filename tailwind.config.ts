import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#e90d41',
          silver: '#b8bec1',
          dark: '#0a0a0a',
          charcoal: '#1a1a1a',
          smoke: '#2a2a2a',
          offwhite: '#f8f8f6',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
        display: ['var(--font-rethink)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        breathe: 'breathe 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(233, 13, 65, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(233, 13, 65, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
