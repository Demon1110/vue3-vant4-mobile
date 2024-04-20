<template>
  <div class="mb-4 mt-4 w-full">
    <van-swipe class="my-swipe h-30" :autoplay="3000" :indicator-color="designStore.appTheme">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
  <van-cell />
  <van-grid :column-num="3" :gutter="10">
    <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
  </van-grid>
  <div class="h-screen flex flex-col items-center justify-center p-60px">
    <div class="wel-box w-full flex flex-col items-center justify-between">
      <Logo class="!h-30 !w-30" />
      <div class="text-darkBlue dark:text-garyWhite mb-4 mt-12 text-center text-2xl font-black">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { useGlobSetting } from '@/hooks/setting'
import Logo from '@/components/Logo.vue'

defineOptions({
  name: 'DashboardPage',
})

const designStore = useDesignSettingStore()
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
