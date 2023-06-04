<template>
  <div class="scroll-box">
    <div class="title">
      <span>最新需求</span>
      <mc-icon icon="more-fill" />
    </div>
    <div class="list-container">
      <ul ref="listRef" class="list" :style="listStyle" :class="{ 'no-transition': disableTransition }">
        <li v-for="(item, index) in extendedItems" :key="index" class="list-item">
          <span class="people"> {{ item.createBy }}</span>
          在
          <span class="time"> {{ getTimeDifference(new Date(item.createTime)) }}</span>
          发布了
          <span class="name"> {{ item.name }}</span>
          的需求
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTimeDifference } from "@/utils/index";
import { ref, watch, onMounted } from "vue";

const items = ref([
  {
    name: "型号物资C",
    createBy: "王五",
    createTime: "2023-05-31 15:37:22"
  },
  {
    name: "型号物资AA型号物资AA型号物资AA型号物资AA",
    createBy: "张三",
    createTime: "2023-05-30 10:32:22"
  },
  {
    name: "型号物资B",
    createBy: "李四",
    createTime: "2023-03-30 10:32:22"
  },

  {
    name: "型号物资D",
    createBy: "赵四",
    createTime: "2023-05-29 10:32:22"
  },
  {
    name: "型号物资D",
    createBy: "王六",
    createTime: "2022-05-29 10:32:22"
  }
]);
const currentIndex = ref(0);
const listRef: any = ref(null);
const disableTransition = ref(false);

// 添加循环滚动的元素
const extendedItems = computed(() => [...items.value, ...items.value]);
const listStyle = computed(() => {
  const listItemHeight = listRef.value?.querySelector(".list-item").offsetHeight || 0;
  return `height: ${listItemHeight}px`;
});

onMounted(() => {
  startScroll();
});

const startScroll = () => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % items.value.length;
  }, 3000);
};

watch(currentIndex, newIndex => {
  const list = listRef.value;
  if (list) {
    const listItemHeight = list.querySelector(".list-item").offsetHeight;
    console.log("newIndex", newIndex);
    if (newIndex === items.value.length) {
      // 滚动到最后一项后，禁用过渡效果，并在下一帧中重置滚动位置到第一项
      disableTransition.value = true;
      requestAnimationFrame(() => {
        list.style.transform = `translateY(0)`;
        requestAnimationFrame(() => {
          disableTransition.value = false;
          currentIndex.value = 0;
        });
      });
    } else {
      list.style.transform = `translateY(-${newIndex * listItemHeight}px)`;
    }
  }
});
</script>

<style lang="scss" scoped>
.scroll-box {
  width: 49%;
  min-width: 400px;
  margin-top: 10px;
  margin-bottom: 20px;
  background: rgb(5 207 195 / 20%);
  border: 1px solid #05cfc3;
  border-radius: 4px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    color: #ffffff;
    border-bottom: 1px solid #05cfc3;
    span {
      font-weight: bold;
    }
  }
  .list-container {
    height: 150px;
    overflow: hidden;
    .list {
      padding: 0;
      margin: 0;
      list-style-type: none;
      transition: transform 0.5s;
      .list-item {
        display: flex;
        justify-content: center;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        color: #ffffff;
        .people {
          font-size: 14px;
          font-weight: bold;
          color: #05cfc3;
        }
        .time {
          color: rgb(230 140 23);
        }
        .name {
          display: inline-block;
          max-width: 200px;
          height: 30px;

          /* 禁止换行 */
          overflow: hidden;
          font-size: 14px;
          font-weight: bold;

          /* 超出部分显示省略号 */
          line-height: 30px;
          color: rgb(207 5 5);

          /* 溢出部分隐藏 */
          text-overflow: ellipsis;

          /* 设置容器的宽度 */
          white-space: nowrap;
        }
      }
    }
    .no-transition {
      transition: none !important;
    }
  }
}
</style>
