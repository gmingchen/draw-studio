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
 * 判断坐标点是否在画布内
 * @param canvas 画布元素
 * @param position 坐标点
 * @returns 是否在画布内
 */
export const determineIsInsideByPosition = (canvas: HTMLCanvasElement, position: Position): boolean => {
  const { top, bottom, left, right } = canvas.getBoundingClientRect()
  const isInside = position.x >= left && position.x <= right && position.y >= top && position.y <= bottom
  return isInside
}

/**
 * 判断鼠标事件是否在画布内
 * @param event 鼠标事件或触摸事件
 * @param canvas 画布元素
 * @returns 是否在画布内
 */
export const determineIsInsideByEvent = (canvas: HTMLCanvasElement, event: Event): boolean => {
  const { clientX, clientY } = 'touches' in event ? event.touches[0] : event
  const position = { x: clientX, y: clientY }
  const isInside = determineIsInsideByPosition(canvas, position)
  return isInside
}

/**
 * 绘制多条线
 * @param context 画布上下文
 * @param positions 包含多个点坐标的数组
 * @param width 线宽
 * @param color 线色
 */
export const drawLines = (context: CanvasRenderingContext2D, positions: Array<Position>, width: number, color: string) => {
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

/**
 * 绘制一个点
 * @param context 画布上下文
 * @param position 点坐标
 * @param size 点大小
 * @param color 点颜色
 */
export const drawPoint = (context: CanvasRenderingContext2D, position: Position, size: number, color: string) => {
  context.beginPath()
  context.arc(position.x, position.y, size / 2, 0, 2 * Math.PI)
  context.fillStyle = color
  context.fill()
}

/**
 * 绘制多个点
 * @param context 画布上下文
 * @param positions 包含多个点坐标的数组
 * @param size 点大小
 * @param color 点颜色
 */
export const drawPoints = (context: CanvasRenderingContext2D, positions: Array<Position>, size: number, color: string) => {
  positions.forEach(position => {
    drawPoint(context, position, size, color)
  })
}

/**
 * 通过 fetch 获取图片数据（blob）并绘制到 canvas，彻底避免跨域
 * @param canvas 画布元素
 * @param context 画布上下文
 * @param url 图片地址
 * @returns 图片绘制完成的 Promise
 */
export const fetchImage = async (url: string): Promise<ImageBitmap> => {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Network response was not ok')
    const blob = await res.blob()
    const image = await createImageBitmap(blob)
    return image
  } catch (err) {
    throw new Error('Failed to load image by fetch: ' + (err as Error).message)
  }
}

export const imageMode = ['aspectFit', 'aspectFill', 'widthFix', 'heightFix'] as const
export type ImageMode = typeof imageMode[number]
/**
 * 绘制图片到画布
 * @param canvas 画布元素
 * @param context 画布上下文
 * @param url 图片 URL
 * @param mode 缩放模式：aspectFit / aspectFill / widthFix / heightFix
 * @param useCORS 是否使用 CORS 跨域加载图片
 * @returns 图片加载完成的 Promise
 */
export const drawImage = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  url: string,
  mode: ImageMode = imageMode[0],
  useCORS: boolean = false,
) => {
  return new Promise<void>((resolve, reject) => {
    const loadImage = (withCORS: boolean) => {
      const image = new Image()
      if (withCORS) {
        image.crossOrigin = 'anonymous'
      }
      image.onload = () => {
        const { width: cW, height: cH } = canvas
        const { width: iW, height: iH } = image
        let dW: number, dH: number

        switch (mode) {
          case 'aspectFit':
            dW = iW <= cW && iH <= cH ? iW : Math.min(cW / iW, cH / iH) * iW
            dH = iW <= cW && iH <= cH ? iH : Math.min(cW / iW, cH / iH) * iH
            break
          case 'aspectFill':
            dW = Math.max(cW / iW, cH / iH) * iW
            dH = Math.max(cW / iW, cH / iH) * iH
            break
          case 'widthFix':
            dW = cW
            dH = (cW / iW) * iH
            break
          case 'heightFix':
            dW = (cH / iH) * iW
            dH = cH
            break
          default:
            dW = iW <= cW && iH <= cH ? iW : Math.min(cW / iW, cH / iH) * iW
            dH = iW <= cW && iH <= cH ? iH : Math.min(cW / iW, cH / iH) * iH
        }

        const dx = (cW - dW) / 2
        const dy = (cH - dH) / 2

        context.clearRect(0, 0, cW, cH)
        context.drawImage(image, dx, dy, dW, dH)
        resolve()
      }

      image.onerror = () => {
        if (withCORS) {
          loadImage(!withCORS)
        } else {
          reject(new Error('Failed to load image'))
        }
      }

      image.src = url
    }

    loadImage(useCORS)
  })
}
