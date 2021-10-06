module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#6bccb9",
      secondary: "#eceff1",
      background: "#7bd3c2",
      text: "#3f6072",
      white: "#fff",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
