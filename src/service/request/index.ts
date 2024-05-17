import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import { createDiscreteApi } from 'naive-ui'
import { router } from '~/modules/router'

// const baseURL = '/agentApi'
// const baseURL = 'https://frp.xiaoyio.com'
const baseURL = 'https://admin.ttp8088.xyz/agentApi'
// const baseURL = 'http://127.0.0.1:8081/agentApi'
const { message } = createDiscreteApi(['message'])
export function alovaInstance(base = baseURL) {
  return createAlova({
    baseURL: base,
    statesHook: VueHook,
    // requestAdapter: mockAdapter,
    requestAdapter: GlobalFetch(),
    beforeRequest(method) {
      const token = localStorage.getItem('token')
      console.log("🚀 ~ beforeRequest ~ token:", token)
      if (token)
        method.config.headers.Authorization = `Bearer ${token}`
    },
    responded: {
      onSuccess: async (res, method) => {
        const data = await res.json()
        
        if (res.status === 401)
          return router.replace('/login')


        if (res.status !== 200) {
          console.log(data);
          
          try {
            if (data?.msg) {
              message.error(data.msg)
              throw new Error(data.msg)
            }else if(data?.message){
              message.error(data.message)
              throw new Error(data.message)
            }
          }
          catch (err) {
            throw new Error(res.statusText)
          }
        }

        switch (method.meta?.type) {
          case 'text':
            return await res.text()
          case 'blob':
            return await res.blob()
        }
        const contentType = res.headers.get('content-type')
        if (!contentType?.includes('json'))
          throw new Error(`invalid content type: ${contentType}`)

        return data as any
      },
      onError: (err, method) => {
        console.log('🚀 ~ alovaInstance ~ err, method:', err, method)
      },
    },
    localCache: null

  })
}

// upload alova instance
export const uploadAlova = createAlova({
  baseURL,
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),
})
