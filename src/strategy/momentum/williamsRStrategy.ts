// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  WilliamsRConfig,
  WilliamsRDefaultConfig,
  williamsR,
} from '../../indicator/momentum/williamsR';

/**
 * Williams R strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function williamsRStrategy(
  asset: Asset,
  config: WilliamsRConfig = {}
): Action[] {
  const strategyConfig = { ...WilliamsRDefaultConfig, ...config };
  const wr = williamsR(asset.highs, asset.lows, asset.closings, strategyConfig);

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
