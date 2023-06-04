<template>
  <el-select-v2
    v-model="Val"
    v-bind="$attrs"
    :options="props.options"
    style="width: 100%"
    :value-key="props.valueFiled"
    @blur="props.blur ? props.blur($event) : false"
    @change="props.change ? props.change($event) : false"
    @clear="props.clear ? props.clear() : false"
    @focus="props.focus ? props.focus($event) : false"
    @remove-tag="props.removeTag ? props.removeTag($event) : false"
    @visible-change="props.visibleChange ? props.visibleChange($event) : false"
  />
</template>

<script lang="ts" setup>
  import { ref, watch, PropType } from 'vue'
  const emit = defineEmits(['update:modelValue'])
  type option = {
    label: string
    value: string
  }
  const props = defineProps({
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: () => '',
    },
    options: {
      type: Array as unknown as PropType<[option]>,
      default: () => [],
    },
    valueFiled: {
      type: String,
      default: 'value',
    },
    labelFiled: {
      type: String,
      default: 'label',
    },
    change: {
      type: Function,
      default: () => () => {},
    },
    visibleChange: {
      type: Function,
      default: () => () => {},
    },
    removeTag: {
      type: Function,
      default: () => () => {},
    },
    clear: {
      type: Function,
      default: () => () => {},
    },
    blur: {
      type: Function,
      default: () => () => {},
    },
    focus: {
      type: Function,
      default: () => () => {},
    },
  })

  const Val = ref(props.modelValue)
  //监听父组件的值
  watch(
    () => props.modelValue,
    () => {
      Val.value = props.modelValue
    }
  )

  // 通过emit将值传递给父组件
  emit('update:modelValue', Val)
</script>
