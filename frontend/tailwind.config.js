/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#0c2340',
        },
        secondary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
          text: '#1e293b',
          border: '#e2e8f0',
        },
        dark: {
          bg: '#0f172a',
          sidebar: '#1e293b',
          card: '#334155',
          text: '#f8fafc',
          border: '#475569',
        },
      },
      backgroundColor: {
        'glass-light': 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(30, 41, 59, 0.7)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideIn: {
          'from': { transform: 'translateX(-20px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1e293b',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addBase, theme }) => {
      addBase({
        ':root': {
          '--primary': '#2563eb',
          '--secondary': '#0ea5e9',
          '--success': '#22c55e',
          '--warning': '#f59e0b',
          '--danger': '#ef4444',
        },
        'body': {
          '@apply bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text transition-colors duration-300': {},
        },
      });
    }),
  ],
};
