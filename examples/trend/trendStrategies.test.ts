// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect, vi } from 'vitest';
import { apo } from '../../src/indicator/trend/absolutePriceOscillator';
import { aroon } from '../../src/indicator/trend/aroon';
import { bop } from '../../src/indicator/trend/balanceOfPower';
import { psar } from '../../src/indicator/trend/parabolicSar';
import { vortex } from '../../src/indicator/trend/vortex';
import { Trend } from '../../src/indicator/types';
import { Action } from '../../src/strategy/action';
import { Asset, newAssetWithLength } from '../../src/strategy/asset';
import {
  absolutePriceOscillatorStrategy,
  apoStrategy,
} from './absolutePriceOscillatorStrategy';
import { aroonStrategy } from './aroonStrategy';
import { balanceOfPowerStrategy, bopStrategy } from './balanceOfPowerStrategy';
import { parabolicSARStrategy, psarStrategy } from './parabolicSarStrategy';
import { typicalPriceStrategy, typpriceStrategy } from './typicalPriceStrategy';
import { vortexStrategy } from './vortexStrategy';

vi.mock(
  '../../src/indicator/trend/absolutePriceOscillator',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/trend/absolutePriceOscillator')
    >()),
    apo: vi.fn(),
  })
);
vi.mock('../../src/indicator/trend/aroon', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../src/indicator/trend/aroon')>()),
  aroon: vi.fn(),
}));
vi.mock('../../src/indicator/trend/balanceOfPower', async (importOriginal) => ({
  ...(await importOriginal<
    typeof import('../../src/indicator/trend/balanceOfPower')
  >()),
  bop: vi.fn(),
}));
vi.mock('../../src/indicator/trend/parabolicSar', async (importOriginal) => ({
  ...(await importOriginal<
    typeof import('../../src/indicator/trend/parabolicSar')
  >()),
  psar: vi.fn(),
}));
vi.mock('../../src/indicator/trend/vortex', async (importOriginal) => ({
  ...(await importOriginal<
    typeof import('../../src/indicator/trend/vortex')
  >()),
  vortex: vi.fn(),
}));

describe('Trend example strategies', () => {
  it('apo: BUY above 0, SELL below 0, passing the fast and slow periods', () => {
    vi.mocked(apo).mockReturnValue([1, -1, 0]);
    expect(apoStrategy(newAssetWithLength(3), { fast: 5 })).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
    expect(vi.mocked(apo).mock.calls[0][1]).toStrictEqual({
      fast: 5,
      slow: 30,
    });
    expect(absolutePriceOscillatorStrategy).toBe(apoStrategy);
  });

  it('aroon: BUY when up is above down, SELL when below', () => {
    vi.mocked(aroon).mockReturnValue({ up: [80, 20, 50], down: [20, 80, 50] });
    expect(aroonStrategy(newAssetWithLength(3))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
  });

  it('balance of power: BUY above 0, SELL below 0', () => {
    vi.mocked(bop).mockReturnValue([0.5, -0.5, 0]);
    expect(bopStrategy(newAssetWithLength(3))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
    expect(balanceOfPowerStrategy).toBe(bopStrategy);
  });

  it('parabolic sar: BUY on a rising trend, SELL on a falling trend', () => {
    vi.mocked(psar).mockReturnValue({
      trends: [Trend.RISING, Trend.FALLING, Trend.STABLE],
      psarResult: [0, 0, 0],
    });
    expect(psarStrategy(newAssetWithLength(3))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
    expect(parabolicSARStrategy).toBe(psarStrategy);
  });

  it('typical price: BUY when it rises, SELL when it falls', () => {
    const prices = [10, 11, 10, 10];
    const asset: Asset = {
      ...newAssetWithLength(prices.length),
      highs: prices,
      lows: prices,
      closings: prices,
    };
    expect(typpriceStrategy(asset)).toStrictEqual([
      Action.HOLD,
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
    expect(typicalPriceStrategy).toBe(typpriceStrategy);
  });

  it('vortex: BUY when plus is above minus, SELL when below', () => {
    vi.mocked(vortex).mockReturnValue({ plus: [2, 1, 1], minus: [1, 2, 1] });
    expect(vortexStrategy(newAssetWithLength(3))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
  });
});
