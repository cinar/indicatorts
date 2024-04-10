// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  divide,
  generateNumbers,
  multiplyBy,
  subtract,
} from '../../helper/numArray';
import {
  linearRegressionUsingLeastSquare,
  movingLinearRegressionUsingLeastSquare,
} from '../../helper/regression';

/**
 * Optional configuration of ChandeForecastOscillator parameters.
 */
export interface ChandeForecastOscillatorConfig {
  period?: number;
}

/**
 * The default configuration of ChandeForecastOscillator.
 */
export const ChandeForecastOscillatorDefaultConfig: Required<ChandeForecastOscillatorConfig> =
  {
    period: 4,
  };

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
  const cfo = multiplyBy(100, divide(subtract(closings, r), closings));
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
 * @param closings closing values.
 * @param config configuration.
 * @return moving cfo.
 */
export function movingChandeForecastOscillator(
  closings: number[],
  config: ChandeForecastOscillatorConfig = {}
): number[] {
  const { period } = { ...ChandeForecastOscillatorDefaultConfig, ...config };
  const x = generateNumbers(0, closings.length, 1);
  const r = movingLinearRegressionUsingLeastSquare(period, x, closings);
  const cfo = multiplyBy(100, divide(subtract(closings, r), closings));
  return cfo;
}
