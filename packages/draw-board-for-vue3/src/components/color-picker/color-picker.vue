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

<script lang="ts" setup>
  import { namespace } from '@draw-board/utils'
  import { colorPickerProps, ColorPickerEmits } from './color-picker'

  const n = namespace('color-picker')
  defineProps(colorPickerProps)
  const emits = defineEmits<ColorPickerEmits>()

  const onInput = (event: InputEvent) => {
    emits('input', (event.target as HTMLInputElement).value)
  }
</script>

<style lang="scss" scoped>
  @use '@draw-board/theme-chalk/src/color-picker.scss';
</style>