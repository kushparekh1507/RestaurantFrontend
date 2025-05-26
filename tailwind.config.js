/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5722',
          light: '#FFCCBC',
          dark: '#E64A19',
        },
        secondary: {
          DEFAULT: '#FFA000',
          light: '#FFECB3',
          dark: '#FF8F00',
        },
        accent: {
          DEFAULT: '#2196F3',
          light: '#BBDEFB',
          dark: '#1976D2',
        },
        background: {
          DEFAULT: '#FFFAF4',
          card: '#FFFFFF',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { 
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': { 
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};