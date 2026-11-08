// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

// Test-only helpers for reading reference data from CSV files. This module
// uses Node's fs, so it is not exported from the package entry point and is
// excluded from the published type declarations.

import { AssertionError } from 'assert';
import { readFileSync } from 'fs';
import { roundDigits } from '../helper/numArray';
import { Asset } from '../strategy/asset';

/**
 * CSV columns keyed by their header name.
 */
export type CsvColumns = Record<string, number[]>;

/**
 * Parses one CSV cell as a number. Empty or non-numeric cells are rejected
 * so a malformed file cannot silently turn into zeros; the literal values
 * NaN, Infinity and -Infinity are accepted.
 *
 * @param cell cell text.
 * @param location location used in the error message.
 * @return parsed number.
 */
function parseCell(cell: string, location: string): number {
  const text = cell.trim();
  const value = Number(text);

  if (text === '' || (Number.isNaN(value) && text !== 'NaN')) {
    throw new Error(`${location}: invalid number '${cell}'`);
  }

  return value;
}

/**
 * Reads the given CSV file into columns. The first line is the header. The
 * date column, if present, is parsed with Date.parse into milliseconds; all
 * other cells must be numbers.
 *
 * @param filePath CSV file path.
 * @return columns keyed by header name.
 */
export function readCsv(filePath: string): CsvColumns {
  const lines = readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '');

  if (lines.length === 0) {
    throw new Error(`${filePath}: empty CSV file`);
  }

  const headers = lines[0].split(',').map((header) => header.trim());
  const columns: CsvColumns = {};
  for (const header of headers) {
    columns[header] = [];
  }

  for (let row = 1; row < lines.length; row++) {
    const cells = lines[row].split(',');
    const location = `${filePath}:${row + 1}`;

    if (cells.length !== headers.length) {
      throw new Error(
        `${location}: expected ${headers.length} cells, got ${cells.length}`
      );
    }

    cells.forEach((cell, i) => {
      const header = headers[i];
      if (header === 'date') {
        const date = Date.parse(cell);
        if (Number.isNaN(date)) {
          throw new Error(`${location}: invalid date '${cell}'`);
        }
        columns[header].push(date);
      } else {
        columns[header].push(parseCell(cell, location));
      }
    });
  }

  return columns;
}

/**
 * Builds an asset from the date, open, high, low, close and volume columns.
 *
 * @param columns CSV columns.
 * @return asset object.
 */
export function toAsset(columns: CsvColumns): Asset {
  return {
    dates: columns.date.map((date) => new Date(date)),
    openings: columns.open,
    highs: columns.high,
    lows: columns.low,
    closings: columns.close,
    volumes: columns.volume,
  };
}

/**
 * Asserts that the actual values, rounded to the given number of digits,
 * match the expected column. NaN matches NaN, and -0 matches 0. The error
 * names the first mismatching CSV line, counting the header as line 1.
 *
 * @param actual actual values.
 * @param expected expected values.
 * @param digits number of digits to round the actual values to.
 */
export function assertColumn(
  actual: number[],
  expected: number[],
  digits = 2
): void {
  if (actual.length !== expected.length) {
    throw new AssertionError({
      message: `length ${actual.length} does not match expected ${expected.length}`,
      actual: actual.length,
      expected: expected.length,
    });
  }

  for (let i = 0; i < actual.length; i++) {
    const value = roundDigits(digits, actual[i]);
    const same =
      value === expected[i] ||
      (Number.isNaN(value) && Number.isNaN(expected[i]));

    if (!same) {
      throw new AssertionError({
        message: `line ${i + 2}: actual ${value} expected ${expected[i]}`,
        actual: value,
        expected: expected[i],
      });
    }
  }
}
