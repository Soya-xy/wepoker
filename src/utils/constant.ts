export const carColor = '蓝色,黄色,黑色,白色,绿色,红色,渐变绿色,黄绿双拼色,蓝白渐变色,临时牌照,未确定'.split(',').map(v => ({ label: v, value: v }))
export const vehicleType = '一型客车,二型客车,三型客车,四型客车,一型货车,二型货车,三型货车,四型货车,五型货车,六型货车,一型专项作业车,二型专项作业车,三型专项作业车,四型专项作业车,五型专项作业车,六型专项作业车'.split(',').map(v => ({ label: v, value: v }))
export const goverStyle = '部平台,省平台,现场治理,省级追缴名单,部级追缴名单,升档,专案(专项)治理'.split(',').map(v => ({ label: v, value: v }))
export const flowStatus = '待发起,待派发,待处理,已完成'.split(',').map(v => ({ label: v, value: v }))
