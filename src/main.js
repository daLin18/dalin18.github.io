
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



// 全局指令注册
import { lazyPlugin } from '@/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 引入初始化样式文件
import '@/styles/common.scss'

// 引入全局组件插件
import {componentPlugin} from "@/components/index"
app.use(componentPlugin)


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// 懒加载指令
app.use(lazyPlugin)

app.mount('#app')

