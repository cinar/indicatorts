// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  add,
  addBy,
  divide,
  generateNumbers,
  multiply,
  multiplyBy,
  subtract,
  subtractBy,
} from "../../helper/numArray";
import { movingLeastSquare } from "../../helper/regression";
import { ema } from "../trend/ema";
import { mmax } from "../trend/mmax";
import { mmin } from "../trend/mmin";

/**
 * Projection oscillator result object.
 */
export interface ProjectionOscillator {
  po: number[];
  spo: number[];
}

// Just pads a number array with zeros to the right so that the length of the arr becomes desiredLength
function padWithZeros(desiredLength: number, arr: number[]) {
  const currentLength: number = arr.length;
  const result: number[] = new Array(desiredLength);

  for (let i = 0; i < desiredLength; i++) {
    if (i < currentLength) {
      result[i] = arr[i];
    } else {
      result[i] = 0;
    }
  }
  return result;
}

/**
 * ProjectionOscillator calculates the Projection Oscillator (PO). The PO
 * uses the linear regression slope, along with highs and lows.
 *
 * Period defines the moving window to calculates the PO, and the smooth
 * period defines the moving windows to take EMA of PO.
 * mHighs = MLS(period, x, high)
 * mLows = MLS(period, x, low)
 * PL[i] = Min(lows[i - period + 1, i] + mLows[i] * [0, period - 1])
 * PU[i] = Max(highs[i - period + 1, i] + mHighs[i] * [0, period - 1])
 * PO = 100 * (Closing - PL) / (PU - PL)
 * SPO = EMA(smooth, PO)
 *
 * @param period window period.
 * @param smooth smooth period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return projection oscillator.
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
  // const vHighs = add(highs, multiply(lsHighs.m, x));
  // const vLows = add(lows, multiply(lsLows.m, x));

  const arr_period: number[] = generateNumbers(0, period, 1);
  const pu = new Array(closings.length);
  for (let i = 0; i < highs.length; i++) {
    // for (let j = 0; j < period; j++) {
    //   if (i < j) {
    //     continue;
    //   }
    //   pu[i] = Math.max(
    //     pu[i],
    //     highs[i - j] + lsHighs.m[i] * arr_period[j],
    //   );
    // }
    ///////////////////////////////////
    // LOOK HERE
    ///////////////////////////////////
    const newHighs = padWithZeros(
      period,
      highs.slice(Math.max(0, i - period + 1), i + 1),
    );
    const vHighs = add(newHighs, multiplyBy(lsHighs.m[i], arr_period));
    pu[i] = Math.max(...vHighs);
  }

  const pl = new Array(closings.length);
  for (let i = 0; i < lows.length; i++) {
    // for (let j = 0; j < period; j++) {
    //   if (i < j) {
    //     continue;
    //   }
    //   pl[i] = Math.min(
    //     pl[i],
    //     lows[i - j] + lsLows.m[i] * arr_period[j],
    //   );
    // }
    ///////////////////////////////////
    // LOOK HERE
    ///////////////////////////////////
    const newLows = padWithZeros(
      period,
      lows.slice(Math.max(0, i - period + 1), i + 1),
    );
    const vLows = add(newLows, multiplyBy(lsLows.m[i], arr_period));
    pl[i] = Math.min(...vLows);
  }

  console.log(pu);
  console.log(pl);

  // const pu = mmax(period, vHighs);
  // const pl = mmin(period, vLows);

  const po = divide(multiplyBy(100, subtract(closings, pl)), subtract(pu, pl));
  const spo = ema(smooth, po);

  return {
    po,
    spo,
  };
}

/**
 * Default projection oscillator function.
 * @param highs high values.
 * @param lows lows values.
 * @param closings closing values.
 * @return projection oscillator.
 */
export function defaultProjectionOscillator(
  highs: number[],
  lows: number[],
  closings: number[],
): ProjectionOscillator {
  return projectionOscillator(14, 3, highs, lows, closings);
}
function rng(mean: number, stdDev: number) {
  return mean + stdDev * (Math.random() - 0.5);
}

function generateRandomNumbers(count: number, mean: number, stdDev: number) {
  const result: number[] = new Array(count);
  for (let i = 0; i < count; i++) {
    result[i] = rng(mean, stdDev);
  }
  return result;
}

const closings = generateRandomNumbers(100, 30, 5);
const highs = addBy(0.5, closings);
const lows = subtractBy(0.5, closings);

const result = projectionOscillator(14, 5, highs, lows, closings);

// Check if any of the values are below 0 or above 100 in the result array
console.log(result);
console.log(result.po.some((v) => v < 0 || v > 100));
// This is returning false, which means that all the values are between 0 and 100
