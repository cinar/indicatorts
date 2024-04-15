// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  POConfig,
  PODefaultConfig,
  po,
} from '../../indicator/volatility/projectionOscillator';

/**
 * Projection oscillator strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function poStrategy(asset: Asset, config: POConfig = {}): Action[] {
  const strategyConfig = { ...PODefaultConfig, ...config };
  const result = po(asset.highs, asset.lows, asset.closings, strategyConfig);

  const actions = new Array<Action>(result.poResult.length);

  for (let i = 0; i < actions.length; i++) {
    if (result.poResult[i] > result.spoResult[i]) {
      actions[i] = Action.BUY;
    } else if (result.poResult[i] < result.spoResult[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { poStrategy as projectionOscillatorStrategy };
