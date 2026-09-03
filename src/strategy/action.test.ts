// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action, applyActions, reverseActions } from './action';

describe('reverseActions', () => {
  it('should swap BUY and SELL while leaving HOLD unchanged', () => {
    const actions = [Action.BUY, Action.SELL, Action.HOLD];
    const reversed = reverseActions(actions);

    expect(reversed).toEqual([Action.SELL, Action.BUY, Action.HOLD]);
  });
});

describe('applyActions', () => {
  it('should compute gains through a BUY, HOLD, SELL, BUY, SELL sequence', () => {
    const closings = [10, 20, 20, 10, 5];
    const actions = [
      Action.BUY,
      Action.HOLD,
      Action.SELL,
      Action.BUY,
      Action.SELL,
    ];

    const gains = applyActions(closings, actions);

    expect(gains).toEqual([0, 1, 1, 1, 0]);
  });

  it('should treat a SELL as a no-op when there are no shares to sell', () => {
    const closings = [10, 20];
    const actions = [Action.SELL, Action.SELL];

    const gains = applyActions(closings, actions);

    // Balance stays at the initial balance since no shares were ever bought.
    expect(gains).toEqual([0, 0]);
  });

  it('should treat a BUY as a no-op when already fully invested', () => {
    const closings = [10, 20, 5];
    const actions = [Action.BUY, Action.BUY, Action.SELL];

    const gains = applyActions(closings, actions);

    expect(gains).toEqual([0, 1, -0.5]);
  });
});
