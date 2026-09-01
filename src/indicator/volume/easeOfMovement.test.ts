// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
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

  it('should not propagate NaN when a bar has zero high-low range and zero volume', () => {
    // Bar index 1 is a flat/halted bar with zero volume, where high
    // equals low, which would otherwise divide by zero (0 / 0) when
    // computing the box ratio.
    const flatHighs = [10, 10, 14];
    const flatLows = [6, 10, 10];
    const zeroVolumes = [100, 0, 90];
    const expected = [32000000, 16000000, 4444444.44];

    const actual = emv(flatHighs, flatLows, zeroVolumes, { period: 2 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
