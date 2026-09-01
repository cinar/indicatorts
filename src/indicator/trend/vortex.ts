// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  abs,
  checkSameLength,
  divide,
  max,
  shiftRightAndFillBy,
  subtract,
} from '../../helper/numArray';
import { msum } from './movingSum';

/**
 * Vortex result.
 */
export interface VortexResult {
  plus: number[];
  minus: number[];
}

/**
 * Optional configuration of vortex parameters.
 */
export interface VortexConfig {
  period?: number;
}

/**
 * The default configuration of vortex.
 */
export const VortexDefaultConfig: Required<VortexConfig> = {
  period: 14,
};

/**
 * Vortex Indicator. It provides two oscillators that capture positive and
 * negative trend movement. A bullish signal triggers when the positive
 * trend indicator crosses above the negative trend indicator or a key
 * level. A bearish signal triggers when the negative trend indicator
 * crosses above the positive trend indicator or a key level.
 *
 * +VM = Abs(Current High - Prior Low)
 * -VM = Abs(Current Low - Prior High)
 *
 * +VM14 = 14-Period Sum of +VM
 * -VM14 = 14-Period Sum of -VM
 *
 * TR = Max((High[i]-Low[i]), Abs(High[i]-Closing[i-1]), Abs(Low[i]-Closing[i-1]))
 * TR14 = 14-Period Sum of TR
 *
 * +VI14 = +VM14 / TR14
 * -VI14 = -VM14 / TR14
 *
 * Based on https://school.stockcharts.com/doku.php?id=technical_indicators:vortex_indicator
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return vortex result.
 */
export function vortex(
  highs: number[],
  lows: number[],
  closings: number[],
  config: VortexConfig = {}
): VortexResult {
  checkSameLength(highs, lows, closings);

  const { period } = { ...VortexDefaultConfig, ...config };
  const prevClosings = shiftRightAndFillBy(1, closings[0], closings);
  const prevLows = shiftRightAndFillBy(1, lows[0], lows);
  const prevHighs = shiftRightAndFillBy(1, highs[0], highs);

  const plusVm = abs(subtract(highs, prevLows));
  const minusVm = abs(subtract(lows, prevHighs));

  const plusVmSum = msum(plusVm, { period });
  const minusVmSum = msum(minusVm, { period });

  const tr = max(
    subtract(highs, lows),
    abs(subtract(highs, prevClosings)),
    abs(subtract(lows, prevClosings))
  );

  const trSum = msum(tr, { period });

  const plusRaw = divide(plusVmSum, trSum);
  const minusRaw = divide(minusVmSum, trSum);

  // When the true range sum for a window is 0 (every bar in the window
  // was flat/halted), both oscillators are treated as 0 instead of
  // NaN (0 / 0).
  const plus = plusRaw.map((value, i) => (trSum[i] === 0 ? 0 : value));
  const minus = minusRaw.map((value, i) => (trSum[i] === 0 ? 0 : value));

  return {
    plus,
    minus,
  };
}
