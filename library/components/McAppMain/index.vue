<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @Description: 
-->
<script lang="ts" setup>
import { useRoutesStore } from '@/store/modules/routes'
import { handleActivePath } from '@/utils/routes'
import { McRoute } from '/#/router'

const route: McRoute = useRoute()

const routesStore: any = useRoutesStore()
const { tab, activeMenu } = storeToRefs(routesStore)

watch(
  route,
  () => {
    // if (tab.value.data !== route.matched[0].name)
    //   tab.value.data = route.matched[0].name
    // activeMenu.value.data = handleActivePath(route)
  },
  { immediate: true }
)
</script>

<template>
  <div class="mc-app-main">
    <section>
      <McRouterView />
    </section>
  </div>
</template>
