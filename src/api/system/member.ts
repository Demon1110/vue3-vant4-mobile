import { http } from '@/utils/http/axios'

const modulePrefix = '/member'

export interface MemberModel {
  id?: string | number
  cardNo?: string
  vipType?: number
  userName: string
  mobile: string
  sex: string
  birthDay?: string
  remark?: string
  status?: string
  del?: string | boolean
  creator?: number
  rechargeTotal?: number
  consumeTotal?: number
  createdDatetime?: string
}

/**
 * @description: 获取会员信息
 */
export function queryMemberInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/queryMobile`,
    method: 'post',
    data,
  })
}

/**
 * @description: 修改会员信息
 */
export function updateMemberInfo(data: any) {
  return http.request(
    {
      url: `${modulePrefix}/edit`,
      method: 'put',
      data,
    },
    {
      isTransformResponse: true,
    },
  )
}

/**
 * @description: 新增会员信息
 */
export function addMemberInfo(data: any) {
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

/**
 * @description: 删除会员信息
 */
export function deleteMemberInfo(ids: any) {
  return http.request({
    url: `${modulePrefix}/delete`,
    method: 'delete',
    params: { ids },
  })
}
