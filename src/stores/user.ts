import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref<any>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {})
  console.log("🚀 ~ useUserStore ~ user:", user)
  const station = ref<any>()
  const token = ref<any>(localStorage.getItem('token') || '')

  function setInfo(userInfo: any) {
    user.value = userInfo.user
    token.value = userInfo.token
    station.value = userInfo.station

    localStorage.setItem('user', JSON.stringify(user.value))
    localStorage.setItem('token', token.value)
    localStorage.setItem('station', JSON.stringify(station.value))
  }

  function logout() {
    user.value = undefined
    token.value = ''
    station.value = undefined

    localStorage.clear()
  }

  return {
    user,
    station,
    token,
    setInfo,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore as any, import.meta.hot))
