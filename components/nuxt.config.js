export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'again-play',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
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
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true
  },

  roxy: {
    '/api/': 'http://localhost:7070/api',
    '/api2/': 'http://api.another-website.com'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    port: 3030
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/login',
      callback: '/',
      logout: '/',
      home: '/'
    },
    strategies: {
      local: {
        token:{ property: 'token' },
        user: { property: 'user' },
        endpoints: {
          // user: { url: 'http://localhost:7070/api/auth/user', method: 'get' },
          login: { url: 'http://localhost:7070/api/auth/login', method: 'post' },
          logout: { url: 'http://localhost:7070/api/auth/logout', method: 'post' },
          refresh: { url: 'http://localhost:7070/api/auth/refresh', method: 'post' }
        }
      }
    }
  }
}
