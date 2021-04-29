export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bet-tracker',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    'nuxt-uid-module'

  ],

  'uid-module': {
    name: 'uid', // property name(option)
    plugin: false // when to use vue-uid mixin(option)
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyAmEJ-kURZ02C6O7Bd__ysrM4xOrTqeLoo',
      authDomain: 'bettracker-c950e.firebaseapp.com',
      projectId: 'bettracker-c950e',
      storageBucket: 'bettracker-c950e.appspot.com',
      messagingSenderId: '168688297274',
      appId: '1:168688297274:web:6d45c46fbcc7050ba11c03',
      measurementId: 'G-6TFC71FGZQ'
    },
    services: {
      auth: true
    }
  }
}
