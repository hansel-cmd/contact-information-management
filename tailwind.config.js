/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          400: "rgb(96 165 250)",
          600: "rgb(37, 99, 235)",
          700: "rgb(29, 78, 216)",
        },
        primaryDark: {
          700: "#00111C",
          500: "#00253E",
        },
        accentDark: {
          700: "#003356",
          600: "#00406C",
        },
        fontDark: {
          700: "#e4e6eb",
          600: "#b0b3b8",
        },
      },
      fontFamily: {
        sans: ["Inter"],
      },
      backgroundImage: {
        "not-found": "url('/public/assets/notfound.jpg')",
      },
    },
  },
  plugins: [],
};
