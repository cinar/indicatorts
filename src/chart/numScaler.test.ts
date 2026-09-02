// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { strictEqual } from 'assert';
import { NumRange } from './numRange';
import { NumScaler } from './numScaler';

describe('NumScaler', () => {
  it('should be able to scale and descale a value', () => {
    const scaler = new NumScaler(new NumRange(0, 10), new NumRange(0, 100));

    strictEqual(scaler.scale(5), 50);
    strictEqual(scaler.descale(50), 5);
  });

  it('should be able to handle flat data without producing Infinity or NaN', () => {
    const from = NumRange.from([5, 5, 5]);
    const to = new NumRange(0, 100);
    const scaler = new NumScaler(from, to);

    for (const n of [-10, 0, 5, 10, 1000]) {
      const scaled = scaler.scale(n);
      strictEqual(Number.isFinite(scaled), true);
      strictEqual(scaled, to.getMin());
    }
  });
});
