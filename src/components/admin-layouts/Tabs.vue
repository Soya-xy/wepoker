<script setup lang='ts'>
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()

const { layout } = useConfigStore()

const tab = useTabsStore()
const { tabs } = storeToRefs(tab)

watch(
  () => route.fullPath,
  () => {
    tab.addTab(route)
  },
)
const name = computed(() => route.fullPath)

function clickTab(fullPath: string) {
  if (fullPath === name.value)
    return

  router.push(fullPath)
}

function handleClose(idx: string) {
  const { value: panels } = tabs

  const index = panels.findIndex(v => idx === v.fullPath)
  panels.splice(index, 1)

  if (tabs.value.length > 0)
    router.replace(tabs.value[0].fullPath)

  else router.replace('/')
}
</script>

<template>
  <n-tabs
    v-model:value="name" type="card" closable :tab-style="{
      'height': layout.tabHeight,
      'min-width': '80px',
    }"
    @update-value="clickTab"
    @close="handleClose"
  >
    <n-tab v-for="panel in tabs" :key="panel.fullPath" :name="panel.fullPath">
      {{ panel.meta.title }}
    </n-tab>
  </n-tabs>
</template>
