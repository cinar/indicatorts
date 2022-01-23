// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { daysLaterFrom, toISODateString } from './date';

describe('Date helpers', () => {
  it('should be able to compute iso', () => {
    const date = new Date(2021, 11, 23);
    const expected = '2021-12-23';

    const actual = toISODateString(date);
    expect(actual).toBe(expected);
  });

  it('should be able to compute later', () => {
    const date = new Date(2021, 11, 23);
    const days = 1;
    const expected = new Date(2021, 11, 24);

    const actual = daysLaterFrom(date, days);
    expect(actual).toStrictEqual(expected);
  });
});
