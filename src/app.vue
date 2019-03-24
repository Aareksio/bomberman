<template>
  <div id="app">
    <app-bomberman></app-bomberman>
  </div>
</template>

<script>
import AppBomberman from './components/app-bomberman.vue'

export default {
  name: 'app',
  components: { AppBomberman }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
