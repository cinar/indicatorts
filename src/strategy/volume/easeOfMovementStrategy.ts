// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  EaseOfMovementConfig,
  EaseOfMovementDefaultConfig,
  easeOfMovement,
} from '../../indicator/volume/easeOfMovement';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * Ease of movement strategy.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function easeOfMovementStrategy(
  asset: Asset,
  config: EaseOfMovementConfig = {}
): Action[] {
  const strategyConfig = { ...EaseOfMovementDefaultConfig, ...config };
  const emv = easeOfMovement(
    asset.highs,
    asset.lows,
    asset.volumes,
    strategyConfig
  );

  return emv.map((value) => {
    if (value > 0) {
      return Action.BUY;
    } else if (value < 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}
