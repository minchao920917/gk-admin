<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
const input = ref("");
const selectedCategories = ref([]);
const selectedBrands = ref([]);
const sortOrder = ref(0);

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
</script>
<template>
  <div class="cont">
    <div class="high-search">
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
      <div class="search-bar">
        <el-input
          class="cont-input"
          size="large"
          v-model="input"
          placeholder="请输入物资名称/物资id/物资类型"
          :suffix-icon="Search"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cont {
  .high-search {
    .filters {
      padding-left: 10px;
      margin-top: 5px;
      margin-bottom: 20px;
      background: rgb(8 21 20 / 10%);
      border-radius: 4px;
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
</style>
