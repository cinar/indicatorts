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
 * %K crosses below %D and %K >= 80, and HOLD otherwise.
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
  const actions = new Array<Action>(kdjResult.k.length);

  for (let i = 0; i < actions.length; i++) {
    if (kdjResult.k[i] > kdjResult.d[i] && kdjResult.k[i] <= 20) {
      actions[i] = Action.BUY;
    } else if (kdjResult.k[i] < kdjResult.d[i] && kdjResult.k[i] >= 80) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
