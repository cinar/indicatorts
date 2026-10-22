// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import * as indicator from '../../src/indicator/trend/movingAverageConvergenceDivergence';
import { Action } from '../../src/strategy/action';
import { newAssetWithLength } from '../../src/strategy/asset';
import {
  macdStrategy,
  movingAverageConvergenceDivergenceStrategy,
} from './macdStrategy';

describe('Moving Average Convergence Divergence (MACD) example strategy', () => {
  afterEach(() => jest.restoreAllMocks());

  it('emits only crossover actions with custom periods', () => {
    const asset = newAssetWithLength(9);
    asset.closings = [10, 20, 30, 40, 30, 20, 10, 20, 30];

    deepStrictEqual(macdStrategy(asset, { fast: 2, slow: 3, signal: 2 }), [
      Action.HOLD,
      Action.BUY,
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
    const asset = newAssetWithLength(4);
    asset.closings = [10, 20, 30, 40];
    const expected = [Action.HOLD, Action.BUY, Action.HOLD, Action.HOLD];

    deepStrictEqual(macdStrategy(asset), expected);
    deepStrictEqual(
      movingAverageConvergenceDivergenceStrategy(asset),
      expected
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
      jest.spyOn(indicator, 'macd').mockReturnValue({
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
    jest.spyOn(indicator, 'macd').mockReturnValue({
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

  it.each([NaN, Infinity, -Infinity])(
    'does not infer a crossover across a non-finite MACD value: %s',
    (value) => {
      jest.spyOn(indicator, 'macd').mockReturnValue({
        macdLine: [-1, value, 1, -1],
        signalLine: [0, 0, 0, 0],
      });

      deepStrictEqual(macdStrategy(newAssetWithLength(4)), [
        Action.HOLD,
        Action.HOLD,
        Action.HOLD,
        Action.SELL,
      ]);
    }
  );

  it.each([NaN, Infinity, -Infinity])(
    'does not infer a crossover across a non-finite signal value: %s',
    (value) => {
      jest.spyOn(indicator, 'macd').mockReturnValue({
        macdLine: [-1, -1, 1, -1],
        signalLine: [0, value, 0, 0],
      });

      deepStrictEqual(macdStrategy(newAssetWithLength(4)), [
        Action.HOLD,
        Action.HOLD,
        Action.HOLD,
        Action.SELL,
      ]);
    }
  );
});
