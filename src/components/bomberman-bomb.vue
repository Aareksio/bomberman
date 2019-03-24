<template>
  <div class="bomberman-bomb" :style="transformation">
    <img class="bomberman-bomb__image" src="../assets/bomb.png" alt="x">
  </div>
</template>

<script>
  import { Bomb } from '../models/Bomb';

  export default {
    name: 'bomberman-bomb',
    props: {
      bomb: Bomb
    },
    computed: {
      transformation() {
        return `transform: translate(${this.bomb.position.x * 2}rem, ${this.bomb.position.y * 2}rem)`;
      }
    }
  }
</script>

<style lang="scss">
  .bomberman-bomb {
    position: absolute;
    left: 1px;
    top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
  }

  .bomberman-bomb__image {
    height: 1.5rem;
  }
</style>
