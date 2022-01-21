// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../helper/numArray';

/**
 * Strategy action.
 */
export enum Action {
  SELL = -1,
  HOLD = 0,
  BUY = 1,
}

/**
 * Reverses the given actions.
 * @param actions strategy actions.
 * @return reversed actions.
 */
export function reverseActions(actions: Action[]): Action[] {
  return actions.map((action) => {
    if (action === Action.BUY) {
      return Action.SELL;
    } else if (action === Action.SELL) {
      return Action.BUY;
    } else {
      return Action.HOLD;
    }
  });
}

/**
 * Apply the actions on the closing values to calculate gains.
 *
 * @param closings closing values.
 * @param actions strategy actions.
 * @return strategy gains.
 */
export function applyActions(closings: number[], actions: Action[]): number[] {
  checkSameLength(closings, actions);

  const gains = new Array<number>(closings.length);
  const initialBalance = 1;

  let balance = initialBalance;
  let shares = 0;

  for (let i = 0; i < gains.length; i++) {
    if (actions[i] === Action.BUY) {
      if (balance > 0) {
        shares = balance / closings[i];
        balance = 0;
      }
    } else if (actions[i] === Action.SELL) {
      if (shares > 0) {
        balance = shares * closings[i];
        shares = 0;
      }
    }

    gains[i] =
      (shares * closings[i] + balance - initialBalance) / initialBalance;
  }

  return gains;
}
