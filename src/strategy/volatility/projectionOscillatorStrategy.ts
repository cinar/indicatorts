// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  POConfig,
  PODefaultConfig,
  projectionOscillator,
} from '../../indicator/volatility/projectionOscillator';

/**
 * Projection oscillator strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function projectionOscillatorStrategy(
  asset: Asset,
  config: POConfig = {}
): Action[] {
  const strategyConfig = { ...PODefaultConfig, ...config };
  const po = projectionOscillator(
    asset.highs,
    asset.lows,
    asset.closings,
    strategyConfig
  );

  const actions = new Array<Action>(po.po.length);

  for (let i = 0; i < actions.length; i++) {
    if (po.po[i] > po.spo[i]) {
      actions[i] = Action.BUY;
    } else if (po.po[i] < po.spo[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
