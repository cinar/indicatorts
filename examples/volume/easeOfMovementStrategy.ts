// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  EMVConfig,
  EMVDefaultConfig,
  emv,
} from '../../src/indicator/volume/easeOfMovement';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';

/**
 * Demonstrates how to compose Ease of Movement (EMV) into an illustrative
 * volume/price trend signal.
 *
 * Generates a BUY action when EMV > 0, a SELL action when EMV < 0, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
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
