// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { safeDivide, windowedMax, windowedMin } from '../../helper/window';
import { FISHER_CLAMP } from './fisherTransform';

/**
 * Optional configuration of Ehlers Fisher Transform parameters.
 */
export interface EhlersFisherConfig {
  period?: number;
}

/**
 * The default configuration of Ehlers Fisher Transform.
 */
export const EhlersFisherDefaultConfig: Required<EhlersFisherConfig> = {
  period: 10,
};

/**
 * Ehlers Fisher Transform. It is the Fisher transform as John Ehlers
 * published it ("Using the Fisher Transform", Stocks & Commodities): it
 * uses the median price and smooths both the normalized price and the
 * transformed value recursively.
 *
 * ```
 * Price = (High + Low) / 2
 * Value1 = 0.33 * 2 * ((Price - Min(Price, period)) / (Max(Price, period) - Min(Price, period)) - 0.5) + 0.67 * Value1[previous]
 * Fisher = 0.5 * ln((1 + Value1) / (1 - Value1)) * 0.5 + 0.5 * Fisher[previous]
 * ```
 *
 * `Value1` is clamped to -0.999 to 0.999. The previous `Value1` and
 * `Fisher` start at 0. A window whose prices are all equal has no range,
 * and its price is placed at the middle of the range (0.5).
 *
 * Warm-up: the first `period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { ehlersFisher } from 'indicatorts';
 *
 * const defaultConfig = { period: 10 };
 * const result = ehlersFisher(highs, lows, defaultConfig);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param config configuration.
 * @return fisher values.
 */
export function ehlersFisher(
  highs: number[],
  lows: number[],
  config: EhlersFisherConfig = {}
): number[] {
  checkSameLength(highs, lows);

  const { period } = { ...EhlersFisherDefaultConfig, ...config };
  const prices = highs.map((high, i) => (high + lows[i]) / 2);
  const highest = windowedMax(prices, period);
  const lowest = windowedMin(prices, period);
  const result = new Array<number>(prices.length).fill(NaN);

  let value1 = 0;
  let previous = 0;

  for (let i = 0; i < prices.length; i++) {
    if (Number.isNaN(highest[i])) {
      continue;
    }

    const normalized = safeDivide(
      prices[i] - lowest[i],
      highest[i] - lowest[i],
      0.5
    );

    value1 = Math.min(
      FISHER_CLAMP,
      Math.max(-FISHER_CLAMP, 0.33 * 2 * (normalized - 0.5) + 0.67 * value1)
    );
    previous =
      0.5 * Math.log((1 + value1) / (1 - value1)) * 0.5 + 0.5 * previous;
    result[i] = previous;
  }

  return result;
}
