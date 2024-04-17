<script setup lang="ts">
const emit = defineEmits(['confirm'])
defineProps<{
  data?: [any]
  pagination?: any
  loading?: boolean
}>()

const filterColumns = ref([
  "id",
  "username",
  "nickName",
  "phone",
  "agentId",
  "coin",
  "todayProfit",
  "totalProfit"
])

const columns = computed(() => {
  const data: any = {
    "id": { title: 'ID', key: 'id' },
    "username": { title: '用户名', key: 'username' },
    "nickName": { title: '昵称', key: 'nickName' },
    "phone": { title: '电话', key: 'phone' },
    "agentId": { title: '代理UID', key: 'agentId' },
    "coin": {
      title: '金币数', key: 'coin', render: (item: any) => Number(item.coin) || 0,
      sorter: (row1: any, row2: any) => row1.coin - row2.coin
    },
    "todayProfit": {
      title: '今日盈亏', key: 'todayProfit', render: (item: any) => Number(item.todayProfit) || 0,
      sorter: (row1: any, row2: any) => row1.todayProfit - row2.todayProfit
    },
    "totalProfit": {
      title: '总盈亏', key: 'totalProfit', render: (item: any) => Number(item.totalProfit) || 0,
      sorter: (row1: any, row2: any) => row1.totalProfit - row2.totalProfit
    },

  }

  return [
    ...filterColumns.value.map(v => {
      return data[v]
    }),
    {
      title: '创建时间', key: 'createTime',
      defaultFilterOptionValues: filterColumns.value,
      filterOptions: [
        { label: 'ID', value: 'id' },
        { label: '用户名', value: 'username' },
        { label: '昵称', value: 'nickName' },
        { label: '电话', value: 'phone' },
        { label: '代理UID', value: 'agentId' },
        { label: '金币数', value: 'coin' },
        { label: '今日盈亏', value: 'todayProfit' },
        { label: '总盈亏', value: 'totalProfit' },
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
