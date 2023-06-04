<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @Description: 
-->
<script lang="ts" setup>
  import { useRoutesStore } from '@/store/modules/routes'
  import { translateTitle } from '@/utils/i18n'
  import { handleMatched } from '@/utils/routes'
  import { McRoute } from '/#/router'

  const route: McRoute = useRoute()

  const routesStore = useRoutesStore()
  const { getRoutes: routes } = storeToRefs(routesStore)

  const breadcrumbList = computed(() =>
    handleMatched(routes.value, route.path).filter(
      (item: any) => !item.meta.breadcrumbHidden
    )
  )
  const handleTo = (path: string | undefined = '') => {
    return { path }
  }
</script>

<template>
  <el-breadcrumb class="mc-breadcrumb" separator=">">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="index"
      :to="handleTo(item.redirect)"
    >
      <mc-icon
        v-if="item.meta.icon"
        :icon="item.meta.icon"
        :is-custom-svg="item.meta.isCustomSvg"
      />
      <span v-if="item.meta.title">{{ translateTitle(item.meta.title) }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
  .mc-breadcrumb {
    height: $base-nav-height;
    font-size: $base-font-size-default;
    line-height: $base-nav-height;

    :deep() {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-weight: normal;
          color: #515a6e;
          i,
          svg {
            margin-right: 3px;
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            a {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
