// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {sma} from '../trend/sma';

/**
 * Relative Strength Index (RSI). It is a momentum indicator that measures
 * the magnitude of recent price changes to evaluate overbought and
 * oversold conditions.
 *
 * RS = Average Gain / Average Loss
 * RSI = 100 - (100 / (1 + RS))
 *
 * @param {number[]} closings closing values.
 * @return {number[]} rsi values.
 */
export function rsi(closings: number[]): number[] {
  const gains = new Array<number>(closings.length);
  const losses = new Array<number>(closings.length);

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

  const meanGains = sma(14, gains);
  const meanLosses = sma(14, losses);

  const r = new Array<number>(closings.length);
  const rs = new Array<number>(closings.length);

  for (let i = 0; i < closings.length; i++) {
    rs[i] = meanGains[i] / meanLosses[i];
    r[i] = 100 - (100 / (1 + rs[i]));
  }

  return r;
}
