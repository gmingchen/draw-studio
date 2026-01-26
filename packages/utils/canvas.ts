export interface Position {
  x: number
  y: number
}

export type Event = MouseEvent | TouchEvent

/**
 * 获取画布的矩形信息和缩放比例
 * @param canvas 画布元素
 * @returns 包含画布矩形信息、x、y缩放比例的对象
 */
export const getCanvasRect = (canvas: HTMLCanvasElement) => {
  const { width, height, top, right, bottom, left, x, y } = canvas.getBoundingClientRect()
  return {
    width, height,
    top, right, bottom, left,
    x, y,
    scaleX: canvas.width / width,
    scaleY: canvas.height / height
  }
}

/**
 * 获取鼠标事件在画布上的实际坐标
 * @param event 鼠标事件或触摸事件
 * @param canvas 画布元素
 * @returns 包含x、y坐标的对象
 */
export const getEventPosition = (canvas: HTMLCanvasElement, event: Event): Position => {
  const { clientX, clientY } = 'touches' in event ? event.touches[0] : event
  const { left, top, scaleX, scaleY } = getCanvasRect(canvas)
  return {
    x: (clientX - left) * scaleX,
    y: (clientY - top) * scaleY
  }
}

/**
 * 获取鼠标事件在画布上的实际坐标
 * @param x1 起始点 X 坐标
 * @param y1 起始点 Y 坐标
 * @param x2 目标点 X 坐标
 * @param y2 目标点 Y 坐标
 * @param width 画布宽度
 * @param height 画布高度
 * @returns 包含x、y坐标的对象
 */
export const getEdgePosition = (canvas: HTMLCanvasElement, position1: Position, position2: Position): Position => {
  const { x: x1, y: y1 } = position1
  const { x: x2, y: y2 } = position2

  const dx = x2 - x1
  const dy = y2 - y1
  if (dx === 0 && dy === 0) {
    return { x: x1, y: y1 }
  }
  let t = Infinity
  if(x2 < 0 && dx !== 0) {
    const lt = -x1 / dx
    if (lt > 0 && lt < t) t = lt
  }
  if (x2 > canvas.width && dx !== 0) {
    const rt = (canvas.width - x1) / dx
    if (rt > 0 && rt < t) t = rt
  }
  if (y2 < 0 && dy !== 0) {
    const tt = -y1 / dy
    if (tt > 0 && tt < t) t = tt
  }
  if (y2 > canvas.height && dy !== 0) {
    const bt = (canvas.height - y1) / dy
    if (bt > 0 && bt < t) t = bt
  }
  if (t === Infinity) {
    return { x: x1, y: y1 }
  }
  return {
    x: x1 + dx * t,
    y: y1 + dy * t
  }
}

/**
 * 判断鼠标事件是否在画布内
 * @param event 鼠标事件或触摸事件
 * @param canvas 画布元素
 * @returns 是否在画布内
 */
export const determineIsInside = (canvas: HTMLCanvasElement, event: Event): boolean => {
  const { clientX, clientY } = 'touches' in event ? event.touches[0] : event
  const { top, bottom, left, right } = canvas.getBoundingClientRect()
  const isInside = clientX >= left && clientX <= right && clientY >= top && clientY <= bottom
  return isInside
}

/**
 * 绘制多条线
 * @param context 画布上下文
 * @param positions 包含多个点坐标的数组
 * @param width 线宽
 * @param color 线色
 */
export const drawLines = (context: CanvasRenderingContext2D, positions: Array<Position>, width: number, color: string ) => {
  context.beginPath()
  positions.forEach(({ x, y }, index) => {
    if (index === 0) {
      context.moveTo(x, y)
    } else {
      context.lineTo(x, y)
    }
  })
  context.lineWidth = width
  context.strokeStyle = color
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.stroke()
}

