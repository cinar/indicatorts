// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { bollingerBands } from '../../indicator/volatility/bollingerBands';

/**
 * Bollinger bands strategy function.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function bollingerBandsStrategy(asset: Asset): Action[] {
  const bb = bollingerBands(asset.closings);

  const actions = new Array<Action>(bb.upperBand.length);

  for (let i = 0; i < actions.length; i++) {
    if (asset.closings[i] > bb.upperBand[i]) {
      actions[i] = Action.SELL;
    } else if (asset.closings[i] < bb.lowerBand[i]) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
