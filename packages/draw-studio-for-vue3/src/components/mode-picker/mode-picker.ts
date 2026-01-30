import { ExtractPropTypes, PropType } from 'vue'
import { ModeType, modes } from '../../draw-studio'

export { modes }

export const modePickerProps = {
  modelValue: {
    type: String as PropType<ModeType>,
    default: () => modes[0]
  }
}

export type ModePickerType = ExtractPropTypes<typeof modePickerProps>

export interface ModePickerEmits {
  (e: 'change', mode: ModeType): void
}
