<template>
  <Dropdown :class="[n.b()]">
    <Icon :name="modelValue"></Icon>
    <template v-slot:content>
      <div :class="[n.e('item'), n.is('active', mode === modelValue)]" v-for="mode in modes" :key="mode" @click="onClick(mode)">
        <Icon :name="mode"></Icon>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
  import { namespace } from '@draw-studio/utils'
  import Dropdown from '../dropdown/dropdown.vue'
  import Icon from '../icon/icon.vue'
  import { modePickerProps, ModePickerEmits, modes } from './mode-picker'
  import { ModeType } from '../../draw-studio'

  const n = namespace('mode-picker')
  defineProps(modePickerProps)
  const emits = defineEmits<ModePickerEmits>()

  const onClick = (mode: ModeType) => {
    emits('change', mode)
  }
</script>

<style lang="scss" scoped>
  @use '@draw-studio/theme-chalk/src/mode-picker.scss';
</style>