import { http } from '@/utils/http/axios'

const modulePrefix = '/member'

/**
 * @description: 获取会员信息
 */
export function queryMemberInfo() {
  return http.request({
    url: `${modulePrefix}/query`,
    method: 'post',
  })
}

/**
 * @description: 修改会员信息
 */
export function updateMemberInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/edit`,
    method: 'put',
    data,
  })
}

/**
 * @description: 新增会员信息
 */
export function addMemberInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/add`,
    method: 'post',
    data,
  })
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
