import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initAnalytics } from './composables/useAnalytics'
import './style.css'

if (!window.location.pathname.startsWith('/works')) initAnalytics()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
