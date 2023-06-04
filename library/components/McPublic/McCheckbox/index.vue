<template>
  <el-checkbox-group
    v-model="Val"
    v-bind="$attrs"
    @change="props.change ? props.change($event) : false"
  >
    <template v-if="props.type === 'button'">
      <el-checkbox-button
        v-for="item in options"
        :key="item[valueFiled]"
        :label="item[valueFiled]"
      >
        {{ item[labelFiled] }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
        v-for="item in options"
        :key="item[valueFiled]"
        :border="props.type === 'border'"
        :label="item[valueFiled]"
      >
        {{ item[labelFiled] }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
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
      type: Array as unknown as PropType<[string | number]>,
      default: () => [],
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
    type: {
      type: String,
      default: '',
    },
    change: {
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
