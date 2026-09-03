// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
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
 * WARNING: this computes a single linear regression over the *entire*
 * input series — every returned value depends on all of `closings`,
 * including bars after it. This makes cfo() unsuitable for point-in-time
 * signals (e.g. backtesting), where it would leak future information.
 * Use mcfo() (Moving Chande Forecast Oscillator) instead for a rolling,
 * point-in-time-safe computation.
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
  const xVal = generateNumbers(0, closings.length, 1);
  const rVal = movingLinearRegressionUsingLeastSquare(period, xVal, closings);
  const result = multiplyBy(100, divide(subtract(closings, rVal), closings));

  return result;
}

// Export full name
export { mcfo as movingChandeForecastOscillator };
