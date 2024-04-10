// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  ParabolicSarConfig,
  ParabolicSarDefaultConfig,
  parabolicSar,
} from '../../indicator/trend/parabolicSar';
import { Trend } from '../../indicator/trend';

/**
 * Parabolic SAR strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function parabolicSarStrategy(
  asset: Asset,
  config: ParabolicSarConfig = {}
): Action[] {
  const strategyConfig = { ...ParabolicSarDefaultConfig, ...config };
  const psar = parabolicSar(
    asset.highs,
    asset.lows,
    asset.closings,
    strategyConfig
  );

  return psar.trends.map((trend) => {
    switch (trend) {
      case Trend.FALLING:
        return Action.SELL;
      case Trend.RISING:
        return Action.BUY;
      case Trend.STABLE:
        return Action.HOLD;
    }
  });
}
