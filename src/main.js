import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

createApp(App)
  .use(router) // 将router应用到Vue实例
  .mount('#app'); // 挂载到HTML的某个元素上