// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { applyActions } from '../strategy/action';
import { Asset } from '../strategy/asset';
import { StrategyInfo } from './strategyInfo';
import { StrategyResult } from './strategyResult';

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

  result.sort((a, b) => b.gain - a.gain);

  return result;
}
