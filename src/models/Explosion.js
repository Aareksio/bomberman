export class Explosion {
  constructor(position, duration = 1000) {
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.position = { ...position };
    this.endsAt = Date.now() + duration;
  }
}
