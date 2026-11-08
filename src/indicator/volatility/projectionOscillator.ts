// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength, generateNumbers } from '../../helper/numArray';
import { movingLeastSquare } from '../../helper/regression';
import { ema } from '../trend/exponentialMovingAverage';

/**
 * Projection oscillator result object.
 */
export interface POResult {
  poResult: number[];
  spoResult: number[];
}

/**
 * Optional configuration of PO parameters.
 */
export interface POConfig {
  period?: number;
  smooth?: number;
}

/**
 * The default configuration of PO.
 */
export const PODefaultConfig: Required<POConfig> = {
  period: 14,
  smooth: 3,
};

/**
 * ProjectionOscillator calculates the Projection Oscillator (PO). The PO
 * uses the linear regression slope, along with highs and lows.
 *
 * Period defines the moving window to calculates the PO, and the smooth
 * period defines the moving windows to take EMA of PO.
 *
 * Each high (and low) in the window is projected forward to the current
 * bar along the slope of the moving linear regression of the highs (and
 * lows), obtained through the least squares method.
 *
 * PU = Max(High[i - k] + k * Slope(period, high)) for k = 0 .. period - 1
 * PL = Min(Low[i - k] + k * Slope(period, low)) for k = 0 .. period - 1
 * PO = 100 * (Closing - PL) / (PU - PL)
 * SPO = EMA(smooth, PO)
 *
 * Since the current high and low are part of the window, PO stays within
 * 0 to 100. When PU equals PL, PO is 50.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return projection oscillator.
 */
export function po(
  highs: number[],
  lows: number[],
  closings: number[],
  config: POConfig = {}
): POResult {
  checkSameLength(highs, lows, closings);
  const { period, smooth } = {
    ...PODefaultConfig,
    ...config,
  };

  const x = generateNumbers(0, closings.length, 1);
  const highSlopes = movingLeastSquare(period, x, highs).m;
  const lowSlopes = movingLeastSquare(period, x, lows).m;

  const poResult = new Array<number>(closings.length);

  for (let i = 0; i < closings.length; i++) {
    let upper = -Infinity;
    let lower = Infinity;

    for (let j = Math.max(0, i - period + 1); j <= i; j++) {
      upper = Math.max(upper, highs[j] + highSlopes[i] * (i - j));
      lower = Math.min(lower, lows[j] + lowSlopes[i] * (i - j));
    }

    poResult[i] =
      upper === lower ? 50 : (100 * (closings[i] - lower)) / (upper - lower);
  }

  const spoResult = ema(poResult, { period: smooth });

  return {
    poResult,
    spoResult,
  };
}

// Export full name
export { po as projectionOscillator };
