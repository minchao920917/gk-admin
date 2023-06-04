<script lang="ts">
import { getList } from "@/api/table";
import VueDraggable from "vuedraggable";
import { Delete, Plus, Search, Setting } from "@element-plus/icons-vue";
import Reject from "./reject.vue";

export default defineComponent({
  name: "Comments",
  components: {
    Reject,
    VueDraggable
  },
  setup() {
    const $baseConfirm: any = inject("$baseConfirm");
    const $baseMessage: any = inject("$baseMessage");
    const $baseTableHeight: any = inject("$baseTableHeight");

    const state = reactive({
      tableSortRef: null as any,
      rejectRef: null as any,
      border: true,
      height: $baseTableHeight(1),
      stripe: false,
      lineHeight: "small" as any,
      checkList: ["物资名称", "评论人", "评论内容", "状态", "时间"],
      columns: [
        {
          label: "物资名称",
          prop: "title",
          sortable: true,
          disableCheck: true
        },
        {
          label: "评论人",
          prop: "author",
          sortable: true
        },
        {
          label: "评论内容",
          prop: "content",
          sortable: true
        },
        {
          label: "状态",
          prop: "state",
          sortable: true
        },
        {
          label: "时间",
          prop: "datetime",
          sortable: true
        }
      ],
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      selectRows: [],
      queryForm: {
        pageNo: 1,
        pageSize: 20,
        title: ""
      }
    });

    const dragOptions = computed(() => {
      return {
        animation: 600,
        group: "description"
      };
    });

    const finallyColumns = computed(() => {
      return state.columns.filter(item => state.checkList.includes(item.label));
    });

    const fetchData = async () => {
      state.listLoading = true;
      const {
        data: { list, total }
      } = await getList(state.queryForm);
      state.list = list;
      const imageList = [];
      list.forEach((item: any) => {
        imageList.push(item.img);
      });
      state.total = total;
      state.listLoading = false;
    };
    const handleSizeChange = (val: any) => {
      state.queryForm.pageSize = val;
      fetchData();
    };
    const handleCurrentChange = (val: any) => {
      state.queryForm.pageNo = val;
      fetchData();
    };
    const queryData = () => {
      state.queryForm.pageNo = 1;
      fetchData();
    };

    const containerRef = ref();
    const { toggle, isFullscreen } = useFullscreen(containerRef);
    const clickFullScreen = () => {
      toggle().then(() => {
        handleHeight();
        state.tableSortRef.doLayout();
      });
    };
    const handleHeight = () => {
      if (isFullscreen.value) state.height = $baseTableHeight(1) + 200;
      else state.height = $baseTableHeight(1);
    };
    const setSelectRows = (val: any) => {
      state.selectRows = val;
      console.log("val", val);
    };

    /**
     * 批量通过
     */
    const handleApproveMore = () => {
      $baseConfirm("你确定要通过当前项吗", null, async () => {
        $baseMessage("通过审核成功", "success", "mc-hey-message-success");
      });
    };
    /**
     * 通过单行
     * @param row
     */
    const handleApprove = (row: any) => {
      console.log(row);
      $baseConfirm("你确定要通过当前项吗", null, async () => {
        $baseMessage("通过审核成功", "success", "mc-hey-message-success");
      });
    };
    /**
     * 批量拒绝
     */
    const handleRejectMore = () => {
      state.rejectRef.showDialog();
    };
    /**
     * 拒绝单行
     * @param row
     */
    const handleReject = (row: any) => {
      console.log(row);
      state.rejectRef.showDialog();
    };
    onMounted(() => {
      fetchData();
    });

    return {
      ...toRefs(state),
      dragOptions,
      containerRef,
      isFullscreen,
      finallyColumns,
      handleSizeChange,
      handleCurrentChange,
      queryData,
      handleHeight,
      setSelectRows,
      clickFullScreen,
      fetchData,
      handleApprove,
      handleApproveMore,
      handleReject,
      handleRejectMore,
      Plus,
      Delete,
      Search,
      Setting
    };
  }
});
</script>
<template>
  <div ref="containerRef" class="custom-table-container">
    <mc-query-form>
      <mc-query-form-left-panel>
        <el-form inline label-width="0" :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="物资名称" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="评论人" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" native-type="submit" type="primary" @click="queryData"> 查询 </el-button>

            <el-button :icon="Delete" type="primary" @click="handleApproveMore"> 批量通过 </el-button>
            <el-button :icon="Delete" type="danger" @click="handleRejectMore"> 批量拒绝 </el-button>
          </el-form-item>
        </el-form>
      </mc-query-form-left-panel>
      <mc-query-form-right-panel>
        <div class="stripe-panel">
          <el-checkbox v-model="stripe">斑马纹</el-checkbox>
        </div>
        <div class="border-panel">
          <el-checkbox v-model="border">边框（可拉伸列）</el-checkbox>
        </div>
        <el-button style="margin: 0 10px 10px 0 !important" text type="primary" @click="clickFullScreen">
          <mc-icon :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'" />
        </el-button>
        <el-popover popper-class="custom-table-radio" trigger="hover">
          <el-radio-group v-model="lineHeight">
            <el-radio label="large">大</el-radio>
            <el-radio label="default">中</el-radio>
            <el-radio label="small">小</el-radio>
          </el-radio-group>
          <template #reference>
            <el-button style="margin: 0 10px 10px 0 !important" text type="primary">
              <mc-icon icon="line-height" />
            </el-button>
          </template>
        </el-popover>
        <el-popover popper-class="custom-table-checkbox" trigger="hover">
          <template #reference>
            <el-button style="margin: 0 0 10px !important" text type="primary">
              <mc-icon icon="settings-line" />
            </el-button>
          </template>
          <el-checkbox-group v-model="checkList">
            <vue-draggable v-bind="dragOptions" item-key="{ element }" :list="columns">
              <template #item="{ element }">
                <div>
                  <mc-icon icon="drag-drop-line" />
                  <el-checkbox :disabled="element.disableCheck === true" :label="element.label">
                    {{ element.label }}
                  </el-checkbox>
                </div>
              </template>
            </vue-draggable>
          </el-checkbox-group>
        </el-popover>
      </mc-query-form-right-panel>
    </mc-query-form>

    <el-table
      ref="tableSortRef"
      v-loading="listLoading"
      :border="border"
      :data="list"
      :height="height"
      :size="lineHeight"
      :stripe="stripe"
      @selection-change="setSelectRows"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column align="center" label="序号" show-overflow-tooltip width="50">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>

      <!--  TODO element-plus未知原因不支持拖拽后宽度重新计算，暂时放弃 -->
      <el-table-column
        v-for="(item, index) in finallyColumns"
        :key="index"
        align="center"
        :label="item.label"
        :prop="item.prop"
        :sortable="item.sortable"
        width="auto"
      >
        <template #default="{ row }">
          <span v-if="item.label === '状态'">
            <span>待审批</span>
          </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" show-overflow-tooltip width="200">
        <template #default="{ row }">
          <el-button text type="primary" @click="handleApprove(row)"> 通过 </el-button>
          <el-button text type="primary" @click="handleReject(row)"> 拒绝 </el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty class="mc-data-empty" description="暂无数据" />
      </template>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <reject ref="rejectRef" @fetch-data="fetchData" />
  </div>
</template>
<style lang="scss" scoped>
.custom-table-container {
  margin-top: 10px;
  :deep() {
    i {
      cursor: pointer;
    }
  }
  .right-panel {
    .stripe-panel,
    .border-panel {
      margin: 0 10px $base-margin 0 !important;
      :deep() {
        .el-checkbox__label {
          margin-left: 0 !important;
        }
      }
    }
    [class*="ri"] {
      font-size: $base-font-size-big;
      color: var(--el-color-black);
    }
  }
}
</style>
<style lang="scss">
html body .custom-table-checkbox {
  [class*="ri"] {
    vertical-align: -0.5px !important;
    cursor: pointer;
  }
  .el-checkbox {
    margin: 5px 0 5px 8px;
  }
}
.custom-table-radio {
  width: 240px !important;
}
</style>
