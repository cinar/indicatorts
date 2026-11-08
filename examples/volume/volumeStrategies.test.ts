// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect, vi } from 'vitest';
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

vi.mock(
  '../../src/indicator/trend/exponentialMovingAverage',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/trend/exponentialMovingAverage')
    >()),
    ema: vi.fn(),
  })
);
vi.mock(
  '../../src/indicator/volume/chaikinMoneyFlow',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/volume/chaikinMoneyFlow')
    >()),
    cmf: vi.fn(),
  })
);
vi.mock(
  '../../src/indicator/volume/easeOfMovement',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/volume/easeOfMovement')
    >()),
    emv: vi.fn(),
  })
);
vi.mock('../../src/indicator/volume/forceIndex', async (importOriginal) => ({
  ...(await importOriginal<
    typeof import('../../src/indicator/volume/forceIndex')
  >()),
  fi: vi.fn(),
}));
vi.mock(
  '../../src/indicator/volume/moneyFlowIndex',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/volume/moneyFlowIndex')
    >()),
    mfi: vi.fn(),
  })
);
vi.mock(
  '../../src/indicator/volume/negativeVolumeIndex',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/volume/negativeVolumeIndex')
    >()),
    nvi: vi.fn(),
  })
);
vi.mock(
  '../../src/indicator/volume/volumeWeightedAveragePrice',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/volume/volumeWeightedAveragePrice')
    >()),
    vwap: vi.fn(),
  })
);

describe('Volume example strategies', () => {
  const asset = newAssetWithLength(3);
  const signs = [Action.BUY, Action.SELL, Action.HOLD];

  it('chaikin money flow: BUY on buying pressure (above 0), SELL on selling pressure', () => {
    vi.mocked(cmf).mockReturnValue([0.2, -0.2, 0]);
    expect(cmfStrategy(asset)).toStrictEqual(signs);
    expect(chaikinMoneyFlowStrategy).toBe(cmfStrategy);
  });

  it('ease of movement: BUY above 0, SELL below 0', () => {
    vi.mocked(emv).mockReturnValue([1, -1, 0]);
    expect(emvStrategy(asset)).toStrictEqual(signs);
    expect(easeOfMovementStrategy).toBe(emvStrategy);
  });

  it('force index: BUY above 0, SELL below 0', () => {
    vi.mocked(fi).mockReturnValue([1, -1, 0]);
    expect(fiStrategy(asset)).toStrictEqual(signs);
    expect(forceIndexStrategy).toBe(fiStrategy);
  });

  it('money flow index: SELL at or above 80, BUY at or below 20, HOLD between', () => {
    vi.mocked(mfi).mockReturnValue([80, 20, 50, 79, 21]);
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
    vi.mocked(nvi).mockReturnValue([1100, 900, 1000]);
    vi.mocked(ema).mockReturnValue([1000, 1000, 1000]);
    expect(nviStrategy(asset, { period: 50 })).toStrictEqual(signs);
    expect(vi.mocked(ema).mock.calls[0][1]).toStrictEqual({ period: 50 });
    expect(negativeVolumeIndexStrategy).toBe(nviStrategy);
  });

  it('vwap: BUY when the closing is below VWAP, SELL when above', () => {
    const closings = [10, 10, 10];
    vi.mocked(vwap).mockReturnValue([11, 9, 10]);
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
