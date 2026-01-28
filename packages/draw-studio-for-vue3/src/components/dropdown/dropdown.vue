<template>
  <div ref="dropdownRef" :class="[n.b()]">
    <div @click="toggleVisible">
      <slot></slot>
    </div>
    <div :class="n.e('content')" v-if="visible">
      <div :class="n.e('scroll')">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, useTemplateRef } from 'vue'
  import { namespace } from '@draw-studio/utils';
  import { dropdownProps } from './dropdown'

  const n = namespace('dropdown-picker')
  defineProps(dropdownProps)
  const dropdownRef = useTemplateRef<HTMLDivElement>('dropdownRef')

  const visible = ref(false)

  const toggleVisible = () => {
    visible.value = !visible.value
  }

  const handleClickOutside = (event: MouseEvent) => {
    const dropdown = dropdownRef.value!
    if (dropdown && !dropdown.contains(event.target as Node)) {
      visible.value = false
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      visible.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
  })
</script>

<style lang="scss" scoped>
  @use '@draw-studio/theme-chalk/src/dropdown.scss';
</style>
