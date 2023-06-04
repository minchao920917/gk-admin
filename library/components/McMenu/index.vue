<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-12-27 16:18:21
 * @LastEditors: Do not edit
 * @Description: 
-->
<template>
  <component :is="menuComponent" v-if="!item.meta.hidden" :item-or-menu="item">
    <template v-if="item.children && item.children.length">
      <el-scrollbar v-if="(layout === 'horizontal' && item.children.length > 18) ||
        (layout !== 'horizontal' && collapse && item.children.length > 18)
        " class="mc-menu-children-height">
        <mc-menu v-for="route in item.children" :key="route.path" :item="route" />
      </el-scrollbar>
      <template v-else>
        <mc-menu v-for="route in item.children" :key="route.path" :item="route" />
      </template>
    </template>
  </component>
</template>

<script lang="ts">
/* 防止偶发性自动导入失败 */
import { computed, defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/modules/settings'

import McMenuItem from './components/McMenuItem.vue'
import McSubMenu from './components/McSubMenu.vue'

export default defineComponent({
  name: 'McMenu',
  components: {
    McMenuItem,
    McSubMenu,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    layout: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const settingsStore = useSettingsStore()
    const { collapse } = storeToRefs(settingsStore)

    const menuComponent = computed(() =>
      props.item.children &&
        props.item.children.some((_route: any) => {
          return _route.meta.hidden !== true
        })
        ? 'McSubMenu'
        : 'McMenuItem'
    )

    return {
      collapse,
      menuComponent,
    }
  },
})
</script>

<style lang="scss" scoped>
.mc-menu-children-height {
  height: 60vh !important;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>

<!--由于element-plus
bug使用popper-append-to-body=false会导致多级路由无法显示，故所有菜单必须生成至body下，样式必须放到body下-->
<style lang="scss">
.el-popper.is-light {
  border: 0 !important;
}
</style>
