// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  AOConfig,
  AODefaultConfig,
  ao,
} from '../../src/indicator/momentum/awesomeOscillator';

/**
 * Demonstrates how to compose the Awesome Oscillator (AO) indicator into an
 * illustrative momentum-based trading signal.
 *
 * Generates a BUY action when AO > 0, SELL when AO < 0, and HOLD when AO == 0.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function aoStrategy(asset: Asset, config: AOConfig = {}): Action[] {
  const strategyConfig = { ...AODefaultConfig, ...config };
  const result = ao(asset.highs, asset.lows, strategyConfig);

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
export { aoStrategy as awesomeOscillatorStrategy };
