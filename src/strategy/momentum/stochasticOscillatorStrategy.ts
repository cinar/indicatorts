// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  StochConfig,
  StochDefaultConfig,
  stoch,
} from '../../indicator/momentum/stochasticOscillator';

/**
 * Stochastic oscillator strategy function.
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
