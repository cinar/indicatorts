// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Indicator trend.
 */
export enum Trend {
  FALLING = -1,
  STABLE = 0,
  RISING = 1,
}

/**
 * How a recursively smoothed indicator, such as an exponential moving
 * average, starts. See
 * [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * - `first`: start from the first value, so every index has a value. This
 *   is the default.
 * - `sma`: start from the simple moving average of the first `period`
 *   values and leave the earlier results NaN, as TA-Lib does.
 */
export type Seed = 'first' | 'sma';
