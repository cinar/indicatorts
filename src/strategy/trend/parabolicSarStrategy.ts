// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  PSARConfig,
  PSARDefaultConfig,
  psar,
} from '../../indicator/trend/parabolicSar';
import { Trend } from '../../indicator/types';

/**
 * Parabolic SAR strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function psarStrategy(asset: Asset, config: PSARConfig = {}): Action[] {
  const strategyConfig = { ...PSARDefaultConfig, ...config };
  const result = psar(asset.highs, asset.lows, asset.closings, strategyConfig);

  return result.trends.map((trend) => {
    switch (trend) {
      case Trend.FALLING:
        return Action.SELL;
      case Trend.RISING:
        return Action.BUY;
      case Trend.STABLE:
        return Action.HOLD;
      default:
        return Action.HOLD;
    }
  });
}

// Export full name
export { psarStrategy as parabolicSARStrategy };
