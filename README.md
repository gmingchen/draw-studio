# DrawStudio - Vue 3 绘图板组件

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
  </p>

  <p align="center">
    <strong>⭐ 如果你觉得这个项目有用，欢迎给它点个星！</strong>
  </p>
</div>

基于 Canvas 的 Vue 3 绘图板组件，支持撤销/重做、背景图片、H5 移动端等功能。

## 特性

- ✏️ **自由绘制** - 支持铅笔等绘图工具
- 🔄 **历史记录** - 撤销/重做功能，可配置最大步数
- 🖼️ **背景图片** - 支持设置背景图片，多种填充模式
- 📱 **H5 支持** - 完美支持移动端触摸操作
- ⚡ **性能优化** - 离屏 Canvas 技术，撤销/重做无闪烁
- 🎨 **可定制** - 支持自定义工具栏位置、颜色、线宽等
- 💾 **导出功能** - 支持导出为 PNG 格式
- 🔧 **TypeScript** - 完整的类型定义

## 安装

```bash
npm install draw-studio
# 或
yarn add draw-studio
# 或
pnpm add draw-studio
```

## 快速开始

### 全局注册

```javascript
import { createApp } from 'vue'
import DrawStudio from 'draw-studio'
import 'draw-studio/dist/draw-studio.css'

const app = createApp(App)
app.use(DrawStudio)
```

### 局部使用

```vue
<template>
  <DrawStudio
    :width="800"
    :height="600"
    :color="'#000000'"
    :lineWidth="3"
    :backgroundColor="'#ffffff'"
    @draw="handleDraw"
  />
</template>

<script setup>
import { DrawStudio } from 'draw-studio'
import 'draw-studio/dist/draw-studio.css'

const handleDraw = (canvas, context, position) => {
  console.log('绘制中', position)
}
</script>
```

## 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `Number` | `500` | 画布宽度（px） |
| `height` | `Number` | `500` | 画布高度（px） |
| `backgroundColor` | `String` | `'#FFFFFF'` | 背景颜色 |
| `useBackgroundImage` | `Boolean` | `false` | 是否使用背景图片 |
| `backgroundImage` | `String` | `''` | 背景图片 URL |
| `backgroundImageMode` | `String` | `'cover'` | 背景图片填充模式 |
| `lineWidth` | `Number` | `3` | 线条宽度（1-50px） |
| `color` | `String` | `'#000000'` | 绘制颜色 |
| `useToolbar` | `Boolean` | `true` | 是否显示工具栏 |
| `toolbarPosition` | `String` | `'top'` | 工具栏位置：`'top'`/`'right'`/`'bottom'`/`'left'` |
| `useHistory` | `Boolean` | `true` | 是否启用历史记录 |
| `maxHistory` | `Number` | `20` | 最大历史记录步数 |
| `useOffscreen` | `Boolean` | `false` | 是否使用离屏Canvas优化 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:line-width` | `lineWidth: number` | 线条宽度变化 |
| `update:color` | `color: string` | 颜色变化 |
| `draw` | `canvas, context, position` | 绘制时触发 |
| `undo` | `canvas, context, imageData` | 撤销时触发 |
| `redo` | `canvas, context, imageData` | 重做时触发 |
| `clear` | `canvas, context` | 清空画布时触发 |
| `download` | `canvas, context` | 下载图片时触发 |

## 使用示例

### 基础配置

```vue
<template>
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
</template>
```

### 背景图片

```vue
<template>
  <DrawStudio
    :width="800"
    :height="600"
    :useBackgroundImage="true"
    :backgroundImage="'https://example.com/image.jpg'"
    :backgroundImageMode="'contain'"
  />
</template>
```

### 自定义工具栏

```vue
<template>
  <div>
    <div class="custom-toolbar">
      <button @click="handleUndo">撤销</button>
      <button @click="handleRedo">重做</button>
      <button @click="handleClear">清空</button>
      <button @click="handleDownload">下载</button>
    </div>
    
    <DrawStudio
      ref="drawStudioRef"
      :width="800"
      :height="600"
      :useToolbar="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DrawStudio } from 'draw-studio'
import 'draw-studio/dist/draw-studio.css'

const drawStudioRef = ref(null)

const handleUndo = () => {
  drawStudioRef.value?.undo()
}

const handleRedo = () => {
  drawStudioRef.value?.redo()
}

const handleClear = () => {
  drawStudioRef.value?.clear()
}

const handleDownload = () => {
  drawStudioRef.value?.download()
}
</script>
```

## CDN 使用

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/draw-studio/dist/draw-studio.css">
</head>
<body>
  <div id="app">
    <draw-studio
      :width="800"
      :height="600"
      :color="'#000000'"
      :lineWidth="3"
    />
  </div>
  
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/draw-studio/dist/draw-studio.umd.js"></script>
  <script>
    const { createApp } = Vue
    const { DrawStudio } = DrawStudioVue3
    
    createApp({
      components: { DrawStudio }
    }).mount('#app')
  </script>
</body>
</html>
```

## 暴露的方法

通过 `ref` 可以调用以下方法：

| 方法 | 说明 |
|------|------|
| `undo()` | 执行撤销 |
| `redo()` | 执行重做 |
| `clear()` | 清空画布 |
| `download(name?)` | 下载图片，可指定文件名 |

## 开发

```bash
# 克隆项目
git clone https://github.com/gmingchen/draw-studio.git
cd draw-studio

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev:vue3

# 构建
pnpm run build
```

## 项目结构

```
draw-studio/
├── src/                   # 主入口
├── packages/              # 包目录
│   ├── draw-studio-for-vue3/  # Vue 3 组件实现
│   │   ├── src/              # 组件源代码
│   │   │   ├── components/   # 子组件
│   │   │   ├── draw-studio.ts  # 类型和属性定义
│   │   │   └── draw-studio.vue  # 主组件
│   │   └── package.json      # 包配置
│   ├── theme-chalk/          # 样式主题
│   │   └── src/              # 样式源代码
│   └── utils/                # 工具函数
│       └── canvas.ts          # Canvas 相关工具
├── play/                  # 演示项目
│   └── vue3/               # Vue 3 演示
├── dist/                  # 构建输出
├── package.json           # 项目配置
└── README.md              # 项目文档
```

## 联系方式

- **GitHub**: [gmingchen/draw-studio](https://github.com/gmingchen/draw-studio)
- **Issue**: 欢迎在 [GitHub Issues](https://github.com/gmingchen/draw-studio/issues) 提出问题和建议
- **贡献**: 欢迎提交 Pull Request 来改进这个项目

### 扫码交流

<div align="center">
  <table>
    <tr>
      <td align="center">
        <p>个人微信</p>
        <img src="./contact/wechat.png" alt="个人微信" width="200" />
      </td>
      <td align="center">
        <p>微信群</p>
        <img src="./contact/wechat-group.jpg" alt="微信群" width="200" />
      </td>
    </tr>
  </table>
</div>
