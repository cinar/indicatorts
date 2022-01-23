// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { CompanyResult } from './companyResult';
import { StrategyInfo } from './strategyInfo';
import { StrategyResult } from './strategyResult';

/**
 * Strategy stats.
 */
export interface StrategyStats {
  strategyInfo: StrategyInfo;
  score: number;
  minGain: number;
  maxGain: number;
  averageGain: number;
}

/**
 * New strategy stats from strategy result.
 *
 * @param result strategy result.
 * @return strategy stats.
 */
function newStrategyStats(result: StrategyResult): StrategyStats {
  return {
    strategyInfo: result.info,
    score: 1,
    minGain: result.gain,
    maxGain: result.gain,
    averageGain: result.gain,
  };
}

/**
 * Updates strategy stats using strategy result.
 *
 * @param stats strategy stats.
 * @param result strategy result.
 */
function updateStrategyStats(stats: StrategyStats, result: StrategyResult) {
  stats.score++;
  stats.minGain = Math.min(stats.minGain, result.gain);
  stats.maxGain = Math.max(stats.maxGain, result.gain);
  stats.averageGain = (stats.averageGain + result.gain) / 2;
}

/**
 * Computes the strategy stats.
 *
 * @param companyResults company results.
 * @return stats array.
 */
export function computeStrategyStats(
  companyResults: CompanyResult[]
): StrategyStats[] {
  const statsMap = new Map<string, StrategyStats>();

  for (const companyResult of companyResults) {
    const strategyResult = companyResult.strategyResults[0];

    const strategyStats = statsMap.get(strategyResult.info.name);
    if (strategyStats !== undefined) {
      updateStrategyStats(strategyStats, strategyResult);
    } else {
      statsMap.set(strategyResult.info.name, newStrategyStats(strategyResult));
    }
  }

  const statsArray = Array.from(statsMap.values());
  statsArray.sort((a, b) => b.score - a.score);

  return statsArray;
}

/**
 * Strategy stats sort by.
 */
export enum StrategyStatsSortBy {
  STRATEGY,
  SCORE,
  MIN,
  MAX,
  AVERAGE,
}

/**
 * Sorts the strategy stats.
 *
 * @param strategyStats strategy stats.
 * @param sortBy sort by.
 * @param ascending ascending toggle.
 * @return sorted stats.
 */
export function sortStrategyStats(
  strategyStats: StrategyStats[],
  sortBy: StrategyStatsSortBy,
  ascending: boolean
): StrategyStats[] {
  let sorted: StrategyStats[] = [];

  switch (sortBy) {
    case StrategyStatsSortBy.STRATEGY:
      sorted = strategyStats.sort((a, b) =>
        a.strategyInfo.name.localeCompare(b.strategyInfo.name)
      );
      break;

    case StrategyStatsSortBy.SCORE:
      sorted = strategyStats.sort((a, b) => a.score - b.score);
      break;

    case StrategyStatsSortBy.MIN:
      sorted = strategyStats.sort((a, b) => a.minGain - b.minGain);
      break;

    case StrategyStatsSortBy.MAX:
      sorted = strategyStats.sort((a, b) => a.maxGain - b.maxGain);
      break;

    case StrategyStatsSortBy.AVERAGE:
      sorted = strategyStats.sort((a, b) => a.averageGain - b.averageGain);
      break;
  }

  if (!ascending) {
    sorted = sorted.reverse();
  }

  return sorted;
}
