import { ExtractPropTypes, PropType } from 'vue'
import { Position } from '@draw-board/utils'

export const toolbarPosition = ['top', 'right', 'bottom', 'left'] as const
export type ToolbarPositionType = typeof toolbarPosition[number]

export const drawBoardProps = {
  width: {
    type: Number,
    default: () => 500
  },
  height: {
    type: Number,
    default: () => 500
  },
  backgroundColor: {
    type: String,
    default: () => '#FFFFFF'
  },
  lineWidth: {
    type: Number,
    default: () => 3
  },
  color: {
    type: String,
    default: () => '#000000'
  },
  useToolbar: {
    type: Boolean,
    default: () => true
  },
  toolbarPosition: {
    type: String as PropType<ToolbarPositionType>,
    default: () => toolbarPosition[0]
  },
  useHistory: {
    type: Boolean,
    default: () => true
  },
  maxHistory: {
    type: Number,
    default: () => 20
  }
}

export type DrawBoardType = ExtractPropTypes<typeof drawBoardProps>

export interface DrawBoardEmits {
  (e: 'update:line-width', lineWidth: number): void
  (e: 'update:color', color: string): void
  (e: 'draw', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, position: Position): void
  (e: 'undo', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imageData: ImageData): void
  (e: 'redo', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imageData: ImageData): void
  (e: 'clear', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void
  (e: 'download', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void
}
