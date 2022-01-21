// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { Action } from '../strategy/action';
import { StrategyInfo } from './strategyInfo';

/**
 * Strategy result.
 */
export interface StrategyResult {
  info: StrategyInfo;
  gain: number;
  lastAction: Action;
}
