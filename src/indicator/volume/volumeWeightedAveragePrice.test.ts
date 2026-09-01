// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { vwap } from './volumeWeightedAveragePrice';

describe('Volume Weighted Average Price (VWAP)', () => {
  const closings = [9, 11, 7, 10, 8];
  const volumes = [100, 110, 80, 120, 90];

  it('should be able to compute with a config', () => {
    const expected = [9, 10.05, 9.32, 8.8, 9.14];

    const actual = vwap(closings, volumes, { period: 2 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [9, 10.05, 9.21, 9.44, 9.18];

    const actual = vwap(closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should not propagate NaN when a window has zero volume', () => {
    // Both bars have zero volume, so the volume sum for every window
    // is 0, which would otherwise divide by zero.
    const flatClosings = [9, 11];
    const zeroVolumes = [0, 0];
    const expected = [0, 0];

    const actual = vwap(flatClosings, zeroVolumes, { period: 2 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
