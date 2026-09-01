// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  APOConfig,
  APODefaultConfig,
  apo,
} from '../../src/indicator/trend/absolutePriceOscillator';

/**
 * Demonstrates how to compose the Absolute Price Oscillator (APO) indicator into
 * an illustrative trend-following signal.
 *
 * Generates a BUY action when APO > 0, SELL when APO < 0, and HOLD when APO == 0.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function apoStrategy(asset: Asset, config: APOConfig = {}): Action[] {
  const { fast, slow } = {
    ...APODefaultConfig,
    ...config,
  };
  const result = apo(asset.closings, { fast, slow });
  const actions = new Array<Action>(result.length);

  for (let i = 0; i < actions.length; i++) {
    if (result[i] > 0) {
      actions[i] = Action.BUY;
    } else if (result[i] < 0) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { apoStrategy as absolutePriceOscillatorStrategy };
