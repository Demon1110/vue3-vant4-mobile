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
      <van-button type="primary" block class="w-full" @click="showDialog({ type: '' })">
        添加配置
      </van-button>
    </van-cell-group>

    <van-popup v-if="showEdit" v-model:show="showEdit" round :style="{ padding: '30px 20px' }">
      <van-cell-group :title="form.id ? '编辑配置项' : '添加配置项'" inset>
        <van-form :model="form">
          <van-field v-model="form.label" label="名称" placeholder="请输入名称" />
          <van-field v-model="form.value" label="值" placeholder="请输入值" />
          <van-field v-model="form.remark" type="textarea" label="备注" placeholder="请输入备注" />
        </van-form>
        <van-button type="default" class="w-2/5 !mx-2" @click="showEdit = false">
          取消
        </van-button>
        <van-button type="primary" class="w-2/5 !mx-2" @click="saveOrEditDictItem">
          确定
        </van-button>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog, showToast } from 'vant'
import type { DictItemModel } from '@/api/system/dict'

import { addDictItem, deleteDictItem, queryDictItem, updateDictItem } from '@/api/system/dict'

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
  type: '',
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
  form.value.id = ''
  form.value.label = ''
  form.value.value = ''
  form.value.remark = ''
  form.value.type = props.dictCode as string
  if (dictItem) {
    form.value.id = dictItem.id
    form.value.label = dictItem.label
    form.value.value = dictItem.value
    form.value.remark = dictItem.remark
  }
  showEdit.value = true
}

function saveOrEditDictItem() {
  if (form.value.id) {
    updateDictItem(form.value).then(() => {
      showToast('修改成功')
      fetchData()
      showEdit.value = false
    })
  }
  else {
    addDictItem(form.value).then(() => {
      showToast('保存成功')
      fetchData()
      showEdit.value = false
    })
  }
}

function deleteDict(dictItemId: string) {
  console.log(dictItemId)
  showConfirmDialog({
    title: '确认删除',
    message: '确认删除该配置项吗？',
  })
    .then(() => {
      console.log('confirm')
      deleteDictItem(dictItemId).then(() => {
        fetchData()
      })
    })
    .catch(() => {
      console.log('cancel')
    })
}

onMounted(() => {
  fetchData()
  // console.log("mounted", currentRoute.query);
})
</script>

<style scoped lang="less"></style>
