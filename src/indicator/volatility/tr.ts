// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  abs,
  checkSameLength,
  max,
  shiftRightAndFillBy,
  subtract,
} from '../../helper/numArray';

/**
 * True Range (TR).
 *
 * TR = Max((High - Low), Abs(High - Closing[-1]), Abs(Low - Closing[-1]))
 *
 * @param period window period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return tr values.
 */
export function tr(
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  checkSameLength(highs, lows, closings);

  const previous = shiftRightAndFillBy(1, closings[0], closings);

  const result = max(
    subtract(highs, lows),
    abs(subtract(highs, previous)),
    abs(subtract(lows, previous))
  );

  return result;
}

// Export full name
export { tr as trueRange };
