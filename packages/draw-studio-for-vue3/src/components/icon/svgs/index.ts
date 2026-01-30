import Pencil from './pencil.vue'
import Pen from './pen.vue'
import Circle from './circle.vue'
import Rectangle from './rectangle.vue'
import Line from './line.vue'
import Download from './download.vue'
import Broom from './broom.vue'
import Left from './left.vue'
import Right from './right.vue'

export { Pencil, Pen, Circle, Rectangle, Line, Download, Broom, Left, Right }

export const svgs = ['Pencil', 'Pen', 'Circle', 'Rectangle', 'Line', 'Download', 'Broom', 'Left', 'Right']

export type SvgType = typeof svgs[number]
