// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {Asset} from '../asset';
import {Action} from '../action';
import {absolutePriceOscillator, defaultAbsolutePriceOscillator} from '../../indicator/trend/absolutePriceOscillator';

/**
 * Runs the APO strategy based on the indicator.
 *
 * @param {number[]} indicator APO indicator.
 * @return {Action[]} strategy actions.
 */
function runStrategy(indicator: number[]): Action[] {
  const result = new Array<number>(indicator.length);

  for (let i = 0; i < result.length; i++) {
    if (indicator[i] > 0) {
      result[i] = Action.BUY;
    } else if (indicator[i] < 0) {
      result[i] = Action.SELL;
    } else {
      result[i] = Action.HOLD;
    }
  }

  return result;
}

/**
 * Absolute Price Oscillator (APO) strategy function.
 *
 * @param {number} fastPeriod fast period.
 * @param {number} slowPeriod slow period.
 * @param {Asset} asset asset object.
 * @return {Action[]} strategy actions.
 */
export function absolutePriceOscillatorStrategy(
    fastPeriod: number,
    slowPeriod: number,
    asset: Asset,
): Action[] {
  return runStrategy(absolutePriceOscillator(
      fastPeriod,
      slowPeriod,
      asset.closings,
  ));
}

/**
 * Default Absolute Price Oscillator (APO) strategy.
 *
 * @param {Asset} asset asset object.
 * @return {Action[]} strategy actions.
 */
export function defaultAbsolutePriceOscillatorStrategy(asset: Asset): Action[] {
  return runStrategy(defaultAbsolutePriceOscillator(asset.closings));
}
