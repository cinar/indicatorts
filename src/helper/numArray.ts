// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Checkes the values lenghts.
 * @param {number[]} values values list.
 */
export function checkSameLength(...values: number[][]) {
  if (values.length > 0) {
    const length = values[0].length;

    for (let i = 1; i < values.length; i++) {
      if (values[i].length != length) {
        throw new Error(`values length at ${i} not ${length}`);
      }
    }
  }
}

/**
 * Absolute values of the given values.
 * @param {number[]} values values array.
 * @return {number[]} absolute values.
 */
export function abs(values: number[]): number[] {
  return values.map((value) => Math.abs(value));
}

/**
 * Adds values2 to values1.
 * @param {number[]} values1 values one.
 * @param {number[]} values2 values two.
 * @return {number[]} result array.
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
 * @param {number} n add value.
 * @param {number[]} values values array.
 * @return {number[]} result array.
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
 * @param {number[]} values1 values one.
 * @param {number[]} values2 values two.
 * @return {number[]} result array.
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
 * @param {number} n divide value.
 * @param {number[]} values values array.
 * @return {number[]} result array.
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
 * @param {number[]} values1 values one.
 * @param {number[]} values2 values two.
 * @return {number[]} result array.
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
 * @param {number} n multiply value.
 * @param {number[]} values values array.
 * @return {number[]} result array.
 */
export function multiplyBy(n: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < result.length; i++) {
    result[i] = values[i] * n;
  }

  return result;
}

/**
 * Substracts values2 from values1.
 * @param {number[]} values1 values one.
 * @param {number[]} values2 values two.
 * @return {number[]} result array.
 */
export function substract(values1: number[], values2: number[]): number[] {
  checkSameLength(values1, values2);

  const result = new Array<number>(values1.length);

  for (let i = 0; i < result.length; i++) {
    result[i] = values1[i] - values2[i];
  }

  return result;
}

/**
 * Substractes n from values.
 * @param {number} n substract value.
 * @param {number[]} values values array.
 * @return {number[]} result array.
 */
export function substractBy(n: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < values.length; i++) {
    result[i] = values[i] - n;
  }

  return result;
}

/**
 * Shifts values right by given amount.
 * @param {number} n shift amount.
 * @param {number[]} values values array.
 * @return {number[]} shifted values.
 */
export function shiftRightBy(n: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < result.length; i++) {
    if (i < n) {
      result[i] = 0;
    } else {
      result[i] = values[i - n];
    }
  }

  return result;
}

/**
 * Transpose of given values.
 * @param {number[]} values values arrays.
 * @return {number[]} transposed values.
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
 * @param {number[]} values values arrays.
 * @return {number[]} max rows.
 */
export function max(...values: number[][]): number[] {
  return transpose(...values).map((row) => Math.max(...row));
}

/**
 * Rounds the value to given number of digits.
 * @param {number} digits digits number.
 * @param {number} value numeric value.
 * @return {number} rounded value.
 */
export function roundDigits(digits: number, value: number): number {
  const n = Math.pow(10, digits);
  return Math.round(value * n) / n;
}

/**
 * Rounds the values to given number of digits.
 * @param {number} digits digits number.
 * @param {number[]} values values array.
 * @return {number[]} rounded values.
 */
export function roundDigitsAll(digits: number, values: number[]): number[] {
  return values.map((value) => roundDigits(digits, value));
}

/**
 * Generates numbers.
 *
 * @param {number} begin begin number.
 * @param {number} end end number.
 * @param {number} step step number.
 * @return {number[]} generated numbers.
 */
export function generateNumbers(
    begin: number,
    end: number,
    step: number,
): number[] {
  const result = new Array<number>((end - begin) / step);

  for (let i = 0; i < result.length; i++) {
    result[i] = begin + (step * i);
  }

  return result;
}

/**
 * Power of the given bases to the exponent.
 *
 * @param {number[]} bases base values.
 * @param {number} exponent exponent value.
 * @return {number[]} power values.
 */
export function pow(bases: number[], exponent: number): number[] {
  return bases.map((base) => Math.pow(base, exponent));
}

/**
 * Square roots of values.
 * @param {number[]} values value array.
 * @return {number[]} square roots.
 */
export function sqrt(values: number[]): number[] {
  return values.map((value) => Math.sqrt(value));
}
