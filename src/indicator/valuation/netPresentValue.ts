// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Net Present Value (NPV). It is the sum of the present values of a series
 * of cash flows, one per period, with the first cash flow at the end of
 * the first period.
 *
 * ```
 * NPV = Sum(CF[i] / (1 + rate)^i), for i = 1 to n
 * ```
 *
 * @example
 * ```TypeScript
 * import { npv } from 'indicatorts';
 *
 * const result = npv(0.1, [100, 100, 100]); // 248.69
 *
 * // Alternatively:
 * // const result = netPresentValue(0.1, [100, 100, 100]);
 * ```
 * @param rate rate per period, such as 0.1 for 10%.
 * @param cashFlows cash flows, one per period.
 * @return net present value.
 */
export function npv(rate: number, cashFlows: number[]): number {
  return cashFlows.reduce(
    (sum, cashFlow, i) => sum + cashFlow / Math.pow(1 + rate, i + 1),
    0
  );
}

// Export full name
export { npv as netPresentValue };
