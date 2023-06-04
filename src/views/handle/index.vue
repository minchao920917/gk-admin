<!--
 * @Author: minchao920917 499790879@qq.com
 * @Date: 2023-05-16 21:37:55
 * @LastEditors: Do not edit
 * @Description: 
-->
<script lang="ts">
import comments from "./components/comments.vue";
import supplies from "./components/supplies.vue";

export default defineComponent({
  name: "Handle",
  components: {
    supplies,
    comments
  },
  setup() {
    const tabPosition = ref("supplies");
    onMounted(() => {});

    return {
      tabPosition
    };
  }
});
</script>
<template>
  <div class="mc-main-container">
    <el-radio-group class="tabs" v-model="tabPosition">
      <el-radio-button label="supplies">物资审核</el-radio-button>
      <el-radio-button label="comments">评论审核</el-radio-button>
    </el-radio-group>
    <supplies v-if="tabPosition == 'supplies'"></supplies>
    <comments v-if="tabPosition == 'comments'"></comments>
  </div>
</template>
