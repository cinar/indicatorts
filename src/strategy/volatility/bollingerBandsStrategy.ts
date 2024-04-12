// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  BBConfig,
  BBDefaultConfig,
  bb,
} from '../../indicator/volatility/bollingerBands';

/**
 * Bollinger bands strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function bbStrategy(asset: Asset, config: BBConfig = {}): Action[] {
  const strategyConfig = { ...BBDefaultConfig, ...config };
  const result = bb(asset.closings, strategyConfig);

  const actions = new Array<Action>(result.upper.length);

  for (let i = 0; i < actions.length; i++) {
    if (asset.closings[i] > result.upper[i]) {
      actions[i] = Action.SELL;
    } else if (asset.closings[i] < result.lower[i]) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { bbStrategy as bollingerBandsStrategy };
