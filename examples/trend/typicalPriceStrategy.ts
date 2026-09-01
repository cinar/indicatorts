// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { typprice } from '../../src/indicator/trend/typicalPrice';

/**
 * Demonstrates how to compose Typical Price changes into an illustrative
 * price-action signal.
 *
 * Generates a BUY action when Typical Price increases relative to previous bar,
 * a SELL action when it decreases, and HOLD when unchanged.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function typpriceStrategy(asset: Asset): Action[] {
  const result = typprice(asset.highs, asset.lows, asset.closings);

  const actions = new Array<Action>(result.length);
  actions[0] = Action.HOLD;

  for (let i = 1; i < actions.length; i++) {
    if (result[i] > result[i - 1]) {
      actions[i] = Action.BUY;
    } else if (result[i] < result[i - 1]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { typpriceStrategy as typicalPriceStrategy };
