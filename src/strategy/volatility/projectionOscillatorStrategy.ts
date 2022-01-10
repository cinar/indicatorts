// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {Asset} from '../asset';
import {Action} from '../action';
import {defaultProjectionOscillator} from '../../indicator/volatility/projectionOscillator';

/**
 * Projection oscillator strategy function.
 *
 * @param {Asset} asset asset object.
 * @return {Action[]} strategy actions.
 */
export function projectionOscillatorStrategy(asset: Asset): Action[] {
  const po = defaultProjectionOscillator(
      asset.highs,
      asset.lows,
      asset.closings,
  );

  const actions = new Array<Action>(po.po.length);

  for (let i = 0; i < actions.length; i++) {
    if (po.po[i] > po.spo[i]) {
      actions[i] = Action.BUY;
    } else if (po.po[i] < po.spo[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
