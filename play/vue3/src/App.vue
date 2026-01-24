<template>
  <div class="app">
    {{ color }}
    <DrawBoard
      v-model:color="color"
      width="500"
      height="500"
      background-color="#FFFFFF" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DrawBoard from '@draw-board/draw-board-for-vue3'

const color = ref('red')

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