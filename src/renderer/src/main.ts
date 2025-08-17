import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
import router from '@renderer/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import '@renderer/assets/tailwind.css'
import '@renderer/assets/global.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus, { locale: zhCN })
app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersistedState)

app.mount('#app')
