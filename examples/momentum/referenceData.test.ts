// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it } from 'vitest';
import { join } from 'path';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { assertColumn, readCsv, toAsset } from '../../src/testing/csv';
import { aoStrategy } from './awesomeOscillatorStrategy';
import { ichimokuCloudStrategy } from './ichimokuCloudStrategy';
import { rsi2Strategy } from './rsi2Strategy';
import { stochStrategy } from './stochasticOscillatorStrategy';
import { willRStrategy } from './williamsRStrategy';

describe('Momentum strategies reference data', () => {
  it.each<[string, (asset: Asset) => Action[]]>([
    ['awesomeOscillatorStrategy', aoStrategy],
    ['ichimokuCloudStrategy', ichimokuCloudStrategy],
    ['rsi2Strategy', rsi2Strategy],
    ['stochasticOscillatorStrategy', stochStrategy],
    ['williamsRStrategy', willRStrategy],
  ])('%s should match the reference data', (name, strategy) => {
    const data = readCsv(join(__dirname, 'testdata', `${name}.csv`));
    assertColumn(strategy(toAsset(data)), data.action);
  });
});
