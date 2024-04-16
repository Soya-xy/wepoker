import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import { createDiscreteApi } from 'naive-ui'
import { router } from '~/modules/router'

const baseURL = 'http://frp.xiaoyio.com/agentApi'
// const baseURL = 'https://frp.xiaoyio.com'
const { message } = createDiscreteApi(['message'])
export function alovaInstance(base = baseURL) {
  return createAlova({
    baseURL: base,
    statesHook: VueHook,
    // requestAdapter: mockAdapter,
    requestAdapter: GlobalFetch(),
    beforeRequest(method) {
      const token = localStorage.getItem('token')
      if (token)
        method.config.headers.Authorization = `Bearer ${token}`
    },
    responded: {
      onSuccess: async (res, method) => {
        const data = await res.json()
        if (res.status === 401)
          return router.replace('/login')

        if (res.status) {
          try {
            if (data?.err) {
              message.error(data.err)
              throw new Error(data.err)
            }
          }
          catch (err) {
            throw new Error(res.statusText)
          }
        }
        else {
          if (data?.err) {
            message.error(data.err)
            throw new Error(data.err)
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

        return (data?.msg ? data.msg : data) as any
      },
      onError: (err, method) => {
        console.log('🚀 ~ alovaInstance ~ err, method:', err, method)
      },
    },
  })
}

// upload alova instance
export const uploadAlova = createAlova({
  baseURL,
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),
})
