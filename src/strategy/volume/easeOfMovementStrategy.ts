// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { easeOfMovement } from '../../indicator/volume/easeOfMovement';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * Ease of movement strategy.
 *
 * @param asset asset object.
 * @returns strategy actions.
 */
export function easeOfMovementStrategy(asset: Asset): Action[] {
  const emv = easeOfMovement(asset.highs, asset.lows, asset.volumes);

  return emv.map((value) => {
    if (value > 0) {
      return Action.BUY;
    } else if (value < 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}
