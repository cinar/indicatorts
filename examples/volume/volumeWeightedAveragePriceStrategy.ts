// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../src/helper/numArray';
import {
  VWAPConfig,
  VWAPDefaultConfig,
  vwap,
} from '../../src/indicator/volume/volumeWeightedAveragePrice';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';

/**
 * Demonstrates how to compose the Volume Weighted Average Price (VWAP) into
 * an illustrative benchmark comparison signal.
 *
 * Generates a BUY action when closing is below VWAP, a SELL action when
 * closing is above VWAP, and HOLD when equal.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function vwapStrategy(asset: Asset, config: VWAPConfig = {}): Action[] {
  const strategyConfig = {
    ...VWAPDefaultConfig,
    ...config,
  };
  const result = vwap(asset.closings, asset.volumes, strategyConfig);

  const diff = subtract(result, asset.closings);

  return diff.map((value) => {
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
export { vwapStrategy as volumeWeightedAveragePriceStrategy };
