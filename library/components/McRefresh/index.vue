<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @Description: 
-->
<script lang="ts" setup>
  import { useSettingsStore } from '@/store/modules/settings'

  const $pub: any = inject('$pub')

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)

  const refreshRoute = () => {
    $pub('reload-router-view')
  }
</script>

<template>
  <mc-icon v-if="theme.showRefresh" icon="refresh-line" @click="refreshRoute" />
</template>
