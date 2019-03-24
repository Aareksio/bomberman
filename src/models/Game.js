import { Player } from './Player';
import { GameMap } from './GameMap';
import { Direction } from '../resources/Direction';
import { Bomb } from './Bomb';
import { Explosion } from './Explosion';

export class Game {
  constructor (x, y) {
    this.options = { x, y };

    this.activeDirections = [];
    this.nextTick = null;

    this.player = new Player();
    this.map = new GameMap(x, y);
    this.bombs = [];
    this.explosions = [];

    this.tick();
  }

  get direction() {
    return this.activeDirections[0];
  }

  onKeyDown($event) {
    const direction = Direction.$fromKey($event.key);

    if (direction) {
      const directionIndex = this.activeDirections.indexOf(direction);
      if (directionIndex > 0) this.activeDirections.splice(directionIndex, 1);
      if (directionIndex !== 0) this.activeDirections.unshift(direction);
    }

    if ($event.key === ' ') this.placeBomb();
    if ($event.key === 'Backspace') window.location.reload();
  }

  onKeyUp($event) {
    const direction = Direction.$fromKey($event.key);

    if (direction) {
      const directionIndex = this.activeDirections.indexOf(direction);
      if (directionIndex !== -1) this.activeDirections.splice(directionIndex, 1);
    }
  }

  movePlayer() {
    if (!this.player.isAlive) return;
    if (!this.direction) return;
    if (Date.now() - this.player.lastMove < this.player.speed) return;

    const playerPosition = { ...this.player.position };

    if (this.direction === Direction.UP) playerPosition.y--;
    else if (this.direction === Direction.DOWN) playerPosition.y++;
    else if (this.direction === Direction.LEFT) playerPosition.x--;
    else if (this.direction === Direction.RIGHT) playerPosition.x++;

    const tile = this.map.getTile(playerPosition.x, playerPosition.y);
    if (!tile || tile.isObstacle) return;

    const bomb = this.getBomb(playerPosition.x, playerPosition.y);
    if (bomb) return;

    this.player.lastMove = Date.now();
    this.player.moveTo(playerPosition);

    this.player.pickUp(tile);
  }

  processBombs() {
    for (const bomb of this.bombs) {
      if (bomb.explodesAt > Date.now()) continue;
      this.explode(bomb);
    }
  }

  explode(bomb) {
    const bombIndex = this.bombs.findIndex(el => el.id === bomb.id);
    if (bombIndex === -1) return; // Already exploded

    this.bombs.splice(bombIndex, 1);
    if (bomb.owner.id === this.player.id) this.player.bombsPlaced--;

    const bombsToChain = [];
    this.explosions.push(new Explosion(bomb.position));

    for (let direction = 1; direction <= 4; ++direction) {
      for (let distance = 1; distance <= bomb.range; ++distance) {
        const { x, y } = this.shiftCoordinate(bomb.position.x, bomb.position.y, direction, distance);
        if (!this.map.isOnMap(x, y)) continue;

        const tile = this.map.getTile(x, y);
        if (tile.isWall) break;

        const tileBomb = this.getBomb(x, y);
        if (tileBomb) bombsToChain.push(tileBomb);

        this.explosions.push(new Explosion({ x, y }));

        if (tile.isObstacle) {
          if (tile.isDestructibleWall) tile.isDestructibleWall = false;
          break;
        }
      }
    }

    for (const bomb of bombsToChain) {
      this.explode(bomb);
    }
  }

  processExplosions() {
    for (const explosion of this.explosions) {
      if (explosion.endsAt <= Date.now()) {
        this.explosions.splice(this.explosions.findIndex(el => el.id === explosion.id), 1);
        return;
      }

      if (this.isSamePosition(this.player.position, explosion.position)) {
        this.player.kill();
      }
    }
  }

  placeBomb() {
    if (!this.player.isAlive) return;
    if (this.player.bombsPlaced >= this.player.maxBombs) return;
    if (this.getBomb(this.player.position.x, this.player.position.y)) return;

    this.player.bombsPlaced++;

    const bomb = new Bomb(this.player, this.player.position);
    this.bombs.push(bomb);
  }

  getBomb(x, y) {
    for (const bomb of this.bombs) {
      if (this.isSamePosition({ x, y }, bomb.position)) return bomb;
    }
  }

  shiftCoordinate(x, y, direction, distance) {
    switch (direction) {
      case Direction.UP:
        return { x, y: y - distance };
      case Direction.DOWN:
        return { x, y: y + distance };
      case Direction.LEFT:
        return { x: x - distance, y };
      case Direction.RIGHT:
        return { x: x + distance, y };
    }
  }

  tick() {
    this.movePlayer();
    this.processBombs();
    this.processExplosions();

    this.nextTick = requestAnimationFrame(() => this.tick());
  }

  isSamePosition(positionA, positionB) {
    return positionA.x === positionB.x && positionA.y === positionB.y;
  }
}
