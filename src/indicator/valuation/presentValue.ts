// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Present Value (PV). It is the amount today that grows to the given future
 * value at the given rate, compounded once per year, in the given number
 * of years.
 *
 * ```
 * PV = FV / (1 + rate)^years
 * ```
 *
 * @example
 * ```TypeScript
 * import { pv } from 'indicatorts';
 *
 * const result = pv(100, 0.05, 5); // 78.35
 *
 * // Alternatively:
 * // const result = presentValue(100, 0.05, 5);
 * ```
 * @param fv future value.
 * @param rate rate per year, such as 0.05 for 5%.
 * @param years number of years.
 * @return present value.
 */
export function pv(fv: number, rate: number, years: number): number {
  return fv / Math.pow(1 + rate, years);
}

// Export full name
export { pv as presentValue };
