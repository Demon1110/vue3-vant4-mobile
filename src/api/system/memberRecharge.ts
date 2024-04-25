import { http } from '@/utils/http/axios'

const modulePrefix = '/memberRecharge'

export interface MemberRechargeModel {
  id?: string | number
  memberId?: string | number
  userName?: string
  mobile?: string
  chargeType?: string
  amount?: number
  remark?: string
  del?: string | boolean
  creator?: number
  createdDatetime?: string
}
/**
 * @description: 获取会员充值信息
 */
export function queryMemberRechargeInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/queryMobile`,
    method: 'post',
    data,
  })
}

/**
 * @description: 充值
 */
export function addMemberRechargeInfo(data: any) {
  return http.request(
    {
      url: `${modulePrefix}/add`,
      method: 'post',
      data,
    },
    {
      isTransformResponse: true,
    },
  )
}
