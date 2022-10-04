import colors from 'vuetify/es5/util/colors'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - firmlens',
    title: 'Firmlens',
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


  target: 'server',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // this line include bootstrap.css in each html file on generate 
    'bootstrap/dist/css/bootstrap.css',    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],
  axios:{
   //baseURL:'http://127.0.0.1:8000/api'
    baseURL:'https://stgps.appsndevs.com/firmlens-backend/api/'
  },
  ssr: false,
  loading: '~/components/LoadingBar.vue',
  loading: {
      name: 'circle',
    color: 'DodgerBlue',
    height: '10px',
    continuous: true,
    duration: 3000
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#9c27b0', 
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: '#00cae3',
          warning: '#fb8c00',
          error: '#ff5252',
          success: '#4caf50'
        }
      }
    }
  },
  // router: {
  //   middleware : ['userauth']
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: 'https://stgn.appsndevs.com/firmlens/'
  }
}
