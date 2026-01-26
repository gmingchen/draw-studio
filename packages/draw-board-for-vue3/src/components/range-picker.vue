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

<script setup>
import { ref, useTemplateRef, getCurrentInstance } from 'vue';
import { namespace } from '@draw-board/utils';
import { rangePickerProps } from './range-picker.ts'

const n = namespace('range-picker')
const props = defineProps(rangePickerProps)
const emits = defineEmits(['input'])
const instance = getCurrentInstance()
const inputRef = useTemplateRef('inputRef')

const onInput = (event) => {
  emits('input', +event.target.value)
}
</script>

<style lang="scss" scoped>
@use '@draw-board/theme-chalk/src/range-picker.scss';
</style>
