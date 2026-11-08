// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { envelope } from './envelope';

describe('Moving Average Envelope', () => {
  it('should place the bands around the moving average', () => {
    const actual = envelope([10, 30], { period: 2, percentage: 10 });
    expect(actual.middle).toStrictEqual([NaN, 20]);
    expect(actual.upper).toStrictEqual([NaN, 22]);
    expect(actual.lower).toStrictEqual([NaN, 18]);
  });

  it('should return no values for empty input', () => {
    expect(envelope([]).middle).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/envelope.csv'));
    const actual = envelope(data.close);
    assertColumn(actual.upper, data.upper);
    assertColumn(actual.middle, data.middle);
    assertColumn(actual.lower, data.lower);
  });

  it('should match the reference data with an EMA', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/envelope.ema.csv'));
    const actual = envelope(data.close, { ma: 'ema' });
    assertColumn(actual.upper, data.upper);
    assertColumn(actual.middle, data.middle);
    assertColumn(actual.lower, data.lower);
  });
});
