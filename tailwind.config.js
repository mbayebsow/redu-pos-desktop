/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: {
        light: "hsla(153, 17.36%, 84.88%, 1)",
        50: "hsl(160, 18%, 97%)",
        100: "hsl(167, 16%, 89%)",
        200: "hsl(167, 17%, 78%)",
        300: "hsl(169, 15%, 64%)",
        400: "hsl(171, 13%, 50%)",
        500: "hsl(171, 17%, 40%)",
        600: "hsl(173, 17%, 32%)",
        700: "hsl(174, 16%, 25%)",
        800: "hsl(176, 14%, 22%)",
        900: "hsl(180, 11%, 19%)",
        950: "hsl(180, 18%, 10%)",
      },
    },
  },
  plugins: [],
};
