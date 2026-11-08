// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { kvo } from './klingerVolumeOscillator';

describe('Klinger Volume Oscillator (KVO)', () => {
  const config = { shortPeriod: 1, longPeriod: 2, signalPeriod: 1 };

  it('should sign the volume by the bar direction', () => {
    // VF = [NaN, 10, -20, 0]: up bar, down bar, outside bar.
    // EMA(1) = VF, EMA(2) = [NaN, NaN, -5, -1.67].
    const actual = kvo([1, 2, 1, 3], [1, 2, 1, 0], [5, 10, 20, 30], config);
    expect(actual.kvo.slice(0, 3)).toStrictEqual([NaN, NaN, -15]);
    expect(actual.signal[2]).toBe(-15);
    expect(actual.kvo[3]).toBeCloseTo(5 / 3);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => kvo([1], [1, 2], [1])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(
      join(__dirname, 'testdata/klingerVolumeOscillator.csv')
    );
    const actual = kvo(data.high, data.low, data.volume);
    assertColumn(actual.kvo, data.kvo);
    assertColumn(actual.signal, data.signal);
  });
});
