import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@renderer/assets/tailwind.css'
import '@renderer/assets/global.scss'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
