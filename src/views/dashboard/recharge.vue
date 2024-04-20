<template>
  <div class="h-full">
    <NavBar />
    <van-sticky :offset-top="48">
      <van-search
        v-model="keyword"
        shape="round"
        autofocus
        placeholder="请输入会员名称或手机号"
        @search="fetchData"
      />
    </van-sticky>
    <template v-if="items.length > 0">
      <div class="h-4/5">
        <van-pull-refresh v-model="loading" class="h-full" @refresh="onRefresh">
          <van-list
            v-model:loading="listLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="(item, index) in items" :key="index" class="item">
              <van-cell-group inset>
                <van-swipe-cell>
                  <van-cell center :border="true" is-link :value="item.mobile">
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                      <div>
                        <span class="custom-title pr-1 font-size-4 font-600">{{
                          item.userName
                        }}</span>
                      </div>
                    </template>
                    <template #label>
                      <van-row class="!font-size-3">
                        <van-col span="24">
                          <span class="">充值类型：{{ item.chargeType }}</span>
                        </van-col>
                        <van-col span="24">
                          <span class="">充值时间：{{ handlerDate(item.createdDatetime) }}</span>
                        </van-col>
                      </van-row>
                    </template>
                    <template #value>
                      <span class="custom-title pr-1 font-size-4 font-600">{{ item.mobile }}</span>
                      <van-row class="van-cell__label !font-size-3">
                        <van-col span="24">
                          <span>充值金额：{{ item.amount || 0 }}</span>
                        </van-col>
                        <van-col span="24">
                          <span class="van-ellipsis">备注：{{ item.remark || "0" }}</span>
                        </van-col>
                      </van-row>
                    </template>
                  </van-cell>
                </van-swipe-cell>
              </van-cell-group>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </template>

    <div v-else class="item">
      <van-cell-group inset>
        <van-empty
          image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          description="暂无充值记录"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handlerDate } from '@/utils/dateUtil'

import type { MemberRechargeModel } from '@/api/system/memberRecharge'
import { queryMemberRechargeInfo } from '@/api/system/memberRecharge'
import NavBar from '@/views/my/components/NavBar.vue'

const listLoading = ref(false)
const loading = ref(false)
const finished = ref(false)
const keyword = ref('')
const currentPage = ref(1)
const items = ref<MemberRechargeModel[]>([])
// 获取数据
function fetchData() {
  queryMemberRechargeInfo({
    current: currentPage.value,
    size: 10,
    model: {},
    extra: {
      keyword: keyword.value,
    },
  })
    .then((res) => {
      if (currentPage.value === 1) {
        items.value = res.data
      }
      else {
        items.value.push(...res.data)
      }
      if (currentPage.value * 10 >= res.count) {
        finished.value = true
      }
    })
    .finally(() => {
      setTimeout(() => {
        listLoading.value = false
      }, 200)
      setTimeout(() => {
        loading.value = false
      }, 500)
    })
}

function onLoad() {
  if (!finished.value) {
    currentPage.value += 1
    fetchData()
  }
}
function onRefresh() {
  currentPage.value = 1
  items.value = []
  fetchData()
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
