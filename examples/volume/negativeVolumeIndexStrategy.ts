// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { ema } from '../../src/indicator/trend/exponentialMovingAverage';
import {
  NVIConfig,
  NVIDefaultConfig,
  nvi,
} from '../../src/indicator/volume/negativeVolumeIndex';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';

/**
 * Demonstrates how to compose the Negative Volume Index (NVI) and its EMA baseline
 * into an illustrative volume trend signal.
 *
 * Generates a BUY action when NVI < EMA (illustrative trend entry), a SELL action when
 * NVI > EMA, and HOLD otherwise.
 * Provided strictly as an illustrative example for educational and research purposes.
 *
 * @param asset asset object.
 * @param config configuration.
 * @returns strategy actions.
 */
export function nviStrategy(asset: Asset, config: NVIConfig = {}): Action[] {
  const strategyConfig = { ...NVIDefaultConfig, ...config };
  const result = nvi(asset.closings, asset.volumes, strategyConfig);

  // Reuses NVIConfig's period (unused by nvi() itself) for the EMA signal line.
  const nviEma = ema(result, { period: strategyConfig.period });

  const actions = new Array<Action>(result.length);

  for (let i = 0; i < actions.length; i++) {
    if (result[i] < nviEma[i]) {
      actions[i] = Action.BUY;
    } else if (result[i] > nviEma[i]) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}

// Export full name
export { nviStrategy as negativeVolumeIndexStrategy };
