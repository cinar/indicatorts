// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';

/**
 * Optional configuration of NVI parameters.
 *
 * Note: `period` is not used by nvi() itself — it only affects `start`.
 * `period` is provided so callers can pass this same config object to a
 * downstream smoothing function (e.g. an EMA signal line) alongside nvi(),
 * as demonstrated in examples/volume/negativeVolumeIndexStrategy.ts.
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
 * the change in volume, which only changes on days when volume decreases.
 *
 * If Volume is less than Previous Volume:
 *
 * ```
 *   NVI = Previous NVI + (((Closing - Previous Closing) / Previous Closing) * Previous NVI)
 * ```
 *
 * Otherwise (Volume is greater than or equal to Previous Volume):
 *
 * ```
 *   NVI = Previous NVI
 * ```
 *
 * @title Negative Volume Index (NVI)
 * @example
 * ```TypeScript
 * import { nvi } from 'indicatorts';
 *
 * const defaultConfig = { start: 1000, period: 255 };
 * const result = nvi(closings, volumes, defaultConfig);
 *
 * // Alternatively:
 * // const result = negativeVolumeIndex(closings, volumes, defaultConfig);
 * ```
 * @param closings closing values.
 * @param volumes volume values.
 * @param config configuration.
 * @returns nvi values.
 */
export function nvi(
  closings: number[],
  volumes: number[],
  config: NVIConfig = {}
): number[] {
  checkSameLength(closings, volumes);

  // period is intentionally unused here — see NVIConfig's JSDoc.
  const { start } = { ...NVIDefaultConfig, ...config };
  const result = new Array<number>(closings.length);

  for (let i = 0; i < result.length; i++) {
    if (i === 0) {
      result[i] = start;
    } else if (volumes[i] < volumes[i - 1]) {
      result[i] =
        result[i - 1] +
        ((closings[i] - closings[i - 1]) / closings[i - 1]) * result[i - 1];
    } else {
      result[i] = result[i - 1];
    }
  }

  return result;
}

// Export full name
export { nvi as negativeVolumeIndex };
