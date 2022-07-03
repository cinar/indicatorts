// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { Asset } from '../asset';
import { Action } from '../action';
import { wvmaStrategy } from './vwmaStrategy';

describe('VWMA stategy', () => {
  it('should be able to compute strategy', () => {
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
    const period = 3;

    const actual = wvmaStrategy(period, asset);
    deepStrictEqual(actual, expected);
  });
});
