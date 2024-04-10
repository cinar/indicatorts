// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { nvi } from './negativeVolumeIndex';

describe('Negative Volume Index (NVI)', () => {
  it('should be able to compute NVI', () => {
    const closings = [9, 11, 7, 10, 8];
    const volumes = [100, 110, 80, 120, 90];
    const expected = [1000, 1000, 636.36, 636.36, 509.09];

    const actual = nvi(closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
