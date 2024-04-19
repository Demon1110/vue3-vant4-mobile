<template>
  <div class="my-4">
    <van-search v-model="value" shape="round" autofocus placeholder="请输入会员名称或手机号" @search="onSearch" />
    <template v-if="items.length > 0">
      <div v-for="(item, index) in items" :key="index" class="item">
        <van-cell-group inset>
          <van-swipe-cell>
            <van-cell :border="true" is-link :value="item.phone">
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <span class="custom-title pr-1 font-size-4 font-600">{{ item.name }}</span>
                <van-tag v-if="item.cardNo" plain type="primary" class="!font-size-2">
                  {{ item.cardNo }}
                </van-tag>
              </template>
              <template #label>
                <van-row>
                  <van-col span="12">
                    offset: 12, span: 12
                  </van-col>
                  <van-col span="12">
                    offset: 12, span: 12
                  </van-col>
                </van-row>
              </template>
            </van-cell>
            <template #right>
              <van-button class="h-100%" square type="primary" text="收藏" />
              <van-button class="h-100%" square type="danger" text="删除" />
            </template>
          </van-swipe-cell>
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
const value = ref('')
const items = ref([{ name: '张三', cardNo: 'A0001', phone: '13800138000' }, { name: '李四', phone: '13800138001' }])

function onSearch(value: string) {
  console.log(value)
}
</script>

<style scoped lang="less">
.item {
  margin-top: 10px;
}
</style>
