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
  import { namespace } from '@draw-board/utils';
  import * as Svgs from './svgs'
  import { iconProps } from './icon'

  const n = namespace('icon')
  defineOptions({
    name: 'Icon',
  })
  const { name, size } = defineProps(iconProps)

  const svg = computed(() => {
    return Svgs[name]
  })

  const style = computed<CSSProperties>(() => {
    if (!size) return {}
    return {
      fontSize: size || undefined,
    }
  })
</script>

<style lang="scss" scoped>
@use '@draw-board/theme-chalk/src/icon.scss';
</style>
