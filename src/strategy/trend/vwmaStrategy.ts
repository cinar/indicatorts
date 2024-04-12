// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { sma } from '../../indicator/trend/simpleMovingAverage';
import {
  VWMAConfig,
  VWMADefaultConfig,
  vwma,
} from '../../indicator/trend/volumeWeightedMovingAverage';

/**
 * The vwmaStrategy function uses SMA and VWMA indicators to provide
 * a BUY action when VWMA is above SMA, and a SELL signal when VWMA
 * is below SMA, a HOLD signal otherwse.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function vwmaStrategy(asset: Asset, config: VWMAConfig = {}): Action[] {
  const strategyConfig = { ...VWMADefaultConfig, ...config };
  const smaValues = sma(asset.closings, strategyConfig);
  const vwmaValues = vwma(asset.closings, asset.volumes, strategyConfig);

  const result = new Array<Action>(vwmaValues.length);

  for (let i = 0; i < result.length; i++) {
    if (vwmaValues[i] > smaValues[i]) {
      result[i] = Action.BUY;
    } else if (vwmaValues[i] < smaValues[i]) {
      result[i] = Action.SELL;
    } else {
      result[i] = Action.HOLD;
    }
  }

  return result;
}

// Export full name
export { vwmaStrategy as volumeWeightedMovingAverageStrategy };
