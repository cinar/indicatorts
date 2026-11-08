// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, beforeAll, afterAll } from 'vitest';
import { deepStrictEqual, throws } from 'assert';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { assertColumn, readCsv, toAsset } from './csv';

describe('CSV test helpers', () => {
  let dir: string;

  const write = (name: string, content: string): string => {
    const filePath = join(dir, name);
    writeFileSync(filePath, content);
    return filePath;
  };

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), 'indicatorts-csv-'));
  });

  afterAll(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('should read columns', () => {
    const filePath = write(
      'ok.csv',
      'date,close,value\r\n2022-11-30,1.5,NaN\n2022-12-01,-2,Infinity\n\n'
    );

    deepStrictEqual(readCsv(filePath), {
      date: [Date.parse('2022-11-30'), Date.parse('2022-12-01')],
      close: [1.5, -2],
      value: [NaN, Infinity],
    });
  });

  it('should reject an empty file', () => {
    throws(() => readCsv(write('empty.csv', '\n')), /empty CSV file/);
  });

  it('should reject a row with the wrong number of cells', () => {
    throws(
      () => readCsv(write('cells.csv', 'a,b\n1\n')),
      /cells.csv:2: expected 2 cells, got 1/
    );
  });

  it('should reject an empty cell', () => {
    throws(() => readCsv(write('blank.csv', 'a,b\n1,\n')), /invalid number ''/);
  });

  it('should reject a non-numeric cell', () => {
    throws(
      () => readCsv(write('text.csv', 'a\nabc\n')),
      /invalid number 'abc'/
    );
  });

  it('should reject an invalid date', () => {
    throws(
      () => readCsv(write('date.csv', 'date\nsoon\n')),
      /invalid date 'soon'/
    );
  });

  it('should build an asset', () => {
    const asset = toAsset({
      date: [0],
      open: [1],
      high: [2],
      low: [3],
      close: [4],
      volume: [5],
    });

    deepStrictEqual(asset, {
      dates: [new Date(0)],
      openings: [1],
      highs: [2],
      lows: [3],
      closings: [4],
      volumes: [5],
    });
  });

  it('should match rounded values, NaN and negative zero', () => {
    assertColumn([1.234, NaN, -0.001], [1.23, NaN, 0]);
  });

  it('should honor the digits argument', () => {
    assertColumn([1.234], [1.2], 1);
  });

  it('should report a length mismatch', () => {
    throws(() => {
      assertColumn([1], [1, 2]);
    }, /length 1 does not match/);
  });

  it('should report the first mismatching line', () => {
    throws(() => {
      assertColumn([1, 2, 3], [1, 5, 6]);
    }, /line 3: actual 2 expected 5/);
  });
});
