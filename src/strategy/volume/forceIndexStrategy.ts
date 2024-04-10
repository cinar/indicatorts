// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { forceIndex } from '../../indicator/volume/forceIndex';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * Force index strategy function.
 *
 * @param asset asset object.
 * @returns strategy actions.
 */
export function forceIndexStrategy(asset: Asset): Action[] {
  const fi = forceIndex(asset.closings, asset.volumes);

  return fi.map((value) => {
    if (value > 0) {
      return Action.BUY;
    } else if (value < 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}
