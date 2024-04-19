import { http } from '@/utils/http/axios'

const modulePrefix = '/admin'

export interface BasicResponseModel<T = any> {
  ts: number
  isSuccess: boolean
  code: number
  description: string
  data: T
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `${modulePrefix}/login`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    },
  )
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: `${modulePrefix}/getUserInfo`,
    method: 'get',
  })
}

/**
 * @description: 用户登出
 */
export function doLogout() {
  return http.request({
    url: `${modulePrefix}/logout`,
    method: 'get',
  })
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params: any) {
  return http.request(
    {
      url: `${modulePrefix}/changePassword`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    },
  )
}
