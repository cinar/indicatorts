// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  ABConfig,
  ABDefaultConfig,
  ab,
} from '../../src/indicator/volatility/accelerationBands';

/**
 * Demonstrates how to compose Acceleration Bands (upper and lower bands) into
 * an illustrative breakout trading signal.
 *
 * Generates a BUY action when closing price >= Upper Band, and a SELL action otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function abStrategy(asset: Asset, config: ABConfig = {}): Action[] {
  const strategyConfig = { ...ABDefaultConfig, ...config };
  const result = ab(asset.highs, asset.lows, asset.closings, strategyConfig);

  const actions = new Array<number>(result.upper.length);

  for (let i = 0; i < actions.length; i++) {
    if (asset.closings[i] >= result.upper[i]) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.SELL;
    }
  }

  return actions;
}

// Export full name
export { abStrategy as accelerationBandsStrategy };
