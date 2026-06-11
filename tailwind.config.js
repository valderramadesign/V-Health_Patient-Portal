/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./outputs/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ringColor: {
        DEFAULT: "rgba(0,122,114,0.35)",
      },
      ringOffsetColor: {
        DEFAULT: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
