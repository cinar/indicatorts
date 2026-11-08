// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  PSARConfig,
  PSARDefaultConfig,
  psar,
} from '../../src/indicator/trend/parabolicSar';
import { Trend } from '../../src/indicator/types';

/**
 * The action for each trend. Typed as a Record so the compiler requires
 * every trend to be mapped.
 */
const TREND_ACTIONS: Record<Trend, Action> = {
  [Trend.FALLING]: Action.SELL,
  [Trend.STABLE]: Action.HOLD,
  [Trend.RISING]: Action.BUY,
};

/**
 * Demonstrates how to compose Parabolic SAR (PSAR) trend directions into
 * an illustrative trend-following signal.
 *
 * Generates a BUY action when the trend is RISING, a SELL action when
 * the trend is FALLING, and HOLD when STABLE.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @title Parabolic SAR Strategy
 * @example
 * ```TypeScript
 * import { psarStrategy } from './parabolicSarStrategy';
 *
 * const defaultConfig = { step: 0.02, max: 0.2 };
 * const actions = psarStrategy(asset, defaultConfig);
 * ```
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function psarStrategy(asset: Asset, config: PSARConfig = {}): Action[] {
  const strategyConfig = { ...PSARDefaultConfig, ...config };
  const result = psar(asset.highs, asset.lows, asset.closings, strategyConfig);

  return result.trends.map((trend) => TREND_ACTIONS[trend]);
}

// Export full name
export { psarStrategy as parabolicSARStrategy };
