/** @type {import('tailwindcss').Config} */
export default {
  // Les classes sont écrites dans des template strings JS : on scanne tout src/
  content: ["./index.html", "./src/**/*.js"],
  theme: { extend: {} },
  plugins: []
};
