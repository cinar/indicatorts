// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from './ema';

/**
 * Optional configuration of Tema parameters.
 */
export interface TemaConfig {
  period?: number;
}

/**
 * The default configuration of Tema.
 */
export const TemaDefaultConfig: Required<TemaConfig> = {
  period: 2,
};

/**
 * Tema calculates the Triple Exponential Moving Average (TEMA).
 *
 * TEMA = (3 * EMA1) - (3 * EMA2) + EMA3
 * EMA1 = EMA(values)
 * EMA2 = EMA(EMA1)
 * EMA3 = EMA(EMA2)
 *
 * @param period window period.
 * @param values values array.
 * @return tema values.
 */
export function tema(values: number[], config: TemaConfig = {}): number[] {
  const { period } = { ...TemaDefaultConfig, ...config };
  const ema1 = ema(values, { period });
  const ema2 = ema(ema1, { period });
  const ema3 = ema(ema2, { period });

  const temaLine = add(
    subtract(multiplyBy(3, ema1), multiplyBy(3, ema2)),
    ema3
  );

  return temaLine;
}
