import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import pages from 'virtual:generated-pages'
import NProgress from 'nprogress'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(pages),
})

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export function install(app: App) {
  app.use(router)
}
