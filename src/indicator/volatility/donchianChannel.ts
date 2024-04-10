// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, divideBy } from '../../helper/numArray';
import { mmax } from '../trend/mmax';
import { mmin } from '../trend/mmin';

/**
 * Donchian channel result object.
 */
export interface DCResult {
  upper: number[];
  middle: number[];
  lower: number[];
}

/**
 * Optional configuration of DC parameters.
 */
export interface DCConfig {
  period?: number;
}

/**
 * The default configuration of DC.
 */
export const DCDefaultConfig: Required<DCConfig> = {
  period: 4,
};

/**
 * The Donchian Channel (DC) calculates three lines generated by moving average
 * calculations that comprise an indicator formed by upper and lower bands
 * around a midrange or median band. The upper band marks the highest
 * price of an asset while the lower band marks the lowest price of
 * an asset, and the area between the upper and lower bands
 * represents the Donchian Channel.
 *
 * Upper Channel = Mmax(closings, { period })
 * Lower Channel = Mmin(closings, { period })
 * Middle Channel = (Upper Channel + Lower Channel) / 2
 *
 * @param closings closing values.
 * @param config configuration.
 * @returns dc result.
 */
export function dc(closings: number[], config: DCConfig = {}): DCResult {
  const { period } = { ...DCDefaultConfig, ...config };
  const upper = mmax(closings, { period });
  const lower = mmin(closings, { period });
  const middle = divideBy(2, add(upper, lower));

  return {
    upper,
    middle,
    lower,
  };
}

// Export full name
export { dc as donchianChannel };
