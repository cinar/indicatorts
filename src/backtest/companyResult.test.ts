// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  CompanyResult,
  CompanyResultSortBy,
  sortCompanyResults,
} from './companyResult';
import { Action } from '../strategy/action';
import { StrategyInfo } from './strategyInfo';

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
});
