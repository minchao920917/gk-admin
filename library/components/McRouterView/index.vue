<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-12-27 16:18:21
 * @LastEditors: Do not edit
 * @Description: 
-->
<script lang="ts" setup>
import { useSettingsStore } from '@/store/modules/settings'
import { useTabsStore } from '@/store/modules/tabs'
import { handleActivePath } from '@/utils/routes'
import config from '@/config'
import { useHead } from '@vueuse/head'
import { McRoute, McRouteRecord } from '/#/router'
import Progress from 'nprogress'
const { keepAliveMaxNum } = config
const route: McRoute = useRoute()

const $sub: any = inject('$sub')
const $unsub: any = inject('$unsub')

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
const tabsStore = useTabsStore()
const { getVisitedRoutes: visitedRoutes } = storeToRefs(tabsStore)

const componentRef = ref()
const routerKey = ref()
const keepAliveNameList = ref()

const siteData = reactive({
  description: '',
})

useHead({
  meta: [
    {
      name: `description`,
      content: computed(() => siteData.description),
    },
  ],
})

const updateKeepAliveNameList = (refreshRouteName = null) => {
  keepAliveNameList.value = visitedRoutes.value
    .filter(
      (item: McRouteRecord) =>
        !item.meta.noKeepAlive && item.name !== refreshRouteName
    )
    .flatMap((item: McRouteRecord) => item.name)
}

// 更新KeepAlive缓存页面
watchEffect(() => {
  routerKey.value = handleActivePath(route, true)
  updateKeepAliveNameList()
  siteData.description = `${'Vue'} ${'Admin'} ${'Plus'}-${route.meta.title
    }简介、官网、首页、文档和下载 - 前端开发框架`
})

$sub('get-code', () => {
  window.open(`http://minchao.me/`)
})

$sub('reload-router-view', (refreshRouteName: any = route.name) => {
  if (theme.value.showProgressBar) Progress.start()
  const cacheActivePath = routerKey.value
  routerKey.value = null
  updateKeepAliveNameList(refreshRouteName)
  nextTick(() => {
    routerKey.value = cacheActivePath
    updateKeepAliveNameList()
  })
  setTimeout(() => {
    if (theme.value.showProgressBar) Progress.done()
  }, 200)
})

onUnmounted(() => {
  $unsub('get-code')
  $unsub('reload-router-view')
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" :name="theme.showPageTransition ? 'fade-transform' : 'no-transform'">
      <keep-alive :include="keepAliveNameList" :max="keepAliveMaxNum">
        <component :is="Component" :key="routerKey" ref="componentRef" />
      </keep-alive>
    </transition>
  </router-view>
</template>
