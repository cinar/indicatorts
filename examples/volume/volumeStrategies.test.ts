// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { ema } from '../../src/indicator/trend/exponentialMovingAverage';
import { cmf } from '../../src/indicator/volume/chaikinMoneyFlow';
import { emv } from '../../src/indicator/volume/easeOfMovement';
import { fi } from '../../src/indicator/volume/forceIndex';
import { mfi } from '../../src/indicator/volume/moneyFlowIndex';
import { nvi } from '../../src/indicator/volume/negativeVolumeIndex';
import { vwap } from '../../src/indicator/volume/volumeWeightedAveragePrice';
import { Action } from '../../src/strategy/action';
import { Asset, newAssetWithLength } from '../../src/strategy/asset';
import { buyAndHoldStrategy } from '../buyAndHoldStrategy';
import {
  chaikinMoneyFlowStrategy,
  cmfStrategy,
} from './chaikinMoneyFlowStrategy';
import { easeOfMovementStrategy, emvStrategy } from './easeOfMovementStrategy';
import { fiStrategy, forceIndexStrategy } from './forceIndexStrategy';
import { mfiStrategy, moneyFlowIndexStrategy } from './moneyFlowIndexStrategy';
import {
  negativeVolumeIndexStrategy,
  nviStrategy,
} from './negativeVolumeIndexStrategy';
import {
  volumeWeightedAveragePriceStrategy,
  vwapStrategy,
} from './volumeWeightedAveragePriceStrategy';

jest.mock('../../src/indicator/trend/exponentialMovingAverage', () => {
  const actual = jest.requireActual(
    '../../src/indicator/trend/exponentialMovingAverage'
  );
  return { ...actual, ema: jest.fn() };
});
jest.mock('../../src/indicator/volume/chaikinMoneyFlow', () => {
  const actual = jest.requireActual(
    '../../src/indicator/volume/chaikinMoneyFlow'
  );
  return { ...actual, cmf: jest.fn() };
});
jest.mock('../../src/indicator/volume/easeOfMovement', () => {
  const actual = jest.requireActual(
    '../../src/indicator/volume/easeOfMovement'
  );
  return { ...actual, emv: jest.fn() };
});
jest.mock('../../src/indicator/volume/forceIndex', () => {
  const actual = jest.requireActual('../../src/indicator/volume/forceIndex');
  return { ...actual, fi: jest.fn() };
});
jest.mock('../../src/indicator/volume/moneyFlowIndex', () => {
  const actual = jest.requireActual(
    '../../src/indicator/volume/moneyFlowIndex'
  );
  return { ...actual, mfi: jest.fn() };
});
jest.mock('../../src/indicator/volume/negativeVolumeIndex', () => {
  const actual = jest.requireActual(
    '../../src/indicator/volume/negativeVolumeIndex'
  );
  return { ...actual, nvi: jest.fn() };
});
jest.mock('../../src/indicator/volume/volumeWeightedAveragePrice', () => {
  const actual = jest.requireActual(
    '../../src/indicator/volume/volumeWeightedAveragePrice'
  );
  return { ...actual, vwap: jest.fn() };
});

describe('Volume example strategies', () => {
  const asset = newAssetWithLength(3);
  const signs = [Action.BUY, Action.SELL, Action.HOLD];

  it('chaikin money flow: BUY on buying pressure (above 0), SELL on selling pressure', () => {
    jest.mocked(cmf).mockReturnValue([0.2, -0.2, 0]);
    expect(cmfStrategy(asset)).toStrictEqual(signs);
    expect(chaikinMoneyFlowStrategy).toBe(cmfStrategy);
  });

  it('ease of movement: BUY above 0, SELL below 0', () => {
    jest.mocked(emv).mockReturnValue([1, -1, 0]);
    expect(emvStrategy(asset)).toStrictEqual(signs);
    expect(easeOfMovementStrategy).toBe(emvStrategy);
  });

  it('force index: BUY above 0, SELL below 0', () => {
    jest.mocked(fi).mockReturnValue([1, -1, 0]);
    expect(fiStrategy(asset)).toStrictEqual(signs);
    expect(forceIndexStrategy).toBe(fiStrategy);
  });

  it('money flow index: SELL at or above 80, BUY at or below 20, HOLD between', () => {
    jest.mocked(mfi).mockReturnValue([80, 20, 50, 79, 21]);
    expect(mfiStrategy(newAssetWithLength(5))).toStrictEqual([
      Action.SELL,
      Action.BUY,
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
    ]);
    expect(moneyFlowIndexStrategy).toBe(mfiStrategy);
  });

  it('negative volume index: BUY above its EMA, SELL below, using the configured EMA period', () => {
    jest.mocked(nvi).mockReturnValue([1100, 900, 1000]);
    jest.mocked(ema).mockReturnValue([1000, 1000, 1000]);
    expect(nviStrategy(asset, { period: 50 })).toStrictEqual(signs);
    expect(jest.mocked(ema).mock.calls[0][1]).toStrictEqual({ period: 50 });
    expect(negativeVolumeIndexStrategy).toBe(nviStrategy);
  });

  it('vwap: BUY when the closing is below VWAP, SELL when above', () => {
    const closings = [10, 10, 10];
    jest.mocked(vwap).mockReturnValue([11, 9, 10]);
    const vwapAsset: Asset = { ...asset, closings };
    expect(vwapStrategy(vwapAsset)).toStrictEqual(signs);
    expect(volumeWeightedAveragePriceStrategy).toBe(vwapStrategy);
  });

  it('buy and hold: BUY on every bar', () => {
    expect(buyAndHoldStrategy(asset)).toStrictEqual([
      Action.BUY,
      Action.BUY,
      Action.BUY,
    ]);
  });
});
