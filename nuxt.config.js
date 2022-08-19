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
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/axios'
  ],
  toast: {
    position: 'bottom-right',
    duration: 2000
  },
  axios: {
    baseURL: 'http://localhost:8000/',
    withCredentials: true
  },
  router: {
    middleware: ['auth','debug-auth'],
    base: '/'
  },
  auth: {
    strategies: {
        local: {
            scheme: 'refresh',
            endpoints: {
                login: {url: 'auth/login', method: 'post', propertyName: 'access_token' },
                logout: {url: 'auth/logout', method: 'get' },
                user: {url: 'auth/me', method: 'get', propertyName: 'user'}
            }
        }
    },
    redirect: {
        login: '/login',
        logout: '/login',
        user: '/profile',
        callback:'/login'
    }
  },
  build: {
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}

