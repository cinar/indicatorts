// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  FIConfig,
  FIDefaultConfig,
  fi,
} from '../../src/indicator/volume/forceIndex';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';

/**
 * Demonstrates how to compose Force Index (FI) into an illustrative
 * volume-momentum signal.
 *
 * Generates a BUY action when FI > 0, a SELL action when FI < 0, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
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
