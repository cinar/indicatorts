/**
 * Price Rate of Change (ROC).
 * @param period window period.
 * @param values values array.
 * @return ROC values.
 */
export function roc(period: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < values.length; i++) {
    if (i < (period - 1)) {
      // Setting indicator values to 0 for days before the 1st period.
      result[i] = 0;
    } else result[i] = (values[i] / values[i - period + 1] - 1) * 100;
  }

  return result;
}
