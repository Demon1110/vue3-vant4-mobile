import { http } from '@/utils/http/axios'

const modulePrefix = '/memberRecharge'

/**
 * @description: 获取会员充值信息
 */
export function queryMemberRechargeInfo() {
  return http.request({
    url: `${modulePrefix}/query`,
    method: 'post',
  })
}

/**
 * @description: 修改会员充值信息
 */
export function updateMemberRechargeInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/edit`,
    method: 'put',
    data,
  })
}

/**
 * @description: 新增会员充值信息
 */
export function addMemberRechargeInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/add`,
    method: 'post',
    data,
  })
}

/**
 * @description: 删除会员充值信息
 */
export function deleteMemberRechargeInfo(ids: any) {
  return http.request({
    url: `${modulePrefix}/delete`,
    method: 'delete',
    params: { ids },
  })
}
