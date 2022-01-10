// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {substract} from '../../helper/numArray';
import {ema} from './ema';

export interface MacdResult {
  macdLine: number[],
  signalLine: number[]
}

/**
 * Moving Average Convergence Divergence (MACD).
 *
 * MACD = 12-Period EMA - 26-Period EMA.
 * Signal = 9-Period EMA of MACD.
 *
 * @param {number[]} closings closing values.
 * @return {MacdResult} macd result.
 */
export function macd(closings: number[]): MacdResult {
  const ema12 = ema(12, closings);
  const ema26 = ema(26, closings);

  const macdLine = substract(ema12, ema26);
  const signalLine = ema(9, macdLine);

  return {
    macdLine,
    signalLine,
  };
}
