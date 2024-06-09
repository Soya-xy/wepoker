<script setup lang='ts'>
import banner from '../assets/login-banner.png'

const user = useUserStore()
const Message = useMessage()
const username = ref('')
const password = ref('')
const usernameError = ref('')
const passwordError = ref('')
const route = useRoute()

const model = ref({
  phone: '',
  username: '',
  password: '',
  verificationCode: '',
  confirmPass: '',
  inviteCode: '',
})

if (route.query) {
  if (route.query.agentCode) {
    model.value.inviteCode = (route.query.agentCode) as string
  }
}


function validatePasswordStartWith(
  rule: any,
  value: string
): boolean {
  return (
    !!model.value.password &&
    model.value.password.startsWith(value) &&
    model.value.password.length >= value.length
  )
}
function validatePasswordSame(rule: any, value: string): boolean {
  return value === model.value.password
}

const rules = ref({
  phone: [
    {
      required: true,
      trigger: ['input', 'blur'],
      message: '请输入手机号'
    }
  ],
  username: [
    {
      required: true,
      trigger: ['input', 'blur'],
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  verificationCode: [
    {
      required: true,
      message: '请输入验证码'
    }
  ],
  confirmPass: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
})
const message = useMessage()
const formRef = ref()

const second = ref(60)
const isSend = ref(false)
function getCode() {
  if (isSend.value) {
    return
  }
  if (!model.value.phone) {
    return message.error('请填写手机号')
  }
  getVerifyCode({
    sn: selectValue.value,
    phoneNum: model.value.phone
  }).then(res => {
    isSend.value = true
    message.success('验证码发送成功')
    let i = setInterval(() => {
      second.value--
      if (second.value === 0) {
        clearInterval(i)
        isSend.value = false
        second.value = 60
      }
    }, 1000)
  })
}

async function login() {
  const detail = await gameRegister({
    ...model.value,
    phone: '+' + selectValue.value + model.value.phone
  })
  if (detail.code === 200) {
    user.user = detail.data
    user.token = detail.data.token
    localStorage.setItem('user', JSON.stringify(user.user))
    localStorage.setItem('token', user.token)
    Message.success('注册成功')
    setTimeout(() => {
      location.href = `/`
    }, 500)
  }

  else {
    Message.error(detail.msg)
  }
}

function handleValidateButtonClick(e: any) {
  e.preventDefault()
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      console.log(model.value);
      login()
    }
  })
}
const selectOptions = [
  {
    value: '86',
    label: '+86'
  },
  {
    value: '852',
    label: '+852'
  },
  {
    value: '853',
    label: '+853'
  },
  {
    value: '886',
    label: '+886'
  },
  {
    value: '84',
    label: '+84'
  },
  {
    value: '7',
    label: '+7'
  }, {
    value: '355',
    label: '+355'
  }, {
    value: '213',
    label: '+213'
  }, {
    value: '376',
    label: '+376'
  }, {
    value: '684',
    label: '+684'
  },
  {
    value: '1264',
    label: '+1264'
  }
]

const selectValue = ref('86')

</script>

<template>
  <div>
    <section class="relative min-h-screen flex text-white">
      <!-- <img :src="logo" alt="logo" class="absolute left-5 top-5 z-10 hidden h-50px w-1/15 lg:block"> -->
      <div class="bg_img relative hidden w-1/3 items-center justify-center lg:flex">
        <div class="z-10 text-white">
          <h1 class="text-left text-5xl font-bold tracking-wide">
            代理平台
          </h1>
          <!-- <p class="my-4 text-3xl">
            {this.subTitle}
          </p> -->
          <img class="w-320px" :src="banner" alt="banner">
        </div>
      </div>
      <div
        class="z-0 w-full flex items-center justify-center bg-#F1F2F6 sm:bg-white px-0 text-center lg:w-2/3 md:px-16">
        <div class="z-20 w-full py-6">
          <h1 class="my-6 text-xl text-black">
            注册账号
          </h1>
          <div class="mx-auto w-full px-4 sm:w-2/3 lg:px-0">
            <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging">
              <n-form-item path="phone" label="手机号">
                <n-input-group>
                  <n-select placeholder="选择区号" :style="{ width: '50%' }" :options="selectOptions"
                    v-model:value="selectValue" />
                  <n-input v-model:value="model.phone" @keydown.enter.prevent />
                </n-input-group>
              </n-form-item>
              <n-form-item path="username" label="用户名">
                <n-input v-model:value="model.username" @keydown.enter.prevent />
              </n-form-item>
              <n-form-item path="password" label="密码">
                <n-input v-model:value="model.password" type="password" @keydown.enter.prevent />
              </n-form-item>
              <n-form-item first path="confirmPass" label="重复密码">
                <n-input v-model:value="model.confirmPass" :disabled="!model.password" type="password"
                  @keydown.enter.prevent />
              </n-form-item>
              <n-form-item path="verificationCode" label="验证码">
                <n-input-group>
                  <n-input v-model:value="model.verificationCode" @keydown.enter.prevent />
                  <n-button type="primary" @click="getCode" :disabled="isSend">
                    {{ isSend ? second + '秒后重新获取' : '获取验证码' }}
                  </n-button>
                </n-input-group>
              </n-form-item>
              <!-- <n-form-item path="inviteCode" label="推荐人">
                <n-input v-model:value="model.inviteCode" @keydown.enter.prevent />
              </n-form-item> -->
              <n-row :gutter="[0, 24]">
                <n-col :span="24">
                  <div style="display: flex;">
                    <n-button :disabled="model.verificationCode === null" round type="primary"
                      @click="handleValidateButtonClick" block>
                      注册
                    </n-button>
                  </div>
                </n-col>
              </n-row>
            </n-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
  hiddenMenu: true
</route>

<style scoped>
.bg_img {
  background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  background-size: 100% 100%;
}

.validation {
  position: absolute;
  padding: 20%;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: #0008;
}
</style>
