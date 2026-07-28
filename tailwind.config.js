/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "dim", "night"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
};
