// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { vwma } from './volumeWeightedMovingAverage';

describe('Volume Weighted Moving Average (VWMA)', () => {
  const closings = [20, 21, 21, 19, 16];
  const volumes = [100, 50, 40, 50, 100];

  it('should be able to compute with a config', () => {
    const expected = [20, 20.33, 20.47, 20.29, 17.84];

    const actual = vwma(closings, volumes, { period: 3 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [20, 20.33, 20.47, 20.17, 18.94];

    const actual = vwma(closings, volumes);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should not propagate NaN when a window has zero volume', () => {
    // Both bars have zero volume, so the volume sum for every window
    // is 0, which would otherwise divide by zero.
    const flatClosings = [20, 21];
    const zeroVolumes = [0, 0];
    const expected = [0, 0];

    const actual = vwma(flatClosings, zeroVolumes, { period: 2 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
