<script setup lang="ts">
const emit = defineEmits(['confirm'])
defineProps<{
  data?: [any]
  pagination?: any
  loading?: boolean
}>()

const filterColumns = ref([
  "userId",
  "nickName",
  "coinBeforeChange",
  "coinAfterChange",
  "changeCoins",
])

const columns = computed(() => {
  const data: any = {
    "id": { title: 'ID', key: 'id' },
    "userId": { title: '用户ID', key: 'userId' },
    "nickName": { title: '昵称', key: 'nickName' },
    "coinBeforeChange": {
      title: '充值前金币', render: (e: any) => e.coinAfterChange - e.changeCoins
    },
    "coinAfterChange": { title: '充值后金币', key: 'coinAfterChange' },
    "changeCoins": {
      title: '变化金币数', key: 'changeCoins', render: (item: any) => Number(item.changeCoins) || 0,
    },

  }

  return [
    ...filterColumns.value.map(v => {
      return data[v]
    }),
    {
      title: '创建时间', key: 'createDate',
      defaultFilterOptionValues: filterColumns.value,
      filterOptions: [
        { label: 'ID', value: 'id' },
        { label: '用户ID', value: 'userId' },
        { label: '昵称', value: 'nickName' },
        { label: '充值前金币', value: 'coinBeforeChange' },
        { label: '充值后金币', value: 'coinAfterChange' },
        { label: '变化金币数', value: 'changeCoins' },
      ],
      filter: true
    },
  ]
}
)


function filtersChange({ createTime: filterData }: any) {
  filterColumns.value = filterData
}
</script>

<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false"
    @update:filters="filtersChange" :remote="true" :loading="loading" />
</template>
