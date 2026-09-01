// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  StochConfig,
  StochDefaultConfig,
  stoch,
} from '../../src/indicator/momentum/stochasticOscillator';

/**
 * Demonstrates how to compose Stochastic Oscillator (%K and %D) indicators into
 * an illustrative overbought/oversold signal.
 *
 * Generates a SELL action when %K >= 80 and %D >= 80, a BUY action when %K <= 20 and %D <= 20,
 * and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function stochStrategy(
  asset: Asset,
  config: StochConfig = {}
): Action[] {
  const strategyConfig = { ...StochDefaultConfig, ...config };
  const result = stoch(asset.highs, asset.lows, asset.closings, strategyConfig);

  const actions = new Array<Action>(result.k.length);

  for (let i = 0; i < actions.length; i++) {
    if (result.k[i] >= 80 && result.d[i] >= 80) {
      actions[i] = Action.SELL;
    } else if (result.k[i] <= 20 && result.d[i] <= 20) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { stochStrategy as stochasticOscillatorStrategy };
