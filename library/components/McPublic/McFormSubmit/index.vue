<!--
 * @Author: 闵超 499790879@qq.com
 * @Date: 2022-08-23 22:12:03
 * @LastEditors: Do not edit
 * @Description: 
-->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form
    ref="formRef"
    v-model="props.formData"
    :rules="props.formRules"
    v-bind="$attrs"
  >
    <el-row>
      <el-col
        v-for="(column, index) in props.formColumns"
        :key="index"
        :offset="column.offset"
        :span="column.span"
      >
        <template v-if="column.slotName">
          <slot :name="column.slotName"></slot>
        </template>
        <el-form-item
          v-else
          :label="column.label"
          :prop="column.prop"
          v-bind="column.formItemOpts"
        >
          <component
            :is="componentsTypes[column.htType]"
            v-bind="column"
            v-model="props.formData[column.prop]"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  export default {
    name: 'McFormSubmit', //这个⾮常重要，就是未来你放到其他项⽬中，组件标签的名字，⽐如：<mc-form></mc-form>
  }
</script>
<script lang="ts" setup>
  import { ref, markRaw } from 'vue'
  import type { FormInstance } from 'element-plus'
  import McRadio from '../McRadio/index.vue'
  import McCheckbox from '../McCheckbox/index.vue'
  import McSelect from '../McSelect/index.vue'
  import McSelectV2 from '../McSelectV2/index.vue'

  const props = defineProps({
    // 表单数据
    formData: {
      type: Object,
      default: () => {},
    },
    // 表单配置项
    formColumns: {
      type: Array as any,
      default: () => [],
    },
    // 表单规则验证
    formRules: {
      type: Object,
      default: () => {},
    },
  })
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
    ElTransfer,
    ElCascader,
    ElColorPicker,
    ElTree,
    ElTreeSelect,
  })
  // 将表单绑定的ref暴露给父组件
  const formRef = ref<FormInstance>()
  defineExpose({ formRef })
</script>
