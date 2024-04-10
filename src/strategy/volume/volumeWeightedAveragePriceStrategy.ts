// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { volumeWeightedAveragePrice } from '../../indicator/volume/volumeWeightedAveragePrice';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * Volume weighted average price strategy uses the values that are generated
 * by the Volume Weighted Average Price (VWAP) indicator function to provide
 * a BUY action when the closing is below the VWAP, and a SELL action when
 * the closing is below the VWAP, a HOLD action otherwise.
 *
 * @param asset asset object.
 * @returns strategy actions.
 */
export function volumeWeightedAveragePriceStrategy(asset: Asset): Action[] {
  const vwap = volumeWeightedAveragePrice(asset.closings, asset.volumes);

  const diff = subtract(vwap, asset.closings);

  return diff.map((value) => {
    if (value > 0) {
      return Action.BUY;
    } else if (value < 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}
