module.exports = {
  purge: [
    "./src/components/**/*.{vue,js}",
    "./src/layouts/**/*.vue",
    `./src/pages/**/*.vue`,
    "./src/plugins/**/*.{js,ts}",
    `nuxt.config.{js,ts}`
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'site-black': '#292929',
        'site-accent': '#2A928A',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
