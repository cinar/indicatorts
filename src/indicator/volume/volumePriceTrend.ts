// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  divide,
  multiply,
  shiftRightAndFillBy,
  subtract,
} from '../../helper/numArray';
import { msum } from '../trend/movingSum';

/**
 * The Volume Price Trend (VPT) provides a correlation between the volume and
 * the price.
 *
 * ```
 * VPT = Previous VPT + (Volume * (Current Closing - Previous Closing) / Previous Closing)
 * ```
 *
 * @title Volume Price Trend (VPT)
 * @example
 * ```TypeScript
 * import { vpt } from 'indicatorts';
 *
 * const result = vpt(closings, volumes);
 *
 * // Alternatively:
 * // const result = volumePriceTrend(closings, volumes);
 * ```
 * @param closings closing values.
 * @param volumes volume values.
 * @returns volume price trend values.
 */
export function vpt(closings: number[], volumes: number[]): number[] {
  const previousClosings = shiftRightAndFillBy(1, closings[0], closings);
  const vpt = multiply(
    volumes,
    divide(subtract(closings, previousClosings), previousClosings)
  );
  const result = msum(vpt, { period: vpt.length });

  return result;
}

// Export full name
export { vpt as volumePriceTrend };
