// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { ui } from './ulcerIndex';

describe('Ulcer Index (UI)', () => {
  const closings = [9, 11, 7, 10, 8, 7, 7, 8, 10, 9, 5, 4, 6, 7];

  it('should be able to compute with a config', () => {
    const expected = [
      0, 0, 20.99, 18.74, 20.73, 24.05, 26.17, 26.31, 26.5, 26.74, 29.36, 36.08,
      37.54, 36.83,
    ];

    const actual = ui(closings, { period: 8 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [
      0, 0, 20.99, 18.74, 20.73, 24.05, 26.17, 26.31, 24.99, 24.39, 28.49,
      32.88, 34.02, 34.19,
    ];

    const actual = ui(closings);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
