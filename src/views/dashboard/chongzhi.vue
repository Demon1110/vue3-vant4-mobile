<template>
  <div>
    <NavBar v-if="showNavBar" />
    <van-form ref="formRef" @submit="submit">
      <van-field
        v-model="form.userName" label="姓名" input-align="right" is-link placeholder="请选择会员" required readonly
        :center="true" :rules="formRules.userName" maxlength="10" @click="selectMember"
      />
      <van-field
        v-model="form.mobile" label="手机号" input-align="right" placeholder="会员手机号" readonly type="tel"
        :center="true" maxlength="11"
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
  </div>
</template>

<script setup lang="ts">
import type {
  MemberRechargeModel,
} from '@/api/system/memberRecharge'
import {
  addMemberRechargeInfo,
} from '@/api/system/memberRecharge'
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

const form: MemberRechargeModel = reactive({
  memberId: -1,
  userName: '',
  mobile: '',
  amount: 0,
  remark: '',
})
const formRules = {
  amount: [
    { required: true, message: '请输入充值金额', trigger: 'blur' },
    {
      validator: (value: number) => value >= 1 && value <= 1000000,
      message: '充值金额必须在1-1000000之间',
      trigger: 'blur',
    },
  ],
  userName: [{ required: true, message: '请选择会员', trigger: 'blur' }],
}

watch(amountVal, (val, oldVal) => {
  console.log('wwwwclog', val, oldVal)
  form.amount = Number.parseFloat(val) || 0
})

const numberKeyboardShow = ref(false)
const actionSheetShow = ref(false)

function submit() {
  console.log(amountVal)
  // addMemberRechargeInfo(form).then(() => {
  //       console.log('充值成功');
  //     });
}

function selectMember() {
  actionSheetShow.value = true
}

function onItemClick(item: MemberModel) {
  form.memberId = item.id
  form.userName = item.userName
  form.mobile = item.mobile
  actionSheetShow.value = false
}

onMounted(() => {})
</script>

<style scoped lang="less"></style>
