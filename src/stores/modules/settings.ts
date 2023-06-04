/**
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import { SettingsModuleType } from '/#/store'
import { isJson } from '@/utils/validate'
import config from '@/config'

const {
  logo: _logo,
  title: _title,
  i18n,
  layout,
  themeName,
  background,
  columnStyle,
  fixedHeader,
  foldSidebar,
  menuWidth,
  showProgressBar,
  showTabs,
  showTabsIcon,
  showLanguage,
  showRefresh,
  showSearch,
  showTheme,
  showNotice,
  showFullScreen,
  showThemeSetting,
  showPageTransition,
  showLock,
  tabsBarStyle,
} = config

const defaultTheme: ThemeType = {
  layout,
  themeName,
  background,
  columnStyle,
  fixedHeader,
  foldSidebar,
  menuWidth,
  showProgressBar,
  showTabs,
  showTabsIcon,
  showLanguage,
  showRefresh,
  showSearch,
  showTheme,
  showNotice,
  showFullScreen,
  showThemeSetting,
  showPageTransition,
  showLock,
  tabsBarStyle,
}

const getLocalStorage = (key: string) => {
  const value: string | null = localStorage.getItem(key)
  return value && isJson(value) ? JSON.parse(value) : false
}

const theme = getLocalStorage('theme') || { ...defaultTheme }
const { collapse = foldSidebar } = getLocalStorage('collapse')
const { language = i18n } = getLocalStorage('language')
const { lock = false } = getLocalStorage('lock')
const { logo = _logo } = getLocalStorage('logo')
const { title = _title } = getLocalStorage('title')

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsModuleType => ({
    theme,
    device: 'desktop',
    collapse,
    language,
    lock,
    logo,
    title,
    echartsGraphic1: ['#3ED572', '#399efd'],
    echartsGraphic2: ['#399efd', '#8cc8ff'],
  }),
  getters: {
    getTheme: (state) => state.theme,
    getDevice: (state) => state.device,
    getCollapse: (state) => state.collapse,
    getLanguage: (state) => state.language,
    getLock: (state) => state.lock,
    getLogo: (state) => state.logo,
    getTitle: (state) => state.title,
  },
  actions: {
    updateState(obj: any) {
      Object.getOwnPropertyNames(obj).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this[key] = obj[key]
        localStorage.setItem(
          key,
          typeof obj[key] == 'string'
            ? `{"${key}":"${obj[key]}"}`
            : `{"${key}":${obj[key]}}`
        )
      })
    },
    saveTheme() {
      localStorage.setItem('theme', JSON.stringify(this.theme))
    },
    resetTheme() {
      this.theme = { ...defaultTheme }
      localStorage.removeItem('theme')
      this.updateTheme()
    },
    updateTheme() {
      const index = this.theme.themeName.indexOf('-')
      const themeName = this.theme.themeName.substring(0, index) || 'blue'


      import(`./../../styles/variables/mc-${themeName}-variables.module.scss`).then((vars) => {
        let variables = vars
        if (variables.default) variables = variables.default
        Object.keys(variables).forEach((key) => {
          if (key.startsWith('mc-')) {
            useCssVar(key.replace('mc-', '--el-'), ref(null)).value =
              variables[key]
          }
        })
        this.echartsGraphic1 = [
          variables['mc-color-transition'],
          variables['mc-color-primary'],
        ]

        this.echartsGraphic2 = [
          variables['mc-color-primary-light-5'],
          variables['mc-color-primary'],
        ]
      }).catch((err) => {
        console.error(` ${themeName}主题样式 加载失败 theme:`, err);
      });


      if (this.theme.menuWidth && this.theme.menuWidth.endsWith('px'))
        useCssVar('--el-left-menu-width', ref(null)).value =
          this.theme.menuWidth
      else useCssVar('--el-left-menu-width', ref(null)).value = '266px'



      const menuBackground =
        this.theme.themeName.split('-')[1] || this.theme.themeName
      document.getElementsByTagName(
        'body'
      )[0].className = `mc-theme-${menuBackground}`

      if (this.theme.background !== 'none') {
        document
          .getElementsByTagName('body')[0]
          .classList.add(this.theme.background)
      }
    },
    toggleCollapse() {
      this.collapse = !this.collapse
      localStorage.setItem('collapse', `{"collapse":${this.collapse}}`)
    },
    toggleDevice(device: string) {
      this.updateState({ device })
    },
    openSideBar() {
      this.updateState({ collapse: false })
    },
    foldSideBar() {
      this.updateState({ collapse: true })
    },
    changeLanguage(language: string) {
      this.updateState({ language })
    },
    handleLock() {
      this.updateState({ lock: true })
    },
    handleUnLock() {
      this.updateState({ lock: false })
    },
    changeLogo(logo: string) {
      this.updateState({ logo })
    },
    changeTitle(title: string) {
      this.updateState({ title })
    },
  },
})
