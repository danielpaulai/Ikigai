import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './store/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FFF9FA',
          'cream-2': '#FFF5F7',
          plum: '#2D1B22',
          'plum-2': '#3D2B32',
          pink: '#FFB7C5',
          'pink-2': '#FF8DA1',
          navy: '#2E2F53',
          light: '#F8F6F8',
          accent: '#E6DDE4',
          daniel: '#e90d41',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'ui-serif', 'serif'],
        sans: ['var(--font-roboto-flex)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      backdropBlur: {
        '2xl': '40px',
      },
    },
  },
  plugins: [],
}

export default config
