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
export function cfo(closings: number[]): number[] {
  const x = generateNumbers(0, closings.length, 1);
  const r = linearRegressionUsingLeastSquare(x, closings);
  const result = multiplyBy(100, divide(subtract(closings, r), closings));

  return result;
}

// Export full name
export { cfo as chandeForecastOscillator };

/**
 * Optional configuration of moving Chande forecast oscillator parameters.
 */
export interface MCFOConfig {
  period?: number;
}

/**
 * The default configuration of moving Chande forecast oscillator.
 */
export const MCFODefaultConfig: Required<MCFOConfig> = {
  period: 4,
};

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
export function mcfo(closings: number[], config: MCFOConfig = {}): number[] {
  const { period } = { ...MCFODefaultConfig, ...config };
  const x = generateNumbers(0, closings.length, 1);
  const r = movingLinearRegressionUsingLeastSquare(period, x, closings);
  const result = multiplyBy(100, divide(subtract(closings, r), closings));

  return result;
}

// Export full name
export { mcfo as movingChandeForecastOscillator };
