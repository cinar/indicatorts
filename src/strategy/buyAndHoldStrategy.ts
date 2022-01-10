// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {Asset} from './asset';
import {Action} from './action';

/**
 * Buy and hold strategy.
 *
 * @param {Asset} asset asset object.
 * @return {Action[]} strategy actions.
 */
export function buyAndHoldStrategy(asset: Asset): Action[] {
  return Array<Action>(asset.closings.length).fill(Action.BUY);
}
