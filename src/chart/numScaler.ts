// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {NumRange} from './numRange';

/**
 * Numeric scaler.
 */
export class NumScaler {
  private fromDelta: number;
  private toDelta: number;
  private multiplier: number;

  /**
   * Constructor.
   * @param {NumRange} from from range.
   * @param {NumRange} to to range.
   */
  constructor(from: NumRange, to: NumRange) {
    this.fromDelta = from.getMin();
    this.toDelta = to.getMin();
    this.multiplier = to.span() / from.span();
  }

  /**
   * Scales the given number.
   * @param {number} n current value.
   * @return {number} scaled value.
   */
  scale(n: number): number {
    return ((n - this.fromDelta) * this.multiplier) + this.toDelta;
  }

  /**
   * Descales the given number.
   * @param {number} n scaled value.
   * @return {number} descaled value.
   */
  descale(n: number): number {
    return ((n - this.toDelta) / this.multiplier) + this.fromDelta;
  }
}
