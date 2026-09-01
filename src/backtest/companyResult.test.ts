// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  CompanyResult,
  CompanyResultSortBy,
  sortCompanyResults,
} from './companyResult';
import { StrategyResult } from './strategyResult';
import { Action } from '../strategy/action';

function newCompanyResult(
  symbol: string,
  strategyResults: StrategyResult[]
): CompanyResult {
  return {
    companyInfo: {
      symbol,
      name: `${symbol} Inc.`,
      sector: 'Technology',
      subIndustry: 'Software',
    },
    strategyResults,
  };
}

function newStrategyResult(
  name: string,
  gain: number,
  lastAction: Action
): StrategyResult {
  return {
    info: {
      name,
      strategy: () => [],
    },
    gain,
    lastAction,
  };
}

describe('sortCompanyResults', () => {
  const sortByCases = [
    CompanyResultSortBy.STRATEGY,
    CompanyResultSortBy.GAIN,
    CompanyResultSortBy.ACTION,
  ];

  it.each(sortByCases)(
    'should not throw when a company has an empty strategyResults array (sortBy=%s)',
    (sortBy) => {
      const companyResults: CompanyResult[] = [
        newCompanyResult('AAA', [newStrategyResult('MACD', 0.5, Action.BUY)]),
        newCompanyResult('BBB', []),
        newCompanyResult('CCC', [newStrategyResult('RSI', -0.2, Action.SELL)]),
      ];

      let actual: CompanyResult[] = [];
      expect(() => {
        actual = sortCompanyResults(companyResults, sortBy, true);
      }).not.toThrow();

      expect(actual.length).toBe(companyResults.length);
    }
  );

  it('should sort by gain in ascending order when all strategyResults are populated', () => {
    const companyResults: CompanyResult[] = [
      newCompanyResult('AAA', [newStrategyResult('MACD', 0.5, Action.BUY)]),
      newCompanyResult('BBB', [newStrategyResult('MACD', -0.3, Action.SELL)]),
      newCompanyResult('CCC', [newStrategyResult('MACD', 0.1, Action.HOLD)]),
    ];

    const actual = sortCompanyResults(
      companyResults,
      CompanyResultSortBy.GAIN,
      true
    );

    expect(actual.map((r) => r.companyInfo.symbol)).toStrictEqual([
      'BBB',
      'CCC',
      'AAA',
    ]);
  });
});
