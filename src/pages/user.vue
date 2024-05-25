<script setup lang="ts">
const formValue = ref<any>({})
const list = ref<any>([])


const page = ref({
  current: 1,
  size: 10,
})

const pagination = ref({
  page: page.value.current,
  itemCount: 0,
  pageSize: page.value.size,
  onChange: (index: number) => {
    page.value.current = index
    pagination.value.page = index
  },
})

watch(page, init, { deep: true })

const formRef = ref<any>(null)
const loading = ref<boolean>(false)

async function init() {
  loading.value = true

  try {
    const res = await pageList(page.value)
    if (res.code === 200) {
      pagination.value.itemCount = Number(res.data.total)
      list.value = res.data.records
    }
  } catch (error) {
    console.log("🚀 ~ init ~ error:", error)
  } finally {
    loading.value = false
  }
}

init()

const info = ref<any>({
})
indexApi().then(res => {
  if (res.code === 200) {
    info.value = res.data
  }
})

function handleValidateClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      page.value = {
        ...formValue.value,
        current: 1,
        size: 10,
      }
    }
  })
}

</script>

<template>
  <div>
    <div bg-white p4>
      <n-space align="center" :size="100">
        <n-statistic label="今日盈亏" tabular-nums>
          <n-number-animation :from="0.0" :to="Number(info.todayProfit || 0)" :precision="2" />
        </n-statistic>
        <n-statistic label="总盈亏" tabular-nums>
          <n-number-animation :from="0.0" :to="Number(info.totalProfit || 0)" :precision="2" />
        </n-statistic>
      </n-space>
    </div>
    <n-card title="搜索">
      <n-form ref="formRef" inline label-placement="left" :label-width="80" :model="formValue" class="!flex-col !sm:flex-row">
        <n-form-item label="ID" path="id">
          <n-input v-model:value="formValue.id" placeholder="输入会员ID" />
        </n-form-item>
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="formValue.username" placeholder="输入用户名" />
        </n-form-item>
        <n-form-item label="电话号码" path="phone">
          <n-input v-model:value="formValue.phone" placeholder="电话号码" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" type="primary" @click="handleValidateClick">
            搜索
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>

    <n-card title="用户列表" class="w-full">
      <IndexTable :data="list" :pagination="pagination" :loading="loading"></IndexTable>
    </n-card>
  </div>
</template>

<route lang="yaml">
meta:
  title: 会员管理
  icon: i-carbon:user
  order: 10
</route>
