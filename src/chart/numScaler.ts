// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { NumRange } from './numRange';

/**
 * Numeric scaler.
 */
export class NumScaler {
  private fromDelta: number;
  private toDelta: number;
  private multiplier: number;

  /**
   * Constructor.
   * @param from from range.
   * @param to to range.
   */
  constructor(from: NumRange, to: NumRange) {
    this.fromDelta = from.getMin();
    this.toDelta = to.getMin();
    this.multiplier = to.span() / from.span();
  }

  /**
   * Scales the given number.
   * @param n current value.
   * @return scaled value.
   */
  scale(n: number): number {
    return (n - this.fromDelta) * this.multiplier + this.toDelta;
  }

  /**
   * Descales the given number.
   * @param n scaled value.
   * @return descaled value.
   */
  descale(n: number): number {
    return (n - this.toDelta) / this.multiplier + this.fromDelta;
  }
}
