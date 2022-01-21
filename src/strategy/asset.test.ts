// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from './asset';
import { concatAssets, newAssetWithLength } from './asset';

describe('Asset object', () => {
  it('should be able to provide a new asset with length', () => {
    const length = 4;

    const actual = newAssetWithLength(length);
    expect(actual.dates.length).toBe(length);
    expect(actual.openings.length).toBe(length);
    expect(actual.closings.length).toBe(length);
    expect(actual.highs.length).toBe(length);
    expect(actual.lows.length).toBe(length);
    expect(actual.volumes.length).toBe(length);
  });

  it('should be able to concat assets', () => {
    const asset1: Asset = {
      dates: [new Date(2021, 11, 1), new Date(2021, 11, 2)],
      openings: [1, 2],
      closings: [100, 200],
      highs: [1000, 2000],
      lows: [10, 20],
      volumes: [10000, 20000],
    };

    const asset2: Asset = {
      dates: [new Date(2021, 11, 3), new Date(2021, 11, 4)],
      openings: [3, 4],
      closings: [300, 400],
      highs: [3000, 4000],
      lows: [30, 40],
      volumes: [30000, 40000],
    };

    const expected: Asset = {
      dates: [
        new Date(2021, 11, 1),
        new Date(2021, 11, 2),
        new Date(2021, 11, 3),
        new Date(2021, 11, 4),
      ],
      openings: [1, 2, 3, 4],
      closings: [100, 200, 300, 400],
      highs: [1000, 2000, 3000, 4000],
      lows: [10, 20, 30, 40],
      volumes: [10000, 20000, 30000, 40000],
    };

    const actual = concatAssets(asset1, asset2);
    expect(actual).toStrictEqual(expected);
  });
});
