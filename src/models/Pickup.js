import UpgradeSpeedImage from '../assets/upgrade-speed.png';
import UpgradeBombsImage from '../assets/upgrade-bombs.png';
import UpgradeBombRangeImage from '../assets/upgrade-range.png';

import { Upgrade } from '../resources/Upgrade';

export class Pickup {
  constructor(type) {
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.type = type;
  }

  get image() {
    switch (this.type) {
      case Upgrade.SPEED:
        return UpgradeSpeedImage;
      case Upgrade.BOMB_RANGE:
        return UpgradeBombRangeImage;
      case Upgrade.BOMBS:
        return UpgradeBombsImage;
    }

    return null;
  }
}
