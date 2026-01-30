<template>
  <div :class="[n.b(), n.m(props.toolbarPosition)]">
    <div :class="[n.e('toolbar')]" :style="style" v-if="useToolbar">
      <template v-if="useHistory">
        <Icon :class="n.is('disable', !canUndo)" name="Left" @click="onUndo" />
        <Icon :class="n.is('disable', !canRedo)" name="Right" @click="onRedo" />
      </template>
      <Icon name="Broom" @click="onClear" />
      <ModePicker v-model="insideMode" @change="onModeChange" />
      <LinePicker v-model="insideLineWidth" @change="onLineWidthChange" />
      <ColorPicker v-model="insideColor" @input="onColorChange" />
      <Icon name="Download" @click="onDownload" />
    </div>
    <canvas
      ref="canvasRef"
      :class="[n.e('canvas')]"
      :width="width"
      :height="height"
      :style="style"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseenter="onMouseEnter"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, useTemplateRef, computed, watch, onMounted, onUnmounted } from 'vue'
  import { Icon, ModePicker, LinePicker, ColorPicker } from './components'
  import {
    drawStudioProps,
    DrawStudioEmits, Mode, ModeType, ActionMode, DrawActionModeType, DrawAction,
  } from './draw-studio'
  import {
    namespace, getEventPosition, determineIsInsideByEvent, getEdgePosition,
    drawLines, drawImage, drawPoint, drawPoints,
    Position, Event
  } from '@draw-studio/utils'

  const n = namespace('draw-studio')
  defineOptions({ name: 'DrawStudio' })
  const emits = defineEmits<DrawStudioEmits>()
  const props = defineProps(drawStudioProps)

  const style = computed(() => ({
    backgroundColor: props.backgroundColor
  }))

  const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
  let context: CanvasRenderingContext2D | null = null
  let offscreenCanvas: HTMLCanvasElement | null = null
  let offscreenContext: CanvasRenderingContext2D | null = null

  let globalMouseMoveHandler: ((event: Event) => void) | null = null
  let globalMouseUpHandler: ((event: Event) => void) | null = null

  const isDrawing = ref(false)
  const drawingPositions = ref<Position[]>([])

  const lastPosition = reactive<Position>({ x: 0, y: 0 })
  const lastIsInside = ref(false)

  const history = reactive<{
    active: number,
    list: DrawAction[]
  }>({
    active: -1,
    list: []
  })
  const canUndo = computed(() => history.active > 0)
  const canRedo = computed(() => history.active < history.list.length - 1)

  const insideMode = ref(props.mode)
  watch(() => props.mode, (value: ModeType) => {
    insideMode.value = value
  })
  const insideLineWidth = ref(props.lineWidth)
  watch(() => props.lineWidth, (value: number) => {
    insideLineWidth.value = value
  })
  const insideColor = ref(props.color)
  watch(() => props.color, (value: string) => {
    insideColor.value = value
  })

  const handleCurrentDrawLines = (positions: Position[]) => {
    drawLines(context!, positions, insideLineWidth.value, insideColor.value)
  }
  const handleCurrentDrawPoints = (positions: Position[]) => {
    drawPoints(context!, positions, insideLineWidth.value + 5, insideColor.value)
  }

  const handleSaveHistory = (mode: DrawActionModeType) => {
    if (!props.useHistory) return
    if (mode !== 'reset' && drawingPositions.value.length === 0) return
    const timestamp = +Date.now()
    const drawAction: DrawAction = {
      id: timestamp,
      timestamp: timestamp,
      mode: mode,
      lineWidth: insideLineWidth.value,
      color: insideColor.value,
      positions: [...drawingPositions.value],
    }
    if (history.active < history.list.length - 1) {
      history.list.splice(history.active + 1)
    }
    history.list.push(drawAction)
    history.active = history.list.length - 1
    drawingPositions.value = []
  }
  const handleDrawHistory = async (active: number) => {
    if (!context) return
    let list = history.list.slice(0, active + 1)
    let startIndex = 0
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].mode === 'reset') {
        startIndex = i + 1
        break
      }
    }
    list = list.slice(startIndex)
    const map = new Map<number, DrawAction>()
    list.forEach(item => map.set(item.id, item))
    list = Array.from(map.values())

    const { width, height, backgroundColor, useBackgroundImage, backgroundImage, backgroundImageMode, useOffscreen } = props
    if (useOffscreen && offscreenContext && offscreenCanvas) {
      offscreenContext.fillStyle = backgroundColor
      offscreenContext.fillRect(0, 0, width, height)
      if (useBackgroundImage && backgroundImage) {
        await drawImage(offscreenCanvas, offscreenContext, backgroundImage, backgroundImageMode)
      }
    } else {
      await handleRest()
    }

    for (const action of list) {
      if (action.positions.length > 0) {
        if (action.mode === Mode.PENCIL) {
          drawLines(useOffscreen ? offscreenContext! : context!, action.positions, action.lineWidth, action.color)
        } else if (action.mode === Mode.PEN) {
          drawLines(useOffscreen ? offscreenContext! : context!, action.positions, action.lineWidth, action.color)
          drawPoints(useOffscreen ? offscreenContext! : context!, action.positions, action.lineWidth + 5, action.color)
        }
      }
    }

    if (useOffscreen && offscreenContext && offscreenCanvas) {
      context.clearRect(0, 0, width, height)
      context.drawImage(offscreenCanvas, 0, 0)
    }
  }

  const handleRest = async () => {
    if (!context) return
    const { width, height, backgroundColor, useBackgroundImage, backgroundImage, backgroundImageMode } = props
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, width, height)
    if (canvasRef.value && useBackgroundImage && backgroundImage) {
      await drawImage(canvasRef.value, context, backgroundImage, backgroundImageMode)
    }
  }

  const handleGlobalListenersRemove = () => {
    globalMouseMoveHandler && document.removeEventListener('mousemove', globalMouseMoveHandler)
    globalMouseUpHandler && document.removeEventListener('mouseup', globalMouseUpHandler)
    globalMouseMoveHandler = null
    globalMouseUpHandler = null
  }

  const handleStopDraw = () => {
    if (isDrawing.value) {
      isDrawing.value = false
      lastIsInside.value = false
      handleSaveHistory(props.mode)
      handleGlobalListenersRemove()
    }
  }

  const handlePencil = (event: Event) => {
    const canvas = canvasRef.value
    if (!canvas) return
    isDrawing.value = true
    const { x, y } = getEventPosition(canvas, event)
    lastPosition.x = x
    lastPosition.y = y
    lastIsInside.value = true
    drawingPositions.value.push({ x, y })
    if (!globalMouseMoveHandler) {
      globalMouseMoveHandler = (event: Event) => {
        if (!isDrawing.value) return
        const eventPosition = getEventPosition(canvas, event)
        const isInside = determineIsInsideByEvent(canvas, event)
        if (isInside) {
          if(lastIsInside.value) {
            event.preventDefault()
            handleCurrentDrawLines([lastPosition, eventPosition])
          } else {
            const edgePosition = getEdgePosition(canvas, lastPosition, eventPosition)
            handleCurrentDrawLines([lastPosition, edgePosition, eventPosition])
          }
        } else {
          if(lastIsInside.value) {
            const edgePosition = getEdgePosition(canvas, lastPosition, eventPosition)
            handleCurrentDrawLines([lastPosition, edgePosition])
            drawingPositions.value.push(edgePosition)
          }
        }
        drawingPositions.value.push(eventPosition)
        lastPosition.x = eventPosition.x
        lastPosition.y = eventPosition.y
        lastIsInside.value = isInside
        emits('draw', canvas, context!, { x: eventPosition.x, y: eventPosition.y })
      }
      globalMouseUpHandler = () => handleStopDraw()
      document.addEventListener('mousemove', globalMouseMoveHandler)
      document.addEventListener('mouseup', globalMouseUpHandler)
    }
  }
  const handlePen = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    if (!globalMouseMoveHandler) {
      let imageData: ImageData | null = null
      globalMouseMoveHandler = (event: Event) => {
        if (!imageData) return
        context!.putImageData(imageData, 0, 0)
        handleCurrentDrawLines([...drawingPositions.value, getEventPosition(canvas, event)])
      }
      globalMouseUpHandler = (event: Event) => {
        const isInside = determineIsInsideByEvent(canvas, event)
        if (!isInside) return
        isDrawing.value = true
        const { x, y } = getEventPosition(canvas, event)
        lastPosition.x = x
        lastPosition.y = y
        lastIsInside.value = true
        const first = drawingPositions.value[0]
        const isClosed = first && Math.abs(first.x - x) <= 10 && Math.abs(first.y - y) <= 10
        if (drawingPositions.value.length > 2 && isClosed) {
          drawingPositions.value.push({ ...first })
          context!.putImageData(imageData!, 0, 0)
          handleCurrentDrawLines(drawingPositions.value)
          handleStopDraw()
        } else {
          drawingPositions.value.push({ x, y })
          handleCurrentDrawPoints([{ x, y }])
          imageData = context!.getImageData(0, 0, props.width, props.height)
        }
        emits('draw', canvas, context!, { x, y })
      }
      document.addEventListener('mousemove', globalMouseMoveHandler)
      document.addEventListener('mouseup', globalMouseUpHandler)
    }
  }

  const handleUndo = () => {
    if (history.active <= 0 || !context) return
    history.active--
    handleDrawHistory(history.active)
    const imageData = context!.getImageData(0, 0, props.width, props.height)
    return imageData
  }
  const handleRedo = () => {
    if (history.active >= history.list.length - 1 || !context) return
    history.active++
    handleDrawHistory(history.active)
    const imageData = context!.getImageData(0, 0, props.width, props.height)
    return imageData
  }
  const handleClear = async () => {
    if (!context) return
    await handleRest()
    handleSaveHistory(ActionMode.RESET)
  }
  const handleDownload = (name: string = `draw-studio-${ Date.now() }`) => {
    if (!canvasRef.value) return
    const canvas = canvasRef.value!
    const link = document.createElement('a')
    link.download = `${name}.png`
    link.href = canvas!.toDataURL('image/png')
    link.click()
  }

  const onMouseDown = (event: Event) => {
    if (!canvasRef.value) return
    if ('buttons' in event && event.buttons !== 1) return

    const { mode } = props
    if (mode === Mode.PENCIL) {
      handlePencil(event)
    } else if (mode === Mode.PEN) {
      handlePen()
    }
  }
  const onMouseUp = (event: Event) => {
    if (!canvasRef.value) return
    // 判断鼠标是否在canvas内
    const isInside = determineIsInsideByEvent(canvasRef.value, event)
    if (!isInside) return
    if ('buttons' in event && event.buttons !== 1) return

    if (props.mode === Mode.PENCIL) {
      handleStopDraw()
    } else if (props.mode === Mode.PEN) {

    }
  }
  const onMouseEnter = (event: Event) => {
    if (!('buttons' in event)) return
    if (event.buttons !== 1) return
    if (!isDrawing.value) return

    if (props.mode === Mode.PENCIL) {
      const eventPosition = getEventPosition(canvasRef.value!, event)
      if (!lastIsInside.value) {
        const canvas = canvasRef.value!
        const edgePosition = getEdgePosition(canvas, lastPosition, eventPosition)
        handleCurrentDrawLines([lastPosition, edgePosition, eventPosition])
      }
      lastPosition.x = eventPosition.x
      lastPosition.y = eventPosition.y
      lastIsInside.value = true
    } else if (props.mode === Mode.PEN) {

    }
  }

  const onTouchStart = (event: Event) => {
    event.preventDefault()
    const { mode } = props
    if (mode === Mode.PENCIL) {
      handlePencil(event)
    } else if (mode === Mode.PEN) {
      const canvas = canvasRef.value!
      const isInside = determineIsInsideByEvent(canvas, event)
      if (!isInside) return
      isDrawing.value = true
      const { x, y } = getEventPosition(canvas, event)
      lastPosition.x = x
      lastPosition.y = y
      lastIsInside.value = true
      const first = drawingPositions.value[0]
      const isClosed = first && Math.abs(first.x - x) <= 10 && Math.abs(first.y - y) <= 10
      if (drawingPositions.value.length > 2 && isClosed) {
        drawingPositions.value.push({ ...first })
        handleCurrentDrawLines(drawingPositions.value)
        handleStopDraw()
      } else {
        drawingPositions.value.push({ x, y })
        handleCurrentDrawLines(drawingPositions.value)
        handleCurrentDrawPoints([{ x, y }])
      }
      emits('draw', canvas, context!, { x, y })
    }
  }
  const onTouchMove = (event: Event) => {
    const canvas = canvasRef.value
    if (!isDrawing.value || !canvas || !context) return
    if (props.mode === Mode.PENCIL) {
      event.preventDefault()
      const eventPosition = getEventPosition(canvas, event)
      handleCurrentDrawLines([lastPosition, eventPosition])
      lastPosition.x = eventPosition.x
      lastPosition.y = eventPosition.y
      drawingPositions.value.push(eventPosition)
      emits('draw', canvas, context!, { x: eventPosition.x, y: eventPosition.y })
    }
  }
  const onTouchEnd = (event: Event) => {
    if (props.mode === Mode.PENCIL) {
      handleStopDraw()
    } else if (props.mode === Mode.PEN) {

    }
  }

  const onUndo = () => {
    const imageData = handleUndo()
    emits('undo', canvasRef.value!, context!, imageData!)
  }
  const onRedo = () => {
    const imageData = handleRedo()
    emits('redo', canvasRef.value!, context!, imageData!)
  }
  const onClear = () => {
    handleClear()
    emits('clear', canvasRef.value!, context!)
  }

  const onModeChange = (value: ModeType) => {
    insideMode.value = value
    emits('update:mode', value)
  }
  const onLineWidthChange = (value: number) => {
    insideLineWidth.value = value
    emits('update:line-width', value)
  }
  const onColorChange = (value: string) => {
    insideColor.value = value
    emits('update:color', value)
  }

  const onDownload = () => {
    handleDownload()
    emits('download', canvasRef.value!, context!)
  }

  const init = async () => {
    if (!canvasRef.value) return
    context = canvasRef.value.getContext('2d')
    if (!context) return
    if (props.useOffscreen) {
      const { width, height } = props
      offscreenCanvas = document.createElement('canvas')
      offscreenCanvas.width = width
      offscreenCanvas.height = height
      offscreenContext = offscreenCanvas.getContext('2d')
    }
    await handleRest()
    handleSaveHistory(ActionMode.RESET)
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    handleGlobalListenersRemove()
  })

  defineExpose({
    canvas: canvasRef.value,
    context,
    undo: handleUndo,
    redo: handleRedo,
    clear: handleClear,
    download: handleDownload
  })
</script>

<style lang="scss" scoped>
  @use '@draw-studio/theme-chalk/src/draw-studio.scss';
</style>
