<template>
  <Dropdown :class="[n.b()]">
    <Icon name="Line"></Icon>
    <template v-slot:content>
      <div :class="[n.e('item'), n.is('active', size === modelValue)]" v-for="size in sizes" :key="size" @click="onClick(size)">
        <span>{{ size }}px</span>
        <div>
          <div :style="{ width: size + 'px', height: size + 'px' }"></div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
  import { namespace } from '@draw-studio/utils'
  import Dropdown from '../dropdown/dropdown.vue'
  import Icon from '../icon/icon.vue'
  import { linePickerProps, LinePickerEmits } from './line-picker'

  const n = namespace('line-picker')
  defineProps(linePickerProps)
  const emits = defineEmits<LinePickerEmits>()

  const onClick = (size: number) => {
    emits('change', size)
  }
</script>

<style lang="scss" scoped>
  @use '@draw-studio/theme-chalk/src/line-picker.scss';
</style>