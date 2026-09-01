// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { bop } from '../../src/indicator/trend/balanceOfPower';

/**
 * Demonstrates how to compose the Balance of Power (BOP) indicator into
 * an illustrative market strength signal.
 *
 * Generates a BUY action when BOP > 0, SELL when BOP < 0, and HOLD when BOP == 0.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function bopStrategy(asset: Asset): Action[] {
  const result = bop(asset.openings, asset.highs, asset.lows, asset.closings);

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
export { bopStrategy as balanceOfPowerStrategy };
