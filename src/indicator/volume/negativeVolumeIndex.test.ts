// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { nvi } from './negativeVolumeIndex';

describe('Negative Volume Index (NVI)', () => {
  const closings = [9, 11, 7, 10, 8];
  const volumes = [100, 110, 80, 120, 90];

  it('should be able to compute with a config', () => {
    const expected = [500, 500, 318.18, 318.18, 254.55];

    const actual = nvi(closings, volumes, { start: 500, period: 10 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [1000, 1000, 636.36, 636.36, 509.09];

    const actual = nvi(closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
