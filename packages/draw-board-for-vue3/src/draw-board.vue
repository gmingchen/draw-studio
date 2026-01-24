<template>
  <div :class="[n.b()]">
    <div :class="[n.e('toolbar')]">
      <ColorPicker
        v-model="color"
        @input="(value) => $emit('update:color', value)">
      </ColorPicker>
    </div>
    <canvas
      ref="canvasRef"
      :class="[n.e('canvas')]"
      :width="width"
      :height="height"
      :style="canvasStyle">
    </canvas>
  </div>
</template>

<script lang="ts" setup>
  import { ref, useTemplateRef, computed, onMounted } from 'vue'
  import { namespace } from '@draw-board/utils'
  import { drawBoardProps } from './draw-board'
  import { ColorPicker } from './components'

  const n = namespace('draw-board')
  defineOptions({ name: 'DrawBoard' })
  defineEmits(['update:color'])

  const { backgroundColor } = defineProps(drawBoardProps)

  const canvasStyle = computed(() => ({
    backgroundColor: backgroundColor
  }))

  const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
  const context = null

  const isDrawing = ref(false)

  onMounted(() => {
    if (canvasRef.value) {
      context = canvasRef.value.getContext('2d')
    }
    console.log(canvasRef.value);
  })

</script>

<style lang="scss" scoped>
  @use '@draw-board/theme-chalk/src/draw-board.scss';
</style>

