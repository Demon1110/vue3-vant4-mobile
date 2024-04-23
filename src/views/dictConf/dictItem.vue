<template>
  <div>
    <!-- <NavBar /> -->
    <van-cell-group inset :title="dictName || '系统配置'">
      <van-cell v-for="dictItem in dictItems" :key="dictItem.id" center :value="dictItem.value">
        <template #title>
          <div @click="showDialog(dictItem)">
            {{ dictItem.label }}
          </div>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="close" class="search-icon ml-4" @click.stop="deleteDict('2')" />
        </template>
      </van-cell>
      <van-button type="primary" block class="w-full" @click="showDialog({})">
        添加配置
      </van-button>
    </van-cell-group>

    <van-popup v-model:show="showEdit" round :style="{ padding: '30px 20px' }">
      <van-cell-group :title="form.id ? '编辑配置项' : '添加配置项'" inset>
        <van-form :model="form">
          <van-field v-model="form.label" label="名称" placeholder="请输入名称" />
          <van-field v-model="form.value" label="值" placeholder="请输入值" />
          <van-field v-model="form.remark" type="textarea" label="备注" placeholder="请输入备注" />
        </van-form>
        <van-button type="default" class="w-2/5 !mx-2" @click="showEdit = false">
          取消
        </van-button>
        <van-button type="primary" class="w-2/5 !mx-2" @click="showEdit = false">
          确定
        </van-button>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import type { DictItemModel } from '@/api/system/dict'

import {
  deleteDictItem,
  queryDictItem,
  updateDictItem,
} from '@/api/system/dict'

const props = defineProps({
  dictCode: {
    type: String,
    default: '',
  },
  dictName: {
    type: String,
    default: '',
  },
})

const showEdit = ref(false)
const defaultDict: DictItemModel = {
  id: '',
  label: '',
  value: '',
  remark: '',
}
const form = ref<DictItemModel>(defaultDict)

const dictItems = ref<DictItemModel[]>([])

function fetchData() {
  // 获取props传进来的dictCode
  queryDictItem({
    current: 1,
    size: 20,
    model: {
      type: props.dictCode,
    },
  }).then((res) => {
    dictItems.value = res.data
  })
}

function showDialog(dictItem: DictItemModel) {
  console.log(dictItem)
  form.value = defaultDict
  if (dictItem && dictItem.id) {
    form.value = dictItem
  }
  showEdit.value = true
}

function deleteDict(dictItemId: string) {
  console.log(dictItemId)
}

onMounted(() => {
  fetchData()
  // console.log("mounted", currentRoute.query);
})
</script>

<style scoped lang="less"></style>
