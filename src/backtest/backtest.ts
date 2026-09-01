// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { applyActions } from '../strategy/action';
import { Asset } from '../strategy/asset';
import { StrategyInfo } from './strategyInfo';
import { StrategyResult } from './strategyResult';

/**
 * Compares two strategy results by gain in descending order, treating a
 * missing gain as the worst possible value.
 *
 * Note: StrategyResult.gain is typed as `number`, but at runtime it can be
 * `undefined` when an asset has empty price history (e.g. the gains array
 * computed by applyActions() is empty, so its last element is `undefined`).
 * Falling back to `-Infinity` for a missing gain keeps the comparator from
 * ever returning NaN, which Array.prototype.sort treats as 0 and would
 * otherwise leave such entries in an arbitrary position instead of
 * consistently sorting them to the bottom.
 *
 * @param a first strategy result.
 * @param b second strategy result.
 * @return comparison result.
 */
export function compareStrategyResultsByGainDesc(
  a: StrategyResult,
  b: StrategyResult
): number {
  return (
    ((b.gain as number | undefined) ?? -Infinity) -
    ((a.gain as number | undefined) ?? -Infinity)
  );
}

/**
 * Backtests the given strategies.
 *
 * @param asset asset object.
 * @param infos strategy infos.
 * @return strategy results.
 */
export function backtest(
  asset: Asset,
  infos: StrategyInfo[]
): StrategyResult[] {
  const result = new Array<StrategyResult>(infos.length);

  for (let i = 0; i < result.length; i++) {
    const actions = infos[i].strategy(asset);
    const gains = applyActions(asset.closings, actions);

    result[i] = {
      info: infos[i],
      gain: gains[gains.length - 1],
      lastAction: actions[actions.length - 1],
    };
  }

  result.sort(compareStrategyResultsByGainDesc);

  return result;
}
