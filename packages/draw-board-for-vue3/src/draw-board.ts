import { ExtractPropTypes } from 'vue'

export const drawBoardProps = {
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
  }
} as const

export type DrawBoardType = ExtractPropTypes<typeof drawBoardProps>
