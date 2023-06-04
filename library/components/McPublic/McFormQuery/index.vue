<!-- eslint-disable vue/no-mutating-props -->
<script lang="ts">
export default {
  name: 'McFormQuery', //这个⾮常重要，就是未来你放到其他项⽬中，组件标签的名字，⽐如：<mc-form></mc-form>
}
</script>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { markRaw, ref, useSlots } from 'vue'
import McRadio from '../McRadio/index.vue'
import McCheckbox from '../McCheckbox/index.vue'
import McSelect from '../McSelect/index.vue'
import McSelectV2 from '../McSelectV2/index.vue'
const advance = !!useSlots().advance
const fold = ref(false)

const props = defineProps({
  // 表单数据
  formData: {
    type: Object,
    default: () => { },
  },
  // 表单配置项
  formColumns: {
    type: Array as any,
    default: () => [],
  },
  hiddenLength: {
    type: Number,
    default: 5,
  },
  // 选中的列表
  checkList: {
    type: Array,
    default: () => {
      return []
    },
  },
})
const emit = defineEmits(['queryData'])

// 定义动态组件
const componentsTypes = markRaw({
  ElInput,
  ElAutocomplete,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElInputNumber,
  McRadio,
  McCheckbox,
  McSelect,
  McSelectV2,
  ElSwitch,
  ElSlider,
  ElRate,
  ElCascader,
  ElTree,
  ElTreeSelect,
})

const queryData = () => {
  emit('queryData', props.formData)
}

// const handleHeight = () => {}
const handleFold = () => {
  fold.value = !fold.value
  //handleHeight()  // TODO
}

const finallyFormColumns = computed(() => {
  console.log('props.formColumns', props.formColumns)
  console.log('props.checkList', props.checkList)
  if (!advance) {
    return props.formColumns
  }
  return props.formColumns.filter((item: any) =>
    props.checkList.includes(item.label)
  )
})
// advance
const isShow = computed(() => {
  return function (index: number) {
    // 使用函数返回
    if (fold.value) {
      // 超出五个
      return index < props.hiddenLength
    }
    return true
  }
})
</script>
<template>
  <div class="ht-form-query ht-container-flex">
    <div class="ht-container-flex ht-container-wrap">
      <template v-for="(column, index) in finallyFormColumns" :key="index">
        <component :is="componentsTypes[column.htType]" v-if="isShow(index)" v-bind="column"
          v-model="props.formData[column.prop]" class="query-input" size="small" />
      </template>
      <div class="query-btn">
        <el-button :icon="Search" native-type="submit" size="small" type="primary" @click="queryData">
          查询
        </el-button>
        <el-button v-if="finallyFormColumns >= hiddenLength" size="small" text type="primary" @click="handleFold">
          <span v-if="fold">展开</span>
          <span v-else>收起</span>
          <mc-icon class="mc-dropdown" :class="{ 'mc-dropdown-active': fold }" icon="arrow-up-s-line" />
        </el-button>
      </div>
    </div>
    <slot name="advance"></slot>
  </div>
</template>

<style lang="scss" scoped>
.ht-container-wrap {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5px;
}
</style>

<style lang="scss">
.ht-form-query {
  .query-input {
    width: 200px !important;
    margin-left: 10px;
    margin-top: 5px;
  }

  .query-btn {
    height: 24px;
    line-height: 24px;
    margin-left: 10px;
    margin-top: 3px;
  }
}
</style>
