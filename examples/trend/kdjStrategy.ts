// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  KDJConfig,
  KDJDefaultConfig,
  kdj,
} from '../../src/indicator/trend/randomIndex';

/**
 * Demonstrates how to compose Random Index (KDJ) indicator lines (%K and %D)
 * into an illustrative momentum crossover signal.
 *
 * Generates a BUY action when %K crosses above %D and %K <= 20, a SELL action when
 * %K crosses below %D and %K >= 80, and HOLD otherwise. Equal and non-finite
 * values produce HOLD without changing the last strictly unequal, finite side.
 * No action is emitted until both sides have been observed.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function kdjStrategy(asset: Asset, config: KDJConfig = {}): Action[] {
  const strategyConfig = { ...KDJDefaultConfig, ...config };
  const kdjResult = kdj(
    asset.highs,
    asset.lows,
    asset.closings,
    strategyConfig
  );
  const actions = new Array<Action>(kdjResult.k.length).fill(Action.HOLD);
  let lastSide = Action.HOLD;

  for (let i = 0; i < actions.length; i++) {
    const k = kdjResult.k[i];
    const d = kdjResult.d[i];

    if (!Number.isFinite(k) || !Number.isFinite(d) || k === d) {
      continue;
    }

    const side = k > d ? Action.BUY : Action.SELL;
    const crossed = lastSide !== Action.HOLD && side !== lastSide;

    if (crossed && side === Action.BUY && k <= 20) {
      actions[i] = Action.BUY;
    } else if (crossed && side === Action.SELL && k >= 80) {
      actions[i] = Action.SELL;
    }

    lastSide = side;
  }

  return actions;
}
