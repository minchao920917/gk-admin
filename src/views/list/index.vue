  
<script lang="ts">
import { getList } from '@/api/list'
import { Search } from '@element-plus/icons-vue'
import search from './components/search.vue'

export default defineComponent({
  name: 'List',
  components: {
    search,
  },
  setup() {
    const router = useRouter()
    const isActive = ref(true)
    const state = reactive({
      list: [] as any,
      total: 0,
      queryForm: { pageNo: 1, pageSize: 20, title: '' },
      layout: 'total, sizes, prev, pager, next, jumper',
      listLoading: true,
      emptyShow: true,
    })

    const fetchData = async () => {
      state.listLoading = true
      const {
        data: { list, total },
      } = await getList(state.queryForm)
      state.list = list
      state.total = total
      state.listLoading = false
      state.emptyShow = false
    }
    const toDetail = () => {
      console.log('1111', router)
      router.push({
        path: 'detail',
      })

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
    onMounted(() => {
      fetchData()
    })

    return {
      isActive,
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      toDetail,
      queryData,
      Search,
    }
  },
})
</script>

<template>
  <div class="mc-main-container">
    <div class="list-container">
      <search />
      <div class="result-wrap">
        <p>查询结果</p>
        <div class="icons">
          <mc-icon class="icon" :class="{ active: isActive }" icon="align-justify" @click="isActive = !isActive" />
          <mc-icon class="icon" :class="{ active: !isActive }" icon="microsoft-fill" @click="isActive = !isActive" />
        </div>
      </div>
      <el-row :gutter="20">
        <el-col v-if="emptyShow" :span="24">
          <el-empty class="mc-data-empty" description="暂无数据" />
        </el-col>
        <el-col :span="24" v-if="isActive">
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
                    <span @click="toDetail">
                      查看详情
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </el-col>
        <el-col :span="24" v-else>
          <ul v-loading="listLoading" class="card-list">
            <li v-for="(item, index) in list" :key="index" class="card-item" @click="toDetail">
              <div class="img">
                <el-image :src="item.img" />
              </div>
              <div class="title">
                {{ item.title }}
              </div>
              <div class="description">
                {{ item.description }}
              </div>
              <div class="datetime">
                发布时间: {{ item.datetime }}
              </div>
              <div class="other">
                <span>价格:{{ item.price }}</span>
                <span>浏览量:{{ item.percentage }}</span>
              </div>
              <div class="detail">
                <a>
                  查看详情
                </a>
              </div>
            </li>
          </ul>
        </el-col>
        <el-col :span="24">
          <el-pagination background :current-page="queryForm.pageNo" :layout="layout" :page-size="queryForm.pageSize"
            :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
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
  margin: 0 auto;
  padding-top: 5px;

  .result-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icons {
      .icon {
        cursor: pointer;
        font-size: 20px;
        margin-left: 5px;
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
          color: rgba(0, 0, 0, 0.85);
        }

        &-title {
          margin-top: 11px;
          margin-bottom: 4px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
        }

        &-description {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &-item {
          display: inline-block;
          height: 61px;
          margin-left: 40px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          vertical-align: middle;

          >span {
            line-height: 30px;
          }

          >p {
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

    &.card-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
        color 0.1s, font-size 0s;

      .card-item {
        display: block;
        margin-top: 10px;
        width: 200px;
        height: 250px;
        border: 1px solid #eee;
        cursor: pointer;

        .img {
          width: 100%;
          overflow: hidden;
        }

        .title {
          padding: 5px;
          font-size: 18px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .description {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 15px;
          height: 30px;
          text-overflow: ellipsis;
          font-size: 12px;
          padding: 0 5px;
        }

        .datetime {
          margin-top: 5px;
          font-size: 12px;
          padding: 5px;
        }

        .other {
          height: 20px;
          padding: 5px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .detail {
          border-top: 1px solid #eee;
          font-size: 12px;
          text-align: center;
          line-height: 24px;
        }

        &:hover {
          box-shadow: 0 0 10px #666;

          :deep(img) {
            transform: scale(1.5);
          }

        }
      }
    }
  }




}
</style>
  