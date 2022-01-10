// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {divide, generateNumbers, multiplyBy, substract} from '../../helper/numArray';
import {linearRegressionUsingLeastSquare, movingLinearRegressionUsingLeastSquare} from '../../helper/regression';

/**
 * The Chande Forecast Oscillator developed by Tushar Chande The Forecast
 * Oscillator plots the percentage difference between the closing price and
 * the n-period linear regression forecasted price. The oscillator is above
 * zero when the forecast price is greater than the closing price and less
 * than zero if it is below.
 *
 * R = Linreg(Closing)
 * CFO = ((Closing - R) / Closing) * 100
 *
 * @param closings closing values.
 * @return cfo values.
 */
export function chandeForecastOscillator(closings: number[]): number[] {
  const x = generateNumbers(0, closings.length, 1);
  const r = linearRegressionUsingLeastSquare(x, closings);
  const cfo = multiplyBy(100, divide(substract(closings, r), closings));
  return cfo;
}

/**
 * Moving Chande Forecast Oscillator calculates based on
 * the given period.
 *
 * The Chande Forecast Oscillator developed by Tushar Chande The Forecast
 * Oscillator plots the percentage difference between the closing price and
 * the n-period linear regression forecasted price. The oscillator is above
 * zero when the forecast price is greater than the closing price and less
 * than zero if it is below.
 *
 * R = Linreg(Closing)
 * CFO = ((Closing - R) / Closing) * 100
 *
 * @param period window period.
 * @param closings closing values.
 * @return moving cfo.
 */
export function movingChandeForecastOscillator(period: number, closings: number[]): number[] {
  const x = generateNumbers(0, closings.length, 1);
  const r = movingLinearRegressionUsingLeastSquare(period, x, closings);
  const cfo = multiplyBy(100, divide(substract(closings, r), closings));
  return cfo;
}
