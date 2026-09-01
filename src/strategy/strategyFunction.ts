// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { Action } from './action';
import { Asset } from './asset';

/**
 * Strategy function.
 */
export type StrategyFunction = (asset: Asset) => Action[];
