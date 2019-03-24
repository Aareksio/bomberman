<template>
  <div class="bomberman-explosion" :style="transformation">
    <img class="bomberman-explosion__image" src="../assets/fire.png" alt="x">
  </div>
</template>

<script>
  import { Explosion } from '../models/Explosion';

  export default {
    name: 'bomberman-explosion',
    props: {
      explosion: Explosion
    },
    computed: {
      transformation() {
        return `transform: translate(${this.explosion.position.x * 2}rem, ${this.explosion.position.y * 2}rem)`;
      }
    }
  }
</script>

<style lang="scss">
  .bomberman-explosion {
    position: absolute;
    left: 1px;
    top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
  }

  .bomberman-explosion__image {
    height: 1.5rem;
  }
</style>
