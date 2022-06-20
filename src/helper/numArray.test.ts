// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual, strictEqual } from 'assert';
import * as NumArray from './numArray';

describe('Number Array', () => {
  it('should be able to abs values', () => {
    const values = [-1, -2, 3, 4, -5, 6, -7, 8, 9, -10];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const actual = NumArray.abs(values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to add values', () => {
    const values1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const values2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

    const actual = NumArray.add(values1, values2);
    deepStrictEqual(actual, expected);
  });

  it('should be able to add by', () => {
    const values = [1, 2, 3, 4];
    const expected = [2, 3, 4, 5];
    const n = 1;

    const actual = NumArray.addBy(n, values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to divide values', () => {
    const values1 = [2, 8, 6, 16, 10, 24, 14, 32, 18, 40];
    const values2 = [2, 4, 2, 4, 2, 4, 2, 4, 2, 4];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const actual = NumArray.divide(values1, values2);
    deepStrictEqual(actual, expected);
  });

  it('should be able to divide by', () => {
    const values = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const n = 2;

    const actual = NumArray.divideBy(n, values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to multiply values', () => {
    const values1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const values2 = [2, 4, 2, 4, 2, 4, 2, 4, 2, 4];
    const expected = [2, 8, 6, 16, 10, 24, 14, 32, 18, 40];

    const actual = NumArray.multiply(values1, values2);
    deepStrictEqual(actual, expected);
  });

  it('should be able to multiply by', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    const n = 2;

    const actual = NumArray.multiplyBy(n, values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to subtract values', () => {
    const values1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const values2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90];

    const actual = NumArray.subtract(values1, values2);
    deepStrictEqual(actual, expected);
  });

  it('should be able to subtract by', () => {
    const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const expected = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    const n = 1;

    const actual = NumArray.subtractBy(n, values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to shift and fill values', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8];
    const n = 2;

    const actual = NumArray.shiftRightAndFillBy(n, values[0], values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to shift values', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8];
    const n = 2;

    const actual = NumArray.shiftRightBy(n, values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute changes', () => {
    const values = [1, 2, 1, 5, 2, 4, 8, 8, 10, 4];
    const expected = [1, 1, -1, 4, -3, 2, 4, 0, 2, -6];

    const actual = NumArray.changes(1, values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to extract signs', () => {
    const values = [1, -2, 3, 4, -5, 0, 6, -8, -9, 10];
    const expected = [1, -1, 1, 1, -1, 1, 1, -1, -1, 1];

    const actual = NumArray.extractSigns(values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to transpose values', () => {
    const values1 = [1, 3, 5, 7];
    const values2 = [2, 4, 6, 8];
    const expected = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ];

    const actual = NumArray.transpose(values1, values2);
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute max', () => {
    const values1 = [1, 4, 6, 8];
    const values2 = [2, 1, 1, 9];
    const expected = [2, 4, 6, 9];

    const actual = NumArray.max(values1, values2);
    deepStrictEqual(actual, expected);
  });

  it('should be able to round digits', () => {
    const value = 1.5182345;
    const digits = 4;
    const expected = 1.5182;

    const actual = NumArray.roundDigits(digits, value);
    strictEqual(actual, expected);
  });

  it('should be able to round digits for all', () => {
    const values = [1.2345, 2.5194, 4.1025, 6.779];
    const digits = 2;
    const expected = [1.23, 2.52, 4.1, 6.78];

    const actual = NumArray.roundDigitsAll(digits, values);
    deepStrictEqual(actual, expected);
  });

  it('should be able to generate numbers', () => {
    const expected = [2, 4, 6, 8];
    const actual = NumArray.generateNumbers(2, 10, 2);
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute pow', () => {
    const bases = [1, 2, 3, 4];
    const expected = [1, 4, 9, 16];
    const exponent = 2;

    const actual = NumArray.pow(bases, exponent);
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute sqrt', () => {
    const values = [1, 9, 16, 25];
    const expected = [1, 3, 4, 5];

    const actual = NumArray.sqrt(values);
    deepStrictEqual(actual, expected);
  });
});
