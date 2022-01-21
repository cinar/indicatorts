// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { vortex } from '../../indicator/trend/vortex';

/**
 * Vortex strategy.
 * @param asset asset object.
 * @return strategy actions.
 */
export function vortexStrategy(asset: Asset): Action[] {
  const indicator = vortex(asset.highs, asset.lows, asset.closings);

  const actions = new Array<Action>(indicator.plusVi.length);

  for (let i = 0; i < actions.length; i++) {
    if (indicator.plusVi[i] > indicator.minusVi[i]) {
      actions[i] = Action.BUY;
    } else if (indicator.plusVi[i] < indicator.minusVi[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
