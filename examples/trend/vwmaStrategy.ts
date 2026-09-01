// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { sma } from '../../src/indicator/trend/simpleMovingAverage';
import {
  VWMAConfig,
  VWMADefaultConfig,
  vwma,
} from '../../src/indicator/trend/volumeWeightedMovingAverage';

/**
 * Demonstrates how to compose Volume Weighted Moving Average (VWMA) and
 * Simple Moving Average (SMA) into an illustrative moving average crossover signal.
 *
 * Generates a BUY action when VWMA > SMA, a SELL action when VWMA < SMA, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function vwmaStrategy(asset: Asset, config: VWMAConfig = {}): Action[] {
  const strategyConfig = { ...VWMADefaultConfig, ...config };
  const smaValues = sma(asset.closings, strategyConfig);
  const vwmaValues = vwma(asset.closings, asset.volumes, strategyConfig);

  const result = new Array<Action>(vwmaValues.length);

  for (let i = 0; i < result.length; i++) {
    if (vwmaValues[i] > smaValues[i]) {
      result[i] = Action.BUY;
    } else if (vwmaValues[i] < smaValues[i]) {
      result[i] = Action.SELL;
    } else {
      result[i] = Action.HOLD;
    }
  }

  return result;
}

// Export full name
export { vwmaStrategy as volumeWeightedMovingAverageStrategy };
