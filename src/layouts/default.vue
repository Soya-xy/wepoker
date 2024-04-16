<script setup lang="ts">
const { layout, config } = useConfigStore()

const height = computed(() => {
  return `calc(100vh - ${layout.headerHeight} -  ${layout.tabHeight})`
})
</script>

<template>
  <n-layout
    h-full
    :native-scrollbar="false" :scrollbar-props="{
      size: 1,
      trigger: 'none',
    }"
  >
    <n-layout has-sider>
      <n-layout-sider
        bordered :width="layout.sideWidth" :collapsed-width="60" :native-scrollbar="false"
        collapse-mode="width" :collapsed="config.collapsedSide"
      >
        <AdminLayoutsSide
          :side-width="config.collapsedSide ? 60 : layout.sideWidth"
          :is-collapsed="config.collapsedSide"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-header :style="{ height: layout.headerHeight }" flex-y-center>
          <AdminLayoutsHeader />
        </n-layout-header>
        <AdminLayoutsTabs />

        <n-layout-content
          :style="{
            'max-height': height,
            height,
          }" :native-scrollbar="false"
        >
          <router-view v-slot="{ Component, route }">
            <transition name="fade-slide" mode="out-in" :appear="true">
              <keep-alive>
                <component
                  :is="Component"
                  :key="route.path"
                  class="flex-grow bg-#f6f9f8 p-16px transition duration-300 ease-in-out dark:bg-#101014"
                />
              </keep-alive>
            </transition>
          </router-view>
        </n-layout-content>
        <!-- <n-layout-footer
          bordered :style="{
            height: layout. ,
          }"
        >
          <p text-center leading-10>
            Powered by Soya
          </p>
        </n-layout-footer> -->
      </n-layout>
    </n-layout>
  </n-layout>
</template>
