// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { StrategyResult } from './strategyResult';
import { CompanyInfo } from '../company/companyInfo';

/**
 * Company result.
 */
export interface CompanyResult {
  companyInfo: CompanyInfo;
  strategyResults: StrategyResult[];
}

/**
 * Company result sort by.
 */
export enum CompanyResultSortBy {
  SYMBOL,
  NAME,
  STRATEGY,
  GAIN,
  ACTION,
}

/**
 * Sorts the company results.
 *
 * @param companyResults company results.
 * @param sortBy sort by.
 * @param ascending toggle.
 * @return sorted results.
 */
export function sortCompanyResults(
  companyResults: CompanyResult[],
  sortBy: CompanyResultSortBy,
  ascending: boolean
): CompanyResult[] {
  let sorted: CompanyResult[] = [];

  switch (sortBy) {
    case CompanyResultSortBy.SYMBOL:
      sorted = companyResults.sort((a, b) => {
        return a.companyInfo.symbol.localeCompare(b.companyInfo.symbol);
      });
      break;

    case CompanyResultSortBy.NAME:
      sorted = companyResults.sort((a, b) => {
        return a.companyInfo.name.localeCompare(b.companyInfo.name);
      });
      break;

    case CompanyResultSortBy.STRATEGY:
      sorted = companyResults.sort((a, b) => {
        return (a.strategyResults[0]?.info.name ?? '').localeCompare(
          b.strategyResults[0]?.info.name ?? ''
        );
      });
      break;

    case CompanyResultSortBy.GAIN:
      sorted = companyResults.sort((a, b) => {
        return (
          (a.strategyResults[0]?.gain ?? 0) - (b.strategyResults[0]?.gain ?? 0)
        );
      });
      break;

    case CompanyResultSortBy.ACTION:
      sorted = companyResults.sort((a, b) => {
        return (
          (a.strategyResults[0]?.lastAction ?? 0) -
          (b.strategyResults[0]?.lastAction ?? 0)
        );
      });
      break;

    default:
      break;
  }

  if (!ascending) {
    sorted = sorted.reverse();
  }

  return sorted;
}
