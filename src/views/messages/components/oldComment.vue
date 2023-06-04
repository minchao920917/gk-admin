<script lang="ts">
import { getList } from "@/api/list";
export default defineComponent({
  name: "OldComment",
  setup() {
    const router = useRouter();
    const state = reactive({
      list: [] as any,
      total: 0,
      queryForm: { pageNo: 1, pageSize: 20, title: "" },
      layout: "total, sizes, prev, pager, next, jumper",
      listLoading: true,
      emptyShow: true
    });

    const fetchData = async () => {
      state.listLoading = true;
      const {
        data: { list, total }
      } = await getList(state.queryForm);
      state.list = list;
      state.total = total;
      state.listLoading = false;
      state.emptyShow = false;
    };
    const toDetail = () => {
      console.log("1111", router);
      router.push({
        path: "detail"
      });
    };
    const handleSizeChange = (val: number) => {
      state.queryForm.pageSize = val;
      fetchData();
    };
    const handleCurrentChange = (val: number) => {
      state.queryForm.pageNo = val;
      fetchData();
    };
    const queryData = () => {
      state.queryForm.pageNo = 1;
      fetchData();
    };
    onMounted(() => {
      fetchData();
    });

    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      toDetail,
      queryData
    };
  }
});
</script>

<template>
  <div class="mc-main-container">
    <div class="list-container">
      <div class="result-wrap">
        <p>查询结果</p>
      </div>
      <el-row :gutter="20">
        <el-col v-if="emptyShow" :span="24">
          <el-empty class="mc-data-empty" description="暂无数据" />
        </el-col>
        <el-col :span="24">
          <ul v-loading="listLoading">
            <li v-for="(item, index) in list" :key="index" class="list-item">
              <div class="list-item-meta">
                <div class="list-item-meta-avatar">
                  <el-image :src="item.img" />
                </div>
                <div class="list-item-meta-content">
                  <div class="list-item-meta-title">
                    {{ item.title }}
                  </div>
                  <div class="list-item-meta-description">
                    {{ item.description }}
                  </div>
                </div>
                <div class="list-item-meta-content">
                  <div class="list-item-meta-item">
                    <span>时间</span>
                    <p>{{ item.datetime }}</p>
                  </div>
                </div>
                <div class="list-item-meta-content">
                  <div class="list-item-meta-item">
                    <span>价格</span>
                    <p>{{ item.price }}</p>
                  </div>
                </div>
                <div class="list-item-meta-content">
                  <div class="list-item-meta-item">
                    <span>浏览次数</span>
                    <p>{{ item.percentage }}</p>
                  </div>
                </div>
                <div class="list-item-meta-content">
                  <div class="list-item-meta-item">
                    <span @click="toDetail"> 查看详情 </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </el-col>
        <el-col :span="24">
          <el-pagination
            background
            :current-page="queryForm.pageNo"
            :layout="layout"
            :page-size="queryForm.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fixed-heade {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $base-z-index - 1;
  width: 100%;
}
.list-container {
  width: 80%;
  padding-top: 5px;
  margin: 0 auto;
  .result-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icons {
      .icon {
        margin-left: 5px;
        font-size: 20px;
        cursor: pointer;
      }
      .active {
        color: #05cfc3;
      }
    }
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    outline: none;
    .list-item {
      padding: $base-padding;
      border-bottom: 1px solid $base-border-color;
      &-meta {
        display: flex;
        flex: 1 1;
        align-items: flex-start;
        &-avatar {
          margin-right: 16px;
          :deep() {
            .el-image {
              width: 61px;
              height: 61px;
            }
          }
        }
        &-content {
          flex: 1 0;
          width: 0;
          color: rgb(0 0 0 / 85%);
        }
        &-title {
          margin-top: 11px;
          margin-bottom: 4px;
          font-size: 14px;
          color: rgb(0 0 0 / 85%);
        }
        &-description {
          display: -webkit-box;
          overflow: hidden;
          font-size: 14px;
          color: rgb(0 0 0 / 45%);
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &-item {
          display: inline-block;
          height: 61px;
          margin-left: 40px;
          font-size: 14px;
          color: rgb(0 0 0 / 45%);
          vertical-align: middle;
          > span {
            line-height: 30px;
          }
          > p {
            margin-top: 4px;
            margin-bottom: 0;
          }
        }
        :deep() {
          .el-progress {
            margin-top: 21px;
          }
        }
      }
    }
  }
}
</style>
