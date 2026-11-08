// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  MCFOConfig,
  MCFODefaultConfig,
  mcfo,
} from '../../src/indicator/trend/chandeForecastOscillator';

/**
 * Demonstrates how to compose the Chande Forecast Oscillator (CFO) indicator into
 * an illustrative trend signal.
 *
 * Generates a BUY action when CFO > 0, SELL when CFO < 0, and HOLD when CFO == 0.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * Uses the moving CFO (mcfo), which fits the regression only over the
 * trailing window ending at each bar. The whole-series cfo fits its
 * regression over every bar, including future ones, so it would leak
 * future prices into earlier signals.
 *
 * @example
 * ```TypeScript
 * import { cfoStrategy } from './chandeForecastOscillatorStrategy';
 *
 * const defaultConfig = { period: 4 };
 * const actions = cfoStrategy(asset, defaultConfig);
 * ```
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function cfoStrategy(asset: Asset, config: MCFOConfig = {}): Action[] {
  const strategyConfig = { ...MCFODefaultConfig, ...config };
  const result = mcfo(asset.closings, strategyConfig);

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
export { cfoStrategy as chandeForecastOscillatorStrategy };
