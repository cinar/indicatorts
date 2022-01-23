// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { chaikinMoneyFlow } from '../../indicator/volume/chaikinMoneyFlow';
import { Action } from '../action';
import { Asset } from '../asset';

/**
 * The chaikin money flow strategy uses the cmf values that are generated
 * by the Chaikin Money Flow (CMF) indicator function to provide a BUY
 * action when cmf is less than zero, a SELL action when cmf is
 * greather than zero, a HOLD action otherwise.
 *
 * @param asset asset object.
 * @returns strategy actions.
 */
export function chaikinMoneyFlowStrategy(asset: Asset): Action[] {
  const cmf = chaikinMoneyFlow(
    asset.highs,
    asset.lows,
    asset.closings,
    asset.volumes
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
