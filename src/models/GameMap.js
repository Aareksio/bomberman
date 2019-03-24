import { Tile } from './Tile';

export class GameMap {
  constructor(x, y) {
    this.options = { x, y };
    this.generate();
  }

  generate() {
    this.rows = Array.from({ length: this.options.y })
      .map(() => Array.from({ length: this.options.x })
        .map(() => new Tile()));

    for (let y = 0; y < this.options.y; ++y) {
      for (let x = 0; x < this.options.x; ++x) {
        if ((x === 0 || x === this.options.x - 1) && (y < 2 || y >= this.options.y - 2)) this.rows[y][x].isDestructibleWall = false;
        if ((y === 0 || y === this.options.y - 1) && (x < 2 || x >= this.options.x - 2)) this.rows[y][x].isDestructibleWall = false;
        if (x % 2 && y % 2) this.rows[y][x].isWall = true;
      }
    }
  }

  getTile(x, y) {
    if (!this.isOnMap(x, y)) return;
    return this.rows[y][x];
  }

  isOnMap(x, y) {
    if (x < 0 || y < 0) return false;
    if (x >= this.options.x || y >= this.options.y) return false;
    return true;
  }
}
