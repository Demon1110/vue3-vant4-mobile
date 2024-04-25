<template>
  <div class="p-4">
    <NavBar v-if="showNavBar" />
    <van-form ref="formRef" class="flex flex-col" @submit="submit">
      <van-field
        v-model="form.userName" label="姓名" input-align="right" is-link placeholder="请选择会员" required readonly
        :center="true" :rules="formRules.userName" maxlength="10" @click="selectMember"
      />
      <van-field
        v-model="form.mobile" label="手机号" input-align="right" placeholder="会员手机号" readonly type="tel"
        :center="true" maxlength="11"
      />
      <van-field
        v-model="form.comsumeTypeName" label="消费类型" input-align="right" placeholder="请选择消费类型" required readonly
        is-link :center="true" :rules="formRules.comsumeType" @click="showGenderPicker = true"
      />
      <van-field
        v-model="form.amount" label="充值金额" input-align="right" placeholder="请输入充值金额" required readonly
        :center="true" :rules="formRules.amount" min="1" max="1000000" @touchstart.stop="numberKeyboardShow = true"
      />
      <van-field
        v-model="form.remark" label="备注" input-align="right" placeholder="请输入备注" maxlength="20"
        :center="true"
      />
      <van-button class="!mt-4" round type="primary" block native-type="submit">
        充值
      </van-button>
    </van-form>

    <van-number-keyboard
      v-model="amountVal" :show="numberKeyboardShow" theme="custom" :extra-key="['00', '.']"
      close-button-text="完成" @blur="numberKeyboardShow = false"
    />

    <van-action-sheet v-model:show="actionSheetShow" title="查询会员">
      <search-member @select-member="selectMember" @on-item-click="onItemClick" />
    </van-action-sheet>

    <van-popup v-model:show="showGenderPicker" position="bottom" round>
      <van-picker
        v-model="state.comsumeType" visible-option-num="4" :columns="comsumeTypes"
        @confirm="handleComsumeType" @cancel="showGenderPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import type { FormColumns } from '../my/pickColumns'
import type { MemberConsumeModel } from '@/api/system/memberConsume'
import { addMemberConsumeInfo } from '@/api/system/memberConsume'
import NavBar from '@/views/my/components/NavBar.vue'
import searchMember from '@/views/example/member/searchMember.vue'
import type { MemberModel } from '@/api/system/member'

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
})
const form: MemberConsumeModel = reactive({
  memberId: -1,
  userName: '',
  mobile: '',
  comsumeType: '',
  comsumeTypeName: '',
  amount: 0,
  remark: '',
})

const comsumeTypes: FormColumns[] = [
  { text: '充值', value: '1' },
  { text: '消费', value: '2' },
  { text: '退款', value: '3' },
]
const formRules = {
  amount: [
    { required: true, message: '请输入充值金额', trigger: 'blur' },
    { validator: (value: number) => value >= 1 && value <= 1000000, message: '充值金额必须在1-1000000之间', trigger: 'blur' },
  ],
  userName: [
    { required: true, message: '请选择会员', trigger: 'blur' },
  ],
  comsumeType: [
    { required: true, message: '请选择消费类型', trigger: 'blur' },
  ],
}

watch(amountVal, (val, oldVal) => {
  console.log('wwwwclog', val, oldVal)
  form.amount = Number.parseFloat(val) || 0
})

const numberKeyboardShow = ref(false)
const actionSheetShow = ref(false)
const showGenderPicker = ref(false)

function submit() {
  console.log(amountVal)
  // addMemberConsumeInfo(form).then(() => {
  //       console.log('充值成功');
  //     });
}

function selectMember() {
  actionSheetShow.value = true
}

function handleComsumeType(val: string) {
  form.comsumeType = val
  form.comsumeTypeName = ''
  showGenderPicker.value = false
}

function onItemClick(item: MemberModel) {
  form.memberId = item.id
  form.userName = item.userName
  form.mobile = item.mobile
  actionSheetShow.value = false
}

onMounted(() => {
  // 初始化消费类型
})
</script>

<style scoped lang="less"></style>
