import { acceptHMRUpdate, defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

/** 多页签Tab的路由 */
interface GlobalTabRoute extends Pick<RouteLocationNormalizedLoaded, 'name' | 'fullPath' | 'meta'> {}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<GlobalTabRoute[]>([
    {
      name: 'home',
      fullPath: '/',
      meta: {
        title: '首页',
      },
    },
  ])

  function routeIsHave(route: RouteLocationNormalizedLoaded) {
    return tabs.value.some(item => item.fullPath === route.fullPath)
  }

  function addTab(route: RouteLocationNormalizedLoaded) {
    if (routeIsHave(route))
      return

    tabs.value.push({
      name: route.name,
      fullPath: route.fullPath,
      meta: route.meta,
    })
  }

  return {
    tabs,
    addTab,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabsStore, import.meta.hot))
