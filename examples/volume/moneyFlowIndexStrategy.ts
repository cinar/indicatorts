// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  MFIConfig,
  MFIDefaultConfig,
  mfi,
} from '../../src/indicator/volume/moneyFlowIndex';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';

/**
 * Demonstrates how to compose the Money Flow Index (MFI) into an illustrative
 * volume-weighted overbought/oversold signal.
 *
 * Generates a SELL action when MFI >= 80 (overbought threshold), and a BUY action
 * when MFI < 80.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function mfiStrategy(asset: Asset, config: MFIConfig = {}): Action[] {
  const strategyConfig = { ...MFIDefaultConfig, ...config };
  const result = mfi(
    asset.highs,
    asset.lows,
    asset.closings,
    asset.volumes,
    strategyConfig
  );

  return result.map((value) => {
    if (value >= 80) {
      return Action.SELL;
    } else {
      return Action.BUY;
    }
  });
}

// Export full name
export { mfiStrategy as moneyFlowIndexStrategy };
