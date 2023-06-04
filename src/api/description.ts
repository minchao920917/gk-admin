/*
 * @Author: 闵超 499790879@qq.com
 * @Date: 2023-01-18 10:22:17
 * @LastEditors: Do not edit
 * @Description:
 */
import request from '@/utils/request'

export function getList(index: any) {
  return request({
    url: '/description/getList',
    method: 'get',
    params: { index },
  })
}
