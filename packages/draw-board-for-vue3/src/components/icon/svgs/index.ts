import Pencil from './pencil.vue'
import Line from './line.vue'
import Download from './download.vue'
import Broom from './broom.vue'
import Left from './left.vue'
import Right from './right.vue'

export { Pencil, Line, Download, Broom, Left, Right }

export const svgs = ['Pencil', 'Line', 'Download', 'Broom', 'Left', 'Right']

export type SvgType = typeof svgs[number]
