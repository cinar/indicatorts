// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, addBy, checkSameLength, multiply, multiplyBy } from './numArray';

/**
 * Least square result object.
 */
export interface LeastSquareResult {
  m: number;
  b: number;
}

/**
 * Moving least square result.
 */
export interface MovingLeastSquareResult {
  m: number[];
  b: number[];
}

/**
 * Least square.
 *
 * y = mx + b
 * b = y-intercept
 * y = slope
 *
 * m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
 * b = (sumY - m * sumX) / n
 *
 * @param x x values.
 * @param y y values.
 * @return least square result object.
 */
export function leastSquare(x: number[], y: number[]): LeastSquareResult {
  checkSameLength(x, y);

  let sumX = 0;
  let sumX2 = 0;
  let sumY = 0;
  let sumXY = 0;

  for (let i = 0; i < x.length; i++) {
    sumX += x[i];
    sumX2 += x[i] * x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
  }

  const n = x.length;
  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;

  return {
    m,
    b,
  };
}

/**
 * Moving least square over a period.
 *
 * y = mx + b
 * b = y-intercept
 * y = slope
 *
 * m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
 * b = (sumY - m * sumX) / n
 *
 * @param period window period.
 * @param x x values.
 * @param y y values.
 * @return moving least square result.
 */
export function movingLeastSquare(
  period: number,
  x: number[],
  y: number[]
): MovingLeastSquareResult {
  checkSameLength(x, y);

  const m = new Array<number>(x.length);
  const b = new Array<number>(x.length);

  let sumX = 0;
  let sumX2 = 0;
  let sumY = 0;
  let sumXY = 0;

  for (let i = 0; i < x.length; i++) {
    sumX += x[i];
    sumX2 += x[i] * x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];

    let n = i + 1;

    if (i >= period) {
      sumX -= x[i - period];
      sumX2 -= x[i - period] * x[i - period];
      sumY -= y[i - period];
      sumXY -= x[i - period] * y[i - period];
      n = period;
    }

    if (i > 0) {
      m[i] = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      b[i] = (sumY - m[i] * sumX) / n;
    } else {
      m[i] = 0;
      b[i] = 0;
    }
  }

  return {
    m,
    b,
  };
}

/**
 * Linear regression using least square method.
 *
 * y = mx + b
 *
 * @param x x values.
 * @param y y values.
 * @return regression values.
 */
export function linearRegressionUsingLeastSquare(
  x: number[],
  y: number[]
): number[] {
  const ls = leastSquare(x, y);
  const lr = addBy(ls.b, multiplyBy(ls.m, x));
  return lr;
}

/**
 * Moving linear regression using least square.
 *
 * y = mx + b
 *
 * @param period window period.
 * @param x x values.
 * @param y y values.
 * @return regression values.
 */
export function movingLinearRegressionUsingLeastSquare(
  period: number,
  x: number[],
  y: number[]
): number[] {
  const ls = movingLeastSquare(period, x, y);
  const lr = add(multiply(ls.m, x), ls.b);
  return lr;
}
