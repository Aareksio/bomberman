<template>
  <div class="bomberman-stage">
    <div class="bomberman-map">
      <div class="bomberman-map__row" v-for="i in 6" :key="`row-${i}`">
        <div class="bomberman-map__cell" v-for="j in 6" :key="`cell-${j}-${i}`"></div>
      </div>
    </div>

    <bomberman-hero :x="playerPosition.x" :y="playerPosition.y"></bomberman-hero>
  </div>
</template>

<script>
  import BombermanHero from './bomberman-hero';

  export default {
    name: 'bomberman-stage',
    props: {
      playerPosition: Object
    },
    components: { BombermanHero }
  }
</script>

<style lang="scss">
  .bomberman-stage {
    position: relative;
  }

  .bomberman-map {
    border: 1px solid #cccccc;
    box-sizing: border-box;
  }

  .bomberman-map__row {
    display: flex;
  }

  .bomberman-map__cell {
    height: 2rem;
    width: 2rem;
    border: 1px solid #cccccc;
    box-sizing: border-box;
  }
</style>
