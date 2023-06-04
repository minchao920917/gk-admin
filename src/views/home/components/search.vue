<script setup lang="ts">
import needsScroll from "./needScroll.vue";
import materalScroll from "./materalScroll.vue";
import { Search } from "@element-plus/icons-vue";
const router = useRouter();
const input = ref("");
const isActive = ref(0);
const selectedCategories = ref([]);
const selectedBrands = ref([]);
const sortOrder = ref(0);
const toggleActive = (num: number) => {
  isActive.value = num;
};
const categories = ref([
  {
    id: 1,
    name: "分类一"
  },
  {
    id: 2,
    name: "分类二"
  },
  {
    id: 3,
    name: "分类三"
  },
  {
    id: 4,
    name: "分类四"
  },
  {
    id: 5,
    name: "分类五"
  }
]);
const brands = ref([
  {
    id: 1,
    name: "品牌一"
  },
  {
    id: 2,
    name: "品牌二"
  },
  {
    id: 3,
    name: "品牌三"
  },
  {
    id: 4,
    name: "品牌四"
  },
  {
    id: 5,
    name: "品牌五"
  }
]);
const filterCategoryItems = () => {};
const filterItems = () => {};
const search = () => {
  router.push("/list");
};
</script>
<template>
  <div class="container">
    <div class="grade-box">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <ul class="grade-nav">
        <li class="grade-li li0" :class="{ active: isActive == 0 }" @click="toggleActive(0)">物资查询</li>
        <!-- <li class="grade-li li1" :class="{ active: isActive == 1 }" @click="toggleActive(1)">
                    发布物资
                </li> -->
        <li class="grade-li li2" :class="{ active: isActive == 2 }" @click="toggleActive(2)">高级查询</li>
      </ul>
      <div class="grade-cont">
        <div class="cont">
          <div class="el-autocomplete input-wrap"></div>
        </div>
      </div>
      <div class="cont" v-if="isActive == 0">
        <el-input
          class="cont-input"
          size="large"
          v-model="input"
          placeholder="请输入物资名称/物资id/物资类型"
          :suffix-icon="Search"
          @keyup.enter="search"
        />
      </div>
      <!-- <div class="cont" v-if="isActive == 1">
                <el-upload>
                    <div class="upload-btn">
                        <mc-icon icon="file-copy-line" />请选择文件
                    </div>
                </el-upload>
                <p class="down"><mc-icon icon="file-download-fill" />下载模板</p>
            </div> -->
      <div class="cont" v-if="isActive == 2">
        <div class="high-search">
          <div class="search-bar">
            <el-input
              class="cont-input"
              size="large"
              v-model="input"
              placeholder="请输入物资名称/物资id/物资类型"
              :suffix-icon="Search"
            />
          </div>
          <div class="filters">
            <div class="filter-group">
              <div class="filter-group-title">分类:</div>
              <el-checkbox-group :fill="'#09aeaf'" v-model="selectedCategories" @change="filterCategoryItems">
                <el-checkbox v-for="category in categories" :key="category.id" :label="category.name">
                  {{ category.name }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="filter-group">
              <div class="filter-group-title">品牌:</div>
              <el-checkbox-group :fill="'#09aeaf'" v-model="selectedBrands" @change="filterItems">
                <el-checkbox :fill="'#09aeaf'" v-for="brand in brands" :key="brand.id" :label="brand.name">
                  {{ brand.name }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="filter-group">
              <div class="filter-group-title">排序方式:</div>
              <el-radio-group :fill="'#09aeaf'" v-model="sortOrder" class="ml-4">
                <el-radio fill="#09aeaf" label="1">价格从低到高</el-radio>
                <el-radio fill="#09aeaf" label="2">价格从高到低</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-panel">
      <needsScroll />
      <materalScroll />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  margin: 0 auto;
  background: url("@/assets/bg/guide_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  .grade-box {
    margin: 0 auto;
    .logo {
      padding: 2% 0;
      text-align: center;
    }
    .grade-nav {
      display: flex;
      justify-content: center;
      padding-left: 54px;
      margin: 0 auto;
      list-style: none;
      .grade-li {
        position: relative;
        width: 80px;
        height: 35px;
        margin: 0 45px;
        font-family: Helvetica;
        font-size: 16px;
        line-height: 35px;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
        &.active {
          background: #05cfc3;
          border-radius: 4px;
          border-bottom-left-radius: 0;
        }
      }
      .li0.active::after {
        position: absolute;
        bottom: -15px;
        left: 0;
        width: 0;
        height: 0;
        content: "";
        border-top: 15px solid #05cfc3;
        border-right: 15px solid transparent;
      }
      .li1.active::after {
        position: absolute;
        bottom: -15px;
        left: 0;
        width: 0;
        height: 0;
        content: "";
        border-top: 15px solid #05cfc3;
        border-right: 15px solid transparent;
      }
      .li2.active::after {
        position: absolute;
        bottom: -15px;
        left: 0;
        width: 0;
        height: 0;
        content: "";
        border-top: 15px solid #05cfc3;
        border-right: 15px solid transparent;
      }
    }
  }
  .cont {
    width: 60%;
    margin: 0 auto;
    .cont-input {
      :deep(.el-input__wrapper) {
        color: #ffffff;
        background-color: rgb(0 0 0 / 20%);
      }
      :deep(.el-input__inner) {
        color: #ffffff;
      }
    }
    :deep(.el-upload) {
      display: block;
      width: 100%;
    }
    .upload-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      margin: 0 auto;
      line-height: 68px;
      color: #ffffff;
      text-align: center;
      background: rgb(5 207 195 / 70%);
      border: 1px solid #05cfc3;
      border-radius: 4px;
    }
    .down {
      width: 100%;
      margin-top: 10px;
      font-size: 12px;
      color: #ffffff;
      text-align: right;
      cursor: pointer;
    }
    .high-search {
      color: #ffffff;
      .filters {
        padding-left: 10px;
        margin-top: 10px;
        margin-bottom: 20px;
        background: rgb(5 207 195 / 20%);
        border: 1px solid #05cfc3;
        border-radius: 4px;
        :deep(.el-checkbox, .el-radio) {
          color: #ffffff;
        }
        :deep(.el-radio) {
          color: #ffffff;
        }
        :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
          color: #09aeaf;
        }
        :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
          background-color: #09aeaf;
          border-color: #09aeaf;
        }
        :deep(.el-radio__input.is-checked + .el-radio__label) {
          color: #09aeaf;
        }
        :deep(.el-radio__input.is-checked .el-radio__inner) {
          background-color: #09aeaf;
          border-color: #09aeaf;
        }
      }
      .filter-group {
        display: flex;
        align-items: center;
        justify-content: start;
        margin-right: 20px;
      }
      .filter-group-title {
        width: 80px;
        margin-right: 10px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .scroll-panel {
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>
