import { http } from '@/utils/http/axios'

const modulePrefix = '/memberConsume'

export interface MemberConsumeModel {
  id?: string | number
  memberId?: number
  userName?: string
  mobile?: string
  comsumeType: string
  amount?: number
  remark?: string
  del?: string | boolean
  creator?: number
  createdDatetime?: string
}
/**
 * @description: 获取会员消费信息
 */
export function queryMemberConsumeInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/queryMobile`,
    method: 'post',
    data,
  })
}
