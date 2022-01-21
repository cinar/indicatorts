// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Action } from './action';
import { Asset } from './asset';

/**
 * Strategy function.
 */
export type StrategyFunction = (asset: Asset) => Action[];
