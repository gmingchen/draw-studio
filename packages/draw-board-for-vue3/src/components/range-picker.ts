import { ExtractPropTypes } from 'vue'

export const rangePickerProps = {
  modelValue: {
    type: Number,
    default: 2
  }
} as const

export type RangePickerType = ExtractPropTypes<typeof rangePickerProps>
