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
 * Generates a BUY action when the closing breaks above the Upper Band, a SELL
 * action when it breaks below the Lower Band, and HOLD while it is between them.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @title Acceleration Bands Strategy
 * @example
 * ```TypeScript
 * import { abStrategy } from './accelerationBandsStrategy';
 *
 * const defaultConfig = { period: 20, multiplier: 4 };
 * const actions = abStrategy(asset, defaultConfig);
 * ```
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function abStrategy(asset: Asset, config: ABConfig = {}): Action[] {
  const strategyConfig = { ...ABDefaultConfig, ...config };
  const result = ab(asset.highs, asset.lows, asset.closings, strategyConfig);

  const actions = new Array<Action>(result.upper.length);

  for (let i = 0; i < actions.length; i++) {
    if (asset.closings[i] > result.upper[i]) {
      actions[i] = Action.BUY;
    } else if (asset.closings[i] < result.lower[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { abStrategy as accelerationBandsStrategy };
