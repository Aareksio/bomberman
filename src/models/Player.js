import { Upgrade } from '../resources/Upgrade';

export class Player {
  constructor() {
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    this.position = {
      x: 0,
      y: 0
    };

    this.lastMove = Date.now();

    this.upgrades = {
      [Upgrade.SPEED]: 0,
      [Upgrade.BOMB_RANGE]: 0,
      [Upgrade.BOMBS]: 0
    };

    this.bombsPlaced = 0;

    this.isAlive = true;
  }

  get maxBombs() {
    return 1 + this.upgrades[Upgrade.BOMBS];
  }

  moveTo({ x, y }) {
    this.position.x = x;
    this.position.y = y;
  }

  pickUp(tile) {
    if (tile.pickup) {
      if (this.upgrades[tile.pickup.type] < 3) {
        this.upgrades[tile.pickup.type]++;
        tile.pickUp();
      }
    }
  }

  kill() {
    this.isAlive = false;
  }

  get speed() {
    switch (this.upgrades[Upgrade.SPEED]) {
      case 0:
      default:
        return 500;
      case 1:
        return 400;
      case 2:
        return 300;
      case 3:
        return 250;
    }
  }
}
