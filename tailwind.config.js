/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js",
    // "./node_modules/daisyui/dist/**/*.js", // Optional: if DaisyUI needs node_modules scanning
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#041d6d",
        pink: "#eb2e4c",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // You can customize this
  },
};
