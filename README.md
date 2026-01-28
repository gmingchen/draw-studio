# DrawBoard - 强大的 Vue 3 绘图板插件

一个功能丰富、支持多种艺术风格的 Vue 3 绘图板插件，基于 Canvas 实现，提供流畅的绘图体验和丰富的定制选项。

## ✨ 特性

- 🎨 **多种艺术风格支持**：内置插图风格、水墨风格等多种艺术效果
- ✏️ **丰富的绘图工具**：铅笔、直线等多种绘图工具
- 🎯 **精确的颜色选择**：支持颜色选择器和预设颜色
- 📏 **可调节的线条宽度**：灵活控制线条粗细
- 🔄 **历史记录功能**：支持撤销/重做操作
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🎨 **可定制的工具栏**：支持自定义工具栏位置和显示
- 🔧 **TypeScript 支持**：完整的类型定义

## 📦 安装

### 方式一：npm

```bash
npm install draw-board-vue3
```

### 方式二：yarn

```bash
yarn add draw-board-vue3
```

### 方式三：pnpm

```bash
pnpm add draw-board-vue3
```

## 🚀 基本使用

### 全局注册

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import DrawBoard from 'draw-board-vue3'
import 'draw-board-vue3/dist/draw-board.css'

const app = createApp(App)
app.use(DrawBoard)
app.mount('#app')
```

### 局部导入

```vue
<template>
  <div class="app">
    <h1>DrawBoard 示例</h1>
    <DrawBoard
      :width="800"
      :height="600"
      :color="'#000000'"
      :lineWidth="3"
      :backgroundColor="'#ffffff'"
      :useToolbar="true"
      :toolbarPosition="'top'"
      @draw="handleDraw"
      @undo="handleUndo"
      @redo="handleRedo"
      @clear="handleClear"
      @download="handleDownload"
    />
  </div>
</template>

<script setup>
import { DrawBoard } from 'draw-board-vue3'
import 'draw-board-vue3/dist/draw-board.css'

const handleDraw = (canvas, context, position) => {
  console.log('绘制中', position)
}

const handleUndo = (canvas, context, imageData) => {
  console.log('撤销操作')
}

const handleRedo = (canvas, context, imageData) => {
  console.log('重做操作')
}

const handleClear = (canvas, context) => {
  console.log('清空画布')
}

const handleDownload = (canvas, context) => {
  console.log('下载图片')
}
</script>
```

## 📝 组件属性

| 属性名 | 类型 | 默认值 | 描述 |
|-------|------|-------|------|
| `width` | `Number` | `500` | 画布宽度 |
| `height` | `Number` | `500` | 画布高度 |
| `backgroundColor` | `String` | `'#FFFFFF'` | 画布背景颜色 |
| `lineWidth` | `Number` | `3` | 线条宽度 |
| `color` | `String` | `'#000000'` | 绘制颜色 |
| `useToolbar` | `Boolean` | `true` | 是否显示工具栏 |
| `toolbarPosition` | `String` | `'top'` | 工具栏位置，可选值：`'top'`、`'right'`、`'bottom'`、`'left'` |
| `useHistory` | `Boolean` | `true` | 是否启用历史记录功能 |
| `maxHistory` | `Number` | `20` | 最大历史记录数量 |

## 🎉 事件

| 事件名 | 参数 | 描述 |
|-------|------|------|
| `update:line-width` | `lineWidth: number` | 线条宽度变更时触发 |
| `update:color` | `color: string` | 颜色变更时触发 |
| `draw` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, position: Position` | 绘制时触发 |
| `undo` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imageData: ImageData` | 撤销操作时触发 |
| `redo` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imageData: ImageData` | 重做操作时触发 |
| `clear` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D` | 清空画布时触发 |
| `download` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D` | 下载图片时触发 |

## 🎨 艺术风格

### 插图风格

通过调整颜色和线条宽度，创建精美的插图效果：

```vue
<DrawBoard
  :width="800"
  :height="600"
  :color="'#333333'"
  :lineWidth="2"
  :backgroundColor="'#f8f8f8'"
/>
```

### 水墨风格

使用深色线条和浅色背景，营造水墨效果：

```vue
<DrawBoard
  :width="800"
  :height="600"
  :color="'#2c2c2c'"
  :lineWidth="4"
  :backgroundColor="'#f0f0f0'"
/>
```

## 📚 高级用法

### 自定义工具栏

```vue
<template>
  <div class="custom-toolbar">
    <!-- 自定义工具栏 -->
    <div class="toolbar-buttons">
      <button @click="setTool('pencil')">铅笔</button>
      <button @click="setTool('line')">直线</button>
      <button @click="undo">撤销</button>
      <button @click="redo">重做</button>
      <button @click="clear">清空</button>
      <button @click="download">下载</button>
    </div>
    
    <!-- 不带工具栏的绘图板 -->
    <DrawBoard
      ref="drawBoardRef"
      :width="800"
      :height="600"
      :useToolbar="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DrawBoard } from 'draw-board-vue3'
import 'draw-board-vue3/dist/draw-board.css'

const drawBoardRef = ref(null)

const setTool = (tool) => {
  // 设置工具逻辑
}

const undo = () => {
  // 撤销操作
}

const redo = () => {
  // 重做操作
}

const clear = () => {
  // 清空画布
}

const download = () => {
  // 下载图片
}
</script>
```

### 结合其他组件使用

```vue
<template>
  <div class="app">
    <h1>DrawBoard 与其他组件结合</h1>
    
    <div class="controls">
      <label>颜色：</label>
      <input type="color" v-model="color" @input="updateColor">
      
      <label>线条宽度：</label>
      <input type="range" v-model.number="lineWidth" min="1" max="20" @input="updateLineWidth">
    </div>
    
    <DrawBoard
      :width="800"
      :height="600"
      :color="color"
      :lineWidth="lineWidth"
      @update:color="color = $event"
      @update:line-width="lineWidth = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DrawBoard } from 'draw-board-vue3'
import 'draw-board-vue3/dist/draw-board.css'

const color = ref('#000000')
const lineWidth = ref(3)

const updateColor = (event) => {
  color.value = event.target.value
}

const updateLineWidth = (event) => {
  lineWidth.value = Number(event.target.value)
}
</script>
```

## 🔧 开发指南

### 克隆项目

```bash
git clone https://github.com/yourusername/draw-board-vue3.git
cd draw-board-vue3
```

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev:vue3
```

### 构建

```bash
# 构建库
pnpm run build:lib

# 构建所有包
pnpm run build
```

## 📦 项目结构

```
draw-board-vue3/
├── src/              # 主入口
├── packages/         # 包目录
│   ├── draw-board-for-vue3/  # Vue 3 组件实现
│   ├── theme-chalk/          # 样式主题
│   └── utils/                # 工具函数
├── play/             # 演示项目
│   └── vue3/         # Vue 3 演示
├── dist/             # 构建输出
└── README.md         # 项目文档
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

1. Fork 本仓库
2. 创建分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系

- 作者：gumingchen
- GitHub：[https://github.com/yourusername/draw-board-vue3](https://github.com/yourusername/draw-board-vue3)

---

如果这个项目对您有帮助，请给个 ⭐️ 支持一下！
# draw-board

node: ^20.19.0 || >=22.12.0

defineOptions: 3.3+
useTemplateRef: 3.5+

defineEmits 具名元组语法: 3.3+ 

defineOptions解构: 3.5+

input type="color": html5
