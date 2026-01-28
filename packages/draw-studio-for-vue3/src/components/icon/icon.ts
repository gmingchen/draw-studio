import { ExtractPropTypes, PropType } from 'vue'
import  { SvgType } from './svgs/index'

export const iconProps = {
  name: {
    type: String as PropType<SvgType>,
    required: true,
  },
  size: {
    type: String,
    default: () => '20rpx',
  },
}

export type IconType = ExtractPropTypes<typeof iconProps>
