<script setup lang="ts">
const formValue = ref<any>({})
const rechargeForm = ref<any>({
  amount: 0
})
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

const showModal = ref<boolean>(false)
async function init() {
  loading.value = true

  try {

    const res = await agentList(page.value)
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
const isEdit = ref(false)
const currentInfo = ref<any>({})

function editItem(e: any) {
  currentInfo.value = e
  isEdit.value = true
  showModal.value = true
  rechargeForm.value.profitPercent = e.profitPercent
}

async function submitCallback() {

  if (rechargeForm.value.profitPercent && rechargeForm.value.profitPercent <= 0) {
    message.error('占成比例不能小于等于0')
    return false
  }

  let res
  if (isEdit.value) {
    console.log("🚀 ~ submitCallback ~ currentInfo.value:", currentInfo.value)

    if (!currentInfo.value.id) {
      message.error('更新失败,请刷新页面')
      return false
    }

    res = await updateAgent({
      id: currentInfo.value.id,
      "password": rechargeForm.value.password,
      "profitPercent": rechargeForm.value.profitPercent,
    })
  } else {
    if (!rechargeForm.value.username) {
      message.error('请填写用户名')
      return false
    }
    res = await createAgent({
      "username": rechargeForm.value.username,
      "password": rechargeForm.value.password,
      "profitPercent": rechargeForm.value.profitPercent,
    })
  }


  if (res.code === 200) {
    message.success(res.message)
    init()
  } else {
    message.error(res.message)
  }



}
function addItem() {
  currentInfo.value = {}
  isEdit.value = false
  showModal.value = true
}
</script>

<template>
  <div>
    <n-card title="搜索">
      <n-form ref="formRef" inline label-placement="left" :model="formValue"  class="!flex-col !sm:flex-row">
        <n-form-item label="代理ID" path="agentPid">
          <n-input v-model:value="formValue.agentPid" placeholder="输入代理ID" />
        </n-form-item>
        <n-form-item label="代理邀请码" path="agentCode">
          <n-input v-model:value="formValue.agentCode" placeholder="输入代理邀请码" />
        </n-form-item>
        <!-- <n-form-item label="用户名" path="nickname">
          <n-input v-model:value="formValue.nickname" placeholder="输入用户名" />
        </n-form-item> -->
        <n-form-item>
          <n-button attr-type="button" type="primary" @click="handleValidateClick">
            搜索
          </n-button>
          <n-button attr-type="button" type="success" class="!ml-4" @click="addItem">
            创建代理
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
    <n-card title="财务管理">
      <AgentTable :data="list" :pagination="pagination" :loading="loading" @edit="editItem"></AgentTable>
    </n-card>

    <n-modal v-model:show="showModal" preset="dialog" title="用户充值" positive-text="确认" negative-text="算了"
      @positive-click="submitCallback">
      <n-form label-placement="left" :label-width="80" :model="rechargeForm">
        <n-form-item label="用户名" path="username" v-if="!isEdit">
          <n-input v-model:value="rechargeForm.username" clearable :show-button="false" placeholder="输入用户名"
            :precision="0" class="flex-1" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="rechargeForm.password" type="password" clearable :show-button="false"
            :placeholder="isEdit ? '如需更新密码，请输入密码' : '输入密码'" :precision="0" class="flex-1" show-password-on="click" />
        </n-form-item>
        <n-form-item label="占成比例" path="profitPercent">
          <n-input-number v-model:value="rechargeForm.profitPercent" clearable :show-button="false" placeholder="输入充值金币"
            class="flex-1" />
        </n-form-item>
      </n-form>
    </n-modal>

  </div>
</template>

<route lang="yaml">
meta:
  title: 代理管理
  icon: i-carbon:pedestrian-family
  order: 8
</route>
