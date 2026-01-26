import { ExtractPropTypes } from 'vue'
import { Position } from '@draw-board/utils'

export const drawBoardProps = {
  lineWidth: {
    type: Number,
    default: 3
  },
  color: {
    type: String,
    default: '#000000'
  },
  width: {
    type: [Number, String],
    default: 500
  },
  height: {
    type: [Number, String],
    default: 500
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },

  useHistory: {
    type: Boolean,
    default: true
  },
  maxHistory: {
    type: Number,
    default: 20
  }
} as const

export type DrawBoardType = ExtractPropTypes<typeof drawBoardProps>

export interface DrawBoardEmits {
  (e: 'update:line-width', lineWidth: number): void
  (e: 'update:color', color: string): void
  (e: 'draw', position: Position): void
}
