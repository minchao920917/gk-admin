<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-02-16 16:37:40
 * @FilePath: /mc-admin/src/views/login/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--常规布局 -->
<script lang="ts">
import search from "./components/search.vue";
export default defineComponent({
  components: {
    search
  }
});
</script>
<script lang="ts" setup>
defineProps({
  collapse: {
    type: Boolean,
    default() {
      return false;
    }
  },
  fixedHeader: {
    type: Boolean,
    default() {
      return true;
    }
  },
  showTabs: {
    type: Boolean,
    default() {
      return true;
    }
  },
  device: {
    type: String,
    default() {
      return "desktop";
    }
  }
});
</script>

<template>
  <div
    class="mc-layout-common"
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs
    }"
  >
    <div
      class="mc-layout-header"
      :class="{
        'fixed-header': fixedHeader
      }"
    >
      <mc-header layout="common" />
    </div>
    <div class="mc-main-guide">
      <search />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mc-layout-common {
  :deep() {
    .mc-header {
      .mc-main {
        width: 100%;
        padding-right: 10px;
        margin: auto 0 auto $base-margin;
      }
    }
  }
}
.mc-main-guide {
  width: 100%;
}
</style>
