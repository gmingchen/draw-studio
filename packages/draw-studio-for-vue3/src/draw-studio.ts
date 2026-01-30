import { ExtractPropTypes, PropType } from 'vue'
import { Position, imageMode, ImageMode } from '@draw-studio/utils'

export enum Mode {
  PENCIL = 'pencil',
  PEN = 'pen',
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle'
}
export const modes = [Mode.PENCIL, Mode.PEN,/*  Mode.CIRCLE, Mode.RECTANGLE */] as const
export type ModeType = typeof modes[number]

export const toolbarPositions= ['top', 'right', 'bottom', 'left'] as const
export type ToolbarPositionType = typeof toolbarPositions[number]

export const drawStudioProps = {
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
  useBackgroundImage: {
    type: Boolean,
    default: () => false
  },
  backgroundImage: {
    type: String,
    default: () => ''
  },
  backgroundImageMode: {
    type: String as PropType<ImageMode>,
    default: () => imageMode[0]
  },

  mode: {
    type: String as PropType<ModeType>,
    default: () => modes[0]
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
    default: () => toolbarPositions[0]
  },
  useHistory: {
    type: Boolean,
    default: () => true
  },
  maxHistory: {
    type: Number,
    default: () => 20
  },
  useOffscreen: {
    type: Boolean,
    default: () => false
  }
}

export type DrawStudioType = ExtractPropTypes<typeof drawStudioProps>

export interface DrawStudioEmits {
  (e: 'update:mode', mode: string): void
  (e: 'update:line-width', lineWidth: number): void
  (e: 'update:color', color: string): void
  (e: 'draw', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, position: Position): void
  (e: 'undo', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imageData: ImageData): void
  (e: 'redo', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imageData: ImageData): void
  (e: 'clear', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void
  (e: 'download', canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void
}

export enum ActionMode {
  RESET = 'reset',
}
export const actionModes = [ActionMode.RESET, ...modes] as const
export type DrawActionModeType = typeof actionModes[number]
export interface DrawAction {
  id: number,
  timestamp: number,
  mode: DrawActionModeType,
  lineWidth: number
  color: string
  positions: Position[]
}
