<script setup lang="ts">
const formValue = ref<any>({})
const rechargeForm = ref<any>({
  amount: 0
})
const list = ref<any>([])
const coin = ref(0)

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

const showModal = ref<boolean>(false)
async function init() {
  loading.value = true

  try {

    const { data: userInfo } = await getUserInfo()
    coin.value = userInfo.coin

    const res = await financeManageList(page.value)
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

const message = useMessage()
async function submitCallback() {
  if (!rechargeForm.value.uid) {
    message.error('请填写会员UID')
    return false
  }

  if (!rechargeForm.value.amount) {
    message.error('请填写充值金额')
    return false
  }

  if (!Number.isInteger(rechargeForm.value.amount)) {
    message.error('充值金额必须为大于0的正整数')
    return false
  }

  const res = await recharge({
    amount: rechargeForm.value.amount,
    uid: rechargeForm.value.uid,
  })

  if (res.code === 200) {
    message.success(res.message)
    init()
  } else {
    message.error(res.message)
  }



}
</script>

<template>
  <div>
    <n-card title="搜索">
      <n-form ref="formRef" inline label-placement="left" :label-width="80" :model="formValue">
        <n-form-item label="用户ID" path="userId">
          <n-input v-model:value="formValue.userId" placeholder="输入会员ID" />
        </n-form-item>
        <n-form-item label="用户名" path="nickName">
          <n-input v-model:value="formValue.nickName" placeholder="输入用户名" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" type="primary" @click="handleValidateClick">
            搜索
          </n-button>
          <n-button attr-type="button" type="success" class="!ml-4" @click="showModal = true">
            用户充值
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
    <n-card title="财务管理">
      <MoneyTable :data="list" :pagination="pagination" :loading="loading"></MoneyTable>
    </n-card>

    <n-modal v-model:show="showModal" preset="dialog" title="用户充值" positive-text="确认" negative-text="算了"
      @positive-click="submitCallback">
      <n-form label-placement="left" :label-width="80" :model="rechargeForm">
        <n-form-item label="UID" path="uid">
          <n-input-number v-model:value="rechargeForm.uid" clearable :show-button="false" placeholder="输入会员UID"
            :precision="0" class="flex-1" />
        </n-form-item>
        <n-form-item label="充值金币" path="username">
          <n-input-number v-model:value="rechargeForm.amount" clearable :show-button="false" placeholder="输入充值金币"
            :precision="0" class="flex-1" />
        </n-form-item>
      </n-form>
    </n-modal>

  </div>
</template>

<route lang="yaml">
meta:
  title: 财务管理
  icon: i-carbon:wallet
  order: 9
</route>
