<script lang="ts">
import { doDelete, getList } from '@/api/table'
import VueDraggable from 'vuedraggable'
import { Delete, Plus, Folder, Search, Setting } from '@element-plus/icons-vue'
import TableEdit from './TableEdit.vue'

export default defineComponent({
  name: 'CustomTable',
  components: {
    TableEdit,
    VueDraggable,
  },
  setup() {
    const $baseConfirm: any = inject('$baseConfirm')
    const $baseMessage: any = inject('$baseMessage')
    const $baseTableHeight: any = inject('$baseTableHeight')

    const state = reactive({
      tableSortRef: null as any,
      editRef: null as any,
      dialogImportVisible: false,
      height: $baseTableHeight(1),

      lineHeight: 'small' as any,
      checkList: ['物资名称', '发布人', '状态', '点击量', '时间'],
      columns: [
        {
          label: '物资名称',
          prop: 'title',
          sortable: true,
          disableCheck: true,
        },
        {
          label: '发布人',
          prop: 'author',
          sortable: true,
        },
        {
          label: '状态',
          prop: 'state',
          sortable: true,
        },
        {
          label: '时间',
          prop: 'datetime',
          sortable: true,
        },
      ],
      list: [],
      imageList: [],
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      selectRows: [],
      queryForm: {
        pageNo: 1,
        pageSize: 20,
        title: '',
      },
    })

    const dragOptions = computed(() => {
      return {
        animation: 600,
        group: 'description',
      }
    })
    const finallyColumns = computed(() => {
      return state.columns.filter((item) =>
        state.checkList.includes(item.label)
      )
    })

    const fetchData = async () => {
      state.listLoading = true
      const {
        data: { list, total },
      } = await getList(state.queryForm)
      state.list = list
      const imageList = []
      list.forEach((item: any) => {
        imageList.push(item.img)
      })
      state.total = total
      state.listLoading = false
    }
    const handleSizeChange = (val: number) => {
      state.queryForm.pageSize = val
      fetchData()
    }
    const handleCurrentChange = (val: number) => {
      state.queryForm.pageNo = val
      fetchData()
    }
    const queryData = () => {
      state.queryForm.pageNo = 1
      fetchData()
    }

    const containerRef = ref()
    const { toggle, isFullscreen } = useFullscreen(containerRef)
    const clickFullScreen = () => {
      toggle().then(() => {
        handleHeight()
        state.tableSortRef.doLayout()
      })
    }
    const handleHeight = () => {
      if (isFullscreen.value) state.height = $baseTableHeight(1) + 200
      else state.height = $baseTableHeight(1)
    }
    const setSelectRows = (val: any) => {
      state.selectRows = val
    }
    const handleAdd = () => {
      state.editRef.showEdit()
    }
    const handleEdit = (row: any) => {
      state.editRef.showEdit(row)
    }
    const handleDelete = (row: any) => {
      if (row.id) {
        $baseConfirm('你确定要删除当前项吗', null, async () => {
          const res: any = await doDelete({ ids: row.id })
          $baseMessage(res.msg, 'success', 'mc-hey-message-success')
          await fetchData()
        })
      } else {
        if (state.selectRows.length > 0) {
          const ids = state.selectRows.map((item: any) => item.id).join()
          $baseConfirm('你确定要删除选中项吗', null, async () => {
            const res: any = await doDelete({ ids: ids })
            $baseMessage(res.msg, 'success', 'mc-hey-message-success')
            await fetchData()
          })
        } else {
          $baseMessage('未选中任何行', 'error', 'mc-hey-message-error')
        }
      }
    }


    /**
   * 导入
   */
    const handleImport = () => {
      state.dialogImportVisible = true
    }
    /**
     * 明细上传
     * @param fileList 文件列表
     */
    const toUpload = (fileList: any) => {
      console.log(fileList)
      if (fileList.length > 0) {


        // importExcel({ id: route.query.id, file: fileList[0].raw }).then(
        //   ({ code }) => {
        //     if (code === 200) {
        //       $baseMessage('导入明细成功', 'success')
        //       closeUpload()
        //       fetchData(state.tempFormData)
        //     } else {
        //       $baseMessage('导入明细失败:', 'error')
        //     }
        //     loading.close()
        //   }
        // )
      }
    }

    /**
     * 打开附件上传弹框
     */
    const handleUpload = () => {
      state.dialogImportVisible = true
    }
    /**
     * 关闭附件上传弹框
     */
    const closeUpload = () => {
      state.dialogImportVisible = false
    }

    /**
   * 下载模板
   */
    const downTemplate = () => {
      // downloadTemplate({ type: 'ToIppAskPrice' }).then((res: any) => {
      //   const { headers, data } = res

      //   if (!data) {
      //     return
      //   }
      //   const link = document.createElement('a')
      //   let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
      //   link.style.display = 'none'
      //   link.href = URL.createObjectURL(blob)
      //   link.download =
      //     decodeURI(headers['content-disposition'].match(/filename=(.*)/)[1]) ||
      //     `智能采购-询价明细导入模板${new Date().getTime()}.xls` //下载的文件名，默认是 .xls 后缀
      //   link.click()
      // })
    }
    onMounted(() => {
      fetchData()
    })

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
      handleAdd,
      handleEdit,
      handleDelete,
      closeUpload,
      handleUpload,
      toUpload,
      downTemplate,
      Plus,
      Delete,
      Folder,
      Search,
      Setting,
    }
  },
})
</script>

<template>
  <div ref="containerRef" class="custom-table-container">
    <mc-query-form>
      <mc-query-form-left-panel>
        <el-form inline label-width="0" :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" native-type="submit" type="primary" @click="queryData">
              查询
            </el-button>
            <el-button :icon="Plus" type="primary" @click="handleAdd">
              添加
            </el-button>
            <el-button :icon="Delete" type="danger" @click="handleDelete($event)">
              删除
            </el-button>
            <el-button :icon="Folder" type="primary" @click="handleUpload">
              上传
            </el-button>
          </el-form-item>
        </el-form>
      </mc-query-form-left-panel>
      <mc-query-form-right-panel>
        <el-button text type="primary" @click="clickFullScreen">
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
            <el-button style="margin: 0 0 10px 0 !important" text type="primary">
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

    <el-table ref="tableSortRef" v-loading="listLoading" border :data="list" :height="height" :size="lineHeight" stripe
      @selection-change="setSelectRows">
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column align="center" label="序号" show-overflow-tooltip width="200">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>

      <!--  TODO element-plus未知原因不支持拖拽后宽度重新计算，暂时放弃 -->
      <el-table-column v-for="(item, index) in finallyColumns" :key="index" align="center" :label="item.label"
        :prop="item.prop" :sortable="item.sortable" width="auto">
        <template #default="{ row }">
          <span v-if="item.label === '状态'">
            <span>待审批</span>
          </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" show-overflow-tooltip width="200">
        <template #default="{ row }">
          <el-button text type="primary" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button text type="primary" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty class="mc-data-empty" description="暂无数据" />
      </template>
    </el-table>
    <el-pagination background :current-page="queryForm.pageNo" :layout="layout" :page-size="queryForm.pageSize"
      :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />

    <table-edit ref="editRef" @fetch-data="fetchData" />

    <!-- 上传导入 -->
    <mc-upload :dialog-upload-visible="dialogImportVisible" :limit="1" :title="'物资导入'" @close-upload="closeUpload"
      @to-upload="toUpload">
      <template #tip>
        <div>
          1、只能上传excel的文件且小于10M
          <br />
          2、一次只能上传一个文件, 新的文件会覆盖之前的文件
        </div>
      </template>
      <template #downTemplate>
        <el-button link :size="'small'" type="primary" @click="downTemplate">
          下载模板
        </el-button>
      </template>
    </mc-upload>
  </div>
</template>


<style lang="scss" scoped>
.custom-table-container {
  :deep() {
    i {
      cursor: pointer;
    }
  }

  .right-panel {

    .stripe-panel,
    .border-panel {
      margin: 0 10px #{math.div($base-margin, 2)} 10px !important;

      :deep() {
        .el-checkbox__label {
          margin-left: 0 !important;
        }
      }
    }

    [class*='ri'] {
      font-size: $base-font-size-big;
      color: var(--el-color-black);
    }
  }
}
</style>
<style lang="scss">
html body .custom-table-checkbox {
  [class*='ri'] {
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
