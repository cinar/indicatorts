// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { customRsi } from './rsi';

/**
 * RSI with 2 period, a mean-reversion trading strategy developed by Larry Connors.
 *
 * @param closings closing values.
 * @returns rsi values.
 */
export function rsi2(closings: number[]): number[] {
  return customRsi(2, closings);
}
