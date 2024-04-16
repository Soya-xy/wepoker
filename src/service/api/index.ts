import { alovaInstance } from '../request'

const api = alovaInstance()

export const loginApi = (e: any) => api.Post('/auth', e)
export const getOrderFlow = (e?: any) => api.Post<any>('/order_flow/query', e)
export const addOrderFlow = (e?: any) => api.Post<any>('/order_flow/insert', e)
