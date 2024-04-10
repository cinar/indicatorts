// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  add,
  divide,
  generateNumbers,
  multiply,
  multiplyBy,
  subtract,
} from '../../helper/numArray';
import { movingLeastSquare } from '../../helper/regression';
import { ema } from '../trend/ema';
import { mmax } from '../trend/mmax';
import { mmin } from '../trend/mmin';

/**
 * Projection oscillator result object.
 */
export interface ProjectionOscillator {
  po: number[];
  spo: number[];
}

/**
 * Optional configuration of ProjectionOscillator parameters.
 */
export interface ProjectionOscillatorConfig {
  period?: number;
  smooth?: number;
}

/**
 * The default configuration of ProjectionOscillator.
 */
export const ProjectionOscillatorDefaultConfig: Required<ProjectionOscillatorConfig> =
  {
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
 * PL = Min(period, (high + MLS(period, x, high)))
 * PU = Max(period, (low + MLS(period, x, low)))
 * PO = 100 * (Closing - PL) / (PU - PL)
 * SPO = EMA(smooth, PO)
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return projection oscillator.
 */
export function projectionOscillator(
  highs: number[],
  lows: number[],
  closings: number[],
  config: ProjectionOscillatorConfig = {}
): ProjectionOscillator {
  const { period, smooth } = {
    ...ProjectionOscillatorDefaultConfig,
    ...config,
  };
  const x = generateNumbers(0, closings.length, 1);
  const lsHighs = movingLeastSquare(period, x, highs);
  const lsLows = movingLeastSquare(period, x, lows);

  const vHighs = add(highs, multiply(lsHighs.m, x));
  const vLows = add(lows, multiply(lsLows.m, x));

  const pu = mmax(vHighs, { period });
  const pl = mmin(vLows, { period });

  const po = divide(multiplyBy(100, subtract(closings, pl)), subtract(pu, pl));
  const spo = ema(po, { period: smooth });

  return {
    po,
    spo,
  };
}
