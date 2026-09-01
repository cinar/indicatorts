// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { StrategyFunction } from '../strategy/strategyFunction';

/**
 * Strategy info.
 */
export interface StrategyInfo {
  name: string;
  strategy: StrategyFunction;
}
