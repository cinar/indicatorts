// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {checkSameLength} from '../../helper/numArray';

/**
 * On-Balance Volume (OBV). It is a technical trading momentum indicator that
 * uses volume flow to predict changes in stock price.
 *
 *                   volume, if Closing > Closing-Prev
 * OBV = OBV-Prev +       0, if Closing = Closing-Prev
 *                  -volume, if Closing < Closing-Prev
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @return obv values.
 */
export function onBalanceVolume(
    closings: number[],
    volumes: number[],
): number[] {
  checkSameLength(closings, volumes);

  const result = new Array<number>(closings.length);

  for (let i = 1; i < result.length; i++) {
    if (i == 0) {
      result[i] = 0;
    } else {
      result[i] = result[i-1];

      if (closings[i] > closings[i-1]) {
        result[i] += volumes[i];
      } else if (closings[i] < closings[i-1]) {
        result[i] -= volumes[i];
      }
    }
  }

  return result;
}
