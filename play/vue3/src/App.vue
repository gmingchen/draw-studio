<template>
  <div class="app">
    <DrawStudio
      v-model:mode="mode"
      v-model:line-width="lineWidth"
      v-model:color="color"
      :use-toolbar="true"
      toolbar-position="top"
      :use-history="true"
      :use-offscreen="true"
      :max-history="20"
      :width="500"
      :height="500"
      background-color="white"
      :use-background-image="true"
      background-image-mode="aspectFill"
      :background-image="boy1"
      @draw="onDraw"/>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import DrawStudio, { ModeType, Mode } from '@draw-studio/draw-studio-for-vue3'
  import { DrawStudioVue3 } from 'draw-studio/dist/draw-studio.js'
  import 'draw-studio/dist/draw-studio.css'
  import boy1 from './boy.jpeg'
  import boy from './boy.png'
  import girl from './girl.png'

  const mode = ref<ModeType>(Mode.PENCIL)

  const lineWidth = ref(2)

  const color = ref('#FF0000')

  const onDraw = (...args: any[]) => {
    console.log(args);
  }
</script>

<style scoped>
  .app {
    padding: 20px;
    width: 700px;
    height: 700px;
    margin: 0 auto;
    background-color: #A3A0A011;
  }
</style>