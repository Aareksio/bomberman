<template>
  <div class="bomberman">
    <bomberman-stage :game="game"></bomberman-stage>
  </div>
</template>

<script>
  import BombermanStage from './bomberman-stage';

  import { Game } from '../models/Game';

  export default {
    name: 'app-bomberman',
    components: { BombermanStage },
    data() {
      return {
        game: new Game(13, 13)
      };
    },
    mounted() {
      window.addEventListener('keydown', this.game.onKeyDown.bind(this.game));
      window.addEventListener('keyup', this.game.onKeyUp.bind(this.game));
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.game.onKeyDown.bind(this.game));
      window.removeEventListener('keyup', this.game.onKeyUp.bind(this.game));
    }
  };
</script>

<style lang="scss">

</style>
