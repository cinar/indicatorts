// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { typprice } from '../../indicator/trend/typicalPrice';

/**
 * Typical price strategy function.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function typpriceStrategy(asset: Asset): Action[] {
  const result = typprice(asset.highs, asset.lows, asset.closings);

  const actions = new Array<Action>(result.length);
  actions[0] = Action.HOLD;

  for (let i = 1; i < actions.length; i++) {
    if (result[i] > result[i - 1]) {
      actions[i] = Action.BUY;
    } else if (result[i] < result[i - 1]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { typpriceStrategy as typicalPriceStrategy };
