// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import {
  VWAPConfig,
  VWAPDefaultConfig,
  vwap,
} from '../../indicator/volume/volumeWeightedAveragePrice';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * Volume weighted average price strategy uses the values that are generated
 * by the Volume Weighted Average Price (VWAP) indicator function to provide
 * a BUY action when the closing is below the VWAP, and a SELL action when
 * the closing is below the VWAP, a HOLD action otherwise.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function vwapStrategy(asset: Asset, config: VWAPConfig = {}): Action[] {
  const strategyConfig = {
    ...VWAPDefaultConfig,
    ...config,
  };
  const result = vwap(asset.closings, asset.volumes, strategyConfig);

  const diff = subtract(result, asset.closings);

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

// Export full name
export { vwapStrategy as volumeWeightedAveragePriceStrategy };
