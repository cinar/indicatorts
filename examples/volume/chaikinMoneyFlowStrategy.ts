// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  CMFConfig,
  CMFDefaultConfig,
  cmf,
} from '../../src/indicator/volume/chaikinMoneyFlow';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';

/**
 * Demonstrates how to compose Chaikin Money Flow (CMF) into an illustrative
 * volume flow signal.
 *
 * Generates a BUY action when CMF < 0, a SELL action when CMF > 0, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function cmfStrategy(asset: Asset, config: CMFConfig = {}): Action[] {
  const strategyConfig = { ...CMFDefaultConfig, ...config };
  const result = cmf(
    asset.highs,
    asset.lows,
    asset.closings,
    asset.volumes,
    strategyConfig
  );

  return result.map((value) => {
    if (value < 0) {
      return Action.BUY;
    } else if (value > 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}

// Export full name
export { cmfStrategy as chaikinMoneyFlowStrategy };
