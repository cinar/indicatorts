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
 * when MACD Line crosses below Signal Line, and HOLD otherwise. Equal and
 * non-finite values produce HOLD without changing the last strictly unequal,
 * finite side. No action is emitted until both sides have been observed.
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
  let lastSide = Action.HOLD;

  for (let i = 0; i < actions.length; i++) {
    const currentMACD = result.macdLine[i];
    const currentSignal = result.signalLine[i];

    if (!Number.isFinite(currentMACD) || !Number.isFinite(currentSignal)) {
      continue;
    }

    if (currentMACD === currentSignal) {
      continue;
    }

    const side = currentMACD > currentSignal ? Action.BUY : Action.SELL;
    if (lastSide !== Action.HOLD && side !== lastSide) {
      actions[i] = side;
    }
    lastSide = side;
  }

  return actions;
}

// Export full name
export { macdStrategy as movingAverageConvergenceDivergenceStrategy };
