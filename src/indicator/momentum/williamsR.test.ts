// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { willr } from './williamsR';

describe('Williams R (WILLR)', () => {
  const highs = [
    127.01, 127.62, 126.59, 127.35, 128.17, 128.43, 127.37, 126.42, 126.9,
    126.85, 125.65, 125.72, 127.16, 127.72, 127.69, 128.22, 128.27, 128.09,
    128.27, 127.74,
  ];

  const lows = [
    125.36, 126.16, 124.93, 126.09, 126.82, 126.48, 126.03, 124.83, 126.39,
    125.72, 124.56, 124.57, 125.07, 126.86, 126.63, 126.8, 126.71, 126.8,
    126.13, 125.92,
  ];

  const closings = [
    126.0, 126.6, 127.1, 127.2, 128.1, 128.2, 126.3, 126.0, 126.6, 127.0, 127.5,
    128.0, 128.1, 127.29, 127.18, 128.01, 127.11, 127.73, 127.06, 127.33,
  ];

  it('should be able to compute with a config', () => {
    const expected = [
      -61.21, -45.13, -19.33, -15.61, -2.16, -6.57, -60.86, -67.5, -50.83,
      -39.72, -24.03, -11.11, -8.53, -29.46, -32.3, -10.85, -34.11, -18.09,
      -35.4, -28.42,
    ];

    const actual = willr(highs, lows, closings, { period: 40 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [
      -61.21, -45.13, -19.33, -15.61, -2.16, -6.57, -60.86, -67.5, -50.83,
      -39.72, -24.03, -11.11, -8.53, -29.46, -32.3, -10.85, -34.11, -18.09,
      -35.4, -25.34,
    ];

    const actual = willr(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
