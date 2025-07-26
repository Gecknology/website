/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // App directory
    "./components/**/*.{js,ts,jsx,tsx}", // Shared components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A86B', // Gecknology green (customizable)
      },
    },
  },
  plugins: [],
}
