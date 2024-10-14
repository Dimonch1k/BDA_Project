module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{html,scss}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "Arial", "sans-serif"],
        lato: ["Lato", "Arial", "sans-serif"],
        lora: ["Lora", "serif"],
        opensans: ["Open Sans", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        raleway: ["Raleway", "sans-serif"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
