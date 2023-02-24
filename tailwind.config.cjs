/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4c3faf",
      },
    },
  },
  important: true,
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
