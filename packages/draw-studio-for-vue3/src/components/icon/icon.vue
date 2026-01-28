<template>
  <i
    :class="n.b()"
    :style="style"
  >
    <component :is="svg" />
  </i>
</template>

<script lang="ts" setup>
  import { computed, CSSProperties } from 'vue'
  import { namespace } from '@draw-studio/utils';
  import * as Svgs from './svgs/index'
  import { iconProps } from './icon'

  const n = namespace('icon')
  defineOptions({
    name: 'Icon',
  })
  const { name, size } = defineProps(iconProps)

  const svg = computed(() => {
    return name ? (Svgs as Record<string, any>)[name] : undefined
  })

  const style = computed<CSSProperties>(() => {
    if (!size) return {}
    return {
      fontSize: size || undefined,
    }
  })
</script>

<style lang="scss" scoped>
@use '@draw-studio/theme-chalk/src/icon.scss';
</style>
