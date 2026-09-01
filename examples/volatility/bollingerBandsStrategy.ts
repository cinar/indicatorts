// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  BBConfig,
  BBDefaultConfig,
  bb,
} from '../../src/indicator/volatility/bollingerBands';

/**
 * Demonstrates how to compose Bollinger Bands into an illustrative mean-reversion
 * volatility band signal.
 *
 * Generates a SELL action when asset closing > Upper Band, a BUY action when
 * asset closing < Lower Band, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function bbStrategy(asset: Asset, config: BBConfig = {}): Action[] {
  const strategyConfig = { ...BBDefaultConfig, ...config };
  const result = bb(asset.closings, strategyConfig);

  const actions = new Array<Action>(result.upper.length);

  for (let i = 0; i < actions.length; i++) {
    if (asset.closings[i] > result.upper[i]) {
      actions[i] = Action.SELL;
    } else if (asset.closings[i] < result.lower[i]) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { bbStrategy as bollingerBandsStrategy };
