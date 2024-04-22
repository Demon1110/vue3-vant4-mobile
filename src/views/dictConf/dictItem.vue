<template>
  <div>
    <!-- <NavBar /> -->
    <van-divider />
    <van-cell-group inset :title="dictName || '系统配置'">
      <van-cell center value="2">
        <template #title>
          <div @click="showDialog('2')">
            {{ '会员等级' }}
          </div>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="close" class="search-icon ml-4" @click="deleteDict('2')" />
        </template>
      </van-cell>
      <van-cell title="会员等级" center value="2" @click="showDialog('2')">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="close" class="search-icon ml-4" @click.stop="deleteDict('2')" />
        </template>
      </van-cell>
      <van-cell title="会员等级" center value="2" @click="showDialog('2')">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="close" class="search-icon ml-4" @click.stop="deleteDict('2')" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-popup v-model:show="showEdit" round :style="{ padding: '30px 20px' }">
      <van-cell-group title="编辑配置项" inset>
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
import type { DictModel } from '@/api/system/dict'

defineProps({
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
const defaultDict: DictModel = {
  id: '',
  label: '',
  value: '',
  remark: '',
}
const form = ref<DictModel>(defaultDict)

function showDialog(dictCode: string) {
  console.log(dictCode)
  form.value = defaultDict
  showEdit.value = true
}

function deleteDict(dictItemId: string) {
  console.log(dictItemId)
}

onMounted(() => {
  // console.log("mounted", currentRoute.query);
})
</script>

<style scoped lang="less"></style>
