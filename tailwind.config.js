/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,html}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          600: 'rgb(37, 99, 235)',
          700: 'rgb(29, 78, 216)',
        }
      },
      fontFamily: {
        sans: [
          'Inter'
        ]
      },
      backgroundImage: {
        'not-found': "url('/public/assets/notfound.jpg')"
      }
    },
  },
  plugins: [],
}

