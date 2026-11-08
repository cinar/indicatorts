// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { daysLaterFrom, toISODateString } from './date';

describe('Date helpers', () => {
  it('should be able to compute iso', () => {
    const date = new Date(2021, 11, 23);
    const expected = '2021-12-23';

    const actual = toISODateString(date);
    expect(actual).toBe(expected);
  });

  it.each([
    { date: new Date(2021, 11, 23, 0, 0), expected: '2021-12-23' },
    { date: new Date(2021, 11, 23, 23, 59), expected: '2021-12-23' },
    { date: new Date(2021, 0, 5), expected: '2021-01-05' },
    { date: new Date(2021, 11, 31, 23, 59), expected: '2021-12-31' },
  ])('should use the local calendar day: $expected', ({ date, expected }) => {
    expect(toISODateString(date)).toBe(expected);
  });

  it('should be able to compute later', () => {
    const date = new Date(2021, 11, 23);
    const days = 1;
    const expected = new Date(2021, 11, 24);

    const actual = daysLaterFrom(date, days);
    expect(actual).toStrictEqual(expected);
  });
});
