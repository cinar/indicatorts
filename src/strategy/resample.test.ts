// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv, toAsset } from '../testing/csv';
import { Asset } from './asset';
import { alignResampled, resample } from './resample';

/**
 * Builds an asset from the given UTC times, using the index as every price
 * and as the volume.
 *
 * @param times UTC times as ISO strings.
 * @return asset object.
 */
function assetAt(times: string[]): Asset {
  const values = times.map((_time, index) => index + 1);
  return {
    dates: times.map((time) => new Date(time)),
    openings: values,
    highs: values,
    lows: values,
    closings: values,
    volumes: values,
  };
}

/**
 * Returns the ISO strings of the given dates.
 *
 * @param dates date objects.
 * @return ISO strings.
 */
function isoStrings(dates: Date[]): string[] {
  return dates.map((date) => date.toISOString());
}

// Expected values in testdata/resample*.csv were generated with pandas 3.1.1
// (DataFrame.resample with 'W-MON' and 'MS', label and closed 'left', and
// first/max/min/last/sum aggregation), and are small enough to check by hand.
describe('Resample', () => {
  const data = readCsv(join(__dirname, 'testdata/resample.csv'));
  const daily = toAsset(data);

  /**
   * Asserts that the given asset matches the expected CSV file.
   *
   * @param actual actual asset.
   * @param fileName expected CSV file name.
   */
  function assertAsset(actual: Asset, fileName: string): void {
    const expected = readCsv(join(__dirname, 'testdata', fileName));
    assertColumn(
      actual.dates.map((date) => date.getTime()),
      expected.date
    );
    assertColumn(actual.openings, expected.open);
    assertColumn(actual.highs, expected.high);
    assertColumn(actual.lows, expected.low);
    assertColumn(actual.closings, expected.close);
    assertColumn(actual.volumes, expected.volume);
  }

  it('should match the reference data', () => {
    assertAsset(resample(daily, { unit: 'week' }), 'resample.weekly.csv');
    assertAsset(resample(daily, { unit: 'month' }), 'resample.monthly.csv');
  });

  it('should match the reference aligned data', () => {
    const weekly = resample(daily, { unit: 'week' });
    assertColumn(
      alignResampled(daily.dates, weekly.closings, { unit: 'week' }),
      data.weeklyClose
    );

    const monthly = resample(daily, { unit: 'month' });
    assertColumn(
      alignResampled(daily.dates, monthly.closings, { unit: 'month' }),
      data.monthlyClose
    );
  });

  it('should return an empty asset for empty input', () => {
    const actual = resample(assetAt([]), { unit: 'day' });
    expect(actual.dates).toStrictEqual([]);
    expect(actual.volumes).toStrictEqual([]);
    expect(alignResampled([], [], { unit: 'day' })).toStrictEqual([]);
  });

  it('should resample a single bar', () => {
    const actual = resample(assetAt(['2026-03-25T10:30:00Z']), {
      unit: 'hour',
    });
    expect(isoStrings(actual.dates)).toStrictEqual([
      '2026-03-25T10:00:00.000Z',
    ]);
    expect(actual.closings).toStrictEqual([1]);
  });

  it('should aggregate minutes into multi-hour buckets', () => {
    const asset: Asset = {
      ...assetAt([
        '2026-03-25T00:00:00Z',
        '2026-03-25T03:59:00Z',
        '2026-03-25T04:00:00Z',
        '2026-03-25T09:15:00Z',
      ]),
      openings: [5, 6, 7, 8],
      highs: [10, 20, 30, 40],
      lows: [1, 0, 3, 2],
      closings: [4, 3, 2, 1],
      volumes: [100, 200, 300, 400],
    };

    const actual = resample(asset, { unit: 'hour', size: 4 });
    expect(isoStrings(actual.dates)).toStrictEqual([
      '2026-03-25T00:00:00.000Z',
      '2026-03-25T04:00:00.000Z',
      '2026-03-25T08:00:00.000Z',
    ]);
    expect(actual.openings).toStrictEqual([5, 7, 8]);
    expect(actual.highs).toStrictEqual([20, 30, 40]);
    expect(actual.lows).toStrictEqual([0, 3, 2]);
    expect(actual.closings).toStrictEqual([3, 2, 1]);
    expect(actual.volumes).toStrictEqual([300, 300, 400]);
  });

  it('should aggregate into minute and day buckets', () => {
    const asset = assetAt([
      '2026-03-25T10:00:10Z',
      '2026-03-25T10:04:50Z',
      '2026-03-25T10:05:00Z',
      '2026-03-26T00:00:00Z',
    ]);

    expect(
      isoStrings(resample(asset, { unit: 'minute', size: 5 }).dates)
    ).toStrictEqual([
      '2026-03-25T10:00:00.000Z',
      '2026-03-25T10:05:00.000Z',
      '2026-03-26T00:00:00.000Z',
    ]);
    expect(isoStrings(resample(asset, { unit: 'day' }).dates)).toStrictEqual([
      '2026-03-25T00:00:00.000Z',
      '2026-03-26T00:00:00.000Z',
    ]);
  });

  it('should start multi-week buckets on Mondays', () => {
    // 2026-03-23 and 2026-04-06 are Mondays; 1970-01-05 is the first one.
    const asset = assetAt([
      '2026-03-22T23:59:59Z',
      '2026-03-23T00:00:00Z',
      '2026-04-05T23:59:59Z',
      '2026-04-06T00:00:00Z',
    ]);

    const weekly = resample(asset, { unit: 'week' });
    expect(isoStrings(weekly.dates)).toStrictEqual([
      '2026-03-16T00:00:00.000Z',
      '2026-03-23T00:00:00.000Z',
      '2026-03-30T00:00:00.000Z',
      '2026-04-06T00:00:00.000Z',
    ]);

    const biweekly = resample(asset, { unit: 'week', size: 2 });
    // 2026-03-16 is 2932 weeks after 1970-01-05, so 2-week buckets start on
    // 2026-03-16 and 2026-03-30.
    expect(isoStrings(biweekly.dates)).toStrictEqual([
      '2026-03-16T00:00:00.000Z',
      '2026-03-30T00:00:00.000Z',
    ]);
    expect(biweekly.volumes).toStrictEqual([3, 7]);
  });

  it('should handle month boundaries and multi-month buckets', () => {
    const asset = assetAt([
      '2024-01-31T23:59:59Z',
      '2024-02-29T12:00:00Z',
      '2024-03-01T00:00:00Z',
      '2024-04-01T00:00:00Z',
      '2024-12-31T00:00:00Z',
      '2025-01-01T00:00:00Z',
    ]);

    expect(isoStrings(resample(asset, { unit: 'month' }).dates)).toStrictEqual([
      '2024-01-01T00:00:00.000Z',
      '2024-02-01T00:00:00.000Z',
      '2024-03-01T00:00:00.000Z',
      '2024-04-01T00:00:00.000Z',
      '2024-12-01T00:00:00.000Z',
      '2025-01-01T00:00:00.000Z',
    ]);

    const quarterly = resample(asset, { unit: 'month', size: 3 });
    expect(isoStrings(quarterly.dates)).toStrictEqual([
      '2024-01-01T00:00:00.000Z',
      '2024-04-01T00:00:00.000Z',
      '2024-10-01T00:00:00.000Z',
      '2025-01-01T00:00:00.000Z',
    ]);
    expect(quarterly.volumes).toStrictEqual([6, 4, 5, 6]);
  });

  it('should handle dates before 1970', () => {
    const asset = assetAt(['1969-12-31T23:00:00Z', '1969-12-29T00:00:00Z']);
    asset.dates.reverse();

    expect(isoStrings(resample(asset, { unit: 'week' }).dates)).toStrictEqual([
      '1969-12-29T00:00:00.000Z',
    ]);
    expect(isoStrings(resample(asset, { unit: 'day' }).dates)).toStrictEqual([
      '1969-12-29T00:00:00.000Z',
      '1969-12-31T00:00:00.000Z',
    ]);
  });

  it('should skip empty buckets', () => {
    const actual = resample(
      assetAt(['2026-03-25T00:00:00Z', '2026-03-28T00:00:00Z']),
      { unit: 'day' }
    );
    expect(actual.dates.length).toBe(2);
  });

  it('should keep equal dates in the same bucket', () => {
    const actual = resample(
      assetAt(['2026-03-25T00:00:00Z', '2026-03-25T00:00:00Z']),
      { unit: 'day' }
    );
    expect(actual.volumes).toStrictEqual([3]);
  });

  it('should drop the last bucket', () => {
    const weekly = resample(daily, { unit: 'week', dropLast: true });
    expect(weekly.closings).toStrictEqual([9, 12, 16]);

    const aligned = alignResampled(daily.dates, weekly.closings, {
      unit: 'week',
      dropLast: true,
    });
    expect(aligned.slice(-3)).toStrictEqual([12, 16, 16]);
  });

  it('should reject unsorted dates', () => {
    const asset = assetAt(['2026-03-26T00:00:00Z', '2026-03-25T00:00:00Z']);
    expect(() => resample(asset, { unit: 'day' })).toThrow(
      'date 1 is earlier than date 0'
    );
    expect(() => alignResampled(asset.dates, [1], { unit: 'day' })).toThrow(
      'date 1 is earlier than date 0'
    );
  });

  it('should reject invalid dates', () => {
    const asset = assetAt(['2026-03-25T00:00:00Z', 'not a date']);
    expect(() => resample(asset, { unit: 'day' })).toThrow('date 1 is invalid');
  });

  it('should reject an invalid size', () => {
    const asset = assetAt(['2026-03-25T00:00:00Z']);
    for (const size of [0, -1, 1.5, NaN]) {
      expect(() => resample(asset, { unit: 'day', size })).toThrow(
        'size must be a positive integer'
      );
    }
  });

  it('should reject mismatched lengths', () => {
    const asset = assetAt(['2026-03-25T00:00:00Z', '2026-03-26T00:00:00Z']);
    for (const key of [
      'openings',
      'highs',
      'lows',
      'closings',
      'volumes',
    ] as const) {
      expect(() => resample({ ...asset, [key]: [1] }, { unit: 'day' })).toThrow(
        'asset values are not the same length as the dates'
      );
    }

    expect(() => alignResampled(asset.dates, [1], { unit: 'day' })).toThrow(
      'expected 2 values, one per bucket, got 1'
    );
  });
});
