/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // this tells tailwind to go into src folder and look in to all sub folders and files which has className attribute
    // Next, look for these extension - js(javascript), jsx, ts(typescript)
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}