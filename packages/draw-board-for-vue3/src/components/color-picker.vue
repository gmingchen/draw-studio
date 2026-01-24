<template>
  <input
    ref="inputRef"
    :class="n.b()"
    :value="modelValue"
    @input="onInput"
    v-bind="$attrs"
    type="color"
  />
</template>

<script setup>
import { ref, useTemplateRef, getCurrentInstance } from 'vue';
import { namespace } from '@draw-board/utils';
import { colorPickerProps } from './color-picker'

const n = namespace('color-picker')
const props = defineProps(colorPickerProps)
const emits = defineEmits(['input'])
const instance = getCurrentInstance()
const inputRef = useTemplateRef('inputRef')

const onInput = (event) => {
  emits('input', event.target.value)
}
</script>

<style lang="scss" scoped>
@use '@draw-board/theme-chalk/src/color-picker.scss';
</style>
