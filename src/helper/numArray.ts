// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Checkes the values lenghts.
 * @param values values list.
 */
export function checkSameLength(...values: number[][]): void {
  if (values.length > 0) {
    const length = values[0].length;

    for (let i = 1; i < values.length; i++) {
      if (values[i].length !== length) {
        throw new Error(`values length at ${i} not ${length}`);
      }
    }
  }
}

/**
 * Absolute values of the given values.
 * @param values values array.
 * @return absolute values.
 */
export function abs(values: number[]): number[] {
  return values.map((value) => Math.abs(value));
}

/**
 * Adds values2 to values1.
 * @param values1 values one.
 * @param values2 values two.
 * @return result array.
 */
export function add(values1: number[], values2: number[]): number[] {
  checkSameLength(values1, values2);

  const result = new Array<number>(values1.length);

  for (let i = 0; i < result.length; i++) {
    result[i] = values1[i] + values2[i];
  }

  return result;
}

/**
 * Adds n to values.
 * @param n add value.
 * @param values values array.
 * @return result array.
 */
export function addBy(n: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < values.length; i++) {
    result[i] = values[i] + n;
  }

  return result;
}

/**
 * Divides values1 by values2.
 * @param values1 values one.
 * @param values2 values two.
 * @return result array.
 */
export function divide(values1: number[], values2: number[]): number[] {
  checkSameLength(values1, values2);

  const result = new Array<number>(values1.length);

  for (let i = 0; i < result.length; i++) {
    result[i] = values1[i] / values2[i];
  }

  return result;
}

/**
 * Divides values by n.
 * @param n divide value.
 * @param values values array.
 * @return result array.
 */
export function divideBy(n: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < values.length; i++) {
    result[i] = values[i] / n;
  }

  return result;
}

/**
 * Multiply values1 by values2.
 * @param values1 values one.
 * @param values2 values two.
 * @return result array.
 */
export function multiply(values1: number[], values2: number[]): number[] {
  checkSameLength(values1, values2);

  const result = new Array<number>(values1.length);

  for (let i = 0; i < result.length; i++) {
    result[i] = values1[i] * values2[i];
  }

  return result;
}

/**
 * Multiply values by n.
 * @param n multiply value.
 * @param values values array.
 * @return result array.
 */
export function multiplyBy(n: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < result.length; i++) {
    result[i] = values[i] * n;
  }

  return result;
}

/**
 * Subtracts values2 from values1.
 * @param values1 values one.
 * @param values2 values two.
 * @return result array.
 */
export function subtract(values1: number[], values2: number[]): number[] {
  checkSameLength(values1, values2);

  const result = new Array<number>(values1.length);

  for (let i = 0; i < result.length; i++) {
    result[i] = values1[i] - values2[i];
  }

  return result;
}

/**
 * Subtractes n from values.
 * @param n subtract value.
 * @param values values array.
 * @return result array.
 */
export function subtractBy(n: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < values.length; i++) {
    result[i] = values[i] - n;
  }

  return result;
}

/**
 * Shift values right by given amount and fill with value.
 * @param n shift amount.
 * @param fill fill value.
 * @param values values array.
 * @returns shifted and filled values.
 */
export function shiftRightAndFillBy(
  n: number,
  fill: number,
  values: number[]
): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < result.length; i++) {
    if (i < n) {
      result[i] = fill;
    } else {
      result[i] = values[i - n];
    }
  }

  return result;
}

/**
 * Shifts values right by given amount.
 * @param n shift amount.
 * @param values values array.
 * @return shifted values.
 */
export function shiftRightBy(n: number, values: number[]): number[] {
  return shiftRightAndFillBy(n, 0, values);
}

/**
 * Shift values left by given amount and fill with value.
 * @param n shift amount.
 * @param fill fill value.
 * @param values values array.
 * @returns shifted and filled values.
 */
export function shiftLeftAndFillBy(
    n: number,
    fill: number,
    values: number[]
): number[] {
  const length = values.length
  const result: number[] = Array(length).fill(fill);

  for (let i = n; i < length; i++) {
    const newIndex = (i - n + length) % length;
    result[newIndex] = values[i];
  }

  return result;
}

/**
 * Shifts values left by given amount.
 * @param n shift amount.
 * @param values values array.
 * @return shifted values.
 */
export function shiftLeftBy(n: number, values: number[]): number[] {
  return shiftLeftAndFillBy(n, 0, values);
}

/**
 * Change between the current value and the value n before.
 * @param n shift amount.
 * @param values values array.
 * @returns changes array.
 */
export function changes(n: number, values: number[]): number[] {
  return subtract(values, shiftRightBy(n, values));
}

/**
 * Extracts the sign of the values. Returns 1 for the
 * positive and zero, and -1 for the negative.
 * @param values values array.
 * @return sign values.
 */
export function extractSigns(values: number[]): number[] {
  return values.map((value) => (value >= 0 ? 1 : -1));
}

/**
 * Transpose of given values.
 * @param values values arrays.
 * @return transposed values.
 */
export function transpose(...values: number[][]): number[][] {
  checkSameLength(...values);

  const result = new Array<number[]>(values[0].length);

  for (let i = 0; i < result.length; i++) {
    result[i] = new Array<number>(values.length);
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = values[j][i];
    }
  }

  return result;
}

/**
 * Max value of rows.
 * @param values values arrays.
 * @return max rows.
 */
export function max(...values: number[][]): number[] {
  return transpose(...values).map((row) => Math.max(...row));
}

/**
 * Rounds the value to given number of digits.
 * @param digits digits number.
 * @param value numeric value.
 * @return rounded value.
 */
export function roundDigits(digits: number, value: number): number {
  const n = Math.pow(10, digits);
  return Math.round(value * n) / n;
}

/**
 * Rounds the values to given number of digits.
 * @param digits digits number.
 * @param values values array.
 * @return rounded values.
 */
export function roundDigitsAll(digits: number, values: number[]): number[] {
  return values.map((value) => roundDigits(digits, value));
}

/**
 * Generates numbers.
 *
 * @param begin begin number.
 * @param end end number.
 * @param step step number.
 * @return generated numbers.
 */
export function generateNumbers(
  begin: number,
  end: number,
  step: number
): number[] {
  const result = new Array<number>((end - begin) / step);

  for (let i = 0; i < result.length; i++) {
    result[i] = begin + step * i;
  }

  return result;
}

/**
 * Power of the given bases to the exponent.
 *
 * @param bases base values.
 * @param exponent exponent value.
 * @return power values.
 */
export function pow(bases: number[], exponent: number): number[] {
  return bases.map((base) => Math.pow(base, exponent));
}

/**
 * Square roots of values.
 * @param values value array.
 * @return square roots.
 */
export function sqrt(values: number[]): number[] {
  return values.map((value) => Math.sqrt(value));
}
