<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-12-28 10:14:24
 * @LastEditors: Do not edit
 * @Description: 
-->

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { toLoginRoute } from '@/utils/routes'
import { translateTitle } from '@/utils/i18n'
import { McRoute } from '/#/router'

const route: McRoute = useRoute()
const router = useRouter()

const userStore = useUserStore()
const { avatar, username } = storeToRefs(userStore)
const { logout } = userStore

const active = ref(false)
const hasLogin = ref(true)

const handleVisibleChange = (val: boolean) => {
  active.value = val
}
const handleCommand = async (command: string) => {
  switch (command) {
    case 'logout':
      await logout()
      await router.push(toLoginRoute(route.fullPath))
      break
    case 'personalCenter':
      await router.push('/center')
      break
  }
}
</script>

<template>
  <div v-if="username == '游客'" class="no-login">
    <router-link to="/login">
      {{ translateTitle('登录') }}
    </router-link>
  </div>
  <el-dropdown v-else @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="avatar" />
      <div class="user-name">
        <span class="hidden-xs-only">{{ username }}</span>
        <mc-icon class="mc-dropdown" :class="{ 'mc-dropdown-active': active }" icon="arrow-down-s-line" />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="personalCenter">
          <mc-icon icon="user-line" />
          <span>{{ translateTitle('我的工作台') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <mc-icon icon="logout-circle-r-line" />
          <span>{{ translateTitle('退出登录') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.no-login {
  color: #fff;
  margin: 0 20px;
  cursor: pointer;
}

.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  .user-avatar {
    width: 40px;
    height: 40px;
    margin-left: 15px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    height: 40px;
    margin-left: 6px;
    line-height: 40px;
    cursor: pointer;

    [class*='ri-'] {
      margin-left: 0 !important;
    }
  }
}
</style>
