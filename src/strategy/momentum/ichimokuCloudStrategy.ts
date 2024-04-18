// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {Asset} from '../asset';
import {Action} from '../action';
import {ichimokuCloud, IchimokuCloudConfig, IchimokuCloudDefaultConfig,} from '../../indicator/momentum/ichimokuCloud';

/**
 * Ichimoku cloud.
 *
 * @param asset asset object.
 * @oaram config configuration.
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
