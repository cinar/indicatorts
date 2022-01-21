// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { ichimokuCloud } from '../../indicator/momentum/ichimokuCloud';

/**
 * Ichimoku cloud.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function ichimokuCloudStrategy(asset: Asset): Action[] {
  const indicator = ichimokuCloud(asset.highs, asset.lows, asset.closings);

  const actions = new Array<Action>(indicator.baseLine.length);

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
