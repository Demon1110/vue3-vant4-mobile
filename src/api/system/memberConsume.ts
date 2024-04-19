import { http } from '@/utils/http/axios'

const modulePrefix = '/memberConsume'

/**
 * @description: 获取会员消费信息
 */
export function queryMemberConsumeInfo() {
  return http.request({
    url: `${modulePrefix}/query`,
    method: 'post',
  })
}

/**
 * @description: 修改会员消费信息
 */
export function updateMemberConsumeInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/edit`,
    method: 'put',
    data,
  })
}

/**
 * @description: 新增会员消费信息
 */
export function addMemberConsumeInfo(data: any) {
  return http.request({
    url: `${modulePrefix}/add`,
    method: 'post',
    data,
  })
}

/**
 * @description: 删除会员消费信息
 */
export function deleteMemberConsumeInfo(ids: any) {
  return http.request({
    url: `${modulePrefix}/delete`,
    method: 'delete',
    params: { ids },
  })
}
