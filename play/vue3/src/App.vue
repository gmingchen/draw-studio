<template>
  <div class="app">
    {{ color }}
    <DrawBoard
      v-model:line-width="lineWidth"
      v-model:color="color"
      width="500"
      height="500"
      background-color="white"
      @draw="onDraw"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DrawBoard from '@draw-board/draw-board-for-vue3'

const lineWidth = ref(2)

const color = ref('red')

const onDraw = (position) => {
  console.log(position);
  
}

</script>

<style scoped>
.app {
  padding: 20px;
  width: 700px;
  height: 700px;
  margin: 0 auto;
  background-color: #A3A0A0FF;
}
</style>