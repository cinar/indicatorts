// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
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

  it('should keep the previous value when the volume is unchanged', () => {
    // Volume is unchanged on bar 1 and falls on bar 2, so only bar 2's
    // 10% price change is applied.
    const actual = nvi([10, 11, 12.1], [100, 100, 90]);
    expect(roundDigitsAll(2, actual)).toStrictEqual([1000, 1000, 1100]);
  });

  it('should match the reference data', () => {
    const data = readCsv(join(__dirname, 'testdata/negativeVolumeIndex.csv'));
    assertColumn(nvi(data.close, data.volume), data.nvi);
  });
});
