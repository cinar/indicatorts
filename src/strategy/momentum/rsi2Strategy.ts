// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { rsi } from '../../indicator/momentum/relativeStrengthIndex';

/**
 * RSI 2. When 2-period RSI moves below 10, it is considered deeply oversold,
 * and the other way around when moves above 90.
 *
 * @param asset asset object.
 * @returns strategy actions.
 */
export function rsi2Strategy(asset: Asset): Action[] {
  const indicator = rsi(asset.closings, { period: 2 });

  const actions = new Array<Action>(indicator.length);
  for (let i = 0; i < actions.length; i++) {
    if (indicator[i] < 10) {
      actions[i] = Action.BUY;
    } else if (indicator[i] > 90) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
