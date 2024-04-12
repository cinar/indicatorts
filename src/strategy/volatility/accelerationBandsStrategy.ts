// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  ABConfig,
  ABDefaultConfig,
  ab,
} from '../../indicator/volatility/accelerationBands';

/**
 * Acceleration bands strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function abStrategy(asset: Asset, config: ABConfig = {}): Action[] {
  const strategyConfig = { ...ABDefaultConfig, ...config };
  const result = ab(asset.highs, asset.lows, asset.closings, strategyConfig);

  const actions = new Array<number>(result.upper.length);

  for (let i = 0; i < actions.length; i++) {
    if (asset.closings[i] >= result.upper[i]) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.SELL;
    }
  }

  return actions;
}

// Export full name
export { abStrategy as accelerationBandsStrategy };
