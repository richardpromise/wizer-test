module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideOpacity: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        slideOpacity: "slideOpacity 0.5s ease-in-out forwards",
      },
      fontFamily: {
        sans: ['"Lexend Deca"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
