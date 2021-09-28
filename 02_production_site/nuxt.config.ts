import { NuxtConfig } from '@nuxt/types'

const nuxtConfig: NuxtConfig = {
  srcDir: 'src/',
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Jadeite',
    titleTemplate: '%s | Jadeite',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // TODO : apple-icon
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/styles',
  ],
  styleResources: {
    scss: [
      '~/assets/scss/prepends.scss',
    ]
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/logger',
    '~/plugins/validate',
    '~/plugins/firebase',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/google-fonts',
    'nuxt-microcms-module',
    '@nuxtjs/fontawesome',
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vee-validate/dist/rules',
    ]
  },
  generate: {
    fallback: true,
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/news/page/:page',
        component: resolve(__dirname, 'src/pages/news/index.vue'),
        name: 'page',
      })
    }
  },
  server: {
    host: '0.0.0.0'
  },
  watchers: {
    webpack: {
      poll: true,
      ignored: /node_modules/,
    }
  },
  googleFonts: {
    families: {
      'Open+Sans': [300, 400, 600, 700, 800],
    },
    display: 'swap'
  },
  microcms: {
    options: {
      serviceDomain: process.env.MICRO_SERVICE_DOMAIN,
      apiKey: process.env.MICRO_X_API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
  fontawesome: {
    component: 'fa',
  },
  tailwindcss: {
    configPath: '../tailwind.config.js'
  },
  image: {
    domains: ['https://images.microcms-assets.io']
  },
  env: {
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
    FB_APP_ID: process.env.FB_APP_ID,
    FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID,
  },
}

export default nuxtConfig
