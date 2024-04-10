// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  AOConfig,
  AODefaultConfig,
  awesomeOscillator,
} from '../../indicator/momentum/awesomeOscillator';

/**
 * Awesome oscillator strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function awesomeOscillatorStrategy(
  asset: Asset,
  config: AOConfig = {}
): Action[] {
  const strategyConfig = { ...AODefaultConfig, ...config };
  const os = awesomeOscillator(asset.highs, asset.lows, strategyConfig);
  return os.map((value) => {
    if (value > 0) {
      return Action.BUY;
    } else if (value < 0) {
      return Action.SELL;
    } else {
      return Action.HOLD;
    }
  });
}
