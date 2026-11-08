// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import {
  macd,
  MACDDefaultConfig,
} from '../../src/indicator/trend/movingAverageConvergenceDivergence';
import { Action } from '../../src/strategy/action';
import { newAssetWithLength } from '../../src/strategy/asset';
import {
  macdStrategy,
  movingAverageConvergenceDivergenceStrategy,
} from './macdStrategy';

jest.mock('../../src/indicator/trend/movingAverageConvergenceDivergence');

describe('Moving Average Convergence Divergence (MACD) example strategy', () => {
  beforeEach(() => {
    jest
      .mocked(macd)
      .mockImplementation(
        jest.requireActual<{ macd: typeof macd }>(
          '../../src/indicator/trend/movingAverageConvergenceDivergence'
        ).macd
      );
  });

  afterEach(() => jest.resetAllMocks());

  it('emits only crossover actions with custom periods', () => {
    const asset = newAssetWithLength(9);
    asset.closings = [10, 20, 30, 40, 30, 20, 10, 20, 30];

    deepStrictEqual(macdStrategy(asset, { fast: 2, slow: 3, signal: 2 }), [
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
      Action.SELL,
      Action.HOLD,
      Action.HOLD,
      Action.BUY,
      Action.HOLD,
    ]);
  });

  it('uses the default periods and preserves the full-name alias', () => {
    const asset = newAssetWithLength(6);
    const calculateMACD = jest.mocked(macd).mockReturnValue({
      macdLine: [-1, -0.5, 0.5, 1, 0, -1],
      signalLine: [0, 0, 0, 0, 0, 0],
    });
    const expected = [
      Action.HOLD,
      Action.HOLD,
      Action.BUY,
      Action.HOLD,
      Action.HOLD,
      Action.SELL,
    ];

    deepStrictEqual(macdStrategy(asset), expected);
    deepStrictEqual(
      movingAverageConvergenceDivergenceStrategy(asset),
      expected
    );
    expect(calculateMACD).toHaveBeenCalledWith(
      asset.closings,
      MACDDefaultConfig
    );
  });

  it('does not treat the initial equal EMA seeds as a crossover', () => {
    const asset = newAssetWithLength(50);
    asset.closings = Array.from({ length: 50 }, (_, i) => 10 + i);

    deepStrictEqual(
      macdStrategy(asset),
      asset.closings.map(() => Action.HOLD)
    );
  });

  it.each([{ closings: [] }, { closings: [10] }])(
    'holds when no previous bar exists: $closings',
    ({ closings }) => {
      const asset = newAssetWithLength(closings.length);
      asset.closings = closings;

      deepStrictEqual(
        macdStrategy(asset),
        closings.map(() => Action.HOLD)
      );
    }
  );

  it.each([{ line: [1, 2, 3] }, { line: [-1, -2, -3] }])(
    'does not signal merely because the line stays on one side: $line',
    ({ line }) => {
      jest.mocked(macd).mockReturnValue({
        macdLine: line,
        signalLine: [0, 0, 0],
      });

      deepStrictEqual(macdStrategy(newAssetWithLength(3)), [
        Action.HOLD,
        Action.HOLD,
        Action.HOLD,
      ]);
    }
  );

  it('holds on equality and signals when the lines move apart', () => {
    jest.mocked(macd).mockReturnValue({
      macdLine: [-1, 0, 1, 1, 0, -1, -1],
      signalLine: [0, 0, 0, 0, 0, 0, 0],
    });

    deepStrictEqual(macdStrategy(newAssetWithLength(7)), [
      Action.HOLD,
      Action.HOLD,
      Action.BUY,
      Action.HOLD,
      Action.HOLD,
      Action.SELL,
      Action.HOLD,
    ]);
  });

  it.each([
    { line: [1, 0, 1], expected: [Action.HOLD, Action.HOLD, Action.HOLD] },
    { line: [-1, 0, -1], expected: [Action.HOLD, Action.HOLD, Action.HOLD] },
    {
      line: [-1, 1, 0, 1],
      expected: [Action.HOLD, Action.BUY, Action.HOLD, Action.HOLD],
    },
    {
      line: [1, -1, 0, -1],
      expected: [Action.HOLD, Action.SELL, Action.HOLD, Action.HOLD],
    },
  ])('does not signal on a same-side touch: $line', ({ line, expected }) => {
    jest.mocked(macd).mockReturnValue({
      macdLine: line,
      signalLine: line.map(() => 0),
    });

    deepStrictEqual(macdStrategy(newAssetWithLength(line.length)), expected);
  });

  it('waits for a strict side after leading equal and non-finite values', () => {
    jest.mocked(macd).mockReturnValue({
      macdLine: [NaN, 0, 0, 1, 0, -1],
      signalLine: [0, 0, 0, 0, 0, 0],
    });

    deepStrictEqual(macdStrategy(newAssetWithLength(6)), [
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
      Action.SELL,
    ]);
  });

  it.each([NaN, Infinity, -Infinity])(
    'preserves the last strict side across a non-finite MACD value: %s',
    (value) => {
      jest.mocked(macd).mockReturnValue({
        macdLine: [-1, value, 1, -1],
        signalLine: [0, 0, 0, 0],
      });

      deepStrictEqual(macdStrategy(newAssetWithLength(4)), [
        Action.HOLD,
        Action.HOLD,
        Action.BUY,
        Action.SELL,
      ]);
    }
  );

  it.each([NaN, Infinity, -Infinity])(
    'preserves the last strict side across a non-finite signal value: %s',
    (value) => {
      jest.mocked(macd).mockReturnValue({
        macdLine: [-1, -1, 1, -1],
        signalLine: [0, value, 0, 0],
      });

      deepStrictEqual(macdStrategy(newAssetWithLength(4)), [
        Action.HOLD,
        Action.HOLD,
        Action.BUY,
        Action.SELL,
      ]);
    }
  );
});
