/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefcf8',
          100: '#fdf8ee',
          200: '#f8eed3',
          300: '#f3e3bb',
          400: '#ecd69b',
          500: '#e2c578',
        },
        blush: {
          50: '#fef5f7',
          100: '#fde8ee',
          200: '#fbd5e0',
          300: '#f8b8cd',
          400: '#f28bab',
          500: '#e8617e',
          600: '#d63e63',
          700: '#b82a4e',
          800: '#9a2242',
        },
        wine: {
          400: '#a83b58',
          500: '#8b2a44',
          600: '#74203a',
          700: '#5e1830',
          800: '#4a1226',
        },
        plum: {
          400: '#5d3a7a',
          500: '#4a2a63',
          600: '#3a1f4e',
          700: '#2e1740',
          800: '#241034',
          900: '#1a0a26',
        },
        ink: {
          600: '#3d2b1f',
          700: '#2a1d15',
          800: '#1a120d',
          900: '#0d0805',
        },
      },
      fontFamily: {
        hand: ['"Caveat"', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        kalam: ['"Kalam"', 'cursive'],
        light: ['"Shadows Into Light"', 'cursive'],
        cinematic: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatMedium 4s ease-in-out infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'draw': 'draw 2s ease forwards',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
