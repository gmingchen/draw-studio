import { ExtractPropTypes } from 'vue'

export const rangePickerProps = {
  modelValue: {
    type: Number,
    default: () => 2
  }
}

export type RangePickerType = ExtractPropTypes<typeof rangePickerProps>
