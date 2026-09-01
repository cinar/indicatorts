// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  POConfig,
  PODefaultConfig,
  po,
} from '../../src/indicator/volatility/projectionOscillator';

/**
 * Demonstrates how to compose the Projection Oscillator (PO) and smoothed PO
 * into an illustrative crossover signal.
 *
 * Generates a BUY action when PO > Smoothed PO, a SELL action when PO < Smoothed PO, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function poStrategy(asset: Asset, config: POConfig = {}): Action[] {
  const strategyConfig = { ...PODefaultConfig, ...config };
  const result = po(asset.highs, asset.lows, asset.closings, strategyConfig);

  const actions = new Array<Action>(result.poResult.length);

  for (let i = 0; i < actions.length; i++) {
    if (result.poResult[i] > result.spoResult[i]) {
      actions[i] = Action.BUY;
    } else if (result.poResult[i] < result.spoResult[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { poStrategy as projectionOscillatorStrategy };
