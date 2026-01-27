<template>
  <input
    ref="inputRef"
    :class="n.b()"
    :value="modelValue"
    @input="onInput"
    v-bind="$attrs"
    type="range"
  />
</template>

<script lang="ts" setup>
import { namespace } from '@draw-board/utils';
import { rangePickerProps } from './range-picker'

const n = namespace('range-picker')
const props = defineProps(rangePickerProps)
const emits = defineEmits(['input'])

const onInput = (event: Event) => {
  emits('input', +event.target.value)
}
</script>

<style lang="scss" scoped>
@use '@draw-board/theme-chalk/src/range-picker.scss';
</style>
