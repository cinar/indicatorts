// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  computeStrategyStats,
  sortStrategyStats,
  StrategyStats,
  StrategyStatsSortBy,
} from './strategyStats';
import { CompanyResult } from './companyResult';
import { StrategyInfo } from './strategyInfo';
import { Action } from '../strategy/action';

describe('computeStrategyStats', () => {
  it('should compute the true running arithmetic mean for averageGain', () => {
    const strategyInfo: StrategyInfo = {
      name: 'Test Strategy',
      strategy: () => [],
    };

    const gains = [10, 20, 30];

    const companyResults: CompanyResult[] = gains.map((gain, index) => ({
      companyInfo: {
        symbol: `SYM${index}`,
        name: `Company ${index}`,
        sector: 'Technology',
        subIndustry: 'Software',
      },
      strategyResults: [
        {
          info: strategyInfo,
          gain,
          lastAction: Action.HOLD,
        },
      ],
    }));

    const stats = computeStrategyStats(companyResults);

    expect(stats.length).toBe(1);
    expect(stats[0].score).toBe(3);
    expect(stats[0].minGain).toBe(10);
    expect(stats[0].maxGain).toBe(30);
    expect(stats[0].averageGain).toBe(20);
  });
});

describe('sortStrategyStats', () => {
  it('should not mutate the original strategyStats array', () => {
    const makeStrategyInfo = (name: string): StrategyInfo => ({
      name,
      strategy: () => [],
    });

    const strategyStats: StrategyStats[] = ['C', 'A', 'B'].map((name) => ({
      strategyInfo: makeStrategyInfo(name),
      score: 1,
      minGain: 0,
      maxGain: 0,
      averageGain: 0,
    }));

    const original = strategyStats.slice();

    const sorted = sortStrategyStats(
      strategyStats,
      StrategyStatsSortBy.STRATEGY,
      true
    );

    // The original array reference passed in must be unchanged.
    expect(strategyStats.map((s) => s.strategyInfo.name)).toEqual(
      original.map((s) => s.strategyInfo.name)
    );

    // The returned array reflects the requested sort order.
    expect(sorted.map((s) => s.strategyInfo.name)).toEqual(['A', 'B', 'C']);
  });
});
