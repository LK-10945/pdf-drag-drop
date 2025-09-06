/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans your components
    "./public/index.html",        // Optional: if you use any Tailwind in your HTML
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',   // Indigo
        secondary: '#9333ea', // Purple
        accent: '#14b8a6',    // Teal
        muted: '#f3f4f6',     // Light gray
      },
      animation: {
        pulseFast: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Optional: for framer-motion / transitions
  ],
};
