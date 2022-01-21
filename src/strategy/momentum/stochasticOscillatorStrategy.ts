// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { stochasticOscillator } from '../../indicator/momentum/stochasticOscillator';

/**
 * Stochastic oscillator strategy function.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function stochasticOscillatorStrategy(asset: Asset): Action[] {
  const so = stochasticOscillator(asset.highs, asset.lows, asset.closings);

  const actions = new Array<Action>(so.k.length);

  for (let i = 0; i < actions.length; i++) {
    if (so.k[i] >= 80 && so.d[i] >= 80) {
      actions[i] = Action.SELL;
    } else if (so.k[i] <= 20 && so.d[i] <= 20) {
      actions[i] = Action.BUY;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
