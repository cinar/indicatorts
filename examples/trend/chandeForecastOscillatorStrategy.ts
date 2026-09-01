// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { cfo } from '../../src/indicator/trend/chandeForecastOscillator';

/**
 * Demonstrates how to compose the Chande Forecast Oscillator (CFO) indicator into
 * an illustrative trend signal.
 *
 * Generates a BUY action when CFO > 0, SELL when CFO < 0, and HOLD when CFO == 0.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function cfoStrategy(asset: Asset): Action[] {
  const result = cfo(asset.closings);

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
