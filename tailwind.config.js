/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0A0C',
        surface: {
          DEFAULT: '#121217',
          hover: '#181822',
          card: 'rgba(18, 18, 23, 0.75)',
        },
        cyan: {
          neon: '#00F5FF',
          glow: 'rgba(0, 245, 255, 0.4)',
        },
        violet: {
          neon: '#7B2CBF',
          electric: '#9D4EDD',
          glow: 'rgba(123, 44, 191, 0.4)',
        },
        emerald: {
          free: '#10B981',
          glow: 'rgba(16, 185, 129, 0.3)',
        },
        amber: {
          paid: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.3)',
        },
        border: {
          glass: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(0, 245, 255, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(0, 245, 255, 0.3)',
        'neon-violet': '0 0 25px rgba(123, 44, 191, 0.35)',
        'neon-gold': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'inner-glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
