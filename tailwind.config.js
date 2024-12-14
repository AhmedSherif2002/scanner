/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,html}", // <== Update this
  ],
  theme: {
    extend: {
      keyframes: {
        typewriter: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "currentColor" },
        },
      },
      animation: {
        typewriter: "typewriter 2s steps(30, end) forwards",
        blink: "blink 1s steps(2, start) infinite",
      },
    },
  },
  plugins: [],
};
