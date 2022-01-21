// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { Trend } from '../trend';

const PSAR_AF_STEP = 0.02;
const PSAR_AF_MAX = 0.2;

/**
 * Parabolic SAR result object.
 */
export interface ParabolicSar {
  trends: Trend[];
  psar: number[];
}

/**
 * Parabolic SAR. It is a popular technical indicator for identifying the trend
 * and as a trailing stop.
 *
 * PSAR = PSAR[i - 1] - ((PSAR[i - 1] - EP) * AF)
 *
 * If the trend is Falling:
 *  - PSAR is the maximum of PSAR or the previous two high values.
 *  - If the current high is greather than or equals to PSAR, use EP.
 *
 * If the trend is Rising:
 *  - PSAR is the minimum of PSAR or the previous two low values.
 *  - If the current low is less than or equals to PSAR, use EP.
 *
 * If PSAR is greater than the closing, trend is falling, and the EP
 * is set to the minimum of EP or the low.
 *
 * If PSAR is lower than or equals to the closing, trend is rising, and the EP
 * is set to the maximum of EP or the high.
 *
 * If the trend is the same, and AF is less than 0.20, increment it by 0.02.
 * If the trend is not the same, set AF to 0.02.
 *
 * Based on video https://www.youtube.com/watch?v=MuEpGBAH7pw&t=0s.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return psar result.
 */
export function parabolicSar(
  highs: number[],
  lows: number[],
  closings: number[]
): ParabolicSar {
  checkSameLength(highs, lows, closings);

  const trends = new Array<Trend>(highs.length);
  const psar = new Array<number>(highs.length);

  trends[0] = Trend.FALLING;
  psar[0] = highs[0];

  let af = PSAR_AF_STEP;
  let ep = lows[0];

  for (let i = 1; i < psar.length; i++) {
    psar[i] = psar[i - 1] - (psar[i - 1] - ep) * af;

    if (trends[i - 1] === Trend.FALLING) {
      psar[i] = Math.max(psar[i], highs[i - 1]);
      if (i > 1) {
        psar[i] = Math.max(psar[i], highs[i - 2]);
      }

      if (highs[i] >= psar[i]) {
        psar[i] = ep;
      }
    } else {
      psar[i] = Math.min(psar[i], lows[i - 1]);
      if (i > 1) {
        psar[i] = Math.min(psar[i], lows[i - 2]);
      }

      if (lows[i] <= psar[i]) {
        psar[i] = ep;
      }
    }

    const prevEp = ep;

    if (psar[i] > closings[i]) {
      trends[i] = Trend.FALLING;
      ep = Math.min(ep, lows[i]);
    } else {
      trends[i] = Trend.RISING;
      ep = Math.max(ep, highs[i]);
    }

    if (trends[i] !== trends[i - 1]) {
      af = PSAR_AF_STEP;
    } else if (prevEp !== ep && af < PSAR_AF_MAX) {
      af += PSAR_AF_STEP;
    }
  }

  return {
    trends,
    psar,
  };
}
