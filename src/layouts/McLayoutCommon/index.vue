<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-12-28 08:32:32
 * @LastEditors: Do not edit
 * @Description: 
-->
<!--常规布局 -->
<script lang="ts" setup name="McLayoutCommon">
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
      <div v-if="false">
        <mc-side-bar layout="common" />
        <div
          v-show="showTabs"
          class="mc-main"
          :class="{
            'is-collapse-main': collapse
          }"
        >
          <!-- <mc-tabs layout="common" /> -->
        </div>
      </div>
    </div>
    <div class="mc-main main-padding">
      <mc-app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mc-layout-common {
  :deep() {
    .mc-tabs-content {
      width: calc(100% - 60px - #{$base-font-size-default} - #{$base-padding} - 2px) !important;
    }
    .mc-header {
      .mc-main {
        width: 100%;
        padding-right: 10px;
        margin: auto 0 auto $base-margin;
      }
    }
  }
}
</style>
