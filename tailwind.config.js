module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        'primary': '#FF9F1C',
        'secondary': '#FF4040',
        'tertiary': '#2EC4B6',
        'dark': '#0A1014',
        'grey': '#182329',
        'mid-grey': '#353F4C',
        'light-grey': '#7ABC99',
        'white': '#ffffff'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}