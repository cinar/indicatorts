// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {Asset} from '../asset';
import {Action} from '../action';
import {williamsR} from '../../indicator/momentum/williamsR';

/**
 * Williams R strategy function.
 *
 * @param {Asset} asset asset object.
 * @return {Action[]} strategy actions.
 */
export function williamsRStrategy(asset: Asset): Action[] {
  const wr = williamsR(
      asset.highs,
      asset.lows,
      asset.closings,
  );

  return wr.map((value) => {
    if (value <= -80) {
      return Action.BUY;
    } else if (value >= -20) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}
