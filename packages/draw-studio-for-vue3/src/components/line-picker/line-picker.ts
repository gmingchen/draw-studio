import { ExtractPropTypes, PropType } from 'vue'

export const linePickerProps = {
  modelValue: {
    type: Number,
    default: () => 1
  },
  sizes: {
    type: Array as PropType<number[]>,
    default: () => Array.from({ length: 30 }, (_, i) => i + 1)
  }
}

export type LinePickerType = ExtractPropTypes<typeof linePickerProps>

export interface LinePickerEmits {
  (e: 'change', line: number): void
}
