<template>
  <div>
    <div class="wel-box w-full flex flex-col items-center justify-between">
      <Logo class="!h-30 !w-30" />
      <div class="text-darkBlue dark:text-garyWhite mb-4 mt-12 text-center text-2xl font-black">
        {{ title }}
      </div>
    </div>

    <div class="mt-4 w-full">
      <h2 class="pl-3 text-left text-4 font-black">
        常用功能
      </h2>
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item icon="refund-o" icon-color="#39a9ed" text="充值" to="/dashboard/detail" />
        <van-grid-item
          icon="after-sale"
          icon-color="rgb(255, 102, 0)"
          text="消费"
          to="/dashboard/detail"
        />
        <van-grid-item
          icon="vip-card-o"
          icon-color="rgb(82, 0, 104)"
          text="办会员"
          to="/member/add"
        />

        <van-grid-item
          icon="other-pay"
          icon-color="#39a9dd"
          text="充值记录"
          to="/dashboard/recharge"
        />
        <van-grid-item
          icon="balance-pay"
          icon-color="rgb(233, 122, 0)"
          text="消费记录"
          to="/dashboard/consume"
        />
        <van-grid-item icon="setting-o" icon-color="#3F4444" text="系统配置" to="/dashboard/dictConf" />
      </van-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobSetting } from '@/hooks/setting'
import Logo from '@/components/Logo.vue'

defineOptions({
  name: 'DashboardPage',
})

const globSetting = useGlobSetting()

const { title } = globSetting
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
