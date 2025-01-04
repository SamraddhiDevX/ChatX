const daisyui = require("daisyui");

module.exports = {
  content: [
    './index.html',          // Entry point for Vite
    './src/**/*.{js,ts,jsx,tsx}', // Include all source files
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
