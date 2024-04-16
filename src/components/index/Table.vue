<script setup lang="ts">
function createColumns() {
  return [
    { title: '站点', key: 'car' },
    { title: '提交量', key: 'model' },
    { title: '处理量', key: 'detail' },

  ]
}

const data = ref<any[]>(Array.from({ length: 6 }, (_: any, i: number) => ({
  car: ['鹤壁北站', '鹤壁南站', '安阳站', '安阳北站', '安阳南站', '鹤壁站'][i],
  model: Math.floor(Math.random() * 100),
  detail: Math.floor(Math.random() * 100),
})))

const pagination = {

}
</script>

<template>
  <n-data-table :columns="createColumns()" :data="data" :pagination="pagination" :bordered="false" />
</template>
