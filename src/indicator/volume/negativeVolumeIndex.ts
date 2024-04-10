// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';

/**
 * Optional configuration of NVI parameters.
 */
export interface NVIConfig {
  start?: number;
  period?: number;
}

/**
 * The default configuration of NVI.
 */
export const NVIDefaultConfig: Required<NVIConfig> = {
  start: 1000,
  period: 255,
};

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
 * @param volumes volume values.,
 * @param config configuration.
 * @returns nvi values.
 */
export function nvi(
  closings: number[],
  volumes: number[],
  config: NVIConfig = {}
): number[] {
  checkSameLength(closings, volumes);

  const { start } = { ...NVIDefaultConfig, ...config };
  const nvi = new Array<number>(closings.length);

  for (let i = 0; i < nvi.length; i++) {
    if (i === 0) {
      nvi[i] = start;
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

// Export full name
export { nvi as negativeVolumeIndex };
