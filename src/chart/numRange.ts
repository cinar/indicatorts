// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Numeric range.
 */
export class NumRange {
  private min: number;
  private max: number;

  /**
   * Constructor.
   * @param min min value.
   * @param max max value.
   */
  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  /**
   * Gets the min value.
   * @return min value.
   */
  getMin(): number {
    return this.min;
  }

  /**
   * Gets the max value.
   * @return max value.
   */
  getMax(): number {
    return this.max;
  }

  /**
   * Calculates the span of the range.
   * @return span value.
   */
  span(): number {
    return this.max - this.min;
  }

  /**
   * Merge function merges the given ranges.
   * @param ranges range objects.
   * @return merged ranges.
   * @throws Error if the given ranges array is empty.
   */
  static merge(ranges: NumRange[]): NumRange {
    if (ranges.length === 0) {
      throw new Error('Cannot merge an empty array of ranges');
    }

    return ranges.reduce(
      (p, c) => new NumRange(Math.min(p.min, c.min), Math.max(p.max, c.max))
    );
  }

  /**
   * From function returns the range of the values. Values that are not
   * finite (such as NaN) are ignored. The range of no finite values is
   * (Infinity, -Infinity), which leaves other ranges unchanged on merge.
   * @param values values array.
   * @return range of the values.
   */
  static from(values: number[]): NumRange {
    // A loop instead of Math.min(...values), which throws a RangeError
    // once the array exceeds the engine's argument limit.
    let min = Infinity;
    let max = -Infinity;

    for (const value of values) {
      if (Number.isFinite(value)) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }

    return new NumRange(min, max);
  }
}
