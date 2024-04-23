<template>
  <div>
    <NavBar />
    <van-cell-group inset title="系统配置">
      <van-cell title="会员等级" is-link @click="toDictItem('memberLevel', '会员等级')">
        <template #icon>
          <van-icon class="!leading-normal" color="#ef4444" name="diamond-o" />
        </template>
      </van-cell>
      <van-cell icon="smile-o" title="消费类型" is-link @click="toDictItem('consumeType', '消费类型')">
        <template #icon>
          <van-icon class="!leading-normal" color="#38bdf8" name="diamond-o" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-popup
      v-if="dictCode && dictName" v-model:show="showPopup" position="bottom" round closeable
      close-icon-position="top-right"
      :style="{ height: '60%' }" @closed="closePopup"
    >
      <dict-item v-if="dictCode && dictName" :dict-code="dictCode" :dict-name="dictName" />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
// import router from '@/router'
import dictItem from './dictItem.vue'
import NavBar from '@/views/my/components/NavBar.vue'

const dictCode = ref('')
const dictName = ref('')

const showPopup = ref(false)

function toDictItem(dictCodeVal: string, dictNameVal: string) {
  console.log(dictCode)
  dictCode.value = dictCodeVal
  dictName.value = dictNameVal
  // router.push({ name: 'dictItemPage', query: { dictCode, dictName } })
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
  dictCode.value = ''
  dictName.value = ''
}
</script>

<style scoped lang="less"></style>
