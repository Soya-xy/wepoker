import { alovaInstance } from '../request'

const api = alovaInstance()

export const loginApi = (e: any) => api.Post<any>('/auth', e)
export const gameRegister = (e: any) => api.Post<any>('/gameRegister', e)
export const getVerifyCode = (params: any) => api.Get<any>('/getVerifyCode', { params })
export const indexApi = (params?: any) => api.Get<any>('/agentManage/stat', { params })
export const pageList = (params?: any) => api.Get<any>('/agentGameUserManage/pageList', { params })
export const financeManageList = (params?: any) => api.Get<any>('/financeManage/pageList', { params })
export const getUserInfo = (params?: any) => api.Get<any>('/agentManage/getUserInfo', { params })
export const agentList = (params?: any) => api.Get<any>('/agentManage/pageList', { params })
export const recharge = (e:any) => api.Post<any>('/financeManage/recharge', e)
export const createAgent = (e:any) => api.Post<any>('/agentManage/create', e)
export const updateAgent = (e:any) => api.Post<any>('/agentManage/update', e)
