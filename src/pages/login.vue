<script setup lang='ts'>
import banner from '../assets/login-banner.png'

const user = useUserStore()
const Message = useMessage()
const username = ref('')
const password = ref('')
const usernameError = ref('')
const passwordError = ref('')
async function login() {
  if (!username.value)
    usernameError.value = '请输入账号'
  else
    usernameError.value = ''

  if (!password.value) {
    passwordError.value = '请输入密码'
    return
  }
  else {
    passwordError.value = ''
  }

  const detail = await loginApi({
    username: username.value,
    password: password.value,
  })
  if (detail.code === 200) {
    user.user = detail.data
    user.token = detail.data.token
    localStorage.setItem('user',JSON.stringify(user.user))
    localStorage.setItem('token',user.token)
    Message.success('登录成功')
    setTimeout(() => {
      location.href = `/`
    }, 500)
  }

  else {
    Message.error(detail.msg)
  }
}
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
      <div class="z-0 w-full flex items-center justify-center bg-white px-0 text-center lg:w-2/3 md:px-16">
        <div class="z-20 w-full py-6">
          <h1 class="my-6 text-xl text-black">
            登录平台
          </h1>
          <div class="mx-auto w-full px-4 sm:w-2/3 lg:px-0">
            <div class="pb-2 pt-4">
              <input
                v-model="username" class="block w-full rounded-sm bg-[#f2f3f5] p-4 text-lg text-black" type="text"
                name="username" placeholder="账号"
              >
            </div>

            <div v-if="usernameError" class="text-left text-sm text-red-500">
              {{ usernameError }}
            </div>

            <div class="pb-2 pt-4">
              <input
                v-model="password" class="block w-full rounded-sm bg-[#f2f3f5] p-4 text-lg text-black"
                type="password" name="password" placeholder="密码"
              >
            </div>

            <div v-if="passwordError" class="text-left text-sm text-red-500">
              {{ passwordError }}
            </div>
            <div class="px-4 pb-2 pt-4">
              <button
                class="block w-full rounded-full bg-indigo-500 p-4 text-lg uppercase hover:bg-indigo-600 focus:outline-none"
                @click="login"
              >
                <div class="flex items-center justify-center space-x-2">
                  <span>登录</span>
                </div>
              </button>
            </div>
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
