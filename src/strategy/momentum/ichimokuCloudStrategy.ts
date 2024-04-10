// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  IchimokuCloudConfig,
  IchimokuCloudDefaultConfig,
  ichimokuCloud,
} from '../../indicator/momentum/ichimokuCloud';

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

  const actions = new Array<Action>(indicator.base.length);

  for (let i = 0; i < actions.length; i++) {
    if (indicator.leadingSpanA[i] > indicator.leadingSpanB[i]) {
      actions[i] = Action.BUY;
    } else if (indicator.leadingSpanA[i] < indicator.leadingSpanB[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
