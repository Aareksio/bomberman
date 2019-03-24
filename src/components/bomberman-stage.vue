<template>
  <div class="bomberman-stage">
    <bomberman-map :map="game.map"></bomberman-map>
    <bomberman-player :player="game.player"></bomberman-player>
    <bomberman-bomb v-for="bomb in game.bombs" :bomb="bomb" :key="`bomb-${bomb.id}`"></bomberman-bomb>
    <bomberman-exposion v-for="explosion in game.explosions" :explosion="explosion" :key="`explosion-${explosion.id}`"></bomberman-exposion>
  </div>
</template>

<script>
  import BombermanPlayer from './bomberman-player';
  import BombermanMap from './bomberman-map';
  import BombermanBomb from './bomberman-bomb';
  import BombermanExposion from './bomberman-explosion';

  import { Game } from '../models/Game';

  export default {
    name: 'bomberman-stage',
    props: {
      game: Game
    },
    components: { BombermanExposion, BombermanMap, BombermanPlayer, BombermanBomb }
  }
</script>

<style lang="scss">
  .bomberman-stage {
    position: relative;
  }
</style>
