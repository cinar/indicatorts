// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Asset } from './asset';
import { Action } from './action';

/**
 * Buy and hold strategy.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function buyAndHoldStrategy(asset: Asset): Action[] {
  return Array<Action>(asset.closings.length).fill(Action.BUY);
}
