// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { cfoStrategy } from './chandeForecastOscillatorStrategy';

function assetWithClosings(closings: number[]): Asset {
  return {
    dates: closings.map((_, i) => new Date(2024, 0, i + 1)),
    openings: closings,
    closings,
    highs: closings,
    lows: closings,
    volumes: closings.map(() => 1000),
  };
}

describe('Chande Forecast Oscillator (CFO) example strategy', () => {
  const closings = [10, 11, 13, 12, 14, 13, 15, 17, 16, 18];

  it('should not let future prices change past actions', () => {
    const actions = cfoStrategy(assetWithClosings(closings));

    // Replace the second half with a crash. Actions for the first half
    // must stay the same, since a strategy cannot see the future.
    const crashed = [...closings.slice(0, 5), 5, 4, 3, 2, 1];
    const crashedActions = cfoStrategy(assetWithClosings(crashed));

    expect(crashedActions.slice(0, 5)).toStrictEqual(actions.slice(0, 5));
  });

  it('should BUY above the trailing regression and SELL below it', () => {
    // With period 2, the regression passes through both window points, so
    // CFO is 0 everywhere, and every action is HOLD.
    const actions = cfoStrategy(assetWithClosings(closings), { period: 2 });
    expect(actions).toStrictEqual(closings.map(() => Action.HOLD));

    // A jump above a flat trend reads above the period-3 regression line.
    const jump = cfoStrategy(assetWithClosings([10, 10, 10, 10, 13]), {
      period: 3,
    });
    expect(jump[4]).toBe(Action.BUY);

    const drop = cfoStrategy(assetWithClosings([10, 10, 10, 10, 7]), {
      period: 3,
    });
    expect(drop[4]).toBe(Action.SELL);
  });
});
