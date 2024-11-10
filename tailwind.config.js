/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{html,js,tsx}',  // Include all necessary file types
    './components/**/*.{html,js,tsx}', // Ensure components are also scanned
  ],
  theme: {
    extend: {
      // Customize the theme as necessary
    },
  },
  plugins: [
    require('@tailwindcss/forms'),  // If you want form styles
    require('@tailwindcss/typography'),  // For richer text styles
    require('@tailwindcss/aspect-ratio'),  // To control aspect ratios for images or videos
  ],
}
