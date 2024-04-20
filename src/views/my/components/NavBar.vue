<template>
  <div>
    <van-nav-bar class="top-0 w-full !fixed" @click-left="router.back">
      <template #title>
        {{ getTitle }}
      </template>
      <template #left>
        <i class="i-ic:sharp-arrow-back-ios" text-xl />
      </template>
      <template #right>
        <slot name="right" />
      </template>
    </van-nav-bar>
    <div class="mb-15" />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const currentRoute = useRoute()

const getTitle = computed(() => currentRoute.meta.title as string)
</script>

<style scoped lang="less"></style>
