import { acceptHMRUpdate, defineStore } from 'pinia'

const dark = useDark()

export const useConfigStore = defineStore('config', () => {
  const theme = ref({
    isDark: dark.value,
    defaultColor: '#165dff',
    hoverColor: '#0044ff',
  })

  const layout = ref({
    sideWidth: 220,
    headerHeight: '4rem',
    footerHeight: '3rem',
    tabHeight: '40px',
  })

  const config = ref({
    collapsedSide: false,
  })

  return {
    config,
    theme,
    layout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore as any, import.meta.hot))
