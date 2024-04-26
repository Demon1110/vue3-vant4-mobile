<template>
  <div class="min-h-80">
    <van-sticky :offset-top="48">
      <van-search v-model="keyword" shape="round" autofocus placeholder="请输入会员名称或手机号" @update:model-value="fetchData" />
    </van-sticky>
    <template v-if="items.length > 0">
      <div v-for="(item, index) in items" :key="index" class="item">
        <van-cell-group inset>
          <van-cell
            :border="true" is-link
            center :value="item.mobile" @click="onItemClick(item)"
          >
            <template #title>
              <!-- :title="item.userName+ '  余额（' + ((item.rechargeTotal||0)-(item.consumeTotal||0))+'）'" -->
              <span class="inline-block min-w-10">{{ item.userName }}</span>
              <span class="text-sky-400">    余额({{ ((item.rechargeTotal || 0) - (item.consumeTotal || 0)) }})</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </template>

    <div v-else class="item">
      <van-cell-group inset>
        <van-empty
          image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
          description="暂无人员"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MemberModel } from '@/api/system/member'
import { queryMemberInfo } from '@/api/system/member'

const emit = defineEmits(['onItemClick'])

const keyword = ref('')
const items = ref<MemberModel[]>([])
// 获取数据
function fetchData() {
  queryMemberInfo({
    current: 1,
    size: 5,
    model: {},
    extra: {
      keyword: keyword.value,
    },
  })
    .then((res) => {
      items.value = res.data
    })
}

function onItemClick(item: MemberModel) {
  // 跳转到会员详情页面
  // router.push({ name: 'MemberDetail', params: { id: item.id } })
  emit('onItemClick', item)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="less">
.item {
  margin-top: 10px;
}
</style>
