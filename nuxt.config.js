module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-auth-trial',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'trial make auth local with nuxt auth' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    name: 'chasing-dots',
    color: '#ff5638',
    background: 'white',
    height: '4px'
  },
  server: {
    port: 3030
  },
  modules: [
      '@nuxtjs/axios',
      '@nuxtjs/auth',
      '@nuxtjs/toast'
  ],
  toast: {
    position: 'bottom-right',
    duration: 2000
  },
  axios: {
    baseURL: 'http://localhost:7070/'
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
        local: {
            endpoints: {
                login: {url: '/api/auth/login', method: 'post', propertyName: 'token' },
                logout: false,
                // user: {url: '/api/auth/user', method: 'get', propertyName: 'data'}
                user: false
            },
            tokenRequired: true,
            tokenType: false
        }
    },
    redirect: {
        login: '/login',
        logout: '/login',
        user: '/profile',
        callback:'/dashboard'
    }
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

