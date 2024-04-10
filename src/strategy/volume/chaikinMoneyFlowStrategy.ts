// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  CMFConfig,
  CMFDefaultConfig,
  cmf,
} from '../../indicator/volume/chaikinMoneyFlow';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * The chaikin money flow strategy uses the cmf values that are generated
 * by the Chaikin Money Flow (CMF) indicator function to provide a BUY
 * action when cmf is less than zero, a SELL action when cmf is
 * greather than zero, a HOLD action otherwise.
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
