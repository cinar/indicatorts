// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { rma } from '../trend/rma';

/**
 * Custom RSI. It is a momentum indicator that measures the magnitude of
 * recent price changes to evaluate overbought and oversold conditions
 * using the given window period.
 *
 * RS = Average Gain / Average Loss
 * RSI = 100 - (100 / (1 + RS))
 *
 * @param period window period.
 * @param closings closing values.
 * @return rsi values.
 */
export function customRsi(period: number, closings: number[]): number[] {
  const gains = new Array<number>(closings.length);
  const losses = new Array<number>(closings.length);

  gains[0] = losses[0] = 0;

  for (let i = 1; i < closings.length; i++) {
    const difference = closings[i] - closings[i - 1];

    if (difference > 0) {
      gains[i] = difference;
      losses[i] = 0;
    } else {
      losses[i] = -difference;
      gains[i] = 0;
    }
  }

  const meanGains = rma(gains, { period });
  const meanLosses = rma(losses, { period });

  const r = new Array<number>(closings.length);
  const rs = new Array<number>(closings.length);

  r[0] = rs[0] = 0;

  for (let i = 1; i < closings.length; i++) {
    rs[i] = meanGains[i] / meanLosses[i];
    r[i] = 100 - 100 / (1 + rs[i]);
  }

  return r;
}

/**
 * Relative Strength Index (RSI). It is a momentum indicator that measures
 * the magnitude of recent price changes to evaluate overbought and
 * oversold conditions using the window period of 14.
 *
 * RS = Average Gain / Average Loss
 * RSI = 100 - (100 / (1 + RS))
 *
 * @param closings closing values.
 * @return rsi values.
 */
export function rsi(closings: number[]): number[] {
  return customRsi(14, closings);
}
