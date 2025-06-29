import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/main.css'
const app = createApp(App)
app.use(router)
app.use(ToastPlugin)
app.mount('#app')