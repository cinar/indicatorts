// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';

/**
 * Starting value for NVI.
 */
const NVI_STARTING_VALUE = 1000;

/**
 * Default period for NVI.
 */
export const NVI_DEFAULT_PERIOD = 255;

/**
 * The Negative Volume Index (NVI) is a cumulative indicator using
 * the change in volume to decide when the smart money is active.
 *
 * If Volume is greather than Previous Volume:
 *
 *   NVI = Previous NVI
 *
 * Otherwise:
 *
 *   NVI = Previous NVI + (((Closing - Previous Closing) / Previous Closing) * Previous NVI)
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @returns nvi values.
 */
export function negativeVolumeIndex(
  closings: number[],
  volumes: number[]
): number[] {
  checkSameLength(closings, volumes);

  const nvi = new Array<number>(closings.length);

  for (let i = 0; i < nvi.length; i++) {
    if (i === 0) {
      nvi[i] = NVI_STARTING_VALUE;
    } else if (volumes[i - 1] < volumes[i]) {
      nvi[i] = nvi[i - 1];
    } else {
      nvi[i] =
        nvi[i - 1] +
        ((closings[i] - closings[i - 1]) / closings[i - 1]) * nvi[i - 1];
    }
  }

  return nvi;
}
