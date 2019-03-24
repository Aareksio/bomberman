import { Upgrade } from '../resources/Upgrade';

export class Bomb {
  constructor(owner, position, explosionTime = 2000) {
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.owner = owner;
    this.position = { ...position };
    this.range = 1 + owner.upgrades[Upgrade.BOMB_RANGE];
    this.explodesAt = Date.now() + explosionTime;
  }
}
