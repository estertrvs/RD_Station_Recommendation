/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#4f46e5', 
        },
        accent: {
          500: '#06b6d4', 
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        '9': '2.25rem',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

