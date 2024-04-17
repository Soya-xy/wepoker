<script setup lang="ts">
import { NButton } from 'naive-ui';

const emit = defineEmits(['edit'])
defineProps<{
  data?: [any]
  pagination?: any
  loading?: boolean
}>()

const filterColumns = ref([
  "id",
  'username',
  'agentCode',
  'agentPid',
  'financePermit',
  'coin',
  "todayProfit",
  "totalProfit",
  'profitPercent',
])

const columns = computed(() => {
  const data: any = {
    "id": { title: 'ID', key: 'id' },
    "username": { title: '用户名', key: 'username' },
    "agentCode": { title: '代理邀请码', key: 'agentCode' },
    "agentPid": { title: '上级代理id', key: 'agentPid' },
    "financePermit": { title: '财务权限', key: 'financePermit', render: (item: any) => item.financePermit ? '是' : '否' },
    "coin": {
      title: '金币数', key: 'coin', render: (item: any) => Number(item.coin) || 0,
      sorter: (row1: any, row2: any) => row1.coin - row2.coin
    },
    "todayProfit": {
      title: '今日盈亏', key: 'coin', render: (item: any) => Number(item.coin) || 0,
      sorter: (row1: any, row2: any) => row1.coin - row2.coin
    },
    "totalProfit": {
      title: '总盈亏', key: 'coin', render: (item: any) => Number(item.coin) || 0,
      sorter: (row1: any, row2: any) => row1.coin - row2.coin
    },
    "profitPercent": {
      title: '占成比例', key: 'todayProfit', render: (item: any) => Number(item.profitPercent) || 0,
      sorter: (row1: any, row2: any) => row1.profitPercent - row2.profitPercent
    },

  }

  return [
    ...filterColumns.value.map(v => {
      return data[v]
    }),
    {
      title: '操作', key: 'action',
      defaultFilterOptionValues: filterColumns.value,
      filterOptions: [
        { label: 'ID', value: 'id' },
        { label: '用户名', value: 'username' },
        { label: '代理邀请码', value: 'agentCode' },
        { label: '上级代理id', value: 'agentPid' },
        { label: '财务权限', value: 'financePermit' },
        { label: '金币数', value: 'coin' },
        { label: '占成比例', value: 'profitPercent' },
        { label: '今日盈亏', value: 'todayProfit' },
        { label: '总盈亏', value: 'totalProfit' },
      ],
      filter: true,
      render: (item: any) => {
        return h(NButton,
          {
            type: 'primary',
            onClick() {
              emit('edit', item)
            }
          },
          {
            default: () => '编辑'
          }
        )
      }
    },
  ]
}
)


function filtersChange({ action: filterData }: any) {
  filterColumns.value = filterData
}
</script>

<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false"
    @update:filters="filtersChange" :remote="true" :loading="loading" />
</template>
