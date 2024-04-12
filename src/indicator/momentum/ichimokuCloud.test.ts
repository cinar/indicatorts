// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { ichimokuCloud } from './ichimokuCloud';

describe('Ichimoku Cloud', () => {
  const highs = [10, 11, 12, 13, 14, 15, 16, 17];
  const lows = [1, 2, 3, 4, 5, 6, 7, 8];
  const closings = [5, 6, 7, 8, 9, 10, 11, 12];

  it('should be able to compute with a config', () => {
    const conversion = [5.5, 6, 7, 8, 9, 10, 11, 12];
    const base = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
    const leadingSpanA = [5.5, 6, 6.75, 7.5, 8.25, 9, 9.75, 10.5];
    const leadingSpanB = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
    const laggingSpan = [0, 0, 0, 0, 0, 0, 0, 0];

    const actual = ichimokuCloud(highs, lows, closings, {
      short: 2,
      medium: 24,
      long: 48,
      close: 28,
    });
    deepStrictEqual(roundDigitsAll(2, actual.conversion), conversion);
    deepStrictEqual(roundDigitsAll(2, actual.base), base);
    deepStrictEqual(roundDigitsAll(2, actual.leadingSpanA), leadingSpanA);
    deepStrictEqual(roundDigitsAll(2, actual.leadingSpanB), leadingSpanB);
    deepStrictEqual(roundDigitsAll(2, actual.laggingSpan), laggingSpan);
  });

  it('should be able to compute without a config', () => {
    const conversion = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
    const base = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
    const leadingSpanA = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
    const leadingSpanB = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
    const laggingSpan = [0, 0, 0, 0, 0, 0, 0, 0];

    const actual = ichimokuCloud(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, actual.conversion), conversion);
    deepStrictEqual(roundDigitsAll(2, actual.base), base);
    deepStrictEqual(roundDigitsAll(2, actual.leadingSpanA), leadingSpanA);
    deepStrictEqual(roundDigitsAll(2, actual.leadingSpanB), leadingSpanB);
    deepStrictEqual(roundDigitsAll(2, actual.laggingSpan), laggingSpan);
  });
});
