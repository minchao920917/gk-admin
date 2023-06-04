<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

const props = defineProps<{
  trigger: string
  value?: boolean
  direction?: string
}>()
//trigger：卡片翻转的触发方式，目前有 hover/click/custom(自定义)三种方式。其中custom方式配合v-model使用，使用场景：在卡片内部点击按钮触发时使用。
//direction：翻转的方向，目前有row/col两种。
//slot：cz/cf 正反两面的插槽

const surface = ref<boolean>(true)
const cardz = ref<HTMLDivElement | null>(null)
const cardf = ref<HTMLDivElement | null>(null)

watch(
  () => props.value,
  (newVal): void => {
    if (props.trigger == 'custom') fn_reserve_action(newVal)
  }
)

const fn_reserve_action = (bool: boolean | undefined): void => {
  const arr =
    props.direction == 'row'
      ? ['rotateY(180deg)', 'rotateY(0deg)']
      : ['rotateX(-180deg)', 'rotateX(0deg)']
  if (cardz.value) {
    cardz.value.style.transform = bool ? arr[0] : arr[1]
  }
  if (cardf.value) {
    cardf.value.style.transform = !bool ? arr[0] : arr[1]
  }
}

const cardClick = (): void => {
  if (props.trigger == 'click') {
    fn_reserve_action(surface.value)
    surface.value = !surface.value
  }
}

const cardMsOver = (): void => {
  if (props.trigger == 'hover') fn_reserve_action(true)
}

const cardMsOut = (): void => {
  if (props.trigger == 'hover') fn_reserve_action(false)
}
</script>
<template>
  <div class="mc-flipper" @click="cardClick" @mouseout="cardMsOut" @mouseover="cardMsOver">
    <div ref="cardz" class="card">
      <slot name="cz"></slot>
    </div>
    <div ref="cardf" :class="['card', direction == 'row' ? 'card-f-y' : 'card-f-x']">
      <slot name="cf"></slot>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.mc-flipper {
  width: 200px;
  height: 300px;
  min-width: 200px;
  min-height: 200px;
  transition: all 0.2s;
  position: relative;
  background-color: transparent;
  cursor: pointer;

  .card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 1s;
    backface-visibility: hidden;
    border-radius: 4px;
    border: 1px solid #e8eaec;

    &:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-color: #eee;
    }

    &.card-f-y {
      transform: rotateY(-180deg);
    }

    &.card-f-x {
      transform: rotateX(-180deg);
    }
  }
}
</style>
