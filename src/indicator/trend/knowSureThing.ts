// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { changeRatio, maskNaN, windowedSma } from '../../helper/window';

/**
 * KST result object.
 */
export interface KSTResult {
  kst: number[];
  signal: number[];
}

/**
 * Optional configuration of KST parameters.
 */
export interface KSTConfig {
  rocPeriod1?: number;
  rocPeriod2?: number;
  rocPeriod3?: number;
  rocPeriod4?: number;
  smaPeriod1?: number;
  smaPeriod2?: number;
  smaPeriod3?: number;
  smaPeriod4?: number;
  signalPeriod?: number;
}

/**
 * The default configuration of KST.
 */
export const KSTDefaultConfig: Required<KSTConfig> = {
  rocPeriod1: 10,
  rocPeriod2: 15,
  rocPeriod3: 20,
  rocPeriod4: 30,
  smaPeriod1: 10,
  smaPeriod2: 10,
  smaPeriod3: 10,
  smaPeriod4: 15,
  signalPeriod: 9,
};

/**
 * Know Sure Thing (KST). It is a weighted sum of four smoothed rates of
 * change over increasing periods, with a simple moving average of the sum
 * as the signal line. The rates of change are ratios, not percentages.
 *
 * ```
 * ROC(n) = (Close - Close n periods ago) / Close n periods ago
 * RCMA1 = SMA(ROC(rocPeriod1), smaPeriod1)
 * RCMA2 = SMA(ROC(rocPeriod2), smaPeriod2)
 * RCMA3 = SMA(ROC(rocPeriod3), smaPeriod3)
 * RCMA4 = SMA(ROC(rocPeriod4), smaPeriod4)
 * KST = (RCMA1 * 1) + (RCMA2 * 2) + (RCMA3 * 3) + (RCMA4 * 4)
 * Signal = SMA(KST, signalPeriod)
 * ```
 *
 * Warm-up: both outputs are NaN until the signal line has a value, which is
 * the first `max(rocPeriod + smaPeriod - 1) + signalPeriod - 1` bars.
 *
 * @example
 * ```TypeScript
 * import { kst } from 'indicatorts';
 *
 * const { kst: kstLine, signal } = kst(closings);
 *
 * // Alternatively:
 * // const { kst: kstLine, signal } = knowSureThing(closings);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return kst result.
 */
export function kst(closings: number[], config: KSTConfig = {}): KSTResult {
  const settings = { ...KSTDefaultConfig, ...config };
  const rcma = [
    windowedSma(
      changeRatio(closings, settings.rocPeriod1),
      settings.smaPeriod1
    ),
    windowedSma(
      changeRatio(closings, settings.rocPeriod2),
      settings.smaPeriod2
    ),
    windowedSma(
      changeRatio(closings, settings.rocPeriod3),
      settings.smaPeriod3
    ),
    windowedSma(
      changeRatio(closings, settings.rocPeriod4),
      settings.smaPeriod4
    ),
  ];
  const line = closings.map(
    (_, i) => rcma[0][i] + rcma[1][i] * 2 + rcma[2][i] * 3 + rcma[3][i] * 4
  );
  const signal = windowedSma(line, settings.signalPeriod);

  return {
    kst: maskNaN(line, signal),
    signal,
  };
}

// Export full name
export { kst as knowSureThing };
