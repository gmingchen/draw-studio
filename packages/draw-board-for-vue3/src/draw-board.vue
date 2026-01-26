<template>
  <div :class="[n.b()]">
    <div :class="[n.e('toolbar')]">
      <RangePicker
        v-model="lineWidth"
        @input="(value) => $emit('update:line-width', value)">
      </RangePicker>
      {{ lineWidth  }}
      <ColorPicker
        v-model="color"
        @input="(value) => $emit('update:color', value)">
      </ColorPicker>
      {{ history.active }}
    </div>
    <canvas
      ref="canvasRef"
      :class="[n.e('canvas')]"
      :width="width"
      :height="height"
      :style="canvasStyle"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseenter="onMouseEnter">
    </canvas>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, useTemplateRef, computed, onMounted, onUnmounted } from 'vue'
  import { drawBoardProps, DrawBoardEmits } from './draw-board'
  import { namespace, Position, Event, getEventPosition, determineIsInside, getEdgePosition, drawLines } from '@draw-board/utils'
  import { RangePicker, ColorPicker } from './components/index.ts'

  const n = namespace('draw-board')
  defineOptions({ name: 'DrawBoard' })
  const emits = defineEmits<DrawBoardEmits>()
  const props = defineProps(drawBoardProps)

  const canvasStyle = computed(() => ({
    backgroundColor: props.backgroundColor
  }))

  const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
  let context: CanvasRenderingContext2D | null = null
  let globalMouseMoveHandler: ((event: Event) => void) | null = null
  let globalMouseUpHandler: ((event: Event) => void) | null = null

  const isDrawing = ref(false)
  const lastPosition = reactive<Position>({ x: 0, y: 0 })
  const lastIsInside = ref(false)

  const history = reactive<{
    active: number,
    list: ImageData[]
  }>({
    active: -1,
    list: []
  })

  const handleDrawLines = (positions: Position[]) => {
    const { lineWidth, color } = props
    drawLines(context!, positions, lineWidth, color)
  }

  const handleGlobalMouseMove = (event: Event) => {
    const canvas = canvasRef.value
    if (!isDrawing.value || !canvas) return
    const eventPosition = getEventPosition(canvas, event)
    // 判断鼠标是否在画布内
    const isInside = determineIsInside(canvas, event)
    if (isInside) {
      if(lastIsInside.value) {
        event.preventDefault()
        handleDrawLines([lastPosition, eventPosition])
      } else {
        const edgePosition = getEdgePosition(canvas, lastPosition, eventPosition)
        handleDrawLines([lastPosition, edgePosition, eventPosition])
      }
    } else {
      if(lastIsInside.value) {
        const edgePosition = getEdgePosition(canvas, lastPosition, eventPosition)
        handleDrawLines([lastPosition, edgePosition])
      }
    }
    lastPosition.x = eventPosition.x
    lastPosition.y = eventPosition.y
    lastIsInside.value = isInside
    emits('draw', { x: eventPosition.x, y: eventPosition.y })
  }
  const handleGlobalMouseUp = (_event: Event) => {
    handleStopDraw()
  }
  const handleGlobalListenersRemove = () => {
    globalMouseMoveHandler && document.removeEventListener('mousemove', globalMouseMoveHandler)
    globalMouseUpHandler && document.removeEventListener('mouseup', globalMouseUpHandler)
    globalMouseMoveHandler = null
    globalMouseUpHandler = null
  }

  const handleStartDraw = (event: Event) => {
    isDrawing.value = true
    const { x, y } = getEventPosition(canvasRef.value!, event)
    lastPosition.x = x
    lastPosition.y = y
    lastIsInside.value = true

    if (!globalMouseMoveHandler) {
      globalMouseMoveHandler = handleGlobalMouseMove
      globalMouseUpHandler = handleGlobalMouseUp
      document.addEventListener('mousemove', globalMouseMoveHandler)
      document.addEventListener('mouseup', globalMouseUpHandler)
    }
  }
  const handleStopDraw = () => {
    if (isDrawing.value) {
      isDrawing.value = false
      lastIsInside.value = false
      handleSaveHistory()
      handleGlobalListenersRemove()
    }
  }

  const handleSaveHistory = () => {
    if (!props.useHistory) return
    const { width, height } = canvasRef.value!
    const image = context!.getImageData(0, 0, width, height)
    if (history.active < history.list.length - 1) {
      history.list.splice(history.active + 1)
    }
    history.list.push(image)
    history.active = history.list.length - 1
  }

  const onMouseDown = (event: Event) => {
    if (!canvasRef.value) return
    // 判断鼠标是否在canvas内
    const isInside = determineIsInside(canvasRef.value, event)
    if (!isInside) return
    if ('buttons' in event && event.buttons !== 1) return
    handleStartDraw(event)
  }
  const onMouseUp = () => {
    handleStopDraw()
  }
  const onMouseEnter = (event: Event) => {
    if (!('buttons' in event)) return
    if (event.buttons !== 1) return
    if (!isDrawing.value) return
    const eventPosition = getEventPosition(canvasRef.value!, event)
    if (!lastIsInside.value) {
      const canvas = canvasRef.value!
      const edgePosition = getEdgePosition(canvas, lastPosition, eventPosition)
      handleDrawLines([lastPosition, edgePosition, eventPosition])
    }
    lastPosition.x = eventPosition.x
    lastPosition.y = eventPosition.y
    lastIsInside.value = true
  }

  const init = () => {
    if (!canvasRef.value) return
    context = canvasRef.value.getContext('2d')
    if (!context) return
    const { width, height, backgroundColor } = props
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, width, height)
    handleSaveHistory()
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    handleGlobalListenersRemove()
  })

</script>

<style lang="scss" scoped>
  @use '@draw-board/theme-chalk/src/draw-board.scss';
</style>

