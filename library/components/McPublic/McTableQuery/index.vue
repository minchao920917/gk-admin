<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div ref="containerRef" class="ht-table-query">
    <div class="ht-container-flex ht-options-wrap">
      <div class="ht-container-flex">
        <!-- 自定义按钮组 start-->
        <slot name="btns"></slot>
        <!-- 自定义按钮组 end-->
      </div>
      <slot name="advance"></slot>
    </div>
    <!-- 表格列 start-->
    <el-table
      border
      :data="tableData"
      :height="height"
      :size="'small'"
      stripe
      @selection-change="setSelectRows"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column
        align="center"
        label="序号"
        show-overflow-tooltip
        width="50"
      >
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>

      <!--  TODO element-plus未知原因不支持拖拽后宽度重新计算，暂时放弃 -->
      <el-table-column
        v-for="(item, index) in finallyColumns"
        :key="index"
        :align="'center'"
        :label="item.label"
        :prop="item.prop"
        :show-overflow-tooltip="item.tooltip || false"
        :sortable="item.sortable"
        :tooltip="item.sortable"
        :width="item.width || 'auto'"
      >
        <template #default="{ row }">
          <span>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <!-- 操作列 start -->
      <slot name="operation"></slot>
      <!-- 操作列 end -->

      <template #empty>
        <el-empty class="mc-data-empty" description="暂无数据" />
      </template>
    </el-table>
    <!-- 表格列 end-->
    <!-- 分页 start -->
    <el-pagination
      background
      :current-page="pagination.currentPage"
      :layout="'total, sizes, prev, pager, next, jumper'"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      small
      :total="pagination.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!-- 分页 end -->
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'McTableQuery',
  })
</script>

<script lang="ts" setup>
  import { defineProps, PropType } from 'vue'
  type column = {
    label: string
    prop: string
    tooltip: boolean
    sortable: boolean
    disableCheck: boolean
    width: string
  }
  const props = defineProps({
    // 高度
    height: {
      type: Number,
      default: 700,
    },
    // 表格数据源
    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 选中的列表
    checkList: {
      type: Array as unknown as PropType<[string | number]>,
      default: () => {
        return []
      },
    },
    // 列数据
    columnData: {
      type: Array as unknown as PropType<[column]>,
      default: () => {
        return []
      },
    },
    // 选中的表格列
    tableColumnSelected: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 分页信息
    pagination: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 100,
          pageSizes: [100, 200, 300, 400],
          total: 100,
        }
      },
    },
  })

  const finallyColumns = computed(() => {
    return props.columnData.filter((item: column) =>
      props.checkList.includes(item.label)
    )
  })

  console.log('finallyColumns', finallyColumns.value)
  const handleSizeChange = (val: number) => {
    console.log('handleSizeChange', val)
  }
  const handleCurrentChange = (val: number) => {
    console.log('handleCurrentChange', val)
  }
  const setSelectRows = (val: any) => {
    console.log('setSelectRows', val)
  }
</script>
<style lang="scss" scoped>
  .ht-table-query {
    :deep() {
      i {
        cursor: pointer;
      }
    }
  }
</style>
<style lang="scss">
  .ht-table-query {
    .ht-options-wrap {
      padding: 10px;
    }
    .el-table {
      tr,
      th,
      td {
        height: 20px !important;
        line-height: 20px !important;
        padding: 0 2px;
      }
      .cell {
        font-size: 12px !important;
      }
    }
  }
</style>
