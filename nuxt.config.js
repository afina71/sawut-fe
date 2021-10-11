import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head

  // env: {
  //   baseUrl: process.env.BASE_URL,
  // },

  head: {
    titleTemplate: '%s - BWUT MUI DIY',
    title: 'SAWUT',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'SAWUT merupakan Web Application Sistem Akuntansi Wakaf Uang Tunai milik BWUT MUI DIY. SAWUT telah disesuaikan dengan standarisasi akuntansi wakaf terbaru, yaitu PSAK 112. Dibuatnya SAWUT, sebagai bentuk dukungan terhadap perkembangan wakaf uang tunai di Indonesia.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo_bwut.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.green.darken2,
          highlight: colors.green.lighten5,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
