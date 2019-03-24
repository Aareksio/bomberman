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
        directions: [],
        playerPosition: { x: 0, y: 0 },
        lastMove: Date.now(),
        nextTick: null,
        moveTime: 250
      };
    },
    computed: {
      direction() {
        return this.directions[0]
      }
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
      keyToDirection(key) {
        switch (key) {
          case 'ArrowUp':
            return Direction.UP;
          case 'ArrowDown':
            return Direction.DOWN;
          case 'ArrowLeft':
            return Direction.LEFT;
          case 'ArrowRight':
            return Direction.RIGHT;
        }
      },
      onKeyDown($event) {
        const direction = this.keyToDirection($event.key);

        if (direction) {
          const directionIndex = this.directions.indexOf(direction);
          if (directionIndex > 0) this.directions.splice(directionIndex, 1);
          if (directionIndex !== 0) this.directions.unshift(direction);
        }
      },
      onKeyUp($event) {
        const direction = this.keyToDirection($event.key);

        if (direction) {
          const directionIndex = this.directions.indexOf(direction);
          if (directionIndex !== -1) this.directions.splice(directionIndex, 1);
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
      },
      tick() {
        const shouldMove = (Date.now() - this.lastMove > this.moveTime) && this.direction;
        if (shouldMove) this.move();

        this.nextTick = requestAnimationFrame(() => this.tick());
      }
    }
  };
</script>

<style lang="scss">

</style>
