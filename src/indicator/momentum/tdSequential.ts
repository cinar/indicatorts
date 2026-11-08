// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * TD Sequential result object.
 */
export interface TDSequentialResult {
  /** Consecutive closes below the close `lookback` bars before. */
  downSetup: number[];
  /** Consecutive closes above the close `lookback` bars before. */
  upSetup: number[];
  /** Countdown after a completed down setup. */
  downCountdown: number[];
  /** Countdown after a completed up setup. */
  upCountdown: number[];
}

/**
 * Optional configuration of TD Sequential parameters.
 */
export interface TDSequentialConfig {
  lookback?: number;
  countdownLookback?: number;
  setupPeriod?: number;
  countdownPeriod?: number;
}

/**
 * The default configuration of TD Sequential.
 */
export const TDSequentialDefaultConfig: Required<TDSequentialConfig> = {
  lookback: 4,
  countdownLookback: 2,
  setupPeriod: 9,
  countdownPeriod: 13,
};

/**
 * TD Sequential. It counts runs of closes in two phases. TD Sequential® is
 * a registered trademark of DeMark Analytics, LLC; this is an independent
 * implementation of the published counting rules for educational and
 * research purposes, not affiliated with or endorsed by DeMark Analytics.
 *
 * ```
 * Setup: count consecutive closes below (down) or above (up) the close
 *        lookback bars before, up to setupPeriod. Any other close resets
 *        that count to 0.
 * Countdown: after a setup reaches setupPeriod, count the closes at or
 *            below (down) or at or above (up) the close countdownLookback
 *            bars before, up to countdownPeriod. A completed setup in the
 *            opposite direction cancels the countdown.
 * ```
 *
 * The bar that completes a countdown reports `countdownPeriod`, and the
 * count restarts after it. The first `lookback` bars have no earlier close
 * to compare with and report 0.
 *
 * @example
 * ```TypeScript
 * import { tdSequential } from 'indicatorts';
 *
 * const { downSetup, upSetup, downCountdown, upCountdown } = tdSequential(closings);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return td sequential result.
 */
export function tdSequential(
  closings: number[],
  config: TDSequentialConfig = {}
): TDSequentialResult {
  const { lookback, countdownLookback, setupPeriod, countdownPeriod } = {
    ...TDSequentialDefaultConfig,
    ...config,
  };

  const result: TDSequentialResult = {
    downSetup: new Array<number>(closings.length).fill(0),
    upSetup: new Array<number>(closings.length).fill(0),
    downCountdown: new Array<number>(closings.length).fill(0),
    upCountdown: new Array<number>(closings.length).fill(0),
  };

  let downSetup = 0;
  let upSetup = 0;
  let downCountdown = 0;
  let upCountdown = 0;
  let inDownCountdown = false;
  let inUpCountdown = false;

  for (let i = lookback; i < closings.length; i++) {
    const closing = closings[i];
    const previous = closings[i - lookback];

    downSetup = closing < previous ? Math.min(downSetup + 1, setupPeriod) : 0;
    upSetup = closing > previous ? Math.min(upSetup + 1, setupPeriod) : 0;

    if (downSetup >= setupPeriod) {
      inDownCountdown = true;
      inUpCountdown = false;
      upCountdown = 0;
    }

    if (upSetup >= setupPeriod) {
      inUpCountdown = true;
      inDownCountdown = false;
      downCountdown = 0;
    }

    const countdownPrevious =
      i >= countdownLookback ? closings[i - countdownLookback] : NaN;

    if (inDownCountdown && closing <= countdownPrevious) {
      downCountdown++;
    }

    if (inUpCountdown && closing >= countdownPrevious) {
      upCountdown++;
    }

    result.downSetup[i] = downSetup;
    result.upSetup[i] = upSetup;
    result.downCountdown[i] = downCountdown;
    result.upCountdown[i] = upCountdown;

    if (downCountdown >= countdownPeriod) {
      downCountdown = 0;
      inDownCountdown = false;
    }

    if (upCountdown >= countdownPeriod) {
      upCountdown = 0;
      inUpCountdown = false;
    }
  }

  return result;
}
