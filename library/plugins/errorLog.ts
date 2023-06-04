/*
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @Description:
 */
import pinia from '@/store'
import { useErrorLogStore } from '@/store/modules/errorLog'
import config from '@/config'
import { isArray, isString } from '@/utils/validate'

const { errorLog } = config
export const needErrorLog = () => {
  let errorLogArray: any = []
  if (isArray(errorLog)) {
    errorLogArray = [...errorLog]
  } else if (isString(errorLog)) {
    errorLogArray = [...[errorLog]]
  }
  return errorLogArray.includes(process.env.NODE_ENV as string)
}

export const addErrorLog = (err: any) => {
  // eslint-disable-next-line no-console
  if (!err.isRequest) console.error('mc-admin错误拦截:', err)
  const url = window.location.href
  const { addErrorLog } = useErrorLogStore(pinia)
  addErrorLog({ err, url })
}

export function setup(app: any) {
  if (needErrorLog()) {
    app.config.errorHandler = addErrorLog
  }
}
