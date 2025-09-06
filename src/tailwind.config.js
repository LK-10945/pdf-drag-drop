/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // this includes all your component files
  ],
  theme: {
    extend: {
      colors: {
        // Customize your design system here if needed
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(222.2, 47.4%, 11.2%)',
        primary: 'hsl(222.2, 83.2%, 53.3%)',
        muted: 'hsl(210, 40%, 96%)',
        border: 'hsl(214, 32%, 91%)',
      },
    },
  },
  plugins: [],
}
