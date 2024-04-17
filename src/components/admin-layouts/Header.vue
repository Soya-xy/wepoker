<script setup lang='ts'>
import { ref } from 'vue-demi'

const router = useRouter()
const { config, theme } = useConfigStore()
const time = ref<number>(new Date().getTime())
function toggleTheme() {
  theme.isDark = !theme.isDark
  toggleDark()
}
setInterval(() => {
  time.value = new Date().getTime()
}, 1000)

const options = [
  {
    label: '退出登录',
    key: 'exit',
  },
]
function handleSelect(e: string) {
  if (e === 'exit'){
    localStorage.clear()
    router.replace('/login')
  }
}
</script>

<template>
  <div mx-4 w-full>
    <n-space justify="space-between">
      <n-icon
        size="30" hover="text-blue-600 cursor-pointer" :class="{
          'i-mdi:menu-open': !config.collapsedSide,
          'i-mdi:menu-close': config.collapsedSide,
        }"
        @click="config.collapsedSide = !config.collapsedSide"
      />
      <div flex items-center>
        <n-time :time="time" class="mr-5 text-24px" />

        <n-icon
          size="30" hover="text-blue-600 cursor-pointer" :class="{
            'i-carbon:moon': theme.isDark,
            'i-carbon:sun': !theme.isDark,
          }"
          @click="toggleTheme"
        />
        <div class="ml-5 cursor-pointer">
          <n-dropdown trigger="click" :options="options" @select="handleSelect">
            <n-avatar round class="!bg-blue-600">
              A
            </n-avatar>
          </n-dropdown>
        </div>
      </div>
    </n-space>
  </div>
</template>
