/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // make sure to redirect to proper tailwind classes and 
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
}

