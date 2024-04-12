// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  APOConfig,
  APODefaultConfig,
  apo,
} from '../../indicator/trend/absolutePriceOscillator';

/**
 * Absolute Price Oscillator (APO) strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function apoStrategy(asset: Asset, config: APOConfig = {}): Action[] {
  const { fast, slow } = {
    ...APODefaultConfig,
    ...config,
  };
  const result = apo(asset.closings, { fast, slow });
  const actions = new Array<Action>(result.length);

  for (let i = 0; i < actions.length; i++) {
    if (result[i] > 0) {
      actions[i] = Action.BUY;
    } else if (result[i] < 0) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { apoStrategy as absolutePriceOscillatorStrategy };
