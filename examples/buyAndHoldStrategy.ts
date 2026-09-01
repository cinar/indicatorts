// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../src/strategy/action';
import { Asset } from '../src/strategy/asset';

/**
 * Demonstrates how to implement a basic baseline buy-and-hold strategy
 * for comparison against indicator-driven strategies.
 *
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export function buyAndHoldStrategy(asset: Asset): Action[] {
  return Array<Action>(asset.closings.length).fill(Action.BUY);
}
