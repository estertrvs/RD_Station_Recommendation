/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563EB', 
          600: '#1E40AF', 
        },
        accent: {
          500: '#06b6d4',
          600: '#0e7490',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

