module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        "brand-primary": "#1C1427",
        "cock-purple-light": "#282133",
        "cock-purple-dark": "#1C1427",
        "brand-header": "#282133",
        "brand-dark-button": "#40394A",
        "cock-green": "#7ECA9C",
        "cock-purple": "#7900FF",
        "cock-red": "#AD2A49",
        "cock-line": "#2D2439",
        "cock-footer": "#443E4D",
        "cock-orange": "#F48140",
        "cock-blue": "#156FF8",
        "cock-dark": "#171021",
        "cock-board": "#F5F5F5",
        "cock-dark-400": "#322741",
        "cock-border-light": "#F9F9F9",
        "cock-gray": "#F5F5F5",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Rajdhani: ["Rajdhani", "sans-serif"],
        "IBM-Plex-Sans": ["'IBM Plex Sans'", "sans-serif"],
        "IBM-Plex-Mono": ["'IBM Plex Mono'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
