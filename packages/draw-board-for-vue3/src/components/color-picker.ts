import { ExtractPropTypes } from 'vue'

export const colorPickerProps = {
  modelValue: {
    type: String,
    default: '#000000'
  }
} as const

export type ColorPickerType = ExtractPropTypes<typeof colorPickerProps>
