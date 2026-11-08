// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

// Internal moving-window building blocks for the indicators that leave their
// warm-up period NaN. They are not exported from the package entry point.

/**
 * Applies the given function to the window of `period` values that ends at
 * each index. An index whose window is not full yet, or holds a value that
 * is not finite (such as the NaN warm-up of an earlier indicator), is NaN.
 *
 * @param values input values.
 * @param period window period.
 * @param fn function of the window values, oldest first.
 * @return window results.
 */
export function windowed(
  values: number[],
  period: number,
  fn: (window: number[]) => number
): number[] {
  const result = new Array<number>(values.length).fill(NaN);
  let lastNonFinite = -1;

  for (let i = 0; i < values.length; i++) {
    if (!Number.isFinite(values[i])) {
      lastNonFinite = i;
    }

    const start = i - period + 1;
    if (start >= 0 && lastNonFinite < start) {
      result[i] = fn(values.slice(start, i + 1));
    }
  }

  return result;
}

/**
 * Simple moving average of each full window of `period` values, NaN before.
 *
 * @param values input values.
 * @param period window period.
 * @return average values.
 */
export function windowedSma(values: number[], period: number): number[] {
  return windowed(
    values,
    period,
    (window) => window.reduce((sum, value) => sum + value, 0) / period
  );
}

/**
 * Highest value of each full window of `period` values, NaN before.
 *
 * @param values input values.
 * @param period window period.
 * @return highest values.
 */
export function windowedMax(values: number[], period: number): number[] {
  return windowed(values, period, (window) => Math.max(...window));
}

/**
 * Lowest value of each full window of `period` values, NaN before.
 *
 * @param values input values.
 * @param period window period.
 * @return lowest values.
 */
export function windowedMin(values: number[], period: number): number[] {
  return windowed(values, period, (window) => Math.min(...window));
}

/**
 * Population standard deviation of each full window of `period` values, NaN
 * before.
 *
 * @param values input values.
 * @param period window period.
 * @return standard deviation values.
 */
export function windowedStd(values: number[], period: number): number[] {
  return windowed(values, period, (window) => {
    const mean = window.reduce((sum, value) => sum + value, 0) / period;
    const squares = window.reduce(
      (sum, value) => sum + (value - mean) * (value - mean),
      0
    );
    return Math.sqrt(squares / period);
  });
}

/**
 * Value `period` bars before each index, NaN for the first `period` bars.
 *
 * @param values input values.
 * @param period number of bars to look back.
 * @return lagged values.
 */
export function lag(values: number[], period: number): number[] {
  return values.map((_, i) => (i >= period ? values[i - period] : NaN));
}

/**
 * Rate of change as a ratio, `(value - previous) / previous`, where
 * `previous` is the value `period` bars before. NaN for the first `period`
 * bars, and 0 when the previous value is 0.
 *
 * @param values input values.
 * @param period number of bars to look back.
 * @return change ratios.
 */
export function changeRatio(values: number[], period: number): number[] {
  return lag(values, period).map((previous, i) =>
    previous === 0 ? 0 : (values[i] - previous) / previous
  );
}

/**
 * Divides the numerator by the denominator, returning the fallback when the
 * denominator is 0.
 *
 * @param numerator numerator value.
 * @param denominator denominator value.
 * @param fallback value returned for a zero denominator.
 * @return quotient or fallback.
 */
export function safeDivide(
  numerator: number,
  denominator: number,
  fallback: number
): number {
  return denominator === 0 ? fallback : numerator / denominator;
}

/**
 * Sets the values to NaN wherever the mask is NaN, so outputs computed in
 * parallel start at the same index.
 *
 * @param values input values.
 * @param mask mask values.
 * @return masked values.
 */
export function maskNaN(values: number[], mask: number[]): number[] {
  return values.map((value, i) => (Number.isNaN(mask[i]) ? NaN : value));
}

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
