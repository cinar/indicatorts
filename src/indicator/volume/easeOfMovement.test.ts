// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { emv } from './easeOfMovement';

describe('Ease of Movement (EMV)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const volumes = [100, 110, 80, 120, 90];

  it('should be able to compute with a config', () => {
    const expected = [32000000, 16000000, 13791666.67, 11385416.67, 8219444.44];

    const actual = emv(highs, lows, volumes, { period: 20 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [32000000, 16000000, 13791666.67, 11385416.67, 8219444.44];

    const actual = emv(highs, lows, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
