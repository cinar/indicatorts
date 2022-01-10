// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {Asset} from '../asset';
import {Action} from '../action';
import {typicalPrice} from '../../indicator/trend/typicalPrice';

/**
 * Typical price strategy function.
 *
 * @param {Asset} asset asset object.
 * @return {Action[]} strategy actions.
 */
export function typicalPriceStrategy(asset: Asset): Action[] {
  const tpi = typicalPrice(
      asset.highs,
      asset.lows,
      asset.closings,
  );

  const actions = new Array<Action>(tpi.length);
  actions[0] = Action.HOLD;

  for (let i = 1; i < actions.length; i++) {
    if (tpi[i] > tpi[i - 1]) {
      actions[i] = Action.BUY;
    } else if (tpi[i] < tpi[i - 1]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
