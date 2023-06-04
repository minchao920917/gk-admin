<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @Description: 
-->
<template>
  <el-row class="mc-query-form" :gutter="0">
    <slot />
  </el-row>
</template>

<style lang="scss" scoped>
// @use 'sass:math';

@mixin panel {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  min-height: $base-input-height;
  margin: 0 0 #{math.div($base-margin, 2)} 0;

  .el-form-item__content {
    display: flex;
    align-items: center;
  }

  >.el-button {
    margin: 0 10px #{math.div($base-margin, 2)} 0 !important;
  }
}

.mc-query-form {
  :deep() {
    .el-form-item:first-child {
      margin: 0 0 #{math.div($base-margin, 2)} 0 !important;
    }

    .el-form-item+.el-form-item {
      margin: 0 0 #{math.div($base-margin, 2)} 0 !important;

      .el-button {
        margin: 0 0 0 10px !important;
      }
    }

    .top-panel {
      @include panel;
    }

    .bottom-panel {
      @include panel;
      border-top: 1px solid #dcdfe6;
    }

    .left-panel {
      @include panel;
    }

    .right-panel {
      @include panel;
      justify-content: flex-end;
    }
  }
}
</style>
