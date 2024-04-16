import { createApp } from 'vue'
import '~/assets'
import App from './App.vue'

const create = createApp(App)

Object.values(import.meta.glob('./modules/*.ts', { eager: true }))
  .forEach((i: any) => i.install?.(create))

// fix tailwindcss native ui style
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

create.mount('#app')
