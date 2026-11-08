// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import {
  CompanyResult,
  CompanyResultSortBy,
  sortCompanyResults,
} from './companyResult';
import { StrategyResult } from './strategyResult';
import { StrategyInfo } from './strategyInfo';
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
  it('should not mutate the original companyResults array', () => {
    const strategyInfo: StrategyInfo = {
      name: 'Test Strategy',
      strategy: () => [],
    };

    const companyResults: CompanyResult[] = ['C', 'A', 'B'].map((symbol) => ({
      companyInfo: {
        symbol,
        name: `Company ${symbol}`,
        sector: 'Technology',
        subIndustry: 'Software',
      },
      strategyResults: [
        {
          info: strategyInfo,
          gain: 0,
          lastAction: Action.HOLD,
        },
      ],
    }));

    const original = companyResults.slice();

    const sorted = sortCompanyResults(
      companyResults,
      CompanyResultSortBy.SYMBOL,
      true
    );

    // The original array reference passed in must be unchanged.
    expect(companyResults.map((r) => r.companyInfo.symbol)).toEqual(
      original.map((r) => r.companyInfo.symbol)
    );

    // The returned array reflects the requested sort order.
    expect(sorted.map((r) => r.companyInfo.symbol)).toEqual(['A', 'B', 'C']);
  });

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

  it('should sort by symbol, name, strategy and last action', () => {
    const companyResults: CompanyResult[] = [
      newCompanyResult('BBB', [newStrategyResult('RSI', 0.2, Action.SELL)]),
      newCompanyResult('CCC', [newStrategyResult('AO', 0.1, Action.BUY)]),
      newCompanyResult('AAA', [newStrategyResult('MACD', 0.3, Action.HOLD)]),
    ];
    const symbols = (sortBy: CompanyResultSortBy, ascending = true) =>
      sortCompanyResults(companyResults, sortBy, ascending).map(
        (result) => result.companyInfo.symbol
      );

    expect(symbols(CompanyResultSortBy.SYMBOL)).toStrictEqual([
      'AAA',
      'BBB',
      'CCC',
    ]);
    expect(symbols(CompanyResultSortBy.NAME, false)).toStrictEqual([
      'CCC',
      'BBB',
      'AAA',
    ]);
    expect(symbols(CompanyResultSortBy.STRATEGY)).toStrictEqual([
      'CCC',
      'AAA',
      'BBB',
    ]);
    expect(symbols(CompanyResultSortBy.ACTION)).toStrictEqual([
      'BBB',
      'AAA',
      'CCC',
    ]);
  });

  it('should return no results for an unknown sort order', () => {
    const companyResults = [
      newCompanyResult('AAA', [newStrategyResult('MACD', 0.3, Action.HOLD)]),
    ];
    expect(
      sortCompanyResults(companyResults, -1 as CompanyResultSortBy, true)
    ).toStrictEqual([]);
  });

  it('should sort companies without strategy results first by strategy', () => {
    const companyResults: CompanyResult[] = [
      newCompanyResult('BBB', [newStrategyResult('RSI', 0.2, Action.SELL)]),
      newCompanyResult('AAA', []),
      newCompanyResult('CCC', [newStrategyResult('AO', 0.1, Action.BUY)]),
      newCompanyResult('DDD', []),
    ];

    const sorted = sortCompanyResults(
      companyResults,
      CompanyResultSortBy.STRATEGY,
      true
    ).map((result) => result.companyInfo.symbol);

    expect(sorted).toStrictEqual(['AAA', 'DDD', 'CCC', 'BBB']);
  });
});
