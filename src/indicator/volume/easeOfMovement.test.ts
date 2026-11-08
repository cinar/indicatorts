// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../index';
import { emv } from './easeOfMovement';

describe('Ease of Movement (EMV)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const volumes = [100, 110, 80, 120, 90];

  it('should be able to compute with a config', () => {
    const expected = [0, 0, 3125000, 3385416.67, 1819444.44];

    const actual = emv(highs, lows, volumes, { period: 20 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [0, 0, 3125000, 3385416.67, 1819444.44];

    const actual = emv(highs, lows, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should not produce an artificial spike on the first day', () => {
    // Day 0 has no prior high/low to compare against, so the distance
    // moved (and therefore EMV) should be 0, not the raw midpoint price
    // ((10 + 6) / 2 = 8) fed through the box ratio.
    const actual = emv(highs, lows, volumes, { period: 20 });
    expect(roundDigitsAll(2, actual)[0]).toBe(0);
  });

  it('should not propagate NaN when a bar has zero high-low range and zero volume', () => {
    // Bar index 1 is a flat/halted bar with zero volume, where high
    // equals low, which would otherwise divide by zero (0 / 0) when
    // computing the box ratio.
    const flatHighs = [10, 10, 14];
    const flatLows = [6, 10, 10];
    const zeroVolumes = [100, 0, 90];
    const expected = [0, 0, 4444444.44];

    const actual = emv(flatHighs, flatLows, zeroVolumes, { period: 2 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should treat a bar with zero volume as no movement', () => {
    const actual = emv([10, 11, 12], [9, 10, 11], [100, 0, 100], {
      period: 2,
    });
    expect(actual.every((value) => Number.isFinite(value))).toBe(true);
    expect(actual[1]).toBe(0);
  });

  it('should match the reference data', () => {
    const data = readCsv(join(__dirname, 'testdata/easeOfMovement.csv'));
    assertColumn(emv(data.high, data.low, data.volume), data.emv);
  });
});
