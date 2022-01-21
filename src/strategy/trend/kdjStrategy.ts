// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { defaultKdj } from '../../indicator/trend/kdj';

/**
 * KDJ strategy.
 * @param asset asset object.
 * @return strategy actions.
 */
export function kdjStrategy(asset: Asset): Action[] {
  const kdjResult = defaultKdj(asset.highs, asset.lows, asset.closings);
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
