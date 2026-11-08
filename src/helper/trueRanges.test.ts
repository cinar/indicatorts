// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { trueRanges } from './trueRanges';

describe('True ranges', () => {
  it('should compute the true range from the previous close', () => {
    // Gap up, gap down and an inside bar.
    const actual = trueRanges([10, 15, 8, 9], [8, 13, 6, 7], [9, 14, 7, 8]);
    expect(actual).toStrictEqual([NaN, 6, 8, 2]);
  });
});
