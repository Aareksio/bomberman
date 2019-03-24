<template>
  <div class="bomberman">
    <bomberman-stage :player-position="playerPosition"></bomberman-stage>
  </div>
</template>

<script>
  import BombermanStage from './bomberman-stage';

  const Direction = {
    STAND: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
  };

  export default {
    name: 'app-bomberman',
    components: { BombermanStage },
    data() {
      return {
        direction: Direction.STAND,
        playerPosition: { x: 0, y: 0 },
        lastMove: Date.now(),
        nextTick: null,
        moveTime: 250
      };
    },
    mounted() {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);

      this.nextTick = requestAnimationFrame(() => this.tick());
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
    },
    methods: {
      onKeyDown($event) {
        console.log('keyDown', $event.key);

        switch ($event.key) {
          case 'ArrowUp':
            this.direction = Direction.UP;
            break;
          case 'ArrowDown':
            this.direction = Direction.DOWN;
            break;
          case 'ArrowLeft':
            this.direction = Direction.LEFT;
            break;
          case 'ArrowRight':
            this.direction = Direction.RIGHT;
            break;
        }
      },
      onKeyUp($event) {
        switch ($event.key) {
          case 'ArrowUp':
          case 'ArrowDown':
          case 'ArrowLeft':
          case 'ArrowRight':
            // this.direction = Direction.STAND;
            break;
        }
      },
      move() {
        console.log('move', Date.now(), this.lastMove, this.direction);

        this.lastMove = Date.now();

        switch (this.direction) {
          case Direction.UP:
            this.playerPosition.y--;
            if (this.playerPosition.y < 0) this.playerPosition.y = 0;
            break;
          case Direction.DOWN:
            this.playerPosition.y++;
            if (this.playerPosition.y > 5) this.playerPosition.y = 5;
            break;
          case Direction.LEFT:
            this.playerPosition.x--;
            if (this.playerPosition.x < 0) this.playerPosition.x = 0;
            break;
          case Direction.RIGHT:
            this.playerPosition.x++;
            if (this.playerPosition.x > 5) this.playerPosition.x = 5;
            break;
        }

        this.direction = Direction.STAND;
      },
      tick() {
        const shouldMove = (Date.now() - this.lastMove > this.moveTime) && (this.direction !== Direction.STAND);
        if (shouldMove) this.move();

        this.nextTick = requestAnimationFrame(() => this.tick());
      }
    }
  };
</script>

<style lang="scss">

</style>
