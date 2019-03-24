<template>
  <div class="bomberman-map">
    <div class="bomberman-map__row" v-for="(row, y) in map.rows" :key="`row-${y}`">
      <bomberman-tile :tile="tile" v-for="(tile, x) in row" :key="`tile-${x}-${y}`"></bomberman-tile>
    </div>
  </div>
</template>

<script>
  import { GameMap } from '../models/GameMap';
  import BombermanTile from './bomberman-tile';

  export default {
    name: 'bomberman-map',
    components: { BombermanTile },
    props: {
      map: GameMap
    }
  };
</script>

<style lang="scss">
  .bomberman-map {
    border: 1px solid #cccccc;
    box-sizing: border-box;
  }

  .bomberman-map__row {
    display: flex;
  }
</style>
