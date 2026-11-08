// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it } from 'vitest';
import { join } from 'path';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { assertColumn, readCsv, toAsset } from '../../src/testing/csv';
import { apoStrategy } from './absolutePriceOscillatorStrategy';
import { aroonStrategy } from './aroonStrategy';
import { bopStrategy } from './balanceOfPowerStrategy';
import { cfoStrategy } from './chandeForecastOscillatorStrategy';
import { kdjStrategy } from './kdjStrategy';
import { macdStrategy } from './macdStrategy';
import { psarStrategy } from './parabolicSarStrategy';
import { typpriceStrategy } from './typicalPriceStrategy';
import { vortexStrategy } from './vortexStrategy';
import { vwmaStrategy } from './vwmaStrategy';

describe('Trend strategies reference data', () => {
  it.each<[string, (asset: Asset) => Action[]]>([
    ['absolutePriceOscillatorStrategy', apoStrategy],
    ['aroonStrategy', aroonStrategy],
    ['balanceOfPowerStrategy', bopStrategy],
    ['chandeForecastOscillatorStrategy', cfoStrategy],
    ['kdjStrategy', kdjStrategy],
    ['macdStrategy', macdStrategy],
    ['parabolicSarStrategy', psarStrategy],
    ['typicalPriceStrategy', typpriceStrategy],
    ['vortexStrategy', vortexStrategy],
    ['vwmaStrategy', vwmaStrategy],
  ])('%s should match the reference data', (name, strategy) => {
    const data = readCsv(join(__dirname, 'testdata', `${name}.csv`));
    assertColumn(strategy(toAsset(data)), data.action);
  });
});
