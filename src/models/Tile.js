import { Pickup } from './Pickup';

export class Tile {
  constructor() {
    this.pickup = null;
    this.isWall = false;
    this.isDestructibleWall = Math.random() < 0.75;

    if (this.isDestructibleWall && Math.random() < 0.15) {
      this.pickup = new Pickup(Math.floor(Math.random() * 3) + 1)
    }
  }

  pickUp() {
    this.pickup = null;
  }

  get isObstacle() {
    return this.isWall || this.isDestructibleWall;
  }
}
