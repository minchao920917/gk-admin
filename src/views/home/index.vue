<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-06-06 09:30:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-06-05 00:31:49
 * @FilePath: /mc-admin/src/views/login/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--常规布局 -->
<script lang="ts">
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";

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
  <el-container class="layout">
    <el-header>
      <div class="header-lf">
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/images/logo.png" alt="logo" />
          <span class="logo-text">闲置物资共享平台</span>
        </div>
        <ToolBarLeft />
      </div>
      <div class="header-ri">
        <ToolBarRight />
      </div>
    </el-header>
    <el-container class="classic-content">
      <search />
    </el-container>
  </el-container>
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
.el-container {
  width: 100%;
  height: 100%;
  :deep(.el-header) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px 0 0;
    background-color: #191a20;
    border-bottom: 1px solid #414243;
    .header-lf {
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      .logo {
        flex-shrink: 0;
        width: 210px;
        margin-right: 16px;
        .logo-img {
          width: 28px;
          object-fit: contain;
          margin-right: 6px;
        }
        .logo-text {
          font-size: 21.5px;
          font-weight: bold;
          color: #dadada;
          white-space: nowrap;
        }
      }
      .tool-bar-lf {
        .collapse-icon {
          color: #e5eaf3;
        }
        .el-breadcrumb__inner.is-link {
          color: #e5eaf3;
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .el-breadcrumb__item:last-child .el-breadcrumb__inner,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
          color: #cfd3dc;
        }
      }
    }
    .header-ri {
      .tool-bar-ri {
        .toolBar-icon,
        .username {
          color: #e5eaf3;
        }
      }
    }
  }
  .classic-content {
    display: flex;
    width: 100%;
    height: calc(100% - 55px);
    :deep(.el-aside) {
      width: auto;
      background-color: var(--el-menu-bg-color);
      border-right: 1px solid var(--el-border-color-light);
      .aside-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: width 0.3s ease;
        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }
    }
    .classic-main {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
