# DrawStudio - 强大的 Vue 3 绘图板插件

<div align="center">
  <p align="center">
    <a href="https://www.npmjs.com/package/draw-studio" target="_blank">
      <img src="https://img.shields.io/npm/v/draw-studio.svg?style=flat-square" alt="npm 版本" />
    </a>
    <a href="https://www.npmjs.com/package/draw-studio" target="_blank">
      <img src="https://img.shields.io/npm/dm/draw-studio.svg?style=flat-square" alt="npm 下载量" />
    </a>
    <a href="https://github.com/gmingchen/draw-studio" target="_blank">
      <img src="https://img.shields.io/github/stars/gmingchen/draw-studio.svg?style=flat-square" alt="GitHub 星星" />
    </a>
    <a href="https://github.com/gmingchen/draw-studio/blob/main/LICENSE" target="_blank">
      <img src="https://img.shields.io/github/license/gmingchen/draw-studio.svg?style=flat-square" alt="许可证" />
    </a>
  </p>
</div>

一个功能丰富、支持多种艺术风格的 Vue 3 绘图板插件，基于 Canvas 实现，提供流畅的绘图体验和丰富的定制选项。适用于在线教育、创意设计、互动应用等多种场景。

## ✨ 特性

- 🎨 **多种艺术风格支持**：内置插图风格、水墨风格等多种艺术效果，满足不同创作需求
- ✏️ **丰富的绘图工具**：铅笔、直线等多种绘图工具，支持自由切换
- 🎯 **精确的颜色选择**：集成颜色选择器和预设颜色面板，轻松获取所需色彩
- 📏 **可调节的线条宽度**：支持 1-50px 范围内的线条粗细调节，实现精细绘制
- 🔄 **历史记录功能**：内置撤销/重做功能，最多支持 20 步历史操作
- 📱 **响应式设计**：适配不同屏幕尺寸，从手机到桌面设备都能完美展示
- 🎨 **可定制的工具栏**：支持自定义工具栏位置、显示内容和样式
- 🔧 **TypeScript 支持**：完整的类型定义，提供良好的开发体验
- 💾 **导出功能**：支持将绘制内容导出为 PNG、JPG 等格式
- 🔍 **缩放功能**：支持画布缩放，便于细节绘制

## 🎯 使用场景

- **在线教育**：教师可以在课堂上实时绘制教学内容，增强互动性
- **创意设计**：设计师可以快速草图绘制，捕捉灵感
- **互动应用**：游戏、互动故事等应用中集成绘图功能
- **在线协作**：多人实时协作绘图，适用于远程团队
- **儿童教育**：提供简单易用的绘图工具，培养儿童创造力

## 📦 安装

### 方式一：npm

```bash
npm install draw-studio
```

### 方式二：yarn

```bash
yarn add draw-studio
```

### 方式三：pnpm

```bash
pnpm add draw-studio
```

## 🚀 快速开始

### 安装依赖

```bash
# 选择合适的包管理器
npm install draw-studio
# 或
yarn add draw-studio
# 或
pnpm add draw-studio
```

### 全局注册

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import DrawStudio from 'draw-studio'
import 'draw-studio/dist/draw-studio.css'

const app = createApp(App)
app.use(DrawStudio)
app.mount('#app')
```

### 局部导入

```vue
<template>
  <div class="app">
    <h1>DrawStudio 绘图板示例</h1>
    <DrawStudio
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
import { DrawStudio } from 'draw-studio'
import 'draw-studio/dist/draw-studio.css'

const handleDraw = (canvas, context, position) => {
  console.log('绘制中，当前位置:', position)
}

const handleUndo = (canvas, context, imageData) => {
  console.log('执行撤销操作')
}

const handleRedo = (canvas, context, imageData) => {
  console.log('执行重做操作')
}

const handleClear = (canvas, context) => {
  console.log('清空画布')
}

const handleDownload = (canvas, context) => {
  console.log('下载图片')
}
</script>

<style scoped>
.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
</style>
```

### 基础配置示例

```vue
<template>
  <div class="drawing-container">
    <DrawStudio
      :width="1000"
      :height="600"
      :backgroundColor="'#f5f5f5'"
      :lineWidth="5"
      :color="'#333333'"
      :toolbarPosition="'left'"
      :useHistory="true"
      :maxHistory="30"
    />
  </div>
</template>

<script setup>
import { DrawStudio } from 'draw-studio'
import 'draw-studio/dist/draw-studio.css'
</script>
```

## 📝 组件属性

| 属性名 | 类型 | 默认值 | 描述 |
|-------|------|-------|------|
| `width` | `Number` | `500` | 画布宽度，单位：像素 |
| `height` | `Number` | `500` | 画布高度，单位：像素 |
| `backgroundColor` | `String` | `'#FFFFFF'` | 画布背景颜色，支持 HEX、RGB、RGBA 格式 |
| `lineWidth` | `Number` | `3` | 线条宽度，范围：1-50px |
| `color` | `String` | `'#000000'` | 绘制颜色，支持 HEX、RGB、RGBA 格式 |
| `useToolbar` | `Boolean` | `true` | 是否显示工具栏 |
| `toolbarPosition` | `String` | `'top'` | 工具栏位置，可选值：`'top'`、`'right'`、`'bottom'`、`'left'` |
| `useHistory` | `Boolean` | `true` | 是否启用历史记录功能 |
| `maxHistory` | `Number` | `20` | 最大历史记录数量，范围：1-100 |

## 🎉 事件

| 事件名 | 参数 | 描述 |
|-------|------|------|
| `update:line-width` | `lineWidth: number` | 线条宽度变更时触发 |
| `update:color` | `color: string` | 颜色变更时触发 |
| `draw` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, position: Position` | 绘制时触发，包含当前鼠标位置 |
| `undo` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imageData: ImageData` | 撤销操作时触发，包含当前画布状态 |
| `redo` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, imageData: ImageData` | 重做操作时触发，包含当前画布状态 |
| `clear` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D` | 清空画布时触发 |
| `download` | `canvas: HTMLCanvasElement, context: CanvasRenderingContext2D` | 下载图片时触发 |

### 事件处理示例

```vue
<template>
  <div class="app">
    <h1>DrawStudio 事件处理示例</h1>
    <DrawStudio
      :width="800"
      :height="600"
      @draw="onDraw"
      @undo="onUndo"
      @redo="onRedo"
      @clear="onClear"
      @download="onDownload"
      @update:line-width="onLineWidthChange"
      @update:color="onColorChange"
    />
    
    <div class="event-log">
      <h3>事件日志</h3>
      <ul>
        <li v-for="(log, index) in eventLogs" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DrawStudio } from 'draw-studio-vue3'
import 'draw-studio-vue3/dist/draw-studio.css'

const eventLogs = ref([])

const addLog = (message) => {
  eventLogs.value.push(`${new Date().toLocaleTimeString()}: ${message}`)
  // 只保留最近 10 条日志
  if (eventLogs.value.length > 10) {
    eventLogs.value.shift()
  }
}

const onDraw = (canvas, context, position) => {
  addLog(`绘制中 - 位置: (${position.x}, ${position.y})`)
}

const onUndo = (canvas, context, imageData) => {
  addLog('执行撤销操作')
}

const onRedo = (canvas, context, imageData) => {
  addLog('执行重做操作')
}

const onClear = (canvas, context) => {
  addLog('清空画布')
}

const onDownload = (canvas, context) => {
  addLog('下载图片')
}

const onLineWidthChange = (lineWidth) => {
  addLog(`线条宽度变更为: ${lineWidth}px`)
}

const onColorChange = (color) => {
  addLog(`颜色变更为: ${color}`)
}
</script>

<style scoped>
.app {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.event-log {
  flex: 1;
  min-width: 300px;
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  max-height: 600px;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}
</style>
```

## 🎨 艺术风格

### 插图风格

通过调整颜色和线条宽度，创建精美的插图效果：

```vue
<DrawStudio
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
<DrawStudio
  :width="800"
  :height="600"
  :color="'#2c2c2c'"
  :lineWidth="4"
  :backgroundColor="'#f0f0f0'"
/>
```

### 卡通风格

使用鲜艳的颜色和较粗的线条，创建卡通效果：

```vue
<DrawStudio
  :width="800"
  :height="600"
  :color="'#ff6b6b'"
  :lineWidth="5"
  :backgroundColor="'#ffffff'"
/>
```

### 素描风格

使用灰色线条和白色背景，模拟素描效果：

```vue
<DrawStudio
  :width="800"
  :height="600"
  :color="'#666666'"
  :lineWidth="2"
  :backgroundColor="'#ffffff'"
/>
```

### 艺术风格组合

您可以根据需要自由组合不同的风格参数，创造出独特的艺术效果：

```vue
<template>
  <div class="style-presets">
    <h2>艺术风格预设</h2>
    
    <div class="preset-grid">
      <!-- 插图风格 -->
      <div class="preset-item">
        <h3>插图风格</h3>
        <DrawStudio
          :width="300"
          :height="200"
          :color="'#333333'"
          :lineWidth="2"
          :backgroundColor="'#f8f8f8'"
          :useToolbar="false"
        />
      </div>
      
      <!-- 水墨风格 -->
      <div class="preset-item">
        <h3>水墨风格</h3>
        <DrawStudio
          :width="300"
          :height="200"
          :color="'#2c2c2c'"
          :lineWidth="4"
          :backgroundColor="'#f0f0f0'"
          :useToolbar="false"
        />
      </div>
      
      <!-- 卡通风格 -->
      <div class="preset-item">
        <h3>卡通风格</h3>
        <DrawStudio
          :width="300"
          :height="200"
          :color="'#ff6b6b'"
          :lineWidth="5"
          :backgroundColor="'#ffffff'"
          :useToolbar="false"
        />
      </div>
      
      <!-- 素描风格 -->
      <div class="preset-item">
        <h3>素描风格</h3>
        <DrawStudio
          :width="300"
          :height="200"
          :color="'#666666'"
          :lineWidth="2"
          :backgroundColor="'#ffffff'"
          :useToolbar="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { DrawStudio } from 'draw-studio-vue3'
import 'draw-studio-vue3/dist/draw-studio.css'
</script>

<style scoped>
.style-presets {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.preset-item {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.preset-item h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
}
</style>
```

## 📚 高级用法

### 自定义工具栏

通过禁用内置工具栏并创建自定义界面，实现完全个性化的控制体验：

```vue
<template>
  <div class="custom-toolbar">
    <!-- 自定义工具栏 -->
    <div class="toolbar-buttons">
      <button @click="undo" :disabled="!canUndo">撤销</button>
      <button @click="redo" :disabled="!canRedo">重做</button>
      <button @click="clear">清空</button>
      <button @click="download">下载</button>
    </div>

    <!-- 颜色和线条控制 -->
    <div class="tool-controls">
      <div class="control-group">
        <label>颜色：</label>
        <input type="color" v-model="color" @input="updateColor">
      </div>
      <div class="control-group">
        <label>线条宽度：</label>
        <input type="range" v-model.number="lineWidth" min="1" max="20" @input="updateLineWidth">
        <span>{{ lineWidth }}px</span>
      </div>
    </div>

    <!-- 不带工具栏的绘图板 -->
    <DrawStudio
      ref="drawStudioRef"
      :width="800"
      :height="600"
      :useToolbar="false"
      :color="color"
      :lineWidth="lineWidth"
      :tool="currentTool"
      @draw="onDraw"
      @undo="onUndo"
      @redo="onRedo"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DrawStudio } from 'draw-studio-vue3'
import 'draw-studio-vue3/dist/draw-studio.css'

const drawStudioRef = ref(null)
const color = ref('#000000')
const lineWidth = ref(3)
const canUndo = ref(false)
const canRedo = ref(false)

const updateColor = (event) => {
  color.value = event.target.value
}

const updateLineWidth = (event) => {
  lineWidth.value = Number(event.target.value)
}

const undo = () => {
  // 实现撤销逻辑
  canUndo.value = false
}

const redo = () => {
  // 实现重做逻辑
  canRedo.value = false
}

const clear = () => {
  // 实现清空逻辑
}

const download = () => {
  // 实现下载逻辑
}

const onDraw = (canvas, context, position) => {
  // 绘制时更新状态
  canUndo.value = true
  canRedo.value = false
}

const onUndo = () => {
  canUndo.value = false
  canRedo.value = true
}

const onRedo = () => {
  canUndo.value = true
  canRedo.value = false
}
</script>

<style scoped>
.custom-toolbar {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.toolbar-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.toolbar-buttons button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toolbar-buttons button:hover {
  background: #e0e0e0;
}

.toolbar-buttons button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.toolbar-separator {
  width: 1px;
  background: #ddd;
  margin: 0 10px;
}

.tool-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group input[type="range"] {
  width: 100px;
}
</style>
```

### 结合其他组件使用

与 Vue 3 的响应式系统和其他组件无缝集成：

```vue
<template>
  <div class="app">
    <h1>DrawStudio 与其他组件结合</h1>
    
    <div class="controls">
      <label>颜色：</label>
      <input type="color" v-model="color" @input="updateColor">
      
      <label>线条宽度：</label>
      <input type="range" v-model.number="lineWidth" min="1" max="20" @input="updateLineWidth">
      
      <label>画布背景：</label>
      <input type="color" v-model="backgroundColor" @input="updateBackground">
    </div>
    
    <div class="canvas-container">
      <DrawStudio
        ref="drawStudioRef"
        :width="800"
        :height="600"
        :color="color"
        :lineWidth="lineWidth"
        :backgroundColor="backgroundColor"
        @update:color="color = $event"
        @update:line-width="lineWidth = $event"
        @draw="onDraw"
      />
    </div>
    
    <div class="drawing-stats">
      <p>绘制次数：{{ drawCount }}</p>
      <p>当前工具：{{ currentTool }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { DrawStudio } from 'draw-studio-vue3'
import 'draw-studio-vue3/dist/draw-studio.css'

const drawStudioRef = ref(null)
const color = ref('#000000')
const lineWidth = ref(3)
const backgroundColor = ref('#ffffff')
const drawCount = ref(0)
const currentTool = ref('pencil')

const updateColor = (event) => {
  color.value = event.target.value
}

const updateLineWidth = (event) => {
  lineWidth.value = Number(event.target.value)
}

const updateBackground = (event) => {
  backgroundColor.value = event.target.value
}

const onDraw = () => {
  drawCount.value++
}

// 监听工具变化
watch(currentTool, (newTool) => {
  console.log('工具切换为:', newTool)
})
</script>

<style scoped>
.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.canvas-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.drawing-stats {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 14px;
}
</style>
```

### 性能优化

对于大型绘图应用，可以通过以下方式优化性能：

```vue
<template>
  <div class="performance-optimized">
    <h1>性能优化示例</h1>
    <DrawStudio
      :width="1200"
      :height="800"
      :useHistory="true"
      :maxHistory="10"  <!-- 减少历史记录数量 -->
      :lineWidth="2"
      @draw="onDraw"
    />
    <div class="performance-stats">
      <p>帧率：{{ fps }} FPS</p>
      <p>内存使用：{{ memoryUsage }} MB</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { DrawStudio } from 'draw-studio-vue3'
import 'draw-studio-vue3/dist/draw-studio.css'

const fps = ref(60)
const memoryUsage = ref(0)
let frameCount = 0
let lastTime = 0
let statsInterval = null

const updateStats = () => {
  // 模拟性能统计
  fps.value = Math.round(Math.random() * 10 + 50)
  memoryUsage.value = Math.round(Math.random() * 50 + 100)
}

const onDraw = () => {
  // 绘制时的性能优化逻辑
}

onMounted(() => {
  statsInterval = setInterval(updateStats, 1000)
})

onUnmounted(() => {
  if (statsInterval) {
    clearInterval(statsInterval)
  }
})
</script>

<style scoped>
.performance-optimized {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.performance-stats {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 14px;
}
</style>
```

## 🔧 开发指南

### 克隆项目

```bash
git clone https://github.com/gmingchen/draw-studio.git
cd draw-studio
```

### 安装依赖

```bash
# 使用 pnpm 安装依赖（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 启动 Vue 3 演示项目
pnpm run dev:vue3

# 访问地址: http://localhost:5173
```

### 构建

```bash
# 构建 Vue 3 库
pnpm run build:lib

# 构建所有包
pnpm run build

# 构建结果将输出到 dist/ 目录
```

### 代码规范

项目使用 ESLint 和 Prettier 来保证代码质量和风格一致性：

```bash
# 运行 ESLint 检查
pnpm run lint

# 运行 Prettier 格式化
pnpm run format
```

### 测试

```bash
# 运行单元测试
pnpm run test

# 运行测试并生成覆盖率报告
pnpm run test:coverage
```

## 📦 项目结构

```
draw-studio/
├── src/              # 主入口
├── packages/         # 包目录
│   ├── draw-studio-for-vue3/  # Vue 3 组件实现
│   │   ├── src/              # 组件源代码
│   │   │   ├── components/   # 子组件
│   │   │   ├── hooks/        # 自定义 hooks
│   │   │   ├── utils/        # 工具函数
│   │   │   └── index.ts      # 组件导出
│   │   └── package.json      # 包配置
│   ├── theme-chalk/          # 样式主题
│   │   └── src/              # 样式源代码
│   └── utils/                # 工具函数
├── play/             # 演示项目
│   └── vue3/         # Vue 3 演示
│       ├── src/      # 演示源代码
│       └── public/   # 静态资源
├── dist/             # 构建输出
│   ├── draw-studio-vue3/  # Vue 3 构建结果
│   └── types/            # TypeScript 类型定义
├── scripts/          # 构建脚本
├── tsconfig.json     # TypeScript 配置
├── package.json      # 项目配置
└── README.md         # 项目文档
```

### 目录说明

- **packages/draw-studio-for-vue3/**: Vue 3 组件的核心实现
- **packages/theme-chalk/**: 组件的样式主题，使用 SCSS 编写
- **packages/utils/**: 通用工具函数，供各个包使用
- **play/vue3/**: Vue 3 版本的演示项目，用于开发和测试
- **dist/**: 构建输出目录，包含最终的发布文件
- **scripts/**: 构建和发布相关的脚本

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！我们非常感谢社区的贡献。

### 贡献流程

1. **Fork 本仓库**
2. **创建分支**
   ```bash
   git checkout -b feature/AmazingFeature
   # 或修复 bug
   git checkout -b fix/BugFix
   ```
3. **提交更改**
   ```bash
   git commit -m 'Add some AmazingFeature' --no-verify
   ```
4. **推送到分支**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **打开 Pull Request**
   - 请在 PR 描述中详细说明更改内容
   - 如有相关 Issue，请引用 Issue 编号

### 开发规范

- 代码风格：遵循项目的 ESLint 和 Prettier 配置
- 提交信息：使用清晰、简洁的提交信息
- 测试：为新功能添加测试用例
- 文档：更新相关文档

### 报告问题

如果您发现了问题，请在 GitHub 上提交 Issue，包括：
- 问题描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息（浏览器、操作系统等）

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系

- 作者：gumingchen
- GitHub：[https://github.com/gmingchen/draw-studio](https://github.com/gmingchen/draw-studio)
- Email：[gumingchen@example.com](mailto:gumingchen@example.com)

## 🙏 支持

如果这个项目对您有帮助，请给个 ⭐️ 支持一下！您的支持是我们持续改进的动力。

### 如何支持

1. **Star 本仓库**：在 GitHub 上给项目点个星
2. **分享项目**：推荐给您的朋友和同事
3. **提交 Issue**：报告问题或提出建议
4. **贡献代码**：提交 Pull Request 来改进项目
5. **撰写教程**：分享您使用 DrawStudio 的经验

## 📚 相关资源

- [Vue 3 官方文档](https://v3.vuejs.org/)
- [Canvas API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

---

<div align="center">
  <p>Made with ❤️ by gumingchen</p>
  <p>© 2026 DrawStudio. All rights reserved.</p>
</div>
