import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store/index.js'

const app = createApp(App)
// Install the store instance as a plugin
app.use(store)
app.mount('#app')
