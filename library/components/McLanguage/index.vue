<script lang="ts" setup>
import i18n from '@/locales/index'
import { useSettingsStore } from '@/store/modules/settings'
import getPageTitle from '@/utils/pageTitle'
import { McRoute } from '/#/router'


const route: McRoute = useRoute()

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
const { changeLanguage } = settingsStore

const handleCommand = (language: string) => {
  changeLanguage(language)
  // i18n.global.locale = language
  document.title = getPageTitle(route.meta.title)
}
</script>

<template>
  <el-dropdown v-if="theme.showLanguage" @command="handleCommand">
    <mc-icon icon="translate" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh-cn">中文简体</el-dropdown-item>
        <el-dropdown-item command="zh-tw">中文繁体</el-dropdown-item>
        <el-dropdown-item command="en-us">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
