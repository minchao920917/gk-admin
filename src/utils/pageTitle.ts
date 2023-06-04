
import pinia from '@/store'
import { useSettingsStore } from '@/store/modules/settings'
import config from '@/config'

const { titleReverse, titleSeparator } = config
/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle: string | undefined) {
  const { getTitle } = useSettingsStore(pinia)
  // const { t, te } = i18n.global
  // if (te(`adminI18n.${pageTitle}`)) pageTitle = t(`adminI18n.${pageTitle}`)
  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (getTitle) newTitles.push(getTitle)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join(titleSeparator)
}
