<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-08-30 13:45:16
 * @LastEditors: Do not edit
 * @Description: 
-->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-popover popper-class="ht-table-checkbox" trigger="click">
    <template #reference>
      <el-button circle :icon="More" :size="'small'" />
    </template>
    <el-checkbox-group v-model="Val" @change="changeCheckList">
      <vue-draggable
        :animation="600"
        :group="'description'"
        item-key="{ element }"
        :list="columnData"
      >
        <template #item="{ element }">
          <div>
            <el-checkbox
              :disabled="element.disableCheck === true"
              :label="element.label"
              size="small"
            >
              {{ element.label }}
            </el-checkbox>
          </div>
        </template>
      </vue-draggable>
    </el-checkbox-group>
  </el-popover>
</template>
<script lang="ts">
  import VueDraggable from 'vuedraggable'
  export default defineComponent({
    name: 'McDragCheckbox',
    components: {
      VueDraggable,
    },
  })
</script>

<script lang="ts" setup>
  import { More } from '@element-plus/icons-vue'
  import { defineProps } from 'vue' //PropType
  // type column = {
  //   label: string
  // }
  const props = defineProps({
    // 选中的列表
    checkList: {
      type: Array as unknown as any,
      default: () => {
        return []
      },
    },
    // 列数据
    columnData: {
      type: Array,
      default: () => {
        return []
      },
    },
  })
  const emit = defineEmits(['changeCheckList'])
  const changeCheckList = (value: any) => {
    emit('changeCheckList', value)
  }
  const Val = ref(props.checkList)
  //监听父组件的值
  watch(
    () => props.checkList,
    () => {
      Val.value = props.checkList
    }
  )
</script>

<style lang="scss">
  .ht-table-checkbox {
    max-height: 700px;
    overflow-y: auto;
  }
</style>
