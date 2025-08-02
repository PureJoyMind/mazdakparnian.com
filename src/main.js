import { createApp } from 'vue'
import App from './App.vue'

// Main CSS file with Tailwind
import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // MDI Icons

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')