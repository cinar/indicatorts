// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  AroonConfig,
  AroonDefaultConfig,
  aroon,
} from '../../indicator/trend/aroon';

/**
 * Aroon strategy.
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function aroonStrategy(
  asset: Asset,
  config: AroonConfig = {}
): Action[] {
  const strategyConfig = { ...AroonDefaultConfig, ...config };
  const indicator = aroon(asset.highs, asset.lows, strategyConfig);

  const actions = new Array<Action>(indicator.up.length);

  for (let i = 0; i < actions.length; i++) {
    if (indicator.up[i] > indicator.down[i]) {
      actions[i] = Action.BUY;
    } else if (indicator.down[i] > indicator.up[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
