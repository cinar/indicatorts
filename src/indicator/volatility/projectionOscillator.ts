// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {add, divide, generateNumbers, multiply, multiplyBy, substract} from '../../helper/numArray';
import {movingLeastSquare} from '../../helper/regression';
import {ema} from '../trend/ema';
import {mmax} from '../trend/mmax';
import {mmin} from '../trend/mmin';

/**
 * Projection oscillator result object.
 */
export interface ProjectionOscillator {
  po: number[];
  spo: number[];
}

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
 * @param {number} period window period.
 * @param {number} smooth smooth period.
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {ProjectionOscillator} projection oscillator.
 */
export function projectionOscillator(
    period: number,
    smooth: number,
    highs: number[],
    lows: number[],
    closings: number[],
): ProjectionOscillator {
  const x = generateNumbers(0, closings.length, 1);
  const lsHighs = movingLeastSquare(period, x, highs);
  const lsLows = movingLeastSquare(period, x, lows);

  const vHighs = add(highs, multiply(lsHighs.m, x));
  const vLows = add(lows, multiply(lsLows.m, x));

  const pu = mmax(period, vHighs);
  const pl = mmin(period, vLows);

  const po = divide(multiplyBy(100, substract(closings, pl)), substract(pu, pl));
  const spo = ema(smooth, po);

  return {
    po,
    spo,
  };
}

/**
 * Default projection oscillator function.
 * @param {number[]} highs high values.
 * @param {number[]} lows lows values.
 * @param {number[]} closings closing values.
 * @return {PoResult} projection oscillator.
 */
export function defaultProjectionOscillator(
    highs: number[],
    lows: number[],
    closings: number[],
): ProjectionOscillator {
  return projectionOscillator(14, 3, highs, lows, closings);
}
