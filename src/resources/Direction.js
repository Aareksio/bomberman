export const Direction = {
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
  $fromKey(key) {
    switch (key) {
      case 'ArrowUp':
      case 'w':
        return Direction.UP;
      case 'ArrowDown':
      case 's':
        return Direction.DOWN;
      case 'ArrowLeft':
      case 'a':
        return Direction.LEFT;
      case 'ArrowRight':
      case 'd':
        return Direction.RIGHT;
    }
  }
};
