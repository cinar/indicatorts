// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {defaultMoneyFlowIndex} from '../../indicator/volume/moneyFlowIndex';
import {Action} from '../action';
import {Asset} from '../asset';

/**
 * Money flow index strategy.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function moneyFlowIndexStrategy(asset: Asset): Action[] {
  const mfi = defaultMoneyFlowIndex(
      asset.highs,
      asset.lows,
      asset.closings,
      asset.volumes,
  );

  return mfi.map((value) => {
    if (value >= 80) {
      return Action.SELL;
    } else {
      return Action.BUY;
    }
  });
}
