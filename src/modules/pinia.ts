import { createPinia } from 'pinia'
import type { App } from 'vue'

// Setup Pinia
// https://pinia.vuejs.org/
export function install(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
