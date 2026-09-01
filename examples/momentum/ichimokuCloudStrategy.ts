// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import {
  ichimokuCloud,
  IchimokuCloudConfig,
  IchimokuCloudDefaultConfig,
} from '../../src/indicator/momentum/ichimokuCloud';

/**
 * Demonstrates how to compose Ichimoku Cloud components (Leading Span A and
 * Leading Span B) into an illustrative trend-following signal.
 *
 * Generates a BUY action when Leading Span A > Leading Span B, SELL when Leading Span A < Leading Span B,
 * and HOLD when Leading Span A == Leading Span B.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function ichimokuCloudStrategy(
  asset: Asset,
  config: IchimokuCloudConfig = {}
): Action[] {
  const strategyConfig = { ...IchimokuCloudDefaultConfig, ...config };
  const indicator = ichimokuCloud(
    asset.highs,
    asset.lows,
    asset.closings,
    strategyConfig
  );

  const actions = new Array<Action>(indicator.kijun.length);

  for (let i = 0; i < actions.length; i++) {
    if (indicator.ssa[i] > indicator.ssb[i]) {
      actions[i] = Action.BUY;
    } else if (indicator.ssa[i] < indicator.ssb[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
