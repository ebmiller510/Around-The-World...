/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // make sure to redirect to proper tailwind classes and 
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'headerz': ['"Alegreya Sans SC"', 'sans-serif'],
        'antonio': ['"Antonio"', 'sans-serif'],
        'thin': ['"Poiret One"', 'cursive']
      },
    },
  },
  plugins: [],
}

