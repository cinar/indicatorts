// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  abs,
  checkSameLength,
  divide,
  max,
  shiftRightBy,
  subtract,
} from '../../helper/numArray';
import { msum } from './msum';

/**
 * Vortex result.
 */
export interface VortexResult {
  plusVi: number[];
  minusVi: number[];
}

/**
 * Optional configuration of Vortex parameters.
 */
export interface VortexConfig {
  period?: number;
}

/**
 * The default configuration of Vortex.
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
  const prevClosings = shiftRightBy(1, closings);

  const plusVm = abs(subtract(highs, shiftRightBy(1, lows)));
  const minusVm = abs(subtract(lows, shiftRightBy(1, highs)));

  const plusVmSum = msum(plusVm, { period });
  const minusVmSum = msum(minusVm, { period });

  const tr = max(
    subtract(highs, lows),
    abs(subtract(highs, prevClosings)),
    abs(subtract(lows, prevClosings))
  );

  const trSum = msum(tr, { period });

  const plusVi = divide(plusVmSum, trSum);
  const minusVi = divide(minusVmSum, trSum);

  return {
    plusVi,
    minusVi,
  };
}
