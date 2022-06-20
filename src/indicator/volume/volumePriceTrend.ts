// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  divide,
  multiply,
  shiftRightAndFillBy,
  subtract,
} from '../../helper/numArray';
import { msum } from '../trend/msum';

/**
 * The Volume Price Trend (VPT) provides a correlation between the volume and
 * the price.
 *
 * VPT = Previous VPT + (Volume * (Current Closing - Previous Closing) / Previous Closing)
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @returns volume price trend values.
 */
export function volumePriceTrend(
  closings: number[],
  volumes: number[]
): number[] {
  const previousClosings = shiftRightAndFillBy(1, closings[0], closings);
  const vpt = multiply(
    volumes,
    divide(subtract(closings, previousClosings), previousClosings)
  );
  return msum(vpt.length, vpt);
}
