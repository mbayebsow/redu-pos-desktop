/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: {
        light: "hsla(153, 17.36%, 84.88%, 1)",
        50: "#f5f8f7",
        100: "#dfe8e6",
        200: "#bfd0cd",
        300: "#98b0ae",
        400: "#728f8d",
        500: "#577572",
        600: "#445d5b",
        700: "#394c4a",
        800: "#313e3d",
        900: "#2b3635",
        950: "#111717",
      },
    },
  },
  plugins: [],
};
