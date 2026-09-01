// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { Asset } from '../../src/strategy/asset';
import { Action } from '../../src/strategy/action';
import { vwmaStrategy } from './vwmaStrategy';

describe('Volume Weighted Moving Average (VWMA) example strategy', () => {
  it('should be able to compute with a config', () => {
    const asset: Asset = {
      dates: [],
      openings: [],
      highs: [],
      lows: [],
      closings: [20, 21, 21, 19, 16],
      volumes: [100, 50, 40, 50, 100],
    };
    const expected = [
      Action.HOLD,
      Action.SELL,
      Action.SELL,
      Action.SELL,
      Action.SELL,
    ];

    const actual = vwmaStrategy(asset, { period: 3 });
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute without a config', () => {
    const asset: Asset = {
      dates: [],
      openings: [],
      highs: [],
      lows: [],
      closings: [20, 21, 21, 19, 16],
      volumes: [100, 50, 40, 50, 100],
    };
    const expected = [
      Action.HOLD,
      Action.SELL,
      Action.SELL,
      Action.SELL,
      Action.SELL,
    ];

    const actual = vwmaStrategy(asset);
    deepStrictEqual(actual, expected);
  });
});
