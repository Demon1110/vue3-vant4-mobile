<template>
  <div class="">
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
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
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
                      <span class="custom-title inline-block w-15 pr-1 font-size-4 font-600">{{
                        item.userName
                      }}</span>
                      <van-tag v-if="item.cardNo" plain type="primary" class="!font-size-2">
                        {{ item.cardNo }}
                      </van-tag>
                    </div>
                  </template>
                  <template #label>
                    <van-row class="!font-size-3">
                      <van-col span="24">
                        <span class="">会员类型：{{ item.vipType }}</span>
                      </van-col>
                      <van-col span="24">
                        <span class="">创建时间：{{ handlerDate(item.createdDatetime) }}</span>
                      </van-col>
                    </van-row>
                  </template>
                  <template #value>
                    <span class="custom-title pr-1 font-size-4 font-600">{{ item.mobile }}</span>
                    <van-row class="van-cell__label !font-size-3">
                      <van-col span="24">
                        <span class="inline-block min-w-25 text-left">累计充值：{{ item.rechargeTotal || 0 }}</span>
                      </van-col>
                      <van-col span="24">
                        <span class="van-ellipsis inline-block min-w-25 text-left">累计消费：{{ item.consumeTotal || "0" }}</span>
                      </van-col>
                    </van-row>
                  </template>
                </van-cell>
                <template #right>
                  <van-button
                    class="!h-full"
                    square
                    type="primary"
                    text="编辑"
                    @click="handleEdit(item)"
                  />
                  <van-button
                    class="!h-full"
                    square
                    type="danger"
                    text="删除"
                    @click="handleDelete(item)"
                  />
                </template>
              </van-swipe-cell>
            </van-cell-group>
          </div>
        </van-list>
      </van-pull-refresh>
    </template>

    <div v-else class="item">
      <van-cell-group inset>
        <van-empty
          image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          description="暂无人员"
        />
      </van-cell-group>
    </div>

    <van-button
      class="van-fixed-top !bottom-15vh !right-12vw !scale-100"
      icon="plus"
      type="primary"
      to="/member/add"
    /><van-back-top right="12vw" bottom="10vh" />
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog, showToast } from 'vant'
import type { MemberModel } from '@/api/system/member'
import { handlerDate } from '@/utils/dateUtil'
import { deleteMemberInfo, queryMemberInfo } from '@/api/system/member'
import router from '@/router'

const loading = ref(false)
const listLoading = ref(false)
const finished = ref(false)
const keyword = ref('')
const currentPage = ref(1)
const items = ref<MemberModel[]>([])
// 获取数据
function fetchData() {
  queryMemberInfo({
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

// 编辑数据
function handleEdit(item: MemberModel) {
  console.log('handleEdit', item)
  // 跳转到编辑页面
  router.push({
    path: '/member/edit',
    query: {
      id: item.id,
      mobile: item.mobile,
      userName: item.userName,
      sex: item.sex,
      birthDay: item.birthDay,
      remark: item.remark,
    },
  })
}

// 删除数据
function handleDelete(item: MemberModel) {
  console.log('handleDelete', item)
  showConfirmDialog({
    title: '确认删除',
    message: `确认删除会员：${item.userName}？`,
  })
    .then(() => {
      console.log('confirm')
      deleteMemberInfo(item.id).then(() => {
        // 提示删除成功
        showToast('删除成功')
        items.value = items.value.filter(i => i.id !== item.id)
      })
    })
    .catch(() => {
      console.log('cancel')
    })
}

function onLoad() {
  console.log('wwwwclog load', listLoading.value)
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

.van-fixed-top {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--van-back-top-size);
  height: var(--van-back-top-size);
  right: var(--van-back-top-right);
  bottom: var(--van-back-top-bottom);
  cursor: pointer;
  color: var(--van-back-top-text-color);
  border-radius: var(--van-radius-max);
  box-shadow: 0 min(0.533vw, 3.2px) min(2.133vw, 12.8px) rgba(0, 0, 0, 0.12);
  transition: var(--van-duration-base) cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
