// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Asset } from '../asset';
import { Action } from '../action';
import {
  AbsolutePriceOscillatorConfig,
  AbsolutePriceOscillatorDefaultConfig,
  absolutePriceOscillator,
} from '../../indicator/trend/absolutePriceOscillator';

/**
 * Absolute Price Oscillator (APO) strategy function.
 *
 * @param asset asset object.
 * @param config configuration.
 * @return strategy actions.
 */
export function absolutePriceOscillatorStrategy(
  asset: Asset,
  config: AbsolutePriceOscillatorConfig = {}
): Action[] {
  const { fast, slow } = {
    ...AbsolutePriceOscillatorDefaultConfig,
    ...config,
  };
  const indicator = absolutePriceOscillator(asset.closings, { fast, slow });
  const actions = new Array<Action>(indicator.length);

  for (let i = 0; i < actions.length; i++) {
    if (indicator[i] > 0) {
      actions[i] = Action.BUY;
    } else if (indicator[i] < 0) {
      actions[i] = Action.SELL;
    } else {
      actions[i] = Action.HOLD;
    }
  }

  return actions;
}
