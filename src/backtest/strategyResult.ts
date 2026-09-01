// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
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
