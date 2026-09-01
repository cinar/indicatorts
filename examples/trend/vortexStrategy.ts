// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  VortexConfig,
  VortexDefaultConfig,
  vortex,
} from '../../src/indicator/trend/vortex';

/**
 * Demonstrates how to compose Vortex Indicator (+VI and -VI) lines into
 * an illustrative directional trend signal.
 *
 * Generates a BUY action when +VI > -VI, a SELL action when +VI < -VI, and HOLD when equal.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function vortexStrategy(
  asset: Asset,
  config: VortexConfig = {}
): Action[] {
  const strategyConfig = { ...VortexDefaultConfig, ...config };
  const indicator = vortex(
    asset.highs,
    asset.lows,
    asset.closings,
    strategyConfig
  );

  const actions = new Array<Action>(indicator.plus.length);

  for (let i = 0; i < actions.length; i++) {
    if (indicator.plus[i] > indicator.minus[i]) {
      actions[i] = Action.BUY;
    } else if (indicator.plus[i] < indicator.minus[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
