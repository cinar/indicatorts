// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { bop } from '../../indicator/trend/balanceOfPower';

/**
 * Balance of power strategy.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function bopStrategy(asset: Asset): Action[] {
  const result = bop(asset.openings, asset.highs, asset.lows, asset.closings);

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
export { bopStrategy as balanceOfPowerStrategy };
