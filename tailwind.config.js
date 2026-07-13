/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a1128",
          900: "#0d1b3e",
          800: "#122457",
        },
        brand: {
          blue: "#1d4ed8",
          gold: "#c9a227",
        },
        status: {
          pending: "#d97706",
          progress: "#2563eb",
          resolved: "#16a34a",
        },
      },
    },
  },
  plugins: [],
};
