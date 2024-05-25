<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { getTime } from '~/utils';

const message = useMessage()
const { user } = useUserStore()
const link = ref('http://localhost:5173/#/')
const info = ref<any>({
  coin: 0,
  memberCount: 0,
  todayProfit: 0,
  totalProfit: 0,
  sectionProfit: 0,
})

const { copy } = useClipboard({ source: link })


async function init(e?: any) {
  console.log("🚀 ~ init ~ e:", e)

  const res = await indexApi(e ? e : undefined)
  console.log("🚀 ~ init ~ res:", res)
  if (res.code === 200) {
    info.value = res.data
  }
}
function copyText() {
  try {
    copy(link.value)
    message.success('复制成功')

  } catch (error) {
    message.error('复制失败')
  }

}



const range = ref<[number, number]>([Date.now(), Date.now()])

function confirm(e: [number, number]) {
  init({
    startTime: getTime(e[0]),
    endTime: getTime(e[1])
  })
}

init()
</script>

<template>
  <div>
    <n-card title="代理信息">
      <div flex items-center mb-3>
        <p mr-5>搜索日期</p>
        <n-date-picker v-model:value="range" type="datetimerange" clearable w-100 @confirm="confirm" />
      </div>
      <n-space justify="space-between" align="center" :wrap-item="false">
        <div flex flex-col sm="flex-row" items-center w-full>
          <n-qr-code value="text" my-2 sm:my-0 />
          <div ml5>
            <p text-xl my3>当前账号：{{ user.username }}</p>
            <n-tag type="info">
              {{ link }}
              <template #avatar>
                <n-icon i-carbon:copy cursor-pointer @click="copyText" />
              </template>
            </n-tag>
          </div>
        </div>
        <n-statistic label="占成比例" tabular-nums>
          <n-number-animation :from="0.0" :to="Number(user.profitPercent)" :precision="2" />
        </n-statistic>
        <n-statistic label="会员数" tabular-nums>
          <n-number-animation :from="0.0" :to="Number(info.memberCount)" :precision="2" />
        </n-statistic>
        <n-statistic label="金币数" tabular-nums>
          <n-number-animation :from="0.0" :to="Number(info.coin)" :precision="2" />
        </n-statistic>
        <n-statistic label="今日盈亏" tabular-nums>
          <n-number-animation :from="0.0" :to="Number(info.todayProfit)" :precision="2" />
        </n-statistic>
        <n-statistic label="总盈亏" tabular-nums>
          <n-number-animation :from="0.0" :to="Number(info.totalProfit)" :precision="2" />
        </n-statistic>
        <n-statistic label="区间收益" tabular-nums>
          <n-number-animation :from="0.0" :to="Number(info.sectionProfit)" :precision="2" />
        </n-statistic>
      </n-space>
    </n-card>
  </div>
</template>

<route lang="yaml">
meta:
  title: 首页
  icon: i-mdi:home-variant
  order: 999
</route>
