<template>
  <div class="">
    <NavBar />
    <div class="member-info">
      <div class="head">
        <van-cell :value="memberInfo.mobile" center>
          <!-- 使用 title 插槽来自定义头像 -->
          <template #icon>
            <div class="h-15 w-15 flex items-center justify-center rounded-full bg-fuchsia-300 text-4xl text-gray-500">
              <span>{{ firstName }}</span>
            </div>
          </template>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="ml-3 text-left align-middle">
              <span class="text-base text-gray-600 font-bold">{{ memberInfo.userName }}</span>
              <van-tag class="align-text-top !text-10px" type="warning">
                VIP1
              </van-tag>
            </div>
          </template>
        </van-cell>
      </div>
      <div class="info mt-1 text-center">
        <van-grid :border="false" :column-num="3">
          <van-grid-item>
            <div class="info-item">
              <div><van-rolling-text :start-num="0" :target-num="memberInfo.consumeTotal" stop-order="rtl" /></div>
              <div class="mt-2 text-gray-300">
                累计消费
              </div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="info-item">
              <div><van-rolling-text :start-num="0" :target-num="memberInfo.rechargeTotal" stop-order="rtl" /></div>
              <div class="mt-2 text-gray-300">
                累计充值
              </div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="info-item">
              <div><van-rolling-text :start-num="10" :target-num="balance" :duration="0" stop-order="rtl" /></div>
              <div class="mt-2 text-gray-300">
                余额
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="mt-2">
      <van-tabs v-model:active="active">
        <van-tab title="消费">
          <consume :member-id="$route.query.id" :show-nav-bar="false" :show-search="false" />
        </van-tab>
        <van-tab title="充值">
          <recharge :member-id="$route.query.id" :show-nav-bar="false" :show-search="false" />
        </van-tab>
      </van-tabs>
    </div>
    <van-watermark content="会员中心" opacity="0.3" :width="80" :full-page="false" />
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/views/my/components/NavBar.vue'
import consume from '@/views/dashboard/consume.vue'
import recharge from '@/views/dashboard/recharge.vue'

import type { MemberModel } from '@/api/system/member'
import { detailMemberInfo } from '@/api/system/member'

const route = useRoute()

const active = ref(0)
const balance = ref(0)
const memberInfo = ref<MemberModel>({
  userName: '',
  mobile: '',
  vipType: 1,
  consumeTotal: 1,
  rechargeTotal: 0,
})
const firstName = computed(() => {
  if (memberInfo.value.userName && memberInfo.value.userName.length > 1) {
    return memberInfo.value.userName.split('')[0]
  }
  return ''
})

onMounted(() => {
  detailMemberInfo({ memberId: route.query?.id })
    .then((res) => {
      console.log(res)
      memberInfo.value = res.data.member
      const tempNul = (memberInfo.value.rechargeTotal || 0) - (memberInfo.value.consumeTotal || 0)
      if (tempNul < 0) {
        balance.value = 0
      }
      else {
        balance.value = tempNul
      }
    })
})
</script>

<style lang="less" scoped>
.van-watermark {
  position: absolute;
  height: 85%;
  top: 60px;
}
</style>
