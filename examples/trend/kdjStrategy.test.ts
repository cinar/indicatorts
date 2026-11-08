// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { kdj, KDJDefaultConfig } from '../../src/indicator/trend/randomIndex';
import { Action } from '../../src/strategy/action';
import { Asset, newAssetWithLength } from '../../src/strategy/asset';
import { kdjStrategy } from './kdjStrategy';

jest.mock('../../src/indicator/trend/randomIndex');

function mockKDJ(
  kLine: number[],
  dLine: number[]
): jest.MockedFunction<typeof kdj> {
  return jest
    .mocked(kdj)
    .mockReturnValue({ k: kLine, d: dLine, j: kLine.map(() => 0) });
}

function holdsExcept(
  length: number,
  signals: Record<number, Action>
): Action[] {
  return Array.from({ length }, (_, i) => signals[i] ?? Action.HOLD);
}

describe('Random Index (KDJ) example strategy', () => {
  beforeEach(() => {
    jest
      .mocked(kdj)
      .mockImplementation(
        jest.requireActual<{ kdj: typeof kdj }>(
          '../../src/indicator/trend/randomIndex'
        ).kdj
      );
  });

  afterEach(() => jest.resetAllMocks());

  it('emits only crossover actions on real KDJ output', () => {
    const closings = Array.from(
      { length: 30 },
      (_, i) => 50 + 20 * Math.sin(i / 3)
    );
    const asset: Asset = {
      ...newAssetWithLength(closings.length),
      highs: closings.map((value) => value + 1),
      lows: closings.map((value) => value - 1),
      closings,
    };

    deepStrictEqual(
      kdjStrategy(asset),
      holdsExcept(30, { 6: Action.SELL, 15: Action.BUY, 25: Action.SELL })
    );
  });

  it('passes the default config merged with the given config', () => {
    const asset = newAssetWithLength(2);
    const calculateKDJ = mockKDJ([0, 0], [0, 0]);

    kdjStrategy(asset, { rPeriod: 5 });

    expect(calculateKDJ).toHaveBeenCalledWith(
      asset.highs,
      asset.lows,
      asset.closings,
      { ...KDJDefaultConfig, rPeriod: 5 }
    );
  });

  it.each([{ length: 0 }, { length: 1 }])(
    'holds when no previous bar exists: $length',
    ({ length }) => {
      mockKDJ(
        Array.from({ length }, () => 10),
        Array.from({ length }, () => 5)
      );

      deepStrictEqual(
        kdjStrategy(newAssetWithLength(length)),
        holdsExcept(length, {})
      );
    }
  );

  it.each([
    { kLine: [10, 12, 15], dLine: [5, 5, 5] },
    { kLine: [90, 92, 85], dLine: [95, 95, 95] },
  ])(
    'does not signal merely because %K stays on one side in the zone: $kLine',
    ({ kLine, dLine }) => {
      mockKDJ(kLine, dLine);

      deepStrictEqual(kdjStrategy(newAssetWithLength(3)), holdsExcept(3, {}));
    }
  );

  it('signals a cross only inside the matching zone', () => {
    // Bar 1 crosses up at 15 (BUY). Bars 2-3 cross at 50/60 (outside both
    // zones). Bar 4 crosses up at 85 and bar 5 crosses down at 10 (wrong zone).
    mockKDJ([10, 15, 50, 60, 85, 10], [12, 12, 55, 55, 80, 12]);

    deepStrictEqual(
      kdjStrategy(newAssetWithLength(6)),
      holdsExcept(6, { 1: Action.BUY })
    );
  });

  it('signals a sell on a cross below %D in the overbought zone', () => {
    mockKDJ([90, 85, 50], [88, 87, 55]);

    deepStrictEqual(
      kdjStrategy(newAssetWithLength(3)),
      holdsExcept(3, { 1: Action.SELL })
    );
  });

  it('includes the zone boundaries', () => {
    mockKDJ([19, 20, 81, 80], [21, 19, 79, 81]);

    deepStrictEqual(
      kdjStrategy(newAssetWithLength(4)),
      holdsExcept(4, { 1: Action.BUY, 3: Action.SELL })
    );
  });

  it.each([
    { kLine: [10, 12, 10, 15], dLine: [12, 12, 12, 12], signal: Action.BUY },
    { kLine: [90, 88, 90, 85], dLine: [88, 88, 88, 87], signal: Action.SELL },
  ])(
    'does not signal on a same-side touch: $kLine',
    ({ kLine, dLine, signal }) => {
      mockKDJ(kLine, dLine);

      deepStrictEqual(
        kdjStrategy(newAssetWithLength(4)),
        holdsExcept(4, { 3: signal })
      );
    }
  );

  it('does not treat the initial equal values as a crossover', () => {
    mockKDJ([50, 15, 85], [50, 10, 90]);

    deepStrictEqual(
      kdjStrategy(newAssetWithLength(3)),
      holdsExcept(3, { 2: Action.SELL })
    );
  });

  it.each([NaN, Infinity, -Infinity])(
    'preserves the last strict side across a non-finite value: %s',
    (value) => {
      mockKDJ([10, value, 15, 12], [12, 12, value, 12]);

      deepStrictEqual(
        kdjStrategy(newAssetWithLength(4)),
        holdsExcept(4, { 3: Action.HOLD })
      );
    }
  );

  it('recognizes a cross across a non-finite gap at the next finite bar', () => {
    mockKDJ([10, NaN, 15], [12, 12, 12]);

    deepStrictEqual(
      kdjStrategy(newAssetWithLength(3)),
      holdsExcept(3, { 2: Action.BUY })
    );
  });
});
