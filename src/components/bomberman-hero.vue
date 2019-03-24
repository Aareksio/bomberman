<template>
  <div class="bomberman-hero" :style="transformation">
    <img class="bomberman-hero__image" src="../assets/hero.png" alt="+">
  </div>
</template>

<script>
  export default {
    name: 'bomberman-hero',
    props: {
      x: Number,
      y: Number
    },
    computed: {
      transformation() {
        return `transform: translate(${this.x * 2}rem, ${this.y * 2}rem)`;
      }
    }
  };
</script>

<style lang="scss">
  .bomberman-hero {
    position: absolute;
    left: 1px;
    top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    transition: transform .25s linear;
  }

  .bomberman-hero__image {
    height: 1.5rem;
  }
</style>
