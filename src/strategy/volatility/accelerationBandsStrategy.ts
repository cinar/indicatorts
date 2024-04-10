// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  AccelerationBandsConfig,
  AccelerationBandsDefaultConfig,
  ab,
} from '../../indicator/volatility/accelerationBands';

/**
 * Acceleration bands strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function abStrategy(
  asset: Asset,
  config: AccelerationBandsConfig = {}
): Action[] {
  const strategyConfig = { ...AccelerationBandsDefaultConfig, ...config };
  const result = ab(asset.highs, asset.lows, asset.closings, strategyConfig);

  const actions = new Array<number>(result.upperBand.length);

  for (let i = 0; i < actions.length; i++) {
    if (asset.closings[i] >= result.upperBand[i]) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.SELL;
    }
  }

  return actions;
}

// Export full name
export { abStrategy as accelerationBandsStrategy };
