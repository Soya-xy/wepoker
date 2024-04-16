import dayjs from 'dayjs'

// 后台utc 时间格式处理
export function getTime(value: any, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!value)
    return ''
  const t = dayjs(value)
  return t.isValid() ? t.format(format) : value
}

export function getDay(value: any, format = 'YYYY-MM-DD') {
  if (value)
    return dayjs(value).format(format)
  else return dayjs().format(format)
}

// 判断两个时间段是否有交集
export function isDateIntersection(a: any, b: any, x: any, y: any) {
  const times1 = []
  const times2 = []
  if (a < b) {
    // 未跨天
    times1.push([a, b])
  }
  else {
    // 跨天
    times1.push([a, '24:00:00'], ['00:00:00', b])
  }

  if (x < y)
    times2.push([x, y])

  else
    times2.push([x, '24:00:00'], ['00:00:00', y])

  let flag = false
  // 循环比较时间段是否冲突
  for (let i = 0; i < times1.length; i++) {
    if (flag)
      break
    for (let j = 0; j < times2.length; j++) {
      if (check(times1[i][0], times1[i][1], times2[j][0], times2[j][1])) {
        flag = true
        break
      }
    }
  }
  if (flag) {
    // alert("发生冲突");
    return false
  }
  else {
    // alert("没有冲突");
    return true
  }
}

function check(a: any, b: any, x: any, y: any) {
  // if(y<=a || b<=x){
  if (getTodayTime(y) <= getTodayTime(a) || getTodayTime(b) <= getTodayTime(x))
    return false

  else
    return true
}

function getTodayTime(time = '00:00:00') {
  const today = new Date()
  const [hour, minute, second] = time.split(':')
  today.setHours(Number(hour))
  today.setMinutes(Number(minute))
  today.setSeconds(Number(second))
  return today.getTime()
}

// 获取指定天的凌晨0点时间
export function getDayTime(day: any) {
  return dayjs(day).set('hour', 0).set('minute', 0).set('second', 0).toJSON()
}
