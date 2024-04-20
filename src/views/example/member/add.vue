<template>
  <div>
    <NavBar />
    <div class="px-6">
      <!-- 添加或修改会员，表单内容 -->
      <van-form ref="formRef" class="flex flex-col" @submit="submit">
        <van-cell-group inset class="enter-y !mx-0 !mb-10">
          <van-field
            v-model="formData.userName"
            label="姓名"
            label-align="center"
            name="username"
            placeholder="请输入姓名"
            required
            :rules="formRules.userName"
          />
          <van-field
            v-model="formData.mobile"
            label="手机号"
            label-align="center"
            placeholder="请输入手机号"
            type="tel"
            required
            :rules="formRules.mobile"
          />
          <!-- <van-field v-model="formData.vipType" label="会员类型" placeholder="请选择会员类型" /> -->
          <van-field label="性别" placeholder="请选择性别" label-align="center" required>
            <template #input>
              <van-radio-group v-model="formData.sex" direction="horizontal">
                <van-radio name="M">
                  男
                </van-radio>
                <van-radio name="F">
                  女
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="formData.birthDay"
            label-align="center"
            label="出生日期"
            placeholder="请选择出生日期"
            required
            :rules="formRules.birthDay"
            @click="showBirthdayPicker = true"
          />
          <van-field
            v-if="!formData.id"
            v-model="formData.rechargeTotal"
            label-align="center"
            label="充值金额"
            placeholder="请输入充值金额，单位：元"
          />
          <van-field
            v-model="formData.remark"
            label-align="center"
            label="备注"
            placeholder="请输入备注"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            show-word-limit
          />
        </van-cell-group>
        <van-button block type="primary" native-type="submit" :loading="loading">
          提交
        </van-button>
      </van-form>
    </div>

    <van-popup v-model:show="showBirthdayPicker" position="bottom">
      <van-date-picker
        v-model="datePicker"
        :min-date="minDate"
        @confirm="onConfirm"
        @cancel="showBirthdayPicker = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { showToast } from 'vant'
import type { MemberModel } from '@/api/system/member'
import { addMemberInfo, updateMemberInfo } from '@/api/system/member'
import router from '@/router'
import NavBar from '@/views/my/components/NavBar.vue'

const loading = ref(false)
const showBirthdayPicker = ref(false)
const formRef = ref<any>()
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() + 1
const day = today.getDate()
const datePicker = ref<string[]>([`${year - 25}`, `${month}`, `${day}`])
// 定义30年轻的date
const minDate = new Date(1980, 0, 1)

const formRules = {
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  userName: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 4, message: '姓名长度在2到4个字符', trigger: 'blur' },
  ],
  birthDay: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
}
const formData = ref<MemberModel>({
  userName: '',
  mobile: '',
  sex: 'M',
  birthDay: '',
  remark: '',
  rechargeTotal: undefined,
})

function onConfirm({ selectedValues }) {
  formData.value.birthDay = selectedValues.join('-')
  showBirthdayPicker.value = false
}

function submit() {
  console.log(formData.value)
  loading.value = true
  if (formData.value.id) {
    // 更新会员信息
    updateMemberInfo(formData.value)
      .then(() => {
        loading.value = false
        router.push('/example/index')
      })
      .catch((err) => {
        showToast(err.message)
        loading.value = false
      })
  }
  else {
    // 新增会员信息
    addMemberInfo(formData.value)
      .then(() => {
        loading.value = false
        router.push('/example/index')
      })
      .catch((err) => {
        showToast(err.message)
        loading.value = false
      })
  }
}

onMounted(() => {
  // 获取路由参数
  const routerParam = router.currentRoute.value.query
  console.log('wwwwclog', router.currentRoute.value)
  if (routerParam.id) {
    // 编辑会员信息
    formData.value = {
      ...formData.value,
      id: routerParam.id as string,
      userName: routerParam.userName as string,
      mobile: routerParam.mobile as string,
      sex: routerParam.sex as string,
      birthDay: routerParam.birthDay as string,
      remark: routerParam.remark as string,
    }
  }
})
</script>

<style lang="less" scoped></style>
