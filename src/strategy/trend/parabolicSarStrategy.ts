// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {Asset} from '../asset';
import {Action} from '../action';
import {parabolicSar} from '../../indicator/trend/parabolicSar';
import {Trend} from '../../indicator/trend';

/**
 * Parabolic SAR strategy function.
 *
 * @param {Asset} asset asset object.
 * @return {Action[]} strategy actions.
 */
export function parabolicSarStrategy(asset: Asset): Action[] {
  const psar = parabolicSar(
      asset.highs,
      asset.lows,
      asset.closings,
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
