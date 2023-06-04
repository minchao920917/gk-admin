<script lang="ts">
import CountVue3 from 'count-vue3'
export default defineComponent({
    name:'McCount',
    components:{
        CountVue3
    }
})
</script>

<template>
  <count-vue3
    v-bind="$attrs"
  />
</template>