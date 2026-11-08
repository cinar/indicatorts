// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

// Internal building block for the indicators that leave their warm-up
// period NaN. It is not exported from the package entry point.

/**
 * True range of each bar from the previous close, NaN for the first bar.
 *
 * ```
 * TR = Max(High - Low, High - Previous Close, Previous Close - Low)
 * ```
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return true range values.
 */
export function trueRanges(
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  return highs.map((high, i) => {
    if (i === 0) {
      return NaN;
    }

    const previous = closings[i - 1];
    return Math.max(high - lows[i], high - previous, previous - lows[i]);
  });
}
