// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  MACDConfig,
  MACDDefaultConfig,
  macd,
} from '../../indicator/trend/macd';

/**
 * MACD strategy.
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function macdStrategy(asset: Asset, config: MACDConfig = {}): Action[] {
  const strategyConfig = { ...MACDDefaultConfig, ...config };
  const macdResult = macd(asset.closings, strategyConfig);
  const actions = new Array<number>(macdResult.macdLine.length);

  for (let i = 0; i < actions.length; i++) {
    if (macdResult.macdLine[i] > macdResult.signalLine[i]) {
      actions[i] = Action.BUY;
    } else if (macdResult.macdLine[i] < macdResult.signalLine[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
