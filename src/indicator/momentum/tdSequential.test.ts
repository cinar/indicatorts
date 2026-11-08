// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { tdSequential } from './tdSequential';

describe('TD Sequential', () => {
  const config = {
    lookback: 1,
    countdownLookback: 1,
    setupPeriod: 2,
    countdownPeriod: 2,
  };

  it('should count a down setup and countdown', () => {
    const actual = tdSequential([5, 4, 3, 2, 1], config);
    expect(actual.downSetup).toStrictEqual([0, 1, 2, 2, 2]);
    expect(actual.upSetup).toStrictEqual([0, 0, 0, 0, 0]);
    // The countdown completes at 2, then restarts.
    expect(actual.downCountdown).toStrictEqual([0, 0, 1, 2, 1]);
  });

  it('should cancel a countdown on an opposite setup', () => {
    const actual = tdSequential([5, 4, 3, 4, 5, 6], config);
    expect(actual.downCountdown).toStrictEqual([0, 0, 1, 1, 0, 0]);
    expect(actual.upSetup).toStrictEqual([0, 0, 0, 1, 2, 2]);
    expect(actual.upCountdown).toStrictEqual([0, 0, 0, 0, 1, 2]);
  });

  it('should wait for the countdown lookback', () => {
    const actual = tdSequential([3, 2, 1, 0], {
      ...config,
      countdownLookback: 3,
    });
    expect(actual.downCountdown).toStrictEqual([0, 0, 0, 1]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    // upSetup is the Go SellSetup without its sign. The Go countdown reset
    // before reporting the completing bar, so it never showed 13; the
    // expected values were generated with that fixed.
    const data = readCsv(join(__dirname, 'testdata/tdSequential.csv'));
    const actual = tdSequential(data.close);
    assertColumn(actual.downSetup, data.downSetup, 0);
    assertColumn(actual.upSetup, data.upSetup, 0);
    assertColumn(actual.downCountdown, data.downCountdown, 0);
    assertColumn(actual.upCountdown, data.upCountdown, 0);
  });
});
