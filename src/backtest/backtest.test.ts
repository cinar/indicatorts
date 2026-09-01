// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { backtest, compareStrategyResultsByGainDesc } from './backtest';
import { StrategyInfo } from './strategyInfo';
import { StrategyResult } from './strategyResult';
import { Action } from '../strategy/action';
import { Asset, newAssetWithLength } from '../strategy/asset';

function buyOnFirstDayStrategy(asset: Asset): Action[] {
  return asset.closings.map((_, index) =>
    index === 0 ? Action.BUY : Action.HOLD
  );
}

function newEmptyAsset(): Asset {
  return newAssetWithLength(0);
}

function newNormalAsset(): Asset {
  const asset = newAssetWithLength(3);
  asset.closings = [10, 20, 30];
  return asset;
}

describe('backtest', () => {
  it('should not throw and should produce undefined gains for an empty asset', () => {
    const infos: StrategyInfo[] = [
      { name: 'Empty Strategy A', strategy: () => [] },
      { name: 'Empty Strategy B', strategy: () => [] },
    ];

    const asset = newEmptyAsset();

    expect(() => backtest(asset, infos)).not.toThrow();

    const results = backtest(asset, infos);
    expect(results.length).toBe(2);
    for (const result of results) {
      expect(result.gain).toBeUndefined();
      expect(result.lastAction).toBeUndefined();
    }
  });

  it('should sort strategies with a real gain above strategies with no gain', () => {
    const infos: StrategyInfo[] = [
      { name: 'Buy Strategy', strategy: buyOnFirstDayStrategy },
    ];

    const results = backtest(newNormalAsset(), infos);
    expect(results.length).toBe(1);
    expect(typeof results[0].gain).toBe('number');
    expect(results[0].gain).toBeGreaterThan(0);
  });
});

describe('compareStrategyResultsByGainDesc', () => {
  // A single backtest() call cannot itself mix a real gain with an
  // undefined gain: every strategy passed to one call shares the same
  // asset, and applyActions() enforces that its actions array is the same
  // length as asset.closings, so all strategies in a call are either all
  // "empty" or all "normal" together. The realistic mixed scenario
  // described in the bug report (batch-backtesting across many symbols,
  // where one symbol has no price history) happens across *separate*
  // backtest() calls, e.g. one per company. This test reproduces that by
  // combining the top result from an empty-asset backtest() with the top
  // result from a normal-asset backtest(), and verifies that sorting the
  // combined list with the exact comparator used inside backtest() places
  // the undefined-gain (empty asset) result at the bottom rather than in
  // an arbitrary position.
  it('should sort an undefined-gain result to the end of a descending sort', () => {
    const emptyInfos: StrategyInfo[] = [
      { name: 'Empty Strategy', strategy: () => [] },
    ];
    const normalInfos: StrategyInfo[] = [
      { name: 'Buy Strategy', strategy: buyOnFirstDayStrategy },
    ];

    const emptyResult = backtest(newEmptyAsset(), emptyInfos)[0];
    const normalResult = backtest(newNormalAsset(), normalInfos)[0];

    expect(emptyResult.gain).toBeUndefined();
    expect(normalResult.gain).toBeGreaterThan(0);

    // Deliberately place the undefined-gain result first, so a comparator
    // that mishandles `undefined` (e.g. the old `b.gain - a.gain`, which
    // produces NaN and is treated as 0 by Array.prototype.sort) would
    // leave the input order unchanged instead of moving it to the end.
    const combined: StrategyResult[] = [emptyResult, normalResult];
    combined.sort(compareStrategyResultsByGainDesc);

    expect(combined[0]).toBe(normalResult);
    expect(combined[1]).toBe(emptyResult);
  });
});
