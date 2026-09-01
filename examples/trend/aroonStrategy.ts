// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  AroonConfig,
  AroonDefaultConfig,
  aroon,
} from '../../src/indicator/trend/aroon';

/**
 * Demonstrates how to compose the Aroon Indicator (Aroon Up and Aroon Down) into
 * an illustrative trend-following signal.
 *
 * Generates a BUY action when Aroon Up > Aroon Down, SELL when Aroon Down > Aroon Up, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function aroonStrategy(
  asset: Asset,
  config: AroonConfig = {}
): Action[] {
  const strategyConfig = { ...AroonDefaultConfig, ...config };
  const indicator = aroon(asset.highs, asset.lows, strategyConfig);

  const actions = new Array<Action>(indicator.up.length);

  for (let i = 0; i < actions.length; i++) {
    if (indicator.up[i] > indicator.down[i]) {
      actions[i] = Action.BUY;
    } else if (indicator.down[i] > indicator.up[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
