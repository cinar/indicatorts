// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Future Value (FV). It is the value of a present amount after it grows at
 * the given rate, compounded once per year, for the given number of years.
 *
 * ```
 * FV = PV * (1 + rate)^years
 * ```
 *
 * @example
 * ```TypeScript
 * import { fv } from 'indicatorts';
 *
 * const result = fv(100, 0.05, 5); // 127.63
 *
 * // Alternatively:
 * // const result = futureValue(100, 0.05, 5);
 * ```
 * @param pv present value.
 * @param rate rate per year, such as 0.05 for 5%.
 * @param years number of years.
 * @return future value.
 */
export function fv(pv: number, rate: number, years: number): number {
  return pv * Math.pow(1 + rate, years);
}

// Export full name
export { fv as futureValue };
