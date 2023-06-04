<template>
  <div class="ht-table-transfer-box" :style="{ width, height }">
    <!-- 左侧表格 -->
    <div class="transfer-left">
      <div class="transfer-title">
        <span>{{ leftTitle }}</span>
        <span class="total">
          {{ state.leftSelected.length }}/{{ leftDataList.length }}
        </span>
      </div>
      <div class="transfer-main">
        <!-- 左侧查询条件 start -->
        <div v-if="$slots['left-query']" class="slot-query">
          <slot name="left-query"></slot>
        </div>
        <!-- 左侧查询条件 end -->
        <!-- 左侧表格 start -->
        <el-table
          ref="leftMultipleTable"
          :border="true"
          :data="leftDataList"
          :height="tableHeight"
          highlight-current-row
          @row-click="leftRowClick"
          @selection-change="leftSelectChange"
        >
          <el-table-column type="selection" width="40" />

          <el-table-column
            v-for="item in columnData"
            :key="item"
            :label="item.label"
            :prop="item.prop"
            :show-overflow-tooltip="item.tooltip || false"
            :sortable="item.sortable || false"
            :width="item.width || 'auto'"
          />
        </el-table>
        <!-- 左侧表格 end -->

        <div v-if="$slots['left-footer']" class="slot-footer">
          <slot name="left-footer"></slot>
        </div>
      </div>
    </div>
    <!-- 穿梭区 按钮框 -->
    <div class="transfer-center right-list-center">
      <el-button
        class="btn"
        :disabled="state.leftSelected.length == 0"
        type="primary"
        @click="listToRight()"
      >
        {{ rightButtonText }}
        <mc-icon icon="arrow-right-s-line" />
      </el-button>
      <el-button
        class="btn"
        :disabled="state.rightSelected.length == 0"
        type="primary"
        @click="listToLeft()"
      >
        <mc-icon icon="arrow-left-s-line" />
        {{ leftButtonText }}
      </el-button>
    </div>
    <!-- 右侧列表区 -->
    <div class="transfer-right">
      <div class="transfer-title">
        <span>{{ rightTitle }}</span>
        <span class="total">
          {{ state.rightSelected.length }}/{{ state.rightDataList.length }}
        </span>
      </div>
      <div class="transfer-main">
        <!-- 右侧查询条件 start -->
        <div v-if="$slots['right-query']" class="slot-query">
          <slot name="right-query"></slot>
        </div>
        <!-- 右侧查询条件 end -->
        <!-- 右侧表格 start -->
        <el-table
          ref="rightMultipleTable"
          :border="true"
          :data="state.rightDataList"
          :height="tableHeight"
          highlight-current-row
          @row-click="rightRowClick"
          @selection-change="rightSelectChange"
        >
          <el-table-column type="selection" width="40" />

          <el-table-column
            v-for="item in columnData"
            :key="item"
            :label="item.label"
            :prop="item.prop"
            :show-overflow-tooltip="item.tooltip || false"
            :sortable="item.sortable || false"
            :width="item.width || 'auto'"
          />
        </el-table>
        <!-- 右侧表格 end -->

        <div v-if="$slots['right-footer']" class="slot-footer">
          <slot name="right-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'McTableTransfer', //这个⾮常重要，就是未来你放到其他项⽬中，组件标签的名字，⽐如：<mc-form></mc-form>
  }
</script>

<script lang="ts" setup>
  import { ref, PropType } from 'vue' //useSlots  markRaw
  import { ElTable } from 'element-plus'
  const props = defineProps({
    // 表格唯一的key
    nodeKey: {
      type: String,
      default: 'id',
    },
    // 宽度
    width: {
      type: String,
      default: '800px',
    },
    // 高度
    height: {
      type: String,
      default: '500px',
    },
    // 高度
    tableHeight: {
      type: String,
      default: '500px',
    },
    // 标题
    titles: {
      type: Array,
      default: () => ['源数据', '目标源数据'],
    },
    // 左侧数据
    columnData: {
      type: Array as unknown as PropType<[any]>,
      default: () => [],
    },
    // 左侧数据
    leftDataList: {
      type: Array,
      default: () => [],
    },
    // 右侧数据
    targetList: {
      type: Array,
      default: () => [],
    },
    // 穿梭按钮文案
    buttonTexts: {
      type: Array,
      default: () => ['移除', '关联'],
    },
  })

  // data

  const state = reactive({
    leftSelected: [] as any[], // 左侧选中的数据
    rightSelected: [] as any[], // 右侧选中的数据
    oldOpera: [] as any[],
    rightDataList: props.targetList as any[],
  })

  // computed
  const leftTitle = computed(() => {
    const [text] = props.titles
    return text
  })
  const rightTitle = computed(() => {
    const [, text] = props.titles
    return text
  })
  const leftButtonText = computed(() => {
    const [text] = props.buttonTexts
    return text
  })
  const rightButtonText = computed(() => {
    const [, text] = props.buttonTexts
    return text
  })

  // methods
  const leftMultipleTable = ref<InstanceType<typeof ElTable>>()
  const rightMultipleTable = ref<InstanceType<typeof ElTable>>()
  const $baseMessage: any = inject('$baseMessage')
  const emit = defineEmits(['setTargetList'])
  // 左侧数据选择
  const leftSelectChange = (items: any) => {
    state.leftSelected = [...items].concat(state.oldOpera)
  }
  // 右侧数据选择
  const rightSelectChange = (items: any) => {
    state.rightSelected = [...items]
  }
  // 穿梭操作
  const listToRight = () => {
    if (state.leftSelected.length === 0) {
      return $baseMessage('请先选择数据再添加', 'warning')
    } else if (state.rightDataList.length === 0) {
      state.rightDataList = [...state.leftSelected]
    } else {
      const dataList: any[] = state.rightDataList.concat(state.leftSelected)
      const obj = {}
      const list = []
      for (var i = 0; i < dataList.length; i++) {
        if (!obj[dataList[i][props.nodeKey]]) {
          list.push(dataList[i])
          obj[dataList[i][props.nodeKey]] = true
        } else {
          if (document.getElementsByClassName('el-message').length === 0) {
            $baseMessage('含有重复的数据，已过滤添加', 'warning')
          }
        }
      }
      state.rightDataList = [...list]
    }
    state.oldOpera = []
    leftMultipleTable.value?.clearSelection()
    emit('setTargetList', state.rightDataList)
  }

  // 右侧列表选中的数据回穿
  const listToLeft = () => {
    if (state.rightSelected.length === 0) {
      return $baseMessage('请先选择已添加的数据进行移除', 'warning')
    }
    for (let i = 0; i < state.rightDataList.length; i++) {
      for (let j = 0; j < state.rightSelected.length; j++) {
        if (
          state.rightDataList[i][props.nodeKey] ===
          state.rightSelected[j][props.nodeKey]
        ) {
          state.rightDataList.splice(i, 1)
          i--
          break
        }
      }
    }
    emit('setTargetList', state.rightDataList)
  }
  // 左表格行点击事件
  const leftRowClick = (row: any) => {
    const selected = state.leftSelected.some(
      (item) => item[props.nodeKey] === row[props.nodeKey]
    ) // 是取消选择还是选中
    if (!selected) {
      // 不包含   代表选择
      state.leftSelected.push(row)
      leftMultipleTable.value &&
        leftMultipleTable.value?.toggleRowSelection(row, true)
    } else {
      // 取消选择
      var finalArr = state.leftSelected.filter((item) => {
        return item[props.nodeKey] !== row[props.nodeKey]
      })
      state.leftSelected = finalArr // 取消后剩余选中的

      leftMultipleTable.value?.toggleRowSelection(row, false)
    }
  }
  // 右表格行点击事件
  const rightRowClick = (row: any) => {
    const selected = state.rightSelected.some(
      (item) => item[props.nodeKey] === row[props.nodeKey]
    ) // 是取消选择还是选中
    if (!selected) {
      // 不包含   代表选择
      state.rightSelected.push(row)
      rightMultipleTable.value?.toggleRowSelection(row, true)
    } else {
      // 取消选择
      var finalArr = state.rightSelected.filter((item) => {
        return item[props.nodeKey] !== row[props.nodeKey]
      })
      state.rightSelected = finalArr // 取消后剩余选中的

      rightMultipleTable.value?.toggleRowSelection(row, false)
    }
  }
</script>

<style lang="scss" scoped>
  .ht-table-transfer-box {
    position: relative;
    overflow: hidden;

    .el-table {
      min-width: 100%;
      display: inline-block !important;
    }
    .transfer-left {
      position: absolute;
      top: 0;
      left: 0;
    }
    .transfer-right {
      position: absolute;
      top: 0;
      right: 0;
    }
    .transfer-main {
      height: calc(100% - 33px);
      box-sizing: border-box;
      overflow: auto;
      padding: 10px;

      .slot-query {
        margin-bottom: 10px;
      }
    }
    .transfer-left,
    .transfer-right {
      border: 1px solid #ebeef5;
      width: 46%;
      height: 90%;
      box-sizing: border-box;
      border-radius: 5px;
      vertical-align: middle;
    }
    .transfer-center {
      position: absolute;
      top: 50%;
      left: 40%;
      width: 20%;
      text-align: center;
      vertical-align: center;
    }
    .right-list-center {
      height: 100%;

      .btn {
        display: block;
        margin: 10px auto;
      }
    }
    .transfer-title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      color: #333;
      font-size: 16px;
      background-color: #f5f7fa;
      margin-top: 0;
    }
    .title-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .total {
      text-align: right;
      color: #909399;
      font-size: 12px;
    }
    .el-transfer-panel__item {
      padding-left: 6px;
    }
    .filter-input .el-input__inner {
      margin-bottom: 10px;
      height: 32px;
      width: 100%;
      font-size: 12px;
      display: inline-block;
      box-sizing: border-box;
      border-radius: 16px;
    }
    .el-input__icon {
      height: 32px;
    }
    .el-icon--left {
      margin-right: 0;
    }
    .el-icon--right {
      margin-left: 0;
    }
    .slot-footer {
      height: 32px;
      background: #fff;
      margin: 0;
      padding: 0;
      border-top: 1px solid #ebeef5;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      .el-pagination {
        justify-content: center;
        margin: 0 !important;
      }
    }
  }
</style>
<style lang="scss">
  .ht-table-transfer-box {
    .slot-footer {
      .el-pagination {
        margin: 0 !important;
      }
    }
  }
</style>
