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
 * Generates a BUY action when MACD Line crosses above Signal Line, a SELL action
 * when MACD Line crosses below Signal Line, and HOLD otherwise. Equality does not
 * emit an action, but moving away from equality can form a crossover. The first
 * bar and bars without two consecutive finite line pairs produce HOLD.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function macdStrategy(asset: Asset, config: MACDConfig = {}): Action[] {
  const strategyConfig = { ...MACDDefaultConfig, ...config };
  const result = macd(asset.closings, strategyConfig);
  const actions = new Array<Action>(result.macdLine.length).fill(Action.HOLD);

  for (let i = 1; i < actions.length; i++) {
    const previousMACD = result.macdLine[i - 1];
    const previousSignal = result.signalLine[i - 1];
    const currentMACD = result.macdLine[i];
    const currentSignal = result.signalLine[i];

    if (
      !Number.isFinite(previousMACD) ||
      !Number.isFinite(previousSignal) ||
      !Number.isFinite(currentMACD) ||
      !Number.isFinite(currentSignal)
    ) {
      continue;
    }

    if (previousMACD <= previousSignal && currentMACD > currentSignal) {
      actions[i] = Action.BUY;
    } else if (previousMACD >= previousSignal && currentMACD < currentSignal) {
      actions[i] = Action.SELL;
    }
  }

  return actions;
}

// Export full name
export { macdStrategy as movingAverageConvergenceDivergenceStrategy };
