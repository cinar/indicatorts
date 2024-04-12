// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { sma } from './simpleMovingAverage';

/**
 * Optional configuration of Qstick parameters.
 */
export interface QstickConfig {
  period?: number;
}

/**
 * The default configuration of Qstick.
 */
export const QstickDefaultConfig: Required<QstickConfig> = {
  period: 14,
};

/**
 * The Qstick function calculates the ratio of recent up and down bars.
 *
 * QS = Sma(Closing - Opening)
 *
 * @param openings openinig values.
 * @param closings closing values.
 * @param config configuration.
 * @return qstick values.
 */
export function qstick(
  openings: number[],
  closings: number[],
  config: QstickConfig = {}
): number[] {
  const { period } = { ...QstickDefaultConfig, ...config };
  const result = sma(subtract(closings, openings), { period });

  return result;
}
