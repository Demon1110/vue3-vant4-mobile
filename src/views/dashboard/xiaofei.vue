<template>
  <div>
    <NavBar v-if="showNavBar" />
    <div class="!m-4">
      <van-form ref="formRef" class="flex flex-col" @submit="submit">
        <van-field
          v-model="form.userName" label="姓名" input-align="right" is-link placeholder="请选择会员" required readonly
          :center="true" :rules="formRules.userName" maxlength="10" @click="selectMember"
        />
        <van-field
          v-model="form.mobile" label="手机号" input-align="right" placeholder="会员手机号" readonly type="tel"
          :center="true" maxlength="11"
        />
        <van-field v-model="state.balance" label="可用余额" input-align="right" readonly type="tel" :center="true">
          <template #input>
            <span :class="{ 'text-red-500': state.balance < 50 }" class="text-base">{{ state.balance }}</span>
          </template>
        </van-field>
        <van-field
          v-model="form.comsumeType" label="消费类型" input-align="right" placeholder="请选择消费类型" required readonly
          is-link :center="true" :rules="formRules.comsumeType" @click="showGenderPicker = true"
        />
        <van-field
          v-model="form.amount" label="消费金额" input-align="right" placeholder="请输入消费金额" required readonly
          :center="true" :rules="formRules.amount" min="1" max="1000000" @touchstart.stop="numberKeyboardShow = true"
        />
        <van-field
          v-model="form.remark" label="备注" input-align="right" placeholder="请输入备注" maxlength="20"
          :center="true"
        />
        <van-button class="!mt-4" round type="primary" block native-type="submit">
          确定
        </van-button>
      </van-form>
    </div>

    <van-number-keyboard
      v-model="amountVal" :show="numberKeyboardShow" theme="custom" :extra-key="['00', '.']"
      close-button-text="完成" @blur="numberKeyboardShow = false"
    />

    <van-action-sheet v-model:show="actionSheetShow" title="查询会员">
      <search-member @select-member="selectMember" @on-item-click="onItemClick" />
    </van-action-sheet>

    <van-popup v-model:show="showGenderPicker" position="bottom" round>
      <van-picker
        v-model="state.comsumeType" visible-option-num="7" :columns="comsumeTypes"
        @confirm="handleComsumeType" @cancel="showGenderPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from 'vant'
import type { FormColumns } from '../my/pickColumns'
import type { MemberConsumeModel } from '@/api/system/memberConsume'
import { addMemberConsumeInfo } from '@/api/system/memberConsume'
import { queryDictItem } from '@/api/system/dict'
import NavBar from '@/views/my/components/NavBar.vue'
import searchMember from '@/views/example/member/searchMember.vue'
import type { MemberModel } from '@/api/system/member'
import router from '@/router'

defineProps({
  showNavBar: {
    type: Boolean,
    default: true,
  },
})

const amountVal = ref('0')
const formRef = ref<any>()
const state = reactive({
  comsumeType: [''],
  balance: 0,
})
const form: MemberConsumeModel = reactive({
  memberId: -1,
  userName: '',
  mobile: '',
  comsumeType: '',
  amount: 0,
  remark: '',
})

const comsumeTypes: FormColumns[] = []
const formRules = {
  amount: [
    { required: true, message: '请输入消费金额', trigger: 'blur' },
    {
      validator: (value: number) => value >= 1 && value <= 1000000,
      message: '消费金额必须在1-1000000之间',
      trigger: 'blur',
    },
    {
      validator: (value: number) => value >= 0 && state.balance - value >= 0,
      message: '消费金额必须小于可用余额',
      trigger: 'blur',
    },
  ],
  userName: [{ required: true, message: '请选择会员', trigger: 'blur' }],
  comsumeType: [{ required: true, message: '请选择消费类型', trigger: 'blur' }],
}

watch(amountVal, (val, oldVal) => {
  if (val === oldVal) {
    return
  }
  form.amount = Number.parseFloat(val) || 0
})

const numberKeyboardShow = ref(false)
const actionSheetShow = ref(false)
const showGenderPicker = ref(false)

function submit() {
  console.log(amountVal)
  addMemberConsumeInfo(form).then((res) => {
    console.log(res)
    showSuccessToast('消费成功')
    setTimeout(() => {
      router.back()
    }, 1000)
  })
}

function selectMember() {
  actionSheetShow.value = true
}

function handleComsumeType(item: any) {
  console.log('wwwwclog', item)
  if (item && item.selectedOptions) {
    state.comsumeType = [item.selectedOptions[0].text]
    form.comsumeType = item.selectedOptions[0].text
    form.amount = Number.parseFloat(item.selectedOptions[0].value as string) || 0
  }
  showGenderPicker.value = false
}

function onItemClick(item: MemberModel) {
  console.log(item)
  form.memberId = item.id
  form.userName = item.userName
  form.mobile = item.mobile
  state.balance = (item.rechargeTotal || 0) - (item.consumeTotal || 0)
  actionSheetShow.value = false
}
function initData() {
  queryDictItem({
    current: 1,
    size: 20,
    model: {
      type: 'consumeType',
    },
  }).then((res) => {
    console.log(res)
    res.data.forEach((item) => {
      comsumeTypes.push({ text: item.label, value: item.value })
      if (item.isDefault === '1') {
        state.comsumeType = [item.label]
        form.comsumeType = item.label
        form.amount = Number.parseFloat(item.value) || 0
      }
    })
    //
  })
}

onMounted(() => {
  // 初始化消费类型
  initData()
})
</script>

<style scoped lang="less"></style>
