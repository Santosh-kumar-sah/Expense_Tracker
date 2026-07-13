import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        accent: '#059669',
        highlight: '#D97706',
        surface: '#F8FAFC',
        ink: '#0B1120',
        alert: {
          under: '#059669',
          nearing: '#D97706',
          exceeded: '#DC2626',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.35s ease-out both',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;