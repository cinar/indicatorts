// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  divide,
  generateNumbers,
  multiplyBy,
  subtract,
} from '../../helper/numArray';
import { movingLinearRegressionUsingLeastSquare } from '../../helper/regression';
import { ema } from '../trend/exponentialMovingAverage';
import { mmax } from '../trend/movingMax';
import { mmin } from '../trend/movingMin';

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
 * The highs and lows are projected using the fitted moving linear
 * regression line (m * x + b), obtained through the least squares method.
 *
 * PU = Max(period, MLR(period, x, high))
 * PL = Min(period, MLR(period, x, low))
 * PO = 100 * (Closing - PL) / (PU - PL)
 * SPO = EMA(smooth, PO)
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
  const { period, smooth } = {
    ...PODefaultConfig,
    ...config,
  };
  const x = generateNumbers(0, closings.length, 1);
  const vHighs = movingLinearRegressionUsingLeastSquare(period, x, highs);
  const vLows = movingLinearRegressionUsingLeastSquare(period, x, lows);

  const pu = mmax(vHighs, { period });
  const pl = mmin(vLows, { period });

  const poResult = divide(
    multiplyBy(100, subtract(closings, pl)),
    subtract(pu, pl)
  );
  const spoResult = ema(poResult, { period: smooth });

  return {
    poResult,
    spoResult,
  };
}

// Export full name
export { po as projectionOscillator };
