// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { ab } from '../../src/indicator/volatility/accelerationBands';
import { bb } from '../../src/indicator/volatility/bollingerBands';
import { po } from '../../src/indicator/volatility/projectionOscillator';
import { Action } from '../../src/strategy/action';
import { Asset, newAssetWithLength } from '../../src/strategy/asset';
import {
  abStrategy,
  accelerationBandsStrategy,
} from './accelerationBandsStrategy';
import { bbStrategy, bollingerBandsStrategy } from './bollingerBandsStrategy';
import {
  poStrategy,
  projectionOscillatorStrategy,
} from './projectionOscillatorStrategy';

jest.mock('../../src/indicator/volatility/accelerationBands', () => {
  const actual = jest.requireActual(
    '../../src/indicator/volatility/accelerationBands'
  );
  return { ...actual, ab: jest.fn() };
});
jest.mock('../../src/indicator/volatility/bollingerBands', () => {
  const actual = jest.requireActual(
    '../../src/indicator/volatility/bollingerBands'
  );
  return { ...actual, bb: jest.fn() };
});
jest.mock('../../src/indicator/volatility/projectionOscillator', () => {
  const actual = jest.requireActual(
    '../../src/indicator/volatility/projectionOscillator'
  );
  return { ...actual, po: jest.fn() };
});

describe('Volatility example strategies', () => {
  // Closings above, below, and within bands of [9, 11], plus both edges.
  const closings = [12, 8, 10, 11, 9];
  const asset: Asset = { ...newAssetWithLength(closings.length), closings };
  const bands = {
    upper: closings.map(() => 11),
    middle: closings.map(() => 10),
    lower: closings.map(() => 9),
  };

  it('acceleration bands: BUY on a break above the upper band, SELL below the lower band', () => {
    jest.mocked(ab).mockReturnValue(bands);
    expect(abStrategy(asset)).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
    ]);
    expect(accelerationBandsStrategy).toBe(abStrategy);
  });

  it('bollinger bands: SELL above the upper band, BUY below the lower band', () => {
    jest.mocked(bb).mockReturnValue(bands);
    expect(bbStrategy(asset)).toStrictEqual([
      Action.SELL,
      Action.BUY,
      Action.HOLD,
      Action.HOLD,
      Action.HOLD,
    ]);
    expect(bollingerBandsStrategy).toBe(bbStrategy);
  });

  it('projection oscillator: BUY when PO is above its smoothed value, SELL when below', () => {
    jest
      .mocked(po)
      .mockReturnValue({ poResult: [60, 40, 50], spoResult: [50, 50, 50] });
    expect(poStrategy(newAssetWithLength(3))).toStrictEqual([
      Action.BUY,
      Action.SELL,
      Action.HOLD,
    ]);
    expect(projectionOscillatorStrategy).toBe(poStrategy);
  });
});
