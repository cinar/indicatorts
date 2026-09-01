// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  WillrConfig,
  WillrDefaultConfig,
  willr,
} from '../../src/indicator/momentum/williamsR';

/**
 * Demonstrates how to compose the Williams %R indicator into an illustrative
 * momentum trading signal.
 *
 * Generates a BUY action when %R <= -80, a SELL action when %R >= -20, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function willRStrategy(
  asset: Asset,
  config: WillrConfig = {}
): Action[] {
  const strategyConfig = { ...WillrDefaultConfig, ...config };
  const result = willr(asset.highs, asset.lows, asset.closings, strategyConfig);

  return result.map((value) => {
    if (value <= -80) {
      return Action.BUY;
    } else if (value >= -20) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}

// Export full name
export { willRStrategy as williamsRStrategy };
