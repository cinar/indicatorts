// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';

/**
 * Pivot point calculation method.
 */
export type PivotPointMethod =
  'standard' | 'woodie' | 'camarilla' | 'fibonacci';

/**
 * Pivot point result object. The Woodie and Fibonacci methods define three
 * levels on each side, so their r4 and s4 are NaN.
 */
export interface PivotPointResult {
  p: number[];
  r1: number[];
  r2: number[];
  r3: number[];
  r4: number[];
  s1: number[];
  s2: number[];
  s3: number[];
  s4: number[];
}

/**
 * Optional configuration of Pivot Point parameters.
 */
export interface PivotPointConfig {
  method?: PivotPointMethod;
}

/**
 * The default configuration of Pivot Point.
 */
export const PivotPointDefaultConfig: Required<PivotPointConfig> = {
  method: 'standard',
};

/**
 * Pivot Point. It computes a pivot level and the resistance (R) and support
 * (S) levels around it from the previous bar's high, low and close (and the
 * current bar's open, for the Woodie method).
 *
 * ```
 * Standard:
 *   P = (H + L + C) / 3
 *   R1 = 2P - L, S1 = 2P - H
 *   R2 = P + (H - L), S2 = P - (H - L)
 *   R3 = H + 2(P - L), S3 = L - 2(H - P)
 *   R4 = H + 3(P - L), S4 = L - 3(H - P)
 * Woodie:
 *   P = (H + L + 2 * Open) / 4, with R1 to R3 and S1 to S3 as in Standard
 * Camarilla:
 *   P = (H + L + C) / 3
 *   R1..R4 = C + (H - L) * 1.1 / 12, / 6, / 4, / 2
 *   S1..S4 = C - (H - L) * 1.1 / 12, / 6, / 4, / 2
 * Fibonacci:
 *   P = (H + L + C) / 3
 *   R1..R3 = P + (H - L) * 0.382, 0.618, 1.000
 *   S1..S3 = P - (H - L) * 0.382, 0.618, 1.000
 * ```
 *
 * H, L and C are the previous bar's high, low and close; Open is the
 * current bar's open.
 *
 * Warm-up: the first value is NaN.
 *
 * @example
 * ```TypeScript
 * import { pivotPoint } from 'indicatorts';
 *
 * const defaultConfig = { method: 'standard' };
 * const { p, r1, s1 } = pivotPoint(openings, highs, lows, closings, defaultConfig);
 * ```
 * @param openings opening values.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return pivot point result.
 */
export function pivotPoint(
  openings: number[],
  highs: number[],
  lows: number[],
  closings: number[],
  config: PivotPointConfig = {}
): PivotPointResult {
  checkSameLength(openings, highs, lows, closings);

  const { method } = { ...PivotPointDefaultConfig, ...config };

  /**
   * Returns an array of NaN of the input length.
   *
   * @return NaN array.
   */
  const empty = (): number[] => new Array<number>(closings.length).fill(NaN);

  const result: PivotPointResult = {
    p: empty(),
    r1: empty(),
    r2: empty(),
    r3: empty(),
    r4: empty(),
    s1: empty(),
    s2: empty(),
    s3: empty(),
    s4: empty(),
  };

  for (let i = 1; i < closings.length; i++) {
    const high = highs[i - 1];
    const low = lows[i - 1];
    const close = closings[i - 1];
    const range = high - low;

    if (method === 'camarilla') {
      result.p[i] = (high + low + close) / 3;
      result.r1[i] = close + (range * 1.1) / 12;
      result.r2[i] = close + (range * 1.1) / 6;
      result.r3[i] = close + (range * 1.1) / 4;
      result.r4[i] = close + (range * 1.1) / 2;
      result.s1[i] = close - (range * 1.1) / 12;
      result.s2[i] = close - (range * 1.1) / 6;
      result.s3[i] = close - (range * 1.1) / 4;
      result.s4[i] = close - (range * 1.1) / 2;
    } else if (method === 'fibonacci') {
      const pivot = (high + low + close) / 3;
      result.p[i] = pivot;
      result.r1[i] = pivot + range * 0.382;
      result.s1[i] = pivot - range * 0.382;
      result.r2[i] = pivot + range * 0.618;
      result.s2[i] = pivot - range * 0.618;
      result.r3[i] = pivot + range;
      result.s3[i] = pivot - range;
    } else {
      const pivot =
        method === 'woodie'
          ? (high + low + 2 * openings[i]) / 4
          : (high + low + close) / 3;
      result.p[i] = pivot;
      result.r1[i] = 2 * pivot - low;
      result.s1[i] = 2 * pivot - high;
      result.r2[i] = pivot + range;
      result.s2[i] = pivot - range;
      result.r3[i] = high + 2 * (pivot - low);
      result.s3[i] = low - 2 * (high - pivot);

      if (method === 'standard') {
        result.r4[i] = high + 3 * (pivot - low);
        result.s4[i] = low - 3 * (high - pivot);
      }
    }
  }

  return result;
}
