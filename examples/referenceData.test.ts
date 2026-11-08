// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it } from 'vitest';
import { join } from 'path';
import { Action } from '../src/strategy/action';
import { Asset } from '../src/strategy/asset';
import { assertColumn, readCsv, toAsset } from '../src/testing/csv';
import { buyAndHoldStrategy } from './buyAndHoldStrategy';

describe('Buy and hold strategy reference data', () => {
  it.each<[string, (asset: Asset) => Action[]]>([
    ['buyAndHoldStrategy', buyAndHoldStrategy],
  ])('%s should match the reference data', (name, strategy) => {
    const data = readCsv(join(__dirname, 'testdata', `${name}.csv`));
    assertColumn(strategy(toAsset(data)), data.action);
  });
});
