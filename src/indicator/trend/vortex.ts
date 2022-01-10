// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {abs, checkSameLength, divide, max, shiftRightBy, substract} from '../../helper/numArray';
import {msum} from './msum';

const VORTEX_PERIOD = 14;

/**
 * Vortex result.
 */
export interface VortexResult {
  plusVi: number[],
  minusVi: number[]
}

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
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {VortexResult} vortex result.
 */
export function vortex(
    highs: number[],
    lows: number[],
    closings: number[],
): VortexResult {
  checkSameLength(highs, lows, closings);

  const prevClosings = shiftRightBy(1, closings);

  const plusVm = abs(substract(highs, shiftRightBy(1, lows)));
  const minusVm = abs(substract(lows, shiftRightBy(1, highs)));

  const plusVmSum = msum(VORTEX_PERIOD, plusVm);
  const minusVmSum = msum(VORTEX_PERIOD, minusVm);

  const tr = max(
      substract(highs, lows),
      abs(substract(highs, prevClosings)),
      abs(substract(lows, prevClosings)),
  );

  const trSum = msum(VORTEX_PERIOD, tr);

  const plusVi = divide(plusVmSum, trSum);
  const minusVi = divide(minusVmSum, trSum);

  return {
    plusVi,
    minusVi,
  };
}
