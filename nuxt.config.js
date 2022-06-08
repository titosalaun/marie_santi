const webpack = require('webpack')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    /*base: '/diplome_2022/marie_santi'*/
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ampersound',
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
    ,
    script: [
      {
        src: '/js/function.js',
        body: true,
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
	  /*new webpack.ProvidePlugin({
      p5: 'p5',
    })*/
    { src: "~/plugins/one-colorpicker.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-gsap-module',
  ],
  gsap: {
    /* Module Options */
  },
  
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
	 baseURL: 'http://localhost:4003',
	 //baseURL: 'https://api-ampersound.onoci.net',
	 proxyHeaders: true,
    credentials: false
  },
  auth: {
	   redirect: {
	    login: '/login',
	    logout: '/',
	    callback: '/login',
	    home: '/'
	  },
	  localStorage: true,
	  cookie: {
		secure: true,
	    prefix: 'auth.',
	    options: {
	      path: '/',
	      maxAge: 10800
	    }
	  },
	  strategies: {
	    local: {
	      endpoints: {
	        login: { url: 'login', method: 'post', propertyName: 'access_token' },
	        user: { url: 'me', method: 'get', propertyName: 'content' },
	        logout: false
	      }
	    }
	  }
	},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
  ,
  loading: false,
  generate: {
	  dir: 'my-site'
	}
}
