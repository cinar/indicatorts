// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { Trend } from '../types';

/**
 * Parabolic SAR result object.
 */
export interface PSARResult {
  trends: Trend[];
  psarResult: number[];
}

/**
 * Optional configuration of parabolic SAR parameters.
 */
export interface PSARConfig {
  step?: number;
  max?: number;
}

/**
 * The default configuration of parabolic SAR.
 */
export const PSARDefaultConfig: Required<PSARConfig> = {
  step: 0.02,
  max: 0.2,
};

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
 * @param config configuration.
 * @return psar result.
 */
export function psar(
  highs: number[],
  lows: number[],
  closings: number[],
  config: PSARConfig = {}
): PSARResult {
  checkSameLength(highs, lows, closings);

  const { step, max } = {
    ...PSARDefaultConfig,
    ...config,
  };
  const trends = new Array<Trend>(highs.length);
  const psarResult = new Array<number>(highs.length);

  trends[0] = Trend.FALLING;
  psarResult[0] = highs[0];

  let af = step;
  let ep = lows[0];

  for (let i = 1; i < psarResult.length; i++) {
    psarResult[i] = psarResult[i - 1] - (psarResult[i - 1] - ep) * af;

    if (trends[i - 1] === Trend.FALLING) {
      psarResult[i] = Math.max(psarResult[i], highs[i - 1]);
      if (i > 1) {
        psarResult[i] = Math.max(psarResult[i], highs[i - 2]);
      }

      if (highs[i] >= psarResult[i]) {
        psarResult[i] = ep;
      }
    } else {
      psarResult[i] = Math.min(psarResult[i], lows[i - 1]);
      if (i > 1) {
        psarResult[i] = Math.min(psarResult[i], lows[i - 2]);
      }

      if (lows[i] <= psarResult[i]) {
        psarResult[i] = ep;
      }
    }

    const prevEp = ep;

    if (psarResult[i] > closings[i]) {
      trends[i] = Trend.FALLING;
      ep = Math.min(ep, lows[i]);
    } else {
      trends[i] = Trend.RISING;
      ep = Math.max(ep, highs[i]);
    }

    if (trends[i] !== trends[i - 1]) {
      af = step;
    } else if (prevEp !== ep && af < max) {
      af += step;
    }
  }

  return {
    trends,
    psarResult,
  };
}

// Export full name
export { psar as parabolicSAR };
