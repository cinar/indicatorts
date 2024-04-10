// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { cfo } from '../../indicator/trend/chandeForecastOscillator';

/**
 * Chande forecast oscillator strategy.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function cfoStrategy(asset: Asset): Action[] {
  const result = cfo(asset.closings);

  return result.map((value) => {
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
export { cfoStrategy as chandeForecastOscillatorStrategy };
