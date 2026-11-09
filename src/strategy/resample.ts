// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Asset } from './asset';

/**
 * Resample unit. The minute, hour and day units are fixed durations; the
 * week and month units are calendar buckets.
 */
export type ResampleUnit = 'minute' | 'hour' | 'day' | 'week' | 'month';

/**
 * Optional configuration of resample parameters.
 */
export interface ResampleConfig {
  /** Bucket unit. */
  unit: ResampleUnit;
  /** Number of units per bucket, a positive integer. */
  size?: number;
  /** Drops the last bucket, which may cover only part of its interval. */
  dropLast?: boolean;
}

/**
 * The default configuration of resample, used for the fields a configuration
 * leaves out.
 */
export const ResampleDefaultConfig: Required<Omit<ResampleConfig, 'unit'>> = {
  size: 1,
  dropLast: false,
};

/** Milliseconds per fixed-duration unit. */
const UNIT_MILLISECONDS: Record<'minute' | 'hour' | 'day', number> = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
};

/** Milliseconds per week. */
const WEEK_MILLISECONDS = 7 * UNIT_MILLISECONDS.day;

/** Start of the first week, Monday 1970-01-05 00:00 UTC. */
const WEEK_ANCHOR = Date.UTC(1970, 0, 5);

/**
 * Returns the start of the bucket that holds the given time, in milliseconds
 * since the epoch. All boundaries are in UTC.
 *
 * @param time time in milliseconds since the epoch.
 * @param unit bucket unit.
 * @param size number of units per bucket.
 * @return bucket start in milliseconds since the epoch.
 */
function bucketStart(time: number, unit: ResampleUnit, size: number): number {
  if (unit === 'week') {
    const duration = WEEK_MILLISECONDS * size;
    return WEEK_ANCHOR + Math.floor((time - WEEK_ANCHOR) / duration) * duration;
  }

  if (unit === 'month') {
    const date = new Date(time);
    const month = date.getUTCFullYear() * 12 + date.getUTCMonth();
    const startMonth = Math.floor(month / size) * size;
    return Date.UTC(Math.floor(startMonth / 12), startMonth % 12, 1);
  }

  const duration = UNIT_MILLISECONDS[unit] * size;
  return Math.floor(time / duration) * duration;
}

/**
 * Bucket of consecutive rows.
 */
interface Bucket {
  /** Bucket start in milliseconds since the epoch. */
  start: number;
  /** Index of the first row. */
  first: number;
  /** Index of the last row. */
  last: number;
}

/**
 * Groups the rows of the given dates into buckets, leaving out the last
 * bucket when the configuration drops it.
 *
 * @param dates dates in ascending order.
 * @param config configuration.
 * @return buckets in ascending order.
 */
function toBuckets(dates: Date[], config: ResampleConfig): Bucket[] {
  const { unit, size, dropLast } = { ...ResampleDefaultConfig, ...config };

  if (!Number.isInteger(size) || size < 1) {
    throw new Error(`size must be a positive integer, got ${size}`);
  }

  const buckets: Bucket[] = [];
  let previous = -Infinity;

  for (let i = 0; i < dates.length; i++) {
    const time = dates[i].getTime();

    if (Number.isNaN(time)) {
      throw new Error(`date ${i} is invalid`);
    }

    if (time < previous) {
      throw new Error(`date ${i} is earlier than date ${i - 1}`);
    }
    previous = time;

    const start = bucketStart(time, unit, size);
    const current = buckets[buckets.length - 1] as Bucket | undefined;

    if (current?.start === start) {
      current.last = i;
    } else {
      buckets.push({ start, first: i, last: i });
    }
  }

  if (dropLast) {
    buckets.pop();
  }

  return buckets;
}

/**
 * Resample. Aggregates the bars of an asset into a coarser interval, such as
 * 1-minute bars into 1-hour bars, or daily bars into weekly bars.
 *
 * Each bar is assigned to the bucket that holds its date. Minute, hour and
 * day buckets are fixed durations counted from 1970-01-01 00:00 UTC, so a
 * 4-hour bucket starts at 00:00, 04:00, 08:00 and so on (UTC). Week buckets
 * start on Monday 00:00 UTC, and month buckets on the first day of the month
 * at 00:00 UTC; a 3-month bucket starts in January, April, July or October.
 * The date of each output bar is the start of its bucket. Buckets without any
 * bars, such as weekends or holidays, are left out.
 *
 * The last bucket may cover only part of its interval when the data ends
 * inside it. The dropLast option leaves it out.
 *
 * The dates must be in ascending order; an error is thrown otherwise.
 *
 * ```
 * Open = First open of the bucket.
 * High = Max high of the bucket.
 * Low = Min low of the bucket.
 * Close = Last close of the bucket.
 * Volume = Sum of volumes of the bucket.
 * ```
 *
 * @example
 * ```TypeScript
 * const weekly = resample(daily, { unit: 'week' });
 * const hourly = resample(minutes, { unit: 'hour' });
 * const quarterly = resample(daily, { unit: 'month', size: 3 });
 * ```
 *
 * @param asset asset with bars in ascending date order.
 * @param config configuration.
 * @return resampled asset.
 */
export function resample(asset: Asset, config: ResampleConfig): Asset {
  const length = asset.dates.length;

  if (
    asset.openings.length !== length ||
    asset.highs.length !== length ||
    asset.lows.length !== length ||
    asset.closings.length !== length ||
    asset.volumes.length !== length
  ) {
    throw new Error('asset values are not the same length as the dates');
  }

  const result: Asset = {
    dates: [],
    openings: [],
    highs: [],
    lows: [],
    closings: [],
    volumes: [],
  };

  for (const { start, first, last } of toBuckets(asset.dates, config)) {
    let high = asset.highs[first];
    let low = asset.lows[first];
    let volume = 0;

    for (let i = first; i <= last; i++) {
      high = Math.max(high, asset.highs[i]);
      low = Math.min(low, asset.lows[i]);
      volume += asset.volumes[i];
    }

    result.dates.push(new Date(start));
    result.openings.push(asset.openings[first]);
    result.highs.push(high);
    result.lows.push(low);
    result.closings.push(asset.closings[last]);
    result.volumes.push(volume);
  }

  return result;
}

/**
 * Align resampled. Maps values computed on a resampled series, one per
 * bucket, back onto the original dates, so that results at two intervals can
 * be compared row by row.
 *
 * A bucket's value is assigned to the last original row of that bucket, the
 * first row at which all of the bucket's bars are known, and carried forward
 * until the next bucket's last row. Rows before the first bucket's last row
 * are NaN. When the configuration drops the last bucket, its rows carry the
 * previous bucket's value.
 *
 * ```
 * Aligned[i] = Values[k], where k is the latest bucket whose last row is at
 *              or before row i.
 * ```
 *
 * @example
 * ```TypeScript
 * const weekly = resample(daily, { unit: 'week' });
 * const weeklySma = sma(weekly.closings, { period: 4 });
 * const aligned = alignResampled(daily.dates, weeklySma, { unit: 'week' });
 * ```
 *
 * @param dates original dates in ascending order.
 * @param values values, one per bucket of the resampled series.
 * @param config configuration used for resampling.
 * @return aligned values, one per original date.
 */
export function alignResampled(
  dates: Date[],
  values: number[],
  config: ResampleConfig
): number[] {
  const buckets = toBuckets(dates, config);

  if (values.length !== buckets.length) {
    throw new Error(
      `expected ${buckets.length} values, one per bucket, got ${values.length}`
    );
  }

  const result = new Array<number>(dates.length).fill(NaN);

  buckets.forEach(({ last }, k) => {
    const end = k + 1 < buckets.length ? buckets[k + 1].last : dates.length;
    result.fill(values[k], last, end);
  });

  return result;
}
