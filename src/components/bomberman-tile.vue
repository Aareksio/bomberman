<template>
  <div class="bomberman-tile">
    <img class="bomberman-tile__wall" src="../assets/wall.png" alt="#" v-if="tile.isWall">
    <img class="bomberman-tile__wall" src="../assets/wall-destructible.png" alt="#" v-else-if="tile.isDestructibleWall">
    <img class="bomberman-tile__pickup" :key="`pickup-${tile.pickup.id}`" :src="tile.pickup.image" alt="." v-else-if="tile.pickup">
  </div>
</template>

<script>
  import { Tile } from '../models/Tile';

  export default {
    name: 'bomberman-tile',
    props: {
      tile: Tile
    }
  }
</script>

<style lang="scss">
  .bomberman-tile {
    height: 2rem;
    width: 2rem;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bomberman-tile__wall {
    height: 100%;
    width: 100%;
  }

  .bomberman-tile__pickup {
    position: absolute;
    top: 10%;
    left: 10%;
    max-height: 80%;
    max-width: 80%;
  }
</style>
