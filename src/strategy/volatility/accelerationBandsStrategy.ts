// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {Asset} from '../asset';
import {Action} from '../action';
import {accelerationBands} from '../../indicator/volatility/accelerationBands';

/**
 * Acceleration bands strategy function.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function accelerationBandsStrategy(asset: Asset): Action[] {
  const ab = accelerationBands(
      asset.highs,
      asset.lows,
      asset.closings,
  );

  const actions = new Array<number>(ab.upperBand.length);

  for (let i = 0; i < actions.length; i++) {
    if (asset.closings[i] >= ab.upperBand[i]) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.SELL;
    }
  }

  return actions;
}
