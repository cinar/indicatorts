// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import { sma } from '../../indicator/trend/sma';
import { DEFAULT_VWMA_PERIOD, vwma } from '../../indicator/trend/vwma';

/**
 * The vwmaStrategy function uses SMA and VWMA indicators to provide
 * a BUY action when VWMA is above SMA, and a SELL signal when VWMA
 * is below SMA, a HOLD signal otherwse.
 *
 * @param period period value.
 * @param asset asset object.
 * @returns strategy actions.
 */
export function wvmaStrategy(period: number, asset: Asset): Action[] {
  const smaValues = sma(period, asset.closings);
  const vwmaValues = vwma(period, asset.closings, asset.volumes);

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

/**
 * The defaultVwmaStrategy function calculates VWMA with a period of 20.
 *
 * @param asset asset object.
 * @returns strategy actions.
 */
export function defaultVwmaStrategy(asset: Asset): Action[] {
  return wvmaStrategy(DEFAULT_VWMA_PERIOD, asset);
}
