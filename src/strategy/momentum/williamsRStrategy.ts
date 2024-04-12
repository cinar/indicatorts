// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  WillrConfig,
  WillrDefaultConfig,
  willr,
} from '../../indicator/momentum/williamsR';

/**
 * Williams R strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function willRStrategy(
  asset: Asset,
  config: WillrConfig = {}
): Action[] {
  const strategyConfig = { ...WillrDefaultConfig, ...config };
  const result = willr(asset.highs, asset.lows, asset.closings, strategyConfig);

  return result.map((value) => {
    if (value <= -80) {
      return Action.BUY;
    } else if (value >= -20) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}

// Export full name
export { willRStrategy as williamsRStrategy };
