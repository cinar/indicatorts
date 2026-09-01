// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { rsi } from '../../src/indicator/momentum/relativeStrengthIndex';

/**
 * Demonstrates how to compose a 2-period Relative Strength Index (RSI) into
 * an illustrative mean-reversion trading signal.
 *
 * Generates a BUY action when 2-period RSI < 10 (illustrating an oversold threshold),
 * a SELL action when 2-period RSI > 90 (illustrating an overbought threshold), and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
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
