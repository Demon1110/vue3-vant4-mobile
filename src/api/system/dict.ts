import { http } from '@/utils/http/axios'

const modulePrefix = '/admin/system/dictItem'

export interface DictItemModel {
  id?: string | number
  label?: string
  value?: string
  sort?: number
  type: string
  remark?: string
}

/**
 * @description: 获取配置信息
 */
export function queryDictItem(data: any) {
  return http.request({
    url: `${modulePrefix}/query`,
    method: 'post',
    data,
  })
}

/**
 * @description: 修改配置信息
 */
export function updateDictItem(data: DictItemModel) {
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
 * @description: 新增配置信息
 */
export function addDictItem(data: DictItemModel) {
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
 * @description: 删除配置信息
 */
export function deleteDictItem(ids: any) {
  return http.request({
    url: `${modulePrefix}/delete`,
    method: 'delete',
    params: { ids },
  })
}
