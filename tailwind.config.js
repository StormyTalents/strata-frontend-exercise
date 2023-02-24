/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          900: "#212121",
          800: "#383838",
          700: "#4F4F4F",
          600: "#696969",
          400: "#9E9E9E",
          200: "#D6D6D6",
          50: "#F4F4F4",
        },
      },
    },
  },
  plugins: [],
};
