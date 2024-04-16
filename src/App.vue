<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'

const config = useConfigStore()
const { theme: t } = storeToRefs(config)
const theme = computed(() => (t.value.isDark ? darkTheme : null))

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: config.theme.defaultColor,
    primaryColorPressed: config.theme.defaultColor,
    primaryColorHover: config.theme.hoverColor,
  },
}
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides" h-full :locale="zhCN" :date-locale="dateZhCN">
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </n-config-provider>
</template>
