// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  EMVConfig,
  EMVDefaultConfig,
  emv,
} from '../../indicator/volume/easeOfMovement';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * Ease of movement strategy.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function emvStrategy(asset: Asset, config: EMVConfig = {}): Action[] {
  const strategyConfig = { ...EMVDefaultConfig, ...config };
  const result = emv(asset.highs, asset.lows, asset.volumes, strategyConfig);

  return result.map((value) => {
    if (value > 0) {
      return Action.BUY;
    } else if (value < 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}

// Export full name
export { emvStrategy as easeOfMovementStrategy };
