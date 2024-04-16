<script setup lang='ts'>
import type { MenuGroupOption, MenuOption } from 'naive-ui'

import type { SideProps } from './types'

const props = withDefaults(defineProps<SideProps>(), {
  isCollapsed: false,
  sideWidth: 220,
  headerHeight: '4rem',
})

const menuOptions = ref<Array<MenuOption | MenuGroupOption>>([])
const route = useRoute()
const activeKey = computed(() => (route.name as string))

// eslint-disable-next-line ts/ban-ts-comment, ts/prefer-ts-expect-error
// @ts-ignore
menuOptions.value = createMenu()
</script>

<template>
  <div
    :style="{
      width: `${props.sideWidth}px`,
    }"
  >
    <div
      class="flex items-center justify-center bb-border" :style="{
        height: props.headerHeight,
      }"
    >
      <p v-if="!isCollapsed">
        后台管理平台
      </p>
      <i v-else i-mdi:medal-outline icon-btn />
    </div>
    <n-scrollbar
      :style="{
        'max-height': `calc(100vh - ${props.headerHeight})`,
      }" trigger="hover" :size="30"
    >
      <n-menu :value="activeKey" :collapsed-width="props.sideWidth" :options="menuOptions" :indent="18" />
    </n-scrollbar>
  </div>
</template>
~/composables/menu
