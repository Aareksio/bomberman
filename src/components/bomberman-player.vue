<template>
  <div class="bomberman-player" :style="transformation" :class="classList">
    <img v-if="player.isAlive" class="bomberman-player__image" src="../assets/hero.png" alt="+">
    <img v-else class="bomberman-player__image" src="../assets/death.png" alt="x">
  </div>
</template>

<script>
  import { Upgrade } from '../resources/Upgrade';

  export default {
    name: 'bomberman-player',
    props: {
      player: Object
    },
    computed: {
      transformation() {
        return `transform: translate(${this.player.position.x * 2}rem, ${this.player.position.y * 2}rem)`;
      },
      classList() {
        const classList = [];

        if (this.player.upgrades[Upgrade.SPEED]) return `bomberman-player--upgrade-speed-${this.player.upgrades[Upgrade.SPEED]}`;

        return classList;
      }
    }
  };
</script>

<style lang="scss">
  .bomberman-player {
    position: absolute;
    left: 1px;
    top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    transition: transform .5s linear;
    z-index: 2;

    &--upgrade-speed-1 {
      transition: transform .4s linear;
    }

    &--upgrade-speed-2 {
      transition: transform .3s linear;
    }

    &--upgrade-speed-3 {
      transition: transform .25s linear;
    }
  }

  .bomberman-player__image {
    height: 1.5rem;
  }
</style>
