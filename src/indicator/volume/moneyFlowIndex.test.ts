// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {roundDigitsAll} from '../../helper/numArray';
import {moneyFlowIndex} from './moneyFlowIndex';

describe('Money Flow Index (MFI)', () => {
  it('should be able to compute MFI', () => {
    const highs = [10, 9, 12, 14, 12];
    const lows = [6, 7, 9, 12, 10];
    const closings = [9, 11, 7, 10, 8];
    const volumes = [100, 110, 80, 120, 90];
    const expected = [100, 100, 406.85, 207.69, 266.67];
    const period = 2;

    const actual = moneyFlowIndex(period, highs, lows, closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
