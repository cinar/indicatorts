// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { tr } from './trueRange';

describe('True Range (TR)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute', () => {
    const expected = [4, 2, 3, 7, 2];

    const actual = tr(highs, lows, closings);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
