// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { trix } from './trix';

describe('Triple Exponential Average (TRIX)', () => {
  it('should be able to compute with a config', () => {
    const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];
    const expected = [0, 0.06, 0.17, 0.26, 0.33, 0.33, 0.3, 0.25, 0.21];

    const actual = trix(values, { period: 4 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  // TODO: Test - without a config
});
