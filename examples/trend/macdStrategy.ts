// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  MACDConfig,
  MACDDefaultConfig,
  macd,
} from '../../src/indicator/trend/movingAverageConvergenceDivergence';

/**
 * Demonstrates how to compose Moving Average Convergence Divergence (MACD)
 * line and Signal line into an illustrative crossover signal.
 *
 * Generates a BUY action when MACD Line > Signal Line, a SELL action when
 * MACD Line < Signal Line, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function macdStrategy(asset: Asset, config: MACDConfig = {}): Action[] {
  const strategyConfig = { ...MACDDefaultConfig, ...config };
  const result = macd(asset.closings, strategyConfig);
  const actions = new Array<Action>(result.macdLine.length);

  for (let i = 0; i < actions.length; i++) {
    if (result.macdLine[i] > result.signalLine[i]) {
      actions[i] = Action.BUY;
    } else if (result.macdLine[i] < result.signalLine[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { macdStrategy as movingAverageConvergenceDivergenceStrategy };
