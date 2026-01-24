import { vueInstall } from '@draw-board/utils'

import Component from './src/draw-board.vue'

export const DrawBoard = vueInstall(Component)
export default DrawBoard
export * from './src/draw-board'

declare module 'vue' {
  export interface GlobalComponents {
    DrawBoard: typeof DrawBoard
  }
}
