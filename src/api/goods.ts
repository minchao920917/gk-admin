/*
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @Description:
 */
import request from '@/utils/request'

export function getList(params: any) {
  return request({
    url: '/goods/getList',
    method: 'get',
    params,
  })
}
