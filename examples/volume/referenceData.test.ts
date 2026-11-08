// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it } from 'vitest';
import { join } from 'path';
import { Action } from '../../src/strategy/action';
import { Asset } from '../../src/strategy/asset';
import { assertColumn, readCsv, toAsset } from '../../src/testing/csv';
import { cmfStrategy } from './chaikinMoneyFlowStrategy';
import { emvStrategy } from './easeOfMovementStrategy';
import { fiStrategy } from './forceIndexStrategy';
import { mfiStrategy } from './moneyFlowIndexStrategy';
import { nviStrategy } from './negativeVolumeIndexStrategy';
import { vwapStrategy } from './volumeWeightedAveragePriceStrategy';

describe('Volume strategies reference data', () => {
  it.each<[string, (asset: Asset) => Action[]]>([
    ['chaikinMoneyFlowStrategy', cmfStrategy],
    ['easeOfMovementStrategy', emvStrategy],
    ['forceIndexStrategy', fiStrategy],
    ['moneyFlowIndexStrategy', mfiStrategy],
    ['negativeVolumeIndexStrategy', nviStrategy],
    ['volumeWeightedAveragePriceStrategy', vwapStrategy],
  ])('%s should match the reference data', (name, strategy) => {
    const data = readCsv(join(__dirname, 'testdata', `${name}.csv`));
    assertColumn(strategy(toAsset(data)), data.action);
  });
});
