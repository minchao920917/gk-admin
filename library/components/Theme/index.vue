<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-12-28 10:14:24
 * @LastEditors: Do not edit
 * @Description: 
-->
<script lang="ts" setup>
  import { useSettingsStore } from '@/store/modules/settings'

  const $pub: any = inject('$pub')

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)

  const handleOpenTheme = () => {
    $pub('theme')
  }
</script>

<template>
  <span v-if="theme.showTheme" class="mc-theme">
    <mc-icon icon="more-2-line" @click="handleOpenTheme" />
  </span>
</template>
