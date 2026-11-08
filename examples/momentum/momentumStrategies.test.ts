// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect, vi } from 'vitest';
import { ao } from '../../src/indicator/momentum/awesomeOscillator';
import { ichimokuCloud } from '../../src/indicator/momentum/ichimokuCloud';
import { rsi } from '../../src/indicator/momentum/relativeStrengthIndex';
import { stoch } from '../../src/indicator/momentum/stochasticOscillator';
import { willr } from '../../src/indicator/momentum/williamsR';
import { Action } from '../../src/strategy/action';
import { newAssetWithLength } from '../../src/strategy/asset';
import {
  aoStrategy,
  awesomeOscillatorStrategy,
} from './awesomeOscillatorStrategy';
import { ichimokuCloudStrategy } from './ichimokuCloudStrategy';
import { rsi2Strategy } from './rsi2Strategy';
import {
  stochasticOscillatorStrategy,
  stochStrategy,
} from './stochasticOscillatorStrategy';
import { williamsRStrategy, willRStrategy } from './williamsRStrategy';

vi.mock(
  '../../src/indicator/momentum/awesomeOscillator',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/momentum/awesomeOscillator')
    >()),
    ao: vi.fn(),
  })
);
vi.mock(
  '../../src/indicator/momentum/ichimokuCloud',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/momentum/ichimokuCloud')
    >()),
    ichimokuCloud: vi.fn(),
  })
);
vi.mock(
  '../../src/indicator/momentum/relativeStrengthIndex',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/momentum/relativeStrengthIndex')
    >()),
    rsi: vi.fn(),
  })
);
vi.mock(
  '../../src/indicator/momentum/stochasticOscillator',
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import('../../src/indicator/momentum/stochasticOscillator')
    >()),
    stoch: vi.fn(),
  })
);
vi.mock('../../src/indicator/momentum/williamsR', async (importOriginal) => ({
  ...(await importOriginal<
    typeof import('../../src/indicator/momentum/williamsR')
  >()),
  willr: vi.fn(),
}));

describe('Momentum example strategies', () => {
  it('awesome oscillator: BUY above 0, SELL below 0', () => {
    vi.mocked(ao).mockReturnValue([1, -1, 0]);
    expect(aoStrategy(newAssetWithLength(3))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
    expect(awesomeOscillatorStrategy).toBe(aoStrategy);
  });

  it('ichimoku cloud: BUY when Senkou A is above Senkou B, SELL when below', () => {
    vi.mocked(ichimokuCloud).mockReturnValue({
      tenkan: [0, 0, 0],
      kijun: [0, 0, 0],
      ssa: [2, 1, 1],
      ssb: [1, 2, 1],
      laggingSpan: [0, 0, 0],
    });
    expect(ichimokuCloudStrategy(newAssetWithLength(3))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
  });

  it('rsi 2: BUY below 10, SELL above 90, using a period of 2', () => {
    vi.mocked(rsi).mockReturnValue([5, 95, 10, 90, 50]);
    expect(rsi2Strategy(newAssetWithLength(5))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
    ]);
    expect(vi.mocked(rsi).mock.calls[0][1]).toStrictEqual({ period: 2 });
  });

  it('stochastic oscillator: SELL when both K and D >= 80, BUY when both <= 20', () => {
    vi.mocked(stoch).mockReturnValue({
      k: [80, 20, 85, 15, 50],
      d: [80, 20, 50, 50, 50],
    });
    expect(stochStrategy(newAssetWithLength(5))).toStrictEqual([
      Action.SELL,
      Action.BUY,
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
    ]);
    expect(stochasticOscillatorStrategy).toBe(stochStrategy);
  });

  it('williams r: BUY at or below -80, SELL at or above -20', () => {
    vi.mocked(willr).mockReturnValue([-80, -20, -50]);
    expect(willRStrategy(newAssetWithLength(3))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
    expect(williamsRStrategy).toBe(willRStrategy);
  });
});
