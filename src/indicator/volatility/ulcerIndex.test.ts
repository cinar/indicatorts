// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { ui } from './ulcerIndex';

describe('Ulcer Index', () => {
  it('should be able to compute UI', () => {
    const closings = [9, 11, 7, 10, 8, 7, 7, 8, 10, 9, 5, 4, 6, 7];
    const expected = [
      0, 0, 20.99, 18.74, 20.73, 24.05, 26.17, 26.31, 24.99, 24.39, 28.49,
      32.88, 34.02, 34.19,
    ];

    const actual = ui(closings);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
