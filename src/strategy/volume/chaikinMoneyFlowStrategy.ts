// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  ChaikinMoneyFlowConfig,
  ChaikinMoneyFlowDefaultConfig,
  chaikinMoneyFlow,
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
export function chaikinMoneyFlowStrategy(
  asset: Asset,
  config: ChaikinMoneyFlowConfig = {}
): Action[] {
  const strategyConfig = { ...ChaikinMoneyFlowDefaultConfig, ...config };
  const cmf = chaikinMoneyFlow(
    asset.highs,
    asset.lows,
    asset.closings,
    asset.volumes,
    strategyConfig
  );

  return cmf.map((value) => {
    if (value < 0) {
      return Action.BUY;
    } else if (value > 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}
