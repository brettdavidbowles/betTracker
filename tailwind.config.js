module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'court-background': "url('~/assets/court-background.jpeg')"
      })
    },
  },
  variants: {},
  plugins: [],
}
