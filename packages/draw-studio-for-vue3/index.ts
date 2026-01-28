import { vueInstall } from '@draw-studio/utils'

import Component from './src/draw-studio.vue'

export const DrawStudio = vueInstall(Component)
export default DrawStudio
export * from './src/draw-studio'

declare module 'vue' {
  export interface GlobalComponents {
    DrawStudio: typeof DrawStudio
  }
}
