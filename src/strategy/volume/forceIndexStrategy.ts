// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  FIConfig,
  FIDefaultConfig,
  fi,
} from '../../indicator/volume/forceIndex';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * Force index strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function fiStrategy(asset: Asset, config: FIConfig = {}): Action[] {
  const strategyConfig = { ...FIDefaultConfig, ...config };
  const result = fi(asset.closings, asset.volumes, strategyConfig);

  return result.map((value) => {
    if (value > 0) {
      return Action.BUY;
    } else if (value < 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}

// Export full name
export { fiStrategy as forceIndexStrategy };
