import { ExtractPropTypes } from 'vue'

export const dropdownProps = {
} as const

export type DropdownType = ExtractPropTypes<typeof dropdownProps>
